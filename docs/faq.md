# 💬 Meterian Security FAQ (Playful Developer Edition)

---

## 🐢 It may slow down my IDE!

Developers like you built this tool, and they’re obsessed with performance. It only wakes up when your IDE opens, then goes quiet until you ask for a scan or change a manifest file (like `package.json`, `pom.xml`, etc).  
It’s like that colleague who only speaks when it really matters.

---

## 🌐 It may slow down my network!

Barely. It makes a few lightweight API calls: all lean, all cached, and typically done once per working session.  
A sprinkle of analytics calls too (one per analysis run), but nothing that’ll set your router on fire.

---

## 🧑‍💻 I’m already using `$tool-audit`!

Of course you are 😎 But if you ever forget, or just don’t want to bounce between the console and your IDE, we have your back.  
One click, zero fuss, instant insights.

---

## 🧪 The pipeline will tell me!

Sure, eventually 😏 But wouldn’t you rather know *before* you build weeks of code on a vulnerable or abandoned library (looking at you, [passport.js](https://www.meterian.io/components/nodejs/passport/))?  
With the help of this guy you catch issues early, when fixes are still cheap and painless!

---

## 🕵️ It doesn’t catch all vulnerabilities! `$tool` does a better job!

While that can happen, it’s rare, we use one of the [largest vulnerability databases on the planet](https://www.meterian.io/product/vulnerability-data-feed/#:~:text=of%20repackaged%20assets.-,Maximum%20Coverage). Keep in mind though, the **free version** doesn’t have all the bells and whistles of the paid one. But we are improving constantly!
Oh, and we usually skip non-production packages, because we know you’re too smart to deploy those anyway 😉  


---

## 💬 It doesn’t support `$language` / `$tool`!

Easy fix: open an [public feature request](https://github.com/MeterianHQ/vscode-extension-tracker/issues/new?template=feature_request.yml&labels=feature,needs-triage&title=%5BFEAT%5D%20) and rally the votes (colleagues, family, your cat... They all count).  
The more noise, the faster it happens!

---

## 💸 It’s too expensive!

Mate… it’s literally **free**.  
Just hit [the marketplace](https://marketplace.visualstudio.com/items?itemName=meterian.meterian-heidi) and install it already.

---

## 🔒 What about my privacy?

We don’t want your data, not even your email, we transfer only name, version and language of libraries. We see your IP briefly to guess your country (so we know which “hello” to imagine saying), and then we discard it.  
That’s it.

---

## 🔄 I changed my manifest file, or switched branches: why I am not getting a report?

Good catch, and you’re not imagining things. The extension **watches manifest files** (like `pom.xml`, `package.json`, etc.) and it does re-analyse when they change. But it *intentionally* **doesn’t pop the report back up if there are no new findings**.

Why? Because being helpful is great, but *constantly yelling the same thing at you* is not. So if the scan after your change produces the exact same results as before, the plugin stays quiet to avoid nagging you. If you want to be 100% sure after a big change, just run a manual scan from the Command Palette. 
(see related discussion at [this issue](https://github.com/MeterianHQ/vscode-extension-tracker/issues/10))


---

## 🤖 Can't I just ask my AI assistant if a dependency is safe?

You can, but the answer may be out of date. AI models are trained on a snapshot of the world: if a vulnerability was disclosed after the cutoff, the assistant may still call the library safe with full confidence.

The Meterian MCP server gives your AI assistant live access to vulnerability data, so it's reasoning from today's picture, not last year's. See [what the MCP server solves](mcp/scenarios.md) for a full list of scenarios where this makes a difference.

---

## 🧾 How do I collect logs for an issue?

When something goes bump, attaching the extension log helps us fix it fast.

- **Log file (Linux/macOS):**  
  `~/.meterian/heidi/logs/application.log`
  
- **Log file (Windows):**  
  `%USERPROFILE%\.meterian\heidi\logs\application.log`

**How to attach:**
1. Reproduce the problem.
2. Grab the file above.
3. Open a bug report and **drag & drop** the file into the issue, or paste its contents inside a fenced code block.
