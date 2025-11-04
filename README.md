# Meterian VS Code Extension - Public Issue Tracker

<table>
  <tr>
    <th align="center">
      Available on the
      <a href="https://marketplace.visualstudio.com/items?itemName=meterian.meterian-heidi">Visual Studio Code Marketplace</a><br/>
      <sub>for Visual Studio Code</sub>
    </th>
    <th align="center">
      Available on the
      <a href="https://open-vsx.org/extension/Meterian/meterian-heidi">OpenVSX registry</a><br/>
      <sub>for Cursor, VSCodium, Theia &amp; friends</sub>
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

This repository is the **public issue tracker** for the Meterian VS Code extension that detects and helps you fix open‑source vulnerabilities directly in your IDE. You can download it from the [marketplace](https://marketplace.visualstudio.com/items?itemName=meterian.meterian-heidi): it's completely free to use. 

Alternatively, if you are using an alternative IDE (i.e. Cursor) you can find it on the [open-vsx marketplace](https://open-vsx.org/extension/Meterian/meterian-heidi).


## Install & Quickstart
Super easy to use:
1. **Install** from your chosen marketplace (once!)
2. Open a project (if not open yet)
3. An analysis starts automatically, if the project is supported :)
4. See the **report**, drill down into the details if you want
5. Use **autofix** to automatically resolve the issues!


## How to use this repository

Use this repo to:
- **Report bugs** (with logs, repro steps, and environment details)
- **Request features** and improvements
- **Ask usage questions**

> ⚠️ **Security disclosures**  
> Please **do not** file security vulnerabilities here. Email **security@meterian.io** with details and a way to reproduce. We’ll acknowledge within 2 business days.

## Before you file an issue
- Search **open issues** to avoid duplicates.
- Include:
  - **Extension version** (e.g., `v1.2.3`) & **VS Code version** (e.g., `1.93.0`)
  - **OS** (e.g., macOS 14.5 / Windows 11 / Ubuntu 22.04)
  - **Project language & package manager** (e.g., Java + Maven/Gradle, JavaScript + npm/yarn/pnpm, Python + pip/poetry, etc.)
  - **Reproduction steps** and **expected vs. actual behavior**
  - **Logs** from VS Code: `Help → Toggle Developer Tools → Console`
  - Screenshots, if relevant

## Quick links to file an issue
- **Report a bug** → [Open form](https://github.com/MeterianHQ/vscode-extension-tracker/issues/new?template=bug_report.yml&labels=bug,needs-triage&title=%5BBUG%5D%20)
- **Request a feature** → [Open form](https://github.com/MeterianHQ/vscode-extension-tracker/issues/new?template=feature_request.yml&labels=feature,needs-triage&title=%5BFEAT%5D%20)
- **Ask a question** → [Open form](https://github.com/MeterianHQ/vscode-extension-tracker/issues/new?template=question.yml&labels=question,needs-triage&title=%5BQUESTION%5D%20)

Remember: security issues are **not** tracked here; use **security@meterian.io**.

---
## Where to get help
- **Discord (community support):** [![Discord](https://img.shields.io/badge/Discord-join-blue?logo=discord&logoColor=white)](https://discord.gg/gHP9eaZdkp)
 - **Documentation:** We are working hard on it, coming soon :) 
- **FAQ:** See our [FAQ document](FAQ.md) 

## What data is transferred by the plugin?
The system is powered by the [Meterian Kiwi](https://www.meterian.io/product/kiwi/) vulnerability database. The APIs are called passing an opaque identifier as an authorization header; the data transferred is the name, version and language of a library. Additionally another API is called from [Meterian Heidi](https://www.meterian.io/product/heidi/) backend services, which is used to track activity. Any identity information is anonymized, encrypted with strong cypher, and cannot be decyphered.   


## Contributing feedback
While the extension is closed source and this repository contains no code, your feedback here directly shapes our backlog and priorities. The extension is completely free to use.

