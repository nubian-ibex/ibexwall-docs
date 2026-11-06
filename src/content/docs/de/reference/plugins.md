---
title: "Plugin-Katalog"
description: "Alle offiziellen Plugins: wofür sie da sind, was sie lesen und ändern dürfen, wie sie abgeschottet sind und was sie beeinflussen können."
sidebar:
  order: 1
---

Die zweiunddreißig offiziellen Plugins. Jedes schlägt nur vor und wendet nie an: Der Kern wendet an, über einen Plan, einen Sicherungspunkt und Ihre Zustimmung. Die Liste unten wird aus den Plugin-Manifesten erzeugt, ist also das, was der Daemon durchsetzt.

## Flatpak-Netzwerkzugriff {#apps-flatpak-network}

Sperrt den Netzwerkzugriff einer Flatpak-App mit einer umkehrbaren Überschreibung.

- **ID**: `apps.flatpak-network`, **Version**: 0.1.0, **Kategorie**: apps, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/var/lib/flatpak/app`, `/var/lib/flatpak/overrides`
- **Darf schreiben**: `/var/lib/flatpak/overrides`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: network

**Gut zu wissen, bevor Sie es einschalten**

- Die App funktioniert nicht mehr, wenn sie das Netzwerk benötigt.
- Updates und Anmeldung innerhalb der App funktionieren nicht mehr.

## Flatpak-Berechtigungen {#apps-flatpak-perms}

Listet Flatpak-Apps auf, die Ihre Dateien, Geräte oder die eigenen Steuerungen der Sandbox erreichen können.

- **ID**: `apps.flatpak-perms`, **Version**: 0.1.0, **Kategorie**: apps, **Arten**: Prüfung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/var/lib/flatpak`, `/home`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein

## USB-Schutz {#device-usb}

Prüft, ob neue USB-Geräte blockiert sind, bis Sie sie erlauben (USBGuard), und erstellt die Erlaubnisliste aus dem, was gerade angeschlossen ist.

- **ID**: `device.usb`, **Version**: 0.1.0, **Kategorie**: device, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/sys/bus/usb/devices`, `/etc/usbguard`, `/usr/sbin/usbguard-daemon`, `/usr/bin/usbguard-daemon`, `/etc/systemd/system`, `/usr/lib/systemd/system`
- **Darf schreiben**: `/etc/usbguard/rules.d`
- **Darf diese Dienste verwalten**: `usbguard.service`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: usb

**Gut zu wissen, bevor Sie es einschalten**

- Geräte, die Sie später anschließen, bleiben blockiert, bis Sie sie mit usbguard erlauben. Jetzt angeschlossene Tastaturen und Mäuse sind erlaubt, damit Sie sich nicht aussperren.

## Virenschutz {#endpoint-av}

Scannt Ordner auf Anforderung oder nach Zeitplan mit ClamAV und YARA und meldet, was gefunden wird.

- **ID**: `endpoint.av`, **Version**: 0.1.0, **Kategorie**: endpoint, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/sys/fs/selinux`, `/var/lib/ibexwall/av`, `/etc/ibexwall/av`, `/usr/bin`, `/var/lib/clamav`, `/usr/share/clamav`, `/etc/systemd/system`
- **Darf schreiben**: `/etc/systemd/system/ibexwall-av-scan.service`, `/etc/systemd/system/ibexwall-av-scan.timer`, `/etc/ibexwall/av`, `/var/lib/ibexwall/av/.managed`
- **Darf diese Dienste verwalten**: `ibexwall-av-scan.service`, `ibexwall-av-scan.timer`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: performance

**Gut zu wissen, bevor Sie es einschalten**

- Ein Scan liest viele Dateien und verlangsamt den Computer, solange er läuft.

## Dateiintegrität {#endpoint-integrity}

Fragt die Paketverwaltung, welche installierten Dateien nicht dem Auslieferungszustand entsprechen, und AIDE, wenn es eingerichtet ist.

