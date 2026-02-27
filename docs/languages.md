# Supported Languages

Meterian Security supports a wide range of languages and package managers. The table below shows which manifest files are supported in Free and Premium modes, and which support automatic remediation.

| **Language** | **Manifest**       | **Free Support** | **Free Remediation** | **Premium Support** | **Premium Remediation** |
|--------------|--------------------|------------------|----------------------|---------------------|--------------------------|
| **Dotnet**   | *.csproj           | ✅               |                      | ✅                  |                          |
| **NodeJS**   | package.json       | ✅               | ✅                   | ✅                  | ✅                       |
|              | package-lock.json  | ✅               |                      | ✅                  |                          |
| **Java**     | pom.xml            | ✅               | ✅                   | ✅                  | ✅                       |
|              | build.gradle       | ✅               |                      | ✅                  |                          |
|              | build.gradle.kts   | ✅               |                      | ✅                  |                          |
| **PHP**      | composer.json      | ✅               | ✅                   | ✅                  | ✅                       |
|              | composer.lock      | ✅               |                      | ✅                  |                          |
| **Ruby**     | Gemfile            | ✅               |                      | ✅                  |                          |
|              | Gemfile.lock       | ✅               |                      | ✅                  |                          |
| **Python**   | requirements.txt   | ✅               | ✅                   | ✅                  | ✅                       |
|              | Pipfile            | ✅               | ✅                   | ✅                  | ✅                       |
|              | Pipfile.lock       |                  |                      | ✅                  |                          |
|              | pyproject.toml     | ✅               | ✅                   | ✅                  | ✅                       |
|              | poetry.lock        |                  |                      | ✅                  |                          |
|              | uv.lock            | ✅               |                      | ✅                  |                          |
| **Rust**     | Cargo.toml         | ✅               | ✅                   | ✅                  | ✅                       |
|              | Cargo.lock         | ✅               |                      | ✅                  | ✅                       |
| **Golang**   | go.mod             | ✅               |                      | ✅                  |                          |
|              | go.sum             | ✅               |                      | ✅                  |                          |

## Beyond the supported languages

Even if your language or package manager is not in the table above, you can still query the Meterian vulnerability database through the [MCP server](features/mcp-server.md) by asking your AI assistant directly.

For example, if you are working on a Swift project using the Swift Package Manager, you can ask your AI assistant to fix a vulnerable dependency autonomously:

> *"Check if the ArgumentParser package in my Package.swift is vulnerable, get the next safe version using the Meterian MCP server, and update the file with the safe version."*

Your AI assistant will query the Meterian vulnerability database, identify the safe version, and apply the fix directly — no IDE-level manifest support required.

!!! tip "Missing your language?"
    Open a [feature request](https://github.com/MeterianHQ/vscode-extension-tracker/issues/new?template=feature_request.yml&labels=feature,needs-triage&title=%5BFEAT%5D%20) and rally the votes!
