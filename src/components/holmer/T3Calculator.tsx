import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function T3Calculator() {
  const [inputCode, setInputCode] = useState('340678');
  const [results, setResults] = useState({ T3v: '—', T3s: '—', T3a: '—', T3h: '—' });
  const [warning, setWarning] = useState('');

  const valiAusgTyp2 = (value: number) => {
    const num = Math.floor(value);
    const s = String(num);

    if (num <= 999) return '000' + s;
    if (num <= 9999) return '00' + s;
    if (num <= 99999) return '0' + s;
    if (num <= 999999) return s;
    if (num <= 9999999) return s.slice(1, 7);
    return s.slice(2, 8);
  };

  const calculate = () => {
    setWarning('');
    setResults({ T3v: '—', T3s: '—', T3a: '—', T3h: '—' });

    if (!/^\d{6}$/.test(inputCode)) {
      setWarning('Input must be exactly 6 digits.');
      return;
    }

    try {
      const d = inputCode.split('').map(ch => ch.charCodeAt(0) - 48);
      const serviZall = parseInt(inputCode, 10);

      const zV = d[0] + d[1] + d[4] + d[5];
      const zS = d[0] + d[1] + d[2];
      const zA = d[3] + d[4] + d[5];
      const zH = d[3] + d[4];

      if (zV === 0 || zS === 0 || zA === 0 || zH === 0) {
        setWarning('Invalid input (digit sum became 0).');
        return;
      }

      setResults({
        T3v: valiAusgTyp2(serviZall * 234.0 / zV),
        T3s: valiAusgTyp2(serviZall * 456.0 / zS),
        T3a: valiAusgTyp2(serviZall * 987.0 / zA),
        T3h: valiAusgTyp2(serviZall * 876.0 / zH)
      });
    } catch (e) {
      setWarning('Error during calculation');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Enter 6-Digit Service Code:
        </label>
        <input
          type="text"
          maxLength={6}
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.replace(/\D/g, ''))}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white text-center text-lg font-mono focus:outline-none focus:border-emerald-500 transition-colors"
          placeholder="Enter 6-digit code"
        />
      </div>

      {warning && (
        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{warning}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'T3v (Variables Access)', key: 'T3v' },
          { label: 'T3s (Service Access)', key: 'T3s' },
          { label: 'T3a (Equipment Code)', key: 'T3a' },
          { label: 'T3h (Hardware Exchange)', key: 'T3h' }
        ].map((item) => (
          <div key={item.key}>
            <p className="text-sm font-semibold text-slate-300 mb-2">{item.label}:</p>
            <div className="w-full px-4 py-3 bg-emerald-900/30 border-2 border-emerald-500/50 rounded-lg text-center font-mono text-xl font-bold text-emerald-300">
              {results[item.key as keyof typeof results]}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={calculate}
        className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
      >
        Calculate
      </button>
    </div>
  );
}
