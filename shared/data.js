/* ─── Mohammad Farooque — Portfolio Data ─── */

export const profile = {
  name: "Mohammad Farooque",
  title: "Full Stack & AI Engineer",
  headline:
    "Full Stack Software Engineer & Agentic AI Specialist crafting high-performance web & mobile products with MERN, Next.js, React Native, and AI workflows.",
  bioShort:
    "I'm a digital-first engineer based in Karachi who decodes, discovers, derives and delivers — turning ambitious visions into shipped, high-performance products.",
  about: [
    "I'm Mohammad Farooque, a full-stack software engineer and Agentic AI specialist based in Karachi, Pakistan. I specialize in building modern, scalable web and mobile applications using the MERN stack, Next.js, React Native, and AI-powered workflows.",
    "With a deep commitment to craft and performance, I approach every project from strategy to deployment — designing interfaces that look stunning, architecting backends that scale, and shipping products that drive real results.",
    "Beyond code, I'm an active competitive programmer with 415+ problems solved on LeetCode and a passion for data structures & algorithms. I believe the best engineers are the ones who never stop learning.",
  ],
  location: "Karachi, Pakistan",
  availability: "Open to freelance, full-time & collaborations",
  email: "farooqrahi828@gmail.com",
  phone: "+92 319 0211218",
  phoneDisplay: "03190211218",
  whatsapp: "https://wa.me/923190211218",
  github: "https://github.com/mohammadfarooquerahi",
  linkedin: "https://www.linkedin.com/in/mohammadfarooque/",
  leetcode: "https://leetcode.com/u/enmfarooq85",
  previousPortfolio: "https://bit.ly/farooqportfolio",
  figmaPortfolio: "https://bit.ly/farooqportfolio",
  interests: [
    "System Design",
    "Agentic AI",
    "Full Stack Platforms",
    "Mobile Apps",
    "Open Source",
    "Competitive Programming",
  ],
  focus: [
    {
      title: "Agentic AI & ML Solutions",
      text: "Building intelligent tools with OpenAI, LangChain, autonomous workflows, and custom ML pipelines that solve real-world problems.",
      tags: ["OpenAI", "Python", "FastAPI", "LangChain", "Agentic AI"],
    },
    {
      title: "Full Stack Platforms",
      text: "End-to-end MERN and Next.js applications — from database architecture to pixel-perfect, accessible frontends.",
      tags: ["React", "Node.js", "MongoDB", "Next.js", "TypeScript"],
    },
    {
      title: "Mobile Engineering",
      text: "Cross-platform mobile apps with React Native and Expo that feel truly native on both iOS and Android.",
      tags: ["React Native", "Expo", "Firebase", "iOS", "Android"],
    },
  ],
};

export const stats = [
  { value: "30", suffix: "+", label: "Projects Delivered" },
  { value: "415", suffix: "+", label: "LeetCode Problems" },
  { value: "3", suffix: "+", label: "Years Experience" },
  { value: "15", suffix: "+", label: "Happy Clients" },
];

export const services = [
  {
    slug: "full-stack-development",
    kicker: "01",
    title: "Full Stack Development",
    summary:
      "Complete web applications built with the MERN stack, from database design to production deployment.",
    details:
      "I architect and build end-to-end web applications using MongoDB, Express.js, React.js, and Node.js. Every project includes authentication, REST/GraphQL APIs, responsive UI, and production-grade deployment.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "GraphQL"],
  },
  {
    slug: "frontend-engineering",
    kicker: "02",
    title: "Frontend Engineering",
    summary:
      "Pixel-perfect, performant interfaces with React, Next.js, and modern CSS frameworks.",
    details:
      "Building responsive, accessible, and beautifully animated frontends using React.js, Next.js, Tailwind CSS, Shadcn UI, and Framer Motion. Every component is optimized for Core Web Vitals.",
    tags: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Shadcn UI", "TypeScript"],
  },
  {
    slug: "mobile-app-development",
    kicker: "03",
    title: "Mobile App Development",
    summary:
      "Cross-platform mobile applications with React Native and Expo that feel truly native.",
    details:
      "I build performant mobile apps for iOS and Android using React Native and Expo, with smooth animations, offline support, push notifications, and native device integrations.",
    tags: ["React Native", "Expo", "Firebase", "Push Notifications"],
  },
  {
    slug: "ai-integration",
    kicker: "04",
    title: "Agentic AI & Automation",
    summary:
      "Smart products powered by OpenAI, autonomous agent workflows, and intelligent automation pipelines.",
    details:
      "From AI dental copilots to intelligent autonomous agents — I integrate OpenAI APIs, build custom AI pipelines with Python/FastAPI, and create tools that leverage machine learning for real business value.",
    tags: ["OpenAI", "Python", "FastAPI", "LangChain", "Agentic AI"],
  },
  {
    slug: "backend-api-design",
    kicker: "05",
    title: "Backend & API Design",
    summary:
      "Scalable server architectures, RESTful APIs, and database solutions built for growth.",
    details:
      "Designing robust backend systems with Node.js, Express, Nest.js, and Python. Every API is documented, tested, and built with security, caching, and horizontal scaling in mind.",
    tags: ["Node.js", "Nest.js", "PostgreSQL", "Redis", "JWT", "Docker"],
  },
  {
    slug: "devops-deployment",
    kicker: "06",
    title: "DevOps & Cloud Deployment",
    summary:
      "CI/CD pipelines, cloud deployment, and infrastructure setup for seamless shipping.",
    details:
      "Setting up automated deployment pipelines with Vercel, Render, Railway, AWS, and Docker. From staging to production — every release is smooth, monitored, and rollback-ready.",
    tags: ["Vercel", "Render", "AWS", "Docker", "GitHub Actions"],
  },
];

