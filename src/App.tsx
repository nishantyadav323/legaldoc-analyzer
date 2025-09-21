import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DocumentUploader from './components/DocumentUploader';
import AnalysisProgress from './components/AnalysisProgress';
import AnalysisResults from './components/AnalysisResults';
import { DocumentAnalysis, AnalysisStep } from './types';
import { generateMockAnalysis, getAnalysisSteps } from './utils/mockData';

function App() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);

  const handleFileUpload = (file: File) => {
    setCurrentFile(file);
    setIsAnalyzing(true);
    setAnalysis(null);
    
    // Initialize analysis steps
    const steps = getAnalysisSteps();
    setAnalysisSteps(steps);
    
    // Simulate AI analysis process
    simulateAnalysis(file.name, steps);
  };

  const simulateAnalysis = async (fileName: string, steps: AnalysisStep[]) => {
    // Simulate step-by-step analysis
    for (let i = 0; i < steps.length; i++) {
      // Update current step to processing
      setAnalysisSteps(prev => prev.map(step => 
        step.id === steps[i].id 
          ? { ...step, status: 'processing' }
          : step
      ));
      
      // Wait for simulation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mark step as completed
      setAnalysisSteps(prev => prev.map(step => 
        step.id === steps[i].id 
          ? { ...step, status: 'completed' }
          : step
      ));
    }
    
    // Generate final analysis
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockAnalysis = generateMockAnalysis(fileName);
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setCurrentFile(null);
    setIsAnalyzing(false);
    setAnalysis(null);
    setAnalysisSteps([]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!currentFile && !analysis && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Simplify Complex Legal Documents
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our AI-powered platform analyzes legal documents and translates complex legal language 
              into clear, actionable guidance to help you make informed decisions.
            </p>
          </div>
        )}

        {!analysis && (
          <DocumentUploader onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} />
        )}

        {isAnalyzing && analysisSteps.length > 0 && (
          <div className="mt-8">
            <AnalysisProgress steps={analysisSteps} />
          </div>
        )}

        {analysis && (
          <div className="mt-8">
            <div className="flex justify-center mb-6">
              <button
                onClick={resetAnalysis}
                className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Analyze Another Document
              </button>
            </div>
            <AnalysisResults analysis={analysis} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
