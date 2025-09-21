import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { AnalysisStep } from '../types';

interface AnalysisProgressProps {
  steps: AnalysisStep[];
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ steps }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-6">AI Analysis Progress</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-4">
            <div className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              ${step.status === 'completed' 
                ? 'bg-green-100 text-green-600' 
                : step.status === 'processing'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-slate-100 text-slate-400'
              }
            `}>
              {step.status === 'completed' ? (
                <Check className="h-4 w-4" />
              ) : step.status === 'processing' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            
            <div className="flex-1">
              <h4 className={`font-medium ${
                step.status === 'completed' ? 'text-green-800' :
                step.status === 'processing' ? 'text-blue-800' :
                'text-slate-500'
              }`}>
                {step.title}
              </h4>
              <p className="text-sm text-slate-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnalysisProgress;
