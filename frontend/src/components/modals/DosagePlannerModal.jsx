import { useState } from 'react';
import { X, Sparkles, Check, HeartPulse, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

const DOSAGE_GUIDES = {
  'Senior Citizen Care': {
    title: 'Senior Vitality & Bone Care Pack',
    target: 'Age 60+ daily energy, digestion & bone density',
    schedule: [
      { nut: 'Californian / Mamra Almonds', count: '5-6 kernels', prep: 'Soaked overnight & peeled', benefit: 'Cognitive memory & zero LDL cholesterol' },
      { nut: 'Kashmiri Walnuts (Akhrot)', count: '1-2 halves', prep: 'Eaten raw with breakfast', benefit: 'Omega-3 fatty acids for arterial elasticity' },
      { nut: 'Afghan Figs (Anjeer)', count: '2 pieces', prep: 'Soaked in warm water 4 hours', benefit: 'High soluble fiber to prevent constipation' },
      { nut: 'Roasted Seeds Mix', count: '1 teaspoon', prep: 'Sprinkled on porridge/curd', benefit: 'Zinc & magnesium for joint lubrication' }
    ],
    apolloNote: 'Doctor recommended: Always peel almonds for seniors to eliminate tannin acid which slows gastric absorption.'
  },
  'Diabetes Management': {
    title: 'Diabetic Low-Glycemic Nut Schedule',
    target: 'Glycemic stabilization & insulin sensitivity',
    schedule: [
      { nut: 'Authentic Mamra Almonds', count: '6 kernels', prep: 'Soaked 8 hrs', benefit: 'High monounsaturated fat; blunts post-meal glucose spike' },
      { nut: 'Kashmiri Walnuts', count: '2 whole nuts', prep: 'Raw / lightly crushed', benefit: 'Improves endothelial blood flow & HbA1c control' },
      { nut: 'Roasted California Pistachios', count: '8-10 kernels', prep: 'Lightly salted or unsalted', benefit: 'Rich in lutein and low GI; prevents sugar dips' },
      { nut: 'Chia & Flax Seeds', count: '1 tablespoon', prep: 'Soaked in water 15 min', benefit: 'Forms gel that slows down carb digestion' }
    ],
    apolloNote: 'Apollo Endocrinology advisory: Strictly avoid sugar-coated dry fruits. Limit dates and raisins to max 1 unit or substitute with figs.'
  },
  'Heart Health': {
    title: 'Cardiac Omega & Blood Flow Pack',
    target: 'Arterial health, lowering triglycerides & BP',
    schedule: [
      { nut: 'Kashmiri Walnuts (Akhrot)', count: '2-3 halves', prep: 'Morning on empty stomach', benefit: 'Rich in Alpha-Linolenic Acid (ALA) protecting arteries' },
      { nut: 'Californian Almonds', count: '6 kernels', prep: 'Soaked overnight', benefit: 'Vitamin E prevents plaque oxidation' },
      { nut: 'Dried Cranberries & Blueberries', count: '1 small handful', prep: 'Raw', benefit: 'Potent polyphenols support capillary flexibility' },
      { nut: 'Afghan Figs', count: '1-2 pieces', prep: 'Soaked in lukewarm milk', benefit: 'Natural potassium counteracts high sodium BP' }
    ],
    apolloNote: 'Apollo Cardiology note: Nuts naturally contain zero trans-fats and zero dietary cholesterol.'
  },
  'General Fitness & Immunity': {
    title: 'Immunity & Active Senior Blend',
    target: 'Daily stamina, immunity & healthy aging',
    schedule: [
      { nut: 'Jumbo Cashews (W240)', count: '4-5 nuts', prep: 'Snack between meals', benefit: 'Bioavailable copper & zinc for infection defense' },
      { nut: 'Royal Medjool Dates', count: '1-2 dates', prep: 'Mid-morning natural boost', benefit: 'Rich in iron, potassium and natural sugars' },
      { nut: 'Almonds & Walnuts', count: '4 almonds + 1 walnut', prep: 'Soaked', benefit: 'Complete antioxidant defense' },
      { nut: 'Golden Kishmish (Raisins)', count: '8-10 pieces', prep: 'Soaked overnight', benefit: 'Helps fight anemia and boosts hemoglobin' }
    ],
    apolloNote: 'Apollo Geriatrics note: Consistent daily moderate intake is 3x more effective than sporadic high intake.'
  }
};

export default function DosagePlannerModal() {
  const { profile, activeModal, closeModal, addToCart } = useStore();
  const [selectedCondition, setSelectedCondition] = useState(
    DOSAGE_GUIDES[profile.condition] ? profile.condition : 'Senior Citizen Care'
  );
  const [added, setAdded] = useState(false);

  if (activeModal !== 'dosage') return null;

  const guide = DOSAGE_GUIDES[selectedCondition] || DOSAGE_GUIDES['Senior Citizen Care'];

  const handleAddDailyPack = () => {
    // Add representative pack to cart
    addToCart({
      _id: 'dosage-bundle',
      name: `Apollo Senior Daily Nutrition Pack (${selectedCondition})`,
      price: 1850,
      discountPrice: 1299,
      image: '/images/almonds.png',
      category: 'Nutrition Pack'
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-950 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-200 dark:border-zinc-800 shadow-2xl text-zinc-900 dark:text-zinc-100">
        
        {/* Modal Header */}
        <div className="bg-zinc-900 text-white dark:bg-black p-4 flex items-center justify-between sticky top-0 z-10 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🥗</span>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Elderly Daily Dosage Planner</h3>
              <p className="text-[10px] text-zinc-400">Personalized dryfruit protocol verified by Apollo Senior Care</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Condition Selector */}
          <div>
            <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Select Health Goal or Condition:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.keys(DOSAGE_GUIDES).map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`text-xs p-2 rounded-lg border text-center font-semibold transition ${
                    selectedCondition === cond
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900 dark:border-white shadow-xs'
                      : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100'
                  }`}
                >
                  {cond.replace(' Management', '').replace(' Care', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Plan Summary Card */}
          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3.5 flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Target Outcome</span>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{guide.title}</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">{guide.target}</p>
            </div>
            <span className="text-[10px] bg-zinc-900 text-white dark:bg-white dark:text-black font-bold px-2 py-0.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400 dark:text-emerald-600" />
              Apollo Approved
            </span>
          </div>

          {/* Schedule Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Recommended Daily Portions:
            </h4>
            <div className="space-y-2">
              {guide.schedule.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 border border-zinc-200 dark:border-zinc-700">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-zinc-900 dark:text-white">{item.nut}</h5>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        {item.count} • <span className="text-zinc-400">{item.prep}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded font-mono">
                    {item.benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Apollo Doctor Note */}
          <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
            <HeartPulse className="w-4 h-4 text-zinc-500 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Clinical Note:</strong> {guide.apolloNote}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <div className="text-[11px] text-zinc-500">
              Pre-portioned vacuum sealed supply for {selectedCondition}
            </div>
            <button
              onClick={handleAddDailyPack}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-xs'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <span>Add Recommended 30-Day Pack (₹1,299)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
