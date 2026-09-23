import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  HeartPulse, 
  CheckCircle2, 
  FileText, 
  ArrowLeft, 
  Clock, 
  ShoppingCart, 
  Sparkles, 
  Check 
} from 'lucide-react';
import { useStore } from '../store/useStore';

const FALLBACK_PRODUCTS_MAP = {
  "1": { name: 'Premium Californian Almonds (Badam)', description: 'High-protein, 100% natural Californian Badam vacuum packed for elderly crunch and daily heart health.', category: 'Almonds', price: 999, discountPrice: 799, countInStock: 50, image: '/images/almonds.png', dosage: '5-6 soaked nuts/day', healthBenefits: 'Maintains brain cognitive memory and lowers LDL cholesterol.' },
  "2": { name: 'Authentic Iranian Mamra Almonds', description: 'Rare, 100% oil-rich organic Mamra badam known for brain memory boost, zero cholesterol, and low glycemic index.', category: 'Almonds', price: 2400, discountPrice: 1999, countInStock: 20, image: '/images/almonds.png', dosage: '4-5 nuts in morning', healthBenefits: 'Blunts post-meal glucose spike; ideal for Type-2 Diabetes.' },
  "3": { name: 'W240 Jumbo Cashews (Kaju)', description: 'A-grade, crisp, naturally sweet whole cashews. Soft and easy to chew for seniors with dental bridges or dentures.', category: 'Cashews', price: 1200, discountPrice: 999, countInStock: 35, image: '/images/cashews.png', dosage: '4-5 nuts mid-day', healthBenefits: 'Provides copper and magnesium for bone density and joint mobility.' },
  "4": { name: 'Organic Afghan Figs (Anjeer)', description: 'High dietary fiber and calcium-rich dried figs that help senior digestive motility and relieve constipation gently.', category: 'Figs', price: 850, discountPrice: 699, countInStock: 25, image: '/images/figs.png', dosage: '2 soaked figs in warm water', healthBenefits: 'High soluble dietary fiber and calcium to strengthen weak bone density.' },
  "5": { name: 'Kashmiri Snow Walnut Kernels (Akhrot)', description: 'Light-colored, brain-boosting Kashmiri Akhrot, rich in Alpha-Linolenic Acid (ALA Omega-3) for arterial elasticity.', category: 'Walnuts', price: 1400, discountPrice: 1199, countInStock: 18, image: '/images/walnuts.png', dosage: '2 halves with breakfast', healthBenefits: 'Reduces arterial inflammation and lowers stroke risk.' },
  "6": { name: 'Roasted Salted California Pistachios (Pista)', description: 'Crisp crunch, rich in antioxidants and lutein for healthy senior eye care, macular support, and diabetes control.', category: 'Pistachios', price: 1100, discountPrice: 899, countInStock: 40, image: '/images/cashews.png', dosage: '10-12 kernels snack', healthBenefits: 'High lutein and zeaxanthin for senior eyesight preservation.' },
  "7": { name: 'Royal Medjool Dates (Khajoor)', description: 'King of dates from the Jordan Valley. Soft, naturally sweet, low-glycemic sustained energy booster for active seniors.', category: 'Dates', price: 950, discountPrice: 749, countInStock: 30, image: '/images/figs.png', dosage: '1 date before walk', healthBenefits: 'Natural low-glycemic energy and potassium.' },
  "8": { name: 'Indian Golden Long Raisins (Kishmish)', description: 'Naturally sun-dried sweet Kishmish, rich in bio-available iron and potassium to fight age-related anemia and fatigue.', category: 'Raisins', price: 550, discountPrice: 420, countInStock: 60, image: '/images/almonds.png', dosage: '10 soaked raisins in morning', healthBenefits: 'Restores red blood cell counts and curbs weakness.' },
  "9": { name: 'Superfood Seeds Mix (Chia, Flax, Pumpkin)', description: 'Roasted blend of 5 seeds packed with zinc and plant omega-3 for arthritis, joint lubrication, and prostate wellness.', category: 'Seeds & Berries', price: 650, discountPrice: 499, countInStock: 20, image: '/images/walnuts.png', dosage: '1 tbsp on yogurt/oats', healthBenefits: 'Essential zinc and plant fats to prevent joint inflammation.' },
  "10": { name: 'Dried Wild Blueberries & Cranberries', description: 'Antioxidant-dense berries supporting urinary tract health, renal clearance, and micro-vascular circulation in seniors.', category: 'Seeds & Berries', price: 1300, discountPrice: 999, countInStock: 15, image: '/images/figs.png', dosage: '1 handful afternoon', healthBenefits: 'PAC antioxidants protect kidney filtration and bladder wellness.' }
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const { profile, subsidyPercent, apolloVerified, addToCart, openModal } = useStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        const fallback = FALLBACK_PRODUCTS_MAP[id] || {};
        setProduct({
          ...fallback,
          ...data
        });
      } catch (error) {
        const fallback = FALLBACK_PRODUCTS_MAP[id] || {
          _id: id,
          name: 'Californian Almonds',
          description: '100% natural nuts packed for daily health.',
          category: 'Almonds',
          price: 999,
          discountPrice: 799,
          countInStock: 30,
          image: '/images/almonds.png',
          dosage: '5-6 soaked nuts/day',
          healthBenefits: 'Maintains brain cognitive memory and lowers LDL cholesterol.'
        };
        setProduct({ _id: id, ...fallback });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-sm font-bold text-amber-800">Loading Product View...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-800">Product not found</h2>
        <Link to="/" className="text-amber-700 hover:underline mt-4 inline-block text-xs font-semibold">
          &larr; Back to Catalog
        </Link>
      </div>
    );
  }

  const subsidizedPrice = Math.round(product.discountPrice * (1 - subsidyPercent / 100));
  const savings = product.discountPrice - subsidizedPrice;

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openModal('cart');
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-zinc-900 dark:text-zinc-100">
      <Link 
        to="/" 
        className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Catalog</span>
      </Link>

      <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-xs overflow-hidden flex flex-col md:flex-row border border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
        {/* Product Image */}
        <div className="md:w-1/2 bg-zinc-100 dark:bg-zinc-900 min-h-[350px] flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 overflow-hidden relative">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="text-center space-y-2">
              <div className="text-5xl">🥜</div>
              <p className="text-zinc-400 text-xs font-medium">Fresh Vacuum Pack</p>
            </div>
          )}
          <span className="absolute top-4 left-4 bg-white dark:bg-black text-[11px] font-bold text-zinc-900 dark:text-white px-2.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 shadow-2xs">
            {product.category}
          </span>
          <span className="absolute top-4 right-4 bg-zinc-900 text-white dark:bg-white dark:text-black text-[11px] font-bold px-2.5 py-0.5 rounded shadow-2xs flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
            <span>Apollo Approved</span>
          </span>
        </div>

        {/* Product Details & Actions */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white leading-snug">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {product.description}
            </p>

            {/* Clinical Benefit Highlight */}
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-zinc-900 dark:text-white">
                <HeartPulse className="w-4 h-4 text-zinc-500" />
                Senior Health Benefit:
              </span>
              <p className="text-zinc-500 dark:text-zinc-400">{product.healthBenefits || 'Optimized for senior metabolic support.'}</p>
            </div>

            {/* Recommended Dosage */}
            <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-lg">
              <Clock className="w-4 h-4 text-zinc-400 flex-shrink-0" />
              <span><strong>Dosage:</strong> {product.dosage || '5-6 soaked nuts daily'}</span>
            </div>
          </div>

          {/* Pricing Card with Apollo Subsidy */}
          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-zinc-500 block">Subsidized Price ({profile.name.split(' ')[0]})</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-zinc-900 dark:text-white">
                    ₹{subsidizedPrice}
                  </span>
                  <span className="text-sm text-zinc-400 line-through">
                    ₹{product.price}
                  </span>
                </div>
              </div>
              <span className="bg-zinc-900 text-white dark:bg-white dark:text-black font-mono font-bold text-xs px-2.5 py-1 rounded shadow-xs">
                {subsidyPercent}% OFF
              </span>
            </div>

            <div className="text-[11px] text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg font-medium flex items-center justify-between">
              <span>Apollo Healthcare Subsidy Savings:</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">Save ₹{savings}</span>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="w-full py-2.5 text-xs sm:text-sm font-bold text-white dark:text-black bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 disabled:opacity-50 rounded-lg transition duration-200 shadow-xs flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Care Cart — ₹{subsidizedPrice}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick links to tools */}
          <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
            <button
              onClick={() => openModal('dosage')}
              className="text-zinc-700 dark:text-zinc-300 hover:underline font-semibold"
            >
              🥗 Dosage Schedule
            </button>
            <span>•</span>
            <button
              onClick={() => openModal('soaking')}
              className="text-zinc-700 dark:text-zinc-300 hover:underline font-semibold"
            >
              🥣 Soaking Tips
            </button>
            <span>•</span>
            <button
              onClick={() => openModal('invoice')}
              className="text-zinc-700 dark:text-zinc-300 hover:underline font-semibold"
            >
              📄 Mediclaim Invoice
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
