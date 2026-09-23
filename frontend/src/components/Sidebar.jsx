import { 
  HeartPulse, 
  ShieldCheck, 
  User, 
  Sparkles, 
  FileText, 
  Calendar, 
  Clock, 
  PhoneCall, 
  ChevronRight, 
  CheckCircle2, 
  Info, 
  Flame, 
  Apple, 
  Brain, 
  Activity, 
  Layers,
  ArrowRight,
  RefreshCw,
  Award
} from 'lucide-react';
import { useStore } from '../store/useStore';

const CATEGORIES = [
  { name: 'All', icon: '🌰', count: 10 },
  { name: 'Almonds', icon: '🥜', count: 2, tag: 'Brain & Heart' },
  { name: 'Cashews', icon: '🧈', count: 1, tag: 'Bones & Energy' },
  { name: 'Walnuts', icon: '🧠', count: 1, tag: 'Omega-3 Rich' },
  { name: 'Figs', icon: '🍯', count: 1, tag: 'High Fiber' },
  { name: 'Pistachios', icon: '🟢', count: 1, tag: 'Eye & Lutein' },
  { name: 'Dates', icon: '🌴', count: 1, tag: 'Low GI Energy' },
  { name: 'Raisins', icon: '🍇', count: 1, tag: 'Iron & Blood' },
  { name: 'Seeds & Berries', icon: '🫐', count: 2, tag: 'Antioxidants' }
];

