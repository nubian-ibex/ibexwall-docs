---
title: "Troubleshooting"
description: "What to check when IbexWall does not answer, a plugin fails, a change is undone or the network stops."
sidebar:
  order: 7
---

## The daemon does not answer

The window says "Cannot reach the IbexWall service", or `ibexctl` prints `cannot reach ibexwalld at /run/ibexwall/core.sock`. Your protections keep working: the window just cannot read their state.

```sh
systemctl status ibexwalld.socket ibexwalld.service
journalctl -u ibexwalld -b
```

The socket should be active. The daemon is started by the socket the first time something connects, so `ibexctl status` will start it. If the socket is not active, start it with `sudo systemctl start ibexwalld.socket`. If the daemon fails to start, the journal says why.

If the message is "Permission needed", your account is not allowed to read this information. Ask an administrator to allow the polkit action named in the message.

## A plugin shows an error

A plugin that stops answering is restarted and marked degraded. `ibexctl status` lists what is degraded. Each plugin runs as its own unit:

```sh
systemctl status ibexwall-plugin-dns.service
journalctl -u ibexwall-plugin-dns -b
```

Replace `dns` with the plugin's short name (`net.dns` is `ibexwall-plugin-dns`). A plugin that is "Not compatible with this system" does not apply to your distribution. If a plugin is refused because its manifest signature does not verify, the package files were changed; reinstall the package and [verify your download](/reference/release-verification/).

Plugins that rely on outside tools (ClamAV, nmap, Lynis and others) report that the tool is missing until you install it.

## A change was undone

Open **History**. "Undone" means you or a timeout reverted it. "Failed (undone)" means the apply did not finish, so IbexWall put things back. A change that could affect your network and was not confirmed in time is undone by itself; this is by design. Apply again and press **Keep changes** before the countdown ends.

## You lost the network

Changes that can cut the network (firewall rules, Secure DNS, emergency mode) revert on their own if you do not confirm them, by default after 60 seconds. Wait for the countdown. If you cannot use the window, `ibexctl history` and `ibexctl rollback TRANSACTION_ID` work from a terminal.

If the daemon itself dies, IbexWall fails open: the network keeps working. If the Secure DNS resolver fails three times in 60 seconds, a failsafe restores the system resolver. If you are on a hotel or airport network, see the captive portal steps in [Secure DNS](/guides/secure-dns/).

## SELinux or AppArmor denial

On Fedora, look for denials with:

```sh
sudo ausearch -m avc -ts recent
```

On Ubuntu and Debian:

```sh
sudo journalctl -k | grep -i apparmor
```

The policies were exercised with no denials across the whole workload, so a denial is worth a bug report. Include the line. To rule the policy out, you can remove `ibexwall-selinux` or `ibexwall-apparmor`; the rest of IbexWall keeps working.

## Where the logs are

- `journalctl -u ibexwalld`: the daemon.
- `journalctl -u ibexwall-plugin-NAME`: a plugin.
- `journalctl -u ibexwall-dns`: the Secure DNS resolver.
- `journalctl -u ibexwall-monitor`: the connection monitor.
- `journalctl -u ibexwall-mcp`: the MCP server.
- `journalctl --user -u ibexwall-agent`: the session agent that shows notifications.

IbexWall's logs carry no secrets and no DNS query names.

## Report an issue

Open an issue at [github.com/nubian-ibex/ibexwall/issues](https://github.com/nubian-ibex/ibexwall/issues) with:

- the output of `ibexctl status`,
- your distribution and its version,
- what you did, what you expected and what happened,
- the relevant lines from the journal.

Look through what you paste first. Remove access keys (`ibx_...`), VPN profiles and private keys, and anything with your name or addresses you want private. IbexWall hides private files in previews, but your own terminal history is yours to check.

To report a security problem, do not open a public issue. Use [GitHub Security Advisories](https://github.com/nubian-ibex/ibexwall/security/advisories/new).
