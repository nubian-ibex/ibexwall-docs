---
title: "Catalogue des plugins"
description: "Tous les plugins officiels : leur rôle, ce qu’ils peuvent lire et modifier, comment ils sont isolés et ce qu’ils peuvent affecter."
sidebar:
  order: 1
---

Les trente-deux plugins officiels. Chacun propose et n’applique jamais : c’est le cœur qui applique, par un plan, un instantané et votre approbation. La liste ci-dessous est générée à partir des manifestes des plugins, c’est donc ce que le démon impose réellement.

## Accès réseau Flatpak {#apps-flatpak-network}

Coupe l'accès réseau d'une application Flatpak avec un remplacement réversible.

- **ID**: `apps.flatpak-network`, **Version**: 0.1.0, **Catégorie**: apps, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/var/lib/flatpak/app`, `/var/lib/flatpak/overrides`
- **Peut écrire**: `/var/lib/flatpak/overrides`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non
- **Peut affecter**: network

**À savoir avant de l’activer**

- L'application cesse de fonctionner si elle a besoin du réseau.
- Les mises à jour et la connexion à un compte dans l'application cessent de fonctionner.

## Permissions Flatpak {#apps-flatpak-perms}

Liste les applications Flatpak qui peuvent atteindre vos fichiers, vos appareils ou les contrôles propres au bac à sable.

- **ID**: `apps.flatpak-perms`, **Version**: 0.1.0, **Catégorie**: apps, **Types**: vérification, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/var/lib/flatpak`, `/home`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non

## Protection USB {#device-usb}

Vérifie que les nouveaux appareils USB sont bloqués jusqu'à votre autorisation (USBGuard) et construit la liste d'autorisation à partir de ce qui est branché maintenant.

- **ID**: `device.usb`, **Version**: 0.1.0, **Catégorie**: device, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/sys/bus/usb/devices`, `/etc/usbguard`, `/usr/sbin/usbguard-daemon`, `/usr/bin/usbguard-daemon`, `/etc/systemd/system`, `/usr/lib/systemd/system`
- **Peut écrire**: `/etc/usbguard/rules.d`
- **Peut gérer ces services**: `usbguard.service`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non
- **Peut affecter**: usb

**À savoir avant de l’activer**

- Les appareils que vous branchez plus tard restent bloqués tant que vous ne les autorisez pas avec usbguard. Les claviers et souris connectés maintenant sont autorisés, pour que vous ne soyez pas bloqué.

## Antimalware {#endpoint-av}

Analyse des dossiers à la demande ou selon un calendrier avec ClamAV et YARA, et signale ce qu'ils trouvent.

- **ID**: `endpoint.av`, **Version**: 0.1.0, **Catégorie**: endpoint, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/sys/fs/selinux`, `/var/lib/ibexwall/av`, `/etc/ibexwall/av`, `/usr/bin`, `/var/lib/clamav`, `/usr/share/clamav`, `/etc/systemd/system`
- **Peut écrire**: `/etc/systemd/system/ibexwall-av-scan.service`, `/etc/systemd/system/ibexwall-av-scan.timer`, `/etc/ibexwall/av`, `/var/lib/ibexwall/av/.managed`
- **Peut gérer ces services**: `ibexwall-av-scan.service`, `ibexwall-av-scan.timer`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non
- **Peut affecter**: performance

**À savoir avant de l’activer**

- Une analyse lit de nombreux fichiers et ralentit l'ordinateur pendant son exécution.

## Intégrité des fichiers {#endpoint-integrity}

Demande au gestionnaire de paquets quels fichiers installés ne sont pas ceux qu'il a livrés, et à AIDE s'il est configuré.

- **ID**: `endpoint.integrity`, **Version**: 0.1.0, **Catégorie**: endpoint, **Types**: vérification, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/var/lib/rpm`, `/usr/lib/sysimage/rpm`, `/var/lib/dpkg`, `/var/lib/pacman`, `/var/lib/aide`, `/usr/bin`, `/usr/sbin`, `/bin`, `/sbin`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non

## Mode d'urgence {#endpoint-isolate}

Coupe le réseau sauf pour les adresses que vous indiquez, et s'annule depuis l'Historique.

- **ID**: `endpoint.isolate`, **Version**: 0.1.0, **Catégorie**: endpoint, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/etc/ibexwall/isolate`
- **Peut écrire**: `/etc/ibexwall/isolate`
- **Peut modifier le pare-feu**: `endpoint_isolate` 
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non
- **Peut affecter**: network

