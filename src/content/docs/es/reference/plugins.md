---
title: "Catálogo de plugins"
description: "Todos los plugins oficiales: para qué sirven, qué pueden leer y cambiar, cómo están aislados y qué pueden afectar."
sidebar:
  order: 1
---

Los treinta y dos plugins oficiales. Cada uno propone y nunca aplica: aplica el núcleo, mediante un plan, una instantánea y tu aprobación. La lista de abajo se genera a partir de los manifiestos de los plugins, así que es lo que el daemon hace cumplir.

## Acceso a la red de Flatpak {#apps-flatpak-network}

Corta el acceso a la red de una aplicación Flatpak con una anulación reversible.

- **ID**: `apps.flatpak-network`, **Versión**: 0.1.0, **Categoría**: apps, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/var/lib/flatpak/app`, `/var/lib/flatpak/overrides`
- **Puede escribir**: `/var/lib/flatpak/overrides`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no
- **Puede afectar**: network

**Conviene saber antes de activarlo**

- La aplicación deja de funcionar si necesita la red.
- Las actualizaciones y el inicio de sesión dentro de la aplicación dejan de funcionar.

## Permisos de Flatpak {#apps-flatpak-perms}

Enumera las aplicaciones Flatpak que pueden acceder a tus archivos, dispositivos o a los controles del propio sandbox.

- **ID**: `apps.flatpak-perms`, **Versión**: 0.1.0, **Categoría**: apps, **Tipos**: comprobación, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/var/lib/flatpak`, `/home`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no

## Protección USB {#device-usb}

Comprueba que los dispositivos USB nuevos se bloquean hasta que los permitas (USBGuard) y crea la lista de permitidos con lo que está conectado ahora.

- **ID**: `device.usb`, **Versión**: 0.1.0, **Categoría**: device, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/sys/bus/usb/devices`, `/etc/usbguard`, `/usr/sbin/usbguard-daemon`, `/usr/bin/usbguard-daemon`, `/etc/systemd/system`, `/usr/lib/systemd/system`
- **Puede escribir**: `/etc/usbguard/rules.d`
- **Puede gestionar estos servicios**: `usbguard.service`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no
- **Puede afectar**: usb

**Conviene saber antes de activarlo**

- Los dispositivos que conectes más adelante quedan bloqueados hasta que los permitas con usbguard. Los teclados y ratones conectados ahora están permitidos, para que no te quedes sin acceso.

## Antimalware {#endpoint-av}

Analiza carpetas bajo demanda o de forma programada con ClamAV y YARA, e informa de lo que encuentran.

- **ID**: `endpoint.av`, **Versión**: 0.1.0, **Categoría**: endpoint, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/sys/fs/selinux`, `/var/lib/ibexwall/av`, `/etc/ibexwall/av`, `/usr/bin`, `/var/lib/clamav`, `/usr/share/clamav`, `/etc/systemd/system`
- **Puede escribir**: `/etc/systemd/system/ibexwall-av-scan.service`, `/etc/systemd/system/ibexwall-av-scan.timer`, `/etc/ibexwall/av`, `/var/lib/ibexwall/av/.managed`
- **Puede gestionar estos servicios**: `ibexwall-av-scan.service`, `ibexwall-av-scan.timer`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no
- **Puede afectar**: performance

**Conviene saber antes de activarlo**

- Un análisis lee muchos archivos y ralentiza el equipo mientras se ejecuta.

## Integridad de archivos {#endpoint-integrity}

Pregunta al gestor de paquetes qué archivos instalados no son los que distribuyó, y a AIDE cuando está configurado.

- **ID**: `endpoint.integrity`, **Versión**: 0.1.0, **Categoría**: endpoint, **Tipos**: comprobación, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/var/lib/rpm`, `/usr/lib/sysimage/rpm`, `/var/lib/dpkg`, `/var/lib/pacman`, `/var/lib/aide`, `/usr/bin`, `/usr/sbin`, `/bin`, `/sbin`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no

## Modo de emergencia {#endpoint-isolate}

Corta la red salvo las direcciones que indiques, y se deshace desde el Historial.

- **ID**: `endpoint.isolate`, **Versión**: 0.1.0, **Categoría**: endpoint, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/etc/ibexwall/isolate`
- **Puede escribir**: `/etc/ibexwall/isolate`
- **Puede cambiar el cortafuegos**: `endpoint_isolate` 
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no
- **Puede afectar**: network