- **ID**: `endpoint.integrity`, **Version**: 0.1.0, **Kategorie**: endpoint, **Arten**: Prüfung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/var/lib/rpm`, `/usr/lib/sysimage/rpm`, `/var/lib/dpkg`, `/var/lib/pacman`, `/var/lib/aide`, `/usr/bin`, `/usr/sbin`, `/bin`, `/sbin`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein

## Notfallmodus {#endpoint-isolate}

Trennt das Netzwerk bis auf die Adressen, die Sie nennen, und wird im Verlauf rückgängig gemacht.

- **ID**: `endpoint.isolate`, **Version**: 0.1.0, **Kategorie**: endpoint, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/etc/ibexwall/isolate`
- **Darf schreiben**: `/etc/ibexwall/isolate`
- **Darf die Firewall ändern**: `endpoint_isolate` 
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: network

**Gut zu wissen, bevor Sie es einschalten**

- Alles, was das Netzwerk nutzt, hört auf zu funktionieren, außer den Adressen, die Sie erlaubt haben.
- Eine Fernsitzung (SSH, Remote-Desktop) wird getrennt, wenn ihre Adresse nicht erlaubt ist.
- Updates, Backups und Synchronisierung pausieren, bis die Änderung rückgängig gemacht wird.

## Persistenz {#endpoint-persistence}

Überwacht die Stellen, über die sich ein Programm auf diesem Computer halten kann (Units, cron, Autostart, Shell-Start, LD_PRELOAD), und meldet, was sich geändert hat.

- **ID**: `endpoint.persistence`, **Version**: 0.1.0, **Kategorie**: endpoint, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/etc/systemd/system`, `/usr/lib/systemd/system`, `/etc/cron.d`, `/etc/cron.daily`, `/etc/cron.hourly`, `/etc/cron.weekly`, `/etc/cron.monthly`, `/etc/crontab`, `/var/spool/cron`, `/etc/xdg/autostart`, `/home`, `/root`, `/etc/ld.so.preload`, `/etc/profile`, `/etc/profile.d`, `/etc/bash.bashrc`, `/etc/bashrc`, `/var/lib/ibexwall/persistence`
- **Darf schreiben**: `/var/lib/ibexwall/persistence`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein

## Rootkit-Scan {#endpoint-rootkit}

Führt rkhunter und chkrootkit auf Anforderung oder nach Zeitplan aus und meldet, was sie markieren. Ihre Warnungen müssen von einem Menschen geprüft werden: Sie sind kein Beweis.

- **ID**: `endpoint.rootkit`, **Version**: 0.1.0, **Kategorie**: endpoint, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/var/lib/ibexwall/rootkit`, `/usr/bin`, `/usr/sbin`, `/etc/os-release`, `/etc/systemd/system`
- **Darf schreiben**: `/etc/systemd/system/ibexwall-rootkit-scan.service`, `/etc/systemd/system/ibexwall-rootkit-scan.timer`, `/var/lib/ibexwall/rootkit/.managed`
- **Darf diese Dienste verwalten**: `ibexwall-rootkit-scan.service`, `ibexwall-rootkit-scan.timer`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: performance

**Gut zu wissen, bevor Sie es einschalten**

- Der Scan liest den Großteil des Systems und kann den Computer verlangsamen, solange er läuft.

## Sicheres DNS {#net-dns}

Verschlüsselt DNS-Abfragen, blockiert Tracker und Malware-Domains und hindert Browser daran, es zu umgehen.