**À savoir avant de l’activer**

- Tout ce qui utilise le réseau s'arrête, sauf les adresses que vous avez autorisées.
- Une session à distance (SSH, bureau à distance) est coupée, sauf si son adresse est autorisée.
- Les mises à jour, les sauvegardes et la synchronisation sont suspendues jusqu'à l'annulation de la modification.

## Persistance {#endpoint-persistence}

Surveille les endroits qu'un programme peut utiliser pour rester sur cet ordinateur (unités, cron, démarrage automatique, démarrage du shell, LD_PRELOAD) et signale ce qui a changé.

- **ID**: `endpoint.persistence`, **Version**: 0.1.0, **Catégorie**: endpoint, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/etc/systemd/system`, `/usr/lib/systemd/system`, `/etc/cron.d`, `/etc/cron.daily`, `/etc/cron.hourly`, `/etc/cron.weekly`, `/etc/cron.monthly`, `/etc/crontab`, `/var/spool/cron`, `/etc/xdg/autostart`, `/home`, `/root`, `/etc/ld.so.preload`, `/etc/profile`, `/etc/profile.d`, `/etc/bash.bashrc`, `/etc/bashrc`, `/var/lib/ibexwall/persistence`
- **Peut écrire**: `/var/lib/ibexwall/persistence`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non

## Analyse de rootkits {#endpoint-rootkit}

Exécute rkhunter et chkrootkit, à la demande ou selon un calendrier, et signale ce qu'ils relèvent. Leurs avertissements demandent l'examen d'une personne : ce ne sont pas des preuves.

- **ID**: `endpoint.rootkit`, **Version**: 0.1.0, **Catégorie**: endpoint, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/var/lib/ibexwall/rootkit`, `/usr/bin`, `/usr/sbin`, `/etc/os-release`, `/etc/systemd/system`
- **Peut écrire**: `/etc/systemd/system/ibexwall-rootkit-scan.service`, `/etc/systemd/system/ibexwall-rootkit-scan.timer`, `/var/lib/ibexwall/rootkit/.managed`
- **Peut gérer ces services**: `ibexwall-rootkit-scan.service`, `ibexwall-rootkit-scan.timer`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non
- **Peut affecter**: performance

**À savoir avant de l’activer**

- L'analyse lit la plus grande partie du système et peut ralentir l'ordinateur pendant son exécution.

## DNS sécurisé {#net-dns}

Chiffre les requêtes DNS, bloque les traqueurs et les domaines de malwares, et empêche les navigateurs de le contourner.

- **ID**: `net.dns`, **Version**: 0.1.0, **Catégorie**: network, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/etc/resolv.conf`, `/etc/systemd/resolved.conf`, `/etc/systemd/resolved.conf.d`, `/usr/sbin`, `/run/systemd/resolve`, `/run/systemd/netif`, `/run/NetworkManager`, `/etc/ibexwall/dns`, `/proc/net/udp`, `/etc/passwd`, `/usr/bin`, `/etc/os-release`, `/etc/dnscrypt-proxy`, `/etc/dnscrypt-proxy.toml`, `/run/systemd/units`, `/etc/systemd/system`, `/usr/lib/systemd/system/dnscrypt-proxy.socket`
- **Peut écrire**: `/etc/ibexwall/dns`, `/etc/systemd/resolved.conf`, `/etc/systemd/resolved.conf.d`, `/usr/sbin`, `/usr/bin`, `/etc/firefox/policies`, `/etc/opt/chrome/policies/managed`, `/etc/chromium/policies/managed`, `/etc/chromium-browser/policies/managed`, `/etc/brave/policies/managed`, `/etc/opt/edge/policies/managed`
- **Peut gérer ces services**: `ibexwall-dns.service`, `systemd-resolved.service`
- **Peut modifier le pare-feu**: `net_dns` 
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non
- **Peut affecter**: network

**À savoir avant de l’activer**

- Les pages de connexion des portails captifs (hôtels, aéroports) peuvent ne pas s'afficher.
- Les clients VPN qui définissent leur propre DNS peuvent être remplacés.
- Le DNS scindé d'entreprise (noms internes) peut cesser de résoudre.

## Ports ouverts, vus avec nmap {#net-exposure}

Analyse les adresses de cet ordinateur (jamais une autre machine) avec nmap et liste les ports TCP qui répondent, pour les comparer à ce que vous attendez.

- **ID**: `net.exposure`, **Version**: 0.1.0, **Catégorie**: net, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/var/lib/ibexwall/exposure`, `/proc/net`, `/usr/bin`, `/etc/os-release`, `/etc/systemd/system`
- **Peut écrire**: `/etc/systemd/system/ibexwall-exposure-scan.service`, `/etc/systemd/system/ibexwall-exposure-scan.timer`, `/var/lib/ibexwall/exposure/.managed`
- **Peut gérer ces services**: `ibexwall-exposure-scan.service`, `ibexwall-exposure-scan.timer`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non
- **Peut affecter**: network