export const marqueeServices = [
  "Full Stack Development",
  "Agentic AI Solutions",
  "Web & App Development",
  "Mobile Engineering",
  "Backend Architecture",
  "UI/UX Engineering",
];

export const projects = [
  {
    slug: "demands2go-ecommerce",
    title: "Demands2Go E-Commerce",
    category: "Full Stack",
    year: "2024",
    featured: true,
    client: "Demands2Go",
    summary:
      "A complete e-commerce platform built with the MERN stack and TypeScript for modern online retail.",
    description:
      "Demands2Go is a full-featured e-commerce application featuring product management, user authentication, cart functionality, payment integration, order tracking, and an admin dashboard. Built with TypeScript for type safety and scalability.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    tags: ["TypeScript", "React.js", "Node.js", "MongoDB", "Express.js", "JWT"],
    live: "https://demands2go.vercel.app",
    repo: "https://github.com/mohammadfarooquerahi",
  },
  {
    slug: "ai-dental-copilot",
    title: "AI Dental Copilot",
    category: "AI/ML",
    year: "2024",
    featured: true,
    client: "Hackathon Project",
    summary:
      "An AI-powered dental assistant that helps dentists with diagnosis and treatment planning.",
    description:
      "A Python-based AI application that leverages machine learning and OpenAI APIs to assist dental professionals with patient diagnosis, treatment recommendations, and clinical note generation. Features a clean dashboard UI.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    tags: ["Python", "OpenAI", "FastAPI", "Machine Learning", "React.js"],
    live: null,
    repo: "https://github.com/mohammadfarooquerahi",
  },
  {
    slug: "sky-share-app",
    title: "Sky Share",
    category: "Web App",
    year: "2024",
    featured: true,
    client: "Personal Project",
    summary:
      "A modern file and text sharing utility inspired by AirDrop, built with React.js.",
    description:
      "Sky Share is a sleek file and text sharing web application that enables seamless peer-to-peer sharing. Features drag-and-drop upload, real-time transfer progress, shareable links, and a beautiful modern interface.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    tags: ["React.js", "Node.js", "WebSocket", "File Upload"],
    live: "https://sky-share.vercel.app",
    repo: "https://github.com/mohammadfarooquerahi",
  },
  {
    slug: "chat-wave",
    title: "Chat Wave",
    category: "Web App",
    year: "2024",
    featured: true,
    client: "Personal Project",
    summary:
      "A real-time chat application with modern UI, authentication, and instant messaging.",
    description:
      "Chat Wave is a full-featured real-time chat application built with React.js and Firebase. Features include user authentication, real-time messaging, online status indicators, typing indicators, and a responsive modern design.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
    tags: ["React.js", "Firebase", "Real-time", "Authentication"],
    live: "https://chat-wave-app.vercel.app",
    repo: "https://github.com/mohammadfarooquerahi",
  },
  {
    slug: "edge-guard",
    title: "Edge Guard",
    category: "AI/ML",
    year: "2025",
    featured: true,
    client: "Hackathon Project",
    summary:
      "A policy-driven AI routing system for intelligent content moderation and safety.",
    description:
      "Edge Guard is an innovative AI routing system that applies configurable safety policies to AI-generated content. Built during a hackathon, it features real-time content analysis, policy management dashboard, and integration with multiple AI providers.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    tags: ["Python", "AI/ML", "FastAPI", "React.js", "Policy Engine"],
    live: null,
    repo: "https://github.com/mohammadfarooquerahi",
  },
  {
    slug: "farooq-figma-portfolio",
    title: "Farooq Studio Design Prototype",
    category: "UI/UX & Product",
    year: "2024",
    featured: true,
    client: "Design System",
    summary:
      "Interactive Figma design and prototype system for Mohammad Farooque's digital portfolio.",
    description:
      "An interactive design system and responsive prototype showcasing modern typographic scales, fluid motion principles, and dark/cream visual aesthetics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["Figma", "UI/UX", "Design System", "Prototyping"],
    live: "https://bit.ly/farooqportfolio",
    repo: "https://github.com/mohammadfarooquerahi",
  },
];

