import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function CartDrawer() {
  const { cart, removeFromCart, updateCartQuantity, clearCart, activeModal, closeModal, openModal, subsidyPercent, profile } = useStore();
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (activeModal !== 'cart') return null;

  const totalOriginal = cart.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0);
  const subsidyAmount = Math.round(totalOriginal * (subsidyPercent / 100));
  const finalPayable = totalOriginal - subsidyAmount;

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        setOrderComplete(false);
        clearCart();
        closeModal();
        openModal('invoice'); // Immediately offer them the Medical Tax PDF Invoice!
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-sm">Senior Nutrition Cart ({cart.length})</h3>
          </div>
          <button 
            onClick={closeModal}
            className="text-amber-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subsidy notification header */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Apollo Subsidy Applied ({profile.name.split(' ')[0]})</span>
          </div>
          <span className="font-extrabold text-emerald-700">{subsidyPercent}% OFF</span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-slate-500">
              <span className="text-4xl block">🧺</span>
              <p className="text-sm font-semibold text-slate-700">Your care cart is empty</p>
              <p className="text-xs text-slate-400">Add fresh vacuum-sealed dry fruits from the catalog</p>
              <button
                onClick={closeModal}
                className="bg-amber-800 text-white text-xs font-semibold px-4 py-2 rounded-xl mt-2"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemEffective = Math.round(item.discountPrice * (1 - subsidyPercent / 100));
              return (
                <div key={item._id} className="bg-slate-50/80 border border-slate-200 rounded-xl p-3 flex gap-3 items-center">
                  <div className="w-14 h-14 bg-white rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl">🥜</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{item.name}</h4>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-xs font-black text-slate-900">₹{itemEffective}</span>
                      <span className="text-[10px] text-slate-400 line-through">₹{item.discountPrice}</span>
                      <span className="text-[10px] font-bold text-emerald-700">Saved ₹{item.discountPrice - itemEffective}</span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                        className="w-5 h-5 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-800 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                        className="w-5 h-5 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-slate-400 hover:text-rose-600 ml-auto p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-slate-200 p-4 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal (Regular MRP):</span>
                <span>₹{totalOriginal}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Apollo Medical Subsidy ({subsidyPercent}%):</span>
                <span>-₹{subsidyAmount}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery Charges:</span>
                <span className="text-emerald-700 font-bold">FREE (Senior Care)</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Final Amount to Pay:</span>
                <span>₹{finalPayable}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkingOut || orderComplete}
              className={`w-full font-bold text-xs py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 ${
                orderComplete
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              {orderComplete ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Order Placed! Generating Medical PDF Receipt...</span>
                </>
              ) : checkingOut ? (
                <span>Processing Order with Apollo Subsidy...</span>
              ) : (
                <>
                  <span>Proceed to Pay ₹{finalPayable}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
