import { Link } from 'react-router-dom';
import { ShoppingCart, LogIn, HeartPulse } from 'lucide-react';

export default function Header() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-amber-900 text-white shadow-sm sticky top-0 z-50 border-b border-amber-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link to="/" className="text-lg sm:text-xl font-bold tracking-tight text-amber-50">
            Dryfruit <span className="font-light text-amber-200">Delight</span>
          </Link>
          <span className="hidden md:inline-flex items-center space-x-1 bg-amber-800/80 text-[11px] px-2 py-0.5 rounded text-amber-200 border border-amber-700/60 font-medium">
            <HeartPulse className="w-3 h-3 text-emerald-400" />
            <span>Apollo Hospitals Partner</span>
          </span>
        </div>

        <nav className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
          <button 
            onClick={() => scrollTo('medical-section')} 
            className="text-amber-100 hover:text-white transition font-medium hidden sm:inline"
          >
            Medical Subsidy
          </button>
          <button 
            onClick={() => scrollTo('dryfruits-section')} 
            className="text-amber-100 hover:text-white transition font-medium hidden sm:inline"
          >
            Dry Fruits
          </button>
          <Link to="/" className="hover:text-amber-200 transition flex items-center space-x-1 font-medium">
            <ShoppingCart size={16} />
            <span>Cart</span>
          </Link>
          <Link to="/" className="hover:text-amber-200 transition flex items-center space-x-1 font-medium">
            <LogIn size={16} />
            <span>Sign In</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
