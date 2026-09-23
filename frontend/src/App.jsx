import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import DosagePlannerModal from './components/modals/DosagePlannerModal';
import SoakingGuideModal from './components/modals/SoakingGuideModal';
import ProfileModal from './components/modals/ProfileModal';
import MedicalInvoiceModal from './components/modals/MedicalInvoiceModal';
import MonthlyRefillModal from './components/modals/MonthlyRefillModal';
import CartDrawer from './components/modals/CartDrawer';
import { HeartPulse, ShieldCheck, PhoneCall } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-amber-900">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </main>

        {/* Interactive Capability Modals & Drawers */}
        <DosagePlannerModal />
        <SoakingGuideModal />
        <ProfileModal />
        <MedicalInvoiceModal />
        <MonthlyRefillModal />
        <CartDrawer />

        {/* Elevated Healthcare Footer */}
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs mt-auto">
          <div className="container mx-auto px-4 py-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌰</span>
                  <span className="text-white font-bold text-sm tracking-tight">Dryfruit Delight</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Doctor-verified clinical nutrition program providing premium whole dry fruits with up to 45% medical subsidies for seniors, diabetics, and cardiac patients.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">Healthcare Partner</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <HeartPulse className="w-3.5 h-3.5" />
                    <span>Apollo Hospitals Group</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Prescription verification powered by Apollo EHR partner API for transparent senior citizen care.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">Senior Assistance</h4>
                <div className="space-y-1 text-xs">
                  <p className="flex items-center gap-1.5 text-slate-300 font-semibold">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                    <span>Toll Free: 1800-419-1066</span>
                  </p>
                  <p className="text-slate-400 text-[11px]">Dedicated geriatric dietitians available 9 AM – 8 PM IST.</p>
                  <p className="text-slate-400 text-[11px]">Email: seniorcare@dryfruitdelight.in</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">Certifications & Tax</h4>
                <ul className="space-y-1 text-slate-400 text-[11px]">
                  <li>✓ Section 80D Income Tax Compliant</li>
                  <li>✓ 100% Nitrogen Flush Vacuum Sealing</li>
                  <li>✓ FSSAI Lic: 10020011000341</li>
                  <li>✓ Zero Added Sugar or Sulfur Dioxide</li>
                </ul>
              </div>

            </div>

            <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
              <div>
                &copy; {new Date().getFullYear()} Dryfruit Delight Healthcare Pvt. Ltd. All rights reserved.
              </div>
              <div className="flex gap-4">
                <span className="hover:text-slate-400 cursor-pointer">Apollo EHR Terms</span>
                <span className="hover:text-slate-400 cursor-pointer">Medical Subsidy Policy</span>
                <span className="hover:text-slate-400 cursor-pointer">Doctor Advisory Disclosure</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
