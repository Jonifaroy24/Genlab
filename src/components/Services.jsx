import { useState } from "react";
import "./Services.css";

export default function Services({ setCurrentPage }) {
  const [selectedServices, setSelectedServices] = useState(["web", "ml"]);
  const [projectScale, setProjectScale] = useState("scaleup"); // "mvp" | "scaleup" | "enterprise"
  const [timeline, setTimeline] = useState("standard"); // "rush" | "standard" | "retainer"
  const [estimateSent, setEstimateSent] = useState(false);
  const [clientEmail, setClientEmail] = useState("");

  const serviceCatalog = [
    {
      id: "web",
      title: "Full-Stack Web & SaaS Engineering",
      icon: "🌐",
      category: "Frontend & Backend",
      desc: "Architecting blazingly fast, modern web platforms. We build everything from high-concurrency real-time portals to design-system driven client experiences.",
      deliverables: [
        "React 19 & Next.js App Router Architecture",
        "Microservices & Serverless Node.js / Go APIs",
        "Sub-second Database Layer (PostgreSQL / MongoDB / Redis)",
        "Accessibility (WCAG 2.1 AA) & Mobile Responsiveness",
      ],
      stack: ["React", "TypeScript", "Next.js", "Node.js", "GraphQL", "PostgreSQL", "Redis"],
      baseCost: 8500,
    },
    {
      id: "data",
      title: "Data Science & Real-Time Intelligence",
      icon: "📊",
      category: "Analytics & ETL",
      desc: "Unlocking enterprise value from complex unstructured data. We build scalable data pipelines, automated forecasting models, and interactive executive dashboards.",
      deliverables: [
        "Distributed ETL / ELT Ingestion Pipelines",
        "Real-Time Stream Processing (Kafka / DuckDB)",
        "Predictive Customer & Financial Modeling",
        "Executive Interactive BI Dashboards",
      ],
      stack: ["Python", "Pandas", "DuckDB", "Apache Spark", "Tableau", "Snowflake"],
      baseCost: 9500,
    },
    {
      id: "ml",
      title: "Applied Machine Learning & GenAI",
      icon: "🧠",
      category: "AI & Autonomous Systems",
      desc: "Deploying enterprise-grade AI models directly into your business logic. We specialize in domain-tuned LLMs, RAG knowledge retrieval, and multi-agent systems.",
      deliverables: [
        "Custom LLM Fine-Tuning & Prompt Engineering",
        "RAG (Retrieval-Augmented Generation) Vector Hubs",
        "Multi-Agent Autonomous Orchestration",
        "Model Guardrails, Hallucination Mitigation & Cost Controls",
      ],
      stack: ["PyTorch", "HuggingFace", "LangChain", "Vector DBs (Pinecone/Milvus)", "OpenAI / Gemini"],
      baseCost: 12000,
    },
    {
      id: "cloud",
      title: "Cloud Architecture & DevOps Reliability",
      icon: "☁️",
      category: "Infrastructure & Security",
      desc: "Engineering automated, self-healing cloud ecosystems. We ensure your applications handle millions of requests with zero downtime and strict compliance.",
      deliverables: [
        "Infrastructure as Code (Terraform & Pulumi)",
        "Kubernetes & Docker Multi-Cluster Orchestration",
        "Automated CI/CD Deployment Pipelines",
        "SOC2 Type II & HIPAA Zero-Trust Security Hardening",
      ],
      stack: ["AWS", "Google Cloud", "Kubernetes", "Docker", "Terraform", "GitHub Actions"],
      baseCost: 10000,
    },
    {
      id: "audit",
      title: "Architecture & Performance Audit",
      icon: "🔍",
      category: "Advisory & Optimization",
      desc: "Deep forensic analysis of your existing codebase and cloud infrastructure. We identify bottlenecks, security vulnerabilities, and latency bloat.",
      deliverables: [
        "Full Security & Code Vulnerability Report",
        "Database Query & Indexing Performance Optimization",
        "Frontend Bundle & Core Web Vitals Acceleration",
        "Cloud Cost Optimization Strategy (30%+ Savings)",
      ],
      stack: ["Lighthouse", "SonarQube", "Datadog", "AWS Cost Explorer", "Grafana"],
      baseCost: 6000,
    },
  ];

  // Calculate dynamic estimate
  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const calculateEstimate = () => {
    let total = 0;
    selectedServices.forEach((id) => {
      const s = serviceCatalog.find((item) => item.id === id);
      if (s) total += s.baseCost;
    });

    const scaleMultiplier = projectScale === "mvp" ? 0.75 : projectScale === "scaleup" ? 1.25 : 2.1;
    const timelineMultiplier = timeline === "rush" ? 1.35 : timeline === "standard" ? 1.0 : 0.9;

    const estimatedTotal = Math.round((total * scaleMultiplier * timelineMultiplier) / 500) * 500;
    return {
      min: Math.round(estimatedTotal * 0.85),
      max: Math.round(estimatedTotal * 1.15),
      duration: projectScale === "mvp" ? "4-6 Weeks" : projectScale === "scaleup" ? "8-12 Weeks" : "16-24 Weeks",
    };
  };

  const estimate = calculateEstimate();

  const handleSendEstimate = (e) => {
    e.preventDefault();
    if (!clientEmail) return;
    setEstimateSent(true);
  };

  return (
    <div className="services-page-container">
      {/* Header */}
      <section className="services-hero">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-amber">Engineering Capabilities</span>
            <h1>High-Impact Solutions for Visionary Teams</h1>
            <p>
              We partner with tech founders and enterprise leaders to design, build, and deploy production-grade software that scales seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-catalog-section">
        <div className="container">
          <div className="services-catalog-grid">
            {serviceCatalog.map((service) => (
              <div key={service.id} className="service-detail-card">
                <div className="card-top-row">
                  <div className="service-icon-wrapper">{service.icon}</div>
                  <span className="service-category-badge">{service.category}</span>
                </div>

                <h2>{service.title}</h2>
                <p className="service-description">{service.desc}</p>

                <div className="deliverables-box">
                  <h4>Core Deliverables</h4>
                  <ul>
                    {service.deliverables.map((item, idx) => (
                      <li key={idx}>
                        <span className="bullet-amber">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tech-stack-row">
                  {service.stack.map((tech, idx) => (
                    <span key={idx} className="tech-pill">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Scope & Cost Estimator */}
      <section className="estimator-section">
        <div className="container">
          <div className="estimator-card">
            <div className="estimator-header">
              <span className="badge badge-blue">Interactive Tool</span>
              <h2>Project Scope & Estimate Calculator</h2>
              <p>Customize your requirements below for an instant engineering ballpark and delivery schedule.</p>
            </div>

            <div className="estimator-body-grid">
              {/* Step 1: Select Disciplines */}
              <div className="estimator-controls">
                <div className="control-group">
                  <label className="control-label">1. Select Required Practices</label>
                  <div className="practice-selection-grid">
                    {serviceCatalog.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`practice-select-btn ${selectedServices.includes(s.id) ? "selected" : ""}`}
                        onClick={() => toggleService(s.id)}
                      >
                        <span className="btn-icon">{s.icon}</span>
                        <span className="btn-text">{s.title}</span>
                        <span className="btn-check">{selectedServices.includes(s.id) ? "✓" : "+"}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Scale */}
                <div className="control-group">
                  <label className="control-label">2. Target Architecture Scale</label>
                  <div className="scale-buttons-row">
                    <button
                      type="button"
                      className={`scale-btn ${projectScale === "mvp" ? "active" : ""}`}
                      onClick={() => setProjectScale("mvp")}
                    >
                      <strong>Proof-of-Concept / MVP</strong>
                      <span>Rapid launch for early validation</span>
                    </button>
                    <button
                      type="button"
                      className={`scale-btn ${projectScale === "scaleup" ? "active" : ""}`}
                      onClick={() => setProjectScale("scaleup")}
                    >
                      <strong>Growth / Scale-Up</strong>
                      <span>Production-ready, highly modular</span>
                    </button>
                    <button
                      type="button"
                      className={`scale-btn ${projectScale === "enterprise" ? "active" : ""}`}
                      onClick={() => setProjectScale("enterprise")}
                    >
                      <strong>Enterprise Mission-Critical</strong>
                      <span>Multi-region, SOC2, custom SLA</span>
                    </button>
                  </div>
                </div>

                {/* Step 3: Timeline */}
                <div className="control-group">
                  <label className="control-label">3. Timeline Preference</label>
                  <div className="timeline-tabs">
                    <button
                      type="button"
                      className={`timeline-tab ${timeline === "rush" ? "active" : ""}`}
                      onClick={() => setTimeline("rush")}
                    >
                      ⚡ Accelerated Sprint (Rush)
                    </button>
                    <button
                      type="button"
                      className={`timeline-tab ${timeline === "standard" ? "active" : ""}`}
                      onClick={() => setTimeline("standard")}
                    >
                      ⏱️ Standard Delivery
                    </button>
                    <button
                      type="button"
                      className={`timeline-tab ${timeline === "retainer" ? "active" : ""}`}
                      onClick={() => setTimeline("retainer")}
                    >
                      🔄 Dedicated Monthly Studio
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimate Output Box */}
              <div className="estimate-summary-panel">
                <div className="summary-header">
                  <h3>Estimated Investment</h3>
                  <span className="summary-status">Dynamic Ballpark</span>
                </div>

                <div className="price-display">
                  <div className="price-range">
                    ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
                  </div>
                  <span className="price-subtext">USD • Complete IP Ownership & Source Code</span>
                </div>

                <div className="summary-specs-list">
                  <div className="summary-spec-row">
                    <span>Estimated Sprint Duration:</span>
                    <strong>{estimate.duration}</strong>
                  </div>
                  <div className="summary-spec-row">
                    <span>Selected Modules:</span>
                    <strong>{selectedServices.length} Disciplines</strong>
                  </div>
                  <div className="summary-spec-row">
                    <span>Architecture Tier:</span>
                    <strong style={{ textTransform: "capitalize" }}>{projectScale}</strong>
                  </div>
                  <div className="summary-spec-row">
                    <span>Code Quality Guarantee:</span>
                    <strong style={{ color: "#10b981" }}>100% Tested & Documented</strong>
                  </div>
                </div>

                {estimateSent ? (
                  <div className="estimate-sent-success">
                    <span>✓ Estimate sent! A Genlab principal architect will contact you within 24 hours.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSendEstimate} className="estimate-email-form">
                    <input
                      type="email"
                      placeholder="Enter work email to save this estimate..."
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className="send-estimate-btn">
                      Lock In Estimate & Schedule Call →
                    </button>
                  </form>
                )}

                <p className="estimate-disclaimer">
                  * Final quote provided after technical discovery call with our lead systems architect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
