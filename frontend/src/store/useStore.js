import { create } from 'zustand';

export const SAMPLE_PROFILES = [
  {
    id: 'ramesh',
    name: 'Col. Ramesh Verma (Retd.)',
    age: 68,
    uhid: 'AP-884210',
    bloodGroup: 'O+',
    condition: 'Diabetes Management',
    contact: '+91 98765 43210',
    doctor: 'Dr. V. K. Sharma (Apollo Cardiology)',
    docName: 'Apollo_Rx_Diabetes_Cardio.pdf'
  },
  {
    id: 'sunita',
    name: 'Mrs. Sunita Patel',
    age: 74,
    uhid: 'AP-739102',
    bloodGroup: 'B+',
    condition: 'Heart Health',
    contact: '+91 98112 33445',
    doctor: 'Dr. Arvind Mehra (Apollo Heart Institute)',
    docName: 'Apollo_Cardiac_Nutrition_Rx.pdf'
  },
  {
    id: 'anita',
    name: 'Mrs. Anita Roy',
    age: 63,
    uhid: 'AP-650492',
    bloodGroup: 'A+',
    condition: 'General Fitness & Immunity',
    contact: '+91 99223 88102',
    doctor: 'Dr. Priya Nambiar (Apollo Geriatrics)',
    docName: 'Apollo_Senior_Wellness_Card.pdf'
  }
];

export const calculateSubsidy = (age, condition) => {
  let rate = 25; // Base Apollo Hospital Partnership subsidy
  if (age >= 60) rate += 10;
  if (age >= 75) rate += 5;
  if (condition === 'Diabetes Management' || condition === 'Heart Health') {
    rate += 10;
  } else if (condition === 'Low Income Support') {
    rate += 10;
  }
  return Math.min(rate, 45); // Max 45% subsidy
};

// Check initial dark mode from localStorage or system preference
const getInitialDarkMode = () => {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Apply class immediately
if (typeof document !== 'undefined') {
  const isDark = getInitialDarkMode();
  document.documentElement.classList.toggle('dark', isDark);
}

export const useStore = create((set, get) => ({
  // Theme State
  darkMode: getInitialDarkMode(),
  toggleDarkMode: () => {
    const next = !get().darkMode;
    set({ darkMode: next });
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    }
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', next);
    }
  },

  // Active Navigation Section ('home' | 'dryfruits' | 'health' | 'profile' | 'features')
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),

  // Profile State
  profile: SAMPLE_PROFILES[0],
  setProfile: (newProfile) => {
    const updated = { ...get().profile, ...newProfile };
    const newRate = calculateSubsidy(updated.age, updated.condition);
    set({ profile: updated, subsidyPercent: newRate });
  },
  selectSampleProfile: (id) => {
    const target = SAMPLE_PROFILES.find((p) => p.id === id) || SAMPLE_PROFILES[0];
    const newRate = calculateSubsidy(target.age, target.condition);
    set({
      profile: target,
      subsidyPercent: newRate,
      apolloVerified: true,
      prescriptionDoc: target.docName
    });
  },

  // Medication & Subsidy State
  apolloVerified: true,
  subsidyPercent: 45,
  prescriptionDoc: 'Apollo_Rx_Diabetes_Cardio.pdf',
  isVerifying: false,
  setApolloVerified: (verified) => set({ apolloVerified: verified }),
  setSubsidyPercent: (percent) => set({ subsidyPercent: percent }),
  setPrescriptionDoc: (doc) => set({ prescriptionDoc: doc }),
  verifyDocument: (docName, customAge, customCondition) => {
    set({ isVerifying: true });
    setTimeout(() => {
      const ageToUse = customAge || get().profile.age;
      const condToUse = customCondition || get().profile.condition;
      const rate = calculateSubsidy(ageToUse, condToUse);
      set({
        apolloVerified: true,
        isVerifying: false,
        subsidyPercent: rate,
        prescriptionDoc: docName || 'Apollo_Prescription_Verified.pdf'
      });
    }, 900);
  },

  // Filters State
  selectedCategory: 'All',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  selectedHealthNeed: 'All',
  setSelectedHealthNeed: (need) => set({ selectedHealthNeed: need }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Cart State
  cart: [
    {
      _id: '1',
      name: 'Premium Californian Almonds (Badam)',
      price: 999,
      discountPrice: 799,
      quantity: 1,
      image: '/images/almonds.png'
    },
    {
      _id: '4',
      name: 'Organic Afghan Figs (Anjeer)',
      price: 850,
      discountPrice: 699,
      quantity: 1,
      image: '/images/figs.png'
    }
  ],
  addToCart: (product, qty = 1) => {
    const cart = get().cart;
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      set({
        cart: cart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + qty } : item
        )
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: qty }] });
    }
  },
  removeFromCart: (id) => {
    set({ cart: get().cart.filter((item) => item._id !== id) });
  },
  updateCartQuantity: (id, qty) => {
    if (qty <= 0) {
      get().removeFromCart(id);
    } else {
      set({
        cart: get().cart.map((item) =>
          item._id === id ? { ...item, quantity: qty } : item
        )
      });
    }
  },
  clearCart: () => set({ cart: [] }),

  // Modal State
  activeModal: null, // 'dosage' | 'soaking' | 'profile' | 'cart' | 'invoice' | 'monthlyRefill'
  openModal: (modalName) => set({ activeModal: modalName }),
  closeModal: () => set({ activeModal: null })
}));
