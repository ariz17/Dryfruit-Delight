import { useState } from 'react';
import { X, FileText, Printer } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-950 rounded-xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-zinc-200 dark:border-zinc-800 shadow-2xl text-zinc-900 dark:text-zinc-100">
        <div className="bg-zinc-900 text-white dark:bg-black p-4 flex items-center justify-between sticky top-0 z-10 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-zinc-200" />
            </span>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Medical Insurance & Tax PDF Invoice</h3>
              <p className="text-[10px] text-zinc-400">Pre-formatted for Income Tax Section 80D / Apollo Mediclaim</p>
            </div>
          </div>
          <button onClick={closeModal} className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div id="printable-invoice" className="border border-zinc-300 dark:border-zinc-700 rounded-xl p-5 bg-white text-zinc-900 space-y-4 text-xs font-sans shadow-xs">
            <div className="flex justify-between items-start border-b border-zinc-200 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-black tracking-tight">DRYFRUIT DELIGHT HEALTHCARE PVT LTD</h2>
                <p className="text-[11px] text-zinc-600">Official Nutrition Partner: Apollo Hospitals Group</p>
                <p className="text-[10px] text-zinc-400">GSTIN: 07AAACD1234F1Z8 • FSSAI Lic No: 10020011000341</p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-zinc-100 text-black border border-zinc-300 font-bold px-2 py-0.5 rounded text-[10px]">
                  MEDICAL RECEIPT
                </span>
                <p className="font-mono font-bold mt-1 text-black">{invoiceNo}</p>
                <p className="text-zinc-500 text-[10px]">Date: {dateStr}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-zinc-50 p-3 rounded-lg border border-zinc-200">
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Patient Details</span>
                <p className="font-bold text-black">{profile.name}</p>
                <p className="text-zinc-600">Age: {profile.age} yrs • Blood Group: {profile.bloodGroup}</p>
                <p className="font-mono text-black font-semibold">Apollo UHID: {profile.uhid}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Prescribing Doctor & Condition</span>
                <p className="font-bold text-black">{profile.doctor || 'Dr. V. K. Sharma (Cardiology)'}</p>
                <p className="text-zinc-600">Rx Condition: {profile.condition}</p>
                <p className="text-emerald-700 font-bold">Apollo Subsidy: {subsidyPercent}% Applied</p>
              </div>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-[11px] text-zinc-500">
                  <th className="py-1.5 font-bold">Item Description (Prescribed Senior Nutrition)</th>
                  <th className="py-1.5 text-center font-bold">Qty</th>
                  <th className="py-1.5 text-right font-bold">Standard Price</th>
                  <th className="py-1.5 text-right font-bold">Apollo Subsidy</th>
                  <th className="py-1.5 text-right font-bold">Net Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                <tr>
                  <td className="py-2">
                    <p className="font-semibold text-black">Premium Californian Almonds (Vacuum Pack 500g)</p>
                    <p className="text-[10px] text-zinc-500">HSN: 08021200 • For cardiac and cognitive care</p>
                  </td>
                  <td className="py-2 text-center">1</td>
                  <td className="py-2 text-right">₹799</td>
                  <td className="py-2 text-right text-emerald-700 font-semibold">-₹{Math.round(799 * (subsidyPercent / 100))}</td>
                  <td className="py-2 text-right font-bold text-black">₹{Math.round(799 * (1 - subsidyPercent / 100))}</td>
                </tr>
                <tr>
                  <td className="py-2">
                    <p className="font-semibold text-black">Organic Afghan Figs - Anjeer (Vacuum Pack 500g)</p>
                    <p className="text-[10px] text-zinc-500">HSN: 08042090 • For gastrointestinal and glycemic care</p>
                  </td>
                  <td className="py-2 text-center">1</td>
                  <td className="py-2 text-right">₹699</td>
                  <td className="py-2 text-right text-emerald-700 font-semibold">-₹{Math.round(699 * (subsidyPercent / 100))}</td>
                  <td className="py-2 text-right font-bold text-black">₹{Math.round(699 * (1 - subsidyPercent / 100))}</td>
                </tr>
              </tbody>
            </table>

            <div className="border-t border-zinc-200 pt-3 flex justify-between items-center text-xs">
              <div className="text-[10px] text-zinc-500 max-w-xs">
                Certified that the above nutritional dryfruits have been dispensed under Apollo Hospital Senior Nutrition Care.
              </div>
              <div className="space-y-1 text-right">
                <div className="text-zinc-500">Gross Total: <span className="line-through">₹1,498</span></div>
                <div className="text-emerald-700 font-bold">Apollo {subsidyPercent}% Subsidy: -₹{Math.round(1498 * (subsidyPercent / 100))}</div>
                <div className="text-sm font-black text-black pt-1 border-t border-zinc-200">
                  Total Paid: ₹{Math.round(1498 * (1 - subsidyPercent / 100))} (Inc. GST)
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={closeModal} className="w-1/2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs py-2.5 rounded-lg transition">
              Close
            </button>
            <button onClick={handleDownload} disabled={downloading} className="w-1/2 bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-bold text-xs py-2.5 rounded-lg transition shadow-xs flex items-center justify-center gap-1.5">
              <Printer className="w-3.5 h-3.5" />
              <span>{downloading ? 'Preparing Print...' : 'Print / Save PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
