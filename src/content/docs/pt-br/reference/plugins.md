---
title: "Catálogo de plugins"
description: "Todos os plugins oficiais: para que servem, o que podem ler e alterar, como ficam isolados e o que podem afetar."
sidebar:
  order: 1
---

Os trinta e dois plugins oficiais. Cada um propõe e nunca aplica: quem aplica é o núcleo, por meio de um plano, de um instantâneo e da sua aprovação. A lista abaixo é gerada a partir dos manifestos dos plugins, então é o que o daemon realmente impõe.

## Acesso à rede dos apps Flatpak {#apps-flatpak-network}

Corta o acesso à rede de um app Flatpak com uma sobreposição reversível.

- **ID**: `apps.flatpak-network`, **Versão**: 0.1.0, **Categoria**: apps, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/var/lib/flatpak/app`, `/var/lib/flatpak/overrides`
- **Pode escrever**: `/var/lib/flatpak/overrides`
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não
- **Pode afetar**: network

**Vale saber antes de ligar**

- O app deixa de funcionar se precisar da rede.
- Atualizações e login dentro do app deixam de funcionar.

## Permissões dos Flatpak {#apps-flatpak-perms}

Lista os apps Flatpak que alcançam seus arquivos, dispositivos ou os controles do próprio sandbox.

- **ID**: `apps.flatpak-perms`, **Versão**: 0.1.0, **Categoria**: apps, **Tipos**: verificação, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/var/lib/flatpak`, `/home`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não

## Proteção de USB {#device-usb}

Verifica se novos dispositivos USB ficam bloqueados até você permitir (USBGuard), e monta a lista de permitidos com o que está conectado agora.

- **ID**: `device.usb`, **Versão**: 0.1.0, **Categoria**: device, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/sys/bus/usb/devices`, `/etc/usbguard`, `/usr/sbin/usbguard-daemon`, `/usr/bin/usbguard-daemon`, `/etc/systemd/system`, `/usr/lib/systemd/system`
- **Pode escrever**: `/etc/usbguard/rules.d`
- **Pode gerenciar estes serviços**: `usbguard.service`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não
- **Pode afetar**: usb

**Vale saber antes de ligar**

- Dispositivos que você conectar depois ficam bloqueados até você permitir com o usbguard. Teclados e mouses conectados agora são permitidos, então você não fica sem acesso.

## Antimalware {#endpoint-av}

Varre pastas sob demanda ou em horário marcado com ClamAV e YARA, e relata o que encontram.

- **ID**: `endpoint.av`, **Versão**: 0.1.0, **Categoria**: endpoint, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/sys/fs/selinux`, `/var/lib/ibexwall/av`, `/etc/ibexwall/av`, `/usr/bin`, `/var/lib/clamav`, `/usr/share/clamav`, `/etc/systemd/system`
- **Pode escrever**: `/etc/systemd/system/ibexwall-av-scan.service`, `/etc/systemd/system/ibexwall-av-scan.timer`, `/etc/ibexwall/av`, `/var/lib/ibexwall/av/.managed`
- **Pode gerenciar estes serviços**: `ibexwall-av-scan.service`, `ibexwall-av-scan.timer`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não
- **Pode afetar**: performance

**Vale saber antes de ligar**

- Uma varredura lê muitos arquivos e deixa o computador mais lento enquanto roda.

## Integridade de arquivos {#endpoint-integrity}

Pergunta ao gerenciador de pacotes quais arquivos instalados não são o que ele entregou, e ao AIDE quando configurado.

- **ID**: `endpoint.integrity`, **Versão**: 0.1.0, **Categoria**: endpoint, **Tipos**: verificação, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/var/lib/rpm`, `/usr/lib/sysimage/rpm`, `/var/lib/dpkg`, `/var/lib/pacman`, `/var/lib/aide`, `/usr/bin`, `/usr/sbin`, `/bin`, `/sbin`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não

## Modo emergência {#endpoint-isolate}

Corta a rede, exceto os endereços que você indicar, e é desfeito pelo Histórico.

- **ID**: `endpoint.isolate`, **Versão**: 0.1.0, **Categoria**: endpoint, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/etc/ibexwall/isolate`
- **Pode escrever**: `/etc/ibexwall/isolate`
- **Pode alterar o firewall**: `endpoint_isolate` 
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não
- **Pode afetar**: network

