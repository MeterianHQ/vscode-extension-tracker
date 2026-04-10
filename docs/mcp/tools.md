# MCP Tools Reference

The Meterian MCP server exposes two tools to your AI assistant.

## `advisories_get`

Returns all known security advisories and license issues for a specific library.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `language` | string | yes | Language or package manager (see [supported languages](#supported-languages)) |
| `name` | string | yes | Package name as published (e.g. `axios`, `org.springframework:spring-web`) |
| `version` | string | yes | Library version to check |

**Returns:** A JSON object with an `advisories` array containing all known security issues for that library version.

---

## `advisories_getnextsafe`

Returns the recommended safe versions to upgrade to for a vulnerable library.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `language` | string | yes | Language or package manager (see [supported languages](#supported-languages)) |
| `name` | string | yes | Package name |
| `version` | string | yes | Current vulnerable version |

**Returns:** A JSON object with a `safe_versions` field containing:

| Field | Description |
|-------|-------------|
| `latestPatch` | Earliest safe version at the same major.minor |
| `latestMinor` | Earliest safe version at the same major |
| `latestMajor` | Latest safe version overall |

---

## Supported Languages

Both tools accept the `language` parameter with the following values. Aliases are also accepted.

| Language | Primary value | Accepted aliases |
|----------|--------------|-----------------|
| Node.js / npm | `nodejs` | `npm`, `javascript` |
| Java / Maven | `java` | `maven` |
| PHP / Composer | `php` | `packagist` |
| Ruby / Gems | `ruby` | `gem` |
| Python / pip | `python` | `pypi` |
| .NET | `dotnet` | `nuget`, `csharp`, `c#`, `fsharp`, `f#`, `vb.net`, `vbnet` |
| Go | `golang` | `go` |
| Rust / Cargo | `rust` | `cargo` |
| C/C++ / Conan | `cpp` | `conan`, `c`, `c++` |
| Dart / Flutter | `dart` | `pub`, `flutter` |
| Clojure / Leiningen | `clojure` | `leiningen` |
| Swift / SPM | `swift` | `spm` |
