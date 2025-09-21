import { faker } from '@faker-js/faker';
import { DocumentAnalysis, AnalysisStep } from '../types';

export const generateMockAnalysis = (fileName: string): DocumentAnalysis => {
  const riskLevels: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
  const documentTypes = ['Employment Contract', 'Lease Agreement', 'Service Agreement', 'NDA', 'Terms of Service'];
  
  return {
    id: faker.string.uuid(),
    fileName,
    documentType: faker.helpers.arrayElement(documentTypes),
    uploadDate: new Date(),
    status: 'completed',
    summary: "This employment contract establishes a standard employer-employee relationship with typical terms for a mid-level position. The agreement includes provisions for salary, benefits, termination procedures, and confidentiality obligations. Overall, the terms appear fair and balanced, though there are a few clauses that warrant attention.",
    keyPoints: [
      "Fixed salary of $75,000 annually with standard benefit package",
      "90-day probationary period with at-will employment thereafter",
      "Comprehensive non-disclosure and non-compete clauses",
      "Standard intellectual property assignment to company",
      "Two weeks paid vacation in first year, increasing thereafter"
    ],
    riskLevel: faker.helpers.arrayElement(riskLevels),
    recommendations: [
      "Consider negotiating the non-compete clause duration (currently 12 months)",
      "Request clarification on overtime compensation policy",
      "Review the intellectual property clause scope for personal projects",
      "Ensure termination notice requirements are mutual (currently favors employer)"
    ],
    plainLanguageExplanation: "In simple terms, this is a fairly standard job contract. You're agreeing to work for the company full-time in exchange for a salary and benefits. The company wants to protect its secrets and prevent you from working for competitors for a year after you leave. Most terms are reasonable, but you might want to negotiate the non-compete period and clarify some policies before signing.",
    importantClauses: [
      {
        clause: "Employee agrees not to engage in any business competitive with Company for a period of twelve (12) months following termination of employment.",
        explanation: "This prevents you from working for competitors or starting a competing business for one year after leaving. Consider if this timeframe is reasonable for your industry and career goals.",
        importance: 'high'
      },
      {
        clause: "All inventions, discoveries, and improvements made during employment shall be the sole property of Company.",
        explanation: "Any creative work or innovations you develop while employed belong to the company, even if created outside work hours. This may affect personal projects.",
        importance: 'medium'
      },
      {
        clause: "Employment may be terminated by either party with two (2) weeks written notice, except Company may terminate immediately for cause.",
        explanation: "While you must give two weeks notice, the company can fire you immediately for misconduct. This creates an imbalance in termination procedures.",
        importance: 'medium'
      }
    ]
  };
};

export const getAnalysisSteps = (): AnalysisStep[] => [
  {
    id: '1',
    title: 'Document Processing',
    description: 'Extracting text and analyzing document structure',
    status: 'completed'
  },
  {
    id: '2', 
    title: 'Legal Term Identification',
    description: 'Identifying legal terminology and key clauses',
    status: 'completed'
  },
  {
    id: '3',
    title: 'Risk Assessment',
    description: 'Evaluating potential risks and obligations',
    status: 'processing'
  },
  {
    id: '4',
    title: 'Plain Language Translation',
    description: 'Converting complex legal language to plain English',
    status: 'pending'
  },
  {
    id: '5',
    title: 'Generating Recommendations',
    description: 'Providing actionable insights and suggestions',
    status: 'pending'
  }
];
