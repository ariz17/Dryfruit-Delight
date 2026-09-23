import { useState } from 'react';
import { X, User, ShieldCheck, HeartPulse, Check, AlertCircle } from 'lucide-react';
import { useStore, SAMPLE_PROFILES, calculateSubsidy } from '../../store/useStore';

export default function ProfileModal() {
  const { profile, setProfile, selectSampleProfile, activeModal, closeModal, subsidyPercent } = useStore();

  const [formData, setFormData] = useState({
    name: profile.name,
    age: profile.age,
    uhid: profile.uhid,
    bloodGroup: profile.bloodGroup,
    condition: profile.condition,
    contact: profile.contact
  });

  if (activeModal !== 'profile') return null;

  const currentCalculated = calculateSubsidy(Number(formData.age) || 60, formData.condition);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile({
      ...formData,
      age: Number(formData.age)
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-emerald-700/60 flex items-center justify-center">
              <User className="w-4 h-4 text-emerald-200" />
            </span>
            <div>
              <h3 className="text-base font-bold">Patient / Senior Profile</h3>
              <p className="text-xs text-emerald-200">Apollo Healthcare Partner Network</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Quick Switch Preset Profiles */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Quick Switch Preset Senior Profiles:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SAMPLE_PROFILES.map((p) => {
                const isSelected = profile.name === p.name;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      selectSampleProfile(p.id);
                      setFormData({
                        name: p.name,
                        age: p.age,
                        uhid: p.uhid,
                        bloodGroup: p.bloodGroup,
                        condition: p.condition,
                        contact: p.contact
                      });
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-emerald-50/40 text-slate-700'
                    }`}
                  >
                    <p className="font-bold truncate">{p.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{p.age} yrs • {p.condition.replace(' Management', '')}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Age (Years)</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Apollo UHID / Health ID</label>
                <input
                  type="text"
                  value={formData.uhid}
                  onChange={(e) => setFormData({ ...formData, uhid: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="O+">O positive (O+)</option>
                  <option value="A+">A positive (A+)</option>
                  <option value="B+">B positive (B+)</option>
                  <option value="AB+">AB positive (AB+)</option>
                  <option value="O-">O negative (O-)</option>
                  <option value="A-">A negative (A-)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Medical Care Category</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Senior Citizen Care">Senior Care (60+)</option>
                <option value="Diabetes Management">Diabetes Care (Low Glycemic Index)</option>
                <option value="Heart Health">Heart & Cholesterol Care</option>
                <option value="General Fitness & Immunity">General Immunity & Bone Health</option>
                <option value="Low Income Support">Pensioner / Low Income Relief</option>
              </select>
            </div>

            {/* Live Subsidy Rate Preview */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-900 block">Eligible Apollo Subsidy Rate</span>
                <span className="text-[10px] text-emerald-700">Calculated automatically from age ({formData.age} yrs) and {formData.condition}</span>
              </div>
              <span className="bg-emerald-600 text-white font-black text-sm px-3 py-1 rounded-lg shadow-xs">
                {currentCalculated}% OFF
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
