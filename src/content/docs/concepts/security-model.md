---
title: "Security model"
description: "Who can do what in IbexWall, how plugins are held back, and what it does not protect against."
sidebar:
  order: 4
---

IbexWall runs a daemon as root, so it is worth knowing exactly what that daemon trusts and what it does not.

## Who can do what

The daemon listens on a Unix socket, `/run/ibexwall/core.sock`. Any local user can connect to it, but every method is checked through polkit, the same system that shows the password prompt in your desktop. If polkit cannot answer, the request is refused.

An action that needs a password is asked for only when the program calling asks for it. The desktop app always does, so a change shows your desktop's password dialog, and the answer is kept for a few minutes. `ibexctl` does when it runs in a terminal (`--no-ask-password` turns that off). The MCP server never does: a suggestion it leaves still needs a person to approve it in the app. Without a dialog to show, as over SSH, the change answers that a password is needed and nothing happens; use `sudo ibexctl` there.

An administrator can let chosen accounts change IbexWall without typing a password: add them to the `ibexwall-admins` group (`sudo gpasswd -a NAME ibexwall-admins`). A polkit rule gives that group every IbexWall action except the policy provider's. The group ships empty, so nothing changes until someone is added, and removing an account takes the access away.

The polkit actions IbexWall defines are:

- `com.ibexwall.read`: read status, findings and events. Allowed for the active desktop session.
- `com.ibexwall.plan`: simulate a change. Allowed for the active desktop session.
- `com.ibexwall.apply`: apply and confirm changes. Needs an administrator password.
- `com.ibexwall.rollback`: undo changes. Needs an administrator password.
- `com.ibexwall.plugins.manage`: enable or disable plugins. Needs an administrator password.
- `com.ibexwall.apps.decide`: answer a "wants to access the internet" question. Allowed for the active session.
- `com.ibexwall.proposals.create`: create a change proposal, for assistants. Allowed for the active session.
- `com.ibexwall.proposals.decide`: approve or reject a proposal. Needs an administrator password.
- `com.ibexwall.export`: export configuration and data. Allowed for the active session.
- `com.ibexwall.policy.provider`: provide organization policy. Not granted to desktop users.

Because the "wants to access" question and the proposal queue are allowed for the active session, an assistant can leave a suggestion, but only an authenticated administrator can approve it.

## The assistants group

Users who run an AI assistant are added to the `ibexwall-assistants` group. A polkit rule gives that group three actions: read, plan and create proposals. Nothing else. Applying, rolling back, managing plugins and deciding a proposal stay behind a password. Removing the user from the group takes the access away. Details are in [Connect an AI](/guides/connect-an-ai/).

## Plugins propose, the core executes

A plugin runs as its own process, in a sandboxed unit, and can only describe a change. The core checks it against the plugin's signed manifest:

- Files may be written only under the listed folders, without following symbolic links.
- Commands run with a fixed argument list from the manifest, with no shell and no text from the plugin pasted in.
- Kernel settings and firewall rule names are limited to what the manifest lists.

The systemd units for plugins are generated from their manifests, never taken from the plugin itself. A tampered manifest fails its signature and is refused.

## Confinement with AppArmor and SELinux

Beyond systemd sandboxing, IbexWall ships policies for the programs most exposed to untrusted input.

- **Resolver:** its own directories, port 53 on loopback, outbound TLS, no program execution.
- **MCP server:** its own directories, the control socket, and a listening TCP socket. It cannot apply a change, and the policy does not allow it.
- **Plugins:** read the system, keep their own socket and write nothing. AppArmor explicitly denies reading `.ssh` and `.gnupg`.

The daemon is confined only under AppArmor, with a profile generated from the plugin manifests. Under SELinux it stays in the system's service domain, because a policy listing every file it may repair would add no protection that plans, snapshots, polkit and the manifests do not already give.

AppArmor profiles are attached by the units, so a program you start yourself, such as an MCP server run by an assistant's client over stdio, is not confined. Arch ships no policy.

## What is not protected against

IbexWall does not claim total protection.

- **An attacker who already has root.** Root can stop the daemon, edit the audit log and remove the firewall table. IbexWall defends the boundary between your user programs and the system, not against the system owner.
- **Kernel compromise, physical access and firmware implants.** IbexWall reports Secure Boot and related posture but cannot defend against them.
- **eBPF bypasses.** As with any host firewall, bypasses exist. IbexWall layers eBPF with nftables and documents the limits.
- **A DNS client with its own encrypted resolver.** An application that has its own DoH client and an endpoint IbexWall does not know can still bypass DNS-level blocking.
- **Hostile local users on a shared machine.** The permission rules assume a single desktop user. Multi-user server hardening is not in version 1.0.
- **A misleading assistant.** A model can write a convincing justification for a bad change. That is why you approve the plan, not the words.

Report a vulnerability privately through [GitHub Security Advisories](https://github.com/nubian-ibex/ibexwall/security/advisories/new).
