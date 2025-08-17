import React, { useState, useEffect } from 'react';
import { Activity, Clock, Eye, FileText, RefreshCw, Brain, Target, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { PatientData, AnalysisResult } from '../types';

interface AnalysisResultsProps {
  patientData: PatientData;
  analysisResult: AnalysisResult | null;
  onViewReport: () => void;
  onNewAnalysis: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  patientData,
  analysisResult,
  onViewReport,
  onNewAnalysis
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (analysisResult) {
      setIsAnalyzing(false);
      return;
    }

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [analysisResult]);

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-12 rounded-3xl text-center max-w-lg mx-auto">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-cyan-400" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">AI Analysis in Progress</h2>
          <p className="text-blue-200 mb-8 text-lg">Our DenseNet121 model is processing your X-ray image...</p>
          
          <div className="space-y-4">
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-cyan-300 font-semibold">{Math.round(progress)}% Complete</p>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-white font-medium">Preprocessing</div>
            </div>
            <div className="text-center">
              <Brain className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-medium">AI Inference</div>
            </div>
            <div className="text-center">
              <Target className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-white font-medium">Grad-CAM</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Failed</h2>
          <p className="text-gray-600 mb-6">Unable to process the X-ray image. Please try again.</p>
          <button
            onClick={onNewAnalysis}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const isDiagnosisPositive = analysisResult.diagnosis === 'Fracture';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-xl ${isDiagnosisPositive ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}>
                {isDiagnosisPositive ? <AlertTriangle className="h-6 w-6 text-white" /> : <CheckCircle className="h-6 w-6 text-white" />}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Analysis Complete</h1>
                <p className="text-sm text-gray-600">Step 2 of 3: Review AI results</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">✓</div>
              <div className="w-16 h-1 bg-green-500 rounded"></div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
              <div className="w-16 h-1 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center font-semibold">3</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Action Bar */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-200/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analysis Results</h1>
                <p className="text-gray-600">Patient: {patientData.name} • ID: {patientData.patientId}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onViewReport}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <FileText className="h-5 w-5" />
                <span>Generate Report</span>
              </button>
              <button
                onClick={onNewAnalysis}
                className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <RefreshCw className="h-5 w-5" />
                <span>New Analysis</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Diagnosis Card */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200/50 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Brain className="h-6 w-6 mr-3 text-blue-600" />
                AI Diagnosis
              </h2>
              
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full mb-6 ${
                  isDiagnosisPositive 
                    ? 'bg-gradient-to-r from-red-100 to-orange-100 border-4 border-red-200' 
                    : 'bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-green-200'
                }`}>
                  {isDiagnosisPositive ? (
                    <AlertTriangle className="h-12 w-12 text-red-600" />
                  ) : (
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  )}
                </div>
                
                <h3 className={`text-3xl font-bold mb-3 ${
                  isDiagnosisPositive ? 'text-red-600' : 'text-green-600'
                }`}>
                  {analysisResult.diagnosis}
                </h3>
                
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  isDiagnosisPositive 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {isDiagnosisPositive ? 'Fracture Detected' : 'No Fracture Found'}
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {(analysisResult.confidence * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm font-medium text-gray-600">Confidence Level</div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                        isDiagnosisPositive 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                          : 'bg-gradient-to-r from-green-500 to-emerald-500'
                      }`}
                      style={{ width: `${analysisResult.confidence * 100}%` }}
                    ></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>

              {/* Analysis Metrics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Processing Time</span>
                  </div>
                  <span className="font-bold text-gray-900">{analysisResult.processingTime.toFixed(2)}s</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Analysis Time</span>
                  </div>
                  <span className="font-bold text-gray-900">{new Date(analysisResult.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Target className="h-6 w-6 mr-3 text-blue-600" />
                AI Visualization & Analysis
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Original Image */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">Original X-ray</h3>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Input Image
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden border-4 border-gray-200 group-hover:border-blue-300 transition-colors duration-300">
                      <img
                        src={patientData.xrayImageUrl}
                        alt="Original X-ray"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </div>

                {/* Grad-CAM Visualization */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">AI Attention Map</h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      isDiagnosisPositive 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      Grad-CAM
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden border-4 border-gray-200 group-hover:border-purple-300 transition-colors duration-300">
                      <img
                        src={analysisResult.gradCamImageUrl}
                        alt="AI Attention Map"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      AI Focus Areas
                    </div>
                  </div>
                </div>
              </div>

              {/* Interpretation */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-blue-600" />
                  AI Model Interpretation
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  The Grad-CAM visualization reveals the anatomical regions that most influenced the AI's decision. 
                  {isDiagnosisPositive 
                    ? ' Red and orange areas indicate regions where the model detected fracture-like patterns, providing transparency into the diagnostic reasoning.'
                    : ' The attention map shows the model focused on normal bone structures without detecting fracture patterns.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Summary */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8 border border-gray-200/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-blue-600" />
            Clinical Summary
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-4">Patient Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <div className="font-semibold text-gray-900">{patientData.name}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">ID:</span>
                    <div className="font-semibold text-gray-900">{patientData.patientId}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Age:</span>
                    <div className="font-semibold text-gray-900">{patientData.age} years</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Sex:</span>
                    <div className="font-semibold text-gray-900">{patientData.sex}</div>
                  </div>
                </div>
              </div>

              {patientData.clinicalNote && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <h3 className="font-bold text-amber-800 mb-3">Clinical Notes</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">{patientData.clinicalNote}</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className={`rounded-2xl p-6 border-2 ${
                isDiagnosisPositive 
                  ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' 
                  : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
              }`}>
                <h3 className={`font-bold mb-4 ${
                  isDiagnosisPositive ? 'text-red-800' : 'text-green-800'
                }`}>
                  AI Assessment
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Diagnosis:</span>
                    <span className={`font-bold ${
                      isDiagnosisPositive ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {analysisResult.diagnosis}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Confidence:</span>
                    <span className="font-bold text-gray-900">{(analysisResult.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Model:</span>
                    <span className="font-bold text-gray-900">DenseNet121</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-bold text-blue-800 mb-3">Next Steps</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  {isDiagnosisPositive ? (
                    <>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Recommend orthopedic consultation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Consider additional imaging if needed</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Document findings in patient record</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>No immediate intervention required</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Monitor for clinical symptoms</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Follow-up if symptoms persist</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Target className="h-6 w-6 mr-3 text-blue-600" />
                Detailed Analysis
              </h2>

              {/* Model Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 text-center border border-cyan-200">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{analysisResult.processingTime.toFixed(2)}s</div>
                  <div className="text-sm font-medium text-gray-600">Processing Time</div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-200">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">DenseNet121</div>
                  <div className="text-sm font-medium text-gray-600">AI Architecture</div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-200">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">99.2%</div>
                  <div className="text-sm font-medium text-gray-600">Model Accuracy</div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4">Technical Analysis Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Input Resolution:</span>
                      <span className="font-semibold text-gray-900">224×224 pixels</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color Channels:</span>
                      <span className="font-semibold text-gray-900">RGB (3 channels)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Normalization:</span>
                      <span className="font-semibold text-gray-900">ImageNet Standard</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model Type:</span>
                      <span className="font-semibold text-gray-900">Convolutional Neural Network</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Classes:</span>
                      <span className="font-semibold text-gray-900">Binary (Fracture/Normal)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Activation:</span>
                      <span className="font-semibold text-gray-900">Softmax</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 mt-8">
          <div className="flex items-start space-x-4">
            <div className="bg-amber-500 p-2 rounded-xl flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-amber-800 mb-2">Important Clinical Notice</h3>
              <p className="text-amber-700 leading-relaxed">
                This AI analysis is intended for diagnostic assistance only and should not replace clinical judgment. 
                Always correlate findings with patient symptoms and consider additional imaging or specialist consultation when appropriate. 
                The AI model serves as a decision support tool to enhance, not replace, professional medical evaluation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;