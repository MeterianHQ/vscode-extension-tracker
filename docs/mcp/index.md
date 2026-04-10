# MCP Server for AI Assistants

Meterian Security ships a built-in [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that exposes the vulnerability database directly to your AI assistant.

Once connected, you can ask your AI things like:

> *"Is any of my libraries currently vulnerable?"*
> *"What's a safe version for the axios library?"*
> *"Get me a list of all critical vulnerabilities in this project."*

## Why does my AI need an MCP server?

AI assistants are pre-trained on a fixed dataset that becomes stale over time. New vulnerabilities emerge daily, and the AI model has no awareness of issues discovered after its training cutoff. The Meterian MCP server feeds your AI assistant the latest security data in real time, enabling it to:

- Detect vulnerabilities in your project's dependencies
- Suggest safe upgrade versions with full context
- Run full dependency audits across your workspace

## See it in action

<div style="display:flex;gap:16px;flex-wrap:wrap;">
  <div style="flex:1;min-width:280px;">
    <p><strong>English</strong></p>
    <iframe width="100%" height="215" src="https://www.youtube.com/embed/GxM8euTyXRk" title="Meterian Security AI/MCP - English" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  <div style="flex:1;min-width:280px;">
    <p><strong>Italian</strong></p>
    <iframe width="100%" height="215" src="https://www.youtube.com/embed/6raCKVm03VU" title="Meterian Security AI/MCP - Italian" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</div>

## How it works

When the VS Code extension activates, it automatically registers the MCP server with any supported IDEs it finds on your machine (VS Code Copilot, Cursor, Windsurf). For AI CLI tools (Claude Code, Gemini CLI, Codex CLI), use the VS Code commands or the [standalone installer](installation.md).

The server communicates over **stdin/stdout** using the JSON-RPC 2.0 protocol (MCP spec version `2024-11-05`) and exposes two tools and a built-in [Security Audit Skill](skill.md).

!!! note "Premium recommended"
    The MCP server works in Free mode, but Premium mode provides broader language coverage and more detailed advisory information.