**Conviene saber antes de activarlo**

- Todo lo que usa la red deja de funcionar, excepto las direcciones que permitiste.
- Una sesión remota (SSH, escritorio remoto) se corta a menos que su dirección esté permitida.
- Las actualizaciones, las copias de seguridad y la sincronización se pausan hasta que se deshaga el cambio.

## Persistencia {#endpoint-persistence}

Vigila los lugares que un programa puede usar para quedarse en este equipo (unidades, cron, inicio automático, arranque del shell, LD_PRELOAD) e informa de lo que cambió.

- **ID**: `endpoint.persistence`, **Versión**: 0.1.0, **Categoría**: endpoint, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/etc/systemd/system`, `/usr/lib/systemd/system`, `/etc/cron.d`, `/etc/cron.daily`, `/etc/cron.hourly`, `/etc/cron.weekly`, `/etc/cron.monthly`, `/etc/crontab`, `/var/spool/cron`, `/etc/xdg/autostart`, `/home`, `/root`, `/etc/ld.so.preload`, `/etc/profile`, `/etc/profile.d`, `/etc/bash.bashrc`, `/etc/bashrc`, `/var/lib/ibexwall/persistence`
- **Puede escribir**: `/var/lib/ibexwall/persistence`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no

## Análisis de rootkits {#endpoint-rootkit}

Ejecuta rkhunter y chkrootkit, bajo demanda o de forma programada, e informa de lo que marcan. Sus avisos necesitan la revisión de una persona: no son una prueba.

- **ID**: `endpoint.rootkit`, **Versión**: 0.1.0, **Categoría**: endpoint, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/var/lib/ibexwall/rootkit`, `/usr/bin`, `/usr/sbin`, `/etc/os-release`, `/etc/systemd/system`
- **Puede escribir**: `/etc/systemd/system/ibexwall-rootkit-scan.service`, `/etc/systemd/system/ibexwall-rootkit-scan.timer`, `/var/lib/ibexwall/rootkit/.managed`
- **Puede gestionar estos servicios**: `ibexwall-rootkit-scan.service`, `ibexwall-rootkit-scan.timer`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no
- **Puede afectar**: performance

**Conviene saber antes de activarlo**

- El análisis lee la mayor parte del sistema y puede ralentizar el equipo mientras se ejecuta.

## DNS seguro {#net-dns}

Cifra las consultas DNS, bloquea rastreadores y dominios de malware, e impide que los navegadores lo eludan.

- **ID**: `net.dns`, **Versión**: 0.1.0, **Categoría**: network, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/etc/resolv.conf`, `/etc/systemd/resolved.conf`, `/etc/systemd/resolved.conf.d`, `/usr/sbin`, `/run/systemd/resolve`, `/run/systemd/netif`, `/run/NetworkManager`, `/etc/ibexwall/dns`, `/proc/net/udp`, `/etc/passwd`, `/usr/bin`, `/etc/os-release`, `/etc/dnscrypt-proxy`, `/etc/dnscrypt-proxy.toml`, `/run/systemd/units`, `/etc/systemd/system`, `/usr/lib/systemd/system/dnscrypt-proxy.socket`
- **Puede escribir**: `/etc/ibexwall/dns`, `/etc/systemd/resolved.conf`, `/etc/systemd/resolved.conf.d`, `/usr/sbin`, `/usr/bin`, `/etc/firefox/policies`, `/etc/opt/chrome/policies/managed`, `/etc/chromium/policies/managed`, `/etc/chromium-browser/policies/managed`, `/etc/brave/policies/managed`, `/etc/opt/edge/policies/managed`
- **Puede gestionar estos servicios**: `ibexwall-dns.service`, `systemd-resolved.service`
- **Puede cambiar el cortafuegos**: `net_dns` 
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no
- **Puede afectar**: network

**Conviene saber antes de activarlo**

- Las páginas de inicio de sesión de portales cautivos (hoteles, aeropuertos) pueden no cargarse.
- Los clientes VPN que establecen su propio DNS pueden ser anulados.
- El DNS dividido corporativo (nombres internos) puede dejar de resolverse.

## Puertos abiertos, vistos con nmap {#net-exposure}

Analiza con nmap las direcciones de este propio equipo (nunca otra máquina) y enumera qué puertos TCP responden, para compararlos con lo que esperas.

- **ID**: `net.exposure`, **Versión**: 0.1.0, **Categoría**: net, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/var/lib/ibexwall/exposure`, `/proc/net`, `/usr/bin`, `/etc/os-release`, `/etc/systemd/system`
- **Puede escribir**: `/etc/systemd/system/ibexwall-exposure-scan.service`, `/etc/systemd/system/ibexwall-exposure-scan.timer`, `/var/lib/ibexwall/exposure/.managed`
- **Puede gestionar estos servicios**: `ibexwall-exposure-scan.service`, `ibexwall-exposure-scan.timer`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no
- **Puede afectar**: network

