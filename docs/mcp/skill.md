# Security Audit Skill

The Meterian MCP server ships a built-in **Security Audit Skill** — a pre-packaged prompt that gives your AI assistant a structured workflow for auditing dependencies and applying fixes.

## What it does

The skill defines three modes of operation that your AI assistant can follow:

| Mode | What it does |
|------|-------------|
| **Full audit** | Scans all dependency manifests in the workspace and reports every vulnerable library with severity and safe upgrade path |
| **Ad-hoc query** | Answers targeted questions like *"is axios@0.21.1 safe?"* or *"what's the safest version of log4j?"* |
| **Remediation** | Applies fixes automatically — patch-level upgrades without confirmation, minor/major upgrades with user approval |

## Skill installation

The skill is installed automatically alongside the MCP server:

- **Via VS Code extension:** Installed when you register the MCP server using the VS Code command
- **Via standalone installer:** Installed as part of `install-meterian-mcp.sh`

If the skill file is missing, the MCP tools (`advisories_get`, `advisories_getnextsafe`) still work — only the pre-packaged prompt workflow is unavailable.

---

## How to invoke the skill

=== "Claude Code"

    The skill is installed as a file at:

    ```
    ~/.claude/skills/meterian-security-audit/SKILL.md
    ```

    **Invoke it** by typing `/meterian` in the Claude Code prompt — `/meterian-security-audit` will appear as an autocomplete suggestion. Select it and press Enter.

    The skill also **auto-triggers** when you open or modify a dependency manifest (e.g. `package.json`, `requirements.txt`). Claude Code will automatically suggest running a security audit.

    **Example interactions:**

    - Type `/meterian-security-audit` → choose "Audit all dependencies" for a full workspace scan
    - Ask: *"Is lodash 4.17.15 safe for nodejs?"* → Claude calls `advisories_get` and reports CVEs inline
    - Ask: *"Fix all vulnerable dependencies"* → Claude applies patch-level fixes automatically, asks for confirmation on minor/major bumps

    ??? info "Verify the skill is available"

        Ask Claude Code directly:

        > *"Do you have the meterian-security-audit skill available?"*

        If installed, Claude will find and acknowledge the skill. If not, it will say it can't find it.

=== "Codex"

    The skill is installed as a file at:

    ```
    ~/.codex/skills/meterian-security-audit/SKILL.md
    ```

    !!! note
        Codex does not support custom slash commands for skills. The skill activates automatically when your prompt matches its description — no explicit invocation syntax is needed.

    **Invoke it** by asking naturally:

    - *"Audit all my dependencies for vulnerabilities"* → triggers a full workspace scan
    - *"Is lodash 4.17.15 safe for nodejs?"* → ad-hoc advisory lookup
    - *"Fix all vulnerable dependencies"* → patch-level fixes applied automatically, confirmation required for breaking changes

    Codex will activate the skill based on intent matching and call `advisories_get` / `advisories_getnextsafe` via the MCP server.

    ??? info "Verify the skill is available"

        Ask Codex directly:

        > *"Do you have the meterian-security-audit skill available?"*

        If installed, Codex will find and acknowledge the skill. If not, it will say it can't find it.

=== "Gemini CLI"

    The skill is delivered via the MCP `prompts` protocol — no file is installed locally.

    !!! note
        Gemini CLI does not support custom slash commands for MCP prompts in the `/` autocomplete list (known limitation as of v0.36). The easiest way to invoke the skill is with a natural language prompt.

    **Invoke it** by asking naturally:

    - *"Using the Meterian MCP server, audit all dependencies in this project for known vulnerabilities and suggest safe versions to upgrade to."* → triggers a full workspace scan
    - *"Is lodash 4.17.15 safe for nodejs?"* → ad-hoc advisory lookup
    - *"Fix all vulnerable dependencies"* → patch-level fixes applied automatically, confirmation required for breaking changes

    Gemini will call `advisories_get` / `advisories_getnextsafe` via the MCP server as needed.

    ??? info "Verify the server and prompt are available"

        Run `/mcp list` in Gemini CLI. Expected output includes:

        ```
        🟢 meterian-mcp - Ready (2 tools, 1 prompt)

        Prompts:
        - meterian-security-audit
        ```

    ??? info "Invoke via explicit slash command"

        Gemini appends the server name as a suffix to avoid collisions, so the full command is:

        ```
        /meterian-security-audit-meterian-mcp
        ```

        Note that typing the unqualified `/meterian-security-audit` is treated as plain text and does not invoke the prompt.
