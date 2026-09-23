import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  HeartPulse, 
  CheckCircle2, 
  FileText, 
  X, 
  ShoppingCart, 
  Clock, 
  Check, 
  ArrowRight, 
  User,
  Calendar,
  RefreshCw
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useStore, SAMPLE_PROFILES, calculateSubsidy } from '../store/useStore';

const ENRICHED_PRODUCTS = [
  { 
    _id: "1", 
    name: 'Premium Californian Almonds (Badam)', 
    description: 'High-protein, 100% natural Californian Badam vacuum packed for elderly crunch and daily heart health.', 
    category: 'Almonds', 
    price: 999, 
    discountPrice: 799, 
    countInStock: 50, 
    image: '/images/almonds.png',
    healthNeeds: ['Heart & BP Care', 'Memory & Brain'],
    dosage: '5-6 soaked nuts/day',
    badge: 'Apollo Top Choice'
  },
  { 
    _id: "2", 
    name: 'Authentic Iranian Mamra Almonds', 
    description: 'Rare, 100% oil-rich organic Mamra badam known for brain memory boost, zero cholesterol, and low glycemic index.', 
    category: 'Almonds', 
    price: 2400, 
    discountPrice: 1999, 
    countInStock: 20, 
    image: '/images/almonds.png',
    healthNeeds: ['Diabetic-Friendly', 'Memory & Brain'],
    dosage: '4-5 nuts in morning',
    badge: 'Diabetic Safe'
  },
  { 
    _id: "3", 
    name: 'W240 Jumbo Cashews (Kaju)', 
    description: 'A-grade, crisp, naturally sweet whole cashews. Soft and easy to chew for seniors with dental bridges.', 
    category: 'Cashews', 
    price: 1200, 
    discountPrice: 999, 
    countInStock: 35, 
    image: '/images/cashews.png',
    healthNeeds: ['Bone & Joint'],
    dosage: '4-5 nuts mid-day',
    badge: 'Soft Chew'
  },
  { 
    _id: "4", 
    name: 'Organic Afghan Figs (Anjeer)', 
    description: 'High dietary fiber and calcium-rich dried figs that help senior digestive motility and relieve constipation gently.', 
    category: 'Figs', 
    price: 850, 
    discountPrice: 699, 
    countInStock: 25, 
    image: '/images/figs.png',
    healthNeeds: ['Bone & Joint', 'Heart & BP Care'],
    dosage: '2 soaked figs in warm water',
    badge: 'High Fiber'
  },
  { 
    _id: "5", 
    name: 'Kashmiri Snow Walnut Kernels (Akhrot)', 
    description: 'Light-colored, brain-boosting Kashmiri Akhrot, rich in Alpha-Linolenic Acid (ALA Omega-3) for arterial elasticity.', 
    category: 'Walnuts', 
    price: 1400, 
    discountPrice: 1199, 
    countInStock: 18, 
    image: '/images/walnuts.png',
    healthNeeds: ['Heart & BP Care', 'Memory & Brain'],
    dosage: '2 halves with breakfast',
    badge: 'Omega-3 Rich'
  },
  { 
    _id: "6", 
    name: 'Roasted Salted California Pistachios (Pista)', 
    description: 'Crisp crunch, rich in antioxidants and lutein for healthy senior eye care, macular support, and diabetes control.', 
    category: 'Pistachios', 
    price: 1100, 
    discountPrice: 899, 
    countInStock: 40, 
    image: '/images/cashews.png',
    healthNeeds: ['Diabetic-Friendly'],
    dosage: '10-12 kernels snack',
    badge: 'Low Glycemic'
  },
  { 
    _id: "7", 
    name: 'Royal Medjool Dates (Khajoor)', 
    description: 'King of dates from the Jordan Valley. Soft, naturally sweet, low-glycemic sustained energy booster for active seniors.', 
    category: 'Dates', 
    price: 950, 
    discountPrice: 749, 
    countInStock: 30, 
    image: '/images/figs.png',
    healthNeeds: ['Bone & Joint'],
    dosage: '1 date before walk',
    badge: 'Natural Energy'
  },
  { 
    _id: "8", 
    name: 'Indian Golden Long Raisins (Kishmish)', 
    description: 'Naturally sun-dried sweet Kishmish, rich in bio-available iron and potassium to fight age-related anemia and fatigue.', 
    category: 'Raisins', 
    price: 550, 
    discountPrice: 420, 
    countInStock: 60, 
    image: '/images/almonds.png',
    healthNeeds: ['Heart & BP Care'],
    dosage: '10 soaked raisins in morning',
    badge: 'Hemoglobin Support'
  },
  { 
    _id: "9", 
    name: 'Superfood Seeds Mix (Chia, Flax, Pumpkin)', 
    description: 'Roasted blend of 5 seeds packed with zinc and plant omega-3 for arthritis, joint lubrication, and prostate wellness.', 
    category: 'Seeds & Berries', 
    price: 650, 
    discountPrice: 499, 
    countInStock: 20, 
    image: '/images/walnuts.png',
    healthNeeds: ['Bone & Joint', 'Diabetic-Friendly'],
    dosage: '1 tbsp on yogurt/oats',
    badge: 'Joint Lubricant'
  },
  { 
    _id: "10", 
    name: 'Dried Wild Blueberries & Cranberries', 
    description: 'Antioxidant-dense berries supporting urinary tract health, renal clearance, and micro-vascular circulation in seniors.', 
    category: 'Seeds & Berries', 
    price: 1300, 
    discountPrice: 999, 
    countInStock: 15, 
    image: '/images/figs.png',
    healthNeeds: ['Heart & BP Care'],
    dosage: '1 handful afternoon',
    badge: 'Renal & UTI Care'
  }
];