**Conviene saber antes de activarlo**

- El análisis abre una conexión con cada puerto de las direcciones de este propio equipo, así que los servicios que registran conexiones las mostrarán.

## Cortafuegos {#net-firewall}

Controla qué conexiones pueden llegar a este equipo, a través del cortafuegos que tu sistema ya usa.

- **ID**: `net.firewall`, **Versión**: 0.1.0, **Categoría**: network, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/etc/firewalld`, `/usr/lib/firewalld`, `/etc/ufw`, `/etc/ibexwall/firewall`, `/run/systemd/units`, `/proc/net`, `/etc/os-release`, `/usr/sbin`, `/usr/bin`
- **Puede escribir**: `/etc/ibexwall/firewall`
- **Puede cambiar el cortafuegos**: `net_firewall` `firewalld`, `ufw`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no
- **Puede afectar**: network

**Conviene saber antes de activarlo**

- El acceso remoto, como SSH, deja de funcionar si no está permitido.
- Los servicios que otros equipos usan en este, como compartir archivos, dejan de funcionar.
- La red de contenedores y máquinas virtuales puede fallar en algunas configuraciones.

## Hora segura (NTS) {#net-nts}

Comprueba que chrony toma la hora de servidores que puede autenticar (NTS), y los añade.

- **ID**: `net.nts`, **Versión**: 0.1.0, **Categoría**: network, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/etc/chrony.conf`, `/etc/chrony`, `/etc/chrony.d`, `/etc/chrony-ibexwall`, `/usr/sbin/chronyd`, `/usr/bin/chronyd`, `/usr/lib/systemd/system`, `/etc/systemd/system`, `/run/chrony`, `/etc/os-release`, `/usr/lib/systemd/system/systemd-timesyncd.service`, `/lib/systemd/system/systemd-timesyncd.service`, `/usr/sbin/ntpd`, `/usr/bin/ntpd`
- **Puede escribir**: `/etc/chrony.d`, `/etc/chrony/conf.d`, `/etc/chrony-ibexwall`, `/etc/systemd/system/chronyd.service.d`
- **Puede gestionar estos servicios**: `chronyd.service`, `chrony.service`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no
- **Puede afectar**: time

**Conviene saber antes de activarlo**

- NTS pide primero las claves a cada servidor por el puerto TCP 4460. Un cortafuegos que lo bloquee deja el reloj con sus otras fuentes.
- La hora procede de los servidores elegidos además de los ya configurados; IbexWall no elimina los de la propia distribución.

## VPN e interruptor de corte {#net-vpn}

Importa perfiles de WireGuard en NetworkManager y bloquea todo el tráfico fuera del túnel si este se cae.

- **ID**: `net.vpn`, **Versión**: 0.1.0, **Categoría**: network, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/etc/ibexwall/vpn`, `/etc/ibexwall/dns`, `/usr/lib/NetworkManager/VPN`, `/usr/lib64/NetworkManager/VPN`, `/etc/NetworkManager/VPN`, `/usr/lib/systemd/system`, `/lib/systemd/system`, `/etc/systemd/system`, `/usr/bin`
- **Puede escribir**: `/etc/NetworkManager/system-connections`, `/etc/ibexwall/vpn`
- **Puede pedir al núcleo que ejecute**: `/usr/bin/nmcli connection reload`
- **Puede cambiar el cortafuegos**: `net_vpn` 
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no
- **Puede afectar**: network

**Conviene saber antes de activarlo**

- El tráfico fuera del túnel se bloquea mientras el interruptor de corte está activado.
- Las impresoras y otros dispositivos de tu red local dejan de responder a menos que permitas sus direcciones.

## Privacidad del Wi-Fi {#net-wifi}

Comprueba que el Wi-Fi usa una dirección de hardware cambiada y que no se recuerdan las redes abiertas, y establece la dirección.

- **ID**: `net.wifi`, **Versión**: 0.1.0, **Categoría**: network, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/etc/NetworkManager`, `/usr/lib/NetworkManager`, `/usr/sbin/NetworkManager`, `/usr/bin/NetworkManager`, `/run/NetworkManager`
- **Puede escribir**: `/etc/NetworkManager/conf.d`
- **Puede gestionar estos servicios**: `NetworkManager.service`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no
- **Puede afectar**: network

