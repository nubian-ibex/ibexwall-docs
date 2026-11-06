#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Nubian Ibex and IbexWall contributors
// SPDX-License-Identifier: GPL-3.0-or-later
//
// Writes the reference pages from the app repository, so the reference is the
// code and cannot drift from it: the plugin catalog (permissions, sandbox,
// risks, in every language), the command line, the varlink interfaces, the JSON
// schemas, the MCP tools and the security documents.
//
// The app repository is found next to this one, or at IBEXWALL_APP. The
// command line is read from a built `ibexctl` (IBEXCTL, or the app's
// target/release or target/debug); without one that page is kept as it is.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const site = join(here, '..');
const app = process.env.IBEXWALL_APP ?? join(site, '..', 'ibexwall');
const docs = join(site, 'src/content/docs');

if (!existsSync(join(app, 'plugins'))) {
  console.log('app repository not found; keeping the committed reference');
  process.exit(0);
}

const LOCALES = ['en', 'pt-BR', 'es', 'fr', 'de'];
const FOLDER = { en: '', 'pt-BR': 'pt-br', es: 'es', fr: 'fr', de: 'de' };
const SPDX = '';

function write(locale, path, frontmatter, body) {
  const file = join(docs, FOLDER[locale], 'reference', path);
  mkdirSync(dirname(file), { recursive: true });
  const fm = Object.entries(frontmatter)
    .map(([k, v]) => (typeof v === 'object' ? `${k}:\n${Object.entries(v).map(([a, b]) => `  ${a}: ${JSON.stringify(b)}`).join('\n')}` : `${k}: ${JSON.stringify(v)}`))
    .join('\n');
  writeFileSync(file, `---\n${fm}\n---\n\n${body.trim()}\n`);
}

// A small TOML reader for the plugin manifests (the subset they use).
function parseToml(text) {
  const out = {};
  let table = out;
  const value = (raw) => {
    raw = raw.trim();
    if (raw.startsWith('"')) return JSON.parse(raw);
    if (raw === 'true' || raw === 'false') return raw === 'true';
    if (/^-?\d+$/.test(raw)) return Number(raw);
    if (raw.startsWith('[')) return parseArray(raw);
    if (raw.startsWith('{')) return parseInline(raw);
    return raw;
  };
  const parseArray = (raw) => {
    const items = [];
    let depth = 0;
    let current = '';
    let inString = false;
    for (let i = 1; i < raw.length - 1; i += 1) {
      const c = raw[i];
      if (c === '"' && raw[i - 1] !== '\\') inString = !inString;
      if (!inString && (c === '[' || c === '{')) depth += 1;
      if (!inString && (c === ']' || c === '}')) depth -= 1;
      if (!inString && depth === 0 && c === ',') {
        if (current.trim()) items.push(value(current));
        current = '';
      } else current += c;
    }
    if (current.trim()) items.push(value(current));
    return items;
  };
  const parseInline = (raw) => {
    const obj = {};
    const inner = raw.slice(1, -1);
    const parts = [];
    let depth = 0;
    let current = '';
    let inString = false;
    for (let i = 0; i < inner.length; i += 1) {
      const c = inner[i];
      if (c === '"' && inner[i - 1] !== '\\') inString = !inString;
      if (!inString && (c === '[' || c === '{')) depth += 1;
      if (!inString && (c === ']' || c === '}')) depth -= 1;
      if (!inString && depth === 0 && c === ',') {
        parts.push(current);
        current = '';
      } else current += c;
    }
    if (current.trim()) parts.push(current);
    for (const part of parts) {
      const eq = part.indexOf('=');
      obj[part.slice(0, eq).trim()] = value(part.slice(eq + 1));
    }
    return obj;
  };
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    let line = lines[i].trim();
    if (!line || line.startsWith('#')) continue;
    const header = /^\[([^\]]+)\]$/.exec(line);
    if (header) {
      table = out;
      for (const part of header[1].split('.')) table = table[part] ??= {};
      continue;
    }
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim().replace(/^"|"$/g, '');
    let rest = line.slice(eq + 1).trim();
    // A value that spans lines (an array) ends when its brackets balance.
    const balance = (s) => [...s].reduce((n, c) => n + (c === '[' || c === '{' ? 1 : c === ']' || c === '}' ? -1 : 0), 0);
    while (balance(rest) > 0 && i + 1 < lines.length) {
      i += 1;
      rest += ` ${lines[i].trim()}`;
    }
    table[key] = value(rest);
  }
  return out;
}

// Plugins, in every language.

