import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DocumentUploaderProps {
  onFileUpload: (file: File) => void;
  isAnalyzing: boolean;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onFileUpload, isAnalyzing }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false,
    disabled: isAnalyzing,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false)
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 md:p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${isDragActive 
            ? 'border-blue-400 bg-blue-50 scale-105' 
            : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
          }
          ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            {isAnalyzing ? (
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" />
            ) : (
              <Upload className={`h-16 w-16 ${isDragActive ? 'text-blue-600' : 'text-slate-400'}`} />
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              {isAnalyzing ? 'Analyzing Document...' : 'Upload Your Legal Document'}
            </h3>
            <p className="text-slate-600 mb-4">
              {isAnalyzing 
                ? 'Our AI is reviewing your document and preparing a simplified analysis.'
                : 'Drag and drop your legal document here, or click to browse'
              }
            </p>
          </div>

          {!isAnalyzing && (
            <>
              <div className="flex justify-center space-x-4 text-sm text-slate-500">
                <span className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>PDF</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>DOC</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>DOCX</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>TXT</span>
                </span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-xs text-amber-600 bg-amber-50 rounded-lg p-3">
                <AlertCircle className="h-4 w-4" />
                <span>Your documents are processed securely and never stored permanently</span>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentUploader;
