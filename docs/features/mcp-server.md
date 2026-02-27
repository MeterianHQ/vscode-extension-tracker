# MCP Server for AI Assistants

Meterian Security ships a built-in [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that exposes the vulnerability database directly to your AI assistant.

Once connected, you can ask your AI things like:

> *"Is any of my libraries currently vulnerable?"*
> *"What's a safe version for the axios library?"*
> *"Get me a list of all critical vulnerabilities in this project."*

## How it works

When the VS Code extension activates, it automatically registers the MCP server with any supported IDEs it finds on your machine (VS Code, Cursor, Windsurf). For AI CLI tools (Claude Code, Gemini CLI, Codex), use the VS Code commands below or the [standalone installer](#standalone-installation-without-vs-code).

The server exposes two tools:

| Tool | Description |
|------|-------------|
| `advisories/get` | Returns known security advisories for a given library and version |
| `advisories/getNextSafe` | Returns the earliest safe version to upgrade to |

## Supported AI tools

| Tool | Integration method |
|------|--------------------|
| **VS Code** (Copilot) | Config file updated automatically |
| **Cursor** | Config file updated automatically |
| **Windsurf** | Config file updated automatically |
| **Claude Code** | Via VS Code command or standalone installer |
| **Gemini CLI** | Via VS Code command or standalone installer |
| **Codex CLI** | Via VS Code command or standalone installer |

## VS Code commands

Use these from the Command Palette (`Ctrl+Shift+P`) to manually manage registration:

| Command | Description |
|---------|-------------|
| `Register Meterian MCP on Claude Code` | Register with Claude Code |
| `Unregister Meterian MCP from Claude Code` | Remove registration from Claude Code |
| `Register Meterian MCP on Gemini CLI` | Register with Gemini CLI |
| `Unregister Meterian MCP from Gemini CLI` | Remove registration from Gemini CLI |
| `Register Meterian MCP on Codex CLI` | Register with Codex CLI |
| `Unregister Meterian MCP from Codex CLI` | Remove registration from Codex CLI |

---

## Standalone installation (without VS Code)

If you use AI CLI tools without VS Code, you can install the MCP server standalone using the installer script. It downloads the latest version from OpenVSX, smoke-tests it, and registers it with all AI CLIs it finds on your machine.

### Prerequisites

- `node` (any recent LTS version)
- `unzip`
- `curl` (for downloading from OpenVSX)

### Install

```bash
curl -sSfL https://raw.githubusercontent.com/MeterianHQ/vscode-extension-tracker/main/scripts/install-meterian-mcp.sh | bash
```

Or download and run it yourself:

```bash
curl -sSfL https://raw.githubusercontent.com/MeterianHQ/vscode-extension-tracker/main/scripts/install-meterian-mcp.sh -o install-meterian-mcp.sh
chmod +x install-meterian-mcp.sh
./install-meterian-mcp.sh
```

The script will:

1. Download the latest `.vsix` from [OpenVSX](https://open-vsx.org/extension/Meterian/meterian-heidi)
2. Extract the MCP server files to `~/.meterian/mcp-server/`
3. Run a smoke test to verify the server starts correctly
4. Register the server with any AI CLIs found (`claude`, `gemini`, `codex`)

### Uninstall

```bash
./install-meterian-mcp.sh --uninstall
```

This removes `~/.meterian/mcp-server/` and deregisters the server from all AI CLIs.


---

## Useful prompts

Here are some prompts to get the most out of the Meterian MCP server with your AI assistant.

**Check for vulnerabilities:**
> *"Are any of my project's dependencies currently vulnerable?"*

**Get a safe version:**
> *"What is the safest version I can upgrade axios to?"*

**Triage by severity:**
> *"List all critical and high severity vulnerabilities in this project."*

**Fix all vulnerable dependencies within the patch version:**
> *"Using the Meterian MCP server, check all dependencies in this project for known vulnerabilities. For each vulnerable dependency, get the next safe version and apply a fix — but only if the safe version is a patch-level upgrade (same major and minor version). Update the manifest files accordingly."*

---

!!! note "Premium recommended"
    The MCP server works in Free mode, but Premium mode provides broader language coverage and more detailed advisory information.
