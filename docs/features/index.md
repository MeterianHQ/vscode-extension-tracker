# Features

Here is a detailed overview of everything Meterian Security can do.

---

## Vulnerability Scanning

Automatically scans your project every time you open it, and re-scans whenever a manifest file changes. No manual steps required.

- Detects vulnerabilities in **direct and transitive dependencies**
- Powered by the [Meterian Kiwi](https://www.meterian.io/product/kiwi/) vulnerability database
- Results appear inline in the editor, in the Problems panel, and in the summary report
- Severity, CVSS score, and EPSS score are shown for each finding

See [Supported Languages](../languages.md) for the full list of manifests and lockfiles supported.

---

## Autofix & Remediation

One-click fixes that upgrade a vulnerable dependency to a safe version, right from the editor.

- Available as a **Quick Fix lightbulb** on highlighted lines
- Also accessible from the summary report and the Command Palette
- Supports automatic version pinning for multiple languages and package managers

[Full details →](autofix.md)

---

## Smart Notifications & Snoozing

Control when and how often the extension alerts you. Suppress noise without losing coverage.

- Only notify when **new** vulnerabilities are discovered
- **Snooze** a single finding or an entire manifest file for a configurable period
- Configurable notification frequency: always, once per session, daily, weekly, or never

[Full details →](snoozing.md)

---

## MCP Server for AI Assistants

The extension ships a built-in MCP server that exposes the Meterian vulnerability database to your AI assistant. Ask questions like:

> *"Is any of my libraries currently vulnerable?"*
> *"What's a safe version for axios?"*

Supported tools: **Claude Code**, **Cursor**, **Windsurf**, **Gemini CLI**, **Codex**.

[Full details →](mcp-server.md)

---

## Interactive Summary Report

A full HTML panel summarising all findings across your project.

- **Summary tab**: severity breakdown (Critical / High / Medium / Low) with counts and affected packages
- **Components tab**: per-file list of vulnerable dependencies with quickfix links
- **CVE details**: expandable inline for each finding — CVE ID, description, advisory link, safe versions
- Access via the `Open summary` command or links in the Problems panel

---

## Free vs Premium

| | Free | Premium |
|---|---|---|
| Vulnerability detection | ✅ | ✅ |
| Autofix / safe version suggestions | Partial | Full |
| Lockfile analysis | ✅ | ✅ |
| License issue detection | | ✅ |
| Deep transitive analysis | | ✅ |

Premium mode is activated by setting a [Meterian API token](../configuration.md). Tokens are free for individuals — create one at the [Meterian Dashboard](https://meterian.io/dashboard#tokens).

---

## Privacy & Data

The extension transfers only the **name, version, and language** of each library to the Meterian API. No source code, no file contents, no personal information.

See [What data is transferred?](../index.md#what-data-is-transferred-by-the-plugin) for the full privacy statement.