**Vale saber antes de ligar**

- Tudo o que usa a rede para de funcionar, exceto os endereços que você permitiu.
- Uma sessão remota (SSH, área de trabalho remota) é cortada, a menos que o endereço dela seja permitido.
- Atualizações, backups e sincronização ficam em pausa até a alteração ser desfeita.

## Persistência {#endpoint-persistence}

Vigia os lugares que um programa pode usar para ficar neste computador (units, cron, autostart, inicialização do shell, LD_PRELOAD) e relata o que mudou.

- **ID**: `endpoint.persistence`, **Versão**: 0.1.0, **Categoria**: endpoint, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/etc/systemd/system`, `/usr/lib/systemd/system`, `/etc/cron.d`, `/etc/cron.daily`, `/etc/cron.hourly`, `/etc/cron.weekly`, `/etc/cron.monthly`, `/etc/crontab`, `/var/spool/cron`, `/etc/xdg/autostart`, `/home`, `/root`, `/etc/ld.so.preload`, `/etc/profile`, `/etc/profile.d`, `/etc/bash.bashrc`, `/etc/bashrc`, `/var/lib/ibexwall/persistence`
- **Pode escrever**: `/var/lib/ibexwall/persistence`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não

## Busca por rootkits {#endpoint-rootkit}

Executa o rkhunter e o chkrootkit, sob demanda ou em horário marcado, e relata o que eles apontam. Os avisos precisam da revisão de uma pessoa: não são prova.

- **ID**: `endpoint.rootkit`, **Versão**: 0.1.0, **Categoria**: endpoint, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/var/lib/ibexwall/rootkit`, `/usr/bin`, `/usr/sbin`, `/etc/os-release`, `/etc/systemd/system`
- **Pode escrever**: `/etc/systemd/system/ibexwall-rootkit-scan.service`, `/etc/systemd/system/ibexwall-rootkit-scan.timer`, `/var/lib/ibexwall/rootkit/.managed`
- **Pode gerenciar estes serviços**: `ibexwall-rootkit-scan.service`, `ibexwall-rootkit-scan.timer`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não
- **Pode afetar**: performance

**Vale saber antes de ligar**

- A varredura lê a maior parte do sistema e pode deixar o computador mais lento enquanto roda.

## DNS seguro {#net-dns}

Criptografa as consultas DNS, bloqueia rastreadores e domínios maliciosos e impede que os navegadores contornem a proteção.

- **ID**: `net.dns`, **Versão**: 0.1.0, **Categoria**: network, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/etc/resolv.conf`, `/etc/systemd/resolved.conf`, `/etc/systemd/resolved.conf.d`, `/usr/sbin`, `/run/systemd/resolve`, `/run/systemd/netif`, `/run/NetworkManager`, `/etc/ibexwall/dns`, `/proc/net/udp`, `/etc/passwd`, `/usr/bin`, `/etc/os-release`, `/etc/dnscrypt-proxy`, `/etc/dnscrypt-proxy.toml`, `/run/systemd/units`, `/etc/systemd/system`, `/usr/lib/systemd/system/dnscrypt-proxy.socket`
- **Pode escrever**: `/etc/ibexwall/dns`, `/etc/systemd/resolved.conf`, `/etc/systemd/resolved.conf.d`, `/usr/sbin`, `/usr/bin`, `/etc/firefox/policies`, `/etc/opt/chrome/policies/managed`, `/etc/chromium/policies/managed`, `/etc/chromium-browser/policies/managed`, `/etc/brave/policies/managed`, `/etc/opt/edge/policies/managed`
- **Pode gerenciar estes serviços**: `ibexwall-dns.service`, `systemd-resolved.service`
- **Pode alterar o firewall**: `net_dns` 
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não
- **Pode afetar**: network

**Vale saber antes de ligar**

- As páginas de login de redes com portal (hotéis, aeroportos) podem não abrir.
- Clientes de VPN que definem o próprio DNS podem ser sobrepostos.
- O DNS dividido de empresas (nomes internos) pode parar de resolver.

## Portas abertas, vistas com o nmap {#net-exposure}

Varre os endereços do próprio computador (nunca outra máquina) com o nmap e lista quais portas TCP respondem, para comparar com o que você espera.

- **ID**: `net.exposure`, **Versão**: 0.1.0, **Categoria**: net, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/var/lib/ibexwall/exposure`, `/proc/net`, `/usr/bin`, `/etc/os-release`, `/etc/systemd/system`
- **Pode escrever**: `/etc/systemd/system/ibexwall-exposure-scan.service`, `/etc/systemd/system/ibexwall-exposure-scan.timer`, `/var/lib/ibexwall/exposure/.managed`
- **Pode gerenciar estes serviços**: `ibexwall-exposure-scan.service`, `ibexwall-exposure-scan.timer`
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não
- **Pode afetar**: network

