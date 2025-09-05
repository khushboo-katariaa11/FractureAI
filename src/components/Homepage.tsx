import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Brain, 
  Shield, 
  Zap, 
  ArrowRight, 
  Play,
  CheckCircle,
  Star,
  Users,
  Award,
  Sparkles,
  Upload,
  Scan,
  FileText,
  MessageCircle,
  Download,
  Eye,
  Database,
  Cpu,
  Network,
  BarChart3,
  Stethoscope
} from 'lucide-react';

interface HomepageProps {
  onEnterApp: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onEnterApp }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentWorkflowStep, setCurrentWorkflowStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    
    const workflowInterval = setInterval(() => {
      setCurrentWorkflowStep((prev) => (prev + 1) % 8);
    }, 3000);
    
    return () => {
      clearInterval(featureInterval);
      clearInterval(workflowInterval);
    };
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Diagnosis",
      description: "Advanced machine learning algorithms analyze medical images with 95%+ accuracy using custom CNN and transfer learning",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get comprehensive diagnostic reports in seconds with Grad-CAM heatmaps and counterfactual explanations",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security with Google Vertex AI integration ensuring complete patient data protection",
      color: "from-amber-500 to-orange-600"
    }
  ];

  const workflowSteps = [
    {
      id: 1,
      title: "Data Acquisition",
      description: "X-ray images collected, standardized, and preprocessed with augmentation",
      icon: Upload,
      color: "from-blue-500 to-cyan-500",
      details: "Images resized, normalized, and augmented for robustness"
    },
    {
      id: 2,
      title: "Model Training",
      description: "Custom CNN with transfer learning for fracture detection",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
      details: "ResNet/DenseNet/ViT with supervised classification"
    },
    {
      id: 3,
      title: "Explainability",
      description: "Grad-CAM heatmaps and counterfactual analysis",
      icon: Eye,
      color: "from-emerald-500 to-teal-500",
      details: "Visual explanations showing fracture-specific regions"
    },
    {
      id: 4,
      title: "Multi-Modal Fusion",
      description: "Structured findings from ML output and explainability",
      icon: Network,
      color: "from-orange-500 to-red-500",
      details: "Combines predictions, heatmaps, and counterfactuals"
    },
    {
      id: 5,
      title: "Report Generation",
      description: "LLM-powered diagnostic reports via Vertex AI/Gemini",
      icon: FileText,
      color: "from-indigo-500 to-purple-500",
      details: "Professional radiology format with patient explanations"
    },
    {
      id: 6,
      title: "Interactive Consultation",
      description: "Dual-API chatbot with OSS GPT-20B and Gemini",
      icon: MessageCircle,
      color: "from-pink-500 to-rose-500",
      details: "Medical-grade Q&A with evidence-based responses"
    },
    {
      id: 7,
      title: "Trust & Transparency",
      description: "Explainable AI with visual heatmaps and reasoning",
      icon: BarChart3,
      color: "from-teal-500 to-cyan-500",
      details: "Shows why decisions were made and alternative paths"
    },
    {
      id: 8,
      title: "Clinical Deployment",
      description: "Cloud infrastructure with EHR integration ready",
      icon: Stethoscope,
      color: "from-violet-500 to-purple-500",
      details: "Scalable, HIPAA-compliant medical platform"
    }
  ];

  const stats = [
    { number: "1.2K+", label: "Scans Analyzed", icon: Activity },
    { number: "96%", label: "Accuracy Rate", icon: CheckCircle },
    { number: "12+", label: "Healthcare Providers", icon: Users },
    { number: "24/7", label: "Availability", icon: Star }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [-50, 50, -50],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6"
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">MedScan Pro</h1>
              <p className="text-blue-200 text-sm">Advanced Medical AI Platform</p>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
              Contact Support
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 container mx-auto px-6 pt-20 pb-32"
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.div
              animate={floatingAnimation}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-300/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">Complete End-to-End Medical AI Pipeline</span>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Revolutionizing
            <motion.span
              className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Medical Imaging
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Complete workflow from data acquisition to interactive consultation. 
            Powered by custom CNN models, Grad-CAM explainability, Google Vertex AI, 
            and dual-API chatbot with OSS GPT-20B and Gemini integration.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
              onClick={onEnterApp}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-3"
            >
              <span>Start Diagnosis</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                className="text-3xl font-bold text-white mb-2"
              >
                {stat.number}
              </motion.div>
              <p className="text-blue-200 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Workflow Pipeline Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 py-24 bg-white/5 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6">
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Complete AI Pipeline
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              From raw medical images to interactive clinical consultation - 
              our end-to-end workflow ensures accuracy, transparency, and trust
            </p>
          </motion.div>

          {/* Animated Workflow Flowchart */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`relative p-6 rounded-3xl bg-gradient-to-br ${
                    currentWorkflowStep === index ? step.color : 'from-white/10 to-white/5'
                  } backdrop-blur-sm border border-white/20 transition-all duration-500`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      animate={currentWorkflowStep === index ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="text-2xl font-bold text-white/60">
                      {step.id}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-blue-100 text-sm mb-3 leading-relaxed">
                    {step.description}
                  </p>

                  <p className="text-blue-200 text-xs">
                    {step.details}
                  </p>

                  {currentWorkflowStep === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                    >
                      <Star className="w-3 h-3 text-yellow-900" />
                    </motion.div>
                  )}

                  {/* Connection arrows for larger screens */}
                  {index < workflowSteps.length - 1 && index % 4 !== 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-white/40"
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Workflow Summary */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                🔑 High-Level Workflow Summary
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <Upload className="w-4 h-4 text-blue-300" />
                  <span className="text-blue-100">Image Upload</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/60" />
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <Scan className="w-4 h-4 text-purple-300" />
                  <span className="text-blue-100">ML Detection</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/60" />
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <Eye className="w-4 h-4 text-emerald-300" />
                  <span className="text-blue-100">Explainability</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/60" />
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <FileText className="w-4 h-4 text-orange-300" />
                  <span className="text-blue-100">LLM Report</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/60" />
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <MessageCircle className="w-4 h-4 text-pink-300" />
                  <span className="text-blue-100">Interactive Chat</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Features Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 py-24"
      >
        <div className="container mx-auto px-6">
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Advanced AI Capabilities
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Cutting-edge technology stack with explainable AI and multi-modal reasoning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${
                  currentFeature === index ? feature.color : 'from-white/10 to-white/5'
                } backdrop-blur-sm border border-white/20 transition-all duration-500`}
              >
                <motion.div
                  animate={currentFeature === index ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-blue-100 leading-relaxed">
                  {feature.description}
                </p>

                {currentFeature === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                  >
                    <Star className="w-3 h-3 text-yellow-900" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Technical Stack Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 py-24 bg-white/5 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6">
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technology Stack
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Built with industry-leading AI and cloud technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Custom CNN", desc: "ResNet/DenseNet/ViT", icon: Brain },
              { name: "Grad-CAM", desc: "Visual Explainability", icon: Eye },
              { name: "Google Vertex AI", desc: "LLM Integration", icon: Database },
              { name: "Dual API", desc: "OSS GPT-20B + Gemini", icon: Network },
              { name: "React + TypeScript", desc: "Modern Frontend", icon: Cpu },
              { name: "Python Backend", desc: "ML Pipeline", icon: Zap },
              { name: "HIPAA Compliant", desc: "Enterprise Security", icon: Shield },
              { name: "Cloud Ready", desc: "Scalable Infrastructure", icon: Activity }
            ].map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <tech.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">{tech.name}</h4>
                <p className="text-blue-200 text-sm">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 py-24"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Award className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Healthcare?
            </h2>
            
            <p className="text-xl text-blue-100 mb-12">
              Experience the complete end-to-end medical AI pipeline. From image upload to 
              interactive consultation - all powered by explainable AI and trusted by healthcare professionals.
            </p>

            <motion.button
              onClick={onEnterApp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                background: "linear-gradient(45deg, #3B82F6, #8B5CF6, #10B981)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 flex items-center space-x-4 mx-auto"
            >
              <span>Enter Medical AI Platform</span>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 py-8 border-t border-white/10"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-blue-200">
            © 2025 MedScan Pro. Complete End-to-End Medical AI Pipeline. All rights reserved.
          </p>
          <p className="text-blue-300 text-sm mt-2">
            Powered by Custom CNN • Grad-CAM • Google Vertex AI • OSS GPT-20B • Gemini
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Homepage;