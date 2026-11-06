---
name: skillspector
description: Security scanner for AI agent skills, prompts, custom instructions, MCP configurations, and web projects using NVIDIA SkillSpector. Use when auditing, scanning, or verifying the security posture of skills, workflows, GitHub actions, or web application configurations.
---

# NVIDIA SkillSpector — Security & Audit Guide

[SkillSpector](https://github.com/NVIDIA/SkillSpector) is an open-source static and semantic security scanner developed by NVIDIA for AI agent ecosystems, agent skills (`SKILL.md`), tool definitions, MCP (Model Context Protocol) configurations, and web application repositories.

SkillSpector analyzes agent instructions, prompts, and codebases to detect vulnerabilities before they reach production or compromise agent environments.

---

## 1. Capabilities & Detection Coverage

SkillSpector scans across **71+ vulnerability patterns in 17 distinct security categories**:

| Category | Description | Risk |
|---|---|---|
| **Prompt Injection** | Direct and indirect prompt injection attempts, context hijacking | Critical |
| **Code Execution** | Arbitrary shell execution (`subprocess`, `eval`, `exec`, unescaped CLI flags) | Critical |
| **Data Exfiltration** | Sensitive token, credential, or state leakage via outbound HTTP/DNS | High |
| **Path Traversal** | Unauthorized filesystem read/write outside project boundaries | High |
| **MCP Security** | Excessive tool permissions, unauthenticated local server endpoints | High |
| **Supply Chain** | Untrusted external package downloads, curl-pipe-to-bash in scripts | High |
| **Secret Leakage** | Hardcoded API keys, JWTs, Webhook secrets, or private keys | Critical |
| **Dangerous Environment** | Overwriting `PATH`, `LD_PRELOAD`, or sensitive system env vars | High |
| **AST Taint Tracking** | Traces untrusted user inputs to dangerous execution sinks | Critical |
| **YARA Signature Matching** | Fast pattern-based matching against known exploitation payloads | Medium |

---

## 2. Installation & Setup

### Option A: Using `uv` (Recommended)
```bash
uv tool install git+https://github.com/NVIDIA/SkillSpector.git
```

### Option B: Using `pip`
```bash
pip install git+https://github.com/NVIDIA/SkillSpector.git
```

### Option C: Using Docker (Zero Local Dependencies)
```bash
docker pull ghcr.io/nvidia/skillspector:latest
```

---

## 3. CLI Usage

### A. Fast Static Audit (No LLM Required)
Perform deterministic rule-based and AST scanning across the repository:
```bash
skillspector scan . --no-llm --format markdown --output security-report.md
```

### B. Audit Agent Skills & Prompts
Target specific skill definitions and agent instructions:
```bash
skillspector scan .agents/skills/ --format markdown
```

### C. Export SARIF for GitHub Code Scanning
Generate SARIF 2.1.0 output compatible with GitHub Security tab:
```bash
skillspector scan . --no-llm --format sarif --output results.sarif
```

### D. Filter by Severity
Only flag high and critical findings:
```bash
skillspector scan . --severity high --format markdown
```

---

## 4. GitHub Actions CI/CD Integration

To automatically audit every pull request and push on GitHub, configure `.github/workflows/security-scan.yml`:

```yaml
name: Security Scan (SkillSpector)

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]
  schedule:
    - cron: '0 0 * * 1' # Weekly security audit every Monday

permissions:
  contents: read
  security-events: write

jobs:
  skillspector:
    name: SkillSpector Security Audit
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install SkillSpector
        run: |
          python -m pip install --upgrade pip
          pip install git+https://github.com/NVIDIA/SkillSpector.git

      - name: Run SkillSpector Scan
        run: |
          skillspector scan . \
            --no-llm \
            --format sarif \
            --output skillspector-results.sarif \
            --severity medium || true

      - name: Upload SARIF to GitHub Security Tab
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: skillspector-results.sarif
          category: SkillSpector
```

---

## 5. Security Best Practices for Greenwood Barbers Repository

1. **Keep Secrets in Environment / Secret Managers**:
   - Never commit Google Apps Script tokens, Telegram Bot tokens, or Fonnte API keys directly into public client-side JavaScript (`assets/` or `index.html`).
   - Use Google Apps Script `PropertiesService.getScriptProperties()` for server-side secret isolation.

2. **Strict Sanitization on Booking Webhook**:
   - Ensure the Google Apps Script Web App validates incoming booking payloads (`fullName`, `phone`, `date`, `timeSlot`) to prevent script injection in Google Sheets or Calendar.

3. **Periodic Audits**:
   - Run `skillspector scan .` whenever updating skills, serverless functions, or build workflows.