**Vale saber antes de ligar**

- A varredura abre uma conexão em cada porta dos endereços deste computador, então serviços que registram conexões vão listá-las.

## Firewall {#net-firewall}

Controla quais conexões podem chegar a este computador, pelo firewall que o seu sistema já usa.

- **ID**: `net.firewall`, **Versão**: 0.1.0, **Categoria**: network, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/etc/firewalld`, `/usr/lib/firewalld`, `/etc/ufw`, `/etc/ibexwall/firewall`, `/run/systemd/units`, `/proc/net`, `/etc/os-release`, `/usr/sbin`, `/usr/bin`
- **Pode escrever**: `/etc/ibexwall/firewall`
- **Pode alterar o firewall**: `net_firewall` `firewalld`, `ufw`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não
- **Pode afetar**: network

**Vale saber antes de ligar**

- O acesso remoto, como SSH, deixa de funcionar se não for permitido.
- Serviços que outros computadores usam neste, como compartilhamento de arquivos, deixam de funcionar.
- A rede de contêineres e máquinas virtuais pode quebrar em alguns casos.

## Hora segura (NTS) {#net-nts}

Verifica se o chrony obtém a hora de servidores que ele consegue autenticar (NTS), e os adiciona.

- **ID**: `net.nts`, **Versão**: 0.1.0, **Categoria**: network, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/etc/chrony.conf`, `/etc/chrony`, `/etc/chrony.d`, `/etc/chrony-ibexwall`, `/usr/sbin/chronyd`, `/usr/bin/chronyd`, `/usr/lib/systemd/system`, `/etc/systemd/system`, `/run/chrony`, `/etc/os-release`, `/usr/lib/systemd/system/systemd-timesyncd.service`, `/lib/systemd/system/systemd-timesyncd.service`, `/usr/sbin/ntpd`, `/usr/bin/ntpd`
- **Pode escrever**: `/etc/chrony.d`, `/etc/chrony/conf.d`, `/etc/chrony-ibexwall`, `/etc/systemd/system/chronyd.service.d`
- **Pode gerenciar estes serviços**: `chronyd.service`, `chrony.service`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não
- **Pode afetar**: time

**Vale saber antes de ligar**

- O NTS pede as chaves a cada servidor na porta TCP 4460 primeiro. Um firewall que a bloqueie mantém o relógio nas outras fontes.
- A hora passa a vir também dos servidores escolhidos, além dos já configurados; o IbexWall não remove os da própria distro.

## VPN e kill switch {#net-vpn}

Importa perfis WireGuard no NetworkManager e bloqueia todo o tráfego fora do túnel se ele cair.

- **ID**: `net.vpn`, **Versão**: 0.1.0, **Categoria**: network, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/etc/ibexwall/vpn`, `/etc/ibexwall/dns`, `/usr/lib/NetworkManager/VPN`, `/usr/lib64/NetworkManager/VPN`, `/etc/NetworkManager/VPN`, `/usr/lib/systemd/system`, `/lib/systemd/system`, `/etc/systemd/system`, `/usr/bin`
- **Pode escrever**: `/etc/NetworkManager/system-connections`, `/etc/ibexwall/vpn`
- **Pode pedir ao núcleo que execute**: `/usr/bin/nmcli connection reload`
- **Pode alterar o firewall**: `net_vpn` 
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não
- **Pode afetar**: network

**Vale saber antes de ligar**

- O tráfego fora do túnel fica bloqueado enquanto o kill switch estiver ligado.
- Impressoras e outros dispositivos da rede local deixam de responder, a menos que você permita os endereços deles.

## Privacidade do Wi-Fi {#net-wifi}

Verifica se o Wi-Fi usa um endereço de hardware alterado e se redes abertas não ficam salvas, e configura o endereço.

- **ID**: `net.wifi`, **Versão**: 0.1.0, **Categoria**: network, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/etc/NetworkManager`, `/usr/lib/NetworkManager`, `/usr/sbin/NetworkManager`, `/usr/bin/NetworkManager`, `/run/NetworkManager`
- **Pode escrever**: `/etc/NetworkManager/conf.d`
- **Pode gerenciar estes serviços**: `NetworkManager.service`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não
- **Pode afetar**: network