/* ─── REUSABLE PRODUCT CARD ─────────────────────────── */
function ProductCard({ product, subsidyPercent, onAddToCart }) {
  const subsidizedPrice = Math.round(product.discountPrice * (1 - subsidyPercent / 100));
  const savings = product.discountPrice - subsidizedPrice;
  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 flex flex-col">
      {/* Image */}
      <div className="h-44 bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden">
        {product.image
          ? <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          : <span className="absolute inset-0 flex items-center justify-center text-5xl">🥜</span>
        }
        <span className="absolute top-2.5 left-2.5 text-xs font-bold bg-white dark:bg-black text-zinc-900 dark:text-white px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
          {product.category}
        </span>
        <span className="absolute top-2.5 right-2.5 text-xs font-bold bg-zinc-900 dark:bg-white text-white dark:text-black px-2.5 py-1 rounded-lg shadow-sm">
          {product.badge || 'Apollo Verified'}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 space-y-2">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white hover:underline leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Clock className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
          <span>{product.dosage}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-zinc-900 dark:text-white">₹{subsidizedPrice}</span>
              <span className="text-sm text-zinc-400 line-through">₹{product.price}</span>
            </div>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">
              Save ₹{savings} ({subsidyPercent}% Apollo subsidy)
            </span>
          </div>
          <span className="text-xs text-zinc-400 font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-1 rounded-lg">500g</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/product/${product._id}`}
            className="text-center text-sm font-semibold py-2 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-xl transition"
          >
            Details
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            className="text-center text-sm font-bold py-2 bg-zinc-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-white rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN HOME COMPONENT ───────────────────────────── */
export default function Home() {
  const [products, setProducts] = useState(ENRICHED_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const {
    profile,
    setProfile,
    selectSampleProfile,
    subsidyPercent,
    prescriptionDoc,
    isVerifying,
    verifyDocument,
    selectedCategory,
    setSelectedCategory,
    selectedHealthNeed,
    setSelectedHealthNeed,
    searchQuery,
    setSearchQuery,
    addToCart,
    openModal,
    activeSection,
    setActiveSection
  } = useStore();

  const [ageInput, setAgeInput]         = useState(profile.age);
  const [conditionInput, setConditionInput] = useState(profile.condition);
  const [localDocName, setLocalDocName] = useState(prescriptionDoc || '');

  const [profileFormData, setProfileFormData] = useState({
    name:       profile.name,
    age:        profile.age,
    uhid:       profile.uhid,
    bloodGroup: profile.bloodGroup,
    condition:  profile.condition,
    contact:    profile.contact
  });

  useEffect(() => {
    setAgeInput(profile.age);
    setConditionInput(profile.condition);
    setProfileFormData({
      name:       profile.name,
      age:        profile.age,
      uhid:       profile.uhid,
      bloodGroup: profile.bloodGroup,
      condition:  profile.condition,
      contact:    profile.contact
    });
  }, [profile]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) throw new Error('API down');
        const data = await res.json();
        const merged = data.map((apiItem) => {
          const enrich = ENRICHED_PRODUCTS.find(p => p._id === String(apiItem._id)) || {};
          return {
            ...apiItem,
            healthNeeds: enrich.healthNeeds || ['Heart & BP Care'],
            dosage: enrich.dosage || 'Daily recommended portion',
            badge:  enrich.badge  || 'Apollo Verified'
          };
        });
        setProducts(merged);
      } catch {
        setProducts(ENRICHED_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    verifyDocument(localDocName || 'Apollo_Prescription_SeniorCare.pdf', Number(ageInput), conditionInput);
    setProfile({ age: Number(ageInput), condition: conditionInput });
    showToast(`Prescription verified! ${subsidyPercent}% subsidy active.`);
  };

  const handleLoadSampleRx = () => {
    setLocalDocName('Apollo_Cardiac_Geriatric_Rx.pdf');
    verifyDocument('Apollo_Cardiac_Geriatric_Rx.pdf', 68, 'Diabetes Management');
    setProfile({ age: 68, condition: 'Diabetes Management' });
    showToast('Loaded sample Apollo Rx (68 yrs, Diabetes)');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...profileFormData, age: Number(profileFormData.age) });
    showToast('Profile updated!');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    showToast(`Added ${product.name} to cart!`);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory   = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesHealthNeed = selectedHealthNeed === 'All' || (p.healthNeeds && p.healthNeeds.includes(selectedHealthNeed));
    const query             = searchQuery.toLowerCase().trim();
    const matchesSearch     = !query ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.healthNeeds && p.healthNeeds.some(h => h.toLowerCase().includes(query)));
    return matchesCategory && matchesHealthNeed && matchesSearch;
  });

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedHealthNeed('All');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedHealthNeed !== 'All' || searchQuery !== '';

  /* ── INPUT FIELD STYLE ─ */
  const inputCls = "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition";
  const labelCls = "block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5";

  return (
    <div className="max-w-7xl mx-auto">

      {/* ── TOAST ──────────────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-semibold border border-zinc-700 dark:border-zinc-300 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-green-400 dark:text-green-600" />
          {toastMessage}
        </div>
      )}

      {/* ── LAYOUT: Sidebar + Main Content ─────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <Sidebar />

        <div className="flex-1 min-w-0">

          {/* ══════════════════════════════════════════════════════
              SECTION: HOME
          ══════════════════════════════════════════════════════ */}
          {activeSection === 'home' && (
            <div className="space-y-8">

              {/* Hero */}
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
                <div className="mb-4 flex flex-wrap gap-2 items-center">
                  <span className="bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    Apollo Hospital Partner
                  </span>
                  <span className="border border-zinc-200 dark:border-zinc-700 text-zinc-500 text-xs px-3 py-1 rounded-full">
                    100% Whole Nuts · Zero Additives
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white leading-tight mb-4">
                  Clinical Dry Fruit Nutrition,<br />
                  Subsidized for Senior Wellness.
                </h1>

                <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 max-w-2xl">
                  Curated pure dry fruits certified by geriatric nutritionists. Designed for memory maintenance, joint lubrication, and blood sugar control. Apollo medical subsidy of up to <strong className="text-zinc-900 dark:text-white">{subsidyPercent}%</strong> applies automatically at checkout.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveSection('dryfruits')}
                    className="bg-zinc-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition flex items-center gap-2"
                  >
                    Browse All 10 Varieties
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveSection('health')}
                    className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-semibold text-sm px-5 py-2.5 rounded-xl transition flex items-center gap-2"
                  >
                    <HeartPulse className="w-4 h-4 text-zinc-500" />
                    Health & Subsidy
                  </button>
                  <button
                    onClick={() => setActiveSection('profile')}
                    className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-semibold text-sm px-5 py-2.5 rounded-xl transition flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-zinc-500" />
                    My Profile
                  </button>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: '10 Types',        label: 'Dryfruit Varieties' },
                  { value: `${subsidyPercent}% OFF`, label: 'Apollo Senior Subsidy' },
                  { value: '100% Natural',    label: 'Zero Preservatives' },
                  { value: '24h Dispatch',    label: 'Doorstep Delivery' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 text-center shadow-sm">
                    <p className="text-2xl font-black text-zinc-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1 font-semibold">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Top 3 Picks */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Recommended for You</h2>
                    <p className="text-sm text-zinc-500 mt-0.5">Based on your profile: <strong className="text-zinc-700 dark:text-zinc-300">{profile.condition}</strong></p>
                  </div>
                  <button
                    onClick={() => setActiveSection('dryfruits')}
                    className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition"
                  >
                    View All (10)
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProducts.slice(0, 3).map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      subsidyPercent={subsidyPercent}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Tools */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Senior Care Tools</h2>
                    <p className="text-sm text-zinc-500 mt-0.5">Built specifically for elderly dietary and financial management</p>
                  </div>
                  <button
                    onClick={() => setActiveSection('features')}
                    className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition"
                  >
                    See All →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { emoji: '🥗', title: 'Dosage Planner',    desc: 'Calculate exact grams & portions for Diabetes or Cardiac care.', modal: 'dosage' },
                    { emoji: '🥣', title: 'Soaking Guide',     desc: 'Soft texture protocols for dentures & sensitive digestion.',       modal: 'soaking' },
                    { emoji: '📄', title: 'Mediclaim Invoice', desc: 'Apollo-stamped GST receipt for Section 80D tax deduction.',        modal: 'invoice' },
                    { emoji: '🔄', title: 'Monthly Auto-Refill', desc: 'Scheduled 1st-of-month delivery at locked-in subsidy price.',   modal: 'monthlyRefill' },
                  ].map((tool) => (
                    <div
                      key={tool.modal}
                      onClick={() => openModal(tool.modal)}
                      className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md cursor-pointer transition-all duration-200 flex items-start gap-4"
                    >
                      <span className="text-3xl">{tool.emoji}</span>
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">{tool.title}</h3>
                        <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{tool.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              SECTION: DRY FRUITS CATALOG
          ══════════════════════════════════════════════════════ */}
          {activeSection === 'dryfruits' && (
            <div className="space-y-6">

              {/* Header */}
              <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                    Whole Dry Fruits Catalog
                    <span className="text-sm font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded-full font-mono">{filteredProducts.length} items</span>
                  </h2>
                  <p className="text-sm text-zinc-500 mt-1">
                    Category: <strong className="text-zinc-700 dark:text-zinc-300">{selectedCategory}</strong> · Health: <strong className="text-zinc-700 dark:text-zinc-300">{selectedHealthNeed}</strong>
                  </p>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-medium flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-xl transition self-start sm:self-auto"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-16 text-center space-y-4 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <span className="text-5xl block">🔍</span>
                  <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200">No products match your filters.</p>
                  <p className="text-sm text-zinc-500">Try selecting "All" in the sidebar or clearing your search.</p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-zinc-900 text-white dark:bg-white dark:text-black text-sm font-semibold px-6 py-2.5 rounded-xl mt-2"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      subsidyPercent={subsidyPercent}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              SECTION: HEALTH & SUBSIDY
          ══════════════════════════════════════════════════════ */}
          {activeSection === 'health' && (
            <div className="space-y-6">

              {/* Section Header */}
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
                  Apollo EHR Healthcare Program
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Health & Subsidy Center</h2>
                <p className="text-base text-zinc-500 dark:text-zinc-400 mt-2">
                  Verify your Apollo doctor prescription or senior citizen ID to unlock up to <strong className="text-zinc-900 dark:text-white">45% subsidy</strong> on all products.
                </p>
              </div>

              {/* Subsidy Breakdown */}
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">How the Subsidy is Calculated</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Base Apollo Subsidy', value: '25%', desc: 'Applicable to all patients registered in the Apollo Health Network.' },
                    { title: 'Senior Citizen Add-On', value: '+10% to +15%', desc: '+10% for age 60+, extra +5% for age 75+.' },
                    { title: 'Medical Condition Add-On', value: '+10%', desc: 'For Diabetes, Heart Care, or Low Income conditions.' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                      <span className="text-lg font-black text-zinc-900 dark:text-white w-24 flex-shrink-0">{item.value}</span>
                      <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-white">{item.title}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black">
                    <span className="text-sm font-semibold">Maximum Capped Subsidy</span>
                    <span className="text-xl font-black">45% OFF MRP</span>
                  </div>
                </div>
              </div>

              {/* Rx Verification Form */}
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Verify Prescription / Senior ID</h3>
                  <div className="flex items-center gap-3">
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {subsidyPercent}% Active
                    </span>
                    <button
                      onClick={handleLoadSampleRx}
                      className="text-sm bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold px-4 py-2 rounded-xl transition"
                    >
                      Load Sample Rx
                    </button>
                  </div>
                </div>

                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Patient Age</label>
                      <input type="number" min="1" max="120" value={ageInput} onChange={(e) => setAgeInput(e.target.value)} className={inputCls} required />
                    </div>
                    <div>
                      <label className={labelCls}>Medical Care Category</label>
                      <select value={conditionInput} onChange={(e) => setConditionInput(e.target.value)} className={inputCls}>
                        <option value="Senior Citizen Care">Senior Care (60+)</option>
                        <option value="Diabetes Management">Diabetes Care (Low GI)</option>
                        <option value="Heart Health">Heart & Cholesterol Care</option>
                        <option value="General Fitness & Immunity">General Immunity & Joints</option>
                        <option value="Low Income Support">Pensioner / Low Income Relief</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Prescription / Senior ID Document</label>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => setLocalDocName(e.target.files[0] ? e.target.files[0].name : '')}
                      className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 dark:file:bg-zinc-800 file:text-zinc-800 dark:file:text-zinc-200 cursor-pointer"
                    />
                    {localDocName && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {localDocName}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full bg-zinc-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-white font-bold py-3 px-6 rounded-xl text-sm transition flex items-center justify-center gap-2"
                  >
                    {isVerifying ? (
                      <span>Verifying with Apollo EHR Network...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verify & Apply {subsidyPercent}% Subsidy</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Clinical Guidelines */}
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-zinc-500" />
                  Apollo Clinical Nutrition Guidelines
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Almonds (Badam)',    tip: 'Soak overnight and peel skin to eliminate phytic acid & maximize bio-available vitamin E.' },
                    { name: 'Walnuts (Akhrot)',   tip: 'High plant Omega-3 that protects coronary arteries against plaque buildup.' },
                    { name: 'Figs (Anjeer)',      tip: 'Soak in warm water. High soluble pectin fiber stimulates natural peristalsis for seniors.' },
                    { name: 'Pistachios & Seeds', tip: 'Contains lutein for senior retinal protection, plus zinc and magnesium for arthritic joints.' },
                  ].map((g) => (
                    <div key={g.name} className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-1.5">
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">{g.name}</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{g.tip}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              SECTION: MY PROFILE
          ══════════════════════════════════════════════════════ */}
          {activeSection === 'profile' && (
            <div className="space-y-6">

              {/* Profile Header Card */}
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Patient Profile</h2>
                <p className="text-base text-zinc-500">Manage your senior care account, vitals, and Apollo UHID.</p>

                <div className="mt-5 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black flex items-center justify-center font-black text-2xl flex-shrink-0">
                    {profile.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xl font-bold text-zinc-900 dark:text-white">{profile.name}</p>
                    <p className="text-sm text-zinc-500">Apollo UHID: <span className="font-mono font-semibold">{profile.uhid}</span> · {profile.age} yrs · Blood: {profile.bloodGroup}</p>
                    <p className="text-sm text-zinc-500 mt-0.5">{profile.condition}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-xl text-sm font-bold block text-center">
                      {subsidyPercent}% Subsidy Qualified
                    </span>
                  </div>
                </div>
              </div>

              {/* Switch Senior Profile */}
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Switch Senior Profile</h3>
                <p className="text-sm text-zinc-500">Select a preset profile to switch the active patient.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SAMPLE_PROFILES.map((p) => {
                    const isSelected = profile.name === p.name;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          selectSampleProfile(p.id);
                          showToast(`Switched to ${p.name}`);
                        }}
                        className={`p-4 rounded-xl border text-left transition-all duration-150 ${
                          isSelected
                            ? 'border-zinc-900 dark:border-white bg-zinc-100 dark:bg-zinc-900'
                            : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-400 dark:hover:border-zinc-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${isSelected ? 'bg-zinc-900 dark:bg-white text-white dark:text-black' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}>
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-zinc-900 dark:text-white">{p.name}</p>
                            <p className="text-xs text-zinc-500">{p.age} yrs</p>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{p.condition}</p>
                        <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mt-1">{p.uhid}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Edit Profile Form */}
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-5">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Edit Patient Vitals</h3>

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name</label>
                      <input type="text" value={profileFormData.name} onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })} className={inputCls} required />
                    </div>
                    <div>
                      <label className={labelCls}>Age (Years)</label>
                      <input type="number" min="1" max="120" value={profileFormData.age} onChange={(e) => setProfileFormData({ ...profileFormData, age: e.target.value })} className={inputCls} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Apollo UHID / Senior Health ID</label>
                      <input type="text" value={profileFormData.uhid} onChange={(e) => setProfileFormData({ ...profileFormData, uhid: e.target.value })} className={`${inputCls} font-mono`} required />
                    </div>
                    <div>
                      <label className={labelCls}>Blood Group</label>
                      <select value={profileFormData.bloodGroup} onChange={(e) => setProfileFormData({ ...profileFormData, bloodGroup: e.target.value })} className={inputCls}>
                        <option value="O+">O positive (O+)</option>
                        <option value="A+">A positive (A+)</option>
                        <option value="B+">B positive (B+)</option>
                        <option value="AB+">AB positive (AB+)</option>
                        <option value="O-">O negative (O-)</option>
                        <option value="A-">A negative (A-)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Primary Medical Condition</label>
                      <select value={profileFormData.condition} onChange={(e) => setProfileFormData({ ...profileFormData, condition: e.target.value })} className={inputCls}>
                        <option value="Senior Citizen Care">Senior Care (60+)</option>
                        <option value="Diabetes Management">Diabetes Care</option>
                        <option value="Heart Health">Heart & Cholesterol Care</option>
                        <option value="General Fitness & Immunity">General Immunity & Bones</option>
                        <option value="Low Income Support">Pensioner / Low Income</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Emergency Caregiver Contact</label>
                      <input type="text" value={profileFormData.contact} onChange={(e) => setProfileFormData({ ...profileFormData, contact: e.target.value })} className={inputCls} />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="bg-zinc-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-white font-bold text-sm py-2.5 px-6 rounded-xl transition flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              SECTION: TOOLS & FEATURES
          ══════════════════════════════════════════════════════ */}
          {activeSection === 'features' && (
            <div className="space-y-6">

              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Tools & Features</h2>
                <p className="text-base text-zinc-500 mt-2">
                  Interactive clinical tools tailored for elderly dietary balance, digestion, tax invoicing, and auto-delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    emoji: '🥗',
                    title: 'Elderly Dosage Planner',
                    desc: 'Calculates daily grams and exact count of almonds, walnuts, figs, and seeds customized to your chronic condition.',
                    action: 'Open Dosage Planner',
                    modal: 'dosage'
                  },
                  {
                    emoji: '🥣',
                    title: 'Senior Soaking & Digestion Guide',
                    desc: 'Essential overnight soaking protocols to remove tannin acid and tenderize nuts for seniors with dental bridges or dentures.',
                    action: 'Read Soaking Guide',
                    modal: 'soaking'
                  },
                  {
                    emoji: '📄',
                    title: 'Mediclaim & Section 80D Invoice',
                    desc: 'Generate official Apollo Hospital-stamped GST receipts formatted for medical reimbursement and income tax deductions.',
                    action: 'Generate Medical PDF',
                    modal: 'invoice'
                  },
                  {
                    emoji: '🔄',
                    title: 'Monthly Senior Auto-Refill',
                    desc: 'Subscribe to automatic fresh vacuum pack shipments on the 1st of every month with zero delivery charges.',
                    action: 'Set Up Auto-Refill',
                    modal: 'monthlyRefill'
                  },
                ].map((tool) => (
                  <div
                    key={tool.modal}
                    className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3">
                      <span className="text-4xl block">{tool.emoji}</span>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{tool.title}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{tool.desc}</p>
                    </div>
                    <button
                      onClick={() => openModal(tool.modal)}
                      className="self-start bg-zinc-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-white font-semibold text-sm py-2.5 px-5 rounded-xl transition"
                    >
                      {tool.action} →
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
