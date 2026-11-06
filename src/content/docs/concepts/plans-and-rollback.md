---
title: "Plans and rollback"
description: "How IbexWall plans, applies, confirms and undoes every change."
sidebar:
  order: 1
---

Every change IbexWall makes goes through the same steps. This is what lets you try a setting without worrying about being stuck with it.

## The steps

1. **Plan.** A plugin describes a change, and the core turns it into a plan: the exact files, systemd units, kernel settings or firewall rules, a preview of the difference, and what could break. A plan changes nothing. In the command line this is `ibexctl plan`, and the screens call it Simulate or Review.
2. **Snapshot.** Before applying, the core saves what the change is about to touch. The screens call this a restore point.
3. **Approval.** You approve the plan. Applying needs administrator rights, so the desktop asks for your password.
4. **Apply.** Only the core, the daemon running as root, applies the change. Plugins never do.
5. **Confirmation.** Some changes could cut your network, such as a firewall rule, Secure DNS or the emergency mode. For those, IbexWall waits for you to confirm. The default window is 60 seconds, and the screen shows the seconds left. If you do not confirm, the change is undone by itself.

On the command line, a change that waits for confirmation exits with code 5 and prints the command to keep it:

```sh
ibexctl confirm TRANSACTION_ID
```

You can pick another window with `ibexctl apply PLAN_ID --confirm-timeout SECONDS`.

## History

**History** lists every change, who approved it, and its result:

- Applied and kept.
- Undone.
- Waiting for confirmation.
- Failed (undone).

Each entry has an **Undo this change** button. On the command line, `ibexctl history` lists transactions and `ibexctl rollback TRANSACTION_ID` undoes one.

## What a rollback restores

A rollback puts back what the snapshot held, which is what that change touched: files and drop-ins, units, kernel settings, module blocks, browser policies and IbexWall's firewall rules. Rolling back several changes goes newest first.

The snapshot holds only what IbexWall changed, so a rollback cannot be pointed at a file or a table that belongs to your distribution or to another program.

IbexWall also recovers by itself. If the daemon is killed in the middle of an apply, the next start reverts the transaction. If a change fails part way, it is undone.

## What it cannot restore

Not everything can be undone, and IbexWall says so before you apply.

- Some changes can only be undone after a restart. Forbidding the loading of another kernel is one: the plan warns "This cannot be undone until the computer restarts."
- Changes that cannot be undone at all carry a warning and need extra consent. They are left out of the promise that everything is reversible, and the AI assistant can never propose them.
- Things you do outside IbexWall, such as installing a package yourself, are not in any snapshot.

## The audit chain

IbexWall keeps an audit log of changes in which each entry includes a hash of the one before it. If a line is removed or edited, the chain breaks. Check it with:

```sh
ibexctl audit verify
```

It prints `audit chain valid (N entries)` or says where the chain is broken. Each entry names who acted (your user, an assistant's client, or IbexWall itself), the digest of the plan and the result.

:::caution
The chain detects tampering; it does not prevent it. Someone with root on your machine can still truncate the log. See [Security model](/concepts/security-model/).
:::