export const experience = [
  {
    company: "Freelance / Farooq Studio",
    role: "Full Stack & AI Engineer",
    period: "2024 — Present",
    location: "Karachi, Pakistan",
    type: "Freelance",
    bullets: [
      "Building end-to-end web and mobile applications for global and regional clients using the MERN stack.",
      "Developing Agentic AI workflows, copilots, and intelligent LLM-driven automation systems.",
      "Shipped 15+ production applications with React, Next.js, FastAPI, and React Native.",
      "Implementing resilient CI/CD pipelines and cloud deployments on Vercel, Render, and AWS.",
    ],
    tags: ["React.js", "Node.js", "React Native", "Agentic AI", "AWS"],
  },
  {
    company: "Tech Venture",
    role: "Full Stack Developer",
    period: "2023 — 2024",
    location: "Karachi, Pakistan",
    type: "Contract",
    bullets: [
      "Led frontend and API development for platforms serving 10K+ monthly active users.",
      "Built reusable component library with React, TypeScript, and modern styling tokens.",
      "Optimized Core Web Vitals — improved LCP by 40% and reduced CLS to near zero.",
      "Integrated payment gateways and real-time order tracking features.",
    ],
    tags: ["React.js", "TypeScript", "Tailwind CSS", "REST APIs", "Node.js"],
  },
  {
    company: "Software House",
    role: "MERN Stack Developer Intern",
    period: "2023 — 2023",
    location: "Karachi, Pakistan",
    type: "Internship",
    bullets: [
      "Built full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
      "Developed RESTful APIs with JWT authentication and role-based access control.",
      "Created responsive, high-fidelity user interfaces.",
      "Participated in agile sprints, peer code reviews, and Git flow best practices.",
    ],
    tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
  },
  {
    company: "Competitive Programming",
    role: "Problem Solver & Algorithm Specialist",
    period: "2022 — Present",
    location: "Online",
    type: "Self-directed",
    bullets: [
      "Solved 415+ problems on LeetCode across arrays, graphs, dynamic programming, and system design.",
      "Active participant in algorithmic problem-solving contests.",
      "Maintains comprehensive DSA repository with optimal time and space complexity explanations.",
    ],
    tags: ["LeetCode", "Algorithms", "DSA", "System Design"],
  },
];

export const education = [
  {
    title: "BS Computer Science",
    place: "Karachi, Pakistan",
    period: "2021 — 2025",
  },
  {
    title: "Higher Secondary (Pre-Engineering)",
    place: "Karachi, Pakistan",
    period: "2019 — 2021",
  },
  {
    title: "Full Stack & AI Certifications",
    place: "Meta Frontend Developer · freeCodeCamp · Coursera",
    period: "2022 — Present",
  },
];

export const awards = [
  {
    title: "415+ LeetCode Problems Solved",
    year: "2024",
    org: "LeetCode",
    note: "Consistent mastery across data structures, algorithms, graph theory, and dynamic programming.",
  },
  {
    title: "Hackathon Winner — AI Dental Copilot",
    year: "2024",
    org: "Tech Hackathon",
    note: "Built an AI-powered diagnostic and treatment planning copilot that secured 1st place.",
  },
  {
    title: "Edge Guard — AI Safety Innovation",
    year: "2025",
    org: "AI Hackathon",
    note: "Developed a policy-driven AI routing system for intelligent content moderation.",
  },
  {
    title: "Active Open Source Builder",
    year: "2024",
    org: "GitHub",
    note: "Active contributor with 30+ public repositories across MERN, AI, and mobile apps.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Decode",
    text: "I unpack your brief until the real problem is crystal clear. Every great product starts with the right questions.",
  },
  {
    step: "02",
    title: "Discover",
    text: "Research, architecture planning, and choosing the right tech stack for speed of learning and shipping.",
  },
  {
    step: "03",
    title: "Derive",
    text: "Interfaces, APIs, and data models crafted with tight feedback loops — building fast, iterating faster.",
  },
  {
    step: "04",
    title: "Deliver",
    text: "Deployed, documented, and iterated until it's polished. Every pixel and API endpoint is production-ready.",
  },
];

export { processSteps as process };

export const testimonials = [
  {
    name: "Client — E-Commerce Project",
    role: "Founder",
    text: "Mohammad delivered a complete e-commerce platform ahead of schedule. His attention to detail and code quality exceeded our expectations.",
  },
  {
    name: "Hackathon Team Lead",
    role: "AI Dental Copilot",
    text: "Working with Mohammad was a game-changer. He brought the AI vision to life with clean architecture and a polished frontend.",
  },
  {
    name: "Startup Client",
    role: "CTO",
    text: "The React Native app Mohammad built for us feels truly native. Fast, reliable, and the code is incredibly well organized.",
  },
];
