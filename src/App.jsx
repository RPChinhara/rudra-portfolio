import { Link } from "react-router-dom";

const PROFILE = {
  name: "Rudrapratap Chinhara",
  role: "M.S. by Research, Digital Health",
  affiliation: "Koita Centre for Digital Health, Indian Institute of Technology Bombay",
  subtitle: "Working at the intersection of AI, health informatics, computational biology, and large-scale data systems.",
  email: "rudra.chinhara@iitb.ac.in",
  linkedin: "https://linkedin.com/in/rudra-chinhara",
  github: "https://github.com/RPChinhara",
  researchThemes: [
    "Multimodal AI and digital biomarkers",
    "Knowledge graphs and biomedical representation learning",
    "Network science for complex biomedical data",
    "Ontology-driven data modeling and semantic interoperability",
    "Clinical data interoperability and health data infrastructure",
  ],
  about: [
    "I am currently an M.S. by Research student at the Koita Centre for Digital Health, affiliated with the Indian Institute of Technology Bombay. I work under the supervision of Prof. Kshitij Jadhav and Prof. Pramod Wangikar on research at the intersection of AI, health informatics, and computational biology.",
    "My work focuses on building multimodal AI systems and data infrastructure for large-scale datasets. My interests include deep learning, knowledge graphs, network science, and scalable data engineering, with an emphasis on representation learning and graph-based modeling.",
    "Before joining IIT Bombay, I completed my B.Tech in Computer Science and Engineering from Central University of Haryana. During that time, I worked on projects in large-scale data processing, network analysis, and computational pipelines, and later continued that trajectory through research internships at Ashoka University.",
    "My broader goal is to build robust, scalable AI systems that can extract structure, relationships, and insight from large, complex biomedical and clinical datasets.",
  ],
};

