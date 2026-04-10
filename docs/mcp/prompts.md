# Prompts & Examples

A collection of prompts to get the most out of the Meterian MCP server with your AI assistant.

## Check for vulnerabilities

> *"Are any of my project's dependencies currently vulnerable?"*

> *"Scan all manifest files in this workspace for known security vulnerabilities."*

## Get a safe version

> *"What is the safest version I can upgrade axios to?"*

> *"What's the next safe patch version for log4j 2.14.1?"*

## Triage by severity

> *"List all critical and high severity vulnerabilities in this project."*

> *"Which of my dependencies have a CVSS score above 7?"*

## Targeted lookups

> *"Is express@4.17.1 affected by any known vulnerabilities?"*

> *"What CVEs affect org.springframework:spring-web at version 5.3.18?"*

## Automated remediation

**Patch-level fixes only (safe to apply automatically):**

> *"Using the Meterian MCP server, check all dependencies in this project for known vulnerabilities. For each vulnerable dependency, get the next safe version and apply a fix — but only if the safe version is a patch-level upgrade (same major and minor version). Update the manifest files accordingly."*

**Full remediation with approval for breaking changes:**

> *"Audit all dependencies using the Meterian MCP server. Apply patch-level fixes automatically. For minor and major version upgrades, show me the changes and ask for confirmation before applying."*

---

!!! tip "Use the Security Audit Skill"
    For a structured, repeatable audit workflow, use the built-in [Security Audit Skill](skill.md) instead of writing prompts from scratch. It handles full audits, ad-hoc queries, and remediation in a single invocation.
