import { useState } from 'react';
import { ArrowLeft, Key } from 'lucide-react';
import T2Calculator from '../components/holmer/T2Calculator';
import T3Calculator from '../components/holmer/T3Calculator';
import TF2Calculator from '../components/holmer/TF2Calculator';

type HolmerTab = 'T2' | 'T3' | 'TF2';

interface HolmerPageProps {
  onBack: () => void;
}

export default function HolmerPage({ onBack }: HolmerPageProps) {
  const [activeTab, setActiveTab] = useState<HolmerTab>('T2');

  const tabs: { id: HolmerTab; label: string; icon?: string }[] = [
    { id: 'T2', label: 'Terra Dos T2' },
    { id: 'T3', label: 'Terra Dos T3' },
    { id: 'TF2', label: 'Terra Felis TF2' }
  ];

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
          <h1 className="text-4xl font-bold mb-2 text-emerald-400">Holmer Service Solutions</h1>
          <p className="text-slate-300">Professional machinery service code calculators</p>
        </div>

        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          <div className="flex flex-wrap gap-0 border-b border-slate-700 bg-slate-900 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 md:flex-none px-6 py-4 font-semibold text-sm md:text-base transition-all rounded-lg mx-1 ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-12">
            {activeTab === 'T2' && <T2Calculator />}
            {activeTab === 'T3' && <T3Calculator />}
            {activeTab === 'TF2' && <TF2Calculator />}
          </div>
        </div>
      </div>
    </div>
  );
}
