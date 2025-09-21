import React from 'react';
import { Scale, Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Scale className="h-8 w-8 text-blue-400" />
              <Brain className="h-4 w-4 text-emerald-400 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold">LegalAI</h1>
              <p className="text-xs text-slate-300">Demystifying Legal Documents</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">History</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Help</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
