# Releases

## 1.20.5

A patch release fixing the `/meterian-security-audit` slash command name used by Claude Code and Codex.

### Bug Fixes

#### `/meterian-security-audit` skill command was not recognised
The skill file installed for Claude Code and Codex referenced an incorrect command name, preventing the `/meterian-security-audit` slash command from activating. This is now corrected.

---

## 1.20.4

Re-release of 1.20.3 to correct a packaging issue.

---

## 1.20.3

Adds MCP prompt support, the `meterian-security-audit` skill for Claude Code and Codex, additional language coverage in the MCP server, and a security fix for the bundled axios library.

### New Features

#### `/meterian-security-audit` skill for Claude Code and Codex
The extension now installs a `meterian-security-audit` skill file on activation. Claude Code and Codex users can invoke `/meterian-security-audit` directly to run a guided vulnerability audit on their project dependencies.

#### MCP prompts support
The Meterian MCP server now exposes `prompts/list` and `prompts/get` — the standard MCP prompts interface. AI assistants that support MCP prompts can discover and invoke the security audit workflow without any manual configuration.

#### Additional language support in the MCP server
The MCP tools now recognise C++, Dart, Clojure, and Swift library queries, in addition to the existing language set.

### Bug Fixes

#### Security vulnerability in bundled axios
Upgraded axios from an affected version to 1.15.0 to address a known security advisory.

---

## 1.20.2

Improves how suppressed vulnerabilities are surfaced in the report and fixes a crash when opening virtual files.

### Improvements

#### Summary link for hidden vulnerabilities
When vulnerabilities are hidden (snoozed or filtered by advice visibility), the report now shows a summary link so you can quickly navigate to the full list without losing context.

### Bug Fixes

#### Crash when opening virtual or unsaved files
The extension could throw an unhandled error when VS Code requested code actions for a virtual URI (e.g. an unsaved buffer). This is now guarded correctly.

---

## 1.20.1

Migrates snooze and advice-visibility state from the filesystem to VS Code's built-in workspace state storage, improving reliability across different environments.

### Improvements

#### Snooze and visibility data stored in VS Code workspace state
Snoozed issues and hidden-advice preferences are now persisted via the VS Code `workspaceState` API instead of files written to `~/.meterian/heidi/`. Existing data is migrated automatically on first launch.

### Bug Fixes

#### Crash in indentation logic for certain manifest formats
A null-dereference in the indentation helper could cause the extension to crash when processing some manifest files. This is now guarded.

---

## 1.20.0

A significant feature release adding `mcp-cli` registration, quick-fix support for `package-lock.json`, clearer transitive vulnerability grouping, HTTP timeouts across all API clients, and a range of stability fixes — especially for Gradle projects.

### New Features

#### MCP server registration via `mcp-cli`
The extension can now register and unregister the Meterian MCP server through the `mcp-cli` config file, in addition to the existing per-tool config file integrations. Use the *Register Meterian MCP Server* command from the Command Palette; a QuickPick lets you choose the target tool.
[(#141)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/141)

#### Quick-fix on `package-lock.json`
Transitive Node.js vulnerabilities flagged in `package-lock.json` can now be fixed directly from the editor. The fix runs `npm install --package-lock-only` under the hood, updating only the lockfile without downloading `node_modules`.
[(#142)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/142)

#### Transitive vulnerabilities grouped under their direct parent
In the diagnostics panel, transitive dependency vulnerabilities are now listed under their direct parent dependency, making it easier to understand the dependency chain and decide on a fix.

#### HTTP timeouts on all API calls
All requests to Meterian services (Kiwi, analytics, crash reporting, builds, accounts) now have explicit timeouts. The extension will no longer stall indefinitely if the backend is slow or unreachable.

### Bug Fixes

#### Gradle: crash on dependencies with unresolved version variables
Dependencies whose version was defined as a Gradle property (e.g. `$libs.versions.foo`) were not filtered out before processing, causing a crash. These entries are now skipped.
[(#163)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/163)

#### Gradle: negative column position crash
A column calculation could produce a negative value for some Gradle dependency declarations, crashing the diagnostics renderer. The value is now clamped to zero.
[(#162)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/162)

#### Gradle/general: non-string version values causing crashes
Version fields that were not plain strings (e.g. numbers or objects) could crash the version sanitiser and comparers. All paths now coerce the value to a string before processing.
[(#161)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/161) [(#174)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/174)

#### Java autofixer: crash when dependency had no child elements
The Java autofixer could throw when processing a `<dependency>` block that lacked the expected child nodes. This is now handled gracefully.
[(#157)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/157)

#### Safe-version lookup returning null on failure
When the Kiwi API could not find a safe version, it returned `null` instead of an empty result, causing downstream null-reference errors in the report and diagnostic messages. It now returns an empty object.

---

## 1.19.5

A stability-focused release addressing several crashes and edge cases reported after 1.19.1.

### Bug Fixes

#### Extension could crash when safe version data was unavailable
In some cases, looking up a safe version for a vulnerable package could fail silently and cause the report to crash. This is now handled gracefully.

#### Quick-fix for Cargo.lock pointed to the wrong file
When applying a fix for a Rust transitive dependency, the extension could target the wrong `Cargo.toml` in multi-project workspaces. This is now resolved correctly.

#### Extension failed to start cleanly in some environments
A missing internal folder could prevent the extension from initialising properly on first run or after a clean install. The extension now recovers from this automatically.

#### Hangs when the Meterian service was slow to respond
If the Meterian backend took too long to respond, the extension could stall indefinitely. Requests now time out and fail gracefully instead.

#### Intermittent failures on network drives
When a project was stored on a network filesystem, some operations could silently fail. These have been fixed.

## 1.19.2

A quick hotfix release as 1.19.1 sometimes does not boot on Windows machines. Will be followed to a proper release fixing the underlying issue still outstanding [(#18)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/18)


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
