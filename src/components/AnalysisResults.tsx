import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Lightbulb, 
  Shield,
  Clock,
  Download,
  Share2
} from 'lucide-react';
import { DocumentAnalysis } from '../types';

interface AnalysisResultsProps {
  analysis: DocumentAnalysis;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <Shield className="h-5 w-5" />;
      case 'medium': return <Clock className="h-5 w-5" />;
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{analysis.fileName}</h2>
            <p className="text-slate-600">{analysis.documentType} • Analyzed on {analysis.uploadDate.toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
        
        <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${getRiskColor(analysis.riskLevel)}`}>
          {getRiskIcon(analysis.riskLevel)}
          <span>Risk Level: {analysis.riskLevel.charAt(0).toUpperCase() + analysis.riskLevel.slice(1)}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-slate-800">Executive Summary</h3>
        </div>
        <p className="text-slate-700 leading-relaxed">{analysis.summary}</p>
      </div>

      {/* Plain Language Explanation */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="h-6 w-6 text-indigo-600" />
          <h3 className="text-xl font-semibold text-slate-800">In Plain English</h3>
        </div>
        <p className="text-slate-700 leading-relaxed">{analysis.plainLanguageExplanation}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Key Points */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-semibold text-slate-800">Key Points</h3>
          </div>
          <ul className="space-y-3">
            {analysis.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium text-green-600">{index + 1}</span>
                </div>
                <p className="text-slate-700">{point}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="h-6 w-6 text-amber-600" />
            <h3 className="text-xl font-semibold text-slate-800">Recommendations</h3>
          </div>
          <ul className="space-y-3">
            {analysis.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium text-amber-600">!</span>
                </div>
                <p className="text-slate-700">{recommendation}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Important Clauses */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <AlertTriangle className="h-6 w-6 text-orange-600" />
          <h3 className="text-xl font-semibold text-slate-800">Important Clauses</h3>
        </div>
        <div className="space-y-4">
          {analysis.importantClauses.map((clause, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-800">Clause {index + 1}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  clause.importance === 'high' ? 'bg-red-100 text-red-600' :
                  clause.importance === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {clause.importance} importance
                </span>
              </div>
              <blockquote className="text-slate-600 italic mb-3 pl-4 border-l-2 border-slate-300">
                "{clause.clause}"
              </blockquote>
              <p className="text-slate-700">{clause.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisResults;
