import axios from "axios";
import {
  profile,
  stats,
  services,
  marqueeServices,
  projects,
  experience,
  education,
  awards,
  process,
  testimonials,
} from "./fallback.js";

const base = import.meta.env.VITE_API_URL || "";

const http = axios.create({
  baseURL: base,
  timeout: 8000,
});

async function get(path, fallback) {
  try {
    const { data } = await http.get(path);
    return data;
  } catch {
    return fallback;
  }
}

export const api = {
  profile: () => get("/api/profile", { profile, stats }),
  services: () => get("/api/services", { services, marqueeServices, process, testimonials }),
  projects: () => get("/api/projects", { projects }),
  project: async (slug) => {
    try {
      const { data } = await http.get(`/api/projects/${slug}`);
      return data;
    } catch {
      const project = projects.find((p) => p.slug === slug);
      if (!project) return null;
      return {
        project,
        related: projects.filter((p) => p.slug !== slug).slice(0, 3),
      };
    }
  },
  experience: () => get("/api/experience", { experience, education }),
  awards: () => get("/api/awards", { awards }),
  contact: (payload) => http.post("/api/contact", payload).then((r) => r.data),
};

export { profile, stats, services, marqueeServices, projects, experience, education, awards, process, testimonials };