**Conviene saber antes de activarlo**

- Las redes que recuerdan un dispositivo por su dirección (páginas de inicio de sesión de hoteles y aeropuertos, filtros de direcciones) tratarán este equipo como nuevo en cada red.
- Los routers domésticos que solo permiten direcciones conocidas lo rechazarán hasta que permitas la nueva.

## Cámara y micrófono {#privacy-camera-mic}

Muestra qué programas están usando ahora mismo la cámara o el micrófono.

- **ID**: `privacy.camera-mic`, **Versión**: 0.1.0, **Categoría**: privacy, **Tipos**: comprobación, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/proc`, `/dev`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, `CAP_SYS_PTRACE`, **Acceso a la red del plugin**: no

## Telemetría {#privacy-telemetry}

Enumera los informes de uso que envían la distribución y algunas aplicaciones, para que puedas decidir al respecto.

- **ID**: `privacy.telemetry`, **Versión**: 0.1.0, **Categoría**: privacy, **Tipos**: comprobación, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/etc`, `/usr/bin`, `/usr/sbin`, `/usr/lib`, `/usr/lib64`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no

## Cuentas {#system-accounts}

Comprueba si hay cuentas sin contraseña, cuentas de administrador adicionales y el bloqueo por intentos de inicio de sesión.

- **ID**: `system.accounts`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/etc/passwd`, `/etc/shadow`, `/etc/security`, `/etc/pam.d`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no

## Asistentes de IA {#system-assistant}

Qué puede leer, planificar o proponer un asistente de IA, y los tokens de acceso para asistentes en otras máquinas.

- **ID**: `system.assistant`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/etc/ibexwall/mcp.toml`, `/etc/ibexwall/mcp`
- **Puede escribir**: `/etc/ibexwall/mcp.toml`, `/etc/ibexwall/mcp`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no
- **Puede afectar**: assistants

**Conviene saber antes de activarlo**

- Activar el acceso remoto abre un puerto que solo responde a un token válido, mediante TLS. Los asistentes pueden leer y, si lo permites, proponer; nunca pueden aplicar un cambio.

## Auditoría de seguridad {#system-audit}

Muestra las advertencias y sugerencias de Lynis cuando está instalado. IbexWall no lo incluye ni lo ejecuta.

- **ID**: `system.audit`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/var/log/lynis-report.dat`, `/usr/bin/lynis`, `/usr/sbin/lynis`, `/usr/share/lynis`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no

## Volcados de memoria {#system-coredump}

Comprueba si se guardan los volcados de fallos (que pueden contener contraseñas y claves) y desactiva el almacenamiento.

- **ID**: `system.coredump`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/proc/sys/kernel`, `/etc/systemd`, `/usr/lib/systemd`
- **Puede escribir**: `/etc/systemd/coredump.conf.d`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no
- **Puede afectar**: diagnostics

**Conviene saber antes de activarlo**

- Los informes de fallos y la depuración posterior (coredumpctl) no tendrán nada con que trabajar.

## Firmware {#system-firmware}

Comprueba que el servicio de actualización de firmware (fwupd) está instalado y actualizando su lista.

- **ID**: `system.firmware`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/sys/class/dmi/id`, `/usr/libexec/fwupd`, `/usr/lib/fwupd`, `/usr/lib/systemd/system`, `/etc/systemd/system`
- **Puede gestionar estos servicios**: `fwupd-refresh.timer`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no
- **Puede afectar**: firmware

## Refuerzo {#system-hardening}

Indica cuáles de los ajustes de refuerzo recomendados ya tiene esta máquina. No cambia nada; cada ajuste se aplica mediante el plugin al que pertenece.

- **ID**: `system.hardening`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/proc/sys`, `/proc/mounts`, `/etc/modprobe.d`, `/usr/lib/modprobe.d`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no

