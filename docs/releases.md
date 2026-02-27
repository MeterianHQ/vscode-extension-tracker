# Releases

## 1.19.1

### New Features

#### MCP Server
AI assistants (Claude Code, Cursor, Windsurf, VS Code + Copilot, Gemini CLI, Codex) can now query the Meterian vulnerability database directly.
Ask your AI assistant things like *"Is any of my libraries currently vulnerable?"* or *"Get me a safe version for axios"* — and it will use the Meterian MCP server to answer.
[(#6)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/6)

#### Subproject navigation in the report
When working on a project with multiple subprojects, vulnerabilities are now grouped by subproject path in the report. Click a subproject to drill down into its findings.
[(#14)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/14)

#### Quick-fix for Cargo lockfiles
Transitive dependencies in `Cargo.lock` can now be fixed directly from the IDE, using `cargo update -p <package> --precise <version>` under the hood.
[(#9)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/9)

#### Lockfile detection support
Vulnerabilities in transitive dependencies are now detected across all major lockfiles: `package-lock.json`, `composer.lock`, `Gemfile.lock`, `Pipfile.lock`, `poetry.lock`, `uv.lock`, `Cargo.lock`, `go.sum`.
[(#2)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/2)

#### Gradle manifest support
`build.gradle` and `build.gradle.kts` files are now supported for vulnerability detection.
[(#1)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/1)

### Improvements

#### Smarter, less intrusive notifications
The extension now alerts you only when new vulnerabilities are discovered, rather than on every IDE session start. Use the `Enabled` workspace setting to suppress notifications entirely if needed.
[(#13)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/13)

#### Vulnerability summary in the report
The report now opens with a summary table showing vulnerability counts by severity (Critical, High, Medium, Low) and the total number of affected packages.
[(#8)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/8)

#### CVE details in the report
Each finding in the report now includes the CVE identifier, a brief description, and a link to the full CVE entry — expandable inline, no context switching needed.
[(#3)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/3)

### Bug Fixes

#### Quick-fix incorrectly modifying unrelated packages in requirements.txt
When applying a quick-fix in a `requirements.txt` file, the fix was incorrectly updating packages whose name contained the target package name as a substring (e.g. fixing `onx` would also modify `onxruntime`). This has been fixed.
[(#7)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/7)
