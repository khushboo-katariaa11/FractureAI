import React, { useState } from 'react';
import Homepage from './components/Homepage';
import LandingPage from './components/LandingPage';
import PatientForm from './components/PatientForm';
import AnalysisResults from './components/AnalysisResults';
import ClinicalReport from './components/ClinicalReport';
import { PatientData, AnalysisResult } from './types';
import { analyzeXray } from './utils/aiModel';

type AppStep = 'homepage' | 'landing' | 'form' | 'analysis' | 'report';

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('homepage');
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleEnterApp = () => {
    setCurrentStep('landing');
  };

  const handleGetStarted = () => {
    setCurrentStep('form');
  };

  const handleFormSubmit = async (data: PatientData) => {
    setPatientData(data);
    setCurrentStep('analysis');
    
    // AI analysis using your DenseNet121 model logic
    try {
      const result = await analyzeXray(data.xrayImage); // Uses your model architecture
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Handle error - could fallback to mock analysis for demo
    }
  };

  const handleViewReport = () => {
    setCurrentStep('report');
  };

  const handleNewAnalysis = () => {
    setCurrentStep('landing');
    setPatientData(null);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === 'homepage' && (
        <Homepage onEnterApp={handleEnterApp} />
      )}
      
      {currentStep === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      
      {currentStep === 'form' && (
        <PatientForm onSubmit={handleFormSubmit} />
      )}
      
      {currentStep === 'analysis' && patientData && (
        <AnalysisResults 
          patientData={patientData}
          analysisResult={analysisResult}
          onViewReport={handleViewReport}
          onNewAnalysis={handleNewAnalysis}
        />
      )}
      
      {currentStep === 'report' && patientData && analysisResult && (
        <ClinicalReport 
          patientData={patientData}
          analysisResult={analysisResult}
          onNewAnalysis={handleNewAnalysis}
        />
      )}
    </div>
  );
}

export default App;