const RESUME = {
  education: [
    { degree: "M.S. by Research — Digital Health", school: "Indian Institute of Technology, Bombay", gpa: "9.80", period: "Aug 2025 – Jul 2028" },
    { degree: "B.Tech — Computer Science & Engineering", school: "Central University of Haryana", gpa: "8.35", period: "Nov 2020 – Jul 2024" },
  ],
  experience: [
    { role: "Research Assistant", org: "Koita Centre for Digital Health (KCDH), IIT Bombay", period: "Aug 2025 – Present", bullets: ["Administered multi-user Linux/HPC infrastructure with GPU scheduling, access control, backups, and fault recovery for biomedical ML workloads.", "Automated user provisioning, quota enforcement, and job monitoring using Bash and systemd."] },
    { role: "Research Intern", org: "KCDH, Ashoka University", period: "Feb 2024 – Jul 2024", bullets: ["Led a cross-standard health data interoperability project integrating 253,617+ Indian brand drug records with international databases.", "Mapped 1,799 active ingredients to OMOP/Athena vocabularies using PubChem IDs, SNOMED-CT, and fuzzy matching.", "Designed a Python-based network analysis framework for drug-ingredient-disease relationship modeling.", "Built a modular Python wrapper with API documentation to automate extraction, normalization, and network construction."] },
    { role: "Research Intern", org: "Centre for Health Analytics and Trends, Ashoka University", period: "Jun 2023 – Aug 2023", bullets: ["Built an end-to-end ETL pipeline in Python and SQL for 250,000+ scraped drug records.", "Developed automated schema normalization and validation for large-scale metadata standardization.", "Integrated multiple international gold-standard drug databases for cross-database interoperability."] },
    { role: "Research Intern", org: "Computational Health Sciences Lab, Ashoka University", period: "Apr 2022 – Jul 2022", bullets: ["Developed FAIR-compliant HPC workflows for large-scale RNA-seq data processing on multi-node clusters.", "Integrated a unified computational pipeline using 10+ bioinformatics tools.", "Performed disease-gene network analysis to identify novel associative links for translational research."] },
  ],
  projects: [
    {
      title: "Gait2Health — Smartphone Gait-Based Deep Learning for Smoking Risk Detection",
      period: "Sep – Nov 2025 · IIT Bombay",
      desc: "Gait2Health explores whether everyday smartphone motion data can reveal behavioral health risks associated with smoking. Using a dataset of 93 participants, I developed a lightweight hybrid LSTM-feedforward neural network designed to classify smoker and non-smoker gait patterns directly from accelerometer signals. Traditional Vector Autoregression models were evaluated as a baseline but struggled with nonlinear rotational gait dynamics present in the data. The final model incorporated focal loss and cosine-annealed optimization to handle class imbalance and noisy time-series signals, achieving an F1 score of approximately 0.87. Model explanations using Integrated Gradients highlighted sensor channels and temporal gait patterns most strongly associated with smoking-related biomechanical effects.",
      tags: ["Deep Learning", "Digital Biomarkers", "LSTM", "Explainable AI"],
    },
    {
      title: "Evaluating Structured Physiotherapy with Omaveloxolone for Friedreich Ataxia",
      period: "Sep – Nov 2025 · IIT Bombay",
      desc: "To investigate the potential benefits of combining physiotherapy with Omaveloxolone treatment for Friedreich Ataxia, I designed the data and study infrastructure for a randomized clinical trial. The study followed a two-arm parallel RCT design with power-based sample size estimation and carefully defined eligibility criteria across multiple clinical variables. A detailed Case Report Form was developed with more than 120 structured data fields capturing longitudinal patient outcomes, laboratory markers, genetic information, adverse events, and therapy adherence. All variables were mapped to CDISC SDTM standards to ensure interoperability with regulatory clinical datasets. The work also produced a normalized relational database schema and ER model capable of supporting longitudinal patient monitoring.",
      tags: ["Clinical Trials", "Clinical Data Management", "CDISC SDTM", "Database Design"],
    },
    {
      title: "Causal Analysis of Alcohol Abuse on Employment",
      period: "Sep – Oct 2025 · IIT Bombay",
      desc: "Understanding how substance abuse affects employability requires separating correlation from true causal effects. Using a dataset of 9,822 observations with 33 socioeconomic variables, I implemented several econometric approaches including Two-Stage Least Squares, Bivariate Probit, and Two-Stage Residual Inclusion models. Instrument validity and endogeneity were assessed through Wu-Hausman and Sargan tests. The analysis showed that naive regression approaches significantly underestimate the negative impact of alcohol abuse on employment outcomes. In contrast, causal models estimated a statistically significant reduction in employment probability ranging from roughly 19% to 34%.",
      tags: ["Causal Inference", "Econometrics", "2SLS", "Statistical Modeling"],
    },
    {
      title: "Tumor Micro-Environment Network Analysis",
      period: "Mar – Apr 2024 · KCDH, Ashoka University",
      desc: "This work examined spatial organization patterns within tumor micro-environments using multiplex immunohistochemistry whole-slide imaging data. Cell-level interaction graphs were constructed from more than forty patient slides using 35 um neighborhood rules to model tumor-immune spatial relationships. Several graph topology features, including mixing score, clustering coefficient, stromal barrier metrics, and modularity, were engineered to characterize tissue architecture. The resulting network representations revealed distinct structural patterns separating cold, mixed, and compartmentalized tumor environments. Additional validation using MIBI sample correlations supported the hypothesized interaction structures.",
      tags: ["Computational Pathology", "Network Analysis", "WSI", "Graph Modeling"],
    },
    {
      title: "Cold Start Item Recommendation System",
      period: "Aug – Dec 2023 · Central University of Haryana",
      desc: "Recommender systems struggle when new items enter the platform without interaction history. To address this cold-start problem, I built a recommendation pipeline using the MovieLens-200k dataset and implemented several algorithms including Attribute-Fused SVD, LearnMAP, LearnAROMA, and DynamicBPR from scratch. The system projects item attributes into latent feature space to generate initial recommendations before sufficient user interactions accumulate. An incremental update mechanism based on DynamicBPR allows item vectors to be updated without retraining the entire model, reducing exploration overhead by roughly 71% while maintaining 95–97% of full-model ranking performance.",
      tags: ["Recommender Systems", "Matrix Factorization", "SVD", "Ranking Models"],
    },
  ],
  skills: [
    { title: "Programming", items: "Python, R, SQL, Bash, SPARQL" },
    { title: "ML & AI", items: "PyTorch, TensorFlow, Deep Learning, LLM Agents, RAG, LLM Finetuning, Knowledge Graphs, Network Science, NLP, Computer Vision" },
    { title: "Statistical Methods", items: "Causal Inference, Predictive Modeling, Regression, Econometrics" },
    { title: "Health Informatics", items: "OMOP CDM, SNOMED-CT, FAIR Pipelines, Healthcare Interoperability" },
    { title: "Data Engineering", items: "ETL Pipelines, Data Validation, Clinical Data Management" },
    { title: "Systems & Dev", items: "Linux, HPC, System Administration, Git, API Development, Bioinformatics" },
  ],
  publications: [
    {
      title: "Blood transcriptomics reveal IL-10-modulated Neutrophil-Monocyte axis is associated with hypertrophic cardiomyopathy in Friedreich's Ataxia",
      authors: "Dr Mohammed Faruq, Ms Shweta Sahni, Mr Vivek anand, Ms Asangla Kamai, Dr Istaq Ahmad, Mr Zubair Bhat, Ms Pooja Sharma, Mr Manish Kumar, <strong>Mr Rudra Chinhara</strong>, Ms Bableen Kaur, Dr Rintu Kutum, Dr Muvin Khan, Dr Akhilesh Sonakar, Professor Achal Srivastava",
      venue: "TBA (Under Review)",
      year: "2025",
      abstract: "Friedreich's ataxia (FRDA) caused by biallelic Frataxin (FXN) loss is classically a neurological disorder, yet cardiomyopathy is the leading cause of mortality. To identify peripheral transcriptomic markers, this study profiled blood from FRDA patients. Bulk mRNA sequencing of 52 patients versus 12 controls confirmed FXN down-regulation and revealed immune dysregulation signatures, especially neutrophil degranulation pathways. Single-cell RNA sequencing of PBMCs (16 patients, 15 controls) showed an expanded CD14+ monocyte pool, including an IL-10-producing subpopulation. Complementary whole-blood scRNA-seq (4 patients, 4 controls) demonstrated neutrophils with a STAT1-driven interferon/Ly6Ehi profile. Clinically, a higher neutrophil-to-lymphocyte ratio correlated with hypertrophic cardiomyopathy, while IL-10 levels in monocytes were lower in affected patients. Survival analysis identified IL10RB expression as a protective factor against FRDA-related cardiomyopathy. Collectively, the study delivers a transcriptomic atlas of the peripheral immune landscape in FRDA and implicates a neutrophil-monocyte axis, orchestrated by IL-10, as a modulator of inflammation, disease heterogeneity, and a promising source of blood-based biomarkers.",
      doi: "TBA",
    },
  ],
  awards: [
    { title: "Dr. Nitish Thakor Fellowship Award", issuer: "Koita Centre for Digital Health", year: "2026" },
  ],
};

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Skills", href: "#skills" },
  { label: "Awards", href: "#awards" },
  { label: "Blog", to: "/blog" },
];

