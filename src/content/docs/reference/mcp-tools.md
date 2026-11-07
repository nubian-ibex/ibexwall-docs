---
title: "MCP tools"
description: "What an AI assistant can ask IbexWall for."
sidebar:
  order: 5
---

The tools the assistant server (`ibexwall-mcp`) offers. None of them applies a change: the strongest only creates a proposal that a person approves in IbexWall.

- `get_posture`: The security score and the state of each protection (read only).
- `list_findings`: Open findings, optionally for one plugin or from a minimum severity (read only).
- `explain_finding`: One finding with its references and the remediation IbexWall offers (read only).
- `query_events`: Recent events of one source (read only). The `dns` source returns counts only unless the owner allowed more.
- `get_app_connections`: Where one application connected: destinations, ports and counts (read only).
- `run_check`: Run the read-only checks of one plugin and return its findings.
- `dry_run`: Show what a patch would do, operation by operation, without applying or queueing anything.
- `propose_change`: Put a change in the queue for a person to review. Nothing is applied: a human approves or rejects it in IbexWall, every applied change is snapshotted and can be rolled back, and changes that cannot be rolled back are refused.
- `list_proposals`: Your own proposals and their state (read only).
- `list_compliance`: The compliance profiles the machine can be evaluated against (read only).
- `get_compliance`: One profile's controls and their states: compliant, non-compliant, not-assessed, needs-attestation, not-applicable or excepted (read only).
