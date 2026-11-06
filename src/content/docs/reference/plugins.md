---
title: "Plugin catalog"
description: "Every official plugin: what it is for, what it may read and change, how it is sandboxed, and what it can affect."
sidebar:
  order: 1
---

The thirty-two official plugins. Each one proposes and never applies: the core applies, through a plan, a snapshot and your approval. The list below is generated from the plugin manifests, so it is what the daemon enforces.

## Flatpak network access {#apps-flatpak-network}

Cuts the network access of a Flatpak app with a reversible override.

- **ID**: `apps.flatpak-network`, **Version**: 0.1.0, **Category**: apps, **Kinds**: check, control, **Origin**: official
- **On by default**: no
- **May read**: `/var/lib/flatpak/app`, `/var/lib/flatpak/overrides`
- **May write**: `/var/lib/flatpak/overrides`
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no
- **Can affect**: network

**Worth knowing before you turn it on**

- The app stops working if it needs the network.
- Updates and sign-in inside the app stop working.

## Flatpak permissions {#apps-flatpak-perms}

Lists Flatpak apps that can reach your files, devices or the sandbox's own controls.

- **ID**: `apps.flatpak-perms`, **Version**: 0.1.0, **Category**: apps, **Kinds**: check, **Origin**: official
- **On by default**: yes
- **May read**: `/var/lib/flatpak`, `/home`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no

## USB protection {#device-usb}

Checks that new USB devices are blocked until you allow them (USBGuard), and builds the allow list from what is plugged in now.

- **ID**: `device.usb`, **Version**: 0.1.0, **Category**: device, **Kinds**: check, control, **Origin**: official
- **On by default**: yes
- **May read**: `/sys/bus/usb/devices`, `/etc/usbguard`, `/usr/sbin/usbguard-daemon`, `/usr/bin/usbguard-daemon`, `/etc/systemd/system`, `/usr/lib/systemd/system`
- **May write**: `/etc/usbguard/rules.d`
- **May manage these services**: `usbguard.service`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no
- **Can affect**: usb

**Worth knowing before you turn it on**

- Devices you plug in later stay blocked until you allow them with usbguard. Keyboards and mice connected now are allowed, so you are not locked out.

## Antimalware {#endpoint-av}

Scans folders on demand or on a schedule with ClamAV and YARA, and reports what they find.

- **ID**: `endpoint.av`, **Version**: 0.1.0, **Category**: endpoint, **Kinds**: check, control, **Origin**: official
- **On by default**: no
- **May read**: `/sys/fs/selinux`, `/var/lib/ibexwall/av`, `/etc/ibexwall/av`, `/usr/bin`, `/var/lib/clamav`, `/usr/share/clamav`, `/etc/systemd/system`
- **May write**: `/etc/systemd/system/ibexwall-av-scan.service`, `/etc/systemd/system/ibexwall-av-scan.timer`, `/etc/ibexwall/av`, `/var/lib/ibexwall/av/.managed`
- **May manage these services**: `ibexwall-av-scan.service`, `ibexwall-av-scan.timer`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no
- **Can affect**: performance

**Worth knowing before you turn it on**

- A scan reads many files and slows the computer while it runs.

## File integrity {#endpoint-integrity}

Asks the package manager which installed files are not what it shipped, and AIDE when it is set up.

- **ID**: `endpoint.integrity`, **Version**: 0.1.0, **Category**: endpoint, **Kinds**: check, **Origin**: official
- **On by default**: no
- **May read**: `/var/lib/rpm`, `/usr/lib/sysimage/rpm`, `/var/lib/dpkg`, `/var/lib/pacman`, `/var/lib/aide`, `/usr/bin`, `/usr/sbin`, `/bin`, `/sbin`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no

## Emergency mode {#endpoint-isolate}

Cuts the network except for the addresses you name, and is undone from History.

- **ID**: `endpoint.isolate`, **Version**: 0.1.0, **Category**: endpoint, **Kinds**: check, control, **Origin**: official
- **On by default**: no
- **May read**: `/etc/ibexwall/isolate`
- **May write**: `/etc/ibexwall/isolate`
- **May change the firewall**: `endpoint_isolate` 
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no
- **Can affect**: network

