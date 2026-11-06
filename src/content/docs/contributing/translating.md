---
title: "Translating"
description: "Add a language to IbexWall or improve an existing one; no code changes are needed."
sidebar:
  order: 2
---

English is the source language and the fallback. IbexWall ships English, Portuguese (Brazil), Spanish, French and German. It starts in the language your system asks for (from `LANG`, or the first language of the session that is shipped), unless you pick one in Settings.

A language is a set of text files and one line in a list. You do not need to write any code to add one, apart from two small notification branches described below.

## Add a language

All paths are in the [app repository](https://github.com/nubian-ibex/ibexwall).

1. Pick the language tag, for example `it`, `ja` or `pt-PT`. Add it to `LOCALES` in `crates/ibexwall-proto/src/names.rs`.
2. Copy `ui/locales/en/ui.ftl` to `ui/locales/TAG/ui.ftl` and translate it.
3. For every plugin that has `plugins/ID/locales/en.ftl`, copy it to `plugins/ID/locales/TAG.ftl` and translate it.
4. In every `plugins/ID/plugin.toml`, add `TAG = "..."` under `[name]` and under `[description]`. Then run `cargo xtask devkey` to sign the manifests again.
5. In `catalog/hardening.json`, add `TAG` to the `title`, `summary` and `breaks` of every item.
6. Check your work:

   ```sh
   node scripts/check-locales.mjs TAG
   cargo nextest run -p ibexwall-proto
   ```

   Both list what is missing.

The app finds a language by the folder name under `ui/locales`, and the language picker shows each language by its own name.

The tray menu and the session agent's notifications are in `ui/src-tauri/src/lib.rs` and `crates/ibexwall-agent/src/main.rs`. Add a branch for your language in each.

To improve an existing language, edit its files in the same places and run the same checks.

## Rules for the text

Text files use the Fluent format. Follow these rules and the checker will stay quiet.

- Keep every `{ $variable }`. You may move it within the sentence.
- A choice, such as `{ $n -> [one] ... *[other] ... }`, must put each variant on its own line. Otherwise Fluent drops the whole message without a word. The checker reports this.
- Do not translate product names, commands, file paths, unit names or anything in backticks.
- Do not use the em dash or the en dash. Use a comma, a colon or two sentences.
- Use the same word for the same idea everywhere (firewall, snapshot, hardening). The glossary of each language is the choice already made in its `ui.ftl`; read it before you start.
- Keep the tone calm, plain and short. Say what happens and what the person can do.

## Send it

Send your work as a pull request. Every commit needs a sign-off (`git commit -s`); see [Contributing](/contributing/). If you are unsure about a term, open the pull request anyway and ask in it.