**À savoir avant de l’activer**

- L'analyse ouvre une connexion vers chaque port des adresses de cet ordinateur, donc les services qui journalisent les connexions les listeront.

## Pare-feu {#net-firewall}

Contrôle quelles connexions peuvent joindre cet ordinateur, via le pare-feu que votre système utilise déjà.

- **ID**: `net.firewall`, **Version**: 0.1.0, **Catégorie**: network, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/etc/firewalld`, `/usr/lib/firewalld`, `/etc/ufw`, `/etc/ibexwall/firewall`, `/run/systemd/units`, `/proc/net`, `/etc/os-release`, `/usr/sbin`, `/usr/bin`
- **Peut écrire**: `/etc/ibexwall/firewall`
- **Peut modifier le pare-feu**: `net_firewall` `firewalld`, `ufw`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non
- **Peut affecter**: network

**À savoir avant de l’activer**

- L'accès à distance, comme SSH, cesse de fonctionner s'il n'est pas autorisé.
- Les services que d'autres ordinateurs utilisent sur celui-ci, comme le partage de fichiers, cessent de fonctionner.
- Le réseau des conteneurs et des machines virtuelles peut cesser de fonctionner dans certaines configurations.

## Heure sécurisée (NTS) {#net-nts}

Vérifie que chrony prend l'heure auprès de serveurs qu'il peut authentifier (NTS), et les ajoute.

- **ID**: `net.nts`, **Version**: 0.1.0, **Catégorie**: network, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/etc/chrony.conf`, `/etc/chrony`, `/etc/chrony.d`, `/etc/chrony-ibexwall`, `/usr/sbin/chronyd`, `/usr/bin/chronyd`, `/usr/lib/systemd/system`, `/etc/systemd/system`, `/run/chrony`, `/etc/os-release`, `/usr/lib/systemd/system/systemd-timesyncd.service`, `/lib/systemd/system/systemd-timesyncd.service`, `/usr/sbin/ntpd`, `/usr/bin/ntpd`
- **Peut écrire**: `/etc/chrony.d`, `/etc/chrony/conf.d`, `/etc/chrony-ibexwall`, `/etc/systemd/system/chronyd.service.d`
- **Peut gérer ces services**: `chronyd.service`, `chrony.service`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non
- **Peut affecter**: time

**À savoir avant de l’activer**

- NTS demande d'abord des clés à chaque serveur sur le port TCP 4460. Un pare-feu qui le bloque laisse l'horloge sur ses autres sources.
- L'heure vient des serveurs choisis en plus de ceux déjà définis ; IbexWall ne supprime pas ceux de la distribution.

## VPN et kill switch {#net-vpn}

Importe des profils WireGuard dans NetworkManager et bloque tout le trafic hors du tunnel si celui-ci tombe.

- **ID**: `net.vpn`, **Version**: 0.1.0, **Catégorie**: network, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/etc/ibexwall/vpn`, `/etc/ibexwall/dns`, `/usr/lib/NetworkManager/VPN`, `/usr/lib64/NetworkManager/VPN`, `/etc/NetworkManager/VPN`, `/usr/lib/systemd/system`, `/lib/systemd/system`, `/etc/systemd/system`, `/usr/bin`
- **Peut écrire**: `/etc/NetworkManager/system-connections`, `/etc/ibexwall/vpn`
- **Peut demander au cœur d’exécuter**: `/usr/bin/nmcli connection reload`
- **Peut modifier le pare-feu**: `net_vpn` 
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non
- **Peut affecter**: network

**À savoir avant de l’activer**

- Le trafic en dehors du tunnel est bloqué tant que le kill switch est activé.
- Les imprimantes et autres appareils de votre réseau local cessent de répondre, sauf si vous autorisez leurs adresses.

## Confidentialité du Wi-Fi {#net-wifi}

Vérifie que le Wi-Fi utilise une adresse matérielle modifiée et que les réseaux ouverts ne sont pas mémorisés, et définit l'adresse.

- **ID**: `net.wifi`, **Version**: 0.1.0, **Catégorie**: network, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/etc/NetworkManager`, `/usr/lib/NetworkManager`, `/usr/sbin/NetworkManager`, `/usr/bin/NetworkManager`, `/run/NetworkManager`
- **Peut écrire**: `/etc/NetworkManager/conf.d`
- **Peut gérer ces services**: `NetworkManager.service`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non
- **Peut affecter**: network

