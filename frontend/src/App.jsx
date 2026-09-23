import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </main>
        <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
          &copy; {new Date().getFullYear()} Dryfruit Delight. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
