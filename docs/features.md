# Features

## Overview

Write safe code right away by getting instant detection of open-source software vulnerabilities.
Remediate your code vulnerabilities by picking one of the suggested secure versions.

Meterian Security is a **completely free tool** that helps you identify vulnerabilities in your projects by analyzing your main manifest files (the **Free mode**). If you are a Meterian customer, you can set a Meterian API token to unlock the **Premium mode**, which provides deeper, in-depth analysis.

## How does it work?

Meterian Security will analyze your project every time you open it and every time there is a change in the manifest files.
You would be able to fix the vulnerabilities by using the remediation suggestions or snooze them for a while.
The `Analyse with Meterian` command is also available on the command palette to start a new analysis.

## Free vs Premium

**Using an API token is not required**, but if you do, it will give you a more comprehensive analysis of your project.
You can set a Meterian API token from the command palette by using the `Set Meterian API Token` command.
To go back to the Free mode, you can use the `Unset Meterian API Token` command.

You can create one from the [Meterian Dashboard](https://meterian.io/dashboard#tokens).

## What data is transferred?

The system is powered by the [Meterian Kiwi](https://www.meterian.io/product/kiwi/) vulnerability database. The APIs are called passing an opaque identifier as an authorization header; the data transferred is the name, version and language of a library. Additionally another API is called from [Meterian Heidi](https://www.meterian.io/product/heidi/) backend services, which is used to track activity. Any identity information is anonymized, encrypted with strong cipher, and cannot be deciphered.
