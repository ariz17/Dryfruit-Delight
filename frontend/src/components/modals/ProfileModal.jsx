import { useState } from 'react';
import { X, User, Check } from 'lucide-react';
import { useStore, SAMPLE_PROFILES, calculateSubsidy } from '../../store/useStore';

export default function ProfileModal() {
  const { profile, setProfile, selectSampleProfile, activeModal, closeModal } = useStore();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-950 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-zinc-200 dark:border-zinc-800 shadow-2xl text-zinc-900 dark:text-zinc-100">
        
        {/* Header */}
        <div className="bg-zinc-900 text-white dark:bg-black p-4 flex items-center justify-between sticky top-0 z-10 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-zinc-200" />
            </span>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Patient Senior Profile</h3>
              <p className="text-[10px] text-zinc-400">Apollo Healthcare Partner Network</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Quick Switch Preset Profiles */}
          <div>
            <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Preset Senior Profiles:
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
                    className={`p-2.5 rounded-lg border text-left text-xs transition ${
                      isSelected
                        ? 'border-zinc-900 dark:border-white bg-zinc-100 dark:bg-zinc-900 font-bold'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
                    }`}
                  >
                    <p className="font-bold text-zinc-900 dark:text-white truncate">{p.name}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{p.age} yrs • {p.condition.replace(' Management', '')}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Age (Years)</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Apollo UHID</label>
                <input
                  type="text"
                  value={formData.uhid}
                  onChange={(e) => setFormData({ ...formData, uhid: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
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
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Primary Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
              >
                <option value="Senior Citizen Care">Senior Care (60+)</option>
                <option value="Diabetes Management">Diabetes Care (Low Glycemic Index)</option>
                <option value="Heart Health">Heart & Cholesterol Care</option>
                <option value="General Fitness & Immunity">General Immunity & Bone Health</option>
                <option value="Low Income Support">Pensioner / Low Income Relief</option>
              </select>
            </div>

            {/* Live Subsidy Rate Preview */}
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-zinc-900 dark:text-white block">Apollo Subsidy Rate</span>
                <span className="text-[10px] text-zinc-500">Calculated for age {formData.age} yrs and {formData.condition}</span>
              </div>
              <span className="bg-zinc-900 text-white dark:bg-white dark:text-black font-mono font-bold text-xs px-2.5 py-1 rounded">
                {currentCalculated}% OFF
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="w-1/2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-bold text-xs py-2 rounded-lg transition shadow-xs flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