const AFFILIATIONS = [
  {
    name: "Koita Centre for Digital Health",
    short: "KCDH",
    href: "https://www.kcdh.iitb.ac.in/",
    logo: "/logos/kcdh-logo.png",
  },
  {
    name: "Indian Institute of Technology Bombay",
    short: "IIT Bombay",
    href: "https://www.iitb.ac.in/",
    logo: "/logos/iitb-logo.png",
  },
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="academic-section">
      <div className="academic-section__header">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Record({ title, meta, children, tags }) {
  return (
    <article className="academic-record">
      <div className="academic-record__header">
        <h3>{title}</h3>
        {meta ? <p className="academic-record__meta">{meta}</p> : null}
      </div>
      {children}
      {tags?.length ? (
        <div className="academic-tag-list">
          {tags.map((tag) => (
            <span key={tag} className="academic-tag">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default function App() {
  return (
    <div className="academic-site">
      <header className="academic-topbar">
        <div className="academic-topbar__inner">
          <Link to="/" className="academic-brand">
            {PROFILE.name}
          </Link>
          <nav className="academic-nav" aria-label="Primary">
            {NAV_ITEMS.map((item) =>
              item.to ? (
                <Link key={item.label} to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>
      </header>

      <div className="academic-shell">
        <aside className="academic-aside">
          <img className="academic-portrait" src="/profile.jpeg" alt={PROFILE.name} />
          <p className="academic-kicker">{PROFILE.role}</p>
          <h1>{PROFILE.name}</h1>
          <p className="academic-role">{PROFILE.affiliation}</p>
          <p className="academic-side-note">{PROFILE.subtitle}</p>

          <div className="academic-side-block">
            <p className="academic-mini-heading">Affiliations</p>
            <div className="academic-logo-grid">
              {AFFILIATIONS.map((affiliation) => (
                <a
                  key={affiliation.name}
                  href={affiliation.href}
                  target="_blank"
                  rel="noreferrer"
                  className="academic-logo-card"
                  aria-label={affiliation.name}
                >
                  <img src={affiliation.logo} alt={affiliation.name} />
                  <span>{affiliation.short}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="academic-side-block">
            <p className="academic-mini-heading">Contact</p>
            <div className="academic-contact-list">
              <a href={`mailto:${PROFILE.email}`}>
                Email
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="academic-side-block">
            <p className="academic-mini-heading">Research Themes</p>
            <ul className="academic-compact-list">
              {PROFILE.researchThemes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="academic-content">
          <section id="about" className="academic-section academic-section--intro">
            <div className="academic-section__header">
              <h2>About</h2>
            </div>

            <div className="academic-grid">
              <div>
                {PROFILE.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="academic-note">
                <p className="academic-mini-heading">Current Focus</p>
                <p className="academic-lead">
                  Building robust AI and data systems for clinically meaningful biomedical research.
                </p>
                <ul className="academic-compact-list">
                  <li>Digital health workflows grounded in real-world clinical data.</li>
                  <li>Graph-centric and multimodal learning for biological systems.</li>
                  <li>Reproducible infrastructure for large-scale data pipelines.</li>
                  <li>
                    Large Language Models and generative AI for biomedical knowledge extraction and reasoning.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <Section id="education" title="Education">
            {RESUME.education.map((item) => (
              <Record
                key={item.degree}
                title={item.degree}
                meta={`${item.school} · ${item.period}`}
              >
                <p className="academic-gpa">
                  <span className="academic-gpa__label">GPA</span>
                  <span className="academic-gpa__value">{item.gpa}/10</span>
                </p>
              </Record>
            ))}
          </Section>

          <Section id="experience" title="Experience">
            {RESUME.experience.map((item) => (
              <Record key={`${item.role}-${item.period}`} title={item.role} meta={`${item.org} · ${item.period}`}>
                <ul className="academic-list">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </Record>
            ))}
          </Section>

          <Section id="projects" title="Selected Projects">
            {RESUME.projects.map((project) => (
              <Record key={project.title} title={project.title} meta={project.period} tags={project.tags}>
                <p>{project.desc}</p>
              </Record>
            ))}
          </Section>

          <Section id="publications" title="Publications">
            {RESUME.publications.map((publication) => (
              <Record key={publication.title} title={publication.title} meta={`${publication.venue} · ${publication.year}`}>
                <p
                  className="academic-record__authors"
                  dangerouslySetInnerHTML={{ __html: publication.authors }}
                />
                <p>{publication.abstract}</p>
                {publication.doi && publication.doi !== "TBA" ? (
                  <p className="academic-link-row">
                    <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noreferrer">
                      DOI: {publication.doi}
                    </a>
                  </p>
                ) : null}
              </Record>
            ))}
          </Section>

          <Section id="skills" title="Skills">
            <div className="academic-skill-table" role="table" aria-label="Skill categories">
              {RESUME.skills.map((skill) => (
                <div className="academic-skill-row" role="row" key={skill.title}>
                  <div className="academic-skill-key" role="cell">
                    {skill.title}
                  </div>
                  <div className="academic-skill-value" role="cell">
                    {skill.items}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="awards" title="Awards">
            {RESUME.awards.map((award) => (
              <Record key={award.title} title={award.title} meta={`${award.issuer} · ${award.year}`} />
            ))}
          </Section>

          <footer className="academic-footer">
            {PROFILE.name} · {PROFILE.role} · {PROFILE.affiliation}
          </footer>
        </main>
      </div>
    </div>
  );
}
