import { X, Clock, Droplets, CheckCircle2, AlertCircle, HeartPulse } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function SoakingGuideModal() {
  const { activeModal, closeModal } = useStore();

  if (activeModal !== 'soaking') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🥣</span>
            <div>
              <h3 className="text-base font-bold">Senior Soaking & Digestion Guide</h3>
              <p className="text-xs text-emerald-200">Apollo Geriatric Nutrition Guidelines</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-slate-700">
          <p className="text-xs text-slate-600 leading-relaxed">
            As we age, stomach acid secretion decreases and chewing capacity may be impacted by dental changes. Soaking breaks down enzyme inhibitors and phytic acid, making nutrients up to <strong>90% easier to absorb</strong> for seniors.
          </p>

          {/* 4 Steps */}
          <div className="space-y-3">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="space-y-0.5 text-xs">
                <h4 className="font-bold text-slate-900">Almonds (Badam) - Soak 8-10 Hours & Peel</h4>
                <p className="text-slate-600 leading-relaxed">
                  Soak in pure drinking water overnight. The brown peel contains <strong>tannin</strong>, which binds to iron and zinc. Peeling takes 2 seconds and makes the almond soft and easily chewable.
                </p>
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-800 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="space-y-0.5 text-xs">
                <h4 className="font-bold text-slate-900">Walnuts (Akhrot) - Soak 4-6 Hours</h4>
                <p className="text-slate-600 leading-relaxed">
                  Soaking releases bitter tannins and activates <strong>Omega-3 fatty acids</strong>. It also softens the walnut kernel so it melts effortlessly in the mouth without hurting dentures.
                </p>
              </div>
            </div>

            <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-purple-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="space-y-0.5 text-xs">
                <h4 className="font-bold text-slate-900">Figs (Anjeer) - Soak in Warm Water / Milk</h4>
                <p className="text-slate-600 leading-relaxed">
                  Soak 2 dried figs in a cup of warm water or milk for 3 hours. Drink the infused liquid and eat the plump fruit. This is India’s top doctor-endorsed natural remedy for senior constipation.
                </p>
              </div>
            </div>

            <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-teal-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div className="space-y-0.5 text-xs">
                <h4 className="font-bold text-slate-900">Raisins (Kishmish) - Consume with Soak Water</h4>
                <p className="text-slate-600 leading-relaxed">
                  Soak 10 golden raisins overnight. Drink the raisin water in the morning to supply gentle bio-available iron to prevent anemia and fatigue.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Doctor Tips Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1.5">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-emerald-600" />
              Golden Rules for Elderly Consumption:
            </span>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              <li>Always discard almond soak water; drink raisin and fig soak water.</li>
              <li>Do not roast at high temperatures (preserves healthy mono-unsaturated fats).</li>
              <li>If chewing is difficult, pulse soaked nuts in a blender into a nutrient smoothie.</li>
            </ul>
          </div>

          <button
            onClick={closeModal}
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2.5 rounded-xl transition"
          >
            Understood, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
