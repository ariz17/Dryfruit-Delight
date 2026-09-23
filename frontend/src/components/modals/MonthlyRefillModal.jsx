import { useState } from 'react';
import { X, RefreshCw, CheckCircle2, ShieldCheck, Calendar, Truck, HeartHandshake } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white p-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-purple-700/60 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-purple-200" />
            </span>
            <div>
              <h3 className="text-base font-bold">Monthly Senior Auto-Refill</h3>
              <p className="text-xs text-purple-200">Never run out of essential doctor-prescribed nuts</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="text-purple-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-slate-700">
          <p className="text-xs text-slate-600 leading-relaxed">
            Ensure consistent daily nutrition for <strong>{profile.name}</strong> without the hassle of monthly manual re-ordering. Sealed in airtight nitrogen flush pouches for peak crunch and zero rancidity.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-100 flex items-center gap-2">
              <Truck className="w-4 h-4 text-purple-700 flex-shrink-0" />
              <span className="font-semibold text-purple-950">Free Priority Delivery</span>
            </div>
            <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span className="font-semibold text-emerald-950">Fixed {subsidyPercent}% Subsidy</span>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Refill Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-1 focus:ring-purple-500"
              >
                <option value="Every 30 Days">Every 30 Days (Recommended for 1 Senior)</option>
                <option value="Every 45 Days">Every 45 Days</option>
                <option value="Every 60 Days">Every 60 Days</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Doorstep Delivery Day</label>
              <select
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-1 focus:ring-purple-500"
              >
                <option value="1st of Every Month">1st of Every Month (Pension Cycle)</option>
                <option value="5th of Every Month">5th of Every Month</option>
                <option value="10th of Every Month">10th of Every Month</option>
                <option value="15th of Every Month">15th of Every Month</option>
              </select>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Curated Senior Pack:</span>
                <span className="font-bold text-slate-900">Almonds + Figs + Walnuts (1.5 kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Retail MRP:</span>
                <span className="line-through text-slate-400">₹2,850</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Apollo {subsidyPercent}% Subsidy:</span>
                <span>-₹{Math.round(2850 * (subsidyPercent / 100))}</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-1 border-t border-slate-200">
                <span>Monthly Net Charge:</span>
                <span>₹{Math.round(2850 * (1 - subsidyPercent / 100))}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={subscribed}
              className={`w-full font-bold text-xs py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 ${
                subscribed
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-800 hover:bg-purple-900 text-white'
              }`}
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscription Active! First Dispatch in 24 hrs.</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Activate Monthly Senior Auto-Refill</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
