# AI Tool Integrations

The Meterian MCP server integrates with 7 AI tools and IDEs. Integration falls into two categories:

- **Automatic** — the VS Code extension registers the server on startup, no action needed
- **Manual** — use a VS Code command or the [standalone installer](installation.md)

## Supported AI tools

| Tool | Integration method | Website |
|------|--------------------|---------|
| **VS Code** (Copilot) | Automatic on extension load | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Cursor** | Automatic on extension load | [cursor.com](https://www.cursor.com/) |
| **Windsurf** | Automatic on extension load | [windsurf.com](https://windsurf.com/) |
| **Claude Code** | VS Code command or standalone installer | [claude.ai/code](https://claude.ai/code) |
| **Gemini CLI** | VS Code command or standalone installer | [github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) |
| **Codex CLI** | VS Code command or standalone installer | [github.com/openai/codex](https://github.com/openai/codex) |
| **mcp-cli** | VS Code command or standalone installer | [github.com/philschmid/mcp-cli](https://github.com/philschmid/mcp-cli) |

---

## Automatic integrations

When the VS Code extension loads, it auto-registers the MCP server for:

**VS Code Copilot** — registered via the VS Code Language Model API. No config file needed.

**Cursor** — config written to `~/.cursor/mcp.json`.

**Windsurf** — config written to `~/.codeium/windsurf/mcp_config.json`.

These registrations are updated automatically whenever the extension is updated (the server path is kept in sync).

---

## Manual integrations (VS Code commands)

For Claude Code, Gemini CLI, Codex CLI, and mcp-cli, use the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`):

| Command | Description |
|---------|-------------|
| `Register Meterian MCP server on...` | Shows a picker — select the target AI tool |
| `Unregister Meterian MCP server on...` | Shows a picker — select the target AI tool to remove |

Both commands support: **Claude Code**, **Gemini CLI**, **Codex CLI**, **mcp-cli**.

The extension searches for each CLI binary in common installation locations before falling back to `PATH`.

---

## How registration works per tool

=== "Claude Code"

    Uses `claude mcp add` / `claude mcp remove`:

    ```bash
    # Register
    claude mcp add meterian-mcp -s user -- node /path/to/entry.js

    # Unregister
    claude mcp remove meterian-mcp -s user
    ```

    Config is stored at user scope. After registration the server is available in all Claude Code sessions.

    !!! warning "Known issue"
        Due to a [Claude issue](https://github.com/anthropics/claude-code/issues/30147) that prematurely closes stdin, you may need to reconnect after starting Claude for the first time. Open `/mcp`, select the server with the arrows, and click **Reconnect**.

=== "Gemini CLI"

    Uses `gemini mcp add` / `gemini mcp remove`:

    ```bash
    # Register
    gemini mcp add meterian-mcp node /path/to/entry.js --scope user

    # Unregister
    gemini mcp remove meterian-mcp --scope user
    ```

=== "Codex CLI"

    Uses `codex mcp add` / `codex mcp remove`:

    ```bash
    # Register
    codex mcp add meterian-mcp -- node /path/to/entry.js

    # Unregister
    codex mcp remove meterian-mcp
    ```

=== "mcp-cli"

    Config file written to `~/.config/mcp/mcp_servers.json`:

    ```json
    {
      "mcpServers": {
        "meterian-mcp": {
          "command": "node",
          "args": ["/path/to/entry.js"]
        }
      }
    }
    ```
