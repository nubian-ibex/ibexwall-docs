---
title: "Contributing"
description: "How to build, test and send changes to IbexWall."
sidebar:
  order: 1
---

IbexWall runs as root on people's computers, so changes are held to a high bar: safety and the ability to undo come before features and speed. This page covers the practical side. The code is at [github.com/nubian-ibex/ibexwall](https://github.com/nubian-ibex/ibexwall). To add a language, see [Translating](/contributing/translating/).

## The host is never changed

This is the first rule. In development, never apply nftables, sysctl, DNS settings, systemd units or eBPF on your own machine, and do not use `sudo` in scripts. System behavior is tested in two safe ways:

- in virtual machines, with `cargo xtask vm-test`;
- with `IBEXWALL_ROOT`, which points IbexWall at a directory instead of `/`, together with the fake system implementations in `ibexwall-sys`.

IbexWall's own artifacts are the only things it writes: `table inet ibexwall` and files with `ibexwall` in the name. Plugins propose and the core executes, so a new system effect needs a typed operation, a declaration in the plugin manifest, an inverse and tests. No shell calls.

## Set up

- Rust with the pinned toolchain from `rust-toolchain.toml`.
- `cargo install cargo-nextest cargo-deny`.
- `pnpm` for the interface in `ui/`.
- For VM tests: `qemu-system-x86_64`, `qemu-img`, `genisoimage`, `curl` and `/dev/kvm`.

## Build and test

```sh
cargo fmt --all
cargo clippy --workspace --all-targets -- -D warnings
cargo nextest run --workspace
cargo deny check
cargo xtask schemas --check
```

If you change a type in `ibexwall-proto`, run `cargo xtask schemas` and commit the regenerated `spec/` in the same commit.

For the interface:

```sh
pnpm -C ui test
pnpm -C ui lint
pnpm -C ui e2e
```

## Try the app without touching your system

`scripts/dev-sandbox.sh` opens the desktop app against a sandboxed daemon that uses `IBEXWALL_ROOT`, so no polkit policy, unit or nftables rule is installed on your machine. Build the frontend and the binaries first; the comment at the top of the script lists the commands. The sandbox daemon authorizes only the current user and is stopped, with its plugins, when the window closes.

## The VM matrix

Virtual machines run the real thing: systemd, polkit and socket activation.

```sh
cargo xtask vm-test --distro fedora --phase f1
```

The distributions are `fedora`, `ubuntu-24.04`, `ubuntu-26.04`, `debian` and `arch`. Images are the official cloud images, checked against their checksums and cached under `~/.cache/ibexwall/vm/`. The packaging phase, `--phase f10`, builds the packages, installs them, makes real changes, upgrades, removes, and checks that nothing is left behind.

## Commits and sign-off

- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `ci:`), with the subject in the imperative mood.
- Every commit needs a DCO sign-off: `git commit -s`. The trailer must match the commit author. There is no CLA.
- One logical change per commit. Keep refactors apart from behavior changes.
- Tests come with the change: unit tests for logic, VM or fake-backed tests for anything that touches the system, and chaos tests for networking or DNS.
- Every interface string ships with English and Portuguese (Brazil) text in the same commit.
- New dependencies need a justification, and their licenses must match `deny.toml`.

## Reporting a security problem

Do not open a public issue. Use [GitHub Security Advisories](https://github.com/nubian-ibex/ibexwall/security/advisories/new).