const LABELS = {
  en: { title: 'Plugin catalog', desc: 'Every official plugin: what it is for, what it may read and change, how it is sandboxed, and what it can affect.', intro: 'The thirty-two official plugins. Each one proposes and never applies: the core applies, through a plan, a snapshot and your approval. The list below is generated from the plugin manifests, so it is what the daemon enforces.', category: 'Category', kinds: 'Kinds', origin: 'Origin', version: 'Version', reads: 'May read', writes: 'May write', units: 'May manage these services', commands: 'May ask the core to run', sysctl: 'May change these kernel settings', firewall: 'May change the firewall', network: 'Network access from the plugin', yes: 'yes', no: 'no', user: 'Runs as', dynamic: 'a dynamic user', caps: 'Capabilities', none: 'none', affects: 'Can affect', notes: 'Worth knowing before you turn it on', requires: 'Needs', default: 'On by default', check: 'check', control: 'control' },
  'pt-BR': { title: 'Catálogo de plugins', desc: 'Todos os plugins oficiais: para que servem, o que podem ler e alterar, como ficam isolados e o que podem afetar.', intro: 'Os trinta e dois plugins oficiais. Cada um propõe e nunca aplica: quem aplica é o núcleo, por meio de um plano, de um instantâneo e da sua aprovação. A lista abaixo é gerada a partir dos manifestos dos plugins, então é o que o daemon realmente impõe.', category: 'Categoria', kinds: 'Tipos', origin: 'Origem', version: 'Versão', reads: 'Pode ler', writes: 'Pode escrever', units: 'Pode gerenciar estes serviços', commands: 'Pode pedir ao núcleo que execute', sysctl: 'Pode alterar estas configurações do kernel', firewall: 'Pode alterar o firewall', network: 'Acesso à rede pelo plugin', yes: 'sim', no: 'não', user: 'Executa como', dynamic: 'um usuário dinâmico', caps: 'Capacidades', none: 'nenhuma', affects: 'Pode afetar', notes: 'Vale saber antes de ligar', requires: 'Precisa de', default: 'Ligado por padrão', check: 'verificação', control: 'controle' },
  es: { title: 'Catálogo de plugins', desc: 'Todos los plugins oficiales: para qué sirven, qué pueden leer y cambiar, cómo están aislados y qué pueden afectar.', intro: 'Los treinta y dos plugins oficiales. Cada uno propone y nunca aplica: aplica el núcleo, mediante un plan, una instantánea y tu aprobación. La lista de abajo se genera a partir de los manifiestos de los plugins, así que es lo que el daemon hace cumplir.', category: 'Categoría', kinds: 'Tipos', origin: 'Origen', version: 'Versión', reads: 'Puede leer', writes: 'Puede escribir', units: 'Puede gestionar estos servicios', commands: 'Puede pedir al núcleo que ejecute', sysctl: 'Puede cambiar estos ajustes del kernel', firewall: 'Puede cambiar el cortafuegos', network: 'Acceso a la red del plugin', yes: 'sí', no: 'no', user: 'Se ejecuta como', dynamic: 'un usuario dinámico', caps: 'Capacidades', none: 'ninguna', affects: 'Puede afectar', notes: 'Conviene saber antes de activarlo', requires: 'Necesita', default: 'Activado por defecto', check: 'comprobación', control: 'control' },
  fr: { title: 'Catalogue des plugins', desc: 'Tous les plugins officiels : leur rôle, ce qu’ils peuvent lire et modifier, comment ils sont isolés et ce qu’ils peuvent affecter.', intro: 'Les trente-deux plugins officiels. Chacun propose et n’applique jamais : c’est le cœur qui applique, par un plan, un instantané et votre approbation. La liste ci-dessous est générée à partir des manifestes des plugins, c’est donc ce que le démon impose réellement.', category: 'Catégorie', kinds: 'Types', origin: 'Origine', version: 'Version', reads: 'Peut lire', writes: 'Peut écrire', units: 'Peut gérer ces services', commands: 'Peut demander au cœur d’exécuter', sysctl: 'Peut modifier ces réglages du noyau', firewall: 'Peut modifier le pare-feu', network: 'Accès réseau du plugin', yes: 'oui', no: 'non', user: 'S’exécute en tant que', dynamic: 'un utilisateur dynamique', caps: 'Capacités', none: 'aucune', affects: 'Peut affecter', notes: 'À savoir avant de l’activer', requires: 'Nécessite', default: 'Activé par défaut', check: 'vérification', control: 'contrôle' },
  de: { title: 'Plugin-Katalog', desc: 'Alle offiziellen Plugins: wofür sie da sind, was sie lesen und ändern dürfen, wie sie abgeschottet sind und was sie beeinflussen können.', intro: 'Die zweiunddreißig offiziellen Plugins. Jedes schlägt nur vor und wendet nie an: Der Kern wendet an, über einen Plan, einen Sicherungspunkt und Ihre Zustimmung. Die Liste unten wird aus den Plugin-Manifesten erzeugt, ist also das, was der Daemon durchsetzt.', category: 'Kategorie', kinds: 'Arten', origin: 'Herkunft', version: 'Version', reads: 'Darf lesen', writes: 'Darf schreiben', units: 'Darf diese Dienste verwalten', commands: 'Darf den Kern bitten auszuführen', sysctl: 'Darf diese Kernel-Einstellungen ändern', firewall: 'Darf die Firewall ändern', network: 'Netzwerkzugriff des Plugins', yes: 'ja', no: 'nein', user: 'Läuft als', dynamic: 'ein dynamischer Benutzer', caps: 'Fähigkeiten', none: 'keine', affects: 'Kann beeinflussen', notes: 'Gut zu wissen, bevor Sie es einschalten', requires: 'Benötigt', default: 'Standardmäßig an', check: 'Prüfung', control: 'Steuerung' },
};