**Vale saber antes de ligar**

- Redes que lembram um aparelho pelo endereço (páginas de login de hotel e aeroporto, filtros de endereço) tratarão este computador como novo em cada rede.
- Roteadores domésticos que só aceitam endereços conhecidos vão recusá-lo até você permitir o novo.

## Câmera e microfone {#privacy-camera-mic}

Mostra quais programas estão usando a câmera ou o microfone agora.

- **ID**: `privacy.camera-mic`, **Versão**: 0.1.0, **Categoria**: privacy, **Tipos**: verificação, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/proc`, `/dev`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, `CAP_SYS_PTRACE`, **Acesso à rede pelo plugin**: não

## Telemetria {#privacy-telemetry}

Lista os relatórios de uso que a distribuição e alguns apps enviam, para você decidir sobre eles.

- **ID**: `privacy.telemetry`, **Versão**: 0.1.0, **Categoria**: privacy, **Tipos**: verificação, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/etc`, `/usr/bin`, `/usr/sbin`, `/usr/lib`, `/usr/lib64`
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não

## Contas {#system-accounts}

Procura contas sem senha, contas de administrador extras e bloqueio após tentativas de login.

- **ID**: `system.accounts`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/etc/passwd`, `/etc/shadow`, `/etc/security`, `/etc/pam.d`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não

## Assistentes de IA {#system-assistant}

O que um assistente de IA pode ler, planejar ou propor, e as chaves de acesso para assistentes em outras máquinas.

- **ID**: `system.assistant`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/etc/ibexwall/mcp.toml`, `/etc/ibexwall/mcp`
- **Pode escrever**: `/etc/ibexwall/mcp.toml`, `/etc/ibexwall/mcp`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não
- **Pode afetar**: assistants

**Vale saber antes de ligar**

- Ligar o acesso remoto abre uma porta que só responde a uma chave válida, com TLS. Assistentes podem ler e, se você permitir, propor; nunca aplicam uma mudança.

## Auditoria de segurança {#system-audit}

Mostra os avisos e sugestões do Lynis quando ele está instalado. O IbexWall não o inclui nem o executa.

- **ID**: `system.audit`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/var/log/lynis-report.dat`, `/usr/bin/lynis`, `/usr/sbin/lynis`, `/usr/share/lynis`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não

## Core dumps {#system-coredump}

Verifica se os despejos de falha (que podem conter senhas e chaves) são guardados, e desliga o armazenamento.

- **ID**: `system.coredump`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/proc/sys/kernel`, `/etc/systemd`, `/usr/lib/systemd`
- **Pode escrever**: `/etc/systemd/coredump.conf.d`
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não
- **Pode afetar**: diagnostics

**Vale saber antes de ligar**

- Relatórios de falha e depuração post-mortem (coredumpctl) ficam sem material para trabalhar.

## Firmware {#system-firmware}

Verifica se o serviço de atualização de firmware (fwupd) está instalado e atualizando sua lista.

- **ID**: `system.firmware`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/sys/class/dmi/id`, `/usr/libexec/fwupd`, `/usr/lib/fwupd`, `/usr/lib/systemd/system`, `/etc/systemd/system`
- **Pode gerenciar estes serviços**: `fwupd-refresh.timer`
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não
- **Pode afetar**: firmware

## Endurecimento {#system-hardening}

Diz quais das configurações de endurecimento recomendadas esta máquina já tem. Não altera nada; cada configuração é aplicada pelo plugin que a controla.

- **ID**: `system.hardening`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/proc/sys`, `/proc/mounts`, `/etc/modprobe.d`, `/usr/lib/modprobe.d`
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não