const HEALTH_FILTERS = [
  { id: 'All', label: 'All Benefits', icon: Activity },
  { id: 'Diabetic-Friendly', label: 'Diabetic-Friendly (Low GI)', icon: HeartPulse, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { id: 'Heart & BP Care', label: 'Heart & BP (Omega-3)', icon: Activity, color: 'text-rose-700 bg-rose-50 border-rose-200' },
  { id: 'Bone & Joint', label: 'Bones & Calcium', icon: Layers, color: 'text-amber-700 bg-amber-50 border-amber-200' },
  { id: 'Memory & Brain', label: 'Memory & Neuro', icon: Brain, color: 'text-purple-700 bg-purple-50 border-purple-200' }
];

export default function Sidebar() {
  const {
    profile,
    apolloVerified,
    subsidyPercent,
    selectedCategory,
    setSelectedCategory,
    selectedHealthNeed,
    setSelectedHealthNeed,
    openModal
  } = useStore();

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
      
      {/* SECTION 1: SENIOR PATIENT PROFILE CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition hover:shadow-md">
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-4 text-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-200 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              Patient Profile
            </span>
            <button
              onClick={() => openModal('profile')}
              className="text-[11px] font-semibold bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-md transition"
              title="Switch or Edit Senior Profile"
            >
              Switch / Edit
            </button>
          </div>
          <div className="mt-3 flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-emerald-950/40 border border-emerald-300/40 flex items-center justify-center font-bold text-amber-200 text-lg flex-shrink-0 shadow-inner">
              {profile.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-white truncate">{profile.name}</h4>
              <p className="text-xs text-emerald-100 flex items-center gap-1.5 mt-0.5">
                <span>{profile.age} yrs</span>
                <span>•</span>
                <span className="font-mono bg-emerald-900/60 px-1.5 py-0.2 rounded text-[10px] text-emerald-200">
                  {profile.uhid}
                </span>
                <span>•</span>
                <span className="text-[10px] font-semibold">{profile.bloodGroup}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3 bg-slate-50/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Care Category:</span>
            <span className="font-semibold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded-md text-[11px]">
              {profile.condition}
            </span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <div className="text-left">
                <p className="text-[11px] font-bold text-emerald-900 leading-tight">Apollo Medical Subsidy</p>
                <p className="text-[10px] text-emerald-700">Verified Apollo EHR Partner</p>
              </div>
            </div>
            <span className="bg-emerald-600 text-white font-extrabold text-xs px-2 py-1 rounded-lg shadow-xs">
              {subsidyPercent}% OFF
            </span>
          </div>

          {/* Today's Soaked Nut Tracker */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" />
                Daily Soaked Dose
              </span>
              <span className="text-emerald-700 font-bold">Recommended</span>
            </div>
            <div className="text-[11px] text-slate-600 flex flex-wrap gap-1.5">
              <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">5 Soaked Badam</span>
              <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">2 Anjeer</span>
              <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">1 Akhrot</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: DRY FRUITS VARIETIES & HEALTH FILTERS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span className="text-base">🌰</span>
            Dryfruits Varieties
          </h3>
          <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
            10 Types
          </span>
        </div>

        {/* Categories list */}
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition text-left ${
                  isActive
                    ? 'bg-amber-900 text-white font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-amber-50/80 hover:text-amber-900'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm">{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {cat.tag && !isActive && (
                    <span className="text-[10px] text-slate-400 hidden xl:inline">
                      {cat.tag}
                    </span>
                  )}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isActive ? 'bg-amber-800 text-amber-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {cat.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Health Needs Filter */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-600 block">
            Filter by Senior Health Need:
          </span>
          <div className="flex flex-col gap-1.5">
            {HEALTH_FILTERS.map((h) => {
              const isSelected = selectedHealthNeed === h.id;
              const Icon = h.icon;
              return (
                <button
                  key={h.id}
                  onClick={() => setSelectedHealthNeed(h.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition text-left ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                  <span>{h.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 3: MEDICATION & APOLLO SUBSIDY STATUS */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white rounded-2xl border border-emerald-200 p-4 space-y-3.5 shadow-sm">
        <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-emerald-600" />
            Medication & Rx
          </h3>
          <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow-xs">
            <CheckCircle2 className="w-3 h-3" />
            Verified
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-100 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-[11px]">Apollo Doctor:</span>
              <span className="font-bold text-slate-800 text-[11px]">{profile.doctor || 'Dr. V. K. Sharma'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-[11px]">Rx Document:</span>
              <span className="font-mono text-emerald-800 font-semibold text-[10px] truncate max-w-[150px]">
                {profile.docName || 'Apollo_Rx.pdf'}
              </span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-slate-100">
              <span className="text-slate-500 text-[11px]">Subsidy Rate:</span>
              <span className="font-extrabold text-emerald-700 text-xs">{subsidyPercent}% Government/Apollo</span>
            </div>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('medical-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verify Prescription / Adjust Rate</span>
          </button>

          {/* Toll Free Helpline */}
          <div className="bg-emerald-900 text-emerald-100 p-2.5 rounded-xl flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <p className="font-bold text-white text-[11px]">Apollo Dietitian Helpline</p>
                <p className="text-[10px] text-emerald-300">1800-419-1066 (Toll Free)</p>
              </div>
            </div>
            <span className="text-[9px] bg-emerald-800 text-emerald-200 px-1.5 py-0.5 rounded font-semibold uppercase">Free</span>
          </div>
        </div>
      </div>

      {/* SECTION 4: WHAT YOU CAN DO (INTERACTIVE CAPABILITIES) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
        <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            What You Can Do
          </h3>
          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
            5 Features
          </span>
        </div>

        <p className="text-[11px] text-slate-500 leading-snug">
          Instant tools designed for elderly health, caregiving & medical savings:
        </p>

        <div className="space-y-2">
          {/* 1. Dosage Planner */}
          <button
            onClick={() => openModal('dosage')}
            className="w-full group bg-slate-50 hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 rounded-xl p-2.5 transition text-left flex items-start justify-between"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 group-hover:text-amber-900">
                <span>🥗</span>
                <span>Elderly Dosage Planner</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Calculate daily grams & nuts customized for {profile.condition}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition flex-shrink-0 mt-0.5" />
          </button>

          {/* 2. Soaking & Digestion Guide */}
          <button
            onClick={() => openModal('soaking')}
            className="w-full group bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 rounded-xl p-2.5 transition text-left flex items-start justify-between"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 group-hover:text-emerald-900">
                <span>🥣</span>
                <span>Senior Soaking Guide</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Overnight soaking instructions for sensitive digestion & dentures
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition flex-shrink-0 mt-0.5" />
          </button>

          {/* 3. Insurance & Tax PDF Invoice */}
          <button
            onClick={() => openModal('invoice')}
            className="w-full group bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 rounded-xl p-2.5 transition text-left flex items-start justify-between"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 group-hover:text-blue-900">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Medical Claim PDF Invoice</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Download Apollo-stamped GST invoice for tax & mediclaim rebate
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition flex-shrink-0 mt-0.5" />
          </button>

          {/* 4. Monthly Auto-Refill */}
          <button
            onClick={() => openModal('monthlyRefill')}
            className="w-full group bg-slate-50 hover:bg-purple-50/80 border border-slate-200 hover:border-purple-300 rounded-xl p-2.5 transition text-left flex items-start justify-between"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 group-hover:text-purple-900">
                <RefreshCw className="w-3.5 h-3.5 text-purple-600" />
                <span>Monthly Senior Auto-Refill</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Scheduled doorstep delivery with vacuum-sealed freshness guarantee
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition flex-shrink-0 mt-0.5" />
          </button>

          {/* 5. Direct Apollo Verification */}
          <button
            onClick={() => {
              const el = document.getElementById('medical-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full group bg-slate-50 hover:bg-teal-50/80 border border-slate-200 hover:border-teal-300 rounded-xl p-2.5 transition text-left flex items-start justify-between"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 group-hover:text-teal-900">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Apollo Rx 45% Subsidy</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Verify prescription online in seconds for instant cart discount
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition flex-shrink-0 mt-0.5" />
          </button>
        </div>
      </div>

    </aside>
  );
}