- **ID**: `net.dns`, **Version**: 0.1.0, **Kategorie**: network, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/etc/resolv.conf`, `/etc/systemd/resolved.conf`, `/etc/systemd/resolved.conf.d`, `/usr/sbin`, `/run/systemd/resolve`, `/run/systemd/netif`, `/run/NetworkManager`, `/etc/ibexwall/dns`, `/proc/net/udp`, `/etc/passwd`, `/usr/bin`, `/etc/os-release`, `/etc/dnscrypt-proxy`, `/etc/dnscrypt-proxy.toml`, `/run/systemd/units`, `/etc/systemd/system`, `/usr/lib/systemd/system/dnscrypt-proxy.socket`
- **Darf schreiben**: `/etc/ibexwall/dns`, `/etc/systemd/resolved.conf`, `/etc/systemd/resolved.conf.d`, `/usr/sbin`, `/usr/bin`, `/etc/firefox/policies`, `/etc/opt/chrome/policies/managed`, `/etc/chromium/policies/managed`, `/etc/chromium-browser/policies/managed`, `/etc/brave/policies/managed`, `/etc/opt/edge/policies/managed`
- **Darf diese Dienste verwalten**: `ibexwall-dns.service`, `systemd-resolved.service`
- **Darf die Firewall ändern**: `net_dns` 
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: network

**Gut zu wissen, bevor Sie es einschalten**

- Anmeldeseiten von Captive Portals (Hotels, Flughäfen) werden möglicherweise nicht geladen.
- VPN-Clients, die ihr eigenes DNS setzen, werden möglicherweise überschrieben.
- Split-DNS in Firmennetzen (interne Namen) wird möglicherweise nicht mehr aufgelöst.

## Offene Ports, mit nmap betrachtet {#net-exposure}

Scannt die eigenen Adressen dieses Computers (nie einen anderen Rechner) mit nmap und listet auf, welche TCP-Ports antworten, zum Vergleich mit dem, was Sie erwarten.

- **ID**: `net.exposure`, **Version**: 0.1.0, **Kategorie**: net, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/var/lib/ibexwall/exposure`, `/proc/net`, `/usr/bin`, `/etc/os-release`, `/etc/systemd/system`
- **Darf schreiben**: `/etc/systemd/system/ibexwall-exposure-scan.service`, `/etc/systemd/system/ibexwall-exposure-scan.timer`, `/var/lib/ibexwall/exposure/.managed`
- **Darf diese Dienste verwalten**: `ibexwall-exposure-scan.service`, `ibexwall-exposure-scan.timer`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: network

**Gut zu wissen, bevor Sie es einschalten**

- Der Scan öffnet eine Verbindung zu jedem Port der eigenen Adressen dieses Computers, daher listen Dienste, die Verbindungen protokollieren, sie auf.

## Firewall {#net-firewall}

Steuert, welche Verbindungen diesen Computer erreichen können, über die Firewall, die Ihr System bereits verwendet.

- **ID**: `net.firewall`, **Version**: 0.1.0, **Kategorie**: network, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/etc/firewalld`, `/usr/lib/firewalld`, `/etc/ufw`, `/etc/ibexwall/firewall`, `/run/systemd/units`, `/proc/net`, `/etc/os-release`, `/usr/sbin`, `/usr/bin`
- **Darf schreiben**: `/etc/ibexwall/firewall`
- **Darf die Firewall ändern**: `net_firewall` `firewalld`, `ufw`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: network

**Gut zu wissen, bevor Sie es einschalten**

- Fernzugriff, etwa per SSH, funktioniert nicht mehr, wenn er nicht erlaubt ist.
- Dienste, die andere Computer auf diesem nutzen, etwa Dateifreigabe, funktionieren nicht mehr.
- Container- und Netzwerke virtueller Maschinen funktionieren bei manchen Konfigurationen möglicherweise nicht mehr.

## Sichere Zeit (NTS) {#net-nts}

Prüft, ob chrony die Zeit von Servern bezieht, die es authentifizieren kann (NTS), und fügt solche hinzu.

- **ID**: `net.nts`, **Version**: 0.1.0, **Kategorie**: network, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/etc/chrony.conf`, `/etc/chrony`, `/etc/chrony.d`, `/etc/chrony-ibexwall`, `/usr/sbin/chronyd`, `/usr/bin/chronyd`, `/usr/lib/systemd/system`, `/etc/systemd/system`, `/run/chrony`, `/etc/os-release`, `/usr/lib/systemd/system/systemd-timesyncd.service`, `/lib/systemd/system/systemd-timesyncd.service`, `/usr/sbin/ntpd`, `/usr/bin/ntpd`
- **Darf schreiben**: `/etc/chrony.d`, `/etc/chrony/conf.d`, `/etc/chrony-ibexwall`, `/etc/systemd/system/chronyd.service.d`
- **Darf diese Dienste verwalten**: `chronyd.service`, `chrony.service`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: time

