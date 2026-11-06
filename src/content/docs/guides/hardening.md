---
title: "Hardening"
description: "Choose recommended kernel, network, filesystem and module settings, review them, and apply them in one plan."
sidebar:
  order: 1
---

The **Hardening** screen lists 26 settings taken from published security guides, such as the Linux Hardening Guide by madaidans, the Linux kernel documentation and the ANSSI recommendations for GNU/Linux systems. For each one you see where it comes from and what it can break. You tick the ones you want, review the change, and apply.

The top of the screen tells you how many are already in place, for example "2 of 26 recommended settings are already in place."

## The areas

Settings are grouped by area: Kernel, Memory, Files and mounts, and Network. Each shows a status:

- **In place:** the setting is already as recommended.
- **Not applied:** it is not, and you can tick it.
- **Cannot tell:** IbexWall could not read the current value.

Apply goes through the plugin that owns the setting: Kernel hardening (`system.sysctl`) for kernel parameters, Kernel modules (`system.modules`) for module blocks and Temporary mounts (`system.mounts`) for `/tmp`.

## Risk levels

Every setting carries one of three labels:

- **Low risk:** no known effect on normal use.
- **Can affect some programs:** a program you use may behave differently.
- **Can break things:** expect something to stop working. Read what it may break first.

A setting that can break something shows a "May break" line. Examples from the list:

- Turning off unprivileged sandboxes (user namespaces) stops Flatpak, the Chromium and Firefox sandboxes, rootless containers and many AppImages.
- Blocking network file systems or Bluetooth stops anything that uses them.
- Not running programs from `/tmp` can stop installers and tools that unpack there.
- Dropping packets with a forged sender address can break some VPNs and machines with several network routes.
- Ignoring IPv6 router announcements may stop IPv6 on most home networks.
- Restricting eBPF to administrators stops tools that load eBPF without privileges. IbexWall itself is not affected.

One setting, forbidding the loading of another kernel while running (`kexec`), cannot be undone until the next restart. Its description says so.

## What is ticked for you

When you open the screen, IbexWall ticks the recommended settings that are still missing, which are the ones marked low risk or only "can affect some programs" and that the guides advise for most computers. Fifteen of the 26 are recommended in this sense. The other eleven start unticked, including every setting labeled "Can break things". You can tick or untick anything.

## Apply in one plan

1. Tick the settings you want.
2. Press **Review the change**. IbexWall builds one plan for all of them. A line reminds you how many of your choices can affect programs you use.
3. Read the preview and the "What this can affect" notes.
4. Press **Apply**, with the number of settings on the button, and approve with your password.
5. If a change needs confirmation, press **Keep the changes**. Otherwise it is undone after the countdown.

Settings that belong to different plugins are applied plugin by plugin. If one plugin's change does not stay, the screen says "The change for ... did not stay, so the rest was not applied."

## Undo

**Undo all** reverts everything from that apply. You can also undo a single change from [History](/concepts/plans-and-rollback/).

## More about each setting

The project website describes each setting, with its sources, at [ibexwall.com/hardening](https://ibexwall.com/hardening/). Each row in the app also has a "More about this setting" link.
