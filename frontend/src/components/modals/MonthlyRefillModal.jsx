import { useState } from 'react';
import { X, RefreshCw, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function MonthlyRefillModal() {
  const { profile, activeModal, closeModal, subsidyPercent } = useStore();
  const [subscribed, setSubscribed] = useState(false);
  const [frequency, setFrequency] = useState('Every 30 Days');
  const [deliveryDate, setDeliveryDate] = useState('1st of Every Month');

  if (activeModal !== 'monthlyRefill') return null;

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      closeModal();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-950 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-zinc-200 dark:border-zinc-800 shadow-2xl text-zinc-900 dark:text-zinc-100">
        <div className="bg-zinc-900 text-white dark:bg-black p-4 flex items-center justify-between sticky top-0 z-10 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center">
              <RefreshCw className="w-3.5 h-3.5 text-zinc-200" />
            </span>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Monthly Senior Auto-Refill</h3>
              <p className="text-[10px] text-zinc-400">Doorstep delivery scheduled every month</p>
            </div>
          </div>
          <button onClick={closeModal} className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Ensure consistent daily nutrition for <strong>{profile.name}</strong> with automated monthly deliveries. Vacuum packed with 100% nitrogen flush for freshness.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-zinc-50 dark:bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-zinc-500" />
              <span className="font-semibold text-zinc-900 dark:text-white">Free Doorstep Delivery</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-semibold text-zinc-900 dark:text-white">Locked {subsidyPercent}% Subsidy</span>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Refill Frequency</label>
              <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white">
                <option value="Every 30 Days">Every 30 Days (Recommended for 1 Senior)</option>
                <option value="Every 45 Days">Every 45 Days</option>
                <option value="Every 60 Days">Every 60 Days</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Preferred Delivery Day</label>
              <select value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white">
                <option value="1st of Every Month">1st of Every Month (Pension Cycle)</option>
                <option value="5th of Every Month">5th of Every Month</option>
                <option value="10th of Every Month">10th of Every Month</option>
                <option value="15th of Every Month">15th of Every Month</option>
              </select>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-500">Curated Senior Pack:</span>
                <span className="font-bold text-zinc-900 dark:text-white">Almonds + Figs + Walnuts (1.5 kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Retail MRP:</span>
                <span className="line-through text-zinc-400">₹2,850</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                <span>Apollo {subsidyPercent}% Subsidy:</span>
                <span>-₹{Math.round(2850 * (subsidyPercent / 100))}</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-zinc-900 dark:text-white pt-1 border-t border-zinc-200 dark:border-zinc-800">
                <span>Monthly Net Charge:</span>
                <span>₹{Math.round(2850 * (1 - subsidyPercent / 100))}</span>
              </div>
            </div>

            <button type="submit" disabled={subscribed} className="w-full font-bold text-xs py-2.5 rounded-lg transition shadow-xs flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              {subscribed ? (
                <><CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" /><span>Subscription Active! First Dispatch in 24 hrs.</span></>
              ) : (
                <><RefreshCw className="w-3.5 h-3.5" /><span>Activate Monthly Senior Auto-Refill</span></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
