"""
Flask API Server for PyTorch DenseNet121 Fracture Detection Model

Place your model file (best_densenet121.pth) in the same directory as this file.

To run:
1. Install dependencies: pip install flask flask-cors torch torchvision pillow numpy opencv-python pytorch-grad-cam
2. Place your model file: best_densenet121.pth
3. Run: python app.py
4. Server will start on http://localhost:8000
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from seaborn import heatmap
import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import io
import base64
import numpy as np
import cv2
import time
import os
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image


app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

MODEL_CONFIG = {
    'num_classes': 2,
    'class_names': ['normal', 'fracture'],
    'input_size': 224,
    'model_path': 'api_server/best.pth'
}

model = None
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

transform = transforms.Compose([
    transforms.Resize((MODEL_CONFIG['input_size'], MODEL_CONFIG['input_size'])),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # ImageNet normalization
])

def load_model():
    global model
    if not os.path.exists(MODEL_CONFIG['model_path']):
        raise FileNotFoundError(f"Model file not found: {MODEL_CONFIG['model_path']}")
    try:
        # Build model exactly as you trained it
        model = models.densenet121(weights=None)
        num_features = model.classifier.in_features
        model.classifier = nn.Linear(num_features, MODEL_CONFIG['num_classes'])
        checkpoint = torch.load(MODEL_CONFIG['model_path'], map_location=device)
        model.load_state_dict(checkpoint)
        model.to(device)
        model.eval()
        print(f"Model loaded successfully on {device}")
        return True
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return False

def preprocess_image(image_data):
    """Preprocess base64 image for model input"""
    try:
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        if image.mode != 'RGB':
            image = image.convert('RGB')
        input_tensor = transform(image).unsqueeze(0)  # Add batch dimension
        return input_tensor.to(device), image
    except Exception as e:
        raise ValueError(f"Error preprocessing image: {str(e)}")

def generate_gradcam(model, input_tensor, target_class=None):
    """Generate Grad-CAM visualization using pytorch-grad-cam"""
    try:
        target_layers = [model.features[-1]]
        cam = GradCAM(model=model, target_layers=target_layers)
        # Targets argument can be set for specific class, or None for max score
        grayscale_cam = cam(input_tensor=input_tensor, targets=None)[0]
        # Convert input tensor to normalized numpy image
        img_np = input_tensor.squeeze().cpu().numpy()
        img_np = np.transpose(img_np, (1, 2, 0))
        img_norm = (img_np - img_np.min()) / (img_np.max() - img_np.min() + 1e-8)
        cam_image = show_cam_on_image(img_norm, grayscale_cam, use_rgb=True)
        return cam_image
    except Exception as e:
        print(f"Grad-CAM generation failed: {str(e)}")
        # Fallback: blank heatmap
        heatmap = np.zeros((MODEL_CONFIG['input_size'], MODEL_CONFIG['input_size'], 3), dtype=np.uint8)
        return heatmap

def create_gradcam_overlay(original_image, heatmap):
    """Create Grad-CAM overlay on original image and return as base64 PNG"""
    try:
        overlay_image = Image.fromarray(heatmap)
        buffer = io.BytesIO()
        overlay_image.save(buffer, format='PNG')
        overlay_base64 = base64.b64encode(buffer.getvalue()).decode()
        return overlay_base64
    except Exception as e:
        print(f"Error creating Grad-CAM overlay: {str(e)}")
        return None

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'device': str(device),
        'timestamp': time.time()
    })

@app.route('/analyze', methods=['POST'])
def analyze_xray():
    """Main analysis endpoint"""
    start_time = time.time()
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400

        # Preprocess image for model
        input_tensor, original_image = preprocess_image(data['image'])

        # Inference
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)
            predicted_class = predicted.item()
            confidence_score = confidence.item()

        # Generate Grad-CAM
        heatmap = generate_gradcam(model, input_tensor, predicted_class)

        # Convert Grad-CAM to base64 PNG
        gradcam_overlay = create_gradcam_overlay(original_image.resize((MODEL_CONFIG['input_size'], MODEL_CONFIG['input_size'])), heatmap)

        # Prepare response
        prediction_label = MODEL_CONFIG['class_names'][predicted_class]
        processing_time = time.time() - start_time

        response = {
            'prediction': prediction_label,
            'prediction_index': predicted_class,
            'confidence': confidence_score,
            'processing_time': processing_time,
            'gradcam_image': gradcam_overlay,
            'model_info': {
                'architecture': 'DenseNet121',
                'input_size': MODEL_CONFIG['input_size'],
                'classes': MODEL_CONFIG['class_names']
            },
            'timestamp': time.time()
        }
        return jsonify(response)

    except Exception as e:
        import traceback
        print("Exception in /analyze:", traceback.format_exc())
        return jsonify({
            'error': str(e),
            'processing_time': time.time() - start_time
        }), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    """Get model information"""
    return jsonify({
        'architecture': 'DenseNet121',
        'classes': MODEL_CONFIG['class_names'],
        'input_size': MODEL_CONFIG['input_size'],
        'device': str(device),
        'model_loaded': model is not None
    })

if __name__ == '__main__':
    print("Starting Fracture Detection API Server...")
    print(f"Device: {device}")
    if load_model():
        print("Model loaded successfully!")
        print(f"Server starting on http://localhost:8000")
        print("\nAPI Endpoints:")
        print("- POST /analyze - Analyze X-ray image")
        print("- GET /health - Health check")
        print("- GET /model-info - Model information")
        print("\nMake sure to place your 'best.pth' file in this directory!")
        app.run(host='0.0.0.0', port=8000, debug=True)
    else:
        print("Failed to load model. Please check your model file and try again.")