**Worth knowing before you turn it on**

- Everything that uses the network stops, except the addresses you allowed.
- A remote session (SSH, remote desktop) is cut unless its address is allowed.
- Updates, backups and sync pause until the change is undone.

## Persistence {#endpoint-persistence}

Watches the places a program can use to stay on this computer (units, cron, autostart, shell start-up, LD_PRELOAD) and reports what changed.

- **ID**: `endpoint.persistence`, **Version**: 0.1.0, **Category**: endpoint, **Kinds**: check, control, **Origin**: official
- **On by default**: no
- **May read**: `/etc/systemd/system`, `/usr/lib/systemd/system`, `/etc/cron.d`, `/etc/cron.daily`, `/etc/cron.hourly`, `/etc/cron.weekly`, `/etc/cron.monthly`, `/etc/crontab`, `/var/spool/cron`, `/etc/xdg/autostart`, `/home`, `/root`, `/etc/ld.so.preload`, `/etc/profile`, `/etc/profile.d`, `/etc/bash.bashrc`, `/etc/bashrc`, `/var/lib/ibexwall/persistence`
- **May write**: `/var/lib/ibexwall/persistence`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no

## Rootkit scan {#endpoint-rootkit}

Runs rkhunter and chkrootkit, on demand or on a schedule, and reports what they flag. Their warnings need a person's review: they are not proof.

- **ID**: `endpoint.rootkit`, **Version**: 0.1.0, **Category**: endpoint, **Kinds**: check, control, **Origin**: official
- **On by default**: no
- **May read**: `/var/lib/ibexwall/rootkit`, `/usr/bin`, `/usr/sbin`, `/etc/os-release`, `/etc/systemd/system`
- **May write**: `/etc/systemd/system/ibexwall-rootkit-scan.service`, `/etc/systemd/system/ibexwall-rootkit-scan.timer`, `/var/lib/ibexwall/rootkit/.managed`
- **May manage these services**: `ibexwall-rootkit-scan.service`, `ibexwall-rootkit-scan.timer`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no
- **Can affect**: performance

**Worth knowing before you turn it on**

- The scan reads most of the system and can slow the computer while it runs.

## Secure DNS {#net-dns}

Encrypts DNS lookups, blocks trackers and malware domains, and keeps browsers from bypassing it.

- **ID**: `net.dns`, **Version**: 0.1.0, **Category**: network, **Kinds**: check, control, **Origin**: official
- **On by default**: no
- **May read**: `/etc/resolv.conf`, `/etc/systemd/resolved.conf`, `/etc/systemd/resolved.conf.d`, `/usr/sbin`, `/run/systemd/resolve`, `/run/systemd/netif`, `/run/NetworkManager`, `/etc/ibexwall/dns`, `/proc/net/udp`, `/etc/passwd`, `/usr/bin`, `/etc/os-release`, `/etc/dnscrypt-proxy`, `/etc/dnscrypt-proxy.toml`, `/run/systemd/units`, `/etc/systemd/system`, `/usr/lib/systemd/system/dnscrypt-proxy.socket`
- **May write**: `/etc/ibexwall/dns`, `/etc/systemd/resolved.conf`, `/etc/systemd/resolved.conf.d`, `/usr/sbin`, `/usr/bin`, `/etc/firefox/policies`, `/etc/opt/chrome/policies/managed`, `/etc/chromium/policies/managed`, `/etc/chromium-browser/policies/managed`, `/etc/brave/policies/managed`, `/etc/opt/edge/policies/managed`
- **May manage these services**: `ibexwall-dns.service`, `systemd-resolved.service`
- **May change the firewall**: `net_dns` 
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no
- **Can affect**: network

**Worth knowing before you turn it on**

- Sign-in pages of captive portals (hotels, airports) may not load.
- VPN clients that set their own DNS may be overridden.
- Corporate split DNS (internal names) may stop resolving.

## Open ports, seen with nmap {#net-exposure}

