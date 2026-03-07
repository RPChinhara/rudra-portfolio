import { useState, useEffect, useRef } from "react";

const GITHUB_USER = "RPChinhara";

const RESUME = {
  name: "Rudrapratap Chinhara",
  title: "Digital Health × ML Researcher",
  location: "New Delhi, India",
  email: "rpchinhara@gmail.com",
  linkedin: "https://linkedin.com/in/rudra-chinhara",
  github: `https://github.com/${GITHUB_USER}`,
  phone: "+91 920-564-5991",
  about: "Postgraduate researcher at IIT Bombay building at the intersection of clinical data science, deep learning, and health informatics. From RNA-seq pipelines to LLM agents — I build systems that make sense of biomedical complexity.",
  stats: [
    { num: "9.80", label: "GPA / 10 at IIT-B" },
    { num: "250K+", label: "Drug Records Processed" },
    { num: "0.87", label: "F1 Score — Gait Model" },
  ],
  education: [
    { degree: "M.S. by Research — Digital Health", school: "Indian Institute of Technology, Bombay", gpa: "9.80", period: "Aug 2025 – Jul 2028", location: "Mumbai, India" },
    { degree: "B.Tech — Computer Science & Engineering", school: "Central University of Haryana", gpa: "8.35", period: "Nov 2020 – Jul 2024", location: "Mahendragarh, India" },
  ],
  experience: [
    { role: "Research Assistant", org: "Koita Centre for Digital Health (KCDH), IIT Bombay", period: "Aug 2025 – Present", bullets: ["Administered multi-user Linux/HPC infrastructure with GPU scheduling, access control, backups, and fault recovery for biomedical ML workloads.", "Automated user provisioning, quota enforcement, and job monitoring using Bash and systemd."] },
    { role: "Research Intern", org: "KCDH, Ashoka University · Haryana", period: "Feb 2024 – Jul 2024", bullets: ["Led a cross-standard health data interoperability project integrating 253,617+ Indian brand drug records with international databases.", "Mapped 1,799 active ingredients to OMOP/Athena vocabularies using PubChem IDs, SNOMED-CT, and fuzzy matching.", "Designed a Python-based network analysis framework for drug–ingredient–disease relationship modeling.", "Built a modular Python wrapper with API documentation to automate extraction, normalization, and network construction."] },
    { role: "Research Intern", org: "Centre for Health Analytics and Trends, Ashoka University", period: "Jun 2023 – Aug 2023", bullets: ["Built an end-to-end ETL pipeline in Python and SQL for 250,000+ scraped drug records.", "Developed automated schema normalization and validation for large-scale metadata standardization.", "Integrated multiple international gold-standard drug databases for cross-database interoperability."] },
    { role: "Research Intern", org: "Computational Health Sciences Lab, Ashoka University", period: "Apr 2022 – Jul 2022", bullets: ["Developed FAIR-compliant HPC workflows for large-scale RNA-seq data processing on multi-node clusters.", "Integrated a unified computational pipeline using 10+ bioinformatics tools.", "Performed disease–gene network analysis to identify novel associative links for translational research."] },
  ],
  projects: [
    { title: "Smartphone Gait-Based Deep Learning for Smoking Risk Detection", period: "Sep 2025 – Nov 2025 · IIT Bombay", desc: "Developed a smartphone accelerometer-based digital biomarker system using a 93-subject gait dataset for smoker vs non-smoker classification. Designed a hybrid LSTM + feed-forward neural network (5.6K parameters). Applied Integrated Gradients for model interpretability.", tags: ["LSTM", "Digital Biomarkers", "t-SNE", "Focal Loss", "Explainability"], highlight: "F1: 0.87" },
    { title: "Causal Analysis of Alcohol Abuse on Employment", period: "Sep 2025 – Oct 2025 · IIT Bombay", desc: "Implemented 2SLS, 2SRI, and Bivariate Probit models to estimate causal impact of alcohol abuse on employability. Analyzed 9,822 observations with 33 socioeconomic features using R and Python.", tags: ["Causal Inference", "2SLS", "Econometrics", "R"], highlight: "-19% to -34% effect" },
    { title: "Tumor Micro-Environment Network Analysis", period: "Mar 2024 – Apr 2024 · KCDH, Ashoka University", desc: "Implemented multiplex mIHC/WSI spatial network analysis across 40+ patient whole-slide images. Constructed cell-level graphs using 35 µm neighborhood rules. Validated hypothesized interaction structures using 22 MIBI samples.", tags: ["WSI Analysis", "Network Graphs", "mIHC", "Spatial Biology"], highlight: "40+ WSIs" },
  ],
  skills: [
    { icon: "⚡", title: "Programming", tags: ["Python", "R", "SQL", "Bash", "SPARQL"], purple: false },
    { icon: "🧠", title: "ML & AI", tags: ["PyTorch", "TensorFlow", "Deep Learning", "LLM Agents", "RAG", "LLM Finetuning", "Knowledge Graphs", "NLP", "Computer Vision"], purple: false },
    { icon: "📊", title: "Statistical Methods", tags: ["Causal Inference", "Predictive Modeling", "Regression", "Econometrics"], purple: true },
    { icon: "🏥", title: "Health Informatics", tags: ["OMOP CDM", "SNOMED-CT", "FAIR Pipelines", "Healthcare Interoperability"], purple: false },
    { icon: "🔧", title: "Data Engineering", tags: ["ETL Pipelines", "Data Validation", "Clinical Data Mgmt", "Unstructured Text"], purple: false },
    { icon: "🖥️", title: "Systems & Dev", tags: ["Linux / HPC", "System Administration", "Git", "API Development", "Bioinformatics"], purple: true },
  ],
};

