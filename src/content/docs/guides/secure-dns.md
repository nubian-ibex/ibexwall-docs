---
title: "Secure DNS"
description: "Encrypt your DNS lookups, block trackers and malware domains, and keep browsers from going around it."
sidebar:
  order: 3
---

Your computer asks a DNS server to turn names into addresses, usually the one your network provides, and that server can see and change the answers. Secure DNS runs a small resolver on your computer that sends those lookups to a provider over an encrypted connection.

Secure DNS works with systemd-resolved. On other setups the screen says the system cannot be checked yet and suggests nothing.

## Turn it on

Open **Secure DNS**. The status reads "Secure DNS is off". Switch the plugin on at the top of the screen, choose your settings and review the plan; nothing changes until you apply. The change can affect your network, so you get a confirmation countdown.

When it works, the status reads "Your DNS lookups are encrypted".

### Choose a provider

- **Quad9:** does not record user IP addresses.
- **Cloudflare:** truncates IP addresses and deletes them within 25 hours.
- **AdGuard DNS:** processes no personal data, only overall usage statistics.
- **DNS4EU (protective):** see the provider's privacy documentation.

Each shows its jurisdiction. Read the provider's own policy before you rely on these summaries.

### Choose how lookups are encrypted

DNS over TLS is recommended. DNS over HTTPS, DNS over HTTPS with HTTP/3 and DNS over QUIC are also offered.

### Blocking

Pick a block list, or None: HaGeZi (Light, Normal, Pro, Pro++, Ultimate), OISD (small, big) or StevenBlack unified hosts. HaGeZi Pro is the one its authors recommend; Ultimate may break sites. Lists are downloaded over HTTPS, checked name by name and replaced in one step, so a download that fails or is empty never replaces a working list.

### Refuse unencrypted DNS

When on, programs cannot send plain DNS (port 53) or DoT (port 853) queries around Secure DNS. Loopback stays open. DNS over HTTPS on port 443 cannot be blocked wholesale, so IbexWall also refuses known DoH endpoints at the resolver.

### Stop browsers from bypassing it

With your approval, IbexWall writes the browser policy that keeps Firefox, Chrome, Chromium, Brave and Edge from using their own DoH servers. Only browsers installed on this computer are touched, and undoing the change removes the policy.

## Captive portals

Hotel and airport sign-in pages often block the encrypted connection, so the page may not load. IbexWall detects the portal and the agent shows one notification with the steps: turn off "Refuse unencrypted DNS", sign in, then turn it back on. IbexWall never lifts the protection by itself, so a fake portal cannot weaken your computer.

## Your own DNS servers and companies

Choose **Use my own servers instead of a provider** to use your router, your company's server or your VPN's. Give the first server as an IP address, an optional second one, and say how it is reached: encrypted (DNS over TLS, with the name on its certificate) or, for a server on your own network, without encryption. IbexWall refuses unencrypted DNS to a public address, and warns you when a local server gets unencrypted lookups.

For **split DNS**, list the internal domains (for example your company's) and the server that answers them. Those names go to that server; everything else uses the servers above.

If your network offers its own DNS servers, the screen lists them and does nothing with them until you choose one.

## An existing dnscrypt-proxy

If your lookups already leave the computer encrypted through dnscrypt-proxy, IbexWall recognises it from its configuration and from systemd, says so, and leaves it alone. If it is running but your system does not use it, IbexWall tells you and suggests nothing.

## Check that it works

The screen shows counters since the resolver started: domains blocked by the list, attempts to reach other DoH servers, lookups forwarded encrypted and upstream failures. It records counts only, never which domains you look up. `resolvectl status` shows which server your system uses.

If the resolver dies, it restarts. After three failures in 60 seconds, a failsafe removes the enforcement and restores the system resolver, so you keep name resolution. A change that is not confirmed in time is also undone.

## Turn it off

Undo the change that turned it on from [History](/concepts/plans-and-rollback/). That removes the resolver's drop-ins and restores the system resolver. The switch at the top of the screen turns the Secure DNS plugin itself on or off; undo the change first, so that the system is put back before the plugin stops.
