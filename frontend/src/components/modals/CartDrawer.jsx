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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-2xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-md h-full flex flex-col shadow-2xl border-l border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-right duration-300 text-zinc-900 dark:text-zinc-100">
        
        {/* Header */}
        <div className="bg-zinc-900 text-white dark:bg-black p-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-zinc-300" />
            <h3 className="font-bold text-sm tracking-tight">Care Cart ({cart.length})</h3>
          </div>
          <button 
            onClick={closeModal}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subsidy notification header */}
        <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Apollo Subsidy Applied ({profile.name.split(' ')[0]})</span>
          </div>
          <span className="font-mono font-bold text-zinc-900 dark:text-white bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[11px]">
            {subsidyPercent}% OFF
          </span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-zinc-500">
              <span className="text-3xl block">🧺</span>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Your care cart is empty</p>
              <p className="text-[11px] text-zinc-400">Add fresh whole dry fruits from the catalog</p>
              <button
                onClick={closeModal}
                className="bg-zinc-900 text-white dark:bg-white dark:text-black text-xs font-semibold px-4 py-2 rounded-lg mt-2"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemEffective = Math.round(item.discountPrice * (1 - subsidyPercent / 100));
              return (
                <div key={item._id} className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex gap-3 items-center">
                  <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl">🥜</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{item.name}</h4>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-xs font-black text-zinc-900 dark:text-white">₹{itemEffective}</span>
                      <span className="text-[10px] text-zinc-400 line-through">₹{item.discountPrice}</span>
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Save ₹{item.discountPrice - itemEffective}</span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                        className="w-5 h-5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                        className="w-5 h-5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white ml-auto p-1"
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
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/60 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal (Regular MRP):</span>
                <span>₹{totalOriginal}</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                <span>Apollo Medical Subsidy ({subsidyPercent}%):</span>
                <span>-₹{subsidyAmount}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Doorstep Delivery:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-zinc-900 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span>Final Payable Amount:</span>
                <span>₹{finalPayable}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkingOut || orderComplete}
              className="w-full font-bold text-xs py-3 rounded-lg transition shadow-xs flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 disabled:opacity-50"
            >
              {orderComplete ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                  <span>Order Placed! Generating Tax PDF...</span>
                </>
              ) : checkingOut ? (
                <span>Applying Apollo Subsidy & Finalizing...</span>
              ) : (
                <>
                  <span>Pay ₹{finalPayable} (With Subsidy)</span>
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
