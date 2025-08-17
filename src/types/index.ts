export interface PatientData {
  name: string;
  patientId: string;
  sex: 'Male' | 'Female' | 'Other';
  age: number;
  clinicalNote: string;
  xrayImage: File;
  xrayImageUrl: string;
}

export interface AnalysisResult {
  diagnosis: 'Fracture' | 'Normal';
  confidence: number;
  gradCamImageUrl: string;
  processingTime: number;
  timestamp: string;
}