**À savoir avant de l’activer**

- Les réseaux qui mémorisent un appareil par son adresse (pages de connexion d'hôtels et d'aéroports, filtres d'adresses) traiteront cet ordinateur comme nouveau sur chaque réseau.
- Les routeurs domestiques qui n'autorisent que des adresses connues le refuseront tant que vous n'aurez pas autorisé la nouvelle.

## Caméra et microphone {#privacy-camera-mic}

Montre quels programmes utilisent la caméra ou le microphone en ce moment.

- **ID**: `privacy.camera-mic`, **Version**: 0.1.0, **Catégorie**: privacy, **Types**: vérification, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/proc`, `/dev`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, `CAP_SYS_PTRACE`, **Accès réseau du plugin**: non

## Télémétrie {#privacy-telemetry}

Liste les rapports d'usage que la distribution et certaines applications envoient, pour que vous puissiez décider.

- **ID**: `privacy.telemetry`, **Version**: 0.1.0, **Catégorie**: privacy, **Types**: vérification, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/etc`, `/usr/bin`, `/usr/sbin`, `/usr/lib`, `/usr/lib64`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non

## Comptes {#system-accounts}

Vérifie les comptes sans mot de passe, les comptes administrateur supplémentaires et le verrouillage après des échecs de connexion.

- **ID**: `system.accounts`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/etc/passwd`, `/etc/shadow`, `/etc/security`, `/etc/pam.d`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non

## Assistants IA {#system-assistant}

Ce qu'un assistant IA peut lire, planifier ou proposer, et les jetons d'accès pour les assistants sur d'autres machines.

- **ID**: `system.assistant`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/etc/ibexwall/mcp.toml`, `/etc/ibexwall/mcp`
- **Peut écrire**: `/etc/ibexwall/mcp.toml`, `/etc/ibexwall/mcp`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non
- **Peut affecter**: assistants

**À savoir avant de l’activer**

- Activer l'accès à distance ouvre un port qui ne répond qu'à un jeton valide, via TLS. Les assistants peuvent lire et, si vous l'autorisez, proposer ; ils ne peuvent jamais appliquer une modification.

## Audit de sécurité {#system-audit}

Affiche les avertissements et suggestions de Lynis lorsqu'il est installé. IbexWall ne l'embarque ni ne l'exécute.

- **ID**: `system.audit`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/var/log/lynis-report.dat`, `/usr/bin/lynis`, `/usr/sbin/lynis`, `/usr/share/lynis`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non

## Vidages mémoire (core dumps) {#system-coredump}

Vérifie si les vidages de plantage (qui peuvent contenir des mots de passe et des clés) sont stockés, et désactive leur stockage.

- **ID**: `system.coredump`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/proc/sys/kernel`, `/etc/systemd`, `/usr/lib/systemd`
- **Peut écrire**: `/etc/systemd/coredump.conf.d`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non
- **Peut affecter**: diagnostics

**À savoir avant de l’activer**

- Les rapports de plantage et le débogage post-mortem (coredumpctl) n'auront rien à exploiter.

## Micrologiciels {#system-firmware}

Vérifie que le service de mise à jour des micrologiciels (fwupd) est installé et actualise sa liste.

- **ID**: `system.firmware`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/sys/class/dmi/id`, `/usr/libexec/fwupd`, `/usr/lib/fwupd`, `/usr/lib/systemd/system`, `/etc/systemd/system`
- **Peut gérer ces services**: `fwupd-refresh.timer`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non
- **Peut affecter**: firmware

## Durcissement {#system-hardening}

Indique lesquels des réglages de durcissement recommandés cette machine a déjà. Il ne modifie rien ; chaque réglage est appliqué par le plugin qui en est responsable.

- **ID**: `system.hardening`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/proc/sys`, `/proc/mounts`, `/etc/modprobe.d`, `/usr/lib/modprobe.d`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non

## Modules du noyau {#system-modules}

Empêche le chargement de groupes de modules du noyau rarement nécessaires, ce qui réduit ce qu'un attaquant peut atteindre via le noyau.

- **ID**: `system.modules`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/etc/modprobe.d`, `/usr/lib/modprobe.d`, `/proc/modules`
- **Peut écrire**: `/etc/modprobe.d`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non
- **Peut affecter**: kernel

**À savoir avant de l’activer**

- Les modules déjà chargés le restent jusqu'au prochain redémarrage. Un programme qui a besoin d'un des modules bloqués ne pourra pas le démarrer.

## Montages temporaires {#system-mounts}

Vérifie que /tmp et /dev/shm ne peuvent ni exécuter de programmes ni contenir de fichiers setuid, et le définit pour le prochain démarrage.

- **ID**: `system.mounts`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/proc/mounts`, `/etc/systemd/system`, `/usr/lib/systemd/system`
- **Peut écrire**: `/etc/systemd/system/tmp.mount.d`, `/etc/systemd/system/dev-shm.mount.d`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non
- **Peut affecter**: boot

**À savoir avant de l’activer**

- Les programmes qui décompressent et exécutent du code depuis un dossier temporaire (certains installateurs, compilations et jeux) peuvent cesser de fonctionner.
- Les nouvelles options s'appliquent au prochain démarrage ; rien n'est remonté maintenant, donc il n'y a rien à annuler à chaud.

## Vérification du profil de sécurité (OpenSCAP) {#system-openscap}

Vérifie cet ordinateur par rapport à un profil de sécurité publié (par exemple ANSSI ou CIS) avec OpenSCAP et liste les règles en échec. Il ne modifie rien.

- **ID**: `system.openscap`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/var/lib/ibexwall/openscap`, `/usr/share/xml/scap/ssg/content`, `/usr/bin`, `/etc/os-release`, `/etc/systemd/system`
- **Peut écrire**: `/etc/systemd/system/ibexwall-openscap-scan.service`, `/etc/systemd/system/ibexwall-openscap-scan.timer`, `/var/lib/ibexwall/openscap/.managed`
- **Peut gérer ces services**: `ibexwall-openscap-scan.service`, `ibexwall-openscap-scan.timer`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non
- **Peut affecter**: performance

**À savoir avant de l’activer**

- La vérification lit de nombreux fichiers et réglages et peut ralentir l'ordinateur pendant son exécution. Elle ne modifie rien.

## Ports exposés {#system-ports}

Liste les services qui acceptent des connexions d'autres ordinateurs.

- **ID**: `system.ports`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/proc/net`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non

## État du système {#system-posture}

Vérifie à quel point cet ordinateur est protégé : démarrage, disque, pare-feu et comptes.

- **ID**: `system.posture`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/sys`, `/proc`, `/etc`, `/run/systemd`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non

## Verrouillage de l'écran {#system-session-lock}

Vérifie que le bureau verrouille l'écran tout seul quand vous vous éloignez.

- **ID**: `system.session-lock`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/etc/dconf`, `/home`, `/usr/bin`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non

## Serveur SSH {#system-ssh}

Vérifie les réglages du serveur SSH (connexion root, mots de passe vides, redirections) et les renforce avec un fichier drop-in.

- **ID**: `system.ssh`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/etc/ssh`, `/usr/sbin/sshd`, `/usr/lib/systemd/system`, `/run`
- **Peut écrire**: `/etc/ssh/sshd_config.d`
- **Peut gérer ces services**: `sshd.service`, `ssh.service`
- **Peut demander au cœur d’exécuter**: `/usr/sbin/sshd -t`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non
- **Peut affecter**: remote-access

**À savoir avant de l’activer**

- Se connecter en root par SSH avec un mot de passe cesse de fonctionner. Utilisez un utilisateur normal et sudo, ou une clé.
- Sans mots de passe, seuls les utilisateurs ayant une clé autorisée peuvent se connecter. Vérifiez la vôtre d'abord, sinon vous risquez de vous enfermer dehors.

## Durcissement du noyau {#system-sysctl}

Vérifie les réglages de sécurité du noyau par rapport au tableau de référence, et les applique.

- **ID**: `system.sysctl`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/proc/sys`, `/etc/sysctl.d`
- **Peut écrire**: `/etc/sysctl.d`
- **Peut modifier ces réglages du noyau**: `kernel.kptr_restrict`, `kernel.dmesg_restrict`, `kernel.yama.ptrace_scope`, `kernel.unprivileged_bpf_disabled`, `net.core.bpf_jit_harden`, `fs.protected_symlinks`, `fs.protected_hardlinks`, `fs.protected_fifos`, `fs.protected_regular`, `fs.suid_dumpable`, `kernel.kexec_load_disabled`, `net.ipv4.conf.all.accept_redirects`, `net.ipv4.conf.all.send_redirects`, `net.ipv4.conf.all.accept_source_route`, `net.ipv6.conf.all.accept_redirects`, `net.ipv4.tcp_syncookies`, `dev.tty.ldisc_autoload`, `vm.unprivileged_userfaultfd`, `net.ipv4.conf.all.rp_filter`, `kernel.sysrq`, `kernel.perf_event_paranoid`, `net.ipv4.tcp_rfc1337`, `net.ipv4.conf.all.secure_redirects`, `net.ipv4.conf.default.accept_redirects`, `net.ipv4.conf.default.secure_redirects`, `net.ipv4.conf.default.send_redirects`, `net.ipv6.conf.default.accept_redirects`, `net.ipv4.conf.default.accept_source_route`, `net.ipv6.conf.all.accept_source_route`, `net.ipv6.conf.default.accept_source_route`, `net.ipv4.conf.default.rp_filter`, `net.ipv6.conf.all.accept_ra`, `net.ipv6.conf.default.accept_ra`, `net.ipv4.tcp_sack`, `user.max_user_namespaces`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non
- **Peut affecter**: kernel

**À savoir avant de l’activer**

- Attacher un débogueur à un programme déjà en cours d'exécution (gdb, strace) cesse de fonctionner.
- Les programmes qui chargent eBPF sans privilèges cessent de fonctionner. IbexWall n'est pas concerné : il s'exécute avec des privilèges.
- Ne peut pas être annulé sans redémarrage : le chargement kexec reste désactivé jusque-là.
- Peut casser les VPN et les machines avec plusieurs routes réseau.
- Les touches d'urgence SysRq cessent de fonctionner.
- Les adresses et routes IPv6 annoncées par votre routeur ne sont plus acceptées, donc IPv6 peut cesser de fonctionner sur les réseaux qui en dépendent.
- Les téléchargements peuvent être plus lents sur les connexions avec pertes.
- Les programmes qui construisent leur propre bac à sable sans privilèges cessent de fonctionner : bacs à sable de Flatpak, Chromium et Firefox, conteneurs sans root.

## Mises à jour automatiques {#system-updates}

Vérifie que les mises à jour de sécurité s'installent d'elles-mêmes, et l'active lorsque l'outil de la distribution est installé.

- **ID**: `system.updates`, **Version**: 0.1.0, **Catégorie**: system, **Types**: vérification, contrôle, **Origine**: official
- **Activé par défaut**: oui
- **Peut lire**: `/etc/os-release`, `/etc/apt`, `/etc/dnf`, `/etc/systemd/system`, `/usr/lib/systemd/system`, `/usr/bin`, `/usr/lib/os-release`
- **Peut écrire**: `/etc/apt/apt.conf.d`, `/etc/dnf/dnf5-plugins/automatic.d`
- **Peut gérer ces services**: `dnf5-automatic.timer`, `apt-daily-upgrade.timer`
- **S’exécute en tant que**: un utilisateur dynamique, **Capacités**: aucune, **Accès réseau du plugin**: non
- **Peut affecter**: updates

**À savoir avant de l’activer**

- Des services peuvent redémarrer lors de leur mise à jour, et certaines mises à jour demandent un redémarrage.

## Vulnérabilités connues {#vuln-cves}

Liste les mises à jour de sécurité que votre distribution a publiées pour les paquets installés. Fonctionne hors ligne à partir du cache du gestionnaire de paquets ; rien n'est envoyé nulle part.

- **ID**: `vuln.cves`, **Version**: 0.1.0, **Catégorie**: vuln, **Types**: vérification, **Origine**: official
- **Activé par défaut**: non
- **Peut lire**: `/var/cache`, `/var/lib`, `/etc`, `/usr`
- **S’exécute en tant que**: root, **Capacités**: `CAP_DAC_READ_SEARCH`, **Accès réseau du plugin**: non
- **Nécessite**: `dnf5`, `apt-get`, `arch-audit`
