import { useState } from "react";
import "./Portfolio.css";

export default function Portfolio({ setCurrentPage }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCase, setSelectedCase] = useState(null);

  const caseStudies = [
    {
      id: "apex-flow",
      title: "Apex Flow: High-Frequency Algorithmic Risk Engine",
      client: "Apex Financial Group",
      category: "ml",
      categoryName: "Machine Learning & AI",
      summary: "Engineered an ultra-low latency event-driven inference pipeline scoring 85,000 credit card transactions/sec with zero false-alarm halts.",
      imageIcon: "⚡",
      metrics: [
        { label: "Throughput", value: "85K req/s" },
        { label: "Inference Latency", value: "< 11ms" },
        { label: "Fraud Losses Prevented", value: "$18.4M" },
      ],
      challenge: "Apex was experiencing severe processing bottlenecks during market surges, with fraud detection models taking over 250ms per transaction.",
      solution: "Genlab redesigned the pipeline with C++ Python bindings, Redis cluster streaming, and a quantized PyTorch neural engine deployed across distributed AWS nodes.",
      stack: ["PyTorch", "Python", "Kafka", "Redis Enterprise", "AWS Graviton", "Docker"],
      testimonial: "Genlab brought mathematical rigor and engineering craftsmanship that immediately dropped our transaction latency by 95%.",
      testimonialAuthor: "Radhika Kapoor, VP of Engineering",
    },
    {
      id: "pulse-cloud",
      title: "Pulse Health: Zero-Trust DICOM Medical Imaging Cloud",
      client: "Pulse MedTech",
      category: "web",
      categoryName: "Web & SaaS",
      summary: "Architected a HIPAA-compliant multi-tenant radiology platform enabling instant web-based 3D volumetric MRI/CT rendering.",
      imageIcon: "🩺",
      metrics: [
        { label: "SLA Uptime", value: "99.99%" },
        { label: "DICOM Load Speed", value: "0.8s" },
        { label: "Clinics Connected", value: "240+" },
      ],
      challenge: "Radiologists needed to access massive 2GB medical scan series from any web browser without local software installation while preserving HIPAA compliance.",
      solution: "Built a custom WebGL / Canvas rendering engine in React 19 backed by chunked encrypted S3 streaming and Go edge decoders.",
      stack: ["React 19", "TypeScript", "WebGL", "Go", "AWS S3 Encrypted", "PostgreSQL"],
      testimonial: "Our clinicians now review patient scans in seconds from anywhere in the world with total regulatory confidence.",
      testimonialAuthor: "David Lindqvist, CTO",
    },
    {
      id: "geovector",
      title: "GeoVector: AI Fleet Route & Carbon Optimizer",
      client: "Global Haulage Dynamics",
      category: "data",
      categoryName: "Data Intelligence",
      summary: "Created a real-time graph routing engine calculating dynamic traffic, weather, and carbon emission tradeoffs for 4,500 commercial vehicles.",
      imageIcon: "🚚",
      metrics: [
        { label: "Fuel Cost Reduction", value: "-24%" },
        { label: "Active Telemetry Sensors", value: "180,000" },
        { label: "Annual Carbon Saved", value: "4,200 Tons" },
      ],
      challenge: "Unpredictable traffic delays and legacy GPS dispatching resulted in millions in wasted fuel and missed delivery windows.",
      solution: "Genlab implemented a real-time spatial graph optimization model using DuckDB and Apache Spark running on automated Kubernetes workers.",
      stack: ["Python", "DuckDB", "Apache Spark", "Kubernetes", "GraphQL", "PostGIS"],
      testimonial: "The fuel savings alone paid for the entire Genlab engineering engagement within the first 60 days of rollout.",
      testimonialAuthor: "Marcus Vance, COO",
    },
    {
      id: "cognivault",
      title: "CogniVault: Enterprise RAG Legal Intelligence",
      client: "Lexis Counsel Partners",
      category: "ml",
      categoryName: "Machine Learning & AI",
      summary: "Trained and deployed a secure Retrieval-Augmented Generation system querying 10M+ legal contracts with precise citation grounding.",
      imageIcon: "⚖️",
      metrics: [
        { label: "Contract Analysis Time", value: "-80%" },
        { label: "Citation Accuracy", value: "99.4%" },
        { label: "Documents Indexed", value: "10M+" },
      ],
      challenge: "Attorneys were spending over 15 hours per case manually reviewing precedent documents and cross-referencing complex regulatory clauses.",
      solution: "Built a hybrid vector search engine with Milvus, domain-tuned embedding models, and strict zero-hallucination verification guardrails.",
      stack: ["LangChain", "Milvus Vector DB", "OpenAI / Claude", "FastAPI", "React", "Docker"],
      testimonial: "CogniVault transforms how our senior partners prepare litigation briefs without ever risking confidential client privilege.",
      testimonialAuthor: "Elena Rostova, Managing Partner",
    },
    {
      id: "cloudmesh",
      title: "CloudMesh: Multi-Cloud Automated Kubernetes Fabric",
      client: "Aura Fintech Systems",
      category: "cloud",
      categoryName: "Cloud & DevOps",
      summary: "Unified 3 global cloud providers (AWS, GCP, Azure) under a single automated Terraform and Istio service mesh.",
      imageIcon: "🛡️",
      metrics: [
        { label: "Cloud Cost Saved", value: "38%" },
        { label: "Failover Time", value: "< 3s" },
        { label: "Deployment Frequency", value: "50x / day" },
      ],
      challenge: "Aura faced vendor lock-in risks and spiraling multi-cloud infrastructure bills across isolated cloud accounts.",
      solution: "Designed automated Infrastructure as Code with Terraform, zero-trust network policies, and automated cost arbitrage scheduling.",
      stack: ["Terraform", "Kubernetes", "Istio", "AWS", "Google Cloud", "Prometheus"],
      testimonial: "We achieved seamless cross-cloud failover and cut our infrastructure spend by nearly 40%.",
      testimonialAuthor: "Naveen Patel, Head of Infrastructure",
    },
    {
      id: "hyperscale",
      title: "HyperScale: Collaborative B2B Analytics Studio",
      client: "ScaleOrbit",
      category: "web",
      categoryName: "Web & SaaS",
      summary: "Engineered a real-time collaborative canvas application with multiplayer CRDT state synchronization for 50,000 concurrent users.",
      imageIcon: "🚀",
      metrics: [
        { label: "Multiplayer Latency", value: "< 20ms" },
        { label: "Concurrent Users", value: "50,000" },
        { label: "User NPS Score", value: "78" },
      ],
      challenge: "ScaleOrbit needed Google Docs-style real-time collaboration on complex computational workflows without data conflict corruption.",
      solution: "Implemented Yjs CRDT synchronization with Node.js WebSocket clustering and Redis pub/sub backplanes.",
      stack: ["React 19", "Yjs CRDT", "Node.js", "WebSockets", "Redis", "Tailwind"],
      testimonial: "Genlab's deep mastery of real-time state sync allowed us to launch a category-defining SaaS product in record time.",
      testimonialAuthor: "Sarah Miller, CEO",
    },
  ];

  const filteredCases = activeFilter === "all"
    ? caseStudies
    : caseStudies.filter((c) => c.category === activeFilter);

  return (
    <div className="portfolio-page-container">
      {/* Header */}
      <section className="portfolio-hero">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-amber">Case Studies & Deliveries</span>
            <h1>Engineering Realities That Drive Real ROI</h1>
            <p>
              Explore our track record of solving hard software engineering, machine learning, and cloud infrastructure challenges.
            </p>

            {/* Filter Tabs */}
            <div className="portfolio-filter-row">
              <button
                className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                All Projects ({caseStudies.length})
              </button>
              <button
                className={`filter-btn ${activeFilter === "web" ? "active" : ""}`}
                onClick={() => setActiveFilter("web")}
              >
                🌐 Web & SaaS
              </button>
              <button
                className={`filter-btn ${activeFilter === "ml" ? "active" : ""}`}
                onClick={() => setActiveFilter("ml")}
              >
                🧠 Machine Learning & AI
              </button>
              <button
                className={`filter-btn ${activeFilter === "cloud" ? "active" : ""}`}
                onClick={() => setActiveFilter("cloud")}
              >
                ☁️ Cloud & DevOps
              </button>
              <button
                className={`filter-btn ${activeFilter === "data" ? "active" : ""}`}
                onClick={() => setActiveFilter("data")}
              >
                📊 Data Intelligence
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="portfolio-grid-section">
        <div className="container">
          <div className="portfolio-grid">
            {filteredCases.map((item) => (
              <div
                key={item.id}
                className="portfolio-card"
                onClick={() => setSelectedCase(item)}
              >
                <div className="portfolio-card-header">
                  <div className="portfolio-icon-box">{item.imageIcon}</div>
                  <span className="portfolio-cat-tag">{item.categoryName}</span>
                </div>

                <div className="client-name-tag">{item.client}</div>
                <h3 className="portfolio-card-title">{item.title}</h3>
                <p className="portfolio-card-summary">{item.summary}</p>

                <div className="portfolio-metrics-row">
                  {item.metrics.map((m, idx) => (
                    <div key={idx} className="metric-pill">
                      <strong>{m.value}</strong>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="portfolio-card-footer">
                  <div className="mini-stack">
                    {item.stack.slice(0, 3).map((s, idx) => (
                      <span key={idx} className="mini-tag">{s}</span>
                    ))}
                    {item.stack.length > 3 && (
                      <span className="mini-tag-more">+{item.stack.length - 3}</span>
                    )}
                  </div>
                  <span className="view-case-action">Inspect Case Study →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Detail View */}
      {selectedCase && (
        <div className="case-modal-overlay" onClick={() => setSelectedCase(null)}>
          <div className="case-modal" onClick={(e) => e.stopPropagation()}>
            <div className="case-modal-header">
              <div className="modal-title-group">
                <span className="badge badge-amber">{selectedCase.categoryName}</span>
                <h2>{selectedCase.title}</h2>
                <span className="modal-client-label">Client Partner: {selectedCase.client}</span>
              </div>
              <button className="close-modal-btn" onClick={() => setSelectedCase(null)}>
                ✕
              </button>
            </div>

            <div className="case-modal-body">
              {/* Metrics Highlights */}
              <div className="modal-metrics-grid">
                {selectedCase.metrics.map((m, idx) => (
                  <div key={idx} className="modal-metric-card">
                    <span className="modal-metric-value">{m.value}</span>
                    <span className="modal-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Problem & Solution */}
              <div className="case-narrative-grid">
                <div className="narrative-box">
                  <h4>⚠️ The Engineering Challenge</h4>
                  <p>{selectedCase.challenge}</p>
                </div>
                <div className="narrative-box">
                  <h4>💡 The Genlab Solution</h4>
                  <p>{selectedCase.solution}</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="modal-tech-stack">
                <h4>Architecture & Technology Stack</h4>
                <div className="tech-pills-row">
                  {selectedCase.stack.map((t, idx) => (
                    <span key={idx} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>

              {/* Testimonial Quote */}
              <div className="modal-quote-box">
                <p>"{selectedCase.testimonial}"</p>
                <strong>— {selectedCase.testimonialAuthor}</strong>
              </div>

              <div className="modal-footer-cta">
                <button
                  className="modal-cta-btn"
                  onClick={() => {
                    setSelectedCase(null);
                    setCurrentPage("contact");
                  }}
                >
                  Build a Similar System for Your Company →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
