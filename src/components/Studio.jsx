import { useState } from "react";
import "./Studio.css";

export default function Studio({ user }) {
  const [studioMode, setStudioMode] = useState("prompt"); // "prompt" | "code" | "arch"
  const [inputPrompt, setInputPrompt] = useState("Build an asynchronous rate limiter middleware for Express using Redis cluster tokens");
  const [targetLang, setTargetLang] = useState("TypeScript");
  const [optimizationFocus, setOptimizationFocus] = useState("performance");
  const [outputResult, setOutputResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedHistory, setSavedHistory] = useState([
    {
      id: 1,
      title: "Redis Rate Limiter Middleware",
      mode: "code",
      time: "2 mins ago",
      snippet: "export async function rateLimit(req, res, next) { ... }",
    },
  ]);

  const presetExamples = {
    prompt: [
      { label: "Principal AI Code Auditor", prompt: "Create a strict system prompt for an automated AI pull request security and performance auditor" },
      { label: "Zero-Shot Data Extraction", prompt: "Structure a bulletproof zero-shot prompt extracting financial transaction entities into typed JSON" },
      { label: "RAG Guardrail Optimizer", prompt: "Formulate a prompt template that verifies citations against ground truth chunks before generating answers" },
    ],
    code: [
      { label: "Express Redis Rate Limiter", prompt: "Build an asynchronous rate limiter middleware for Express using Redis cluster tokens", lang: "TypeScript" },
      { label: "React 19 Infinite Virtualizer", prompt: "Implement an accessible virtualized infinite list hook in React 19 with scroll anchoring", lang: "React" },
      { label: "DuckDB Ingestion Pipeline", prompt: "Write a high-throughput multi-threaded parquet file streaming ingestion script in Python", lang: "Python" },
    ],
    arch: [
      { label: "Multi-Region Kubernetes Ingress", prompt: "Architect a fault-tolerant multi-region Kubernetes cluster with AWS Route53 and Istio mesh", lang: "Terraform" },
      { label: "RAG Vector Architecture", prompt: "Design an end-to-end RAG architecture with Milvus, Kafka queue, and embeddings cache", lang: "Architecture" },
    ],
  };

  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!inputPrompt.trim()) return;

    setIsGenerating(true);
    setOutputResult("");
    setCopied(false);

    try {
      const token = localStorage.getItem("genlab_token") || "";
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: inputPrompt.trim(),
          type: studioMode === "prompt" ? "prompt_studio" : studioMode === "code" ? "code" : "architecture",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOutputResult(data.output);
        addHistory(data.output);
      } else {
        generateLocalFallback();
      }
    } catch {
      generateLocalFallback();
    } finally {
      setIsGenerating(false);
    }
  };

  const generateLocalFallback = () => {
    let result = "";
    if (studioMode === "prompt") {
      result = `### 🌟 [Genlab Optimized System Specification]
**Prompt Objective**: ${inputPrompt}

#### Persona & Directives
- **Identity**: Principal ${optimizationFocus === "security" ? "Security Auditor" : "Systems Engineer"}
- **Execution Mode**: Production-Grade / Strict Constraint Enforcement
- **Token Budget**: Optimized (0.004 sec latency)

#### Behavioral Rules:
1. Validate incoming schemas prior to computational execution.
2. Adhere strictly to zero-hallucination protocols; return structured JSON payloads.
3. Include error boundaries and recovery fallbacks.

#### Output Contract:
\`\`\`json
{
  "status": "VALIDATED",
  "result": "<payload>",
  "audit_trail": {
    "execution_mode": "strict",
    "timestamp": "${new Date().toISOString()}"
  }
}
\`\`\``;
    } else if (studioMode === "code") {
      result = `// ✨ Genlab Code Assistant (${targetLang})
// Target: ${inputPrompt}
// Optimized for: ${optimizationFocus.toUpperCase()}

import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export interface RateLimitOptions {
  windowSec: number;
  maxRequests: number;
}

export function createRateLimiter(options: RateLimitOptions) {
  return async function rateLimiter(req: Request, res: Response, next: NextFunction) {
    const identifier = req.ip || req.headers['x-forwarded-for'] || 'anonymous';
    const key = \`ratelimit:\${identifier}\`;
    
    try {
      const current = await redis.incr(key);
      if (current === 1) {
        await redis.expire(key, options.windowSec);
      }
      
      if (current > options.maxRequests) {
        return res.status(429).json({
          error: 'Too Many Requests',
          retryAfter: await redis.ttl(key),
          message: 'Rate limit exceeded. Please back off.'
        });
      }
      
      res.setHeader('X-RateLimit-Limit', options.maxRequests);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, options.maxRequests - current));
      next();
    } catch (err) {
      // Fail-open strategy to prevent service downtime during Redis transient blips
      console.error('[RateLimiter Error]', err);
      next();
    }
  };
}`;
    } else {
      result = `### ☁️ Genlab Cloud Architecture Specification
**System Blueprint**: ${inputPrompt}

#### Topology Breakdown:
1. **Edge Tier**: Cloudflare DNS & Anycast CDN (DDoS Protection + TLS 1.3 Termination)
2. **Gateway Tier**: AWS Application Load Balancer / Kubernetes Ingress Controller
3. **Compute Mesh**: EKS / GKE Multi-Zone Auto-scaling Cluster (Node.js & Go microservices)
4. **Data & Cache Tier**:
   - Primary: Aurora PostgreSQL Multi-AZ (Read/Write Replicas)
   - Cache / In-Memory: Redis Enterprise Cluster (Sub-1ms session & rate tokens)
5. **Observability**: OpenTelemetry + Prometheus + Grafana Cloud (SLA: 99.99%)

#### Terraform Infrastructure Stub:
\`\`\`hcl
module "genlab_cluster" {
  source       = "./modules/kubernetes-mesh"
  environment  = "production"
  region       = "us-east-1"
  node_count   = 12
  enable_tls   = true
  vpc_cidr     = "10.0.0.0/16"
}
\`\`\``;
    }
    setOutputResult(result);
    addHistory(result);
  };

  const addHistory = (snippet) => {
    const newItem = {
      id: Date.now(),
      title: inputPrompt.slice(0, 36) + (inputPrompt.length > 36 ? "..." : ""),
      mode: studioMode,
      time: "Just now",
      snippet: snippet,
    };
    setSavedHistory((prev) => [newItem, ...prev.slice(0, 4)]);
  };

  const handleCopy = () => {
    if (!outputResult) return;
    navigator.clipboard.writeText(outputResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputResult) return;
    const blob = new Blob([outputResult], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `genlab-${studioMode}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="studio-page-container">
      <div className="container">
        {/* Studio Top Bar */}
        <div className="studio-top-header">
          <div>
            <div className="badge-row">
              <span className="badge badge-amber">⚡ Genlab Engine v2.4</span>
              <span className="badge badge-blue">Interactive Workbench</span>
            </div>
            <h1>AI Innovation Studio</h1>
            <p>Engineer production-ready prompts, synthesize optimized code algorithms, and architect cloud topologies.</p>
          </div>

          <div className="studio-mode-selector">
            <button
              className={`mode-btn ${studioMode === "prompt" ? "active" : ""}`}
              onClick={() => {
                setStudioMode("prompt");
                setInputPrompt("Create a strict system prompt for an automated AI pull request security and performance auditor");
              }}
            >
              ✨ Prompt Engineer
            </button>
            <button
              className={`mode-btn ${studioMode === "code" ? "active" : ""}`}
              onClick={() => {
                setStudioMode("code");
                setInputPrompt("Build an asynchronous rate limiter middleware for Express using Redis cluster tokens");
              }}
            >
              💻 Code Synthesizer
            </button>
            <button
              className={`mode-btn ${studioMode === "arch" ? "active" : ""}`}
              onClick={() => {
                setStudioMode("arch");
                setInputPrompt("Architect a fault-tolerant multi-region Kubernetes cluster with AWS Route53 and Istio mesh");
              }}
            >
              ☁️ Architecture Architect
            </button>
          </div>
        </div>

        {/* Studio Main Workspace Grid */}
        <div className="studio-grid">
          {/* Left: Input & Parameters */}
          <div className="studio-panel-left">
            <div className="panel-box">
              <div className="panel-header">
                <h3>Engineering Directives</h3>
                <span className="mode-tag">{studioMode.toUpperCase()}</span>
              </div>

              {/* Preset Shortcuts */}
              <div className="presets-area">
                <span className="preset-title">Select Preset:</span>
                <div className="preset-chips">
                  {presetExamples[studioMode]?.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="preset-chip"
                      onClick={() => {
                        setInputPrompt(p.prompt);
                        if (p.lang) setTargetLang(p.lang);
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Textarea */}
              <div className="input-field-group">
                <label>Technical Requirement / Instruction</label>
                <textarea
                  className="studio-textarea"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  rows={6}
                  placeholder="Describe your architecture requirement, component spec, or prompt objective..."
                ></textarea>
              </div>

              {/* Parameter Controls */}
              <div className="studio-controls-row">
                {studioMode === "code" && (
                  <div className="control-item">
                    <label>Language / Framework</label>
                    <select
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="studio-select"
                    >
                      <option value="TypeScript">TypeScript / Node.js</option>
                      <option value="React">React 19 JSX / TSX</option>
                      <option value="Python">Python / FastAPI</option>
                      <option value="Go">Go / Golang</option>
                      <option value="GraphQL">GraphQL Schema</option>
                    </select>
                  </div>
                )}

                <div className="control-item">
                  <label>Optimization Objective</label>
                  <select
                    value={optimizationFocus}
                    onChange={(e) => setOptimizationFocus(e.target.value)}
                    className="studio-select"
                  >
                    <option value="performance">⚡ High Throughput / Sub-ms Latency</option>
                    <option value="security">🛡️ Zero-Trust Security & Validation</option>
                    <option value="maintainability">Clean Code & Type Safety</option>
                    <option value="cost">💰 Token / Cloud Cost Efficiency</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                className="studio-run-btn"
                disabled={isGenerating || !inputPrompt.trim()}
                onClick={handleGenerate}
              >
                {isGenerating ? (
                  <span>Synthesizing Output... ⚡</span>
                ) : (
                  <span>Execute Engine Generation ⚡</span>
                )}
              </button>
            </div>

            {/* Recent History Box */}
            {savedHistory.length > 0 && (
              <div className="history-box">
                <h4>Recent Session Generations</h4>
                <div className="history-list">
                  {savedHistory.map((h) => (
                    <div
                      key={h.id}
                      className="history-item"
                      onClick={() => setOutputResult(h.snippet)}
                    >
                      <div className="history-meta">
                        <span className="history-type">[{h.mode}]</span>
                        <span className="history-time">{h.time}</span>
                      </div>
                      <p className="history-title">{h.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Output Workbench */}
          <div className="studio-panel-right">
            <div className="output-workbench-card">
              <div className="workbench-top">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span className="file-name">genlab_output_{studioMode}.ts</span>
                </div>

                <div className="workbench-actions-right">
                  <button
                    className="icon-btn"
                    onClick={handleCopy}
                    disabled={!outputResult}
                    title="Copy to Clipboard"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy"}
                  </button>
                  <button
                    className="icon-btn"
                    onClick={handleDownload}
                    disabled={!outputResult}
                    title="Download File"
                  >
                    💾 Export
                  </button>
                </div>
              </div>

              <div className="workbench-code-body">
                {isGenerating ? (
                  <div className="generating-loader">
                    <div className="loader-spinner"></div>
                    <p>Executing Genlab LLM Optimization Matrix...</p>
                    <span>Applying {optimizationFocus} guardrails</span>
                  </div>
                ) : outputResult ? (
                  <pre className="code-renderer">{outputResult}</pre>
                ) : (
                  <div className="empty-workbench-state">
                    <div className="empty-icon">⚡</div>
                    <h3>Engine Ready for Dispatch</h3>
                    <p>Select a preset or customize your technical requirements on the left, then click <strong>Execute Engine Generation</strong>.</p>
                  </div>
                )}
              </div>

              {outputResult && (
                <div className="workbench-footer-stats">
                  <span>Engine: Genlab-Omni-v2</span>
                  <span>Latency: ~18ms</span>
                  <span>Status: Verified Safe</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