## Módulos do kernel {#system-modules}

Impede que grupos de módulos do kernel raramente necessários sejam carregados, o que reduz o que um atacante alcança pelo kernel.

- **ID**: `system.modules`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/etc/modprobe.d`, `/usr/lib/modprobe.d`, `/proc/modules`
- **Pode escrever**: `/etc/modprobe.d`
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não
- **Pode afetar**: kernel

**Vale saber antes de ligar**

- Módulos que já estão carregados continuam carregados até a próxima reinicialização. Um programa que precise de um dos módulos bloqueados não conseguirá iniciá-lo.

## Montagens temporárias {#system-mounts}

Verifica se /tmp e /dev/shm não executam programas nem guardam arquivos setuid, e configura para a próxima inicialização.

- **ID**: `system.mounts`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/proc/mounts`, `/etc/systemd/system`, `/usr/lib/systemd/system`
- **Pode escrever**: `/etc/systemd/system/tmp.mount.d`, `/etc/systemd/system/dev-shm.mount.d`
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não
- **Pode afetar**: boot

**Vale saber antes de ligar**

- Programas que extraem e executam código de uma pasta temporária (alguns instaladores, compilações e jogos) podem parar de funcionar.
- As novas opções valem a partir da próxima inicialização; nada é remontado agora, então não há o que desfazer ao vivo.

## Verificação de perfil de segurança (OpenSCAP) {#system-openscap}

Confere este computador com um perfil de segurança publicado (por exemplo ANSSI ou CIS) usando o OpenSCAP e lista as regras que falham. Não altera nada.

- **ID**: `system.openscap`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/var/lib/ibexwall/openscap`, `/usr/share/xml/scap/ssg/content`, `/usr/bin`, `/etc/os-release`, `/etc/systemd/system`
- **Pode escrever**: `/etc/systemd/system/ibexwall-openscap-scan.service`, `/etc/systemd/system/ibexwall-openscap-scan.timer`, `/var/lib/ibexwall/openscap/.managed`
- **Pode gerenciar estes serviços**: `ibexwall-openscap-scan.service`, `ibexwall-openscap-scan.timer`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não
- **Pode afetar**: performance

**Vale saber antes de ligar**

- A verificação lê muitos arquivos e configurações e pode deixar o computador mais lento enquanto roda. Ela não altera nada.

## Portas expostas {#system-ports}

Lista os serviços que aceitam conexões de outros computadores.

- **ID**: `system.ports`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/proc/net`
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não

## Segurança do sistema {#system-posture}

Verifica o quanto este computador está protegido: boot, disco, firewall e contas.

- **ID**: `system.posture`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/sys`, `/proc`, `/etc`, `/run/systemd`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não

## Bloqueio de tela {#system-session-lock}

Verifica se a área de trabalho bloqueia a tela sozinha quando você se afasta.

- **ID**: `system.session-lock`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/etc/dconf`, `/home`, `/usr/bin`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não

## Servidor SSH {#system-ssh}

Verifica as configurações do servidor SSH (login de root, senhas vazias, encaminhamento) e as reforça com um drop-in.

