---
title: "Compliance"
description: "Report which technical controls of a framework this machine meets, which it does not, and which need a person."
sidebar:
  order: 2
---

The **Compliance** screen answers one question per framework: which of its technical controls does this machine meet right now, which does it not, and which can software not decide.

Compliance means the mapped technical controls hold on this machine. It is never a certification. Certification comes from an independent audit, which also covers processes, people and scope that no program running on one computer can see. Every screen and every export says this.

## Control states

Each control of a framework lands in one of six states:

- **Compliant:** every required check passed and is fresh.
- **Non-compliant:** at least one required check failed.
- **Not assessed:** a required check is missing, stale or unknown. This is never a pass.
- **Needs attestation:** the control is organizational, so software cannot decide it. A person records a statement, an owner and an expiry.
- **Not applicable:** every required check says so.
- **Excepted:** a risk a named owner accepted, with an expiry date. Shown apart, never counted as compliant. An expired exception falls back to the real state.

A framework shows counts of each state, never one percentage that hides the not-assessed and attestation groups.

## How it works

A profile maps a framework to the checks the product already runs. The core evaluates the stored check results against the profile, the attestations and the exceptions. It runs no new system effect: a failed control only links to the plan of the plugin that owns it, and that plan goes through the normal review, snapshot, approval and rollback.

Unknown is never a pass. A check that did not run, could not read its input, or is older than the freshness limit makes its control not assessed. Licensed texts are never copied: each control has IbexWall's own wording, the reference number, a URL and the date it was consulted.

## The first-release frameworks

Each framework is described, with its honest limits, at the project site under [ibexwall.com/compliance](https://ibexwall.com/compliance/).

- **IbexWall Baseline** is the project's own recommended set, mapped straight to the checks. No licensed text, and the default the app shows first.
- **LGPD (Lei 13.709/2018)** maps article 46, with art. 6 VII and art. 49. The law names no technical control, so this mapping is IbexWall's reading, stated plainly.
- **CMN 4.893/2021**, as amended by CMN 5.274/2025, maps article 3 paragraph 2, raised to 14 items by the amendment. Nine items are automated; the other five are organizational and carry an attestation control.
- **NIST SP 800-53 Rev. 5** and **NIST SP 800-171 Rev. 3** map the host subset. Both are public, and NIST publishes the catalogs in OSCAL.
- **ISO/IEC 27001:2022** maps the Annex A theme 8 controls a host can show, by number and title only.

CIS Benchmarks are not mapped natively: the CIS certification page states that a product that incorporates a Benchmark needs CIS certification before any sale, distribution or marketing. Running the distribution's OpenSCAP content stays possible as your own choice. DISA STIG, ANSSI-BP-028 and other OpenSCAP content are reached through `system.openscap`, not mapped by IbexWall.

## Attestation and exceptions

Organizational controls need a person. On the control, record a statement, an owner and an expiry date. The state moves to compliant while the attestation is current, and back to needs attestation when it expires.

An exception records an accepted risk with an owner and an expiry. It is shown apart and never counted as compliant.

## Export

From the command line, `ibexctl compliance export "IbexWall Baseline"` writes a signed report; `--format csv` and `--format oscal` give the same evidence as CSV and OSCAL Assessment Results. The signed report carries the date, the profile version, each control's state, the raw check results, the attestations and the head of the audit chain, and is sealed with a device key so a tampered copy fails verification.

## The command line

```sh
ibexctl compliance list
ibexctl compliance show "IbexWall Baseline"
ibexctl compliance export "IbexWall Baseline"
```

Profiles are YAML under `/usr/lib/ibexwall/profiles`; an operator's files in `/etc/ibexwall/profiles` shadow the shipped ones by name.
