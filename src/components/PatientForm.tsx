import React, { useState } from 'react';
import { Upload, User, FileText, Calendar, Users, ArrowLeft, Sparkles } from 'lucide-react';
import { PatientData } from '../types';

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    patientId: '',
    sex: '' as 'Male' | 'Female' | 'Other' | '',
    age: '',
    clinicalNote: ''
  });
  const [xrayImage, setXrayImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file: File) => {
    setXrayImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!xrayImage) return;

    setIsSubmitting(true);
    
    const patientData: PatientData = {
      name: formData.name,
      patientId: formData.patientId,
      sex: formData.sex as 'Male' | 'Female' | 'Other',
      age: parseInt(formData.age),
      clinicalNote: formData.clinicalNote,
      xrayImage,
      xrayImageUrl: imagePreview
    };

    onSubmit(patientData);
  };

  const isFormValid = formData.name && formData.patientId && formData.sex && formData.age && xrayImage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-xl">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Patient Registration</h1>
                <p className="text-sm text-gray-600">Step 1 of 3: Enter patient details</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
              <div className="w-16 h-1 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center font-semibold">2</div>
              <div className="w-16 h-1 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center font-semibold">3</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <Sparkles className="h-8 w-8 text-cyan-300 mr-3" />
                <h2 className="text-3xl font-bold text-white">Patient Information</h2>
              </div>
              <p className="text-blue-100 text-lg">Enter patient details and upload X-ray for AI-powered fracture analysis</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Patient Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  <User className="inline w-5 h-5 mr-2 text-blue-600" />
                  Patient Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium bg-gray-50/50 hover:bg-white"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  <FileText className="inline w-5 h-5 mr-2 text-blue-600" />
                  Patient ID *
                </label>
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium bg-gray-50/50 hover:bg-white"
                  placeholder="Enter patient ID"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  <Users className="inline w-5 h-5 mr-2 text-blue-600" />
                  Sex *
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium bg-gray-50/50 hover:bg-white"
                  required
                >
                  <option value="">Select sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  <Calendar className="inline w-5 h-5 mr-2 text-blue-600" />
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium bg-gray-50/50 hover:bg-white"
                  placeholder="Enter age"
                  min="0"
                  max="150"
                  required
                />
              </div>
            </div>

            {/* Clinical Note */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800 mb-3">
                <FileText className="inline w-5 h-5 mr-2 text-blue-600" />
                Clinical Notes
              </label>
              <textarea
                name="clinicalNote"
                value={formData.clinicalNote}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none text-gray-900 bg-gray-50/50 hover:bg-white"
                placeholder="Enter relevant clinical observations, symptoms, or medical history..."
              />
            </div>

            {/* X-ray Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800 mb-3">
                <Upload className="inline w-5 h-5 mr-2 text-blue-600" />
                X-ray Image *
              </label>
              <div 
                className={`border-3 border-dashed rounded-3xl p-8 transition-all duration-300 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : imagePreview 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-gray-300 bg-gray-50/50 hover:border-blue-400 hover:bg-blue-50/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="X-ray preview"
                        className="max-h-80 mx-auto rounded-2xl shadow-lg border-4 border-white"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                        <span>✓</span>
                        <span>Ready</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-green-700 mb-2">Image uploaded successfully</p>
                      <p className="text-sm text-gray-600 mb-4">File: {xrayImage?.name}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setXrayImage(null);
                          setImagePreview('');
                        }}
                        className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors duration-200"
                      >
                        Choose different image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Upload className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Upload X-ray Image</h3>
                    <p className="text-gray-600 mb-6">Drag and drop your X-ray image here, or click to browse</p>
                    <label className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl cursor-pointer font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                      Browse Files
                      <input
                        type="file"
                        accept="image/*,.dcm"
                        onChange={handleFileInput}
                        className="hidden"
                        required
                      />
                    </label>
                    <div className="mt-6 grid grid-cols-3 gap-4 text-xs text-gray-500">
                      <div className="bg-white/50 rounded-lg p-3">
                        <div className="font-semibold text-gray-700">Supported</div>
                        <div>JPG, PNG, DICOM</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3">
                        <div className="font-semibold text-gray-700">Optimal Size</div>
                        <div>224x224 pixels</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3">
                        <div className="font-semibold text-gray-700">Max Size</div>
                        <div>10MB</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white py-6 rounded-2xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Analyzing with AI...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <Sparkles className="h-6 w-6" />
                    <span>Begin AI Analysis</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              
              {!isFormValid && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  Please fill in all required fields and upload an X-ray image
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;