## Módulos del kernel {#system-modules}

Impide que se carguen grupos de módulos del kernel que rara vez se necesitan, lo que reduce lo que un atacante puede alcanzar a través del kernel.

- **ID**: `system.modules`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/etc/modprobe.d`, `/usr/lib/modprobe.d`, `/proc/modules`
- **Puede escribir**: `/etc/modprobe.d`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no
- **Puede afectar**: kernel

**Conviene saber antes de activarlo**

- Los módulos que ya están cargados siguen cargados hasta el próximo reinicio. Un programa que necesite uno de los módulos bloqueados fallará al iniciarlo.

## Montajes temporales {#system-mounts}

Comprueba que /tmp y /dev/shm no pueden ejecutar programas ni contener archivos setuid, y lo establece para el próximo arranque.

- **ID**: `system.mounts`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/proc/mounts`, `/etc/systemd/system`, `/usr/lib/systemd/system`
- **Puede escribir**: `/etc/systemd/system/tmp.mount.d`, `/etc/systemd/system/dev-shm.mount.d`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no
- **Puede afectar**: boot

**Conviene saber antes de activarlo**

- Los programas que descomprimen y ejecutan código desde una carpeta temporal (algunos instaladores, compilaciones y juegos) pueden dejar de funcionar.
- Las nuevas opciones se aplican en el próximo arranque; ahora no se vuelve a montar nada, así que no hay nada que deshacer en caliente.

## Comprobación del perfil de seguridad (OpenSCAP) {#system-openscap}

Comprueba este equipo con un perfil de seguridad publicado (por ejemplo ANSSI o CIS) mediante OpenSCAP y enumera las reglas que fallan. No cambia nada.

- **ID**: `system.openscap`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/var/lib/ibexwall/openscap`, `/usr/share/xml/scap/ssg/content`, `/usr/bin`, `/etc/os-release`, `/etc/systemd/system`
- **Puede escribir**: `/etc/systemd/system/ibexwall-openscap-scan.service`, `/etc/systemd/system/ibexwall-openscap-scan.timer`, `/var/lib/ibexwall/openscap/.managed`
- **Puede gestionar estos servicios**: `ibexwall-openscap-scan.service`, `ibexwall-openscap-scan.timer`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no
- **Puede afectar**: performance

**Conviene saber antes de activarlo**

- La comprobación lee muchos archivos y ajustes y puede ralentizar el equipo mientras se ejecuta. No cambia nada.

## Puertos expuestos {#system-ports}

Enumera los servicios que aceptan conexiones de otros equipos.

- **ID**: `system.ports`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/proc/net`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no

## Postura del sistema {#system-posture}

Comprueba lo bien protegido que está este equipo: arranque, disco, cortafuegos y cuentas.

- **ID**: `system.posture`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/sys`, `/proc`, `/etc`, `/run/systemd`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no

## Bloqueo de pantalla {#system-session-lock}

Comprueba que el escritorio bloquea la pantalla por sí solo cuando te alejas.

- **ID**: `system.session-lock`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/etc/dconf`, `/home`, `/usr/bin`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no

## Servidor SSH {#system-ssh}

Comprueba los ajustes del servidor SSH (inicio de sesión de root, contraseñas vacías, reenvío) y los refuerza con un archivo drop-in.

