# Meterian Security — VS Code Extension

<table>
  <tr>
    <th align="center">
      <a href="https://marketplace.visualstudio.com/items?itemName=meterian.meterian-heidi">
        <img
          alt="Visual Studio Code Marketplace logo"
          src="https://code.visualstudio.com/assets/branding/code-stable.png"
          style="height:48px;width:auto;"
        />
      </a><br/>
      Available on the
      <a href="https://marketplace.visualstudio.com/items?itemName=meterian.meterian-heidi">Visual Studio Code Marketplace</a><br/>
      <sub>for Visual Studio Code</sub>
    </th>
    <th align="center">
      <a href="https://open-vsx.org/extension/Meterian/meterian-heidi">
        <img
          alt="OpenVSX Registry logo"
          src="https://outreach.eclipse.foundation/hs-fs/hubfs/OpenVSX-logo.png?height=117&amp;name=OpenVSX-logo.png&amp;width=369"
          style="height:48px;width:auto;"
        />
      </a><br/>
      Available on the
      <a href="https://open-vsx.org/extension/Meterian/meterian-heidi">OpenVSX registry</a><br/>
      <sub>for Cursor, VSCodium, Windsurf, Theia &amp; friends</sub>
    </th>
  </tr>
  <tr>
    <td align="center">
      <a href="https://marketplace.visualstudio.com/items?itemName=meterian.meterian-heidi">
        <img
          alt="Visual Studio Marketplace Installs"
          src="https://img.shields.io/endpoint?url=https://cdn.jsdelivr.net/gh/MeterianHQ/vscode-extension-tracker@main/badges/vscode-installs.json&logo=visual-studio-code&cacheSeconds=3600"
        />
      </a>
      <a href="https://marketplace.visualstudio.com/items?itemName=meterian.meterian-heidi">
        <img
          alt="Version"
          src="https://img.shields.io/endpoint?url=https://cdn.jsdelivr.net/gh/MeterianHQ/vscode-extension-tracker@main/badges/vscode-version.json&logo=visual-studio-code&cacheSeconds=3600"
        />
      </a>
      <a href="https://marketplace.visualstudio.com/items?itemName=meterian.meterian-heidi">
        <img
          alt="Rating"
          src="https://img.shields.io/endpoint?url=https://cdn.jsdelivr.net/gh/MeterianHQ/vscode-extension-tracker@main/badges/vscode-rating.json&logo=visual-studio-code&cacheSeconds=3600"
        />
      </a>
    </td>
    <td align="center">
      <a href="https://open-vsx.org/extension/Meterian/meterian-heidi">
        <img alt="Open VSX Downloads" src="https://img.shields.io/open-vsx/dt/Meterian/meterian-heidi?cacheSeconds=86400" />
      </a>
      <a href="https://open-vsx.org/extension/Meterian/meterian-heidi">
        <img alt="OpenVSX Version" src="https://img.shields.io/open-vsx/v/Meterian/meterian-heidi?logo=open-vsx&label=version&cacheSeconds=86400" />
      </a>
      <a href="https://open-vsx.org/extension/Meterian/meterian-heidi">
        <img alt="OpenVSX Rating" src="https://img.shields.io/open-vsx/stars/Meterian/meterian-heidi?logo=open-vsx&label=rating&cacheSeconds=43200" />
      </a>
    </td>
  </tr>
</table>


Meterian Security is a **completely free** extension that detects open-source vulnerabilities in your project dependencies and helps you fix them — without leaving your IDE.

It supports [10+ languages and package managers](languages.md), works with VS Code, Cursor, Windsurf, VSCodium, and Theia, and integrates with AI assistants via a built-in [MCP server](features/mcp-server.md) — so you can ask your AI *"is any of my libraries vulnerable?"* and get an instant answer backed by the Meterian vulnerability database.


## Install & Quickstart

1. **Install** from your chosen marketplace (once!)
2. Open a project
3. An analysis starts automatically
4. See the **report**, drill down into the details
5. Use **autofix** to automatically resolve the issues!


## Works with your AI assistant

The extension ships a built-in [MCP server](features/mcp-server.md) that connects the Meterian vulnerability database to your AI assistant. Once registered, you can ask:

> *"Is any of my libraries currently vulnerable?"*
> *"What's a safe version for the axios library?"*

Supported: **Claude Code**, **Cursor**, **Windsurf**, **VS Code + Copilot**, **Gemini CLI**, **Codex**.


## Report an issue or request a feature

Found a bug, have a feature request, or a question? The [GitHub issue tracker](https://github.com/MeterianHQ/vscode-extension-tracker/issues) is the right place. Use one of the links below to open a pre-filled form:

- **Report a bug** → [Open form](https://github.com/MeterianHQ/vscode-extension-tracker/issues/new?template=bug_report.yml&labels=bug,needs-triage&title=%5BBUG%5D%20)
- **Request a feature** → [Open form](https://github.com/MeterianHQ/vscode-extension-tracker/issues/new?template=feature_request.yml&labels=feature,needs-triage&title=%5BFEAT%5D%20)
- **Ask a question** → [Open form](https://github.com/MeterianHQ/vscode-extension-tracker/issues/new?template=question.yml&labels=question,needs-triage&title=%5BQUESTION%5D%20)

> ⚠️ **Security disclosures**
> Please **do not** file security vulnerabilities here. Email **security@meterian.io** with details and a way to reproduce. We'll acknowledge within 2 business days.


## Where to get help

- **Discord (community support):** [![Discord](https://img.shields.io/badge/Discord-join-blue?logo=discord&logoColor=white)](https://discord.gg/gHP9eaZdkp)
- **FAQ:** See our [FAQ](faq.md)


## What data is transferred by the plugin?

The system is powered by the [Meterian Kiwi](https://www.meterian.io/product/kiwi/) vulnerability database. The APIs are called passing an opaque identifier as an authorization header; the data transferred is the name, version and language of a library. Additionally another API is called from [Meterian Heidi](https://www.meterian.io/product/heidi/) backend services, which is used to track activity. Any identity information is anonymized, encrypted with strong cipher, and cannot be deciphered.


## Contributing feedback

While the extension is closed source and the [issue tracker repository](https://github.com/MeterianHQ/vscode-extension-tracker) contains no code, your feedback directly shapes our backlog and priorities. The extension is completely free to use.
