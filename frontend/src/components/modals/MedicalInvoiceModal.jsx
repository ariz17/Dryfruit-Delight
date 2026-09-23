import { useState } from 'react';
import { X, FileText, Download, ShieldCheck, CheckCircle2, Printer } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function MedicalInvoiceModal() {
  const { profile, activeModal, closeModal, subsidyPercent } = useStore();
  const [downloading, setDownloading] = useState(false);

  if (activeModal !== 'invoice') return null;

  const invoiceNo = `DFD-MED-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-blue-700/60 flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-200" />
            </span>
            <div>
              <h3 className="text-base font-bold">Medical Insurance & Tax PDF Invoice</h3>
              <p className="text-xs text-blue-200">Pre-formatted for Income Tax Section 80D / Apollo Mediclaim</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="text-blue-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Printable Invoice Container */}
          <div id="printable-invoice" className="border border-slate-300 rounded-xl p-5 bg-white text-slate-800 space-y-4 text-xs font-sans shadow-xs">
            {/* Top Invoice Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-base font-black text-amber-950 tracking-tight">DRYFRUIT DELIGHT HEALTHCARE PVT LTD</h2>
                <p className="text-[11px] text-slate-500">Official Nutrition Partner: Apollo Hospitals Group</p>
                <p className="text-[10px] text-slate-400">GSTIN: 07AAACD1234F1Z8 • FSSAI Lic No: 10020011000341</p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded text-[10px]">
                  MEDICAL RECEIPT
                </span>
                <p className="font-mono font-bold mt-1 text-slate-900">{invoiceNo}</p>
                <p className="text-slate-500 text-[10px]">Date: {dateStr}</p>
              </div>
            </div>

            {/* Patient & Doctor Box */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Patient Details</span>
                <p className="font-bold text-slate-900">{profile.name}</p>
                <p className="text-slate-600">Age: {profile.age} yrs • Blood Group: {profile.bloodGroup}</p>
                <p className="font-mono text-emerald-800 font-semibold">Apollo UHID: {profile.uhid}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verified Doctor & Condition</span>
                <p className="font-bold text-slate-900">{profile.doctor || 'Dr. V. K. Sharma (Cardiology)'}</p>
                <p className="text-slate-600">Rx Condition: {profile.condition}</p>
                <p className="text-emerald-700 font-bold">Apollo Subsidy: {subsidyPercent}% Applied</p>
              </div>
            </div>

            {/* Line Items */}
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] text-slate-500">
                  <th className="py-1.5 font-bold">Item Description (Prescribed Senior Nutrition)</th>
                  <th className="py-1.5 text-center font-bold">Qty</th>
                  <th className="py-1.5 text-right font-bold">Standard Price</th>
                  <th className="py-1.5 text-right font-bold">Apollo Subsidy</th>
                  <th className="py-1.5 text-right font-bold">Net Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2">
                    <p className="font-semibold text-slate-900">Premium Californian Almonds (Vacuum Pack 500g)</p>
                    <p className="text-[10px] text-slate-400">HSN: 08021200 • For cardiac and cognitive care</p>
                  </td>
                  <td className="py-2 text-center">1</td>
                  <td className="py-2 text-right">₹799</td>
                  <td className="py-2 text-right text-emerald-700 font-semibold">-₹{Math.round(799 * (subsidyPercent / 100))}</td>
                  <td className="py-2 text-right font-bold text-slate-900">₹{Math.round(799 * (1 - subsidyPercent / 100))}</td>
                </tr>
                <tr>
                  <td className="py-2">
                    <p className="font-semibold text-slate-900">Organic Afghan Figs - Anjeer (Vacuum Pack 500g)</p>
                    <p className="text-[10px] text-slate-400">HSN: 08042090 • For gastrointestinal and glycemic care</p>
                  </td>
                  <td className="py-2 text-center">1</td>
                  <td className="py-2 text-right">₹699</td>
                  <td className="py-2 text-right text-emerald-700 font-semibold">-₹{Math.round(699 * (subsidyPercent / 100))}</td>
                  <td className="py-2 text-right font-bold text-slate-900">₹{Math.round(699 * (1 - subsidyPercent / 100))}</td>
                </tr>
              </tbody>
            </table>

            {/* Total Calculation */}
            <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-xs">
              <div className="text-[10px] text-slate-500 max-w-xs">
                Certified that the above nutritional dryfruits have been dispensed under Apollo Hospital Geriatric Nutrition Care.
              </div>
              <div className="space-y-1 text-right">
                <div className="text-slate-500">Gross Total: <span className="line-through">₹1,498</span></div>
                <div className="text-emerald-700 font-bold">Apollo {subsidyPercent}% Subsidy: -₹{Math.round(1498 * (subsidyPercent / 100))}</div>
                <div className="text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
                  Total Paid: ₹{Math.round(1498 * (1 - subsidyPercent / 100))} (Inc. GST)
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={closeModal}
              className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 rounded-xl transition"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-1/2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>{downloading ? 'Preparing Print...' : 'Print / Save PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
