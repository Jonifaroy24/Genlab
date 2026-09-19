import { useState } from "react";
import "./About.css";
import workspaceImg from "../assets/genlab-hero.jpg";

export default function About({ setCurrentPage }) {
  const [activeHotspot, setActiveHotspot] = useState(null);

  const teamMembers = [
    {
      name: "Alexander Mercer",
      role: "Founder & Principal Systems Architect",
      bio: "Former lead distributed systems engineer at Cloudflare and Stripe. Specialist in low-latency infrastructure and high-concurrency microservices.",
      avatar: "AM",
      socials: ["GitHub", "LinkedIn", "X"],
    },
    {
      name: "Dr. Elena Thorne",
      role: "Head of AI Research & Machine Learning",
      bio: "PhD in Computational Neural Modeling from MIT. Leads Genlab's domain-tuned LLM architectures and vector retrieval pipelines.",
      avatar: "ET",
      socials: ["Scholar", "LinkedIn", "GitHub"],
    },
    {
      name: "Maya Sterling",
      role: "VP of Cloud & DevOps Reliability",
      bio: "12+ years architecting Kubernetes clusters and automated multi-region failover systems with zero downtime SLAs.",
      avatar: "MS",
      socials: ["LinkedIn", "GitHub"],
    },
    {
      name: "Leo Vance",
      role: "Head of Frontend & Product Engineering",
      bio: "Passionate about sub-50ms user interactions, accessible design systems, and modern React / WebGL canvas rendering.",
      avatar: "LV",
      socials: ["GitHub", "Dribbble", "X"],
    },
  ];
       
  const hotspots = [
    {
      id: "ethos",
      title: 'Ethos: "Code • Build • Create"',
      desc: "Our daily mantra: ideas mean nothing without clean execution and resilient code.",  
      x: "16%",
      y: "48%",
    },
    {
      id: "books",
      title: "Core 4 Disciplines Stack",
      desc: "Web Development, Data Science, Machine Learning, and Cloud Computing forming a cohesive unit.",
      x: "46%",
      y: "50%",
    },
    {
      id: "mug",
      title: "Genlab Brand Culture",
      desc: "Boutique precision, deep technical focus, and zero enterprise bureaucracy.",
      x: "64%",
      y: "62%",
    },
    {
      id: "mantra",
      title: '"Progress Not Perfection"',
      desc: "Relentless shipping speed backed by comprehensive automated test suites.",
      x: "78%",
      y: "14%",
    },
  ];

  return (
    <div className="about-page-container">
      {/* 1. Header */}
      <section className="about-hero">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-amber">Our Story & Ethos</span>
            <h1>Engineered for Builders, Trusted by Enterprises</h1>
            <p>
              We are a boutique team of senior systems engineers, AI scientists, and product architects united by a passion for technical excellence.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Studio Photo Showcase with Interactive Hotspots */}
      <section className="studio-showcase-section">
        <div className="container">
          <div className="showcase-card">
            <div className="showcase-header">
              <div className="showcase-title-group">
                <span className="badge badge-blue">Inside Genlab</span>
                <h2>The Engineering Studio & Philosophy</h2>
              </div>
              <p>Click any hotspot on our studio setup to explore our engineering principles.</p>
            </div>

            <div className="interactive-photo-wrapper">
              <img
                src={workspaceImg}
                alt="Genlab Headquarters Engineering Setup"
                className="showcase-photo"
              />

              {/* Hotspot Markers */}
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  className={`hotspot-marker ${activeHotspot?.id === spot.id ? "active" : ""}`}
                  style={{ left: spot.x, top: spot.y }}
                  onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                >
                  <span className="hotspot-pulse"></span>
                  <span className="hotspot-dot">+</span>

                  {activeHotspot?.id === spot.id && (
                    <div className="hotspot-tooltip">
                      <strong>{spot.title}</strong>
                      <p>{spot.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Ethos Cards Grid */}
            <div className="ethos-cards-grid">
              <div className="ethos-card">
                <div className="ethos-icon">🎯</div>
                <h3>Small Steps, Big Goals</h3>
                <p>We break complex, ambiguous enterprise challenges into rapid, bi-weekly verifiable milestones.</p>
              </div>
              <div className="ethos-card">
                <div className="ethos-icon">⚡</div>
                <h3>Progress Not Perfection</h3>
                <p>Ship functional code fast, gather live user telemetry, and iterate relentlessly to achieve bulletproof stability.</p>
              </div>
              <div className="ethos-card">
                <div className="ethos-icon">💡</div>
                <h3>Better Ideas, Bigger Dreams</h3>
                <p>We leverage frontier AI and distributed architectures to unlock 10x ROI for our client partners.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Leadership Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-amber">The Architects</span>
            <h2>Led by Senior Practitioners</h2>
            <p>Every project is personally architected and overseen by our founding engineering directors.</p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="team-avatar-box">
                  <span className="team-avatar-initials">{member.avatar}</span>
                </div>
                <h3 className="team-name">{member.name}</h3>
                <h4 className="team-role">{member.role}</h4>
                <p className="team-bio">{member.bio}</p>

                <div className="team-socials">
                  {member.socials.map((s, sIdx) => (
                    <span key={sIdx} className="social-pill-link">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trust & Security Banner */}
      <section className="security-banner-section">
        <div className="container">
          <div className="security-box">
            <div className="security-col">
              <span className="badge badge-emerald">Enterprise Grade Security</span>
              <h2>Your Code. Your IP. 100% Protected.</h2>
              <p>We enforce strict NDA protocols, isolated development sandboxes, zero client data training, and full SOC2 Type II compliance.</p>
            </div>

            <div className="security-badges-grid">
              <div className="sec-card">
                <strong>SOC2 Type II</strong>
                <span>Audited Security Controls</span>
              </div>
              <div className="sec-card">
                <strong>GDPR & HIPAA</strong>
                <span>Zero-Trust Data Protection</span>
              </div>
              <div className="sec-card">
                <strong>100% IP Ownership</strong>
                <span>Full Source Code Assigned</span>
              </div>
              <div className="sec-card">
                <strong>24/7 SLA Uptime</strong>
                <span>99.99% Reliability Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="about-cta-section">
        <div className="container text-center">
          <h2>Let's Engineer Your Next Competitive Advantage</h2>
          <button
            className="hero-btn-primary"
            onClick={() => {
              setCurrentPage("contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Start a Conversation →
          </button>
        </div>
      </section>
    </div>
  );
}
