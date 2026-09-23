import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, HeartPulse, Clock, ShoppingCart, Check, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { profile, subsidyPercent, addToCart, openModal } = useStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const fallback = PRODUCTS.find((p) => p._id === String(id)) || PRODUCTS[0];
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProduct({ ...fallback, ...data });
      } catch {
        setProduct(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-sm font-bold text-zinc-500">Loading Product View...</div>;
  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Product not found</h2>
        <Link to="/" className="text-zinc-500 hover:underline mt-4 inline-block text-xs font-semibold">&larr; Back to Catalog</Link>
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
      <Link to="/" className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
      </Link>

      <div className="bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden flex flex-col md:flex-row border border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
        <div className="md:w-1/2 bg-zinc-100 dark:bg-zinc-900 min-h-[350px] flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 overflow-hidden relative">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-5xl">🥜</span>
          )}
          <span className="absolute top-4 left-4 bg-white dark:bg-black text-[11px] font-bold px-2.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
            {product.category}
          </span>
          <span className="absolute top-4 right-4 bg-zinc-900 text-white dark:bg-white dark:text-black text-[11px] font-bold px-2.5 py-0.5 rounded flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" /> Apollo Approved
          </span>
        </div>

        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <h1 className="text-xl sm:text-2xl font-bold leading-snug">{product.name}</h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{product.description}</p>
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-zinc-500" /> Senior Health Benefit:
              </span>
              <p className="text-zinc-500 dark:text-zinc-400">{product.healthBenefits || 'Optimized for senior metabolic support.'}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-lg">
              <Clock className="w-4 h-4 text-zinc-400 flex-shrink-0" />
              <span><strong>Dosage:</strong> {product.dosage || '5-6 soaked nuts daily'}</span>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-zinc-500 block">Subsidized Price ({profile.name.split(' ')[0]})</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black">₹{subsidizedPrice}</span>
                  <span className="text-sm text-zinc-400 line-through">₹{product.price}</span>
                </div>
              </div>
              <span className="bg-zinc-900 text-white dark:bg-white dark:text-black font-mono font-bold text-xs px-2.5 py-1 rounded">
                {subsidyPercent}% OFF
              </span>
            </div>

            <div className="text-[11px] text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg font-medium flex items-center justify-between">
              <span>Apollo Subsidy Savings:</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">Save ₹{savings}</span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className="w-full py-2.5 text-xs sm:text-sm font-bold text-white dark:text-black bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 disabled:opacity-50 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              {added ? (
                <><Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" /> Added to Cart!</>
              ) : (
                <><ShoppingCart className="w-4 h-4" /> Add to Care Cart — ₹{subsidizedPrice}</>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
            <button onClick={() => openModal('dosage')} className="hover:underline font-semibold">🥗 Dosage Schedule</button>
            <span>•</span>
            <button onClick={() => openModal('soaking')} className="hover:underline font-semibold">🥣 Soaking Tips</button>
            <span>•</span>
            <button onClick={() => openModal('invoice')} className="hover:underline font-semibold">📄 Mediclaim Invoice</button>
          </div>
        </div>
      </div>
    </div>
  );
}
