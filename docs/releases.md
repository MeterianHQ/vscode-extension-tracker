# Releases

## 1.20.10

A patch release with three resilience fixes for non-standard environments and edge cases.

### Bug Fixes

#### MCP auto-start crash on older VS Code forks
Editors that predate VS Code 1.99 (e.g. Trae CN) do not expose `workbench.mcp.startServer`, and the auto-start introduced in 1.20.7 was raising an unhandled "command not found" error. Auto-start now checks command availability first and skips silently when unsupported.

#### False-positive crash reports when AI CLIs are not installed
When the `claude`, `gemini`, or `codex` CLI was not on the `PATH`, the MCP-registration check rejected with a raw stderr string and the extension reported it as a crash. A missing CLI is now treated as the expected condition it is.

#### Autofix refresh crashed when no editor was focused
Triggering an autofix while the focus was on the Source Control view or a webview could throw a `TypeError` from the WSL-on-Windows refresh helper. The helper now no-ops when there is no active editor.

---

## 1.20.9

A consolidation release adding a new advisory filter, hardening the configuration and analysis code paths against malformed data, and forward-porting a number of stability fixes from the 1.19.x line.

### New Features

#### Filter out unmaintained-library advisories
A new `meterian.filters.ignoreUnmaintained` setting suppresses advisories whose source is the unmaintained-library catalogue, alongside the existing severity, CVSS, EPSS, and CVE-only filters. The report shows a dedicated summary line for the bucket so you can see how many advisories were hidden.

### Bug Fixes

#### Analysis errors no longer reported as crashes
Recoverable `MeterianError` exceptions raised during analysis were being sent to the crash-reporting backend, drowning real crashes in noise. Only errors raised from the UI-feedback path are now reported.

#### Resilience against unreadable or corrupt configuration files
A damaged `~/.meterian/heidi/config.json` (truncated, non-JSON, or unreadable) could prevent the extension from starting. The config layer now recovers from this and falls back to defaults, and `HeidiConfigMeterian.update` guards against null/undefined input.

#### Crash on null version values
A null guard was missing in `sanitizeVersion`, which could crash when a manifest reported a `null` version. This is now handled.

#### Cancelled filesystem reads bubbling up as errors
A `Canceled` `FileSystemError` thrown during a directory read (e.g. when a folder was closed mid-scan) is now swallowed cleanly.

#### npm transitive parent lookup using `node_modules`
When locating the parent of a vulnerable transitive package, `npm ls` was running without `--package-lock-only`, which could fail or be slow on projects without `node_modules` installed. The lookup now runs lockfile-only.

---

## 1.20.8

A single-fix patch release.

### Bug Fixes

#### Java autofixer crash on circular dependency URI references
Java dependency objects can carry a `versionLocation.uri` that points back into the workspace-file wrapper, creating a reference cycle. The autofixer's debug log was eagerly serialising this with `JSON.stringify` and throwing, aborting the fix. Serialisation is now gated on the debug log level and uses a cycle-safe replacer.

---

## 1.20.7

Adds a project-level exclusions file, auto-starts the bundled MCP server inside VS Code, and improves crash-report attribution and a security upgrade for the bundled axios library.

### New Features

#### `.meterian` exclusions file
You can now check a `.meterian` file into your repository to declare security, stability, and licensing exclusions (e.g. advices marked as *unapplicable* with a justification). Exclusions travel with the project and apply consistently across machines and CI.

#### VS Code MCP server auto-starts on activation
The Meterian MCP server is now registered with VS Code's Language Model API and started a couple of seconds after the extension activates, so it shows up as running immediately instead of waiting for the first chat invocation.

### Improvements

#### Crash reports now identify the host editor
Crash reports include an `ide` field derived from `vscode.env.appName` (normalised to a lowercase, underscore-joined value), making it easier to distinguish issues that only occur in Cursor, Windsurf, or other VS Code forks.

#### Axios upgraded to 1.16.0
The bundled `axios` HTTP client was upgraded to 1.16.0 to pick up upstream security fixes.

### Bug Fixes

#### Java parser used the wrong URI for some lookups
The Java manifest parser was occasionally resolving against the wrong file URI when handling both primary and fallback lookups. It now consistently uses the requested file's URI.

#### Component collection in crash reports
An issue that could leave the component list in a crash report incomplete has been fixed.

---

## 1.20.6

A small follow-up release.

### Improvements

#### Post-review prompt after AI skill activation
After installing the `meterian-security-audit` skill for Claude Code or Codex, the extension now offers a post-review step so you can immediately run the audit on the active workspace without going back to the command palette.

---

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
