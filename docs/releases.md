# Releases

## 1.21.9

A security release for the results page.

### Security

#### Safer results page
The results page now escapes file paths, names, and advisory data. The page runs only its own script, it does not load remote images, and it opens only files inside the workspace. If the page refuses a link, a warning tells you why. We recommend that all users update to this version.

Thanks to [kta1kri](https://github.com/kta1kri) for reporting this issue responsibly.

---

## 1.21.8

Adds account tools to the MCP server and makes the Python and TOML quick fixes safer.

### New Features

#### Account tools in the MCP server
When the `METERIAN_API_TOKEN` environment variable is set, the MCP server has five more tools: `account_whoami`, `projects_list`, `project_report`, `project_history`, and `project_sbom`. Your AI assistant can then read the projects, the reports, the score history, and the SBOM of your Meterian account. Without a token, the server has only the two free tools, as before.

### Improvements

#### Compact advisories from `advisories_get`
The MCP tool `advisories_get` returns a compact form of each advisory, so the answer uses less of the context of your AI assistant.

### Bug Fixes

#### Python quick fixes check the Python version of the project
Before a Python quick fix changes a dependency, it checks that the new version supports the Python versions of your project. If it does not, the fix uses the most recent safe version that is compatible, or it tells you that no compatible version exists.

#### uv quick fix matches normalised names
The uv quick fix finds a dependency when its name is written in a different form, for example with `_` instead of `-`. It stops when no requirement matches.

#### TOML quick fixes keep inline comments
A quick fix in a TOML manifest, such as `pyproject.toml` or `Cargo.toml`, keeps each inline comment on its line.

#### MCP fixes
A failed MCP tool call now gets an answer with its own request id, so the client no longer waits for it. A timer of the MCP auto-start no longer runs after the extension decides not to start.

### Security

#### Updated `follow-redirects`
A bundled library was updated to fix a vulnerability.

---

## 1.21.7

### Bug Fixes

#### Crash reports use the canonical user ID
The crash reports now use the same user ID as the rest of the extension.

---

## 1.21.4

### Bug Fixes

#### Airgapped mode in all the Kiwi API clients
All the parts of the extension that read the Kiwi API now honour the airgapped setting.

#### Advisory links in Premium mode
In Premium mode, the advisory links of the summary point to the correct services URL.

#### Configuration errors in the log
When the extension cannot read its configuration file, it logs an error.

---

## 1.21.3

A large release with airgapped and on-premises support, a status page, and high availability for the vulnerability database.

### New Features

#### Airgapped and on-premises mode
The configuration has a new `airgapped` field. In airgapped mode, the extension sends no analytics and no crash reports, does not read the API token, does not permit Premium mode, and shows no Componentpedia links. A notification at startup and a notice in the status bar tell you that the mode is on.

#### Status page
The new command *Meterian: Show Status* opens a page with the current mode, the state of the vulnerability database, and the telemetry state.

#### High availability for the vulnerability database
The extension finds the available Kiwi servers and sends its requests to them in turn. If a server fails, the request goes to the next one.

#### Rust: crates at more than one version
The Rust quick fix can update a crate that `Cargo.lock` contains at more than one version.

### Improvements

#### Transitive vulnerabilities
Free mode and Premium mode now show transitive vulnerabilities in the same way. For a transitive dependency from a lock file, the hover shows its dependency path.

#### One user ID
The extension and the MCP server use one canonical user ID, and each request has a `User-Agent` header for its client.

### Bug Fixes

#### MCP server stays up after VS Code closes
The MCP server now stops when its client disconnects. Before, it could stay up and use CPU after VS Code closed.
[(#25)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/25)

#### Crashes on Windows
The "override library" quick fix and the start of some commands no longer crash on Windows.

#### macOS AppleDouble files
A workspace that contains files such as `._Cargo.toml` no longer crashes the extension.

#### Other fixes
- The Problems view shows the version from the lock file, not the range from the manifest.
- In Free mode, the advisory links use the Kiwi URL.
- The summary loads the Meterian logo from the extension, not from the network.
- The extension writes `config.json` in one step, so the file cannot become corrupt.
- A canceled MCP auto-start is not reported as a crash.

### Security

#### Updated `axios`
The bundled `axios` library was updated to fix vulnerabilities.

---

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

#### Quick-fix on `package-lock.json`
Transitive Node.js vulnerabilities flagged in `package-lock.json` can now be fixed directly from the editor. The fix runs `npm install --package-lock-only` under the hood, updating only the lockfile without downloading `node_modules`.
[(#16)](https://github.com/MeterianHQ/vscode-extension-tracker/issues/16)

#### Transitive vulnerabilities grouped under their direct parent
In the diagnostics panel, transitive dependency vulnerabilities are now listed under their direct parent dependency, making it easier to understand the dependency chain and decide on a fix.

#### HTTP timeouts on all API calls
All requests to Meterian services (Kiwi, analytics, crash reporting, builds, accounts) now have explicit timeouts. The extension will no longer stall indefinitely if the backend is slow or unreachable.

### Bug Fixes

#### Gradle: crash on dependencies with unresolved version variables
Dependencies whose version was defined as a Gradle property (e.g. `$libs.versions.foo`) were not filtered out before processing, causing a crash. These entries are now skipped.

#### Gradle: negative column position crash
A column calculation could produce a negative value for some Gradle dependency declarations, crashing the diagnostics renderer. The value is now clamped to zero.

#### Gradle/general: non-string version values causing crashes
Version fields that were not plain strings (e.g. numbers or objects) could crash the version sanitiser and comparers. All paths now coerce the value to a string before processing.

#### Java autofixer: crash when dependency had no child elements
The Java autofixer could throw when processing a `<dependency>` block that lacked the expected child nodes. This is now handled gracefully.

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

---

## Earlier releases

These notes come from the history of the extension. They are shorter than the notes above, and they can be incomplete. Pre-releases are not listed: each release includes the changes of its pre-releases.

### 1.13.7

*Released 2025-10-31*

**Improvements**

- A new parser for `pom.xml`.

**Bug Fixes**

- The autofix keeps the format of a manifest that uses tabs.

### 1.13.4

*Released 2025-10-30*

A new build of 1.13.3, with no source change.

### 1.13.3

*Released 2025-10-29*

Includes the pre-releases 1.12.40, 1.12.42, 1.12.43.

**New Features**

- The setting `automaticallyShowProblems`.

**Improvements**

- Better error logs, and crash reports for all the critical parts of the extension.
- The summary shows a "work in progress" message during an analysis.
- The analysis does not start in an empty workspace.
- The npm fixer runs `npm install --ignore-scripts`.
- Fewer notifications: no Problems notification appears after an autofix ([#10](https://github.com/MeterianHQ/vscode-extension-tracker/issues/10)).
- The "Open problems" button of the notification opens the Problems view.

**Bug Fixes**

- The extension checks the version in the manifest before the resolved version.
- Problems in the autofix and in the TOML parser.

### 1.12.38

*Released 2025-10-14*

Includes the pre-releases 1.12.25.

**New Features**

- An overview at the start of the summary, with the vulnerability count for each severity ([#8](https://github.com/MeterianHQ/vscode-extension-tracker/issues/8)).
- Quick fix and summary links in the hover.
- The summary is empty when the project is clean.

**Improvements**

- An autofix stops the analysis, and the analysis starts again after the fix.
- For Maven, the extension uses only dependencies without a scope or with the `compile` or `runtime` scope.
- The extension reports vulnerabilities in lock files again ([#2](https://github.com/MeterianHQ/vscode-extension-tracker/issues/2)).

**Bug Fixes**

- The `Cargo.toml` fixer.
- The format and the indentation of a manifest after an autofix.
- The quick fix link in the hover.
- The direct and transitive labels in the summary.

**Removed**

- Autofix for `Cargo.lock`.

### 1.12.23

*Released 2025-10-06*

Includes the pre-releases 1.12.22.

**Bug Fixes**

- A project without issues no longer fails because of its lock files.
- The safe versions in the summary have no extra space.

### 1.12.21

*Released 2025-10-03*

Includes the pre-releases 1.12.14, 1.12.17, 1.12.19, 1.12.20.

**Improvements**

- The summary shows the CVE identifier and a short description of each advisory ([#3](https://github.com/MeterianHQ/vscode-extension-tracker/issues/3)).
- The extension shows an "Unauthorized" message.
- The Free mode message is at the information level.

**Bug Fixes**

- The summary closes when a new analysis starts, and it shows the new results.
- Duplicate messages in the Problems view.
- Pre-release versions no longer use the QA servers.
- The extension shows the correct message for errors during the analysis.
- The configuration update.

### 1.12.13

*Released 2025-09-30*

Includes the pre-releases 1.12.3, 1.12.6, 1.12.7, 1.12.8, 1.12.9, 1.12.10, 1.12.11, 1.12.12.

**New Features**

- A new Gradle parser, which supports `build.gradle` and `build.gradle.kts` ([#1](https://github.com/MeterianHQ/vscode-extension-tracker/issues/1), [#5](https://github.com/MeterianHQ/vscode-extension-tracker/issues/5)).

**Improvements**

- A new implementation of the autofix.
- The extension excludes the `target` and `.venv*` folders.
- The diagnostic level follows the severity.
- A smaller logo in the hover.
- A longer diagnostic message in Cursor.
- The extension excludes more folders.
- The diagnostics for lock files are temporarily off.

**Bug Fixes**

- The list of excluded folders.
- The autofix when the lock file must change.
- The `requirements.txt` autofix no longer changes a library whose name contains the name of the fixed library ([#7](https://github.com/MeterianHQ/vscode-extension-tracker/issues/7)).

### 1.12.1

*Released 2025-09-23*

Includes the pre-releases 1.11.0, 1.12.0.

**New Features**

- A license and an EULA.

**Improvements**

- The Kiwi API requests use the `heidi/2` authentication.
- The Kiwi API cache holds 10,000 entries, for large Node.js projects.

**Bug Fixes**

- The extension uses the home folder instead of `/tmp`, for all platforms.

### 1.10.40

*Released 2025-09-19*

Includes the pre-releases 1.10.39.

**Improvements**

- The extension no longer watches the Meterian configuration file.

### 1.10.37

*Released 2025-09-18*

Includes the pre-releases 1.10.32, 1.10.35, 1.10.36.

**Improvements**

- A new collection of issues, which checks if the version in the report is in the range of the manifest.
- The summary opens on request at the end of the analysis.
- The configuration can turn on the performance tracker.

**Bug Fixes**

- The countdown no longer appears when the extension is disabled.
- The collection of transitive issues.

**Removed**

- The "Open manifests" button.

### 1.10.31

*Released 2025-09-15*

Includes 49 pre-releases, from 1.5.14 to 1.10.30.

**New Features**

- Support for UNC paths, with a page refresh where the file watcher does not work.
- uv support: a parser for `uv.lock` and autofix for `pyproject.toml`.
- The status bar shows the current mode.
- A warning when a lock file is outdated.
- A command to verify the token.
- The tooltip shows the safe versions.
- The extension reads the exact versions from the lock file, when one exists.
- A cache for the Kiwi API.

**Improvements**

- The extension stops the analytics when the server returns 404.
- The logs rotate daily.
- The extension resets the diagnostics when a file changes.
- An improved analysis countdown.
- The Problems view opens automatically at the end of the analysis.
- When the token is unknown or not authorised, the extension changes to Free mode, if Free mode is enabled.
- The extension verifies the API token when the user sets it.
- The hovers appear on a manifest without a first click.
- The commands are available only after a successful activation.
- A new build sends its languages to the server.
- User messages use the product name.
- The PHP autofix tries Composer first, then a text change.
- The file watcher also watches subfolders.
- The analytics use an MD5 hash of the user name, not the user name.
- Free mode skips components without a version.

**Bug Fixes**

- The `requirements.txt` fix of a library name with a different case.
- The Java parser for versions in a parent POM.
- Path mismatches between URIs and paths.
- The diagnostics on Windows.
- The autofix reads and writes files by URI.
- The Poetry fixer.
- The detection of file changes.
- A text fix succeeds when the extension cannot update the lock file.
- The fixers run their commands in the folder of the manifest.
- The command "Analyze with Meterian".
- The label of the status bar.
- The error dialog appears.
- The activation no longer fails for files that are not manifests, such as `LICENSE`.
- Snooze and unsnooze, also on Windows.
- A message appears when a snoozed manifest has vulnerabilities.
- Unsnooze with more than one manifest.
- The file watcher and the analysis no longer conflict.
- Transitive vulnerabilities appear when the parent dependency is not in the report.
- The `requirements.txt` parser no longer ignores lines without a version.
- The API token stays set when the user closes the input box.
- `lib.rs` marks a Rust project.
- The `.gitignore` check reads each line and skips comments.
- A missing space after the version in the diagnostic message.
- A failure in the collection of transitive dependencies.
- The authentication for the Kiwi API.
- The status bar disappears correctly, and it no longer blinks.
- A quick fix is available for a snoozed manifest.
- The detection of .NET manifests and projects.
- The status bar no longer disappears during an analysis.
- The extension does not upload empty files.
- Free mode reports vulnerabilities correctly.
- The PHP and Ruby parsers, and the versions with a `v` in `composer.lock`.
- The activation without an open workspace.
- The mode in the status bar.
- The token set command.

**Removed**

- The suggestion to replace a library when no update is available.

### 1.5.13

*Released 2025-04-08*

Includes the pre-releases 1.5.9, 1.5.10, 1.5.12.

**Bug Fixes**

- Compatibility with Windows.
- The configuration at the first installation.
- The Poetry fixer updates `tool.poetry.dependencies`.

### 1.5.8

*Released 2025-04-04*

**Bug Fixes**

- The extension normalises paths on Windows.

### 1.5.7

*Released 2025-04-04*

Includes the pre-releases 1.5.6.

**Improvements**

- A new implementation of the autofix and the snooze.
- Better handling of the internal configuration file.

**Bug Fixes**

- The location of the log files on all platforms.

### 1.5.4

*Released 2025-03-12*

Includes the pre-releases 1.5.3.

**New Features**

- Analytics, with the editor and the extension version.

**Bug Fixes**

- The detection of components with a different case.
- The `requirements.txt` parser.

### 1.4.5

*Released 2025-01-06*

**Bug Fixes**

- The severity threshold filter.

### 1.4.4

*Released 2024-11-28*

A new build of 1.4.3, with no source change.

### 1.4.3

*Released 2024-11-25*

**Bug Fixes**

- The snooze of a whole manifest appears only one time for each component.

### 1.4.2

*Released 2024-11-25*

Includes the pre-releases 1.4.0, 1.4.1.

**New Features**

- Heidi Free, which uses the Kiwi API.
- Snooze and unsnooze.
- A message when the collection of the project information takes a long time, with an option to stop it.

**Improvements**

- A configuration flag controls Heidi Free.

### 1.3.13

*Released 2024-09-25*

Includes the pre-releases 1.3.9, 1.3.10, 1.3.11, 1.3.12.

**New Features**

- A command to remove the stored Meterian token.

**Bug Fixes**

- The hover of a lock file appeared only on the first line.
- Duplicate messages in the hover.

### 1.3.8

*Released 2024-09-11*

Includes the pre-releases 1.3.7.

**Bug Fixes**

- The activation without a workspace, such as after a new installation of VS Code.

### 1.3.6

*Released 2024-09-11*

**Bug Fixes**

- The storage of the global configuration.

### 1.3.5

*Released 2024-09-05*

Internal changes only.

### 1.3.4

*Released 2024-09-05*

Internal changes only.

### 1.3.3

*Released 2024-09-05*

**New Features**

- Meterian can be off for all workspaces and on for specific workspaces.

### 1.3.2

*Released 2024-08-29*

Includes the pre-releases 1.3.1.

**New Features**

- Meterian can be on or off for each workspace.

**Bug Fixes**

- The activation in a workspace.

### 1.3.0

*Released 2024-08-05*

**New Features**

- Poetry autofix for `pyproject.toml`.

### 1.2.9

*Released 2024-05-14*

Internal changes only.

### 1.2.8

*Released 2024-03-01*

**Improvements**

- The Pipfile autofix uses pipenv first. If pipenv fails, the extension changes the Pipfile and shows a warning that the lock file did not change.

### 1.2.7

*Released 2024-02-20*

Internal changes only.

### 1.2.6

*Released 2024-02-15*

**Bug Fixes**

- The extension no longer fails in dev containers when it finds no configuration.

### 1.2.5

*Released 2024-02-13*

Includes the pre-releases 1.2.0, 1.2.1, 1.2.2, 1.2.3.

**New Features**

- Basic support for Poetry.
- Pre-release versions.

**Improvements**

- A higher minimum VS Code version.

**Bug Fixes**

- The file watcher.
- The Node.js parsers.
- An invalid `package.json` no longer stops the analysis.
- The status bar shows when Meterian does not support the project.

### 1.1.3

*Released 2024-01-02*

**Bug Fixes**

- The success message no longer appears when the scan finds issues.

### 1.1.2

*Released 2024-01-02*

**Bug Fixes**

- The success message no longer appears when the scan finds issues.

### 1.1.1

*Released 2024-01-02*

**Bug Fixes**

- The diagnostics when an open file is not a manifest.

### 1.1.0

*Released 2023-12-21*

A new build, with no source change.

### 1.0.12

*Released 2024-01-02*

**Bug Fixes**

- The diagnostics when an open file is not a manifest.
- The Node.js manifest parser.

### 1.0.11

*Released 2023-12-05*

**Improvements**

- The product name changes from Meterian to Meterian HEIDI.

### 1.0.10

*Released 2023-12-05*

**Bug Fixes**

- Duplicate diagnostics between scans.

**Security**

- Updated `jsdom` to fix vulnerabilities.

### 1.0.9

*Released 2023-12-01*

**Bug Fixes**

- The authentication header of the accounts API.

### 1.0.8

*Released 2023-12-01*

**Bug Fixes**

- The accounts API uses the configured dashboard URL.

### 1.0.7

*Released 2023-12-01*

**Bug Fixes**

- The scan starts only when a relevant file changes.

### 1.0.5

*Released 2023-11-21*

**New Features**

- Support for nested projects.
- Support for npm `overrides`.

**Bug Fixes**

- The extension uploads only authorised files.
- The extension creates its configuration file at the first start.
- The `requirements.txt` autofix.

### 1.0.0 to 1.0.4

*Released 2022-10-14 to 2023-11-13*

The repository has no tags for these versions, so their changes are not known in detail.
The first versions had manifest parsers for several languages, an autofix, the Problems view, and a file watcher.

### 0.0.1 and 0.0.2

*Released 2022-09-12*

The first versions on the VS Code Marketplace. The repository has no tags for them.
