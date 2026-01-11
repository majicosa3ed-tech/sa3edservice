import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function MasterKey() {
  const [copied, setCopied] = useState(false);
  const masterKey = '26570';

  const handleCopy = () => {
    navigator.clipboard.writeText(masterKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-emerald-300 mb-4">Holmer Master Key T2 T3 T4 NO MAUS</h3>
        <p className="text-slate-300 text-sm mb-6">
          The universal master key for all Holmer machinery Harvester no MAUSs. This is your primary authentication code.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-semibold text-slate-300">
          Master Access Code:
        </label>
        <div className="relative group">
          <div className="w-full px-6 py-8 bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border-2 border-emerald-500/60 rounded-lg text-center font-mono text-5xl font-bold text-emerald-300 tracking-widest shadow-lg">
            {masterKey}
          </div>
          <button
            onClick={handleCopy}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span className="text-sm font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span className="text-sm font-semibold">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4">
        <p className="text-emerald-300 text-sm leading-relaxed">
          <strong>Note:</strong> This master key grants full access to Holmer machinery service systems. Keep it secure and use it only when necessary.
        </p>
      </div>
    </div>
  );
}
