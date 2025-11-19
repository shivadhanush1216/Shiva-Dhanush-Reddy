import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Cpu,
  Sparkles,
  Send,
  Loader,
  Search,
  Globe,
  TrendingUp,
  MapPin,
  Image as ImageIcon,
  Briefcase,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  Code,
  Database,
  Terminal,
  Menu,
  X,
  FileText,
} from "lucide-react";

import profileImage from "./assets/profileImage.png";

// --- Resume Data ---
const portfolioData = {
  name: "Shiva Dhanush Reddy",
  role: "AI/ML Engineer & Full Stack Developer",
  tagline: "Bridging Data Science with Scalable Frontends.",
  location: "Hyderabad, India",
  resume:
    "https://drive.google.com/file/d/1HfSVKXUcaL3zucL-xfpg9sdWV4yaWrEs/view?usp=sharing",
  contact: {
    email: "shivadhanushreddythaduri@gmail.com",
    phone: "+91 9247448076",
    linkedin: "https://www.linkedin.com/in/taduri-shiva-dhanush-reddy/",
  },
  about:
    "I am a Computer Science Engineering student specializing in AI/ML at Malla Reddy University, with professional experience building production- grade Frontends.At Small Fare™, I reduced page load times by 35 % using React & Tailwind Simultaneously, I build complex AI systems, from demand forecasting engines processing $16.5B in sales data to generative AI content platforms.",
  experience: [
    {
      company: "Small Fare Services",
      role: "Frontend Developer Intern",
      date: "Jun '25 - Sep '25",
      logo: "smallfare_logo.jpg",
      desc: "Revamped the revenue platform UI, reducing load times by 25% and boosting engagement by 30% through a complete React/Tailwind redesign. Delivered PCI-compliant UI flows and reusable components.",
      details: [
        "Contributed to the development of a modern payment and revenue collection platform that simplifies recurring payments, digital transactions, and revenue tracking for businesses and creators.",
        "Built and optimized React.js + Tailwind CSS components for the platform's dashboard and transaction history, cutting page load time by 35% and improving overall user experience.",
        "Implemented dynamic features including animated hero sections, responsive navigation, feature grids, and wallet dashboards — increasing user engagement and retention by 30%.",
        "Delivered PCI-compliant UI flows and modular reusable components, strengthening system security while reducing future feature integration effort by 25%.",
      ],
    },
  ],
  projects: [
    {
      id: "forecasting",
      title: "Demand Forecasting AI",
      category: "Machine Learning",
      tech: "Python • XGBoost • LSTM",
      description:
        "Predictive engine for Walmart's $16.5B dataset. Improved forecast accuracy by 25% using advanced time-series modeling.",
      color: "from-orange-500 to-rose-500",
      link: "https://walmartdemandforecasting.streamlit.app/",
      repo: "https://github.com/shivadhanush1216/Walmart-Demand-Forecasting-System",
    },
    {
      id: "blogging",
      title: "AI Blogging Platform",
      category: "Full Stack AI",
      tech: "React • Cohere • MongoDB",
      description:
        "Content generation engine capable of writing 750+ word articles with context-aware image retrieval.",
      color: "from-blue-500 to-violet-600",
      link: "https://ai-blogging-site.vercel.app/",
      repo: "https://github.com/shivadhanush1216/AI-blogging-site",
    },
    {
      id: "wanderlust",
      title: "Wanderlust",
      category: "Web Application",
      tech: "MERN • Mapbox",
      description:
        "Property booking platform scaling to 1,000+ listings with secure payments and geolocation.",
      color: "from-emerald-500 to-teal-600",
      link: "https://wanderlust-0dtm.onrender.com/listings",
      repo: "https://github.com/shivadhanush1216/wanderlust",
    },
  ],
  skills: [
    "Python",
    "React",
    "Project Management",
    "Next.js",
    "TensorFlow",
    "Node.js",
    "MongoDB",
    "System Design",
    "UI/UX",
    "Java",
    "Express.js",
    "Bootstrap",
    "Tailwind CSS",
    "SQL",
    "Git",
    "API Integration",

    "Video Editing",
    "Teamwork & Collaboration",
    "Time Management",
    "Negotiation",
  ],
};

// --- API Logic ---
const apiKey = ""; // Injected by environment

const callGemini = async (prompt) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    if (!response.ok) throw new Error("API call failed");
    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a response."
    );
  } catch (error) {
    return "Connection error. Please try again.";
  }
};

