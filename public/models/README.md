# Your DenseNet121 Model Integration Guide

## Step 1: Convert Your PyTorch Model (.pth) to TensorFlow.js

Your `best_densenet121.pth` file needs to be converted to run in the browser. Here's how:

### Option A: Direct Conversion (Recommended)

```bash
# Install required packages
pip install tensorflowjs torch torchvision

# Convert your PyTorch model to TensorFlow.js format
tensorflowjs_converter \
    --input_format=pytorch \
    --output_format=tfjs_layers_model \
    --saved_model_tags=serve \
    best_densenet121.pth \
    ./public/models/
```

### Option B: Python Script for Custom Conversion

If direct conversion doesn't work, create this Python script:

```python
import torch
import torch.nn as nn
import torchvision.models as models
import tensorflowjs as tfjs

# Load your trained model
class FractureNet(nn.Module):
    def __init__(self, num_classes=2):
        super(FractureNet, self).__init__()
        self.densenet = models.densenet121(pretrained=True)
        self.densenet.classifier = nn.Linear(self.densenet.classifier.in_features, num_classes)
    
    def forward(self, x):
        return self.densenet(x)

# Load your trained weights
model = FractureNet(num_classes=2)
model.load_state_dict(torch.load('best_densenet121.pth', map_location='cpu'))
model.eval()

# Convert to TensorFlow.js
tfjs.converters.save_keras_model(model, './public/models/')
```

## Step 2: File Structure After Conversion

After successful conversion, you should have:

```
public/models/
├── model.json          # Model architecture and metadata
├── group1-shard1of1.bin # Model weights (may be multiple shards)
└── README.md           # This file
```

## Step 3: Update Class Names (Important!)

In `src/utils/aiModel.ts`, update the `classNames` array to match your training:

```typescript
const MODEL_CONFIG = {
  // ... other config
  classNames: ['normal', 'fracture'], // Adjust based on your model's output order
};
```

**Check your training code to confirm the class order!**

## Step 4: Alternative - Backend API Approach

If TensorFlow.js conversion is challenging, you can create a simple API:

### Flask Backend (app.py):
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torchvision.transforms as transforms
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)

# Load your model
model = torch.load('best_densenet121.pth', map_location='cpu')
model.eval()

@app.route('/analyze', methods=['POST'])
def analyze_xray():
    # Get image from request
    image_data = request.json['image']
    
    # Process image (same as your Streamlit preprocessing)
    # ... your preprocessing code here ...
    
    # Run inference
    with torch.no_grad():
        outputs = model(input_tensor)
        probabilities = torch.softmax(outputs, dim=1)
        confidence, predicted = torch.max(probabilities, 1)
    
    return jsonify({
        'diagnosis': 'Fracture' if predicted.item() == 1 else 'Normal',
        'confidence': confidence.item(),
        'processing_time': processing_time
    })

if __name__ == '__main__':
    app.run(debug=True)
```

Then update the frontend to call your API instead of local inference.

## Step 5: Test Your Integration

1. Place your converted model files in `/public/models/`
2. Update the class names in the config
3. Test with a sample X-ray image
4. Verify the predictions match your original PyTorch model

## Troubleshooting

- **Model not loading**: Check file paths and ensure all weight files are present
- **Wrong predictions**: Verify class name order and preprocessing pipeline
- **Performance issues**: Consider model quantization or backend API approach

The current code is set up to automatically use your model once the files are in place!