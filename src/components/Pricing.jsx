import { useState } from "react";
import "./Pricing.css";

export default function Pricing({ setCurrentPage }) {
  const [billingCycle, setBillingCycle] = useState("sprint"); // "sprint" | "monthly"
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      id: "starter",
      name: "Sprint Starter",
      tagline: "Ideal for fast MVP launches, standalone features, and architecture proofs-of-concept.",
      priceSprint: "$6,500",
      priceMonthly: "$8,500",
      period: billingCycle === "sprint" ? "per 2-week sprint" : "per month",
      featured: false,
      badge: "Fast Delivery",
      features: [
        "1 Dedicated Senior Full-Stack Engineer",
        "React 19, Next.js & Node.js Architecture",
        "Bi-weekly Milestone Delivery & Demo",
        "100% Tested TypeScript & Unit Tests",
        "14 Days Post-Launch Bugfix Guarantee",
        "Standard Async Communication (Slack)",
      ],
      ctaText: "Start Starter Sprint",
    },
    {
      id: "growth",
      name: "Growth Studio",
      tagline: "Our most popular model for ambitious startups and scale-ups needing dedicated velocity.",
      priceSprint: "$14,500",
      priceMonthly: "$16,500",
      period: billingCycle === "sprint" ? "per 4-week cycle" : "per month (Save 15%)",
      featured: true,
      badge: "★ Most Popular",
      features: [
        "1 Lead Architect + 2 Senior Engineers + 1 ML Specialist",
        "Full-Stack Web + Custom AI/LLM Integration",
        "Automated CI/CD & Kubernetes Setup",
        "Real-Time Slack / Discord Channels + Weekly Video Sync",
        "Continuous Performance & Security Auditing",
        "30 Days Post-Deployment Support",
        "Flexible Scope Pivoting During Sprints",
      ],
      ctaText: "Book Growth Studio",
    },
    {
      id: "enterprise",
      name: "Enterprise Custom",
      tagline: "Full-scale dedicated engineering squads for mission-critical enterprise systems.",
      priceSprint: "$28,000+",
      priceMonthly: "$32,000+",
      period: "custom engagement",
      featured: false,
      badge: "Zero-Trust & SLA",
      features: [
        "Custom Dedicated Squad (4-8 Senior Engineers)",
        "Multi-Cloud Distributed Mesh (AWS/GCP/Azure)",
        "Custom Fine-Tuned AI Models & Private Vector Hubs",
        "SOC2 Type II & HIPAA Compliance Guarantee",
        "24/7 Emergency Incident Response & 99.99% SLA",
        "Dedicated Executive Technical Director",
      ],
      ctaText: "Consult Enterprise Squad",
    },
  ];

  const faqs = [
    {
      q: "Who owns the code and intellectual property produced during the engagement?",
      a: "You own 100% of the intellectual property, repositories, architecture diagrams, and custom AI weights from day one. All IP assignments are explicitly guaranteed in our standard client agreement.",
    },
    {
      q: "How does the bi-weekly sprint cycle operate?",
      a: "Every 2 weeks, we begin with a sprint alignment session to define the deliverables. You receive continuous Git pull request updates throughout the week and a functional deployed build demo at the end of the sprint.",
    },
    {
      q: "Can we pause or scale our dedicated engineering capacity?",
      a: "Yes. Our Growth and Enterprise Studio engagements are flexible. You can scale up your squad size before new milestones or pause between major release phases with 14 days notice.",
    },
    {
      q: "Do you sign Non-Disclosure Agreements (NDAs) before technical discovery?",
      a: "Absolutely. We routinely sign bilateral enterprise NDAs before reviewing proprietary data schemas, algorithms, or client roadmaps.",
    },
  ];

  return (
    <div className="pricing-page-container">
      {/* Header */}
      <section className="pricing-hero">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-amber">Transparent Engagement</span>
            <h1>Clear Investment Models. Maximum Engineering Velocity.</h1>
            <p>
              Choose between focused two-week sprints or a dedicated full-stack studio squad. No hidden retainers, no junior billable hours.
            </p>

            {/* Toggle */}
            <div className="billing-toggle-wrapper">
              <button
                className={`toggle-btn ${billingCycle === "sprint" ? "active" : ""}`}
                onClick={() => setBillingCycle("sprint")}
              >
                Sprint-Based (Milestone Delivery)
              </button>
              <button
                className={`toggle-btn ${billingCycle === "monthly" ? "active" : ""}`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly Studio Retainer <span className="discount-tag">Save 15%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="pricing-cards-section">
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card ${plan.featured ? "featured-card" : ""}`}
              >
                {plan.badge && (
                  <div className="card-badge-header">
                    <span className={plan.featured ? "badge badge-amber" : "badge badge-blue"}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-tagline">{plan.tagline}</p>

                <div className="plan-price-box">
                  <span className="price-number">
                    {billingCycle === "sprint" ? plan.priceSprint : plan.priceMonthly}
                  </span>
                  <span className="price-period">{plan.period}</span>
                </div>

                <div className="plan-divider"></div>

                <div className="plan-features-list">
                  <h4>What's Included:</h4>
                  <ul>
                    {plan.features.map((feat, idx) => (
                      <li key={idx}>
                        <span className="check-bullet">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`plan-cta-btn ${plan.featured ? "featured-btn" : ""}`}
                  onClick={() => {
                    setCurrentPage("contact");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {plan.ctaText} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="comparison-table-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-blue">Deep Dive</span>
            <h2>Engagement Comparison Matrix</h2>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Deliverable / Feature</th>
                  <th>Sprint Starter</th>
                  <th className="highlight-col">Growth Studio</th>
                  <th>Enterprise Custom</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Team Composition</td>
                  <td>1 Senior Engineer</td>
                  <td className="highlight-col">Lead Architect + 3 Engineers</td>
                  <td>4-8 Dedicated Specialists</td>
                </tr>
                <tr>
                  <td>AI & LLM Fine-Tuning</td>
                  <td>Basic Prompts</td>
                  <td className="highlight-col">Full RAG & Custom Fine-Tuning</td>
                  <td>Private Distributed Vector Hubs</td>
                </tr>
                <tr>
                  <td>Cloud CI/CD & DevOps</td>
                  <td>Docker & Single VM</td>
                  <td className="highlight-col">Kubernetes & Multi-AZ AWS</td>
                  <td>Zero-Trust Multi-Cloud Mesh</td>
                </tr>
                <tr>
                  <td>Code Quality & Tests</td>
                  <td>100% TypeScript + Unit</td>
                  <td className="highlight-col">Unit + E2E + Security Scans</td>
                  <td>SOC2 Audit & Pen-Testing</td>
                </tr>
                <tr>
                  <td>Async Sync & Support</td>
                  <td>Standard Slack</td>
                  <td className="highlight-col">Dedicated Channel + Weekly Demo</td>
                  <td>24/7 Dedicated On-Call</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-amber">Got Questions?</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${openFaq === idx ? "open" : ""}`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <span className="faq-toggle-icon">{openFaq === idx ? "−" : "+"}</span>
                </div>
                {openFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
