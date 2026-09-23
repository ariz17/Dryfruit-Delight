import { Link } from 'react-router-dom';
import { ShoppingCart, Search, X, Sun, Moon, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Header() {
  const { 
    profile, 
    subsidyPercent, 
    cart, 
    searchQuery, 
    setSearchQuery, 
    openModal,
    darkMode,
    toggleDarkMode,
    activeSection,
    setActiveSection
  } = useStore();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">

      {/* Top Announcement Bar */}
      <div className="bg-zinc-950 dark:bg-zinc-900 text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400"></span>
            <span>Apollo Hospitals Senior Care Partner · Medical Subsidy up to <strong className="text-white">{subsidyPercent}%</strong> off</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-400">
            <button onClick={() => setActiveSection('health')} className="hover:text-white transition">Health & Subsidy</button>
            <span>·</span>
            <button onClick={() => openModal('dosage')} className="hover:text-white transition">Dosage Planner</button>
            <span>·</span>
            <button onClick={() => openModal('invoice')} className="hover:text-white transition">Mediclaim Invoice</button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Brand */}
        <button
          onClick={() => setActiveSection('home')}
          className="flex items-center gap-3 group flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-sm transition group-hover:scale-105">
            🌰
          </div>
          <div className="text-left">
            <span className="text-base font-extrabold tracking-tight text-zinc-900 dark:text-white block leading-tight">
              DRYFRUIT <span className="font-light text-zinc-400">DELIGHT</span>
            </span>
            <span className="text-xs text-zinc-500 block">Senior Nutrition · Clinical Care</span>
          </div>
        </button>

        {/* Search */}
        <div className="flex-1 max-w-lg hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search almonds, figs, low-GI, heart care..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeSection !== 'dryfruits' && e.target.value.trim()) {
                  setActiveSection('dryfruits');
                }
              }}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-9 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 transition flex items-center justify-center"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode
              ? <Sun className="w-4 h-4 text-yellow-400" />
              : <Moon className="w-4 h-4" />
            }
          </button>

          {/* Patient Profile Button */}
          <button
            onClick={() => setActiveSection('profile')}
            className={`flex items-center gap-2 border px-3 py-2 rounded-xl text-sm transition ${
              activeSection === 'profile'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900 dark:border-white font-bold'
                : 'bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-800 dark:text-zinc-200 flex-shrink-0">
              {profile.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-sm font-semibold truncate max-w-[90px]">{profile.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{subsidyPercent}% Subsidy</p>
            </div>
          </button>

          {/* Cart */}
          <button
            onClick={() => openModal('cart')}
            className="relative bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 dark:text-black text-white h-9 px-4 rounded-xl text-sm font-bold transition flex items-center gap-2 shadow-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalCartCount > 0 && (
              <span className="bg-white text-black dark:bg-black dark:text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border border-zinc-300 dark:border-zinc-700 -mr-1">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
