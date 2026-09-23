import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShieldCheck, HeartPulse, CheckCircle2, FileText, ArrowDown, Sparkles, Filter, X } from 'lucide-react';

const FALLBACK_PRODUCTS = [
  { _id: "1", name: 'Premium Californian Almonds (Badam)', description: 'High-protein, 100% natural Californian Badam vacuum packed for elderly crunch and daily heart health.', category: 'Almonds', price: 999, discountPrice: 799, countInStock: 50, image: '/images/almonds.png' },
  { _id: "2", name: 'Authentic Iranian Mamra Almonds', description: 'Rare, 100% oil-rich organic Mamra badam known for brain memory boost and zero cholesterol.', category: 'Almonds', price: 2400, discountPrice: 1999, countInStock: 20, image: '/images/almonds.png' },
  { _id: "3", name: 'W240 Jumbo Cashews (Kaju)', description: 'A-grade, crisp, naturally sweet whole cashews. Soft and easy to chew for seniors.', category: 'Cashews', price: 1200, discountPrice: 999, countInStock: 35, image: '/images/cashews.png' },
  { _id: "4", name: 'Organic Afghan Figs (Anjeer)', description: 'High dietary fiber and calcium-rich dried figs that help digestion and bone strength.', category: 'Figs', price: 850, discountPrice: 699, countInStock: 25, image: '/images/figs.png' },
  { _id: "5", name: 'Kashmiri Snow Walnut Kernels (Akhrot)', description: 'Light-colored, brain-boosting Kashmiri Akhrot, rich in Omega-3 fatty acids for heart wellness.', category: 'Walnuts', price: 1400, discountPrice: 1199, countInStock: 18, image: '/images/walnuts.png' },
  { _id: "6", name: 'Roasted Salted California Pistachios (Pista)', description: 'Perfect lightly salted crunch, rich in antioxidants and lutein for healthy eye care.', category: 'Pistachios', price: 1100, discountPrice: 899, countInStock: 40, image: '/images/cashews.png' },
  { _id: "7", name: 'Royal Medjool Dates (Khajoor)', description: 'King of dates from the Jordan Valley. Soft, naturally sweet, low-glycemic energy booster.', category: 'Dates', price: 950, discountPrice: 749, countInStock: 30, image: '/images/figs.png' },
  { _id: "8", name: 'Indian Golden Long Raisins (Kishmish)', description: 'Naturally sun-dried sweet Kishmish, rich in potassium and iron to fight anemia.', category: 'Raisins', price: 550, discountPrice: 420, countInStock: 60, image: '/images/almonds.png' },
  { _id: "9", name: 'Superfood Seeds Mix (Chia, Flax, Pumpkin)', description: 'Roasted blend of 5 seeds packed with zinc and plant omega-3 for arthritis and joint care.', category: 'Seeds & Berries', price: 650, discountPrice: 499, countInStock: 0, image: '/images/walnuts.png' },
  { _id: "10", name: 'Dried Wild Blueberries & Cranberries', description: 'Antioxidant-dense berries supporting urinary tract and kidney health for seniors.', category: 'Seeds & Berries', price: 1300, discountPrice: 999, countInStock: 15, image: '/images/figs.png' }
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Category Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Subsidy & Apollo Verification Form State
  const [age, setAge] = useState(62);
  const [condition, setCondition] = useState('Senior Citizen Care');
  const [documentName, setDocumentName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [apolloVerified, setApolloVerified] = useState(false);
  const [subsidyPercent, setSubsidyPercent] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) throw new Error('API down');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.warn("Backend offline. Using pre-loaded mock catalog.");
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApolloVerification = (e) => {
    e.preventDefault();
    if (!documentName) {
      alert("Please upload your Apollo Hospital prescription or consultation document first.");
      return;
    }

    setIsVerifying(true);
    // Simulate verification check with Apollo Hospitals Partner EHR network
    setTimeout(() => {
      setIsVerifying(false);
      let calculated = 25; // Base discount for Apollo tie-up
      if (age >= 60) calculated += 10;
      if (age >= 75) calculated += 5;
      if (condition === 'Diabetes Management' || condition === 'Heart Health') calculated += 10;
      if (calculated > 45) calculated = 45;

      setSubsidyPercent(calculated);
      setApolloVerified(true);
    }, 1200);
  };

  // Filter products by Search and Category
  const categories = ['All', 'Almonds', 'Cashews', 'Walnuts', 'Figs', 'Pistachios', 'Dates', 'Raisins', 'Seeds & Berries'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold text-amber-800 animate-pulse">
        Loading Fresh Harvest Catalog...
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      
      {/* Top Partnership Banner */}
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm font-medium shadow-sm">
        <div className="flex items-center space-x-2">
          <HeartPulse className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span><strong>Official Healthcare Partner:</strong> Apollo Hospitals & Clinics Senior Nutrition Program</span>
        </div>
        <button 
          onClick={() => scrollToSection('medical-section')} 
          className="text-emerald-700 underline font-semibold hover:text-emerald-900 flex-shrink-0 ml-2"
        >
          Verify Prescription &rarr;
        </button>
      </div>

      {/* Hero Banner (Compact & Scaled Down) */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white rounded-2xl shadow-lg p-6 sm:p-10 relative overflow-hidden">
        <div className="max-w-2xl space-y-3">
          <span className="inline-block bg-amber-800/80 text-amber-200 border border-amber-700/60 text-xs px-3 py-1 rounded-full font-semibold">
            100% Natural • Vacuum Sealed • Elderly Care
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
            Nutritious Dry Fruits, <br className="hidden sm:inline" />
            Subsidized for Senior Wellness.
          </h1>
          <p className="text-sm sm:text-base text-amber-100/90 font-normal leading-relaxed">
            Cleanly sourced almonds, cashews, figs, and walnuts. In partnership with Apollo Hospitals, get up to <strong>45% medical subsidy</strong> for elderly care, diabetes, and heart health.
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            <button 
              onClick={() => scrollToSection('dryfruits-section')}
              className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow transition"
            >
              Browse Varieties
            </button>
            <button 
              onClick={() => scrollToSection('medical-section')}
              className="bg-white/10 hover:bg-white/20 border border-amber-300/40 text-amber-100 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Apply for Apollo Subsidy (₹)</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: APOLLO HOSPITAL MEDICAL SUBSIDY & VERIFICATION */}
      <section id="medical-section" className="bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/60 rounded-2xl border border-emerald-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Apollo Hospital Care Initiative</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1.5">
              Medical Subsidy & Prescription Verification
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Upload your Apollo Hospital prescription or Senior ID to unlock an instant <strong>up to 45% discount</strong> on all dry fruits.
            </p>
          </div>
          {apolloVerified && (
            <div className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{subsidyPercent}% Subsidy Active!</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-4 text-xs sm:text-sm text-slate-600">
            <h3 className="font-bold text-slate-800 text-sm">How the Apollo Partnership Works:</h3>
            <ul className="space-y-2.5">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span><strong>Senior Citizens (60+):</strong> Guaranteed 25% minimum subsidy.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span><strong>Apollo Hospital Tie-up:</strong> Patients with Apollo prescriptions for diabetes or heart conditions get an extra 10–15% off.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span><strong>Direct Checkout Adjustment:</strong> The discount applies directly to your cart in Indian Rupees (₹).</span>
              </li>
            </ul>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 text-xs uppercase font-semibold">Verification Partner</span>
              <p className="font-bold text-slate-800 text-xs">Apollo Hospitals Healthcare Network • Verified Pharmacy Partner</p>
            </div>
          </div>

          {/* Right Verification Form */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-xl border border-slate-200/90 shadow-sm">
            <form onSubmit={handleApolloVerification} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Age</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="120"
                    value={age} 
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Medical Care Category</label>
                  <select 
                    value={condition} 
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Senior Citizen Care">Senior Care (60+)</option>
                    <option value="Diabetes Management">Diabetes Care (Low Glycemic Index)</option>
                    <option value="Heart Health">Heart & Cholesterol Care</option>
                    <option value="General Fitness & Immunity">General Immunity & Bone Health</option>
                    <option value="Low Income Support">Low Income / Pensioner Relief</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Apollo Hospital Prescription / Senior Card (PDF or Image)
                </label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="file" 
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => setDocumentName(e.target.files[0] ? e.target.files[0].name : '')}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-800 hover:file:bg-emerald-100 cursor-pointer"
                  />
                </div>
                {documentName && (
                  <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Loaded: {documentName}</span>
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isVerifying}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition duration-200 flex items-center justify-center space-x-2"
              >
                {isVerifying ? (
                  <span>Checking with Apollo Partner Network...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify with Apollo & Apply Discount</span>
                  </>
                )}
              </button>
            </form>

            {apolloVerified && (
              <div className="mt-4 bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Apollo Verification Successful!</span>
                </div>
                <p>
                  Based on age ({age} yrs) and {condition}, an additional <strong>{subsidyPercent}% subsidy</strong> is now active on your session. The reduced prices are updated across the catalog below.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: DRY FRUITS VARIETIES & SEARCH */}
      <section id="dryfruits-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                Premium Dry Fruit Varieties
              </h2>
              {apolloVerified && (
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  {subsidyPercent}% Apollo Subsidy Applied
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredProducts.length} items • Vacuum packed for freshness • Prices in Indian Rupees (₹)
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              placeholder="Search almonds, figs, heart..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-600 bg-white"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center space-y-2 border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">No dry fruits match your search "{searchQuery}".</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-xs text-amber-700 font-bold hover:underline"
            >
              Clear filters and view all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              // Calculate effective price if Apollo Subsidy is verified
              const effectivePrice = apolloVerified
                ? Math.round(product.discountPrice * (1 - subsidyPercent / 100))
                : product.discountPrice;

              return (
                <div 
                  key={product._id} 
                  className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Product Image / Placeholder */}
                    <div className="h-44 bg-amber-50/70 flex items-center justify-center overflow-hidden border-b border-slate-100 relative group">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                      ) : (
                        <span className="text-3xl text-amber-700/60">🥜</span>
                      )}

                      {/* Stock badge */}
                      {product.countInStock === 0 && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                          <span className="bg-red-600 text-white font-bold px-2.5 py-1 rounded-md text-xs shadow-xs">
                            Sold Out
                          </span>
                        </div>
                      )}

                      {/* Category tag */}
                      <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-amber-800 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-amber-200">
                        {product.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <Link to={`/product/${product._id}`}>
                        <h3 className="text-sm font-bold text-slate-800 hover:text-amber-800 leading-snug line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-base font-extrabold text-slate-900">
                          ₹{effectivePrice}
                        </span>
                        {effectivePrice < product.price && (
                          <span className="text-[11px] text-slate-400 line-through">
                            ₹{product.price}
                          </span>
                        )}
                      </div>
                      {apolloVerified && (
                        <span className="text-[10px] text-emerald-700 font-semibold block">
                          Apollo {subsidyPercent}% off
                        </span>
                      )}
                    </div>

                    <Link 
                      to={`/product/${product._id}`} 
                      className="bg-amber-800 hover:bg-amber-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 3: SENIOR CITIZEN NUTRITION GUIDE */}
      <section className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-800">
          Why Doctors at Apollo Recommend Daily Dry Fruits for Seniors:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-amber-100 space-y-1">
            <span className="font-bold text-amber-900">Almonds (Badam)</span>
            <p className="text-slate-600">Rich in Vitamin E and antioxidants to maintain cognitive memory and lower LDL cholesterol.</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-amber-100 space-y-1">
            <span className="font-bold text-amber-900">Walnuts (Akhrot)</span>
            <p className="text-slate-600">High plant-based Omega-3 fatty acids that fight arterial inflammation and support heart health.</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-amber-100 space-y-1">
            <span className="font-bold text-amber-900">Figs (Anjeer)</span>
            <p className="text-slate-600">Loaded with soluble dietary fiber and calcium to strengthen weak bones and aid smooth digestion.</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-amber-100 space-y-1">
            <span className="font-bold text-amber-900">Cashews & Pistachios</span>
            <p className="text-slate-600">Soft to chew, providing bioavailable magnesium and zinc for joint mobility and immune defense.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
