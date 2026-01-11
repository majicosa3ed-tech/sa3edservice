import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function T2Calculator() {
  const [inputCode, setInputCode] = useState('12345');
  const [calcMode, setCalcMode] = useState('T2_01');
  const [output, setOutput] = useState('');
  const [warning, setWarning] = useState('');

  const valiAusg = (DblausgWert: number) => {
    const num = Math.trunc(DblausgWert);
    let text = String(num);
    const length = text.length;

    if (num <= 9) text = '0000' + text;
    else if (num <= 99) text = '000' + text;
    else if (num <= 999) text = '00' + text;
    else if (num <= 9999) text = '0' + text;
    else if (num <= 99999) {
      if (length >= 5) text = '0' + text.substring(1, 5);
      else text = text.padStart(5, '0');
    } else if (num >= 100000) {
      if (length >= 6) text = '0' + text.substring(2, 6);
      else text = text.substring(length - 5, length).padStart(5, '0');
    } else text = '?????';

    return text;
  };

  const ermittl_Service_Zahl = (digits: number[]) => {
    return parseFloat(digits.join(''));
  };

  const ermittl_Service_QuerZahl = (digits: number[]) => {
    return digits.reduce((sum, current) => sum + current, 0);
  };

  const calculate = () => {
    setWarning('');
    setOutput('');

    if (inputCode.length !== 5) {
      setWarning(`Error: Input must be exactly 5 digits. (Current: ${inputCode.length})`);
      return;
    }

    const digits = inputCode.split('').map(char => parseInt(char, 10));
    const isAllZeros = digits.every(digit => digit === 0);

    if (isAllZeros) {
      setWarning("Error: Die Servicezahl darf nicht nur aus 0'en bestehen.");
      return;
    }

    const serviZall = ermittl_Service_Zahl(digits);
    const serviQuer = ermittl_Service_QuerZahl(digits);

    let result = 0;

    if (calcMode === 'T2_01') {
      result = (serviZall + 101.0) / serviQuer;
    } else if (calcMode === 'T2_02') {
      result = (serviZall * 7.0) / 58.0;
    } else if (calcMode === 'T2_03') {
      result = (serviZall * 13.0) / serviQuer;
    } else if (calcMode === 'T2_03_1') {
      result = (serviZall * 31.0) / serviQuer;
    }

    setOutput(valiAusg(result));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Enter 5-Digit Service Code:
        </label>
        <input
          type="text"
          maxLength={5}
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.replace(/\D/g, ''))}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white text-center text-lg font-mono focus:outline-none focus:border-emerald-500 transition-colors"
          placeholder="Enter code"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Select Calculation Mode:
        </label>
        <select
          value={calcMode}
          onChange={(e) => setCalcMode(e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
        >
          <option value="T2_01">T2_01 (Service access, model years 1996–2001)</option>
          <option value="T2_02">T2_02 (Service access, built in 2002, SW)</option>
          <option value="T2_03">T2_03 (Variable access from 2003 SW)</option>
          <option value="T2_03_1">T2_03_1 (Service access from 2003 SW)</option>
        </select>
      </div>

      {warning && (
        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{warning}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Generated Code:
        </label>
        <div className="w-full px-4 py-4 bg-emerald-900/30 border-2 border-emerald-500/50 rounded-lg text-center font-mono text-2xl font-bold text-emerald-300 min-h-16 flex items-center justify-center">
          {output || '—'}
        </div>
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
