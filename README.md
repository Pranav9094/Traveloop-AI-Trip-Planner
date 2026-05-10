# ✈️ Traveloop - AI-Powered Travel Planning Platform

![Traveloop Dashboard Preview](https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200&h=400)

**Traveloop** is a full-stack, AI-augmented travel planning platform designed to make creating, managing, and sharing multi-city itineraries effortless. Build detailed timelines, manage complex budgets, discover hidden gems with AI insights, and organize your packing lists—all in a cohesive, premium, white-themed interface.

---

## ✨ Key Features

- **🤖 AI-Augmented Planning:** Integrated AI insights to suggest optimal destinations, budget optimizations, smart packing checklists, and context-aware travel tips.
- **🗺️ Interactive Itinerary Builder:** Drag-and-drop interface (`@hello-pangea/dnd`) to easily reorder cities, schedule arrival/departure dates, and assign categorized activities.
- **💰 Smart Budget Tracking:** Visual cost breakdowns using interactive pie charts (`recharts`), helping you track expenses across transport, stays, meals, and activities.
- **🎒 Dynamic Packing Checklist:** Categorized tracking for clothing, documents, and electronics, featuring an AI-generated smart list based on your destination's climate.
- **📝 Trip Journal:** Markdown-supported notes area allowing you to log memories, expanding brief jots into full journal entries using AI.
- **🌍 Explore Destinations:** Browse global cities with rich imagery, cost indexes, popularity scores, and customized AI travel tips.
- **🤝 Shareable Itineraries:** Public, read-only views for sharing plans with friends via unique URLs.

---

## 🛠️ Technology Stack

### Frontend

- **Framework:** [React 19](https://react.dev/) scaffolded with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first with a custom premium design system)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (Lightweight, persistent global state)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Drag & Drop:** `@hello-pangea/dnd`
- **Icons & Typography:** `react-icons`, Google Fonts (Fraunces, DM Sans, JetBrains Mono)

### Backend (Architecture & Planned)

- **Server:** Node.js + Express
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** JWT + bcrypt
- **AI Integration:** Claude API (`claude-3-5-sonnet`)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

You need to have **Node.js** (v18 or higher) and **npm** installed on your system.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Pranav9094/traveloop.git
   cd traveloop
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **View the Application:**
   Open your browser and navigate to `http://localhost:5173/`.

   > **Note:** The application currently runs in **Demo Mode**. You can click "Sign In" on the login page using any credentials to access the fully populated mock data environment.

```bash
npm run build
npm run preview  # To locally preview the production build
```

---

## 📂 Project Structure

```text
traveloop/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI elements (Card, Button, Modals, Layout)
│   ├── lib/                # Utilities, API wrappers, and Mock Data engine
│   ├── pages/              # Main route views (Dashboard, Builder, Budget, etc.)
│   ├── store/              # Zustand global state configurations
│   ├── App.jsx             # Route definitions and layout wrapper
│   ├── index.css           # Tailwind v4 theme definitions and global styles
│   └── main.jsx            # Application entry point
├── index.html              # Base HTML template with Google Fonts
├── vite.config.js          # Vite and Tailwind configuration
└── package.json            # Project dependencies and scripts
```

---

## 👥 Team Members

- **Pranav Chaudhari** - _Lead Developer & UI/UX Designer_ - [GitHub](https://github.com/Pranav-Chaudhari)
- **Arjun Kawale** - _Backend Engineer_ - [GitHub](https://github.com/kawalearjun18-commits)
- **Shrutika Kawale** - _AI Integration Specialist_ - [GitHub](https://github.com/shrutikakawale567-crypto)
- **Kangna Thakur** - _Presentation & Documentation_ - [GitHub](https://github.com/kangnathakur779-rgb)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

_Built with ❤️ for travelers everywhere._
