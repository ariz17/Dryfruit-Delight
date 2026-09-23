import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, HeartPulse, CheckCircle2, FileText, ArrowLeft } from 'lucide-react';

const FALLBACK_PRODUCTS_MAP = {
  "1": { name: 'Premium Californian Almonds (Badam)', description: 'High-protein, 100% natural Californian Badam vacuum packed for elderly crunch and daily heart health.', category: 'Almonds', price: 999, discountPrice: 799, countInStock: 50, image: '/images/almonds.png' },
  "2": { name: 'Authentic Iranian Mamra Almonds', description: 'Rare, 100% oil-rich organic Mamra badam known for brain memory boost and zero cholesterol.', category: 'Almonds', price: 2400, discountPrice: 1999, countInStock: 20, image: '/images/almonds.png' },
  "3": { name: 'W240 Jumbo Cashews (Kaju)', description: 'A-grade, crisp, naturally sweet whole cashews. Soft and easy to chew for seniors.', category: 'Cashews', price: 1200, discountPrice: 999, countInStock: 35, image: '/images/cashews.png' },
  "4": { name: 'Organic Afghan Figs (Anjeer)', description: 'High dietary fiber and calcium-rich dried figs that help digestion and bone strength.', category: 'Figs', price: 850, discountPrice: 699, countInStock: 25, image: '/images/figs.png' },
  "5": { name: 'Kashmiri Snow Walnut Kernels (Akhrot)', description: 'Light-colored, brain-boosting Kashmiri Akhrot, rich in Omega-3 fatty acids for heart wellness.', category: 'Walnuts', price: 1400, discountPrice: 1199, countInStock: 18, image: '/images/walnuts.png' },
  "6": { name: 'Roasted Salted California Pistachios (Pista)', description: 'Perfect lightly salted crunch, rich in antioxidants and lutein for healthy eye care.', category: 'Pistachios', price: 1100, discountPrice: 899, countInStock: 40, image: '/images/cashews.png' },
  "7": { name: 'Royal Medjool Dates (Khajoor)', description: 'King of dates from the Jordan Valley. Soft, naturally sweet, low-glycemic energy booster.', category: 'Dates', price: 950, discountPrice: 749, countInStock: 30, image: '/images/figs.png' },
  "8": { name: 'Indian Golden Long Raisins (Kishmish)', description: 'Naturally sun-dried sweet Kishmish, rich in potassium and iron to fight anemia.', category: 'Raisins', price: 550, discountPrice: 420, countInStock: 60, image: '/images/almonds.png' },
  "9": { name: 'Superfood Seeds Mix (Chia, Flax, Pumpkin)', description: 'Roasted blend of 5 seeds packed with zinc and plant omega-3 for arthritis and joint care.', category: 'Seeds & Berries', price: 650, discountPrice: 499, countInStock: 0, image: '/images/walnuts.png' },
  "10": { name: 'Dried Wild Blueberries & Cranberries', description: 'Antioxidant-dense berries supporting urinary tract and kidney health for seniors.', category: 'Seeds & Berries', price: 1300, discountPrice: 999, countInStock: 15, image: '/images/figs.png' }
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Subsidy Selection State
  const [applySubsidy, setApplySubsidy] = useState(false);
  const [age, setAge] = useState(62);
  const [condition, setCondition] = useState('Senior Citizen Care');
  const [docUploaded, setDocUploaded] = useState(false);
  const [docName, setDocName] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  const [subsidySaved, setSubsidySaved] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setProduct(data);
        setFinalPrice(data.discountPrice);
      } catch (error) {
        const fallback = FALLBACK_PRODUCTS_MAP[id] || {
          _id: id,
          name: 'Californian Almonds',
          description: '100% natural nuts packed for daily health.',
          category: 'Almonds',
          price: 999,
          discountPrice: 799,
          countInStock: 30,
          image: '/images/almonds.png'
        };
        setProduct({ _id: id, ...fallback });
        setFinalPrice(fallback.discountPrice);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Recalculate price when subsidy options change
  useEffect(() => {
    if (!product) return;
    if (!applySubsidy) {
      setFinalPrice(product.discountPrice);
      setSubsidySaved(0);
      return;
    }

    let discountPercent = 25; // Base Apollo subsidy
    if (age >= 60) discountPercent += 10;
    if (age >= 75) discountPercent += 5;
    
    if (condition === 'Diabetes Management' || condition === 'Heart Health') {
      discountPercent += 10;
    }
    if (condition === 'Low Income Support') {
      discountPercent += 10;
    }

    if (discountPercent > 45) discountPercent = 45;

    const discountAmount = Math.round(product.discountPrice * (discountPercent / 100));
    setFinalPrice(product.discountPrice - discountAmount);
    setSubsidySaved(discountAmount);
  }, [applySubsidy, age, condition, product]);

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

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <Link 
        to="/" 
        className="text-amber-800 hover:text-amber-900 text-xs font-semibold inline-flex items-center space-x-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Catalog</span>
      </Link>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-slate-200">
        {/* Product Image */}
        <div className="md:w-1/2 bg-amber-50/60 min-h-[320px] flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 overflow-hidden relative">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="text-center space-y-2">
              <div className="text-5xl">🥜</div>
              <p className="text-amber-800 text-xs font-medium">Fresh Vacuum Pack</p>
            </div>
          )}
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-amber-800 px-2 py-0.5 rounded border border-amber-200">
            {product.category}
          </span>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-snug">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing & Stock Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-slate-900">
                ₹{finalPrice}
              </div>
              {product.price > finalPrice && (
                <div className="text-slate-400 line-through text-xs mt-0.5">
                  Originally ₹{product.price}
                </div>
              )}
            </div>
            <div className={`px-2.5 py-1 text-xs font-bold rounded-md ${
              product.countInStock > 0 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {product.countInStock > 0 ? `${product.countInStock} In Stock` : 'Sold Out'}
            </div>
          </div>

          {/* Apollo Subsidy Eligibility Box */}
          {product.countInStock > 0 && (
            <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4 space-y-3">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={applySubsidy}
                  onChange={(e) => setApplySubsidy(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-emerald-300"
                />
                <span className="font-bold text-emerald-950 text-xs sm:text-sm">
                  Apply Apollo Hospital Senior / Medical Subsidy (Up to 45% Off)
                </span>
              </label>

              {applySubsidy && (
                <div className="space-y-2.5 pt-2 border-t border-emerald-200/60 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Patient Age</label>
                      <input 
                        type="number" 
                        value={age} 
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Medical Condition</label>
                      <select 
                        value={condition} 
                        onChange={(e) => setCondition(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Senior Citizen Care">Senior Care (60+)</option>
                        <option value="Diabetes Management">Diabetes Care</option>
                        <option value="Heart Health">Heart Health</option>
                        <option value="General Fitness & Immunity">Immunity / Bones</option>
                        <option value="Low Income Support">Low Income / Relief</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Upload Apollo Hospital Prescription / Doctor Slip (PDF/Image)
                    </label>
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        setDocUploaded(true);
                        setDocName(e.target.files[0] ? e.target.files[0].name : '');
                      }}
                      className="text-xs w-full text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                    />
                  </div>

                  {subsidySaved > 0 && (
                    <div className="bg-emerald-100/70 text-emerald-900 text-xs px-2.5 py-1.5 rounded-lg border border-emerald-300 font-medium">
                      ✨ Subsidized Price Applied: You save <strong>₹{subsidySaved}</strong> on this order!
                      {docUploaded ? ` (Document: "${docName}" attached for verification)` : " (Attach Apollo prescription to confirm discount)"}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <button 
            disabled={product.countInStock === 0}
            className={`w-full py-3 text-xs sm:text-sm font-bold text-white rounded-xl transition duration-200 shadow-xs 
              ${product.countInStock > 0 ? 'bg-amber-800 hover:bg-amber-900' : 'bg-slate-300 cursor-not-allowed'}`}
          >
            {product.countInStock > 0 
              ? applySubsidy 
                ? `Checkout at Subsidized Price — ₹${finalPrice}` 
                : `Add to Cart — ₹${finalPrice}`
              : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