Scans this computer's own addresses (never another machine) with nmap and lists which TCP ports answer, to compare with what you expect.

- **ID**: `net.exposure`, **Version**: 0.1.0, **Category**: net, **Kinds**: check, control, **Origin**: official
- **On by default**: no
- **May read**: `/var/lib/ibexwall/exposure`, `/proc/net`, `/usr/bin`, `/etc/os-release`, `/etc/systemd/system`
- **May write**: `/etc/systemd/system/ibexwall-exposure-scan.service`, `/etc/systemd/system/ibexwall-exposure-scan.timer`, `/var/lib/ibexwall/exposure/.managed`
- **May manage these services**: `ibexwall-exposure-scan.service`, `ibexwall-exposure-scan.timer`
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no
- **Can affect**: network

**Worth knowing before you turn it on**

- The scan opens a connection to every port of this computer's own addresses, so services that log connections will list them.

## Firewall {#net-firewall}

Controls which connections can reach this computer, through the firewall your system already uses.

- **ID**: `net.firewall`, **Version**: 0.1.0, **Category**: network, **Kinds**: check, control, **Origin**: official
- **On by default**: no
- **May read**: `/etc/firewalld`, `/usr/lib/firewalld`, `/etc/ufw`, `/etc/ibexwall/firewall`, `/run/systemd/units`, `/proc/net`, `/etc/os-release`, `/usr/sbin`, `/usr/bin`
- **May write**: `/etc/ibexwall/firewall`
- **May change the firewall**: `net_firewall` `firewalld`, `ufw`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no
- **Can affect**: network

**Worth knowing before you turn it on**

- Remote access, such as SSH, stops working if it is not allowed.
- Services other computers use on this one, such as file sharing, stop working.
- Container and virtual machine networking may break on some setups.

## Secure time (NTS) {#net-nts}

Checks that chrony takes the time from servers it can authenticate (NTS), and adds them.

- **ID**: `net.nts`, **Version**: 0.1.0, **Category**: network, **Kinds**: check, control, **Origin**: official
- **On by default**: yes
- **May read**: `/etc/chrony.conf`, `/etc/chrony`, `/etc/chrony.d`, `/etc/chrony-ibexwall`, `/usr/sbin/chronyd`, `/usr/bin/chronyd`, `/usr/lib/systemd/system`, `/etc/systemd/system`, `/run/chrony`, `/etc/os-release`, `/usr/lib/systemd/system/systemd-timesyncd.service`, `/lib/systemd/system/systemd-timesyncd.service`, `/usr/sbin/ntpd`, `/usr/bin/ntpd`
- **May write**: `/etc/chrony.d`, `/etc/chrony/conf.d`, `/etc/chrony-ibexwall`, `/etc/systemd/system/chronyd.service.d`
- **May manage these services**: `chronyd.service`, `chrony.service`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no
- **Can affect**: time

**Worth knowing before you turn it on**

- NTS asks each server for keys on TCP port 4460 first. A firewall that blocks it keeps the clock on its other sources.
- Time comes from the chosen servers in addition to the ones already set; IbexWall does not remove the distro's own.

## VPN and kill switch {#net-vpn}

Imports WireGuard profiles into NetworkManager and blocks all traffic outside the tunnel if it drops.

- **ID**: `net.vpn`, **Version**: 0.1.0, **Category**: network, **Kinds**: check, control, **Origin**: official
- **On by default**: no
- **May read**: `/etc/ibexwall/vpn`, `/etc/ibexwall/dns`, `/usr/lib/NetworkManager/VPN`, `/usr/lib64/NetworkManager/VPN`, `/etc/NetworkManager/VPN`, `/usr/lib/systemd/system`, `/lib/systemd/system`, `/etc/systemd/system`, `/usr/bin`
- **May write**: `/etc/NetworkManager/system-connections`, `/etc/ibexwall/vpn`
- **May ask the core to run**: `/usr/bin/nmcli connection reload`
- **May change the firewall**: `net_vpn` 
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no
- **Can affect**: network

**Worth knowing before you turn it on**

- Traffic outside the tunnel is blocked while the kill switch is on.
- Printers and other devices on your local network stop answering unless you allow their addresses.

