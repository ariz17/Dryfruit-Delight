import { X, HeartPulse } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function SoakingGuideModal() {
  const { activeModal, closeModal } = useStore();

  if (activeModal !== 'soaking') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-950 rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-zinc-200 dark:border-zinc-800 shadow-2xl text-zinc-900 dark:text-zinc-100">
        
        {/* Header */}
        <div className="bg-zinc-900 text-white dark:bg-black p-4 flex items-center justify-between sticky top-0 z-10 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🥣</span>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Senior Soaking & Digestion Guide</h3>
              <p className="text-[10px] text-zinc-400">Apollo Geriatric Nutrition Guidelines</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            As we age, stomach acid secretion naturally moderates. Soaking neutralizes enzyme inhibitors and phytic acid, making nutrients up to <strong>90% easier to absorb</strong> for elderly seniors.
          </p>

          {/* 4 Steps */}
          <div className="space-y-2.5">
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-xs flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-zinc-900 dark:text-white">Almonds (Badam) - Soak 8-10 Hours & Peel</h4>
                <p className="text-zinc-500 leading-relaxed text-[11px]">
                  Soak in drinking water overnight. The brown skin contains tannin, which inhibits nutrient absorption. Peeling makes the almond soft and tender for dentures.
                </p>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-xs flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-zinc-900 dark:text-white">Walnuts (Akhrot) - Soak 4-6 Hours</h4>
                <p className="text-zinc-500 leading-relaxed text-[11px]">
                  Soaking releases bitter astringents and activates Omega-3 fatty acids. Tenderizes kernel texture so it dissolves smoothly.
                </p>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-xs flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-zinc-900 dark:text-white">Figs (Anjeer) - Soak in Warm Water (4 Hours)</h4>
                <p className="text-zinc-500 leading-relaxed text-[11px]">
                  Soaking swells natural soluble dietary fibers. Drinking the soak water is clinically recommended to stimulate senior bowel motility.
                </p>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-xs flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-zinc-900 dark:text-white">Raisins (Kishmish) - Consume with Soak Water</h4>
                <p className="text-zinc-500 leading-relaxed text-[11px]">
                  Soak 10 golden raisins overnight. Drink the raisin water in the morning to supply gentle bio-available iron to prevent senior fatigue.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Doctor Tips Card */}
          <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-xs space-y-1.5">
            <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-zinc-500" />
              Elderly Nutrition Guidelines:
            </span>
            <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400 text-[11px]">
              <li>Discard almond soak water; drink raisin and fig soak water.</li>
              <li>Avoid high-heat roasting to protect heart-healthy polyunsaturated oils.</li>
              <li>If chewing is difficult, pulse soaked nuts in a blender into a warm porridge or smoothie.</li>
            </ul>
          </div>

          <button
            onClick={closeModal}
            className="w-full bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-bold text-xs py-2 rounded-lg transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
