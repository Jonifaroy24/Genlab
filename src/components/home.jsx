import { useState } from "react";
import "./home.css";
import heroImage from "../assets/genlab-hero.jpg";

export default function Home({ setCurrentPage, user }) {
  const [quickPrompt, setQuickPrompt] = useState("");
  const [quickResult, setQuickResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("web");

  const disciplines = [
    {
      id: "web",
      title: "Web Development",
      icon: "🌐",
      subtitle: "High-Throughput Web & SaaS Platforms",
      desc: "Architecting resilient full-stack applications with React, Next.js, Node.js, and distributed microservices tailored for sub-second latency.",
      tags: ["React 19", "Node.js", "GraphQL", "Tailwind / Vanilla CSS", "WebSockets"],
      metric: "99.99% Uptime",
    },
    {
      id: "data",
      title: "Data Science",
      icon: "📊",
      subtitle: "Predictive Analytics & Intelligence",
      desc: "Transforming raw unstructured multi-modal enterprise data into real-time BI dashboards, automated ETL pipelines, and statistical forecasting models.",
      tags: ["Python", "Pandas", "DuckDB", "Apache Spark", "Tableau / BI"],
      metric: "10x Data Throughput",
    },
    {
      id: "ml",
      title: "Machine Learning",
      icon: "🧠",
      subtitle: "Custom LLMs & Autonomous Agents",
      desc: "Deploying production-grade Retrieval-Augmented Generation (RAG), domain fine-tuning, computer vision classifiers, and intelligent agent workflows.",
      tags: ["PyTorch", "HuggingFace", "LangChain", "Vector DBs", "OpenAI / Claude / Gemini"],
      metric: "< 45ms Latency",
    },
    {
      id: "cloud",
      title: "Cloud Computing",
      icon: "☁️",
      subtitle: "Zero-Trust Scalable Infrastructure",
      desc: "Automating cloud infrastructure on AWS, GCP, and Azure with Kubernetes, Terraform, containerization, and bulletproof CI/CD pipelines.",
      tags: ["AWS", "Google Cloud", "Kubernetes", "Docker", "Terraform"],
      metric: "Auto-Scaling 10M+ Req/day",
    },
  ];

  const handleQuickGenerate = async (e) => {
    e.preventDefault();
    if (!quickPrompt.trim()) return;

    setIsGenerating(true);
    setQuickResult("");

    try {
      const token = localStorage.getItem("genlab_token") || "";
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: quickPrompt.trim(),
          type: "prompt_studio",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setQuickResult(data.output);
      } else {
        // High quality fallback demo response if backend is offline
        setTimeout(() => {
          setQuickResult(`// ✨ Genlab Optimized System Directive
// Target: ${quickPrompt}

[SYSTEM_DIRECTIVE]
Role: Principal Systems Architect & AI Specialist
Context: Zero-tolerance for hallucinations; high performance async execution.
Strategy:
  1. Parse requirement "${quickPrompt}" into modular components.
  2. Implement with strict TypeScript types, memoization, and O(1) lookups.
  3. Validate against edge cases: concurrent requests, network timeouts, and token limits.
[END_DIRECTIVE]`);
        }, 500);
      }
    } catch {
      // Fallback
      setQuickResult(`// ✨ Genlab Fast Synthesizer
// Synthesized for: "${quickPrompt}"

export async function executePipeline(input) {
  const result = await genlabCore.process({
    task: "${quickPrompt}",
    status: "READY",
    timestamp: new Date().toISOString()
  });
  return result;
}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const navTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-container">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge-group">
                <span className="badge badge-amber">⚡ Enterprise Engineering Studio</span>
                <span className="badge badge-blue">Client Project Ready</span>
              </div>

              <h1 className="hero-headline">
                We Engineer <span className="gradient-text">Intelligent Platforms</span> & Scalable Systems.
              </h1>

              <p className="hero-description">
                From high-concurrency web applications to custom machine learning pipelines and distributed cloud architectures — Genlab turns ambitious technical visions into production realities.
              </p>

              <div className="hero-cta-group">
                <button
                  className="hero-btn-primary"
                  onClick={() => navTo("contact")}
                >
                  <span>Start Your Project</span>
                  <span className="cta-arrow">→</span>
                </button>

                <button
                  className="hero-btn-secondary"
                  onClick={() => navTo("studio")}
                >
                  <span>Launch AI Studio</span>
                  <span className="studio-icon">⚡</span>
                </button>
              </div>

              <div className="hero-proof-row">
                <div className="proof-item">
                  <span className="proof-value">120+</span>
                  <span className="proof-label">Delivered Projects</span>
                </div>
                <div className="proof-divider"></div>
                <div className="proof-item">
                  <span className="proof-value">99.99%</span>
                  <span className="proof-label">System Reliability</span>
                </div>
                <div className="proof-divider"></div>
                <div className="proof-item">
                  <span className="proof-value">4.9 / 5</span>
                  <span className="proof-label">Client Rating</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card with Uploaded Workspace Image */}
            <div className="hero-visual-col">
              <div className="hero-image-frame">
                <img
                  src={heroImage}
                  alt="Genlab Engineering Studio Workspace"
                  className="hero-main-img"
                />
                
                {/* Floating Glass Badges */}
                <div className="floating-card top-right-card">
                  <div className="card-badge-icon">☕</div>
                  <div className="card-badge-text">
                    <strong>Code • Build • Create</strong>
                    <span>Genlab Studio Ethos</span>
                  </div>
                </div>

                <div className="floating-card bottom-left-card">
                  <div className="card-badge-icon">🚀</div>
                  <div className="card-badge-text">
                    <strong>+340% Performance</strong>
                    <span>Optimized Cloud Architecture</span>
                  </div>
                </div>

                <div className="image-overlay-gradient"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE ENGINEERING DISCIPLINES SECTION */}
      <section className="disciplines-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-amber">Core Expertise</span>
            <h2>Four Pillars of Modern Engineering</h2>
            <p>Our multidisciplinary team handles the full technical lifecycle from frontend interfaces to deep algorithmic models.</p>
          </div>

          <div className="disciplines-grid">
            {disciplines.map((item) => (
              <div
                key={item.id}
                className={`discipline-card ${activeTab === item.id ? "card-highlighted" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                <div className="discipline-icon-header">
                  <div className="discipline-icon-box">{item.icon}</div>
                  <span className="discipline-metric-badge">{item.metric}</span>
                </div>

                <h3 className="discipline-title">{item.title}</h3>
                <h4 className="discipline-subtitle">{item.subtitle}</h4>
                <p className="discipline-desc">{item.desc}</p>

                <div className="discipline-tags-row">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag">{tag}</span>
                  ))}
                </div>

                <button
                  className="discipline-link-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navTo("services");
                  }}
                >
                  <span>Explore Practice</span>
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE AI STUDIO PLAYGROUND PREVIEW */}
      <section className="interactive-teaser-section">
        <div className="container">
          <div className="teaser-box">
            <div className="teaser-info">
              <span className="badge badge-blue">Live Interactive Workbench</span>
              <h2>Experience the Genlab AI Generator</h2>
              <p>
                Test our internal AI optimization and code synthesizer engines live. Enter any engineering prompt or software requirement.
              </p>

              <div className="teaser-feature-list">
                <div className="feature-row">
                  <span className="check-icon">✓</span>
                  <span>Instant system prompt structuring</span>
                </div>
                <div className="feature-row">
                  <span className="check-icon">✓</span>
                  <span>Async Node.js and TypeScript synthesis</span>
                </div>
                <div className="feature-row">
                  <span className="check-icon">✓</span>
                  <span>Cloud architecture blueprint modeling</span>
                </div>
              </div>

              <button
                className="full-studio-btn"
                onClick={() => navTo("studio")}
              >
                Open Full Studio Workbench →
              </button>
            </div>

            <div className="teaser-workbench">
              <div className="workbench-header">
                <div className="window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="workbench-title">genlab-engine-v2.1.js</span>
              </div>

              <form onSubmit={handleQuickGenerate} className="workbench-form">
                <textarea
                  className="workbench-input"
                  placeholder="e.g. Design a high-speed Redis caching middleware for user authentication..."
                  value={quickPrompt}
                  onChange={(e) => setQuickPrompt(e.target.value)}
                  rows={3}
                ></textarea>

                <div className="workbench-actions">
                  <button
                    type="button"
                    className="preset-btn"
                    onClick={() => setQuickPrompt("Generate a secure JWT rate-limiting middleware in Express")}
                  >
                    Insert Example
                  </button>
                  <button
                    type="submit"
                    className="generate-btn"
                    disabled={isGenerating || !quickPrompt.trim()}
                  >
                    {isGenerating ? "Synthesizing..." : "Run Generator ⚡"}
                  </button>
                </div>
              </form>

              {quickResult && (
                <div className="workbench-output">
                  <div className="output-header-bar">
                    <span>Generated Output</span>
                    <button
                      className="copy-snippet-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(quickResult);
                        alert("Copied to clipboard!");
                      }}
                    >
                      📋 Copy
                    </button>
                  </div>
                  <pre className="output-code-display">{quickResult}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLIENT CASE STUDIES HIGHLIGHTS */}
      <section className="case-studies-preview-section">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="badge badge-amber">Proven Track Record</span>
              <h2>Featured Case Studies</h2>
              <p>Explore how we help industry leaders engineer mission-critical systems.</p>
            </div>
            <button
              className="view-all-cases-btn"
              onClick={() => navTo("portfolio")}
            >
              View All Case Studies →
            </button>
          </div>

          <div className="cases-grid">
            <div className="case-card">
              <div className="case-category">FINTECH • REAL-TIME ML</div>
              <h3>Automated High-Frequency Fraud Detection Hub</h3>
              <p>Engineered an event-driven Kafka and PyTorch inference pipeline processing 85,000 transactions/sec with sub-12ms latency.</p>
              <div className="case-metrics">
                <div className="metric-box">
                  <strong>+340%</strong>
                  <span>Throughput</span>
                </div>
                <div className="metric-box">
                  <strong>-62%</strong>
                  <span>False Positives</span>
                </div>
              </div>
            </div>

            <div className="case-card">
              <div className="case-category">HEALTHCARE • ENTERPRISE SAAS</div>
              <h3>HIPAA-Compliant Diagnostic Imaging Cloud</h3>
              <p>Built a zero-trust multi-tenant React & Python cloud application for distributed radiology clinics with instant DICOM rendering.</p>
              <div className="case-metrics">
                <div className="metric-box">
                  <strong>99.99%</strong>
                  <span>SLA Uptime</span>
                </div>
                <div className="metric-box">
                  <strong>100%</strong>
                  <span>HIPAA Audited</span>
                </div>
              </div>
            </div>

            <div className="case-card">
              <div className="case-category">AI LOGISTICS • CLOUD DEVOPS</div>
              <h3>Multi-Region Fleet Route Optimization Engine</h3>
              <p>Designed a Kubernetes-orchestrated graph optimization engine reducing multi-stop fleet delivery fuel consumption by 24%.</p>
              <div className="case-metrics">
                <div className="metric-box">
                  <strong>-24%</strong>
                  <span>Fleet Costs</span>
                </div>
                <div className="metric-box">
                  <strong>14 Regions</strong>
                  <span>Zero Downtime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLIENT TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-blue">Client Feedback</span>
            <h2>Trusted by Engineering Leaders</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="star-rating">★★★★★</div>
              <p className="testimonial-quote">
                "Genlab's engineering standard is unmatched. They took our ambiguous AI requirements and delivered a production-ready system weeks ahead of schedule."
              </p>
              <div className="client-author">
                <div className="client-avatar">RK</div>
                <div className="client-meta">
                  <strong>Radhika Kapoor</strong>
                  <span>VP of Engineering, Apex Financial</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="star-rating">★★★★★</div>
              <p className="testimonial-quote">
                "From frontend polish to deep cloud architecture, the Genlab team brought top-tier craftsmanship. The speed and stability are phenomenal."
              </p>
              <div className="client-author">
                <div className="client-avatar">DL</div>
                <div className="client-meta">
                  <strong>David Lindqvist</strong>
                  <span>CTO, Pulse MedTech</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="star-rating">★★★★★</div>
              <p className="testimonial-quote">
                "Working with Genlab felt like having a team of principal architects in-house. Their 'Code • Build • Create' ethos shows in every line of code."
              </p>
              <div className="client-author">
                <div className="client-avatar">SM</div>
                <div className="client-meta">
                  <strong>Sarah Miller</strong>
                  <span>Founder & CEO, ScaleOrbit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-glow"></div>
            <h2>Ready to Build Something Extraordinary?</h2>
            <p>Let's discuss your project scope, architecture blueprint, and delivery timeline.</p>
            <div className="cta-buttons">
              <button
                className="cta-primary-btn"
                onClick={() => navTo("contact")}
              >
                Schedule Consultation 📅
              </button>
              <button
                className="cta-secondary-btn"
                onClick={() => navTo("pricing")}
              >
                View Engagement Tiers →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}