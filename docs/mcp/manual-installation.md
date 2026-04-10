# Manual Installation

Some AI tools don't have a dedicated VS Code command or CLI integration yet, but still support MCP servers through a config file. This guide walks through a manual setup using **[Roo Code](https://roocode.com/)** as an example — an open-source, model-agnostic AI coding assistant for VS Code.

The same approach applies to any tool that accepts a standard MCP `mcpServers` JSON config.

---

## Step 1 — Download the extension from OpenVSX

The MCP server is bundled inside the Meterian Security extension. Download it as a `.vsix` file from the [OpenVSX Registry](https://open-vsx.org/extension/Meterian/meterian-heidi).

### Get the latest version

Query the OpenVSX API to find the current version and download URL:

```bash
curl -s https://open-vsx.org/api/Meterian/meterian-heidi | \
  python3 -c "import sys,json; d=json.load(sys.stdin); print(d['downloads']['universal'])"
```

### Download the `.vsix`

```bash
curl -Lo meterian-heidi.vsix \
  "https://open-vsx.org/api/Meterian/meterian-heidi/latest/file/Meterian.meterian-heidi.vsix"
```

Or pin to a specific version (e.g. `1.20.3`):

```bash
curl -Lo meterian-heidi.vsix \
  "https://open-vsx.org/api/Meterian/meterian-heidi/1.20.3/file/Meterian.meterian-heidi-1.20.3.vsix"
```

---

## Step 2 — Extract the MCP server files

A `.vsix` file is a ZIP archive. Extract it and move the server files to a stable location:

```bash
unzip meterian-heidi.vsix -d meterian-heidi
mkdir -p ~/.meterian/mcp-server
cp -r meterian-heidi/extension ~/.meterian/mcp-server/
```

The MCP server entry point will be at:

```
~/.meterian/mcp-server/extension/src/mcp/server/entry.js
```

Verify it starts correctly:

```bash
node ~/.meterian/mcp-server/extension/src/mcp/server/entry.js
# Expected output: [MCP SERVER] booting...  [MCP SERVER] ready
```

Press `Ctrl+C` to stop it once confirmed.

---

## Step 3 — Configure your AI tool

### Roo Code

Roo Code is a VS Code extension with 1.4M+ installs. It supports MCP servers via a JSON config file and requires no CLI commands.

**Open the MCP settings:**

1. Click the **Roo Code icon** in the activity bar to open the Roo Code panel
2. Click the **settings icon** (gear) at the top of the panel
3. Scroll to the bottom and click **"Edit Global MCP"**

This opens the global config file `mcp_settings.json` for editing.

!!! tip "Project-level config"
    Click **"Edit Project MCP"** instead to scope the server to a single project. This creates `.roo/mcp.json` in your project root and takes precedence over the global config.

**Add the Meterian MCP server entry:**

```json
{
  "mcpServers": {
    "meterian-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/.meterian/mcp-server/extension/src/mcp/server/entry.js"]
    }
  }
}
```

!!! warning "Use the full absolute path"
    Replace `/absolute/path/to/` with your actual home directory path (e.g. `/home/yourname` on Linux, `/Users/yourname` on macOS). Many tools do not expand `~` in config files.

Save the file. Roo Code picks up the change automatically.

**Verify:**

Ask Roo Code:

> *"Are any of my project's dependencies currently vulnerable?"*

If the server is connected, Roo Code will call the `advisories_get` tool and return results.

---

## General pattern for other tools

Any tool that accepts a standard `mcpServers` JSON config block can be connected the same way:

```json
{
  "mcpServers": {
    "meterian-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/.meterian/mcp-server/extension/src/mcp/server/entry.js"]
    }
  }
}
```

Consult your tool's documentation for where its MCP config file lives.
