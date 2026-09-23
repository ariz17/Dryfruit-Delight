import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShieldCheck, 
  HeartPulse, 
  CheckCircle2, 
  FileText, 
  ArrowDown, 
  Sparkles, 
  Filter, 
  X, 
  Plus, 
  ShoppingCart, 
  Clock, 
  Check, 
  ArrowRight,
  RefreshCw,
  PhoneCall,
  Activity,
  Layers,
  Brain,
  Info
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useStore } from '../store/useStore';

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
    description: 'A-grade, crisp, naturally sweet whole cashews. Soft and easy to chew for seniors with dental bridges or dentures.', 
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

export default function Home() {
  const [products, setProducts] = useState(ENRICHED_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  // Global Zustand Store
  const {
    profile,
    setProfile,
    apolloVerified,
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
    openModal
  } = useStore();

  // Verification Form local inputs
  const [ageInput, setAgeInput] = useState(profile.age);
  const [conditionInput, setConditionInput] = useState(profile.condition);
  const [localDocName, setLocalDocName] = useState(prescriptionDoc || '');

  useEffect(() => {
    setAgeInput(profile.age);
    setConditionInput(profile.condition);
  }, [profile]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) throw new Error('API down');
        const data = await res.json();
        // Merge with enriched attributes
        const merged = data.map((apiItem) => {
          const enrich = ENRICHED_PRODUCTS.find(p => p._id === String(apiItem._id) || p.name.includes(apiItem.name)) || {};
          return {
            ...apiItem,
            healthNeeds: enrich.healthNeeds || ['Heart & BP Care'],
            dosage: enrich.dosage || 'Daily recommended senior portion',
            badge: enrich.badge || 'Doctor Approved'
          };
        });
        setProducts(merged);
      } catch (error) {
        console.warn("Backend offline. Using pre-loaded mock catalog.");
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
  };

  const handleLoadSampleRx = () => {
    setLocalDocName('Apollo_Cardiac_Geriatric_Rx.pdf');
    verifyDocument('Apollo_Cardiac_Geriatric_Rx.pdf', 68, 'Diabetes Management');
    setProfile({ age: 68, condition: 'Diabetes Management' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    showToast(`Added ${product.name} to care cart!`);
  };

  // Filter products by Search, Category, and Health Need
  const filteredProducts = products.filter((p) => {
    // Category filter
    const matchesCategory = 
      selectedCategory === 'All' || 
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    // Health need filter
    const matchesHealthNeed = 
      selectedHealthNeed === 'All' || 
      (p.healthNeeds && p.healthNeeds.includes(selectedHealthNeed));

    // Search query filter
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
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

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom duration-200 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Two-Column Layout: Left Sidebar + Right Content */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT COLUMN: Modern Rich Sidebar with Profile, Dryfruit Varieties, Medication & What You Can Do */}
        <Sidebar />

        {/* RIGHT COLUMN: Hero, Medication Form, Products Grid, Features */}
        <div className="flex-1 min-w-0 space-y-8">
          
          {/* Top Banner (Hero) */}
          <div className="bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 text-white rounded-3xl p-6 sm:p-9 shadow-lg relative overflow-hidden border border-amber-800/80">
            {/* Background glowing circular accents */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-600/90 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Apollo Hospitals Senior Nutrition Initiative
                </span>
                <span className="bg-amber-800/60 text-amber-200 border border-amber-700/60 text-[11px] px-2.5 py-1 rounded-full font-medium">
                  100% Natural • Vacuum Sealed
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-amber-50">
                Nutritious Dry Fruits, <br />
                Subsidized for Senior Wellness.
              </h1>

              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-normal">
                Sourced from California, Kashmir, and Iran. Verified by Apollo geriatricians to prevent memory decline, lubricate arthritic joints, and stabilize diabetic blood sugar. Get up to <strong>{subsidyPercent}% medical subsidy</strong> automatically deducted from your cart.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <span>Explore Varieties</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openModal('dosage')}
                  className="bg-white/10 hover:bg-white/20 border border-amber-300/40 text-amber-100 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Elderly Dosage Planner</span>
                </button>
                <button
                  onClick={() => openModal('invoice')}
                  className="bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-500/40 text-emerald-100 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-emerald-300" />
                  <span>Mediclaim Invoice</span>
                </button>
              </div>

              {/* Key Trust Stats Pill Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-amber-800/60 text-center">
                <div className="bg-amber-900/40 rounded-xl p-2 border border-amber-800/40">
                  <p className="text-base sm:text-lg font-black text-amber-300">10</p>
                  <p className="text-[10px] text-amber-200/80 uppercase font-semibold">Dryfruit Varieties</p>
                </div>
                <div className="bg-amber-900/40 rounded-xl p-2 border border-amber-800/40">
                  <p className="text-base sm:text-lg font-black text-emerald-300">45%</p>
                  <p className="text-[10px] text-amber-200/80 uppercase font-semibold">Max Apollo Subsidy</p>
                </div>
                <div className="bg-amber-900/40 rounded-xl p-2 border border-amber-800/40">
                  <p className="text-base sm:text-lg font-black text-amber-300">100%</p>
                  <p className="text-[10px] text-amber-200/80 uppercase font-semibold">Zero Preservatives</p>
                </div>
                <div className="bg-amber-900/40 rounded-xl p-2 border border-amber-800/40">
                  <p className="text-base sm:text-lg font-black text-emerald-300">24 hrs</p>
                  <p className="text-[10px] text-amber-200/80 uppercase font-semibold">Doorstep Dispatch</p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: APOLLO MEDICAL SUBSIDY & PRESCRIPTION VERIFICATION */}
          <section id="medical-section" className="bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/50 rounded-2xl border border-emerald-200 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Apollo EHR Partner Integration</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 mt-1">
                  Medical Subsidy & Apollo Rx Verification
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Patients with doctor prescriptions or senior cards qualify for up to <strong>45% direct reduction</strong>.
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{subsidyPercent}% Subsidy Active</span>
                </span>
                <button
                  onClick={handleLoadSampleRx}
                  className="text-[11px] bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1.5 rounded-xl transition shadow-2xs"
                  title="Instantly test verification with a sample doctor prescription"
                >
                  Load Sample Rx
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Explanatory list */}
              <div className="lg:col-span-5 space-y-3 text-xs text-slate-600">
                <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Subsidy Eligibility Formula:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 bg-white/80 p-2 rounded-lg border border-slate-100">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Base Subsidy:</strong> 25% for all Apollo hospital patients.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/80 p-2 rounded-lg border border-slate-100">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Senior Citizen (60+):</strong> Additional +10% to +15% based on age tier.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/80 p-2 rounded-lg border border-slate-100">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Chronic Conditions:</strong> Additional +10% for Diabetes, Cardiology, or Joint Care.</span>
                  </li>
                </ul>

                <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Active Patient:</span>
                  <span className="font-bold text-slate-800">{profile.name} ({profile.age} yrs)</span>
                </div>
              </div>

              {/* Right Verification Form */}
              <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
                <form onSubmit={handleVerify} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Age</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="120"
                        value={ageInput} 
                        onChange={(e) => setAgeInput(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Medical Care Category</label>
                      <select 
                        value={conditionInput} 
                        onChange={(e) => setConditionInput(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Senior Citizen Care">Senior Care (60+)</option>
                        <option value="Diabetes Management">Diabetes Care (Low Glycemic Index)</option>
                        <option value="Heart Health">Heart & Cholesterol Care</option>
                        <option value="General Fitness & Immunity">General Immunity & Bone Health</option>
                        <option value="Low Income Support">Pensioner / Low Income Relief</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Upload Apollo Rx or Senior ID (PDF or Image)
                    </label>
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => setLocalDocName(e.target.files[0] ? e.target.files[0].name : '')}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-800 hover:file:bg-emerald-100 cursor-pointer"
                    />
                    {localDocName && (
                      <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Document: {localDocName}</span>
                      </p>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isVerifying}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded-xl text-xs transition duration-200 flex items-center justify-center gap-2 shadow-xs"
                  >
                    {isVerifying ? (
                      <span>Verifying with Apollo EHR Network...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verify & Apply {subsidyPercent}% Subsidy to Catalog</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* SECTION: DRY FRUITS VARIETIES CATALOG */}
          <section id="catalog-section" className="space-y-5">
            {/* Header with active filter chips & count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-900">
                    Premium Dry Fruit Varieties
                  </h2>
                  <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    {filteredProducts.length} Available
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Category: <span className="font-semibold text-slate-700">{selectedCategory}</span> • Health Filter: <span className="font-semibold text-slate-700">{selectedHealthNeed}</span>
                </p>
              </div>

              {/* Active Filter Clear Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 self-start sm:self-auto bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg transition"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear All Filters</span>
                </button>
              )}
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center space-y-3 border border-slate-200">
                <span className="text-4xl block">🔍</span>
                <p className="text-sm font-bold text-slate-800">No dry fruits match your current filters.</p>
                <p className="text-xs text-slate-500">Try choosing "All" in the left sidebar or clearing your search term.</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-amber-800 text-white text-xs font-bold px-4 py-2 rounded-xl mt-2 hover:bg-amber-900 transition"
                >
                  Reset Catalog Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => {
                  const subsidizedPrice = Math.round(product.discountPrice * (1 - subsidyPercent / 100));
                  const savings = product.discountPrice - subsidizedPrice;

                  return (
                    <div
                      key={product._id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5"
                    >
                      <div>
                        {/* Image Container with Badges */}
                        <div className="h-44 bg-amber-50/50 flex items-center justify-center overflow-hidden border-b border-slate-100 relative">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <span className="text-4xl text-amber-800/40">🥜</span>
                          )}

                          {/* Category Badge */}
                          <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-amber-900 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-amber-200 shadow-2xs">
                            {product.category}
                          </span>

                          {/* Doctor Approved / Clinical Benefit Badge */}
                          <span className="absolute top-2.5 right-2.5 text-[10px] font-bold text-emerald-800 bg-emerald-50/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-emerald-200 shadow-2xs flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>{product.badge || 'Apollo Approved'}</span>
                          </span>

                          {/* Out of Stock overlay if applicable */}
                          {product.countInStock === 0 && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-2xs flex items-center justify-center">
                              <span className="bg-rose-600 text-white font-bold text-xs px-3 py-1 rounded-md shadow-xs">
                                Sold Out
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-4 space-y-2.5">
                          <Link to={`/product/${product._id}`}>
                            <h3 className="text-sm font-bold text-slate-800 group-hover:text-amber-800 transition line-clamp-1 leading-snug">
                              {product.name}
                            </h3>
                          </Link>

                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>

                          {/* Dosage & Health Benefit Tags */}
                          <div className="pt-1 flex flex-wrap gap-1.5 items-center">
                            <span className="bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>{product.dosage}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: Pricing & Action Buttons */}
                      <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 space-y-2">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-lg font-black text-slate-900">
                                ₹{subsidizedPrice}
                              </span>
                              <span className="text-xs text-slate-400 line-through">
                                ₹{product.price}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-700 block">
                              Apollo {subsidyPercent}% off (Save ₹{savings})
                            </span>
                          </div>

                          <span className="text-[10px] font-mono font-semibold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                            500g Pack
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <Link
                            to={`/product/${product._id}`}
                            className="text-center text-xs font-semibold py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg transition"
                          >
                            Details
                          </Link>
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={product.countInStock === 0}
                            className="text-center text-xs font-bold py-1.5 px-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white rounded-lg transition shadow-xs flex items-center justify-center gap-1"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* SECTION: WHAT YOU CAN DO (FEATURE CARDS) */}
          <section className="bg-gradient-to-r from-amber-50 to-orange-50/60 border border-amber-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">Senior Care Capabilities</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  What You Can Do on Dryfruit Delight:
                </h3>
              </div>
              <span className="text-xs bg-amber-200/80 text-amber-900 font-bold px-2.5 py-1 rounded-lg">
                Exclusive Features
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div 
                onClick={() => openModal('dosage')}
                className="bg-white p-3.5 rounded-xl border border-amber-100 hover:border-amber-300 transition cursor-pointer shadow-2xs space-y-1 hover:shadow-xs"
              >
                <div className="text-xl">🥗</div>
                <h4 className="font-bold text-slate-900">Dosage Planner</h4>
                <p className="text-[11px] text-slate-500">Calculate exact grams & nuts for Diabetes or Heart health.</p>
                <span className="text-[10px] text-amber-800 font-bold underline inline-block pt-1">Open Planner &rarr;</span>
              </div>

              <div 
                onClick={() => openModal('soaking')}
                className="bg-white p-3.5 rounded-xl border border-amber-100 hover:border-amber-300 transition cursor-pointer shadow-2xs space-y-1 hover:shadow-xs"
              >
                <div className="text-xl">🥣</div>
                <h4 className="font-bold text-slate-900">Senior Soaking Guide</h4>
                <p className="text-[11px] text-slate-500">Eliminate tannins; soft texture for seniors with dentures.</p>
                <span className="text-[10px] text-amber-800 font-bold underline inline-block pt-1">Read Guide &rarr;</span>
              </div>

              <div 
                onClick={() => openModal('invoice')}
                className="bg-white p-3.5 rounded-xl border border-amber-100 hover:border-amber-300 transition cursor-pointer shadow-2xs space-y-1 hover:shadow-xs"
              >
                <div className="text-xl">📄</div>
                <h4 className="font-bold text-slate-900">Mediclaim Invoice</h4>
                <p className="text-[11px] text-slate-500">Pre-formatted GST receipt for Income Tax 80D medical claims.</p>
                <span className="text-[10px] text-amber-800 font-bold underline inline-block pt-1">Generate PDF &rarr;</span>
              </div>

              <div 
                onClick={() => openModal('monthlyRefill')}
                className="bg-white p-3.5 rounded-xl border border-amber-100 hover:border-amber-300 transition cursor-pointer shadow-2xs space-y-1 hover:shadow-xs"
              >
                <div className="text-xl">🔄</div>
                <h4 className="font-bold text-slate-900">Monthly Auto-Refill</h4>
                <p className="text-[11px] text-slate-500">Fresh vacuum packs delivered on the 1st of every month.</p>
                <span className="text-[10px] text-amber-800 font-bold underline inline-block pt-1">Subscribe &rarr;</span>
              </div>
            </div>
          </section>

          {/* SECTION: APOLLO GERIATRIC ADVISORY */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-emerald-600" />
              <span>Apollo Hospital Geriatric Nutrition Advisory:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-amber-900 block">Almonds (Badam)</span>
                <p className="text-slate-600">Rich in Vitamin E and polyphenols to maintain cognitive memory and lower LDL cholesterol.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-amber-900 block">Walnuts (Akhrot)</span>
                <p className="text-slate-600">High plant-based Omega-3 fatty acids that fight arterial inflammation and support heart elasticity.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-amber-900 block">Figs (Anjeer)</span>
                <p className="text-slate-600">High soluble dietary fiber and calcium to strengthen weak bone density and ease digestion.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-amber-900 block">Cashews & Seeds</span>
                <p className="text-slate-600">Soft to chew, providing bioavailable magnesium and zinc for joint mobility and immune defense.</p>
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>
  );
}