## Wi-Fi privacy {#net-wifi}

Checks that Wi-Fi uses a changed hardware address and that open networks are not remembered, and sets the address.

- **ID**: `net.wifi`, **Version**: 0.1.0, **Category**: network, **Kinds**: check, control, **Origin**: official
- **On by default**: yes
- **May read**: `/etc/NetworkManager`, `/usr/lib/NetworkManager`, `/usr/sbin/NetworkManager`, `/usr/bin/NetworkManager`, `/run/NetworkManager`
- **May write**: `/etc/NetworkManager/conf.d`
- **May manage these services**: `NetworkManager.service`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no
- **Can affect**: network

**Worth knowing before you turn it on**

- Networks that remember a device by its address (hotel and airport sign-in pages, address filters) will treat this computer as new on each network.
- Home routers that allow only known addresses will refuse it until you allow the new one.

## Camera and microphone {#privacy-camera-mic}

Shows which programs are using the camera or the microphone right now.

- **ID**: `privacy.camera-mic`, **Version**: 0.1.0, **Category**: privacy, **Kinds**: check, **Origin**: official
- **On by default**: no
- **May read**: `/proc`, `/dev`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, `CAP_SYS_PTRACE`, **Network access from the plugin**: no

## Telemetry {#privacy-telemetry}

Lists the usage reporting the distribution and some apps send, so you can decide about it.

- **ID**: `privacy.telemetry`, **Version**: 0.1.0, **Category**: privacy, **Kinds**: check, **Origin**: official
- **On by default**: no
- **May read**: `/etc`, `/usr/bin`, `/usr/sbin`, `/usr/lib`, `/usr/lib64`
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no

## Accounts {#system-accounts}

Checks for accounts without a password, extra administrator accounts and sign-in lockout.

- **ID**: `system.accounts`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, **Origin**: official
- **On by default**: yes
- **May read**: `/etc/passwd`, `/etc/shadow`, `/etc/security`, `/etc/pam.d`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no

## AI assistants {#system-assistant}

What an AI assistant may read, plan or propose, and the access tokens for assistants on other machines.

- **ID**: `system.assistant`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, control, **Origin**: official
- **On by default**: yes
- **May read**: `/etc/ibexwall/mcp.toml`, `/etc/ibexwall/mcp`
- **May write**: `/etc/ibexwall/mcp.toml`, `/etc/ibexwall/mcp`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no
- **Can affect**: assistants

**Worth knowing before you turn it on**

- Turning remote access on opens a port that answers only to a valid token, over TLS. Assistants can read and, if you allow it, propose; they can never apply a change.

## Security audit {#system-audit}

Shows the warnings and suggestions of Lynis when it is installed. IbexWall does not bundle or run it.

- **ID**: `system.audit`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, **Origin**: official
- **On by default**: no
- **May read**: `/var/log/lynis-report.dat`, `/usr/bin/lynis`, `/usr/sbin/lynis`, `/usr/share/lynis`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no

## Core dumps {#system-coredump}

Checks whether crash dumps (which can hold passwords and keys) are stored, and turns storage off.

- **ID**: `system.coredump`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, control, **Origin**: official
- **On by default**: yes
- **May read**: `/proc/sys/kernel`, `/etc/systemd`, `/usr/lib/systemd`
- **May write**: `/etc/systemd/coredump.conf.d`
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no
- **Can affect**: diagnostics

**Worth knowing before you turn it on**

- Crash reports and post-mortem debugging (coredumpctl) will have nothing to work with.

## Firmware {#system-firmware}

Checks that the firmware update service (fwupd) is installed and refreshing its list.

- **ID**: `system.firmware`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, control, **Origin**: official
- **On by default**: yes
- **May read**: `/sys/class/dmi/id`, `/usr/libexec/fwupd`, `/usr/lib/fwupd`, `/usr/lib/systemd/system`, `/etc/systemd/system`
- **May manage these services**: `fwupd-refresh.timer`
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no
- **Can affect**: firmware

## Hardening {#system-hardening}

