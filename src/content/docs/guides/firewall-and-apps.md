---
title: "Firewall and apps"
description: "Control who can reach your computer, and which programs may connect to the network."
sidebar:
  order: 2
---

IbexWall has two separate controls. **Firewall** decides which connections from other computers may come in. **Apps and network** decides which of your programs may go out.

## The inbound firewall

The Firewall screen works through the firewall your system already uses. If firewalld or ufw is running, IbexWall asks it to make the change, so the rule shows up in that tool too. The screen says "Managed by firewalld" or "Managed by ufw". With neither present, it can offer its own protection in `table inet ibexwall`.

The firewall controls are off at first. The screen says "The firewall controls are off" and a button turns them on. Reading the current state works either way.

### The firewall your system installed is off

Ubuntu ships ufw installed and switched off, and some systems have firewalld installed but disabled. The screen then says "The firewall is off" and offers **Turn on the firewall**. IbexWall turns it on through the manager itself (`ufw enable`, or enabling and starting `firewalld.service`), so `ufw status` and `firewall-cmd --state` agree. First it allows the TCP services listening on every address, so an SSH session keeps working; untick "Keep what is listening reachable" to skip that. You get the usual countdown to keep or undo the change, and an undo turns the manager off again.

From the command line: `ibexctl plan net.firewall --set enable_manager=true`.

### Basic protection

If nothing is filtering incoming connections, the screen shows "The firewall is off" and offers **Turn on basic protection**. It refuses connections from other computers, except:

- connections you started,
- local traffic,
- network setup (DHCP, ICMP),
- the services listening right now, if you keep "Keep what is listening reachable" ticked, so your current session keeps working.

Container and VPN interfaces are left alone. Because this can affect your network, you get a confirmation countdown after you apply.

### Allowed ports and services

Add a port (1 to 65535, TCP or UDP) or a service name (letters, digits, dashes and underscores, for example `http`), and remove them from the lists of allowed ports and services. Each change is a plan you review and can undo.

The screen also shows programs listening on every address, and rules it read but does not edit.

Some systems already allow a whole range. Fedora Workstation's zone, for one, allows ports 1025 to 65535, so a port such as 9099 needs no rule: IbexWall says "already allowed by port 1025-65535/tcp" instead of adding one, and the screen lists the range under rules it does not edit. Ports below 1025 are the ones that need a rule there.

### Network profiles

With firewalld, a profile decides how much of this computer a network may see: Home, Work, Public or Travel. Travel lets nothing in unasked and closes SSH too. IbexWall lists your networks, suggests a profile, and warns about open Wi-Fi. Profiles need firewalld; with ufw or IbexWall's own table they are unavailable.

From the command line:

```sh
ibexctl firewall status
ibexctl firewall allow 8080/tcp
ibexctl firewall allow service:http --yes
ibexctl firewall deny 8080/tcp
ibexctl firewall profile
ibexctl firewall profile travel --yes
```

Without `--yes`, the command shows the plan and applies nothing.

## Per-program network control

The connection monitor watches which program connects where. It runs after the install. If it is off, the Apps and network screen says "The connection monitor is off" and offers **Turn on the connection monitor** (it asks for your password); `ibexctl apps monitor on` and `ibexctl apps monitor off` do the same. If you turn it off, it stays off after upgrades.

The Apps and network screen lists programs by their first connection and shows where each connects, with counts and times. Each program has a mode:

- **Allow:** free access to the internet.
- **Monitor:** free access, but everything is recorded.
- **Ask:** you decide at every new destination.
- **Block:** no access to the internet.

A default applies to programs nobody has decided about. Set it, and any program, from the command line:

```sh
ibexctl apps list
ibexctl apps default ask
ibexctl apps set APP_KEY block
```

Use the key shown by `apps list`.

### Ask on first connection

In Ask mode, the first packet of a new connection is held and a question appears: "PROGRAM wants to access the internet", with the destination, the program and the address. Choose **Allow** or **Block**, and how long to remember it: always for this app, only for this destination, or only this time.

If you do not answer in time (30 seconds by default), the connection goes through. The countdown is shown. You can also answer with `ibexctl prompts list` and `ibexctl prompts answer ID allow --scope destination`.

Ask and Block need the connection monitor to be running. Ask cannot hold a container's connections, so allow or block those instead. If the monitor is off, the screen says so and nothing is blocked.

### The agent notification

The session agent, installed with the desktop package, shows the question as a notification on your desktop. It also tells you about a captive portal, as described in [Secure DNS](/guides/secure-dns/).

For Flatpak apps, **Block network access** uses a reversible Flatpak override. It works for Flatpak apps installed for the whole system, not for single-user installs.