**Gut zu wissen, bevor Sie es einschalten**

- NTS fragt zuerst bei jedem Server auf TCP-Port 4460 nach Schlüsseln. Eine Firewall, die ihn blockiert, lässt die Uhr bei ihren anderen Quellen.
- Die Zeit kommt zusätzlich zu den bereits eingestellten von den gewählten Servern; IbexWall entfernt die der Distribution nicht.

## VPN und Kill Switch {#net-vpn}

Importiert WireGuard-Profile in NetworkManager und blockiert den gesamten Datenverkehr außerhalb des Tunnels, wenn dieser abbricht.

- **ID**: `net.vpn`, **Version**: 0.1.0, **Kategorie**: network, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/etc/ibexwall/vpn`, `/etc/ibexwall/dns`, `/usr/lib/NetworkManager/VPN`, `/usr/lib64/NetworkManager/VPN`, `/etc/NetworkManager/VPN`, `/usr/lib/systemd/system`, `/lib/systemd/system`, `/etc/systemd/system`, `/usr/bin`
- **Darf schreiben**: `/etc/NetworkManager/system-connections`, `/etc/ibexwall/vpn`
- **Darf den Kern bitten auszuführen**: `/usr/bin/nmcli connection reload`
- **Darf die Firewall ändern**: `net_vpn` 
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: network

**Gut zu wissen, bevor Sie es einschalten**

- Datenverkehr außerhalb des Tunnels wird blockiert, solange der Kill Switch an ist.
- Drucker und andere Geräte in Ihrem lokalen Netzwerk antworten nicht mehr, es sei denn, Sie erlauben ihre Adressen.

## WLAN-Datenschutz {#net-wifi}

Prüft, ob das WLAN eine geänderte Hardware-Adresse verwendet und offene Netzwerke nicht gespeichert werden, und setzt die Adresse.

- **ID**: `net.wifi`, **Version**: 0.1.0, **Kategorie**: network, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/etc/NetworkManager`, `/usr/lib/NetworkManager`, `/usr/sbin/NetworkManager`, `/usr/bin/NetworkManager`, `/run/NetworkManager`
- **Darf schreiben**: `/etc/NetworkManager/conf.d`
- **Darf diese Dienste verwalten**: `NetworkManager.service`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: network

**Gut zu wissen, bevor Sie es einschalten**

- Netzwerke, die sich ein Gerät anhand seiner Adresse merken (Anmeldeseiten in Hotels und Flughäfen, Adressfilter), behandeln diesen Computer in jedem Netzwerk als neu.
- Heimrouter, die nur bekannte Adressen zulassen, lehnen ihn ab, bis Sie die neue erlauben.

## Kamera und Mikrofon {#privacy-camera-mic}

Zeigt, welche Programme gerade die Kamera oder das Mikrofon verwenden.

- **ID**: `privacy.camera-mic`, **Version**: 0.1.0, **Kategorie**: privacy, **Arten**: Prüfung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/proc`, `/dev`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, `CAP_SYS_PTRACE`, **Netzwerkzugriff des Plugins**: nein

## Telemetrie {#privacy-telemetry}

Listet die Nutzungsberichte auf, die die Distribution und einige Apps senden, damit Sie darüber entscheiden können.

- **ID**: `privacy.telemetry`, **Version**: 0.1.0, **Kategorie**: privacy, **Arten**: Prüfung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/etc`, `/usr/bin`, `/usr/sbin`, `/usr/lib`, `/usr/lib64`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein

## Konten {#system-accounts}

Prüft auf Konten ohne Passwort, zusätzliche Administratorkonten und die Sperre bei fehlgeschlagenen Anmeldungen.

