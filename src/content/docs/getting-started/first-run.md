---
title: "First run"
description: "Open IbexWall, read the score and make your first change safely."
sidebar:
  order: 2
---

## Open the app

Start **IbexWall** from your application menu. The window shows a sidebar with Overview, Plugins, System posture, History and Settings, plus the screens for Secure DNS, Apps and network, Firewall, Hardening, the AI assistant and Connect an AI. The line at the bottom of the sidebar stays in view and tells you the state of the service: "Protection active" when the system posture is good, "Service running" when it is not yet, and so on down to "Service not responding".

The first time you open the app, a short welcome explains how the password prompt works, runs a first check, offers to turn on the recommended protections with one password, lists the programs some protections still need (with the command to install them) and mentions what changes on a computer your organisation manages. Settings can show it again.

If the window says it cannot reach the IbexWall service, nothing is lost: your protections keep working, the window just cannot read their state. See [Troubleshooting](/guides/troubleshooting/).

## The score

The Overview opens with "Let's check your computer" until a check has run. Press **Check now**. Checking only reads your system and changes nothing.

The score is a number out of 100. Each check has a weight that depends on its severity (Info, Low, Medium, High or Critical). The score is the sum of the weights of the checks that are in order, divided by the weights of the checks that apply on this computer.

Below the score, cards group the results: Secure boot, Encrypted disk, Firewall, Program limits, Administrator access, Network exposure, and Updates and firmware.

## Not assessed

A check can be **Not assessed yet**, or **Not applicable here**. The first means IbexWall cannot judge it yet, for example because the plugin behind it is off or the system does not offer the information. The second means the check does not make sense on this computer.

Neither counts for or against your score. The Overview tells you how many checks cannot be assessed. You can turn on more plugins to assess more; see [Plugins](/concepts/plugins/).

## System posture

Open **System posture** to see every check, what it means and what it is worth. Each check shows its status (In order, Attention, Not applicable here or Not assessed yet), its severity, and a recommendation when something needs attention. The same page explains how the score is calculated.

## Make your first change

Pick a small, low-risk recommendation. As an example, take a setting from [Hardening](/guides/hardening/).

1. **Plan.** Choose the change. IbexWall builds a plan and shows it to you. Nothing has changed yet.
2. **Review.** Read the exact files, units or firewall rules the plan touches, the preview of the difference, and "What this can affect". A restore point is created before anything changes, and the plan says so. A plan expires after a while, shown as "This preview expires".
3. **Apply.** Press **Apply changes**. The system asks for your password through the usual desktop prompt, because applying needs an administrator.
4. **Confirm.** If the change could affect your network, IbexWall asks "Keep the changes?" and counts down. Press **Keep changes** to keep them. If you do nothing, they are undone automatically.
5. **Undo.** Open **History**. Each change is listed with who approved it and what happened. Press **Undo this change** to put things back.

You can try the same steps on the command line. This example opens a port on a computer that already runs firewalld or ufw:

```sh
ibexctl plan net.firewall --set allow=8080/tcp
ibexctl apply PLAN_ID
ibexctl history
ibexctl rollback TRANSACTION_ID
```

:::tip
Run **Check now** again after a change. The score updates and the finding you fixed disappears from the list.
:::

Read [Plans and rollback](/concepts/plans-and-rollback/) for the full picture of what is saved and what an undo restores.