// ── Cursor glowing dot ───────────────────────────────────────────────────────
function CursorGlow() {
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  useEffect(() => {
    if (isTouchDevice) return;
    const dot = dotRef.current;
    const halo = haloRef.current;
    document.body.style.cursor = "none";
    const move = (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      halo.style.left = e.clientX + "px";
      halo.style.top = e.clientY + "px";
    };
    const over = (e) => {
      if (e.target.closest("a, button, [role=button]")) {
        dot.style.transform = "translate(-50%,-50%) scale(1.8)";
        halo.style.transform = "translate(-50%,-50%) scale(1.4)";
        halo.style.opacity = "0.6";
      }
    };
    const out = () => {
      dot.style.transform = "translate(-50%,-50%) scale(1)";
      halo.style.transform = "translate(-50%,-50%) scale(1)";
      halo.style.opacity = "0.35";
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;
  return (
    <>
      <div ref={haloRef} style={{ position: "fixed", pointerEvents: "none", zIndex: 9997, width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(77,232,194,0.5)", transform: "translate(-50%,-50%)", transition: "left 0.1s ease, top 0.1s ease, transform 0.2s ease, opacity 0.2s ease", opacity: 0.35, boxShadow: "0 0 12px rgba(77,232,194,0.25)" }} />
      <div ref={dotRef} style={{ position: "fixed", pointerEvents: "none", zIndex: 9998, width: 6, height: 6, borderRadius: "50%", background: "#4de8c2", transform: "translate(-50%,-50%)", transition: "left 0.04s linear, top 0.04s linear, transform 0.2s ease", boxShadow: "0 0 8px 2px rgba(77,232,194,0.7), 0 0 20px 4px rgba(77,232,194,0.3)" }} />
    </>
  );
}

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add("visible"), i * 60); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── Mobile detection hook ─────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// ─────────────────────────────────────────────────────────────────────────────
// MORE PROJECTS — edit this array to add / remove cards
// Each entry: { name, language, description, link (optional) }
// ─────────────────────────────────────────────────────────────────────────────
const MORE_PROJECTS = [
  {
    name: "Evaluating the Effectiveness of Structured Physiotherapy with Omaveloxolone for Friedreich Ataxia Patients",
    period: "Sep 2025 – Nov 2025 · IIT Bombay",
    tags: ["Clinical Trials", "CDISC SDTM", "Database Design", "RCT"],
    description: "Designed an integrated clinical trial framework to evaluate combined therapy using Omaveloxolone in patients with Friedreich Ataxia. Developed a two-arm parallel RCT with power-based sample size estimation (α = 0.05, power = 80%) and clearly defined inclusion–exclusion criteria for 25+ clinical variables. Built a comprehensive Case Report Form (CRF) with 120+ data fields covering clinical outcomes, genetics, laboratory tests, vitals, adverse events, and physiotherapy adherence. Reviewed FA-ICD data standards and mapped 100% of trial variables to CDISC SDTM domains for regulatory-grade interoperability. Designed a normalized clinical database with 15+ relational tables and a complete ER model for longitudinal patient data capture.",
    link: "",
  },
  {
    name: "Cold Start Item Recommendation System",
    period: "Aug 2023 – Dec 2023 · Central University of Haryana",
    tags: ["Recommender Systems", "Python", "SVD", "DynamicBPR"],
    description: "Designed and implemented an end-to-end item cold-start recommendation system using MovieLens-200k, including data ingestion, preprocessing, attribute extraction, and evaluation. Implemented Attribute-Fused SVD, LearnMAP, LearnAROMA, and DynamicBPR from scratch, extending baselines with attribute-to-feature mapping and temporal exploration strategies. Built an attribute-space → latent-space projection model that reduced initial cold-start error vs. naive baselines. Developed an incremental update mechanism using DynamicBPR reducing exploration load (71% faster) while maintaining 95–97% of full model accuracy.",
    link: "",
  },
];

// ── More projects section ─────────────────────────────────────────────────────
function MoreProjects({ tagStyle }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: 48 }}>
      {/* Toggle button */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: open ? 20 : 0 }}>
        <div style={{ flex: 1, height: 1, background: "rgba(100,200,180,0.12)" }} />
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            background: "none", border: "1px solid rgba(100,200,180,0.18)", borderRadius: 4,
            cursor: "pointer", padding: "7px 18px", display: "flex", alignItems: "center", gap: 8,
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(77,232,194,0.45)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(100,200,180,0.18)"; }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#4de8c2", letterSpacing: "0.1em" }}>
            {open ? "HIDE PROJECTS" : "MORE PROJECTS"}
          </span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4de8c2" strokeWidth="2"
            style={{ transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          ><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div style={{ flex: 1, height: 1, background: "rgba(100,200,180,0.12)" }} />
      </div>

      {/* Cards — same style as main project cards */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr", gap: 20,
        maxHeight: open ? 2000 : 0, overflow: "hidden",
        transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {MORE_PROJECTS.map((p, i) => (
          <div key={i}
            style={{ background: "#0d1318", border: "1px solid rgba(100,200,180,0.12)", borderRadius: 6, padding: "28px 32px", transition: "border-color 0.2s", position: "relative", overflow: "hidden" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(77,232,194,0.28)"; e.currentTarget.querySelector(".mp-accent-bar").style.opacity = 1; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(100,200,180,0.12)"; e.currentTarget.querySelector(".mp-accent-bar").style.opacity = 0; }}
          >
            <div className="mp-accent-bar" style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "linear-gradient(to bottom, #4de8c2, #7b6ef6)", opacity: 0, transition: "opacity 0.2s" }} />
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 6 }}>{p.name}</div>
            {p.period && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#6b8f85", letterSpacing: "0.08em", marginBottom: 12 }}>{p.period}</div>}
            <p style={{ fontSize: 14, color: "#6b8f85", lineHeight: 1.65, marginBottom: p.tags?.length ? 14 : 0 }}>{p.description}</p>
            {p.tags?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.map(t => <span key={t} style={tagStyle(false)}>{t}</span>)}
              </div>
            )}
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer"
                style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#4de8c2", textDecoration: "none", letterSpacing: "0.06em", border: "1px solid rgba(77,232,194,0.2)", padding: "3px 10px", borderRadius: 3, transition: "background 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(77,232,194,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                View Project
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const isMobile = useIsMobile();

  useReveal();

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollPct((window.scrollY / total) * 100);
      const sections = ["hero","about","experience","projects","skills"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const S = {
    page: { background: "#080c10", color: "#d8ede8", fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.7, overflowX: "hidden", minHeight: "100vh" },
    grid: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(77,232,194,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(77,232,194,0.022) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 },
    container: { maxWidth: 1000, width: "100%", margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 },
    tag: (purple) => ({ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.06em", background: purple ? "rgba(123,110,246,0.08)" : "rgba(77,232,194,0.08)", border: `1px solid ${purple ? "rgba(123,110,246,0.2)" : "rgba(77,232,194,0.2)"}`, color: purple ? "#a99cf8" : "#4de8c2", padding: "3px 10px", borderRadius: 3 }),
  };

  const navLinks = ["about","experience","projects","skills"];

  return (
    <div style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c10; }
        ::-webkit-scrollbar-thumb { background: rgba(77,232,194,0.3); border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse { 0%,100% { opacity:0.4; } 50% { opacity:0.7; } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .edu-grid { grid-template-columns: 1fr !important; }
          .exp-grid { grid-template-columns: 1fr !important; gap: 4px !important; }
          .exp-date { text-align: left !important; }
          .exp-body { padding-left: 20px !important; }
          .exp-connector { display: none !important; }
          .section-pad { padding: 60px 0 !important; }
        }
      `}</style>

      <CursorGlow />
      <div style={S.grid} />

      {/* Scroll bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${scrollPct}%`, background: "linear-gradient(to right, #4de8c2, #7b6ef6)", zIndex: 300, transition: "width 0.1s linear" }} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: "rgba(8,12,16,0.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(100,200,180,0.1)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4de8c2" }}>RC</div>
          <div className="nav-links" style={{ display: "flex", gap: 28 }}>
            {navLinks.map(id => (
              <a key={id} href={`#${id}`}
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: activeSection === id ? "#4de8c2" : "#6b8f85", textDecoration: "none", transition: "color 0.2s" }}>
                {id}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: 56 }}>
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 700, height: 700, background: "radial-gradient(circle, rgba(77,232,194,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "10%", left: "-15%", width: 500, height: 500, background: "radial-gradient(circle, rgba(123,110,246,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ ...S.container, width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, letterSpacing: "0.18em", textTransform: "uppercase", color: "#4de8c2", marginBottom: 24, animation: "fadeUp 0.6s ease 0.2s both" }}>
            Deep Learning × Knowledge Graphs
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(42px, 7vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "#fff", marginBottom: 36, animation: "fadeUp 0.6s ease 0.35s both" }}>
            Rudrapratap<br />
            <span style={{ background: "linear-gradient(135deg, #4de8c2 0%, #7b6ef6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Chinhara</span>
          </h1>
          <p style={{ fontSize: 22, color: "#6b8f85", maxWidth: 640, lineHeight: 1.75, marginBottom: 44, animation: "fadeUp 0.6s ease 0.5s both", textAlign: "justify" }}>
            M.S. researcher at <span style={{ color: "#d8ede8" }}>IIT Bombay</span> focused on deep learning, knowledge graphs, and large-scale data engineering. I design neural architectures, build ETL pipelines, and develop LLM-based systems — turning messy, high-dimensional data into structured, actionable intelligence.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 0.6s ease 0.65s both" }}>
            {[
              { href: `mailto:${RESUME.email}`, label: "Get in Touch", primary: true },
              { href: RESUME.linkedin, label: "LinkedIn", primary: false },
              { href: RESUME.github, label: "GitHub", primary: false },
            ].map(btn => (
              <a key={btn.label} href={btn.href} target={btn.primary ? undefined : "_blank"} rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 4, fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s", cursor: "pointer", background: btn.primary ? "#4de8c2" : "transparent", color: btn.primary ? "#080c10" : "#6b8f85", border: btn.primary ? "none" : "1px solid rgba(100,200,180,0.18)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; if (btn.primary) e.currentTarget.style.background = "#6df4d2"; else { e.currentTarget.style.color = "#4de8c2"; e.currentTarget.style.borderColor = "rgba(77,232,194,0.4)"; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; if (btn.primary) e.currentTarget.style.background = "#4de8c2"; else { e.currentTarget.style.color = "#6b8f85"; e.currentTarget.style.borderColor = "rgba(100,200,180,0.18)"; } }}
              >{btn.label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="about" className="section-pad" style={{ padding: "100px 0" }}>
        <div style={S.container}>
          <SectionHeader num="01" title="Education" />
          <div className="reveal edu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {RESUME.education.map(ed => (
              <div key={ed.school}
                style={{ background: "#0d1318", border: "1px solid rgba(100,200,180,0.12)", borderRadius: 6, padding: 28, transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(77,232,194,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(100,200,180,0.12)"}
              >
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 6 }}>{ed.degree}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#4de8c2", letterSpacing: "0.06em", marginBottom: 14 }}>{ed.school}</div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: "#fff" }}>{ed.gpa}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#6b8f85" }}> / 10</span>
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#6b8f85", letterSpacing: "0.05em", lineHeight: 1.7 }}>{ed.period}<br />{ed.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section-pad" style={{ padding: "100px 0" }}>
        <div style={S.container}>
          <SectionHeader num="02" title="Experience" />
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {RESUME.experience.map((exp, i) => (
              <div key={i} className="reveal exp-grid" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "0 40px", position: "relative", paddingBottom: i < RESUME.experience.length - 1 ? 48 : 0 }}>
                {i < RESUME.experience.length - 1 && (
                  <div className="exp-connector" style={{ position: "absolute", left: "calc(200px + 60px)", top: 8, bottom: 0, width: 1, background: "linear-gradient(to bottom, #4de8c2, rgba(100,200,180,0.1))" }} />
                )}
                <div className="exp-date" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.05em", color: "#6b8f85", textAlign: "right", paddingTop: 2 }}>{exp.period}</div>
                <div className="exp-body" style={{ paddingLeft: 48, position: "relative" }}>
                  <div style={{ position: "absolute", left: -8, top: 5, width: 8, height: 8, borderRadius: "50%", background: "#4de8c2", boxShadow: "0 0 10px #4de8c2", transform: "translateX(16px)" }} />
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 17, color: "#fff", marginBottom: 2 }}>{exp.role}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#4de8c2", letterSpacing: "0.05em", marginBottom: 12 }}>{exp.org}</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: 14, color: "#6b8f85", paddingLeft: 16, position: "relative", lineHeight: 1.6 }}>
                        <span style={{ position: "absolute", left: 0, color: "#4de8c2", fontSize: 12 }}>→</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-pad" style={{ padding: "100px 0" }}>
        <div style={S.container}>
          <SectionHeader num="03" title="Selected Projects" />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {RESUME.projects.map((p, i) => (
              <div key={i} className="reveal"
                style={{ background: "#0d1318", border: "1px solid rgba(100,200,180,0.12)", borderRadius: 6, padding: "28px 32px", transition: "border-color 0.2s", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(77,232,194,0.28)"; e.currentTarget.querySelector(".accent-bar").style.opacity = 1; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(100,200,180,0.12)"; e.currentTarget.querySelector(".accent-bar").style.opacity = 0; }}
              >
                <div className="accent-bar" style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "linear-gradient(to bottom, #4de8c2, #7b6ef6)", opacity: 0, transition: "opacity 0.2s" }} />
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#6b8f85", letterSpacing: "0.08em", marginBottom: 12 }}>{p.period}</div>
                  <p style={{ fontSize: 14, color: "#6b8f85", lineHeight: 1.65, marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tags.map(t => <span key={t} style={S.tag(false)}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More projects */}
          <div className="reveal">
            <MoreProjects tagStyle={S.tag} />
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section-pad" style={{ padding: "100px 0" }}>
        <div style={S.container}>
          <SectionHeader num="04" title="Technical Skills" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {RESUME.skills.map((sk, i) => (
              <div key={i} className="reveal"
                style={{ background: "#0d1318", border: "1px solid rgba(100,200,180,0.12)", borderRadius: 6, padding: 24, transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(77,232,194,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(100,200,180,0.12)"; e.currentTarget.style.transform = ""; }}
              >
                <div style={{ fontSize: 22, marginBottom: 12 }}>{sk.icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", letterSpacing: "0.04em", marginBottom: 14 }}>{sk.title}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {sk.tags.map(t => <span key={t} style={S.tag(sk.purple)}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(100,200,180,0.1)", padding: "24px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#5a7a72", letterSpacing: "0.07em" }}>Rudrapratap Chinhara · M.S. Researcher · Koita Centre for Digital Health · IIT Bombay</span>
        </div>
      </footer>

    </div>
  );
}

function SectionHeader({ num, title }) {
  return (
    <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 56 }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#4de8c2", letterSpacing: "0.1em" }}>{num}</span>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28, color: "#fff", letterSpacing: "-0.01em" }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: "rgba(100,200,180,0.12)" }} />
    </div>
  );
}