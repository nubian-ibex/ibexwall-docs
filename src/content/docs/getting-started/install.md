---
title: "Install IbexWall"
description: "Install the IbexWall packages on Fedora, Ubuntu, Debian or Arch Linux."
sidebar:
  order: 1
---

:::note
These steps describe the version 1.0 packages. Version 1.0 is not released yet, so there is nothing to download today. Packages will be attached to each release on the [GitHub releases page](https://github.com/nubian-ibex/ibexwall/releases). There is no package repository (COPR, PPA, OBS or AUR) yet; those are planned.
:::

## Supported distributions

IbexWall is tested in virtual machines on Fedora, Ubuntu 24.04, Ubuntu 26.04, Debian and Arch Linux. Distributions based on them, such as EndeavourOS or Omarchy on the Arch side, should work but are checked by hand rather than in the test matrix.

IbexWall needs systemd, polkit and nftables. The packages depend on them, so your package manager installs them if they are missing.

## The packages

IbexWall comes as three packages on every family, and one optional fourth.

- `ibexwall`: the daemon (`ibexwalld`), the command line (`ibexctl`), the secure DNS resolver, the plugins, the systemd units, the polkit policy and the users it needs.
- `ibexwall-desktop`: the window, the tray icon and the session agent that shows notifications. It depends on `ibexwall` at the same version, and on GTK 3 and WebKitGTK 4.1.
- `ibexwall-mcp`: the server that lets an AI assistant read your status. You only need it if you plan to use [Connect an AI](/guides/connect-an-ai/).
- `ibexwall-apparmor` on Debian and Ubuntu, or `ibexwall-selinux` on Fedora: policies that confine the resolver, the MCP server and the plugins. Arch ships neither.

Recommended but not required: `chrony` (for the secure time plugin), and `firewalld` or `ufw` (for the firewall screen to drive the firewall you already use).

## Fedora

Download the packages from the release, then install them from the folder you saved them in.

```sh
sudo dnf install ./ibexwall-*.rpm
```

This installs everything in the folder, including `ibexwall-selinux`. If you only want some of them, name the files instead of using the wildcard.

## Ubuntu and Debian

```sh
sudo apt install ./ibexwall_*.deb ./ibexwall-desktop_*.deb ./ibexwall-apparmor_*.deb
```

Add `./ibexwall-mcp_*.deb` if you want the assistant server. Giving `apt` the file paths lets it fetch the dependencies from your normal repositories.

## Arch Linux

```sh
sudo pacman -U ibexwall-*.pkg.tar.zst
```

As on Fedora, name the files if you do not want all of them.

## What the install switches on

The install only creates users and directories, and switches on sockets: the control socket (`/run/ibexwall/core.sock`) and one socket per plugin. A socket costs nothing until something connects to it, and systemd then starts the program behind it.

The install applies no IbexWall change. Your firewall, DNS, kernel settings and units are as they were. Every change still needs a plan and your approval. The secure DNS resolver, the connection monitor, the MCP server and the session agent stay off until used.

## Start the app

Open **IbexWall** from your application menu, or run:

```sh
ibexwall-desktop
```

Without the desktop package you can use the command line. `ibexctl status` shows that the daemon answers, and `ibexctl tui` opens a terminal interface. See [the command line](/guides/command-line/).

## Verify a download

Releases carry checksums, signatures, a software bill of materials and a provenance statement. Check them before you install. The steps are in [Release verification](/reference/release-verification/).

## Upgrade

Install the newer packages the same way you installed the first ones. The upgrade restarts the daemon and the plugin services on the new files. The changes you made, your History and your firewall rules stay.

To remove IbexWall, see [Uninstall](/guides/uninstall/).