- **ID**: `system.accounts`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/etc/passwd`, `/etc/shadow`, `/etc/security`, `/etc/pam.d`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein

## KI-Assistenten {#system-assistant}

Was ein KI-Assistent lesen, planen oder vorschlagen darf, und die Zugriffstoken für Assistenten auf anderen Rechnern.

- **ID**: `system.assistant`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/etc/ibexwall/mcp.toml`, `/etc/ibexwall/mcp`
- **Darf schreiben**: `/etc/ibexwall/mcp.toml`, `/etc/ibexwall/mcp`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: assistants

**Gut zu wissen, bevor Sie es einschalten**

- Das Einschalten des Fernzugriffs öffnet einen Port, der nur auf ein gültiges Token über TLS antwortet. Assistenten können lesen und, wenn Sie es erlauben, Vorschläge machen; sie können nie eine Änderung anwenden.

## Sicherheitsaudit {#system-audit}

Zeigt die Warnungen und Vorschläge von Lynis, wenn es installiert ist. IbexWall bringt es nicht mit und führt es nicht aus.

- **ID**: `system.audit`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/var/log/lynis-report.dat`, `/usr/bin/lynis`, `/usr/sbin/lynis`, `/usr/share/lynis`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein

## Core Dumps {#system-coredump}

Prüft, ob Absturzabbilder (die Passwörter und Schlüssel enthalten können) gespeichert werden, und schaltet das Speichern aus.

- **ID**: `system.coredump`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/proc/sys/kernel`, `/etc/systemd`, `/usr/lib/systemd`
- **Darf schreiben**: `/etc/systemd/coredump.conf.d`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: diagnostics

**Gut zu wissen, bevor Sie es einschalten**

- Absturzberichte und nachträgliche Fehlersuche (coredumpctl) haben nichts mehr, womit sie arbeiten können.

## Firmware {#system-firmware}

Prüft, ob der Firmware-Update-Dienst (fwupd) installiert ist und seine Liste aktualisiert.

- **ID**: `system.firmware`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/sys/class/dmi/id`, `/usr/libexec/fwupd`, `/usr/lib/fwupd`, `/usr/lib/systemd/system`, `/etc/systemd/system`
- **Darf diese Dienste verwalten**: `fwupd-refresh.timer`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: firmware

## Härtung {#system-hardening}

Zeigt, welche der empfohlenen Härtungseinstellungen dieser Rechner bereits hat. Es ändert nichts; jede Einstellung wird über das Plugin angewendet, dem sie gehört.

- **ID**: `system.hardening`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/proc/sys`, `/proc/mounts`, `/etc/modprobe.d`, `/usr/lib/modprobe.d`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein

## Kernel-Module {#system-modules}

Verhindert das Laden von Gruppen selten benötigter Kernel-Module, was verkleinert, was ein Angreifer über den Kernel erreichen kann.

- **ID**: `system.modules`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/etc/modprobe.d`, `/usr/lib/modprobe.d`, `/proc/modules`
- **Darf schreiben**: `/etc/modprobe.d`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: kernel

**Gut zu wissen, bevor Sie es einschalten**

- Module, die bereits geladen sind, bleiben bis zum nächsten Neustart geladen. Ein Programm, das eines der blockierten Module braucht, kann es nicht starten.

## Temporäre Einhängepunkte {#system-mounts}

Prüft, ob /tmp und /dev/shm keine Programme ausführen oder setuid-Dateien enthalten können, und legt es für den nächsten Start fest.

- **ID**: `system.mounts`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/proc/mounts`, `/etc/systemd/system`, `/usr/lib/systemd/system`
- **Darf schreiben**: `/etc/systemd/system/tmp.mount.d`, `/etc/systemd/system/dev-shm.mount.d`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: boot

**Gut zu wissen, bevor Sie es einschalten**

- Programme, die Code aus einem temporären Ordner entpacken und ausführen (manche Installer, Builds und Spiele), funktionieren möglicherweise nicht mehr.
- Die neuen Optionen gelten ab dem nächsten Start; jetzt wird nichts neu eingehängt, daher gibt es nichts, was sich im laufenden Betrieb rückgängig machen ließe.

