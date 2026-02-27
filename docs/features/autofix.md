# Autofix & Remediation

Meterian Security can automatically apply safe version upgrades for vulnerable dependencies — directly from the editor, without touching the terminal.

## How it works

When a vulnerability is detected, Meterian looks up the earliest safe version of the affected package and offers it as a one-click fix. Applying the fix updates the manifest file in place and immediately triggers a re-scan to confirm the issue is resolved.

## How to apply a fix

Three ways to access the quick fix:

1. **Lightbulb in the editor** — hover over a highlighted dependency line and click the lightbulb (or press `Ctrl+.` / `Cmd+.`)
2. **Summary report** — click the fix link next to any finding in the Components tab
3. **Command Palette** — run `Open quickfix panel` (`Ctrl+Shift+P`)

## Supported languages

| Language | Manifest | Autofix |
|----------|----------|---------|
| **NodeJS** | `package.json` | ✅ |
| **Python** | `requirements.txt` | ✅ |
| **Python** | `Pipfile` | ✅ |
| **Python** | `pyproject.toml` | ✅ |
| **Java** | `pom.xml` | ✅ |
| **PHP** | `composer.json` | ✅ |
| **Rust** | `Cargo.toml` | ✅ |
| **Rust** | `Cargo.lock` | ✅ (uses `cargo update --precise`) |

!!! tip "Lockfile support for Rust"
    For transitive dependencies in `Cargo.lock`, Meterian uses `cargo update -p <package> --precise <version>` to pin the exact version without modifying `Cargo.toml`.

## What happens after a fix

1. The manifest file is updated with the safe version
2. A re-scan is triggered automatically
3. If the issue is resolved, it disappears from the Problems panel and the report
4. If other vulnerabilities remain, they are shown in the updated results

## Free vs Premium

Autofix is available in both modes, but the set of supported languages and the quality of version suggestions is broader in **Premium mode**. See the [Features overview](index.md#free-vs-premium) for a comparison.
