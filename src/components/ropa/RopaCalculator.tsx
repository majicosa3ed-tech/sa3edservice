import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function RopaCalculator() {
  const [mode, setMode] = useState(1);
  const [inputCode, setInputCode] = useState('');
  const [output, setOutput] = useState('—');
  const [error, setError] = useState('');

  const onlyDigits = (str: string) => str.replace(/\D+/g, '');

  const sumDigitsStr = (numStr: string) => {
    let sum = 0;
    for (let i = 0; i < numStr.length; i++) {
      sum += Number(numStr[i]);
    }
    return sum;
  };

  const calculate = () => {
    const s = onlyDigits(inputCode);
    if (!s) {
      setError('Please enter a valid number');
      setOutput('—');
      return;
    }

    setError('');

    if (mode === 1) {
      setOutput(s);
      return;
    }

    const num = parseInt(s, 10);
    const sum = sumDigitsStr(String(num));
    if (sum === 0) {
      setError('Invalid input: digit sum cannot be zero');
      setOutput('—');
      return;
    }

    const result = Math.floor(num / sum);
    setOutput(String(result));
  };

  const reset = () => {
    setInputCode('');
    setOutput('—');
    setError('');
  };

  const switchMode = () => {
    setMode(mode === 1 ? 2 : 1);
    reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <button
          onClick={() => { setMode(1); reset(); }}
          className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-all ${
            mode === 1
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
          }`}
        >
          Service Code 1
        </button>
        <button
          onClick={() => { setMode(2); reset(); }}
          className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-all ${
            mode === 2
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
          }`}
        >
          Service Code 2
        </button>
        <button
          onClick={switchMode}
          className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-slate-100 font-semibold rounded-lg transition-all"
        >
          Switch
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Input Service Code:
        </label>
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(onlyDigits(e.target.value))}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white text-lg font-mono focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Enter service code"
        />
        <p className="text-slate-400 text-sm mt-2">
          {mode === 1
            ? 'Mode 1'
            : 'Mode 2'}
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Access Code:
        </label>
        <div className="w-full px-4 py-4 bg-blue-900/30 border-2 border-blue-500/50 rounded-lg text-center font-mono text-2xl font-bold text-blue-300 min-h-16 flex items-center justify-center">
          {output}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={calculate}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Get Access Code
        </button>
        <button
          onClick={reset}
          className="flex-1 px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg transition-all duration-200"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
