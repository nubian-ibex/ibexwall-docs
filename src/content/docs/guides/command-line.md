---
title: "The command line"
description: "Use ibexctl to check, plan, apply and undo changes from a terminal."
sidebar:
  order: 5
---

`ibexctl` is the IbexWall command line. It does what the window does, through the same daemon and the same polkit checks, so a change still needs a plan and an administrator's approval. It comes with the `ibexwall` package.

Add `--json` to any command for machine-readable output:

```sh
ibexctl --json status
```

## Status and checks

```sh
ibexctl status
ibexctl check
ibexctl check system.posture
ibexctl findings
ibexctl findings --plugin net.dns
```

`status` prints the daemon version, the distribution, the kernel, and whether anything is degraded. `check` runs the checks of all enabled plugins, or of one, and lists the findings. `findings` lists what was found last time without running anything.

## Plugins

```sh
ibexctl plugins list
ibexctl plugins info system.hardening
ibexctl plugins enable net.dns
ibexctl plugins disable net.dns
```

See [Plugins](/concepts/plugins/) for the ids.

## Plan, apply, confirm, roll back

```sh
ibexctl plan net.firewall --set allow=8080/tcp
ibexctl apply PLAN_ID
ibexctl apply PLAN_ID --confirm-timeout 90
ibexctl confirm TRANSACTION_ID
ibexctl history
ibexctl rollback TRANSACTION_ID
```

`plan` builds a preview and prints a plan id; `--set KEY=VALUE` gives the plugin a setting, and `--set-file KEY=PATH` reads a setting from a text file (up to 64 KiB). When a change could cut the network, `apply` finishes with "applied; awaiting confirmation" and exits with code 5: run `ibexctl confirm` to keep it, or wait for it to be undone. See [Plans and rollback](/concepts/plans-and-rollback/).

```sh
ibexctl audit verify
ibexctl events
ibexctl events --follow
```

`audit verify` checks the audit chain. `events` shows recent events, and `--follow` streams new ones.

## Firewall and apps

```sh
ibexctl firewall status
ibexctl firewall allow service:http --yes
ibexctl firewall deny 8080/tcp
ibexctl firewall profile travel
ibexctl apps list
ibexctl apps info APP_KEY
ibexctl apps default ask
ibexctl apps set APP_KEY block
ibexctl prompts list
ibexctl prompts answer ID allow --scope always
```

Firewall commands show the plan unless you add `--yes`. Profiles need firewalld. See [Firewall and apps](/guides/firewall-and-apps/).

## Assistants

```sh
ibexctl mcp config claude-code --with-proposals
ibexctl mcp token --name "work laptop" --preset plan --expires 2027-01-31
ibexctl proposals list --status pending
ibexctl proposals show ID
ibexctl proposals approve ID
ibexctl proposals reject ID
```

`mcp config` takes `claude-code`, `opencode` or `vscode`. See [Connect an AI](/guides/connect-an-ai/).

## Exit codes

- `0`: done.
- `1`: an error. If the daemon cannot be reached the message names the socket.
- `2`: wrong usage.
- `3`: permission denied.
- `4`: locked by an organization policy.
- `5`: applied, and waiting for your confirmation.
- `10`: `check` found something.

Code 10 makes `ibexctl check` usable in a script that should fail when a check does.

## The terminal interface

```sh
ibexctl tui
```

This opens an interactive interface in the terminal. It talks to the same daemon, so it works over SSH or without a desktop.
