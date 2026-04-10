# Standalone Installation

If you use AI CLI tools without VS Code, you can install the MCP server standalone using the installer script. It downloads the latest version from OpenVSX, runs a smoke test, and registers the server with any AI CLIs it finds on your machine.

## Prerequisites

- `node` (any recent LTS version, v16+)
- `unzip`
- `curl`

## Install

Run directly with curl:

```bash
curl -sSfL https://raw.githubusercontent.com/MeterianHQ/vscode-extension-tracker/main/scripts/install-meterian-mcp.sh | bash
```

Or download and run yourself:

```bash
curl -sSfL https://raw.githubusercontent.com/MeterianHQ/vscode-extension-tracker/main/scripts/install-meterian-mcp.sh -o install-meterian-mcp.sh
chmod +x install-meterian-mcp.sh
./install-meterian-mcp.sh
```

### Install from a local `.vsix`

```bash
./install-meterian-mcp.sh --file /path/to/meterian.vsix
```

## What the installer does

1. Downloads the latest `.vsix` from [OpenVSX](https://open-vsx.org/extension/Meterian/meterian-heidi)
2. Extracts the MCP server files to `~/.meterian/mcp-server/`
3. Runs a smoke test — verifies the server boots correctly before registering
4. Detects and registers with any supported AI CLIs found: `claude`, `gemini`, `codex`

## Uninstall

```bash
./install-meterian-mcp.sh --uninstall
```

This removes `~/.meterian/mcp-server/` and deregisters the server from all AI CLIs.

## What gets installed

| Path | Contents |
|------|----------|
| `~/.meterian/mcp-server/` | MCP server runtime files |
| `~/.meterian/heidi/logs/application.log` | Server logs (daily rotation, 7 backups) |
| `~/.claude/skills/meterian-security-audit/` | Security Audit Skill for Claude Code |
| `~/.codex/skills/meterian-security-audit/` | Security Audit Skill for Codex CLI |

