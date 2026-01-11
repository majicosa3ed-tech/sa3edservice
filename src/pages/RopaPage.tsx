import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import RopaCalculator from '../components/ropa/RopaCalculator';

interface RopaPageProps {
  onBack: () => void;
}

export default function RopaPage({ onBack }: RopaPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors text-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-blue-400">Ropa Service Solutions</h1>
          <p className="text-slate-300">Ropa tiger 1/2/3/4 & MAUS 2/3/4</p>
        </div>

        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 p-8 md:p-12">
          <RopaCalculator />
        </div>
      </div>
    </div>
  );
}
