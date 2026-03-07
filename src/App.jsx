import { useEffect } from "react";
import { Link } from "react-router-dom";

const RESUME = {
  email: "rudra.chinhara@iitb.ac.in",
  linkedin: "https://linkedin.com/in/rudra-chinhara",
  github: "https://github.com/RPChinhara",
  education: [
    { degree: "M.S. by Research — Digital Health", school: "Indian Institute of Technology, Bombay", gpa: "9.80", period: "Aug 2025 – Jul 2028" },
    { degree: "B.Tech — Computer Science & Engineering", school: "Central University of Haryana", gpa: "8.35", period: "Nov 2020 – Jul 2024" },
  ],
  experience: [
    { role: "Research Assistant", org: "Koita Centre for Digital Health (KCDH), IIT Bombay", period: "Aug 2025 – Present", bullets: ["Administered multi-user Linux/HPC infrastructure with GPU scheduling, access control, backups, and fault recovery for biomedical ML workloads.", "Automated user provisioning, quota enforcement, and job monitoring using Bash and systemd."] },
    { role: "Research Intern", org: "KCDH, Ashoka University", period: "Feb 2024 – Jul 2024", bullets: ["Led a cross-standard health data interoperability project integrating 253,617+ Indian brand drug records with international databases.", "Mapped 1,799 active ingredients to OMOP/Athena vocabularies using PubChem IDs, SNOMED-CT, and fuzzy matching.", "Designed a Python-based network analysis framework for drug–ingredient–disease relationship modeling.", "Built a modular Python wrapper with API documentation to automate extraction, normalization, and network construction."] },
    { role: "Research Intern", org: "Centre for Health Analytics and Trends, Ashoka University", period: "Jun 2023 – Aug 2023", bullets: ["Built an end-to-end ETL pipeline in Python and SQL for 250,000+ scraped drug records.", "Developed automated schema normalization and validation for large-scale metadata standardization.", "Integrated multiple international gold-standard drug databases for cross-database interoperability."] },
    { role: "Research Intern", org: "Computational Health Sciences Lab, Ashoka University", period: "Apr 2022 – Jul 2022", bullets: ["Developed FAIR-compliant HPC workflows for large-scale RNA-seq data processing on multi-node clusters.", "Integrated a unified computational pipeline using 10+ bioinformatics tools.", "Performed disease–gene network analysis to identify novel associative links for translational research."] },
  ],
  projects: [
    {
    title: "Gait2Health — Smartphone Gait-Based Deep Learning for Smoking Risk Detection",
    period: "Sep – Nov 2025 · IIT Bombay",
    desc: `Developed a smartphone accelerometer–based digital biomarker system for classifying smoker vs non-smoker gait patterns using a 93-subject dataset. Designed a lightweight hybrid LSTM + feed-forward neural architecture (~5.6K parameters) optimized for mobile inference. Benchmarked against Vector Autoregression and demonstrated model assumption failures under nonlinear gait dynamics. Addressed class imbalance and noisy time-series data using weighted BCE, focal loss, cosine-annealing learning rate, and warm-restart SGD, achieving F1 ≈ 0.87. Applied Integrated Gradients to interpret model predictions and identify discriminative biomechanical gait features linked to smoking-related physiological changes.`,
    tags: ["Deep Learning", "Digital Biomarkers", "LSTM", "Explainable AI"]
    },
    {
    title: "Evaluating Structured Physiotherapy with Omaveloxolone for Friedreich Ataxia",
    period: "Sep – Nov 2025 · IIT Bombay",
    desc: `Designed a clinical trial framework to evaluate combined pharmacological and physiotherapy intervention for Friedreich Ataxia patients. Developed a two-arm parallel randomized controlled trial with power-based sample size estimation (α = 0.05, power = 80%) and defined inclusion–exclusion criteria across 25+ clinical variables. Built a comprehensive Case Report Form (CRF) containing 120+ structured data fields spanning clinical outcomes, vitals, laboratory markers, genetic information, adverse events, and physiotherapy adherence. Mapped trial variables to CDISC SDTM domains to ensure regulatory-grade interoperability. Designed a normalized clinical database schema with 15+ relational tables and a complete ER model for longitudinal patient monitoring.`,
    tags: ["Clinical Trials", "Clinical Data Management", "CDISC SDTM", "Database Design"]
    },
    {
    title: "Causal Analysis of Alcohol Abuse on Employment",
    period: "Sep – Oct 2025 · IIT Bombay",
    desc: `Developed causal inference models to estimate the effect of alcohol abuse on employability while correcting for endogeneity and omitted variable bias. Implemented and compared 2SLS, Bivariate Probit, and Two-Stage Residual Inclusion (2SRI) models on a dataset of 9,822 observations with 33 socioeconomic variables. Conducted robustness checks including Wu-Hausman endogeneity tests and Sargan tests for instrument validity. Demonstrated that naive regression underestimated the negative causal impact of substance abuse by over 15 percentage points, with causal estimates ranging from −19% to −34% compared to −2% from baseline models.`,
    tags: ["Causal Inference", "Econometrics", "2SLS", "Statistical Modeling"]
    },
    {
    title: "Tumor Micro-Environment Network Analysis",
    period: "Mar – Apr 2024 · KCDH, Ashoka University",
    desc: `Implemented spatial network analysis on multiplex mIHC whole-slide imaging data across 40+ patient samples to study tumor-immune micro-environment interactions. Constructed cell-level graphs using 35µm neighborhood rules and engineered graph topology features including mixing score, clustering coefficient, stromal barrier metrics, and modularity. Demonstrated phenotypic separability between cold, mixed, and compartmentalized tumor micro-environments. Validated hypothesized interaction structures using correlation analysis on 22 MIBI samples.`,
    tags: ["Computational Pathology", "Network Analysis", "WSI", "Graph Modeling"]
    },
    {
    title: "Cold Start Item Recommendation System",
    period: "Aug – Dec 2023 · Central University of Haryana",
    desc: `Developed an item cold-start recommendation system using the MovieLens-200k dataset with a modular experimentation pipeline for recommender model comparison. Implemented Attribute-Fused SVD, LearnMAP, LearnAROMA, and DynamicBPR from scratch and designed an attribute-space → latent-space projection framework to improve recommendations for new items. Built an incremental update mechanism using DynamicBPR to update item vectors without full retraining, reducing exploration load by 71% while maintaining 95–97% of full-model accuracy.`,
    tags: ["Recommender Systems", "Matrix Factorization", "SVD", "Ranking Models"]
    }
  ],
  skills: [
    { title: "Programming", items: "Python, R, SQL, Bash, SPARQL" },
    { title: "ML & AI", items: "PyTorch, TensorFlow, Deep Learning, LLM Agents, RAG, LLM Finetuning, Knowledge Graphs, NLP, Computer Vision" },
    { title: "Statistical Methods", items: "Causal Inference, Predictive Modeling, Regression, Econometrics" },
    { title: "Health Informatics", items: "OMOP CDM, SNOMED-CT, FAIR Pipelines, Healthcare Interoperability" },
    { title: "Data Engineering", items: "ETL Pipelines, Data Validation, Clinical Data Management" },
    { title: "Systems & Dev", items: "Linux, HPC, System Administration, Git, API Development, Bioinformatics" },
  ],
  // publications: [
  //   { title: "Integrating Indian Drug Data with International Standards for Enhanced Interoperability", authors: "Rudrapratap Chinhara, Ashish Kumar, Dr. Anshul Kundra", venue: "Journal of Biomedical Informatics (Under Review)", year: "2024", abstract: "This paper presents a comprehensive framework for integrating Indian drug data with international standards to enhance interoperability in healthcare systems. We developed an automated ETL pipeline to map 253,617+ Indian brand drug records to OMOP CDM vocabularies using PubChem IDs and SNOMED-CT. Our approach addresses challenges in data heterogeneity and standardization, enabling seamless integration with global drug databases. The resulting unified dataset facilitates improved clinical decision support and research applications." },
  // ]
};

