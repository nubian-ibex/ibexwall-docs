---
title: "Frequently asked questions"
description: "Short answers about what IbexWall does, what it keeps and how it behaves."
sidebar:
  order: 20
---

## Does IbexWall send data anywhere?

No. There is no telemetry, no account and no analytics. Something leaves the machine only if you ask for it, such as an encrypted DNS lookup or a block list download. See [Privacy](/concepts/privacy/).

## Can it break my system?

Any security setting can break something, and IbexWall says what before you apply. Every change takes a snapshot first and can be undone from History. Changes that could cut your network undo themselves if you do not confirm them. See [Plans and rollback](/concepts/plans-and-rollback/).

## Does it replace my firewall?

No. With firewalld or ufw running, IbexWall asks that tool to make the change. With neither, it can offer basic protection in its own nftables table. It never edits your distribution's files or another program's tables.

## Do I need the command line?

No. The window does everything. `ibexctl` is there for people who prefer a terminal or want scripts.

## Which distributions work?

Fedora, Ubuntu 24.04 and 26.04, Debian and Arch Linux. See [Install](/getting-started/install/).

## What does the score mean?

It is a number out of 100: the weight of the checks that are in order, divided by the weight of the checks that apply to your computer. Checks that cannot be assessed do not count for or against it. See [First run](/getting-started/first-run/).

## Why does my score show checks that are not assessed?

Either the plugin behind a check is off, or your system does not give IbexWall the information. Turning on more plugins assesses more. See [Plugins](/concepts/plugins/).

## Is it safe to let an AI assistant connect?

An assistant can read your status and, if you allow it, suggest changes. It cannot apply, approve or undo anything, and you approve the plan itself, not the assistant's words. What the scopes allow still goes to the model you connected. See [Connect an AI](/guides/connect-an-ai/).

## What happens if the daemon crashes?

The network keeps working, because IbexWall fails open. On the next start, a change that was being applied is reverted.

## Does it protect me from an attacker who has root?

No. An attacker with root can disable IbexWall. See [Security model](/concepts/security-model/).

## Which languages does the app speak?

English, Portuguese (Brazil), Spanish, French and German. It follows your system language unless you choose one in Settings. See [Translating](/contributing/translating/) to add another.

## Does it work offline?

The checks do. Secure DNS, block list updates and anything that reaches outside need a connection, and the known vulnerabilities plugin works from the package manager's own cache.

## Will my changes survive an upgrade?

Yes. The changes already made, your History and your firewall stay. See [Install](/getting-started/install/).

## What happens to my data if I uninstall?

It stays until you purge it. See [Uninstall](/guides/uninstall/).

## Is it free?

Yes. IbexWall is free and open source under the GPL-3.0-or-later license. The code is at [github.com/nubian-ibex/ibexwall](https://github.com/nubian-ibex/ibexwall).
