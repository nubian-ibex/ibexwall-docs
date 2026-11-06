---
title: "Plugins"
description: "What a plugin is, what the 32 official ones cover, and what a plugin is allowed to do."
sidebar:
  order: 2
---

Every protection in IbexWall is a plugin. A plugin reads part of your system, reports findings, and when it can fix something, describes the change. It never applies the change itself: the core does, through the same [plan, snapshot, approval and rollback](/concepts/plans-and-rollback/) as everything else.

## Kinds

- **Check** (shown as "Read-only"): reads the system and reports. It cannot change anything.
- **Control** (shown as "Changes the system"): also proposes changes, such as a firewall rule or a kernel setting. A control plugin is always a check as well.

Each plugin also has an origin, shown on its card: Official, Community or Local.

## The 32 official plugins

The full list, with what each one reads and changes, is in the [plugin reference](/reference/plugins/). By area:

- **Network:** Secure DNS (`net.dns`), Firewall (`net.firewall`), Open ports seen with nmap (`net.exposure`), Secure time with NTS (`net.nts`), VPN and kill switch (`net.vpn`), Wi-Fi privacy (`net.wifi`).
- **Apps:** Flatpak network access (`apps.flatpak-network`), Flatpak permissions (`apps.flatpak-perms`).
- **System hardening:** Hardening (`system.hardening`), Kernel hardening (`system.sysctl`), Kernel modules (`system.modules`), Temporary mounts (`system.mounts`), Core dumps (`system.coredump`).
- **System state:** System posture (`system.posture`), Exposed ports (`system.ports`), Accounts (`system.accounts`), SSH server (`system.ssh`), Screen lock (`system.session-lock`), Firmware (`system.firmware`), Automatic updates (`system.updates`).
- **Audits and assistants:** Security audit with Lynis (`system.audit`), Security profile check with OpenSCAP (`system.openscap`), AI assistants (`system.assistant`).
- **Endpoint:** Antimalware (`endpoint.av`), File integrity (`endpoint.integrity`), Emergency mode (`endpoint.isolate`), Persistence (`endpoint.persistence`), Rootkit scan (`endpoint.rootkit`).
- **Devices and privacy:** USB protection (`device.usb`), Camera and microphone (`privacy.camera-mic`), Telemetry (`privacy.telemetry`).
- **Vulnerabilities:** Known vulnerabilities (`vuln.cves`).

Some plugins use outside tools that you install yourself: ClamAV and YARA, rkhunter and chkrootkit, nmap, Lynis, OpenSCAP, USBGuard, chrony. IbexWall does not bundle them.

## Turn a plugin on or off

Open **Plugins**. Each plugin shows On or Off, and a detail panel lists its open findings and what it can do. Some plugins start on, such as System posture, Hardening and Kernel hardening. Others start off, such as Secure DNS, Firewall and Antimalware, because they change things or run scans.

On the command line:

```sh
ibexctl plugins list
ibexctl plugins info net.dns
ibexctl plugins enable net.dns
ibexctl plugins disable net.dns
```

Enabling and disabling asks for an administrator password. A plugin the system cannot use shows "Not compatible with this system", and a plugin that an organization policy controls shows "Set by your organization".

## What the permissions mean

Each plugin declares what it may do in a manifest. The detail panel shows it as plain sentences:

- **Read the system; it cannot change anything:** the plugin has no write rights.
- **Change files under ...:** the folders it may write to, such as `/etc/ibexwall/dns`.
- **Control services:** the systemd units it may start, stop or restart.
- **Set kernel parameters:** the sysctl keys it may set.
- **Run programs:** the fixed commands it may run, with no shell.
- **Add firewall rules with its own prefix:** rules in IbexWall's table whose names start with the plugin's prefix.

The core checks every proposed change against this declaration when it plans and again when it applies. An operation outside it is refused.

## Sandbox and signatures

Official plugins are one signed program started by systemd once per plugin. Each runs in its own sandboxed unit: a dynamic user, a read-only system, only the capabilities its manifest lists, and no network unless declared. Under AppArmor or SELinux the plugins are confined further.

Each manifest is signed. The daemon is built with the release public key and refuses a manifest that does not verify, so an installed package runs exactly the plugins it shipped. A local plugin you add yourself is trusted only through an explicit step and is labeled Local.
