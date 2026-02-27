# Configuration

A configuration panel is available for a more tailored experience. Access it via `File > Preferences > Settings` or by using the `Configure Meterian Security` command from the Command Palette.

## Vulnerability Thresholds

| Label | Default | Description |
|-------|---------|-------------|
| Severity Threshold | LOW | Vulnerabilities below this level won't be flagged |
| CVSS Threshold | 3.5 | Vulnerabilities with a CVSS score below this value won't be flagged |
| EPSS Threshold | 0.01 | Vulnerabilities with an EPSS score below this value won't be flagged |

## General Settings

| Label | Default | Description |
|-------|---------|-------------|
| CVEs only | false | Only flag vulnerabilities with a CVE id |
| Max Files | 100000 | Set the maximum number of files to consider during an analysis |
| Grace Time in seconds | 60 | Grace time between the last manifest change and the start of the analysis |
| Enabled | true | Enables/Disables the plugin for the current workspace |
| Max Problem Level | Warning | Define the maximum level applicable to problems |
| Notifications | Problems only | Define the notifications to be shown |