## Prüfung des Sicherheitsprofils (OpenSCAP) {#system-openscap}

Prüft diesen Computer mit OpenSCAP gegen ein veröffentlichtes Sicherheitsprofil (zum Beispiel ANSSI oder CIS) und listet die nicht erfüllten Regeln auf. Es ändert nichts.

- **ID**: `system.openscap`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/var/lib/ibexwall/openscap`, `/usr/share/xml/scap/ssg/content`, `/usr/bin`, `/etc/os-release`, `/etc/systemd/system`
- **Darf schreiben**: `/etc/systemd/system/ibexwall-openscap-scan.service`, `/etc/systemd/system/ibexwall-openscap-scan.timer`, `/var/lib/ibexwall/openscap/.managed`
- **Darf diese Dienste verwalten**: `ibexwall-openscap-scan.service`, `ibexwall-openscap-scan.timer`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: performance

**Gut zu wissen, bevor Sie es einschalten**

- Die Prüfung liest viele Dateien und Einstellungen und kann den Computer verlangsamen, solange sie läuft. Sie ändert nichts.

## Offene Ports {#system-ports}

Listet Dienste auf, die Verbindungen von anderen Computern annehmen.

- **ID**: `system.ports`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/proc/net`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein

## Systemzustand {#system-posture}

Prüft, wie gut dieser Computer geschützt ist: Start, Festplatte, Firewall und Konten.

- **ID**: `system.posture`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/sys`, `/proc`, `/etc`, `/run/systemd`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein

## Bildschirmsperre {#system-session-lock}

Prüft, ob der Desktop den Bildschirm von selbst sperrt, wenn Sie weggehen.

- **ID**: `system.session-lock`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/etc/dconf`, `/home`, `/usr/bin`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein

## SSH-Server {#system-ssh}

Prüft die Einstellungen des SSH-Servers (root-Anmeldung, leere Passwörter, Weiterleitung) und verschärft sie mit einer Drop-in-Datei.

- **ID**: `system.ssh`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/etc/ssh`, `/usr/sbin/sshd`, `/usr/lib/systemd/system`, `/run`
- **Darf schreiben**: `/etc/ssh/sshd_config.d`
- **Darf diese Dienste verwalten**: `sshd.service`, `ssh.service`
- **Darf den Kern bitten auszuführen**: `/usr/sbin/sshd -t`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: remote-access

**Gut zu wissen, bevor Sie es einschalten**

- Die Anmeldung als root über SSH mit einem Passwort funktioniert nicht mehr. Verwenden Sie einen normalen Benutzer und sudo oder einen Schlüssel.
- Wenn Passwörter ausgeschaltet sind, können sich nur Benutzer mit einem autorisierten Schlüssel anmelden. Prüfen Sie zuerst Ihren eigenen, sonst sperren Sie sich möglicherweise aus.

## Kernel-Härtung {#system-sysctl}

Prüft die Sicherheitseinstellungen des Kernels gegen die Referenztabelle und wendet sie an.

- **ID**: `system.sysctl`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/proc/sys`, `/etc/sysctl.d`
- **Darf schreiben**: `/etc/sysctl.d`
- **Darf diese Kernel-Einstellungen ändern**: `kernel.kptr_restrict`, `kernel.dmesg_restrict`, `kernel.yama.ptrace_scope`, `kernel.unprivileged_bpf_disabled`, `net.core.bpf_jit_harden`, `fs.protected_symlinks`, `fs.protected_hardlinks`, `fs.protected_fifos`, `fs.protected_regular`, `fs.suid_dumpable`, `kernel.kexec_load_disabled`, `net.ipv4.conf.all.accept_redirects`, `net.ipv4.conf.all.send_redirects`, `net.ipv4.conf.all.accept_source_route`, `net.ipv6.conf.all.accept_redirects`, `net.ipv4.tcp_syncookies`, `dev.tty.ldisc_autoload`, `vm.unprivileged_userfaultfd`, `net.ipv4.conf.all.rp_filter`, `kernel.sysrq`, `kernel.perf_event_paranoid`, `net.ipv4.tcp_rfc1337`, `net.ipv4.conf.all.secure_redirects`, `net.ipv4.conf.default.accept_redirects`, `net.ipv4.conf.default.secure_redirects`, `net.ipv4.conf.default.send_redirects`, `net.ipv6.conf.default.accept_redirects`, `net.ipv4.conf.default.accept_source_route`, `net.ipv6.conf.all.accept_source_route`, `net.ipv6.conf.default.accept_source_route`, `net.ipv4.conf.default.rp_filter`, `net.ipv6.conf.all.accept_ra`, `net.ipv6.conf.default.accept_ra`, `net.ipv4.tcp_sack`, `user.max_user_namespaces`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: kernel

