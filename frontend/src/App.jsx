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
      <div className="bg-zinc-50 dark:bg-black min-h-screen flex flex-col font-sans text-zinc-900 dark:text-zinc-100 antialiased transition-colors duration-200">
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

        {/* Minimal Monochrome Healthcare Footer */}
        <footer className="bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 text-xs mt-auto transition-colors duration-200">
          <div className="container mx-auto px-4 py-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌰</span>
                  <span className="text-zinc-900 dark:text-white font-bold text-sm tracking-tight">DRYFRUIT DELIGHT</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
                  Doctor-verified clinical nutrition program providing premium whole dry fruits with up to 45% medical subsidies for seniors, diabetics, and cardiac patients.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-wider">Healthcare Partner</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-semibold">
                    <HeartPulse className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Apollo Hospitals Group</span>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                    Prescription verification powered by Apollo EHR partner API for senior citizen care.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-wider">Senior Assistance</h4>
                <div className="space-y-1 text-xs">
                  <p className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-semibold">
                    <PhoneCall className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Toll Free: 1800-419-1066</span>
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">Geriatric dietitians available 9 AM – 8 PM IST.</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">Email: seniorcare@dryfruitdelight.in</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-wider">Certifications & Tax</h4>
                <ul className="space-y-1 text-zinc-500 dark:text-zinc-400 text-[11px]">
                  <li>✓ Section 80D Income Tax Compliant</li>
                  <li>✓ 100% Nitrogen Flush Vacuum Sealing</li>
                  <li>✓ FSSAI Lic: 10020011000341</li>
                  <li>✓ Zero Added Sugar or Sulfur Dioxide</li>
                </ul>
              </div>

            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400 text-[11px]">
              <div>
                &copy; {new Date().getFullYear()} Dryfruit Delight Healthcare Pvt. Ltd. All rights reserved.
              </div>
              <div className="flex gap-4">
                <span className="hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">Apollo EHR Terms</span>
                <span className="hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">Medical Subsidy Policy</span>
                <span className="hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">Doctor Advisory Disclosure</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
