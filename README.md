<!-- SPDX-FileCopyrightText: 2026 Nubian Ibex and IbexWall contributors -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later

# ibexwall-docs

[![CI](https://github.com/nubian-ibex/ibexwall-docs/actions/workflows/ci.yml/badge.svg)](https://github.com/nubian-ibex/ibexwall-docs/actions/workflows/ci.yml)
[![License: GPL-3.0-or-later](https://img.shields.io/badge/license-GPL--3.0--or--later-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.html)


The IbexWall documentation, <https://docs.ibexwall.com>: getting started, the
concepts (plans and rollback, plugins, privacy, the security model), the guides
(hardening, firewall and apps, secure DNS, connecting an AI, the command line,
uninstalling, troubleshooting), the reference and the decision records. Built
with [Astro Starlight](https://starlight.astro.build).

## Build

```sh
pnpm install
pnpm build     # regenerates the reference from the app repository, then builds
pnpm preview
```

`scripts/generate-reference.mjs` writes the reference from the app repository
(found next to this one, or at `IBEXWALL_APP`): the plugin catalog with each
plugin's permissions and sandbox, the command line (from a built `ibexctl`, so
set `IBEXCTL` if needed), the varlink interfaces, the JSON schemas, the MCP
tools, the decision records and the security documents. The result is
committed: CI regenerates and fails if it differs.

## Translating

English is at the root of `src/content/docs/`; each other language is a folder
(`pt-br`, `es`, `fr`, `de`) with the same structure. A page missing in a
language shows the English one. Translate the guide pages first; the reference
pages for plugins are generated in every language from the plugin manifests.