- **ID**: `system.ssh`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/etc/ssh`, `/usr/sbin/sshd`, `/usr/lib/systemd/system`, `/run`
- **Pode escrever**: `/etc/ssh/sshd_config.d`
- **Pode gerenciar estes serviços**: `sshd.service`, `ssh.service`
- **Pode pedir ao núcleo que execute**: `/usr/sbin/sshd -t`
- **Executa como**: um usuário dinâmico, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não
- **Pode afetar**: remote-access

**Vale saber antes de ligar**

- Entrar como root por SSH com senha deixa de funcionar. Use um usuário comum e sudo, ou uma chave.
- Sem senhas, só entra quem tem uma chave autorizada. Confira a sua antes, ou você pode ficar sem acesso.

## Endurecimento do kernel {#system-sysctl}

Compara as configurações de segurança do kernel com a tabela de referência, e aplica.

- **ID**: `system.sysctl`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/proc/sys`, `/etc/sysctl.d`
- **Pode escrever**: `/etc/sysctl.d`
- **Pode alterar estas configurações do kernel**: `kernel.kptr_restrict`, `kernel.dmesg_restrict`, `kernel.yama.ptrace_scope`, `kernel.unprivileged_bpf_disabled`, `net.core.bpf_jit_harden`, `fs.protected_symlinks`, `fs.protected_hardlinks`, `fs.protected_fifos`, `fs.protected_regular`, `fs.suid_dumpable`, `kernel.kexec_load_disabled`, `net.ipv4.conf.all.accept_redirects`, `net.ipv4.conf.all.send_redirects`, `net.ipv4.conf.all.accept_source_route`, `net.ipv6.conf.all.accept_redirects`, `net.ipv4.tcp_syncookies`, `dev.tty.ldisc_autoload`, `vm.unprivileged_userfaultfd`, `net.ipv4.conf.all.rp_filter`, `kernel.sysrq`, `kernel.perf_event_paranoid`, `net.ipv4.tcp_rfc1337`, `net.ipv4.conf.all.secure_redirects`, `net.ipv4.conf.default.accept_redirects`, `net.ipv4.conf.default.secure_redirects`, `net.ipv4.conf.default.send_redirects`, `net.ipv6.conf.default.accept_redirects`, `net.ipv4.conf.default.accept_source_route`, `net.ipv6.conf.all.accept_source_route`, `net.ipv6.conf.default.accept_source_route`, `net.ipv4.conf.default.rp_filter`, `net.ipv6.conf.all.accept_ra`, `net.ipv6.conf.default.accept_ra`, `net.ipv4.tcp_sack`, `user.max_user_namespaces`
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não
- **Pode afetar**: kernel

**Vale saber antes de ligar**

- Anexar um depurador a um programa já em execução (gdb, strace) deixa de funcionar.
- Programas que carregam eBPF sem privilégios deixam de funcionar. O IbexWall não é afetado: ele roda com privilégios.
- Não pode ser desfeito sem reiniciar: o carregamento via kexec segue desativado até lá.
- Pode quebrar VPNs e máquinas com várias rotas de rede.
- As teclas de emergência SysRq deixam de funcionar.
- Endereços e rotas IPv6 anunciados pelo roteador deixam de ser aceitos, então o IPv6 pode parar em redes que dependem deles.
- Downloads podem ficar mais lentos em conexões com perda de pacotes.
- Programas que montam o próprio sandbox sem privilégios deixam de funcionar: Flatpak, sandboxes do Chromium e do Firefox, contêineres sem root.

## Atualizações automáticas {#system-updates}

Verifica se as atualizações de segurança se instalam sozinhas, e liga isso quando a ferramenta da distro está instalada.

- **ID**: `system.updates`, **Versão**: 0.1.0, **Categoria**: system, **Tipos**: verificação, controle, **Origem**: official
- **Ligado por padrão**: sim
- **Pode ler**: `/etc/os-release`, `/etc/apt`, `/etc/dnf`, `/etc/systemd/system`, `/usr/lib/systemd/system`, `/usr/bin`, `/usr/lib/os-release`
- **Pode escrever**: `/etc/apt/apt.conf.d`, `/etc/dnf/dnf5-plugins/automatic.d`
- **Pode gerenciar estes serviços**: `dnf5-automatic.timer`, `apt-daily-upgrade.timer`
- **Executa como**: um usuário dinâmico, **Capacidades**: nenhuma, **Acesso à rede pelo plugin**: não
- **Pode afetar**: updates

**Vale saber antes de ligar**

- Serviços podem reiniciar quando são atualizados, e algumas atualizações pedem reinicialização.

## Vulnerabilidades conhecidas {#vuln-cves}

Lista as atualizações de segurança que a sua distribuição publicou para os pacotes instalados. Funciona offline, pelo cache do próprio gerenciador de pacotes; nada é enviado a lugar nenhum.

- **ID**: `vuln.cves`, **Versão**: 0.1.0, **Categoria**: vuln, **Tipos**: verificação, **Origem**: official
- **Ligado por padrão**: não
- **Pode ler**: `/var/cache`, `/var/lib`, `/etc`, `/usr`
- **Executa como**: root, **Capacidades**: `CAP_DAC_READ_SEARCH`, **Acesso à rede pelo plugin**: não
- **Precisa de**: `dnf5`, `apt-get`, `arch-audit`
