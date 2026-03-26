# Loyola-ICAM Attendance Portal (Digital Atelier)

## Project Overview
This project is a React-based frontend powered by a local Node.js/Express and SQLite backend. It was built using design system tokens extracted directly from a custom Stitch UI canvas, prioritizing a premium "Digital Atelier" aesthetic characterized by Deep Navy, Luminous Gold, and heavily-layered Surface Glassmorphism.

## What Was Built

### 1. The Design System (`DESIGN.md` & `src/theme.css`)
- **Tonal Layering ("No-Line" Rule):** Implemented a zero-border layout using strictly structured CSS surface variables to convey depth.
- **Typography:** Configured `Newsreader` for global/headline fonts, `Inter` for body copy, `Manrope` for UI labels, and `Gravitas One` for high-impact branding accents.
- **Tailwind CSS v4:** Integrated gracefully alongside Vite.

### 2. Frontend Components (`src/components.jsx` & `src/App.jsx`)
- **PrimaryButton:** Features a linear-gradient sheen from `primary` to `primary-container`.
- **InteractiveCard:** Floats elegantly using custom `elevation-float` algorithms and features `backdrop-blur(16px)` with 70% opacity white (`glass-panel`).
- **InputField:** Stripped of standard borders, utilizing an animated `var(--color-primary)` bottom bar on focus.
- **Student Dashboard:** Modeled specifically off the Stitch layout, complete with KPI metric cards, class schedules, and a bottom navigation menu.

### 3. Backend & OAuth Integration (`server/`)
- **Express Server:** Set up to handle HTTP credential validation logic securely under `/api/auth/google`.
- **Google OAuth:** Checks via `google-auth-library` to guarantee that ONLY users with an `@licet.ac.in` domain email are allowed to securely proceed. If they are brand new, it silently auto-provisions them!
- **SQLite Database (`attendance.db`):** Maintains hashed local passwords and role verification constraint rules. Pre-seeded natively with `student@licet.edu`, `teacher@licet.edu`, and `admin@licet.edu` (pw: `password123` for all).
- **Context API (`src/context.jsx`):** Operates global session handling directly interacting with the Express endpoints.

## How to Run on a New Machine

1. **Pull the Repository:**
   ```bash
   git clone https://github.com/mtoenail/attendance.git
   cd attendance
   ```

2. **Install Dependencies:**
   Install frontend packages:
   ```bash
   npm install
   ```
   Install backend packages:
   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Start the Development Environments:**
   You will need two separate terminal windows.
   
   **Terminal 1 (Backend):**
   ```bash
   cd server
   node index.js
   ```
   *(Running locally on http://localhost:3000)*
   
   **Terminal 2 (Frontend):**
   ```bash
   npm run dev
   ```
   *(Running locally on http://localhost:5173)*

### Developer Notes
- The Google OAuth card on the login screen has a special **"Dev Mode: Sign in as alex@licet.ac.in"** pseudo-link underneath it. This completely bypasses live Google Cloud token verification and auto-invokes a valid payload. This lets you test the SQLite insertion restrictions and routing out to the Student Dashboard without needing live API keys configuration straight away!
