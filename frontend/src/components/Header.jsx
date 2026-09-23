import { Link } from 'react-router-dom';
import { ShoppingCart, HeartPulse, ShieldCheck, User, Search, X, Sparkles, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Header() {
  const { 
    profile, 
    subsidyPercent, 
    apolloVerified, 
    cart, 
    searchQuery, 
    setSearchQuery, 
    openModal 
  } = useStore();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white sticky top-0 z-40 border-b border-amber-800/80 shadow-md">
      {/* Top micro bar for Apollo senior announcement */}
      <div className="bg-emerald-900/90 text-emerald-100 text-[11px] py-1 px-4 border-b border-emerald-800 flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span><strong>Apollo Healthcare Tie-Up:</strong> Up to 45% Senior Subsidy active across all 10 dryfruit varieties</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => openModal('dosage')} 
              className="hover:text-white underline text-emerald-200 transition"
            >
              Dosage Planner
            </button>
            <span>•</span>
            <button 
              onClick={() => openModal('soaking')} 
              className="hover:text-white underline text-emerald-200 transition"
            >
              Soaking Guide
            </button>
            <span>•</span>
            <button 
              onClick={() => openModal('invoice')} 
              className="hover:text-white underline text-emerald-200 transition"
            >
              Mediclaim Invoice (PDF)
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Healthcare tag */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-amber-950 font-black text-lg shadow-sm">
              🌰
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-amber-50">
                Dryfruit <span className="text-amber-300 font-light">Delight</span>
              </span>
              <span className="block text-[9px] uppercase tracking-wider font-bold text-amber-300/80 -mt-1">
                Senior Nutrition & Healthcare
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1.5 bg-amber-800/60 border border-amber-700/60 px-2.5 py-1 rounded-full text-[11px] text-amber-200">
            <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">Apollo Partner</span>
          </div>
        </div>

        {/* Global Live Search Box */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-amber-300/60 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search almonds, figs, low-GI, heart health..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-amber-950/70 border border-amber-700/60 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-amber-200/50 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-amber-950"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-amber-300/60 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Icons: Profile, Cart, Verification Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Senior Patient Quick Button */}
          <button
            onClick={() => openModal('profile')}
            className="flex items-center gap-2 bg-amber-800/50 hover:bg-amber-800 border border-amber-700/50 px-2.5 py-1.5 rounded-xl text-xs transition text-left"
            title="View & Edit Patient Profile"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[11px] font-bold text-white shadow-xs">
              {profile.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-[11px] font-bold text-white truncate max-w-[110px]">{profile.name}</p>
              <p className="text-[10px] text-emerald-300 font-semibold">{subsidyPercent}% Apollo Subsidy</p>
            </div>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => openModal('cart')}
            className="relative bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalCartCount > 0 && (
              <span className="bg-amber-400 text-amber-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center -ml-0.5">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