// The first line of a message in a plugin's catalog (the notes are single messages).
function messageOf(pluginDir, locale, key) {
  for (const l of [locale, 'en']) {
    const file = join(pluginDir, 'locales', `${l}.ftl`);
    if (!existsSync(file)) continue;
    const m = new RegExp(`^${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} = (.+)$`, 'm').exec(readFileSync(file, 'utf8'));
    if (m) return m[1].trim();
  }
  return key;
}

const pluginDirs = readdirSync(join(app, 'plugins')).sort();
const manifests = pluginDirs
  .map((dir) => ({ dir: join(app, 'plugins', dir), m: existsSync(join(app, 'plugins', dir, 'plugin.toml')) ? parseToml(readFileSync(join(app, 'plugins', dir, 'plugin.toml'), 'utf8')) : null }))
  .filter((p) => p.m && p.m.category !== 'dev');

const code = (items) => items.map((i) => `\`${i}\``).join(', ');
for (const locale of LOCALES) {
  const L = LABELS[locale];
  const groups = {};
  for (const { m } of manifests) (groups[m.category] ??= []).push(m);
  let body = `${L.intro}\n\n`;
  for (const { dir, m } of manifests) {
    const p = m.privileges ?? {};
    const s = m.sandbox ?? {};
    const r = m.risk ?? {};
    body += `## ${m.name[locale] ?? m.name.en} {#${m.id.replace(/\./g, '-')}}\n\n`;
    body += `${m.description[locale] ?? m.description.en}\n\n`;
    body += `- **ID**: \`${m.id}\`, **${L.version}**: ${m.version}, **${L.category}**: ${m.category}, **${L.kinds}**: ${(m.kinds ?? []).map((k) => L[k] ?? k).join(', ')}, **${L.origin}**: ${m.origin}\n`;
    body += `- **${L.default}**: ${m.default_enabled ? L.yes : L.no}\n`;
    if ((s.read_paths ?? []).length) body += `- **${L.reads}**: ${code(s.read_paths)}\n`;
    if ((p.write_paths ?? []).length) body += `- **${L.writes}**: ${code(p.write_paths)}\n`;
    if ((p.units ?? []).length) body += `- **${L.units}**: ${code(p.units)}\n`;
    if ((p.exec ?? []).length) body += `- **${L.commands}**: ${code(p.exec.map((e) => [e.path, ...(e.args ?? [])].join(' ')))}\n`;
    if ((p.sysctl_keys ?? []).length) body += `- **${L.sysctl}**: ${code(p.sysctl_keys)}\n`;
    if (p.nft_prefix || (p.firewall_backends ?? []).length) body += `- **${L.firewall}**: ${p.nft_prefix ? `\`${p.nft_prefix}\`` : ''} ${code(p.firewall_backends ?? [])}\n`;
    body += `- **${L.user}**: ${s.user === 'dynamic' ? L.dynamic : s.user}, **${L.caps}**: ${(s.capabilities ?? []).length ? code(s.capabilities) : L.none}, **${L.network}**: ${s.network ? L.yes : L.no}\n`;
    if ((r.affects ?? []).length) body += `- **${L.affects}**: ${r.affects.join(', ')}\n`;
    if ((m.requires?.commands ?? []).length) body += `- **${L.requires}**: ${code(m.requires.commands)}\n`;
    if ((r.may_affect ?? []).length) {
      body += `\n**${L.notes}**\n\n`;
      for (const key of r.may_affect) body += `- ${messageOf(dir, locale, key)}\n`;
    }
    body += '\n';
  }
  write(locale, 'plugins.md', { title: L.title, description: L.desc, sidebar: { order: 1 } }, body);
}

// The command line, from a built ibexctl.

function ibexctl() {
  for (const p of [process.env.IBEXCTL, join(app, 'target/release/ibexctl'), join(app, 'target/debug/ibexctl')]) {
    if (p && existsSync(p)) return p;
  }
  return null;
}
function help(binary, args) {
  return execFileSync(binary, [...args, '--help'], { encoding: 'utf8' }).trimEnd();
}
function subcommands(text) {
  const section = /\nCommands:\n([\s\S]*?)(\n\n|$)/.exec(text);
  if (!section) return [];
  return section[1].split('\n').map((l) => /^\s{2}(\S+)\s/.exec(l)?.[1]).filter((c) => c && c !== 'help');
}
const cli = ibexctl();
if (cli) {
  let body = 'The `ibexctl` command talks to the daemon. Every command takes `--json` for machine-readable output. This page is generated from the program\'s own help.\n\n';
  const walk = (args, depth) => {
    const text = help(cli, args);
    body += `${'#'.repeat(Math.min(depth + 1, 4))} \`${['ibexctl', ...args].join(' ')}\`\n\n\`\`\`text\n${text}\n\`\`\`\n\n`;
    for (const sub of subcommands(text)) walk([...args, sub], depth + 1);
  };
  walk([], 1);
  write('en', 'cli.md', { title: 'Command line', description: 'Every ibexctl command, from the program\'s own help.', sidebar: { order: 2 } }, body);
} else {
  console.log('no built ibexctl; keeping reference/cli.md');
}

