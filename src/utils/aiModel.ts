// API-based AI Model Integration for PyTorch DenseNet121

const API_CONFIG = {
  // Change this to your actual API endpoint
  baseUrl: 'http://localhost:8000', // Your Flask/FastAPI server
  endpoints: {
    analyze: '/analyze',
    health: '/health'
  },
  timeout: 30000 // 30 seconds timeout for analysis
};

// Check if API server is available
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.health}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

// Convert image file to base64 for API transmission
const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      // Remove data:image/jpeg;base64, prefix
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Main analysis function using API
export const analyzeXray = async (imageFile: File): Promise<{
  diagnosis: string;
  confidence: number;
  gradCamImageUrl: string;
  processingTime: number;
  timestamp: string;
  groundTruth?: string;
  correct?: boolean;
  patientMeta?: any;
}> => {
  const startTime = performance.now();

  // Check if API is available
  const isAPIHealthy = await checkAPIHealth();
  if (!isAPIHealthy) {
    throw new Error('API server is not available. Please ensure your model server is running.');
  }

  // Convert image to base64
  const base64Image = await imageToBase64(imageFile);

  // Prepare API request
  const requestBody = {
    image: base64Image,
    filename: imageFile.name,
    patient_data: {
      // Add any additional patient data if needed by your API
    }
  };

  // Call your API
  const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.analyze}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`API request failed: ${response.status} - ${errorData.message || response.statusText}`);
  }

  const result = await response.json();

  // Use actual Grad-CAM image from API
  const gradCamUrl = result.gradcam_image
    ? `data:image/png;base64,${result.gradcam_image}`
    : '';

  const processingTime = result.processing_time || ((performance.now() - startTime) / 1000);

  return {
    diagnosis: result.prediction, // e.g. 'fracture' or 'normal'
    confidence: result.confidence,
    gradCamImageUrl: gradCamUrl,
    processingTime,
    timestamp: new Date().toISOString(),
    groundTruth: result.ground_truth, // if provided by API
    correct: result.correct, // if provided by API
    patientMeta: result.patient_meta // if provided by API
  };
};