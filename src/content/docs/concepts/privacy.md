---
title: "Privacy"
description: "IbexWall has no telemetry; this page says what it keeps, where, and how you can check."
sidebar:
  order: 3
---

IbexWall sends nothing about you anywhere. There are no accounts, no analytics and no phoning home. Something leaves the machine only when you ask for it, for example a DNS lookup you make or a package update you run.

## What the resolver keeps

When you turn on Secure DNS, the resolver sees every name your computer looks up. It does not write those names down. It keeps only counters: domains blocked by the list, attempts to reach other DoH servers, lookups forwarded encrypted, and upstream failures. The Secure DNS screen shows them under "Since the resolver started" and says "Counts only. IbexWall does not record which domains you look up."

The code is tested for this: a test asserts that the lookup handler has no logging of names.

## What the connection monitor keeps

Apps and network records which program connected where, and how many times. It keeps counts and times, never what was sent. Everything shown stays on this computer.

## What an AI assistant sees

An assistant you connect sees only what its scopes allow. Names, addresses, network names and home folders are replaced by stable pseudonyms before the answer leaves IbexWall, and sensitive plugins (the VPN plugin, for one) are closed to assistants by default. See [Connect an AI](/guides/connect-an-ai/).

## Where data lives

- `/var/lib/ibexwall`: IbexWall's state, including its database, snapshots and the audit chain.
- `/etc/ibexwall`: your settings, such as the Secure DNS configuration, firewall settings and `mcp.toml`.
- `/run/ibexwall`: the control socket, recreated at each boot.
- `/var/lib/ibexwall-mcp`: the MCP server's own directory.
- `~/.local/state/ibexwall/mcp-audit.jsonl`: the log of what an assistant's client did, in your home folder.

Uninstalling keeps these until you purge. See [Uninstall](/guides/uninstall/).

## What does cross the network

Only things you chose to turn on:

- Encrypted DNS lookups to the provider you picked, over TLS, HTTPS or QUIC.
- Block list downloads for Secure DNS, over HTTPS only.
- Package manager queries that some plugins make, for example the update check. The known vulnerabilities plugin works offline from the package manager's own cache.
- Connections that you open to the MCP server, if you turn on remote access. It speaks TLS only.

The rule behind this is that nothing leaves the machine in the clear. A check in the build fails on a plain `http://` address in production code, and on any network listener beyond the two known ones: the resolver on the loopback address `127.0.0.153` and the MCP server.

## How to check for yourself

You do not have to take this on trust.

- The source is at [github.com/nubian-ibex/ibexwall](https://github.com/nubian-ibex/ibexwall). The guard that fails the build is `xtask/src/egress.rs`.
- Look at what your computer connects to. The **Apps and network** screen lists connections per program, and your own tools (a firewall log, or `ss -tp`) show the rest.
- Run `ibexctl audit verify` to confirm the audit chain is intact.
- Read a plugin's permissions in **Plugins**. None of the official plugins is given network access.

:::note
Whatever a connected AI model does with the answers it receives is outside IbexWall. Prefer a local model for anything beyond the posture.
:::
