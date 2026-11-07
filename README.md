# FAROOQ — Digital Studio Portfolio

> **Muhammad Farooq** — Full Stack Engineer. MERN, Next.js, React Native and AI products with agency-grade craft.

A premium portfolio website inspired by [Synite Digital](https://synitedigital.com/), built with **React + Vite** (frontend) and **Express + MongoDB** (backend).

## ✨ Features

- 🎨 **Agency-level design** — Dark/cream theme, Teko + Syne + Inter typography
- 🌀 **GSAP scroll animations** — Reveal-on-scroll, staggered entrances, parallax, counter animations
- 🧲 **Magnetic cursor** — Custom cursor with lerp-based smooth following and hover scaling
- 📜 **Lenis smooth scroll** — Buttery smooth scrolling experience
- 🎯 **8 pages** — Home, About, Services, Expertise, Work, Journey, Awards, Contact
- 📱 **Fully responsive** — Optimized for desktop, tablet, and mobile
- 📬 **Contact form** — Saves to MongoDB (or local JSON as fallback)
- 🔒 **Honeypot spam protection** on contact form
- ⚡ **Offline-ready** — Falls back to embedded data if API is unavailable

## 🏗 Tech Stack

| Layer     | Technology                              |
| --------- | --------------------------------------- |
| Frontend  | React 18, Vite 6, GSAP 3, Framer Motion, Lenis |
| Backend   | Node.js, Express 4, Mongoose            |
| Database  | MongoDB Atlas (optional)                |
| Deploy    | Vercel (frontend) + Render (backend)    |

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Start development

```bash
npm run dev
```

This starts both the Express API (`:5000`) and Vite dev server (`:5173`) with proxy.

### 3. Build for production

```bash
npm run build
```

## 🌐 Deployment

### Frontend → Vercel

1. Push the repo to GitHub
2. Import in [Vercel](https://vercel.com)
3. **Root Directory:** `client`
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. **Environment Variable:** `VITE_API_URL` = your Render backend URL

### Backend → Render

1. Create a new Web Service on [Render](https://render.com)
2. **Root Directory:** `server`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. **Environment Variables:**
   - `FRONTEND_URL` = your Vercel frontend URL
   - `MONGO_URI` = your MongoDB connection string (optional)

## 📁 Project Structure

```
mfarooq/
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Layout, Cursor, Magnetic, SmoothScroll
│   │   ├── hooks/        # GSAP animation hooks
│   │   ├── lib/          # API client + fallback data
│   │   ├── pages/        # All 8 pages
│   │   ├── styles.css    # Global styles
│   │   ├── App.jsx       # Router + preloader
│   │   └── main.jsx      # Entry point
│   ├── vercel.json       # SPA rewrite rules
│   └── vite.config.js
├── server/               # Express backend
│   ├── index.js          # API routes + MongoDB
│   └── data.js           # Re-exports shared data
├── shared/
│   └── data.js           # All portfolio content (single source of truth)
├── render.yaml           # Render deployment config
└── package.json          # Root scripts
```

## 📝 Customization

All portfolio content (profile, projects, services, experience, awards, etc.) is in **`shared/data.js`**. Edit this single file to update your portfolio content across both frontend and backend.

---

Built with ❤️ by Muhammad Farooq
