export interface DocumentAnalysis {
  id: string;
  fileName: string;
  documentType: string;
  uploadDate: Date;
  status: 'analyzing' | 'completed' | 'error';
  summary: string;
  keyPoints: string[];
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  plainLanguageExplanation: string;
  importantClauses: Array<{
    clause: string;
    explanation: string;
    importance: 'high' | 'medium' | 'low';
  }>;
}

export interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
}