// The varlink interfaces and the schemas.

let idl = 'The daemon speaks varlink on `/run/ibexwall/core.sock`. These are the interfaces, as exported by `cargo xtask schemas`.\n\n';
for (const file of readdirSync(join(app, 'spec/idl')).sort()) {
  idl += `## ${file.replace(/\.varlink$/, '')}\n\n\`\`\`text\n${readFileSync(join(app, 'spec/idl', file), 'utf8').trimEnd()}\n\`\`\`\n\n`;
}
write('en', 'varlink.md', { title: 'Varlink interfaces', description: 'The interfaces of the daemon, the plugins and the policy.', sidebar: { order: 3 } }, idl);

let schemas = 'The JSON Schemas of the types the daemon, the plugins and the assistant server exchange, as exported by `cargo xtask schemas`.\n\n';
for (const file of readdirSync(join(app, 'spec/schemas')).sort()) {
  const schema = JSON.parse(readFileSync(join(app, 'spec/schemas', file), 'utf8'));
  const name = file.replace(/\.schema\.json$/, '');
  schemas += `## ${name}\n\n${schema.description ? `${String(schema.description).split('\n')[0]}\n\n` : ''}<details><summary>JSON Schema</summary>\n\n\`\`\`json\n${JSON.stringify(schema, null, 2)}\n\`\`\`\n\n</details>\n\n`;
}
write('en', 'schemas.md', { title: 'JSON Schemas', description: 'The types the components exchange.', sidebar: { order: 4 } }, schemas);

// MCP tools, read from the server's source.

const toolsSource = readFileSync(join(app, 'crates/ibexwall-mcp/src/tools.rs'), 'utf8');
const tools = [...toolsSource.matchAll(/tool\(\s*"([^"]+)",\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => ({ name: m[1], description: m[2].replace(/\\"/g, '"') }));
let mcp = 'The tools the assistant server (`ibexwall-mcp`) offers. None of them applies a change: the strongest only creates a proposal that a person approves in IbexWall.\n\n';
for (const t of tools) mcp += `- \`${t.name}\`: ${t.description}\n`;
write('en', 'mcp-tools.md', { title: 'MCP tools', description: 'What an AI assistant can ask IbexWall for.', sidebar: { order: 5 } }, mcp);

// Documents of the app repository, as reference pages.

function copyDoc(source, target, title, description, order) {
  const text = readFileSync(join(app, source), 'utf8')
    .replace(/<!--[\s\S]*?-->\n?/g, '')
    .replace(/^# .*\n+/, '');
  write('en', target, { title, description, sidebar: { order } }, text);
}
copyDoc('docs/threat-model.md', 'threat-model.md', 'Threat model', 'What IbexWall protects, from whom, and what it does not claim.', 6);
copyDoc('docs/systemd-security.md', 'systemd-security.md', 'systemd sandbox scores', 'The systemd-analyze security score of every IbexWall unit.', 7);
copyDoc('docs/release.md', 'release-verification.md', 'Releases and how to check them', 'What a release holds and how to verify it.', 8);
copyDoc('docs/capabilities-matrix.md', 'capabilities.md', 'Capabilities matrix', 'The capabilities each component needs and why.', 9);

console.log(`reference: ${manifests.length} plugins x ${LOCALES.length} languages, ${tools.length} tools${cli ? ', the command line' : ''}`);