// --- UI Components ---

const Reveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

const TypewriterText = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 75 : 150
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-zinc-500">
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? "opacity-100" : "opacity-0"} ml-1`}>|</span>
    </span>
  );
};

// --- Custom Animated Avatar (SVG) ---
const RobotAvatar = () => {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      setEyePos({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto md:w-80 md:h-80 group">
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-indigo-500/30 to-purple-500/30 blur-3xl animate-pulse"></div>

      {/* Robot Head SVG */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full transition-transform duration-300 transform drop-shadow-2xl animate-float hover:scale-105"
      >
        {/* Antenna */}
        <line
          x1="100"
          y1="50"
          x2="100"
          y2="20"
          stroke="#6366f1"
          strokeWidth="4"
        />
        <circle
          cx="100"
          cy="20"
          r="6"
          fill="#ef4444"
          className="animate-ping"
        />
        <circle cx="100" cy="20" r="6" fill="#ef4444" />

        {/* Head Base */}
        <rect
          x="50"
          y="50"
          width="100"
          height="90"
          rx="20"
          fill="#1f2937"
          stroke="#374151"
          strokeWidth="4"
        />

        {/* Screen/Face Area */}
        <rect x="60" y="65" width="80" height="50" rx="10" fill="#0f172a" />

        {/* Eyes Container */}
        <g transform={`translate(${eyePos.x}, ${eyePos.y})`}>
          {/* Left Eye */}
          <circle
            cx="80"
            cy="90"
            r="10"
            fill="#22d3ee"
            className="animate-pulse"
          >
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Right Eye */}
          <circle
            cx="120"
            cy="90"
            r="10"
            fill="#22d3ee"
            className="animate-pulse"
          >
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Mouth */}
        <path
          d="M 85 130 Q 100 140 115 130"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Neck */}
        <rect x="85" y="140" width="30" height="20" fill="#374151" />

        {/* Body Hint */}
        <path
          d="M 50 160 Q 100 180 150 160 V 200 H 50 Z"
          fill="#1f2937"
          stroke="#374151"
          strokeWidth="4"
        />
      </svg>

      {/* Status Badge */}
      <div className="absolute flex items-center gap-2 px-4 py-2 delay-700 border rounded-full shadow-xl bottom-4 -right-2 bg-zinc-900/90 backdrop-blur border-zinc-700 animate-bounce">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-bold text-zinc-200">AI Online</span>
      </div>
    </div>
  );
};

// --- About Me Interest Visual ---
const HolographicCard = () => {
  const [imgError, setImgError] = useState(false);

  // Google Drive Link converter:
  // View Link: https://drive.google.com/file/d/1L20XZQI8DN6FDV9SIgbA1-u-BB2XPRQR/view?usp=sharing
  // Direct Link: https://drive.google.com/uc?export=view&id=1L20XZQI8DN6FDV9SIgbA1-u-BB2XPRQR
  const driveImageSrc =
    "https://drive.google.com/uc?export=view&id=1L20XZQI8DN6FDV9SIgbA1-u-BB2XPRQR";

  return (
    <div className="relative w-full overflow-hidden border h-80 md:h-96 rounded-2xl bg-zinc-900 border-zinc-800 group">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

      {!imgError ? (
        <div className="relative w-full h-full">
          <img
            src={driveImageSrc}
            alt="Interesting Visual"
            className="object-cover w-full h-full transition-transform duration-700 opacity-90 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
          {/* Hologram Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
        </div>
      ) : (
        // Fallback "Interesting" Animation if image fails
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative z-10 space-y-4 text-center">
            <div className="flex justify-center gap-4 mb-4">
              <div className="p-4 border bg-indigo-500/10 rounded-xl border-indigo-500/30 animate-bounce delay-0">
                <Code size={32} className="text-indigo-400" />
              </div>
              <div className="p-4 delay-150 border bg-purple-500/10 rounded-xl border-purple-500/30 animate-bounce">
                <Database size={32} className="text-purple-400" />
              </div>
              <div className="p-4 delay-300 border bg-green-500/10 rounded-xl border-green-500/30 animate-bounce">
                <Terminal size={32} className="text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Full Stack Architecture
            </h3>
            <div className="flex justify-center gap-2">
              <span className="px-2 py-1 font-mono text-xs rounded bg-zinc-800 text-zinc-400">
                React
              </span>
              <span className="px-2 py-1 font-mono text-xs rounded bg-zinc-800 text-zinc-400">
                Node
              </span>
              <span className="px-2 py-1 font-mono text-xs rounded bg-zinc-800 text-zinc-400">
                AI/ML
              </span>
            </div>
          </div>
          {/* Spinning Ring */}
          <div className="absolute w-64 h-64 border-2 border-dashed rounded-full border-zinc-700 animate-spin-slow opacity-20"></div>
          <div className="absolute w-48 h-48 border rounded-full border-zinc-600 animate-ping opacity-10"></div>
        </div>
      )}

      {/* Glass Card Overlay */}
      <div className="absolute p-4 border shadow-lg bottom-4 left-4 right-4 bg-zinc-900/80 backdrop-blur-md border-white/10 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white">System Status</div>
            <div className="mt-1 font-mono text-xs text-green-400">
              ● All Systems Operational
            </div>
          </div>
          <Cpu className="text-zinc-500" />
        </div>
      </div>
    </div>
  );
};

const SectionCard = ({ children, className = "", title, icon: Icon }) => (
  <div
    className={`bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors rounded-3xl p-8 flex flex-col ${className}`}
  >
    {title && (
      <div className="flex items-center gap-3 pb-4 mb-6 text-indigo-400 border-b border-zinc-800">
        {Icon && <Icon size={24} />}
        <span className="text-lg font-bold tracking-wider uppercase">
          {title}
        </span>
      </div>
    )}
    {children}
  </div>
);

// --- Project Visuals ---

const ProjectVisual = ({ type }) => {
  switch (type) {
    case "forecasting":
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-3/4 p-4 border-b-2 border-l-2 h-3/4 border-white/20">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="w-full h-px bg-white"></div>
              <div className="w-full h-px bg-white"></div>
              <div className="w-full h-px bg-white"></div>
              <div className="w-full h-px bg-white"></div>
            </div>
            <svg
              viewBox="0 0 100 50"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 Q20,40 30,20 T60,30 T100,5"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              />
            </svg>
            <div className="absolute top-0 right-0 p-3 transform translate-x-4 -translate-y-4 border shadow-xl bg-black/20 backdrop-blur-md border-white/10 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-green-300" />
                <span className="text-xs font-bold text-white">
                  +25% Accuracy
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case "blogging":
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative flex flex-col w-3/4 overflow-hidden transition-transform duration-500 border shadow-2xl h-3/4 bg-white/10 backdrop-blur-md rounded-xl border-white/20 group-hover:-translate-y-2">
            <div className="flex items-center h-8 gap-2 px-4 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
            </div>
            <div className="p-6 space-y-3">
              <div className="w-3/4 h-6 rounded-md bg-white/20 animate-pulse"></div>
              <div className="w-1/2 h-4 rounded-md bg-white/10"></div>
              <div className="mt-6 space-y-2">
                <div className="w-full h-2 rounded-full bg-white/10"></div>
                <div className="w-full h-2 rounded-full bg-white/10"></div>
              </div>
              <div className="absolute flex items-center justify-center w-24 h-24 transition-transform transform border rounded-lg bottom-6 right-6 bg-indigo-500/30 border-white/20 rotate-3 hover:rotate-0">
                <ImageIcon size={24} className="text-white/50" />
              </div>
            </div>
          </div>
        </div>
      );

    case "wanderlust":
      return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full text-white" fill="currentColor">
              <pattern
                id="dots"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="w-64 p-4 transition-transform duration-500 transform border shadow-xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20 -rotate-2 group-hover:rotate-0">
              <div className="relative h-32 mb-3 overflow-hidden bg-teal-900/30 rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute text-xs font-bold text-white bottom-2 left-2">
                  Villa Retreat
                </div>
              </div>
            </div>
            <div className="absolute text-red-400 -top-8 -right-4 drop-shadow-lg animate-bounce">
              <MapPin
                size={48}
                fill="currentColor"
                className="text-red-500 stroke-2 stroke-white"
              />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

// --- AI Modules ---

const AIChat = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!query) return;
    setLoading(true);
    const res = await callGemini(
      `You are Shiva's portfolio assistant. Resume Data: ${JSON.stringify(
        portfolioData
      )}. User asks: "${query}". Keep it brief & professional.`
    );
    setResponse(res);
    setLoading(false);
  };

  return (
    <SectionCard
      title="Ask AI Assistant"
      icon={MessageSquare}
      className="h-full min-h-[300px]"
    >
      <div className="flex flex-col flex-1">
        <div className="flex-1 mb-4 space-y-3 overflow-y-auto">
          {!response && !loading && (
            <div className="mt-8 text-sm text-center text-zinc-500">
              Ask me about Shiva's projects, skills, or experience.
            </div>
          )}
          {query && response && (
            <div className="flex justify-end">
              <span className="bg-zinc-800 text-white px-3 py-1.5 rounded-2xl rounded-tr-sm text-sm">
                {query}
              </span>
            </div>
          )}
          {loading && (
            <Loader className="animate-spin text-zinc-500" size={16} />
          )}
          {response && (
            <div className="flex justify-start">
              <span className="px-3 py-2 text-sm text-indigo-200 rounded-tl-sm bg-indigo-600/20 rounded-2xl">
                {response}
              </span>
            </div>
          )}
        </div>
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask()}
            placeholder="Ask anything..."
            className="w-full py-2 pl-4 pr-10 text-sm text-white rounded-full bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            onClick={ask}
            className="absolute -translate-y-1/2 right-2 top-1/2 text-zinc-400 hover:text-white"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </SectionCard>
  );
};

const ResumeScanner = () => {
  const [jd, setJd] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!jd) return;
    setLoading(true);
    const res = await callGemini(
      `Act as a recruiter. Compare Shiva's resume: ${JSON.stringify(
        portfolioData
      )} against this JD: "${jd}". Provide a 3-bullet summary of why he fits. HTML format.`
    );
    setAnalysis(res);
    setLoading(false);
  };

  return (
    <SectionCard
      title="Fit Check"
      icon={Search}
      className="h-full min-h-[300px]"
    >
      {!analysis ? (
        <div className="flex flex-col flex-1">
          <textarea
            className="flex-1 p-3 mb-3 text-sm resize-none bg-zinc-800/50 rounded-xl text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Paste a Job Description..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
          <button
            onClick={analyze}
            disabled={loading}
            className="flex items-center justify-center w-full gap-2 py-2 font-semibold text-black transition-colors bg-zinc-100 rounded-xl hover:bg-white"
          >
            {loading ? (
              <Loader className="animate-spin" size={16} />
            ) : (
              "Analyze Fit"
            )}
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto prose-sm prose prose-invert">
          <div
            dangerouslySetInnerHTML={{
              __html: analysis.replace(/```html/g, "").replace(/```/g, ""),
            }}
          />
          <button
            onClick={() => setAnalysis("")}
            className="mt-4 text-xs text-indigo-400 hover:underline"
          >
            Check another role
          </button>
        </div>
      )}
    </SectionCard>
  );
};

const App = () => {
  const [active, setActive] = useState("work");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id) => {
    if (id === "resume") {
      window.open(portfolioData.resume, "_blank");
      setIsMenuOpen(false);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans bg-black text-zinc-100 selection:bg-indigo-500/30">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6">
        {/* Mobile Avatar Top-Left */}
        <img
          src={profileImage}
          alt="Shiva profile avatar"
          className="absolute object-cover border rounded-full shadow top-6 left-6 md:hidden w-9 h-9 border-zinc-700 ring-1 ring-indigo-500/20"
        />
        {/* Desktop Menu */}
        <div className="items-center hidden gap-8 px-6 py-2 border rounded-full shadow-2xl md:flex bg-zinc-900/80 backdrop-blur-md border-zinc-800">
          {/* Profile Image Avatar */}
          <img
            src={profileImage}
            alt="Shiva profile avatar"
            className="object-cover w-10 h-10 border rounded-full shadow border-zinc-700 ring-1 ring-indigo-500/20"
          />
          <div className="h-4 w-[1px] bg-zinc-700"></div>
          {[
            "Work",
            "Experience",
            "About",
            "Play",
            "Contact",
            "Resume",
            "|",
          ].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className={`text-sm font-medium transition-colors hover:text-white ${
                item === "Resume"
                  ? "text-indigo-400 hover:text-indigo-300"
                  : active === item.toLowerCase()
                  ? "text-white"
                  : "text-zinc-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="absolute md:hidden top-6 right-6">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 text-white border rounded-full shadow-xl bg-zinc-900/90 backdrop-blur-md border-zinc-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute flex flex-col w-48 gap-2 p-4 transition-all transform border shadow-2xl top-20 right-6 bg-zinc-900/95 backdrop-blur-xl border-zinc-800 rounded-2xl md:hidden animate-float">
            {["Work", "Experience", "About", "Play", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`text-sm font-medium py-2 px-4 rounded-xl text-left transition-colors ${
                  active === item.toLowerCase()
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="work" className="px-6 pt-40 pb-20 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 items-center mb-24">
          <Reveal>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Building <br />
              <TypewriterText
                words={["AI/ML Systems.", "Full Stack Apps.", "Data Science."]}
              />
            </h1>
            <p className="max-w-md mb-8 text-xl leading-relaxed text-zinc-400">
              I'm Shiva Dhanush. Merging{" "}
              <span className="text-white">Python & AI Research</span> with
              robust{" "}
              <span className="text-white">React Engineering, Vibe Coder</span>.
              <br /> Ex - Front End Developer at Small Fare Services.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-4">
              <button
                onClick={() => scrollTo("contact")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black transition-colors bg-white rounded-full md:px-6 md:py-3 md:text-base hover:bg-zinc-200"
              >
                Let's Talk{" "}
                <ArrowUpRight className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              </button>
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                className="px-4 py-2 text-sm font-semibold text-white transition-colors border rounded-full md:px-6 md:py-3 md:text-base bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
              >
                {/* LinkedIn */}
                <Linkedin />
              </a>
              <a
                href={portfolioData.resume}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-400 transition-colors border rounded-full md:px-6 md:py-3 md:text-base bg-indigo-600/10 border-indigo-600/50 hover:bg-indigo-600/20"
              >
                <FileText className="w-4 h-4 md:w-[18px] md:h-[18px]" /> Resume
              </a>
            </div>
          </Reveal>
          <Reveal delay={200}>
            {/* Custom SVG Cartoon Avatar */}
            <RobotAvatar />
          </Reveal>
        </div>

        {/* Selected Work (Projects) - Side by Side Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioData.projects.map((project, i) => (
            <Reveal key={i}>
              <div className="h-full cursor-pointer group">
                <div
                  className={`w-full h-[300px] rounded-[2rem] bg-gradient-to-br ${project.color} mb-6 relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.01] border border-white/5 group-hover:border-white/20`}
                >
                  <div className="absolute inset-0 transition-colors bg-black/10 group-hover:bg-transparent" />
                  <ProjectVisual type={project.id} />

                  {/* Link icons */}
                  <div className="absolute flex flex-col gap-2 top-4 right-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live site`}
                      className="p-2 text-white transition-all duration-300 transform translate-y-2 rounded-full opacity-0 bg-black/40 backdrop-blur-md group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black/60"
                    >
                      <ExternalLink size={18} />
                    </a>
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub repository`}
                        className="p-2 text-white transition-all duration-300 transform translate-y-2 rounded-full opacity-0 bg-black/40 backdrop-blur-md group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black/60"
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <div className="inline-block px-3 py-1 text-xs text-white border rounded-full shadow-lg bg-black/30 backdrop-blur-md border-white/10">
                      {project.category}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-between px-1">
                  <div>
                    <h3 className="flex items-center gap-2 mb-2 text-xl font-bold transition-colors group-hover:text-indigo-400">
                      {project.title}
                      <ChevronRight
                        className="transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                        size={20}
                      />
                    </h3>
                    <p className="text-sm text-zinc-500 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="px-6 py-20 mx-auto max-w-7xl">
        <Reveal>
          <h2 className="inline-block pb-4 mb-12 text-4xl font-bold tracking-tight border-b border-zinc-800">
            Professional Experience
          </h2>
          <div className="p-8 transition-all duration-500 border bg-zinc-900/30 border-zinc-800 rounded-3xl md:p-12 hover:border-indigo-500/30 group">
            <div className="flex flex-col items-start gap-8 md:flex-row">
              {/* Logo Box */}
              <div className="w-24 h-24 p-2 overflow-hidden bg-white shadow-2xl md:w-32 md:h-32 rounded-2xl shrink-0">
                <img
                  src={portfolioData.experience[0].logo}
                  alt="Company Logo"
                  className="object-contain w-full h-full"
                  onError={(e) => {
                    e.target.src =
                      "https://ui-avatars.com/api/?name=Small+Fare&background=0D8ABC&color=fff&size=128";
                  }}
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col justify-between mb-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="mb-1 text-3xl font-bold text-white">
                      {portfolioData.experience[0].company}
                    </h3>
                    <p className="text-xl font-medium text-indigo-400">
                      {portfolioData.experience[0].role}
                    </p>
                  </div>
                  <div className="px-4 py-2 mt-2 font-mono text-sm border rounded-full md:mt-0 bg-zinc-800 text-zinc-400 border-zinc-700">
                    {portfolioData.experience[0].date}
                  </div>
                </div>

                <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                  {portfolioData.experience[0].desc}
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {portfolioData.experience[0].details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-sm text-zinc-400"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ABOUT SECTION (Mobile Optimized) */}
      <section id="about" className="px-6 py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col items-center gap-12 md:grid md:grid-cols-2">
              {/* Text Content - Top on Mobile, Left on Desktop */}
              <div className="order-1">
                <h2 className="mb-6 text-4xl font-bold tracking-tight text-white">
                  About Me
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-zinc-400">
                  {portfolioData.about}
                </p>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">3+</div>
                    <div className="mt-1 text-sm tracking-wider uppercase text-zinc-500">
                      Major Projects
                    </div>
                  </div>
                  <div className="w-px h-12 bg-zinc-800"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">8.52</div>
                    <div className="mt-1 text-sm tracking-wider uppercase text-zinc-500">
                      CGPA
                    </div>
                  </div>
                </div>
              </div>
              {/* Image Content - Bottom on Mobile, Right on Desktop */}
              <div className="flex justify-center order-2 w-full md:justify-end">
                {/* <HolographicCard /> */}

                <div className="flex justify-center md:justify-end">
                  <div className="relative">
                    <img
                      src={profileImage}
                      alt="Shiva Dhanush Reddy profile"
                      className="object-cover w-64 h-64 transition-transform duration-500 border rounded-full shadow-2xl md:w-80 md:h-80 border-zinc-800 ring-1 ring-indigo-500/20 hover:scale-105"
                    />
                    <div className="absolute flex items-center gap-1 px-3 py-1 text-xs font-semibold text-green-400 border rounded-full shadow bg-zinc-900/80 backdrop-blur border-green-500/20 top-2 right-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Online
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="px-6 py-20 mx-auto max-w-7xl">
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-white uppercase ">
            Technical Arsenal
          </h2>
          <div className="flex flex-wrap gap-3">
            {portfolioData.skills.map((skill) => (
              <span
                key={skill}
                className="px-5 py-3 text-sm transition-colors border cursor-default bg-zinc-900 rounded-xl text-zinc-300 border-zinc-800 hover:border-indigo-500 hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* AI Features */}
      <section
        id="play"
        className="px-6 py-24 mx-auto border-t max-w-7xl border-zinc-900"
      >
        <Reveal>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold tracking-tight">AI Playground</h2>
            <div className="px-4 py-1 text-sm font-medium text-indigo-400 border rounded-full bg-indigo-500/10 border-indigo-500/20">
              Powered by Gemini 2.5
            </div>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          <Reveal delay={100}>
            <AIChat />
          </Reveal>
          <Reveal delay={200}>
            <ResumeScanner />
          </Reveal>
        </div>
      </section>

      {/* Contact Footer */}
      <section
        id="contact"
        className="px-6 py-24 text-center border-t border-zinc-900"
      >
        <Reveal>
          <h2 className="mb-8 text-5xl font-bold text-white md:text-7xl">
            Let's create impact.
          </h2>
          <p className="mb-12 text-xl text-zinc-500">
            Available for opportunities in 2025.
          </p>
          <a
            href={`mailto:${portfolioData.contact.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 font-bold text-black transition-all transform bg-white rounded-full hover:bg-zinc-200 hover:scale-105"
          >
            <Mail size={20} />
            Say Hello
          </a>

          <div className="flex justify-center gap-8 mt-20 text-zinc-600">
            <a href="#" className="transition-colors hover:text-white">
              <Github />
            </a>
            <a
              href={portfolioData.contact.linkedin}
              className="transition-colors hover:text-white"
            >
              <Linkedin />
            </a>
            <a href="#" className="transition-colors hover:text-white">
              <Globe />
            </a>
          </div>
          <p className="mt-12 text-sm text-zinc-800">
            © 2025 Shiva Dhanush Reddy
          </p>
        </Reveal>
      </section>
    </div>
  );
};

export default App;
