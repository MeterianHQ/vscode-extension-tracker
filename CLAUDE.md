# CLAUDE.md

## Project Overview

This is the **public issue tracker and documentation website** for the [Meterian Security VS Code Extension](https://marketplace.visualstudio.com/items?itemName=Meterian.meterian-scanner). The extension source code is proprietary and not in this repo. This repo contains:

- MkDocs-based documentation published to GitHub Pages
- GitHub issue templates for bug reports, feature requests, and questions
- A standalone MCP server installer script (`scripts/install-meterian-mcp.sh`)
- Automated badge refresh CI for VS Marketplace stats

**Live website:** https://meterianhq.github.io/vscode-extension-tracker/

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Documentation | MkDocs + Material for MkDocs theme |
| Hosting | GitHub Pages (`gh-pages` branch, auto-deployed) |
| CI/CD | GitHub Actions |
| MCP installer | Bash + Node.js (for JSON parsing) |
| Badge data | shields.io JSON format, VS Marketplace API |

---

## Common Tasks

### Local documentation development

```bash
pip install mkdocs-material
mkdocs serve         # live preview at http://127.0.0.1:8000
```

### Deploy docs manually

```bash
mkdocs gh-deploy --force
```

Normally this is done automatically by `.github/workflows/deploy-docs.yml` on every push to `main`.

### Run the MCP server installer

```bash
./scripts/install-meterian-mcp.sh                     # install from OpenVSX
./scripts/install-meterian-mcp.sh --uninstall         # remove
./scripts/install-meterian-mcp.sh --file <path.vsix>  # install from local .vsix
```

---

## Repository Structure

```
docs/               # MkDocs source — edit these for website changes
  index.md          # Landing page
  features/         # Feature guides (autofix, snoozing, MCP server)
  languages.md      # Supported languages matrix
  commands.md       # VS Code command reference
  configuration.md  # Extension settings
  releases.md       # Release notes
  roadmap.md        # Future plans
  faq.md            # FAQ
  assets/           # Images and logos

scripts/
  install-meterian-mcp.sh   # Standalone MCP server installer

badges/             # Generated JSON badge files (do not edit manually)

.github/
  workflows/
    deploy-docs.yml           # Auto-deploy on push to main
    update-vscode-badges.yml  # Daily badge refresh (06:00 UTC)
  ISSUE_TEMPLATE/             # Bug, feature, question templates

mkdocs.yml          # MkDocs configuration (nav, theme, plugins)
```

---

## CI/CD

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `deploy-docs.yml` | Push to `main` | Build and deploy MkDocs site to GitHub Pages |
| `update-vscode-badges.yml` | Daily 06:00 UTC + manual | Fetch VS Marketplace stats, commit updated badge JSON |

The `gh-pages` branch is auto-managed by mkdocs — never edit it directly.

---

## Key Constraints

- **No extension source code here.** Only docs, issue tracking, and installer scripts.
- **`badges/` files are auto-generated.** Do not edit them manually; they are overwritten by CI.
- **Deployment is fully automated.** A push to `main` triggers a docs rebuild and deploy.
- **MkDocs navigation** is defined in `mkdocs.yml` under the `nav:` key — update it when adding new pages.