Tells which of the recommended hardening settings this machine already has. It changes nothing; each setting is applied through the plugin that owns it.

- **ID**: `system.hardening`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, **Origin**: official
- **On by default**: yes
- **May read**: `/proc/sys`, `/proc/mounts`, `/etc/modprobe.d`, `/usr/lib/modprobe.d`
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no

## Kernel modules {#system-modules}

Stops groups of rarely needed kernel modules from being loaded, which shrinks what an attacker can reach through the kernel.

- **ID**: `system.modules`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, control, **Origin**: official
- **On by default**: yes
- **May read**: `/etc/modprobe.d`, `/usr/lib/modprobe.d`, `/proc/modules`
- **May write**: `/etc/modprobe.d`
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no
- **Can affect**: kernel

**Worth knowing before you turn it on**

- Modules that are already loaded stay loaded until the next restart. A program that needs one of the blocked modules will fail to start it.

## Temporary mounts {#system-mounts}

Checks that /tmp and /dev/shm cannot run programs or hold setuid files, and sets it for the next boot.

- **ID**: `system.mounts`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, control, **Origin**: official
- **On by default**: yes
- **May read**: `/proc/mounts`, `/etc/systemd/system`, `/usr/lib/systemd/system`
- **May write**: `/etc/systemd/system/tmp.mount.d`, `/etc/systemd/system/dev-shm.mount.d`
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no
- **Can affect**: boot

**Worth knowing before you turn it on**

- Programs that unpack and run code from a temporary folder (some installers, builds and games) may stop working.
- The new options apply at the next boot; nothing is remounted now, so there is nothing to undo live.

## Security profile check (OpenSCAP) {#system-openscap}

Checks this computer against a published security profile (for example ANSSI or CIS) with OpenSCAP and lists the rules that fail. It changes nothing.

- **ID**: `system.openscap`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, control, **Origin**: official
- **On by default**: no
- **May read**: `/var/lib/ibexwall/openscap`, `/usr/share/xml/scap/ssg/content`, `/usr/bin`, `/etc/os-release`, `/etc/systemd/system`
- **May write**: `/etc/systemd/system/ibexwall-openscap-scan.service`, `/etc/systemd/system/ibexwall-openscap-scan.timer`, `/var/lib/ibexwall/openscap/.managed`
- **May manage these services**: `ibexwall-openscap-scan.service`, `ibexwall-openscap-scan.timer`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no
- **Can affect**: performance

**Worth knowing before you turn it on**

- The check reads many files and settings and can slow the computer while it runs. It changes nothing.

## Exposed ports {#system-ports}

Lists services that accept connections from other computers.

- **ID**: `system.ports`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, **Origin**: official
- **On by default**: yes
- **May read**: `/proc/net`
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no

## System posture {#system-posture}

Checks how well this computer is protected: boot, disk, firewall and accounts.

- **ID**: `system.posture`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, **Origin**: official
- **On by default**: yes
- **May read**: `/sys`, `/proc`, `/etc`, `/run/systemd`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no

## Screen lock {#system-session-lock}

Checks that the desktop locks the screen by itself when you step away.

- **ID**: `system.session-lock`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, **Origin**: official
- **On by default**: no
- **May read**: `/etc/dconf`, `/home`, `/usr/bin`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no

## SSH server {#system-ssh}

Checks the SSH server's settings (root login, empty passwords, forwarding) and tightens them with a drop-in.

- **ID**: `system.ssh`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, control, **Origin**: official
- **On by default**: yes
- **May read**: `/etc/ssh`, `/usr/sbin/sshd`, `/usr/lib/systemd/system`, `/run`
- **May write**: `/etc/ssh/sshd_config.d`
- **May manage these services**: `sshd.service`, `ssh.service`
- **May ask the core to run**: `/usr/sbin/sshd -t`
- **Runs as**: a dynamic user, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no
- **Can affect**: remote-access

**Worth knowing before you turn it on**

- Signing in as root over SSH with a password stops working. Use a normal user and sudo, or a key.
- With passwords off, only users with an authorized key can sign in. Check yours first or you can lock yourself out.

