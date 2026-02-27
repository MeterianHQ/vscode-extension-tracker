# MCP Server for AI Assistants

Meterian Security ships a built-in [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that exposes the vulnerability database directly to your AI assistant.

Once connected, you can ask your AI things like:

> *"Is any of my libraries currently vulnerable?"*
> *"What's a safe version for the axios library?"*
> *"Get me a list of all critical vulnerabilities in this project."*

## How it works

When the extension activates, it automatically registers the MCP server with any supported AI tools it finds on your machine. No manual configuration needed.

The server exposes two tools:

| Tool | Description |
|------|-------------|
| `advisories/get` | Returns known security advisories for a given library and version |
| `advisories/getNextSafe` | Returns the earliest safe version to upgrade to |

## Supported AI tools

| Tool | Integration method |
|------|--------------------|
| **Claude Code** | Auto-registered on extension activation |
| **Cursor** | Config file updated automatically |
| **Windsurf** | Config file updated automatically |
| **Gemini CLI** | Auto-registered on extension activation |
| **Codex CLI** | Auto-registered on extension activation |

## Commands

| Command | Description |
|---------|-------------|
| `Register Meterian MCP on Claude Code` | Manually register with Claude Code |
| `Unregister Meterian MCP from Claude Code` | Remove registration from Claude Code |
| (similar commands for Gemini, Codex, Cursor, Windsurf) | |

## Using without VS Code

A standalone installer is available for users who want to use the MCP server outside VS Code — for example, in a CI environment or with a CLI-only AI tool.

See the [standalone installation guide](https://github.com/MeterianHQ/vscode-extension-tracker) for details.

!!! note "Premium recommended"
    The MCP server works in Free mode, but Premium mode provides broader language coverage and more detailed advisory information.
