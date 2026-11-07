import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import {
  profile,
  stats,
  services,
  marqueeServices,
  projects,
  experience,
  education,
  awards,
  process as processSteps,
  testimonials,
} from "./data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const frontend = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: [
      frontend,
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
      /\.vercel\.app$/,
    ],
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(express.json({ limit: "32kb" }));

let MessageModel = null;

async function connectMongo() {
  const uri = process.env.MONGO_URI;
  if (!uri) return;
  try {
    await mongoose.connect(uri);
    MessageModel = mongoose.model(
      "Message",
      new mongoose.Schema(
        {
          name: String,
          email: String,
          subject: String,
          message: String,
          createdAt: { type: Date, default: Date.now },
        },
        { versionKey: false }
      )
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.warn("MongoDB skipped:", err.message);
  }
}

async function saveMessage(payload) {
  if (MessageModel) {
    await MessageModel.create(payload);
    return "mongo";
  }
  const file = path.join(__dirname, "messages.json");
  let list = [];
  try {
    list = JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    list = [];
  }
  list.push({ ...payload, createdAt: new Date().toISOString() });
  await fs.writeFile(file, JSON.stringify(list, null, 2));
  return "file";
}

// ── Health
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "farooq-studio-api", time: new Date().toISOString() });
});

// ── Profile
app.get("/api/profile", (_req, res) => res.json({ profile, stats }));

// ── Services
app.get("/api/services", (_req, res) =>
  res.json({ services, marqueeServices, process: processSteps, testimonials })
);

// ── Experience
app.get("/api/experience", (_req, res) => res.json({ experience, education }));

// ── Awards
app.get("/api/awards", (_req, res) => res.json({ awards }));

// ── Projects
app.get("/api/projects", (_req, res) => res.json({ projects }));

app.get("/api/projects/:slug", (req, res) => {
  const project = projects.find((p) => p.slug === req.params.slug);
  if (!project) return res.status(404).json({ error: "Project not found" });
  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);
  res.json({
    project,
    related: related.length
      ? related
      : projects.filter((p) => p.slug !== project.slug).slice(0, 3),
  });
});

// ── Contact Form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message, website } = req.body || {};
    // Honeypot check
    if (website) return res.json({ ok: true });
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ ok: false, error: "Please fill in all required fields." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Enter a valid email address." });
    }
    if (String(message).length < 12) {
      return res.status(400).json({ ok: false, error: "Tell me a little more about the project." });
    }
    const stored = await saveMessage({
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 160),
      subject: String(subject).slice(0, 180),
      message: String(message).slice(0, 4000),
    });
    res.json({
      ok: true,
      stored,
      note: "Thanks — I will get back to you at this email.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Could not send right now. Email me directly instead." });
  }
});

// ── Root
app.get("/", (_req, res) => {
  res.json({ name: "Farooq Studio API", docs: "/api/health" });
});

connectMongo().finally(() => {
  app.listen(PORT, () => {
    console.log(`API listening on :${PORT}`);
  });
});
