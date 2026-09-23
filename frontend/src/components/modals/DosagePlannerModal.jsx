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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white p-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🥗</span>
            <div>
              <h3 className="text-base font-bold">Elderly Daily Dosage Planner</h3>
              <p className="text-xs text-amber-200">Personalized dryfruit protocol verified by Apollo Senior Care</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="text-amber-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Condition Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Health Goal or Medical Condition:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.keys(DOSAGE_GUIDES).map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`text-xs p-2.5 rounded-xl border text-center font-semibold transition ${
                    selectedCondition === cond
                      ? 'bg-amber-800 text-white border-amber-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  {cond.replace(' Management', '').replace(' Care', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Plan Summary Card */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">Target Outcome</span>
              <h4 className="text-sm font-bold text-slate-900">{guide.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{guide.target}</p>
            </div>
            <span className="text-xs bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              Apollo Approved
            </span>
          </div>

          {/* Schedule Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Recommended Daily Schedule:
            </h4>
            <div className="space-y-2.5">
              {guide.schedule.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs hover:border-amber-300 transition"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{item.nut}</h5>
                      <p className="text-[11px] text-amber-800 font-medium">
                        {item.count} • <span className="text-slate-500">{item.prep}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg font-medium">
                    {item.benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Apollo Doctor Note */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-emerald-900">
            <HeartPulse className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Clinical Advisory:</strong> {guide.apolloNote}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Includes pre-portioned almonds, walnuts, figs & seeds (Monthly Supply)
            </div>
            <button
              onClick={handleAddDailyPack}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-amber-800 hover:bg-amber-900 text-white shadow-sm'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <span>Add Recommended 30-Day Pack (₹1,299)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
