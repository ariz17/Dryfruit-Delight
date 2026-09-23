# 🌰 Dryfruit Delight

A full-stack MERN e-commerce platform for premium dry fruits, built with a **medical subsidy system** designed for senior citizens and health patients.

---

## 🚀 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js, Tailwind CSS, Zustand     |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB, Mongoose                   |
| Payments   | Stripe Checkout                     |
| PDF        | PDFKit (in-memory invoice generation) |

---

## ✨ Key Features

- **Product Catalog** — Browse 10+ dry fruit varieties with real-time search, category filters, and health-condition filters (Diabetic-Friendly, Heart Care, Bone & Joint, Memory & Brain).
- **Medical Subsidy System** — Patients upload an Apollo Hospital prescription or senior citizen ID to unlock up to **45% discount** automatically applied across the store.
- **Patient Profile** — Manage UHID, age, blood group, medical condition, and caregiver contact. Switch between preset senior profiles.
- **Senior Care Tools** — Dosage Planner, Soaking Guide, Mediclaim Tax Invoice (Section 80D), and Monthly Auto-Refill.
- **Stripe Payments** — Secure card checkout without exposing card data to our servers.
- **PDF Invoices** — Apollo-stamped GST receipts generated in memory and streamed directly to the browser.
- **Smart Fallback** — If MongoDB is down, the app loads backup product data so users can still browse.
- **Light / Dark Mode** — Persisted via `localStorage` with clean monochrome black & white theme.

---

## 🗂️ Project Structure

```
dryfruit_delight/
├── backend/
│   ├── models/        # Mongoose models (Product, User, Order)
│   ├── routes/        # Express API routes
│   ├── middleware/    # Auth & error handling middleware
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/  # Header, Sidebar, Modals
    │   ├── pages/       # Home, ProductDetails
    │   └── store/       # Zustand global state (useStore.js)
    └── index.html
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/ariz17/Dryfruit-Delight.git
cd Dryfruit-Delight
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5000
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 💊 Subsidy Calculation Logic

| Condition                       | Discount |
|---------------------------------|----------|
| Base Apollo subsidy             | 25%      |
| Age 60+                         | +10%     |
| Age 75+                         | +5% more |
| Diabetes / Heart Health         | +10%     |
| Low Income / Pensioner          | +10%     |
| **Maximum cap**                 | **45%**  |

---

## 📄 License

MIT