**Gut zu wissen, bevor Sie es einschalten**

- Das Anhängen eines Debuggers an ein bereits laufendes Programm (gdb, strace) funktioniert nicht mehr.
- Programme, die eBPF ohne Rechte laden, funktionieren nicht mehr. IbexWall ist nicht betroffen: Es läuft mit Rechten.
- Lässt sich ohne Neustart nicht rückgängig machen: Das Laden mit kexec bleibt bis dahin deaktiviert.
- Kann VPNs und Rechner mit mehreren Netzwerkrouten beeinträchtigen.
- Die SysRq-Notfalltasten funktionieren nicht mehr.
- IPv6-Adressen und -Routen, die Ihr Router ankündigt, werden nicht mehr akzeptiert, daher funktioniert IPv6 in Netzwerken, die darauf angewiesen sind, möglicherweise nicht mehr.
- Downloads können bei verlustbehafteten Verbindungen langsamer sein.
- Programme, die ohne Rechte ihre eigene Sandbox aufbauen, funktionieren nicht mehr: Flatpak, die Sandboxes von Chromium und Firefox, Rootless-Container.

## Automatische Updates {#system-updates}

Prüft, ob sich Sicherheitsupdates selbst installieren, und schaltet dies ein, wenn das Werkzeug der Distribution installiert ist.

- **ID**: `system.updates`, **Version**: 0.1.0, **Kategorie**: system, **Arten**: Prüfung, Steuerung, **Herkunft**: official
- **Standardmäßig an**: ja
- **Darf lesen**: `/etc/os-release`, `/etc/apt`, `/etc/dnf`, `/etc/systemd/system`, `/usr/lib/systemd/system`, `/usr/bin`, `/usr/lib/os-release`
- **Darf schreiben**: `/etc/apt/apt.conf.d`, `/etc/dnf/dnf5-plugins/automatic.d`
- **Darf diese Dienste verwalten**: `dnf5-automatic.timer`, `apt-daily-upgrade.timer`
- **Läuft als**: ein dynamischer Benutzer, **Fähigkeiten**: keine, **Netzwerkzugriff des Plugins**: nein
- **Kann beeinflussen**: updates

**Gut zu wissen, bevor Sie es einschalten**

- Dienste können bei Updates neu starten, und manche Updates verlangen einen Neustart.

## Bekannte Schwachstellen {#vuln-cves}

Listet die Sicherheitsupdates auf, die Ihre Distribution für installierte Pakete veröffentlicht hat. Funktioniert offline mit dem eigenen Cache der Paketverwaltung; nichts wird irgendwohin gesendet.

- **ID**: `vuln.cves`, **Version**: 0.1.0, **Kategorie**: vuln, **Arten**: Prüfung, **Herkunft**: official
- **Standardmäßig an**: nein
- **Darf lesen**: `/var/cache`, `/var/lib`, `/etc`, `/usr`
- **Läuft als**: root, **Fähigkeiten**: `CAP_DAC_READ_SEARCH`, **Netzwerkzugriff des Plugins**: nein
- **Benötigt**: `dnf5`, `apt-get`, `arch-audit`
