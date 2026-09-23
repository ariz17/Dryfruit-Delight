import { Home, HeartPulse, User, Sparkles, PhoneCall, Package, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../store/useStore';

const NAV_SECTIONS = [
  { id: 'home', label: 'Home', icon: Home, sub: 'Overview & Dashboard' },
  { id: 'dryfruits', label: 'Dry Fruits', icon: Package, sub: '10 Premium Varieties' },
  { id: 'health', label: 'Health & Subsidy', icon: HeartPulse, sub: 'Apollo Rx & Discounts' },
  { id: 'profile', label: 'My Profile', icon: User, sub: 'Patient Vitals & UHID' },
  { id: 'features', label: 'Tools & Features', icon: Sparkles, sub: 'Planner, Guide & Refill' }
];

const CATEGORIES = [
  { name: 'All', icon: '🌰', count: 10 },
  { name: 'Almonds', icon: '🥜', count: 2 },
  { name: 'Cashews', icon: '🧈', count: 1 },
  { name: 'Walnuts', icon: '🧠', count: 1 },
  { name: 'Figs', icon: '🍯', count: 1 },
  { name: 'Pistachios', icon: '🟢', count: 1 },
  { name: 'Dates', icon: '🌴', count: 1 },
  { name: 'Raisins', icon: '🍇', count: 1 },
  { name: 'Seeds & Berries', icon: '🫐', count: 2 }
];

const HEALTH_FILTERS = [
  { id: 'All', label: 'All Benefits' },
  { id: 'Diabetic-Friendly', label: 'Diabetic-Friendly' },
  { id: 'Heart & BP Care', label: 'Heart & BP Care' },
  { id: 'Bone & Joint', label: 'Bone & Joint' },
  { id: 'Memory & Brain', label: 'Memory & Brain' }
];

export default function Sidebar() {
  const {
    profile, subsidyPercent, selectedCategory, setSelectedCategory,
    selectedHealthNeed, setSelectedHealthNeed, activeSection, setActiveSection
  } = useStore();

  const handleNavFilter = (setter, val) => {
    setter(val);
    if (activeSection !== 'dryfruits' && activeSection !== 'home') setActiveSection('dryfruits');
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-4">
      <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Menu</p>
        </div>
        <nav className="p-2 space-y-1">
          {NAV_SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-150 ${
                  isActive ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-zinc-700 dark:bg-zinc-200' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-black' : 'text-zinc-500 dark:text-zinc-400'}`} />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold leading-tight truncate ${isActive ? '' : 'text-zinc-800 dark:text-zinc-200'}`}>{sec.label}</p>
                  <p className={`text-xs leading-tight truncate mt-0.5 ${isActive ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-400 dark:text-zinc-500'}`}>{sec.sub}</p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Active Patient</p>
          </div>
          <button onClick={() => setActiveSection('profile')} className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
            Edit →
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center font-black text-base text-white dark:text-black flex-shrink-0">
            {profile.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{profile.name}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{profile.condition}</p>
            <p className="text-xs font-mono text-zinc-400 truncate">{profile.uhid}</p>
          </div>
        </div>

        <div className="mt-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl p-2.5 flex items-center justify-between border border-zinc-100 dark:border-zinc-800">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Apollo Subsidy</span>
          <span className="text-sm font-black text-zinc-900 dark:text-white">{subsidyPercent}% OFF</span>
        </div>
      </div>

      {(activeSection === 'dryfruits' || activeSection === 'home') && (
        <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Filter by Type</p>
          </div>

          <div className="p-2 space-y-0.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.name}
                  onClick={() => handleNavFilter(setSelectedCategory, cat.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                    isActive ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md">{cat.count}</span>
                </button>
              );
            })}
          </div>

          <div className="px-3 pb-3 pt-1 border-t border-zinc-100 dark:border-zinc-800 space-y-1 mt-1">
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 px-1 pt-2 pb-1 uppercase tracking-widest">Health Filter</p>
            {HEALTH_FILTERS.map((h) => (
              <button
                key={h.id}
                onClick={() => handleNavFilter(setSelectedHealthNeed, h.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  selectedHealthNeed === h.id ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
            <PhoneCall className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Apollo Helpline</p>
            <p className="text-sm text-zinc-900 dark:text-white font-bold">1800-419-1066</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Toll-free · 9 AM–8 PM IST</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