## Kernel hardening {#system-sysctl}

Checks the kernel's security settings against the reference table, and applies them.

- **ID**: `system.sysctl`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, control, **Origin**: official
- **On by default**: yes
- **May read**: `/proc/sys`, `/etc/sysctl.d`
- **May write**: `/etc/sysctl.d`
- **May change these kernel settings**: `kernel.kptr_restrict`, `kernel.dmesg_restrict`, `kernel.yama.ptrace_scope`, `kernel.unprivileged_bpf_disabled`, `net.core.bpf_jit_harden`, `fs.protected_symlinks`, `fs.protected_hardlinks`, `fs.protected_fifos`, `fs.protected_regular`, `fs.suid_dumpable`, `kernel.kexec_load_disabled`, `net.ipv4.conf.all.accept_redirects`, `net.ipv4.conf.all.send_redirects`, `net.ipv4.conf.all.accept_source_route`, `net.ipv6.conf.all.accept_redirects`, `net.ipv4.tcp_syncookies`, `dev.tty.ldisc_autoload`, `vm.unprivileged_userfaultfd`, `net.ipv4.conf.all.rp_filter`, `kernel.sysrq`, `kernel.perf_event_paranoid`, `net.ipv4.tcp_rfc1337`, `net.ipv4.conf.all.secure_redirects`, `net.ipv4.conf.default.accept_redirects`, `net.ipv4.conf.default.secure_redirects`, `net.ipv4.conf.default.send_redirects`, `net.ipv6.conf.default.accept_redirects`, `net.ipv4.conf.default.accept_source_route`, `net.ipv6.conf.all.accept_source_route`, `net.ipv6.conf.default.accept_source_route`, `net.ipv4.conf.default.rp_filter`, `net.ipv6.conf.all.accept_ra`, `net.ipv6.conf.default.accept_ra`, `net.ipv4.tcp_sack`, `user.max_user_namespaces`
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no
- **Can affect**: kernel

**Worth knowing before you turn it on**

- Attaching a debugger to an already running program (gdb, strace) stops working.
- Programs that load eBPF without privileges stop working. IbexWall is not affected: it runs privileged.
- Cannot be undone without a reboot: kexec loading stays disabled until then.
- May break VPNs and machines with several network routes.
- The SysRq emergency keys stop working.
- IPv6 addresses and routes that your router announces are no longer accepted, so IPv6 may stop working on networks that rely on them.
- Downloads can be slower on lossy connections.
- Programs that build their own sandbox without privileges stop working: Flatpak, Chromium and Firefox sandboxes, rootless containers.

## Automatic updates {#system-updates}

Checks that security updates install themselves, and turns it on when the distro's tool is installed.

- **ID**: `system.updates`, **Version**: 0.1.0, **Category**: system, **Kinds**: check, control, **Origin**: official
- **On by default**: yes
- **May read**: `/etc/os-release`, `/etc/apt`, `/etc/dnf`, `/etc/systemd/system`, `/usr/lib/systemd/system`, `/usr/bin`, `/usr/lib/os-release`
- **May write**: `/etc/apt/apt.conf.d`, `/etc/dnf/dnf5-plugins/automatic.d`
- **May manage these services**: `dnf5-automatic.timer`, `apt-daily-upgrade.timer`
- **Runs as**: a dynamic user, **Capabilities**: none, **Network access from the plugin**: no
- **Can affect**: updates

**Worth knowing before you turn it on**

- Services may restart when they are updated, and some updates ask for a reboot.

## Known vulnerabilities {#vuln-cves}

Lists the security updates your distribution has published for installed packages. Works offline from the package manager's own cache; nothing is sent anywhere.

- **ID**: `vuln.cves`, **Version**: 0.1.0, **Category**: vuln, **Kinds**: check, **Origin**: official
- **On by default**: no
- **May read**: `/var/cache`, `/var/lib`, `/etc`, `/usr`
- **Runs as**: root, **Capabilities**: `CAP_DAC_READ_SEARCH`, **Network access from the plugin**: no
- **Needs**: `dnf5`, `apt-get`, `arch-audit`
