---
title: "Uninstall"
description: "Remove IbexWall, see what is undone automatically, and delete what it leaves behind."
sidebar:
  order: 6
---

Removing IbexWall undoes what IbexWall changed and keeps your data until you purge it.

## What happens when you remove

Before the files go, the package stops taking connections and runs `ibexwalld --cleanup`. Cleanup:

- rolls back every change still in effect, newest first, through the snapshot each one took: kernel settings, module blocks, drop-ins, units, browser policies and firewall rules;
- removes what is left of IbexWall's nftables table (`table inet ibexwall`);
- never touches a table or a file that is not IbexWall's.

Then the units are stopped and disabled.

A change that cannot be undone is reported and does not stop the rest, and the removal itself does not fail. A setting that cannot be undone until a restart (forbidding `kexec` is one) stays in force until you reboot.

## Remove the packages

Remove all that you installed.

### Fedora

```sh
sudo dnf remove ibexwall ibexwall-desktop ibexwall-mcp ibexwall-selinux
```

### Ubuntu and Debian

```sh
sudo apt remove ibexwall ibexwall-desktop ibexwall-mcp ibexwall-apparmor
```

The AppArmor profiles are unloaded and their links in `/etc/apparmor.d` are taken away with the package.

### Arch Linux

```sh
sudo pacman -R ibexwall-desktop ibexwall-mcp ibexwall
```

## What stays

The state of IbexWall stays: its database and snapshots, the audit chain, and your settings in `/etc/ibexwall`. This lets you reinstall and pick up where you left off.

On Debian and Ubuntu, purging removes it:

```sh
sudo apt purge ibexwall ibexwall-desktop ibexwall-mcp ibexwall-apparmor
```

Fedora and Arch have no purge. To delete the data, remove the directories yourself, after the packages are gone:

```sh
sudo rm -rf /var/lib/ibexwall /var/lib/ibexwall-mcp /etc/ibexwall
```

:::caution
This deletes the audit chain and your snapshots for good. If you want a record of what IbexWall did, copy `/var/lib/ibexwall` first.
:::

Your home folder is not touched by the packages. If you used an AI assistant, the log of its calls is at `~/.local/state/ibexwall/mcp-audit.jsonl`; delete it if you no longer want it.

## Check that nothing is left

After a removal, the test matrix checks that no IbexWall unit, process, file or kernel setting is left. You can look for yourself:

```sh
systemctl list-units 'ibexwall*'
sudo nft list tables
```

The second command should not show `inet ibexwall`.