export default function App() {
  useEffect(() => { document.body.style.cursor = ""; document.body.style.background = "#1e1e1e"; }, []);

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "48px 24px 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #1e1e1e; color: #d4d4d4; font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.7; }
        a { color: #7cb8e8; text-decoration: none; }
        a:hover { text-decoration: underline; }
        h1 { font-size: 22px; font-weight: 600; color: #f0f0f0; margin-bottom: 4px; }
        h2 { font-size: 13px; font-weight: 600; color: #7cb8e8; text-transform: uppercase; letter-spacing: 0.08em; margin: 40px 0 14px; }
        h3 { font-size: 15px; font-weight: 600; color: #f0f0f0; margin-bottom: 2px; }
        p { color: #b0b0b0; margin-bottom: 6px; }
        ul { padding-left: 18px; color: #b0b0b0; }
        li { margin-bottom: 4px; }
        hr { border: none; border-top: 1px solid #333; margin: 10px 0; }
        .meta { font-size: 13px; color: #777; margin-bottom: 6px; }
        .entry { margin-bottom: 24px; }
        .tag { display: inline-block; font-size: 11px; background: #2a2a2a; color: #888; border: 1px solid #3a3a3a; padding: 1px 7px; border-radius: 3px; margin: 3px 3px 0 0; }
        nav a { font-size: 14px; color: #888; margin-right: 18px; }
        nav a:hover { color: #d4d4d4; text-decoration: none; }
        @media (max-width: 600px) { div[style*="max-width: 740px"] { padding: 32px 16px 60px; } }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 18 }}>
  
      <img
        src="/profile.jpeg"
        alt="Rudrapratap Chinhara"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          objectFit: "cover",
          border: "1px solid #333"
        }}
      />

      <div style={{ marginBottom: 0 }}>
        <h1>Rudrapratap Chinhara</h1>
        <div style={{ fontSize: 14, color: "#777", marginBottom: 14 }}>
          Deep Learning · Knowledge Graphs · Generative AI · Network Science
        </div>
        <nav>
          <a href="#about">about</a>
          <a href="#experience">experience</a>
          <a href="#projects">projects</a>
          <a href="#skills">skills</a>
          <a href="#publications">publications</a>
          <Link to="/blog" style={{ fontSize: 14, color: "#888" }}>blog</Link>
        </nav>
      </div>
      </div>

      <hr />

      {/* About */}
      <section id="about">
        <p>
          I am an M.S. by Research student at <a href="https://www.iitb.ac.in" target="_blank" rel="noreferrer">IIT Bombay</a>, affiliated with the <a href="https://www.kcdh.iitb.ac.in" target="_blank" rel="noreferrer">Koita Centre for Digital Health</a>. My work sits at the intersection of deep learning, knowledge graphs, and large-scale data engineering — designing neural architectures, building ETL pipelines, and developing LLM-based systems.
        </p>
        <p style={{ marginTop: 8 }}>
          <a href={`mailto:${RESUME.email}`}>{"Email"}</a>
          {" · "}
          <a href={RESUME.github} target="_blank" rel="noreferrer">GitHub</a>
          {" · "}
          <a href={RESUME.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </p>

        <h2>Education</h2>
        {RESUME.education.map((ed, i) => (
          <div key={i} className="entry">
            <h3>{ed.degree}</h3>
            <div className="meta">{ed.school} · {ed.period} · GPA {ed.gpa}/10</div>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section id="experience">
        <h2>Experience</h2>
        {RESUME.experience.map((exp, i) => (
          <div key={i} className="entry">
            <h3>{exp.role}</h3>
            <div className="meta">{exp.org} · {exp.period}</div>
            <ul>{exp.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
          </div>
        ))}
      </section>

      {/* Publications */}
      {/* <section id="publications">
        <h2>Publications</h2>
        {RESUME.publications.map((pub, i) => (
          <div key={i} className="entry">
            <h3>{pub.title}</h3>
            <div className="meta">{pub.authors} · {pub.venue} · {pub.year}</div>
            <p>{pub.abstract}</p>
          </div>
        ))}
      </section> */}

      {/* Projects */}
      <section id="projects">
        <h2>Projects</h2>
        {RESUME.projects.map((p, i) => (
          <div key={i} className="entry">
            <h3>{p.title}</h3>
            <div className="meta">{p.period}</div>
            <p>{p.desc}</p>
            <div>{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section id="skills">
        <h2>Skills</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <tbody>
            {RESUME.skills.map((sk, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #2a2a2a" }}>
                <td style={{ padding: "7px 16px 7px 0", fontWeight: 600, color: "#d4d4d4", whiteSpace: "nowrap", verticalAlign: "top", width: 160 }}>{sk.title}</td>
                <td style={{ padding: "7px 0", color: "#888" }}>{sk.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <div style={{ marginTop: 56, fontSize: 13, color: "#555", borderTop: "1px solid #333", paddingTop: 18 }}>
        Rudrapratap Chinhara · M.S. Researcher · Koita Centre for Digital Health · IIT Bombay
      </div>
    </div>
  );
}