- **ID**: `system.ssh`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/etc/ssh`, `/usr/sbin/sshd`, `/usr/lib/systemd/system`, `/run`
- **Puede escribir**: `/etc/ssh/sshd_config.d`
- **Puede gestionar estos servicios**: `sshd.service`, `ssh.service`
- **Puede pedir al núcleo que ejecute**: `/usr/sbin/sshd -t`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no
- **Puede afectar**: remote-access

**Conviene saber antes de activarlo**

- Deja de funcionar el inicio de sesión como root por SSH con contraseña. Usa un usuario normal y sudo, o una clave.
- Con las contraseñas desactivadas, solo pueden iniciar sesión los usuarios con una clave autorizada. Comprueba primero la tuya o podrías quedarte fuera.

## Refuerzo del kernel {#system-sysctl}

Comprueba los ajustes de seguridad del kernel con la tabla de referencia y los aplica.

- **ID**: `system.sysctl`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/proc/sys`, `/etc/sysctl.d`
- **Puede escribir**: `/etc/sysctl.d`
- **Puede cambiar estos ajustes del kernel**: `kernel.kptr_restrict`, `kernel.dmesg_restrict`, `kernel.yama.ptrace_scope`, `kernel.unprivileged_bpf_disabled`, `net.core.bpf_jit_harden`, `fs.protected_symlinks`, `fs.protected_hardlinks`, `fs.protected_fifos`, `fs.protected_regular`, `fs.suid_dumpable`, `kernel.kexec_load_disabled`, `net.ipv4.conf.all.accept_redirects`, `net.ipv4.conf.all.send_redirects`, `net.ipv4.conf.all.accept_source_route`, `net.ipv6.conf.all.accept_redirects`, `net.ipv4.tcp_syncookies`, `dev.tty.ldisc_autoload`, `vm.unprivileged_userfaultfd`, `net.ipv4.conf.all.rp_filter`, `kernel.sysrq`, `kernel.perf_event_paranoid`, `net.ipv4.tcp_rfc1337`, `net.ipv4.conf.all.secure_redirects`, `net.ipv4.conf.default.accept_redirects`, `net.ipv4.conf.default.secure_redirects`, `net.ipv4.conf.default.send_redirects`, `net.ipv6.conf.default.accept_redirects`, `net.ipv4.conf.default.accept_source_route`, `net.ipv6.conf.all.accept_source_route`, `net.ipv6.conf.default.accept_source_route`, `net.ipv4.conf.default.rp_filter`, `net.ipv6.conf.all.accept_ra`, `net.ipv6.conf.default.accept_ra`, `net.ipv4.tcp_sack`, `user.max_user_namespaces`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no
- **Puede afectar**: kernel

**Conviene saber antes de activarlo**

- Deja de funcionar adjuntar un depurador a un programa que ya se está ejecutando (gdb, strace).
- Los programas que cargan eBPF sin privilegios dejan de funcionar. IbexWall no se ve afectado: se ejecuta con privilegios.
- No se puede deshacer sin reiniciar: la carga con kexec permanece desactivada hasta entonces.
- Puede romper VPN y equipos con varias rutas de red.
- Las teclas de emergencia SysRq dejan de funcionar.
- Ya no se aceptan las direcciones y rutas IPv6 que anuncia tu router, así que IPv6 puede dejar de funcionar en redes que dependen de ellas.
- Las descargas pueden ser más lentas en conexiones con pérdidas.
- Los programas que crean su propio sandbox sin privilegios dejan de funcionar: los sandboxes de Flatpak, Chromium y Firefox, y los contenedores sin root.

## Actualizaciones automáticas {#system-updates}

Comprueba que las actualizaciones de seguridad se instalan solas y lo activa cuando la herramienta de la distribución está instalada.

- **ID**: `system.updates`, **Versión**: 0.1.0, **Categoría**: system, **Tipos**: comprobación, control, **Origen**: official
- **Activado por defecto**: sí
- **Puede leer**: `/etc/os-release`, `/etc/apt`, `/etc/dnf`, `/etc/systemd/system`, `/usr/lib/systemd/system`, `/usr/bin`, `/usr/lib/os-release`
- **Puede escribir**: `/etc/apt/apt.conf.d`, `/etc/dnf/dnf5-plugins/automatic.d`
- **Puede gestionar estos servicios**: `dnf5-automatic.timer`, `apt-daily-upgrade.timer`
- **Se ejecuta como**: un usuario dinámico, **Capacidades**: ninguna, **Acceso a la red del plugin**: no
- **Puede afectar**: updates

**Conviene saber antes de activarlo**

- Los servicios pueden reiniciarse al actualizarse, y algunas actualizaciones piden reiniciar el equipo.

## Vulnerabilidades conocidas {#vuln-cves}

Enumera las actualizaciones de seguridad que tu distribución ha publicado para los paquetes instalados. Funciona sin conexión con la propia caché del gestor de paquetes; no se envía nada a ninguna parte.

- **ID**: `vuln.cves`, **Versión**: 0.1.0, **Categoría**: vuln, **Tipos**: comprobación, **Origen**: official
- **Activado por defecto**: no
- **Puede leer**: `/var/cache`, `/var/lib`, `/etc`, `/usr`
- **Se ejecuta como**: root, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acceso a la red del plugin**: no
- **Necesita**: `dnf5`, `apt-get`, `arch-audit`
