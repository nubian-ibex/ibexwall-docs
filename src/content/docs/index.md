---
title: "IbexWall documentation"
description: "How to install, use and understand IbexWall, a free security center for Linux desktops."
sidebar:
  order: 1
---

IbexWall is a free and open source (GPL-3.0-or-later) security center for Linux desktops. It shows how secure your computer is with a score out of 100 and a list of checks, explains in plain words what to fix, and fixes it with changes you review first and can undo.

Nothing is changed without a plan you can read. Every change takes a snapshot before it is applied, and you can undo it from History. IbexWall has no telemetry, no accounts and no analytics.

:::note
Version 1.0 is being prepared and there is no public release yet. These pages describe how version 1.0 is meant to work. Packages will be published with each release on the [GitHub releases page](https://github.com/nubian-ibex/ibexwall/releases).
:::

## Who these pages are for

The guides are written for people who use a Linux desktop and want to protect it, whether or not they know the command line. The concept pages explain how IbexWall makes changes and why it is built that way, for readers who want to know what runs as root on their machine. The contributing pages are for people who want to translate or improve IbexWall.

IbexWall runs on Fedora, Ubuntu 24.04 and 26.04, Debian and Arch Linux. Each has been tested in virtual machines.

## Where to go

### Getting started

- [Install IbexWall](/getting-started/install/): the packages, installing them on each distribution, upgrading.
- [First run](/getting-started/first-run/): the score, the Overview screen and your first change.

### Concepts

- [Plans and rollback](/concepts/plans-and-rollback/): how a change is planned, applied, confirmed and undone.
- [Plugins](/concepts/plugins/): what each protection is, and what it is allowed to do.
- [Privacy](/concepts/privacy/): what IbexWall keeps, where, and how to check it.
- [Security model](/concepts/security-model/): who can do what, and what IbexWall does not protect against.

### Guides

- [Hardening](/guides/hardening/): 26 kernel, network, filesystem and module settings.
- [Firewall and apps](/guides/firewall-and-apps/): who can reach this computer, and which programs may reach the network.
- [Secure DNS](/guides/secure-dns/): encrypted lookups, blocking and split DNS.
- [Connect an AI](/guides/connect-an-ai/): let an assistant read your status and suggest changes.
- [The command line](/guides/command-line/): `ibexctl` by task.
- [Troubleshooting](/guides/troubleshooting/): when something does not work.
- [Uninstall](/guides/uninstall/): what is undone and what stays.

### More

- [Frequently asked questions](/faq/)
- [Contributing](/contributing/): build, test and send changes.
- [Translating](/contributing/translating/): add or improve a language.

The source code is at [github.com/nubian-ibex/ibexwall](https://github.com/nubian-ibex/ibexwall) and the project site is [ibexwall.com](https://ibexwall.com).
