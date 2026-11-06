---
title: "JSON Schemas"
description: "The types the components exchange."
sidebar:
  order: 4
---

The JSON Schemas of the types the daemon, the plugins and the assistant server exchange, as exported by `cargo xtask schemas`.

## AppDestination

One destination of an application. `destination` is a domain when the

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "One destination of an application. `destination` is a domain when the\nresolver's answer was correlated, otherwise the bare address.",
  "properties": {
    "count": {
      "format": "uint64",
      "minimum": 0,
      "type": "integer"
    },
    "destination": {
      "type": "string"
    },
    "first_seen": {
      "type": "string"
    },
    "last_seen": {
      "type": "string"
    },
    "port": {
      "format": "uint16",
      "maximum": 65535,
      "minimum": 0,
      "type": "integer"
    },
    "resolved": {
      "type": "boolean"
    }
  },
  "required": [
    "destination",
    "resolved",
    "port",
    "count",
    "first_seen",
    "last_seen"
  ],
  "title": "AppDestination",
  "type": "object"
}
```

</details>

## AppEntry

One application seen by the monitor (counts and times only).

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "One application seen by the monitor (counts and times only).",
  "properties": {
    "connections": {
      "format": "uint64",
      "minimum": 0,
      "type": "integer"
    },
    "destinations": {
      "format": "uint64",
      "minimum": 0,
      "type": "integer"
    },
    "exe_path": {
      "default": null,
      "type": [
        "string",
        "null"
      ]
    },
    "first_seen": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "key": {
      "description": "Stable key, e.g. `flatpak:org.mozilla.firefox` or `cli:/usr/bin/curl`.",
      "type": "string"
    },
    "kind": {
      "description": "`flatpak`, `snap`, `desktop_app`, `system_service`, `container`,\n`cli` or `unknown`.",
      "type": "string"
    },
    "last_seen": {
      "type": "string"
    },
    "mode": {
      "description": "`allow`, `monitor`, `ask` or `block`.",
      "type": "string"
    },
    "package": {
      "default": null,
      "type": [
        "string",
        "null"
      ]
    }
  },
  "required": [
    "key",
    "kind",
    "id",
    "first_seen",
    "last_seen",
    "connections",
    "destinations",
    "mode"
  ],
  "title": "AppEntry",
  "type": "object"
}
```

</details>

## CheckOutcome

Outcome of one check. `NotApplicable` checks are left out of the score

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Outcome of one check. `NotApplicable` checks are left out of the score\ndenominator; `NotAssessed` checks cannot be evaluated yet (e.g. they\nneed a plugin that ships later) and are shown honestly, never as passes.",
  "enum": [
    "pass",
    "fail",
    "not_applicable",
    "not_assessed"
  ],
  "title": "CheckOutcome",
  "type": "string"
}
```

</details>

## CheckReport

What a plugin `Check` call returns.

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "CheckOutcome": {
      "description": "Outcome of one check. `NotApplicable` checks are left out of the score\ndenominator; `NotAssessed` checks cannot be evaluated yet (e.g. they\nneed a plugin that ships later) and are shown honestly, never as passes.",
      "enum": [
        "pass",
        "fail",
        "not_applicable",
        "not_assessed"
      ],
      "type": "string"
    },
    "CheckResult": {
      "additionalProperties": false,
      "description": "One evaluated check; the score is computed from these (spec §5.4).",
      "properties": {
        "id": {
          "type": "string"
        },
        "outcome": {
          "$ref": "#/$defs/CheckOutcome"
        },
        "severity": {
          "$ref": "#/$defs/Severity"
        }
      },
      "required": [
        "id",
        "severity",
        "outcome"
      ],
      "type": "object"
    },
    "Finding": {
      "additionalProperties": false,
      "description": "A check result (spec §5.4).",
      "properties": {
        "args": {
          "additionalProperties": {
            "type": "string"
          },
          "default": {},
          "type": "object"
        },
        "detected_at": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "plugin": {
          "type": "string"
        },
        "references": {
          "default": [],
          "items": {
            "$ref": "#/$defs/Reference"
          },
          "type": "array"
        },
        "remediation": {
          "anyOf": [
            {
              "$ref": "#/$defs/Remediation"
            },
            {
              "type": "null"
            }
          ],
          "default": null
        },
        "severity": {
          "$ref": "#/$defs/Severity"
        },
        "status": {
          "$ref": "#/$defs/FindingStatus"
        },
        "summary_key": {
          "type": "string"
        },
        "title_key": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "plugin",
        "severity",
        "title_key",
        "summary_key",
        "status",
        "detected_at"
      ],
      "type": "object"
    },
    "FindingStatus": {
      "description": "Lifecycle of a finding.",
      "enum": [
        "open",
        "accepted_risk",
        "resolved"
      ],
      "type": "string"
    },
    "Reference": {
      "additionalProperties": false,
      "description": "Reference to a control in an external framework (own wording only;\nnever copy protected norm texts).",
      "properties": {
        "framework": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "url": {
          "default": null,
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "framework",
        "id"
      ],
      "type": "object"
    },
    "Remediation": {
      "additionalProperties": false,
      "description": "Remediation metadata for a finding.",
      "properties": {
        "may_affect_keys": {
          "default": [],
          "description": "Fluent keys for the \"may affect\" callout.",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "plan_template": {
          "default": null,
          "description": "Plan template id the core can render into a previewable plan.",
          "type": [
            "string",
            "null"
          ]
        }
      },
      "type": "object"
    },
    "Severity": {
      "description": "Finding severity. Weights drive the posture score (spec §5.4).",
      "enum": [
        "info",
        "low",
        "medium",
        "high",
        "critical"
      ],
      "type": "string"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "What a plugin `Check` call returns.",
  "properties": {
    "findings": {
      "default": [],
      "description": "Findings for the failed checks.",
      "items": {
        "$ref": "#/$defs/Finding"
      },
      "type": "array"
    },
    "results": {
      "default": [],
      "items": {
        "$ref": "#/$defs/CheckResult"
      },
      "type": "array"
    }
  },
  "title": "CheckReport",
  "type": "object"
}
```

</details>

## CheckResult

One evaluated check; the score is computed from these (spec §5.4).

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "CheckOutcome": {
      "description": "Outcome of one check. `NotApplicable` checks are left out of the score\ndenominator; `NotAssessed` checks cannot be evaluated yet (e.g. they\nneed a plugin that ships later) and are shown honestly, never as passes.",
      "enum": [
        "pass",
        "fail",
        "not_applicable",
        "not_assessed"
      ],
      "type": "string"
    },
    "Severity": {
      "description": "Finding severity. Weights drive the posture score (spec §5.4).",
      "enum": [
        "info",
        "low",
        "medium",
        "high",
        "critical"
      ],
      "type": "string"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "One evaluated check; the score is computed from these (spec §5.4).",
  "properties": {
    "id": {
      "type": "string"
    },
    "outcome": {
      "$ref": "#/$defs/CheckOutcome"
    },
    "severity": {
      "$ref": "#/$defs/Severity"
    }
  },
  "required": [
    "id",
    "severity",
    "outcome"
  ],
  "title": "CheckResult",
  "type": "object"
}
```

</details>

## DnsStatus

Secure DNS counters, published by the resolver. Counts only: the

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "Secure DNS counters, published by the resolver. Counts only: the\nresolver never records query names.",
  "properties": {
    "blocked_canary": {
      "format": "uint64",
      "minimum": 0,
      "type": "integer"
    },
    "blocked_doh": {
      "format": "uint64",
      "minimum": 0,
      "type": "integer"
    },
    "blocked_list": {
      "format": "uint64",
      "minimum": 0,
      "type": "integer"
    },
    "forwarded": {
      "format": "uint64",
      "minimum": 0,
      "type": "integer"
    },
    "running": {
      "description": "False when no resolver has published anything.",
      "type": "boolean"
    },
    "updated_at": {
      "type": "string"
    },
    "upstream_errors": {
      "format": "uint64",
      "minimum": 0,
      "type": "integer"
    }
  },
  "required": [
    "running",
    "updated_at",
    "forwarded",
    "blocked_list",
    "blocked_canary",
    "blocked_doh",
    "upstream_errors"
  ],
  "title": "DnsStatus",
  "type": "object"
}
```

</details>

## Event

Event on the bus. `data` is structured by source; `untrusted` carries

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "Severity": {
      "description": "Finding severity. Weights drive the posture score (spec §5.4).",
      "enum": [
        "info",
        "low",
        "medium",
        "high",
        "critical"
      ],
      "type": "string"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "Event on the bus. `data` is structured by source; `untrusted` carries\nexternally controlled values (domains, SSIDs, process names...) that\nconsumers must treat as data, never as instructions or interpolations.",
  "properties": {
    "app": {
      "default": null,
      "type": [
        "string",
        "null"
      ]
    },
    "data": {
      "default": null
    },
    "kind": {
      "type": "string"
    },
    "severity": {
      "$ref": "#/$defs/Severity"
    },
    "source": {
      "type": "string"
    },
    "ts": {
      "type": "string"
    },
    "untrusted": {
      "default": null
    }
  },
  "required": [
    "ts",
    "source",
    "kind",
    "severity"
  ],
  "title": "Event",
  "type": "object"
}
```

</details>

## Finding

A check result (spec §5.4).

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "FindingStatus": {
      "description": "Lifecycle of a finding.",
      "enum": [
        "open",
        "accepted_risk",
        "resolved"
      ],
      "type": "string"
    },
    "Reference": {
      "additionalProperties": false,
      "description": "Reference to a control in an external framework (own wording only;\nnever copy protected norm texts).",
      "properties": {
        "framework": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "url": {
          "default": null,
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "framework",
        "id"
      ],
      "type": "object"
    },
    "Remediation": {
      "additionalProperties": false,
      "description": "Remediation metadata for a finding.",
      "properties": {
        "may_affect_keys": {
          "default": [],
          "description": "Fluent keys for the \"may affect\" callout.",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "plan_template": {
          "default": null,
          "description": "Plan template id the core can render into a previewable plan.",
          "type": [
            "string",
            "null"
          ]
        }
      },
      "type": "object"
    },
    "Severity": {
      "description": "Finding severity. Weights drive the posture score (spec §5.4).",
      "enum": [
        "info",
        "low",
        "medium",
        "high",
        "critical"
      ],
      "type": "string"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "A check result (spec §5.4).",
  "properties": {
    "args": {
      "additionalProperties": {
        "type": "string"
      },
      "default": {},
      "type": "object"
    },
    "detected_at": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "plugin": {
      "type": "string"
    },
    "references": {
      "default": [],
      "items": {
        "$ref": "#/$defs/Reference"
      },
      "type": "array"
    },
    "remediation": {
      "anyOf": [
        {
          "$ref": "#/$defs/Remediation"
        },
        {
          "type": "null"
        }
      ],
      "default": null
    },
    "severity": {
      "$ref": "#/$defs/Severity"
    },
    "status": {
      "$ref": "#/$defs/FindingStatus"
    },
    "summary_key": {
      "type": "string"
    },
    "title_key": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "plugin",
    "severity",
    "title_key",
    "summary_key",
    "status",
    "detected_at"
  ],
  "title": "Finding",
  "type": "object"
}
```

</details>

## FindingStatus

Lifecycle of a finding.

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Lifecycle of a finding.",
  "enum": [
    "open",
    "accepted_risk",
    "resolved"
  ],
  "title": "FindingStatus",
  "type": "string"
}
```

</details>

## FirewallNetwork

A network this computer is on and the profile suggested for it.

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "A network this computer is on and the profile suggested for it.",
  "properties": {
    "kind": {
      "description": "`wired`, `wifi_secured`, `wifi_open` or `other`.",
      "type": "string"
    },
    "name": {
      "description": "The connection's name; untrusted display text.",
      "type": "string"
    },
    "recommended": {
      "description": "`home`, `work`, `public` or `travel`.",
      "type": "string"
    },
    "warning": {
      "default": null,
      "description": "A Fluent key for the warning that goes with the suggestion.",
      "type": [
        "string",
        "null"
      ]
    }
  },
  "required": [
    "name",
    "kind",
    "recommended"
  ],
  "title": "FirewallNetwork",
  "type": "object"
}
```

</details>

## FirewallPort

One allowed or listening port.

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "One allowed or listening port.",
  "properties": {
    "port": {
      "format": "uint16",
      "maximum": 65535,
      "minimum": 0,
      "type": "integer"
    },
    "proto": {
      "description": "`tcp` or `udp`.",
      "type": "string"
    }
  },
  "required": [
    "port",
    "proto"
  ],
  "title": "FirewallPort",
  "type": "object"
}
```

</details>

## FirewallState

The inbound firewall as IbexWall can read it (spec 4.7). Names from

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "FirewallNetwork": {
      "additionalProperties": false,
      "description": "A network this computer is on and the profile suggested for it.",
      "properties": {
        "kind": {
          "description": "`wired`, `wifi_secured`, `wifi_open` or `other`.",
          "type": "string"
        },
        "name": {
          "description": "The connection's name; untrusted display text.",
          "type": "string"
        },
        "recommended": {
          "description": "`home`, `work`, `public` or `travel`.",
          "type": "string"
        },
        "warning": {
          "default": null,
          "description": "A Fluent key for the warning that goes with the suggestion.",
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "name",
        "kind",
        "recommended"
      ],
      "type": "object"
    },
    "FirewallPort": {
      "additionalProperties": false,
      "description": "One allowed or listening port.",
      "properties": {
        "port": {
          "format": "uint16",
          "maximum": 65535,
          "minimum": 0,
          "type": "integer"
        },
        "proto": {
          "description": "`tcp` or `udp`.",
          "type": "string"
        }
      },
      "required": [
        "port",
        "proto"
      ],
      "type": "object"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "The inbound firewall as IbexWall can read it (spec 4.7). Names from\nconfiguration files are untrusted display text.",
  "properties": {
    "active": {
      "default": null,
      "description": "Whether the manager is filtering; absent when it cannot be told.",
      "type": [
        "boolean",
        "null"
      ]
    },
    "backend": {
      "description": "`firewalld`, `ufw` or `nftables` (IbexWall's own chain).",
      "type": "string"
    },
    "listening": {
      "description": "Ports with a socket bound on every address.",
      "items": {
        "$ref": "#/$defs/FirewallPort"
      },
      "type": "array"
    },
    "networks": {
      "description": "The networks this computer is on, with the suggested profile.",
      "items": {
        "$ref": "#/$defs/FirewallNetwork"
      },
      "type": "array"
    },
    "other": {
      "description": "Rules read but not edited (ranges, rich rules, other targets).",
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "ports": {
      "description": "Ports the firewall allows in.",
      "items": {
        "$ref": "#/$defs/FirewallPort"
      },
      "type": "array"
    },
    "services": {
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "zone": {
      "default": null,
      "description": "firewalld's default zone.",
      "type": [
        "string",
        "null"
      ]
    }
  },
  "required": [
    "backend",
    "ports",
    "services",
    "listening",
    "other",
    "networks"
  ],
  "title": "FirewallState",
  "type": "object"
}
```

</details>

## HistoryEntry

Audit/history row.

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "Audit/history row.",
  "properties": {
    "actor": {
      "type": "string"
    },
    "plugin": {
      "type": "string"
    },
    "result": {
      "type": "string"
    },
    "seq": {
      "format": "uint64",
      "minimum": 0,
      "type": "integer"
    },
    "transaction": {
      "default": null,
      "type": [
        "string",
        "null"
      ]
    },
    "ts": {
      "type": "string"
    }
  },
  "required": [
    "seq",
    "ts",
    "actor",
    "plugin",
    "result"
  ],
  "title": "HistoryEntry",
  "type": "object"
}
```

</details>

## Info

Daemon and host information (`GetInfo`).

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "Daemon and host information (`GetInfo`).",
  "properties": {
    "api": {
      "format": "uint32",
      "minimum": 0,
      "type": "integer"
    },
    "degraded": {
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "distro": {
      "type": "string"
    },
    "features": {
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "kernel": {
      "type": "string"
    },
    "version": {
      "type": "string"
    }
  },
  "required": [
    "version",
    "api",
    "distro",
    "kernel",
    "features",
    "degraded"
  ],
  "title": "Info",
  "type": "object"
}
```

</details>

## Manifest

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "Conflicts": {
      "additionalProperties": false,
      "properties": {
        "units": {
          "default": [],
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      },
      "type": "object"
    },
    "ExecAllow": {
      "additionalProperties": false,
      "description": "Exact exec allowlist entry: binary plus fixed argv pattern.",
      "properties": {
        "args": {
          "default": [],
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "path": {
          "type": "string"
        },
        "symmetric": {
          "default": false,
          "description": "This exec is its own inverse: the rollback runs it again after the\nfiles are restored (a manager told to re-read its directory).",
          "type": "boolean"
        }
      },
      "required": [
        "path"
      ],
      "type": "object"
    },
    "PluginKind": {
      "enum": [
        "check",
        "control",
        "monitor"
      ],
      "type": "string"
    },
    "PluginOrigin": {
      "enum": [
        "official",
        "community",
        "local"
      ],
      "type": "string"
    },
    "Privileges": {
      "additionalProperties": false,
      "description": "What the core may execute on the plugin's behalf.",
      "properties": {
        "exec": {
          "default": [],
          "items": {
            "$ref": "#/$defs/ExecAllow"
          },
          "type": "array"
        },
        "firewall_backends": {
          "default": [],
          "description": "Firewall managers the plugin may drive through `firewall.adapter`\n(`firewalld`, `ufw`).",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "nft_prefix": {
          "default": null,
          "type": [
            "string",
            "null"
          ]
        },
        "sysctl_keys": {
          "default": [],
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "unit_actions": {
          "default": [],
          "items": {
            "$ref": "#/$defs/UnitAction"
          },
          "type": "array"
        },
        "units": {
          "default": [],
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "write_paths": {
          "default": [],
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      },
      "type": "object"
    },
    "Requires": {
      "additionalProperties": false,
      "properties": {
        "commands": {
          "default": [],
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "packages": {
          "additionalProperties": {
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "default": {},
          "type": "object"
        }
      },
      "type": "object"
    },
    "Reversible": {
      "description": "How easily an operation reverses.",
      "enum": [
        "immediate",
        "reboot",
        "irreversible"
      ],
      "type": "string"
    },
    "RiskInfo": {
      "additionalProperties": false,
      "properties": {
        "affects": {
          "default": [],
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "confirm_timeout": {
          "default": false,
          "type": "boolean"
        },
        "may_affect": {
          "default": [],
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "reversible": {
          "$ref": "#/$defs/Reversible"
        }
      },
      "required": [
        "reversible"
      ],
      "type": "object"
    },
    "Sandbox": {
      "additionalProperties": false,
      "description": "How the plugin process is sandboxed (reflected into its unit).",
      "properties": {
        "capabilities": {
          "default": [],
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "network": {
          "default": false,
          "type": "boolean"
        },
        "read_paths": {
          "default": [],
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "state_paths": {
          "default": [],
          "description": "Where the tools this plugin runs keep their own state (a package\nmanager's cache and database): the only places its sandbox can write.\nThe plugin itself changes nothing on the system; the core does.",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "user": {
          "$ref": "#/$defs/SandboxUser"
        }
      },
      "required": [
        "user"
      ],
      "type": "object"
    },
    "SandboxUser": {
      "oneOf": [
        {
          "const": "dynamic",
          "description": "`DynamicUser=yes`; the default and the goal whenever possible.",
          "type": "string"
        },
        {
          "const": "root",
          "description": "Requires justification, surfaced in the plugin index.",
          "type": "string"
        }
      ]
    },
    "Ui": {
      "additionalProperties": false,
      "properties": {
        "icon": {
          "type": "string"
        },
        "order": {
          "format": "int32",
          "type": "integer"
        }
      },
      "required": [
        "icon",
        "order"
      ],
      "type": "object"
    },
    "UnitAction": {
      "description": "Allowed systemd unit actions.",
      "enum": [
        "start",
        "stop",
        "restart",
        "enable",
        "disable",
        "mask",
        "unmask"
      ],
      "type": "string"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "properties": {
    "api": {
      "format": "uint32",
      "minimum": 0,
      "type": "integer"
    },
    "binary": {
      "type": "string"
    },
    "category": {
      "type": "string"
    },
    "config_schema": {
      "default": null,
      "type": [
        "string",
        "null"
      ]
    },
    "conflicts": {
      "$ref": "#/$defs/Conflicts",
      "default": {
        "units": []
      }
    },
    "default_enabled": {
      "default": false,
      "type": "boolean"
    },
    "description": {
      "additionalProperties": {
        "type": "string"
      },
      "default": {},
      "type": "object"
    },
    "distros": {
      "default": [],
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "id": {
      "description": "`<category>.<name>`, e.g. `net.dns`.",
      "type": "string"
    },
    "kinds": {
      "items": {
        "$ref": "#/$defs/PluginKind"
      },
      "type": "array"
    },
    "license": {
      "type": "string"
    },
    "name": {
      "additionalProperties": {
        "type": "string"
      },
      "type": "object"
    },
    "origin": {
      "$ref": "#/$defs/PluginOrigin"
    },
    "privileges": {
      "$ref": "#/$defs/Privileges"
    },
    "requires": {
      "$ref": "#/$defs/Requires",
      "default": {
        "commands": [],
        "packages": {}
      }
    },
    "risk": {
      "$ref": "#/$defs/RiskInfo"
    },
    "sandbox": {
      "$ref": "#/$defs/Sandbox"
    },
    "ui": {
      "anyOf": [
        {
          "$ref": "#/$defs/Ui"
        },
        {
          "type": "null"
        }
      ],
      "default": null
    },
    "version": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "version",
    "api",
    "category",
    "kinds",
    "origin",
    "license",
    "binary",
    "name",
    "privileges",
    "sandbox",
    "risk"
  ],
  "title": "Manifest",
  "type": "object"
}
```

</details>

## MonitorStatus

Whether the connection monitor is feeding the Apps screen, and if not

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "Whether the connection monitor is feeding the Apps screen, and if not\n(or if it works with a limitation), why: a plain reason, never a guess\nabout the cause.",
  "properties": {
    "reason": {
      "default": null,
      "description": "Why the monitor is off or limited, when it is. Untrusted display text.",
      "type": [
        "string",
        "null"
      ]
    },
    "running": {
      "type": "boolean"
    }
  },
  "required": [
    "running"
  ],
  "title": "MonitorStatus",
  "type": "object"
}
```

</details>

## Op

The typed operation set (spec §5.3).

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "UnitAction": {
      "description": "Allowed systemd unit actions.",
      "enum": [
        "start",
        "stop",
        "restart",
        "enable",
        "disable",
        "mask",
        "unmask"
      ],
      "type": "string"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "The typed operation set (spec §5.3).\n\nVariants serialize with dotted `op` tags (`file.write`, `systemd.unit`,\n...). Inverses and validation are the core's job, driven by the plugin\nmanifest's `[privileges]` section.\n\nNote: serde cannot enforce `deny_unknown_fields` on internally tagged\nenums; the core re-validates every deserialized op strictly (F1).",
  "oneOf": [
    {
      "description": "Write a file inside declared `write_paths`; atomic write, no symlink\nfollowing, declared mode/owner.",
      "properties": {
        "content": {
          "type": "string"
        },
        "group": {
          "type": "string"
        },
        "mode": {
          "type": "string"
        },
        "op": {
          "const": "file.write",
          "type": "string"
        },
        "owner": {
          "type": "string"
        },
        "path": {
          "type": "string"
        }
      },
      "required": [
        "op",
        "path",
        "content",
        "mode",
        "owner",
        "group"
      ],
      "type": "object"
    },
    {
      "description": "Remove a file that IbexWall itself created inside `write_paths`.",
      "properties": {
        "op": {
          "const": "file.remove",
          "type": "string"
        },
        "path": {
          "type": "string"
        }
      },
      "required": [
        "op",
        "path"
      ],
      "type": "object"
    },
    {
      "description": "Start/stop/enable/disable/mask a unit listed in `units`.",
      "properties": {
        "action": {
          "$ref": "#/$defs/UnitAction"
        },
        "now": {
          "default": null,
          "type": [
            "boolean",
            "null"
          ]
        },
        "op": {
          "const": "systemd.unit",
          "type": "string"
        },
        "unit": {
          "type": "string"
        }
      },
      "required": [
        "op",
        "unit",
        "action"
      ],
      "type": "object"
    },
    {
      "description": "Set a sysctl key listed in `sysctl_keys`, persisted in a drop-in.",
      "properties": {
        "key": {
          "type": "string"
        },
        "op": {
          "const": "sysctl.set",
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      },
      "required": [
        "op",
        "key",
        "value"
      ],
      "type": "object"
    },
    {
      "description": "Contribute a fragment (chains/sets with the plugin's prefix) to\n`table inet ibexwall`; the core recomposes the table atomically.",
      "properties": {
        "fragment": true,
        "op": {
          "const": "nft.fragment",
          "type": "string"
        }
      },
      "required": [
        "op",
        "fragment"
      ],
      "type": "object"
    },
    {
      "description": "Drive the detected firewall backend (firewalld/ufw/bare nftables).",
      "properties": {
        "action": true,
        "backend": {
          "type": "string"
        },
        "op": {
          "const": "firewall.adapter",
          "type": "string"
        }
      },
      "required": [
        "op",
        "backend",
        "action"
      ],
      "type": "object"
    },
    {
      "description": "Drive the detected DNS backend (resolved/NM/resolv.conf drop-ins).",
      "properties": {
        "action": true,
        "backend": {
          "type": "string"
        },
        "op": {
          "const": "dns.backend",
          "type": "string"
        }
      },
      "required": [
        "op",
        "backend",
        "action"
      ],
      "type": "object"
    },
    {
      "description": "Apply Flatpak overrides (e.g. `--unshare=network`).",
      "properties": {
        "app_id": {
          "type": "string"
        },
        "args": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "op": {
          "const": "flatpak.override",
          "type": "string"
        }
      },
      "required": [
        "op",
        "app_id",
        "args"
      ],
      "type": "object"
    },
    {
      "description": "Connect/disconnect a Snap interface.",
      "properties": {
        "connect": {
          "type": "boolean"
        },
        "interface": {
          "type": "string"
        },
        "op": {
          "const": "snap.interface",
          "type": "string"
        },
        "snap": {
          "type": "string"
        }
      },
      "required": [
        "op",
        "snap",
        "interface",
        "connect"
      ],
      "type": "object"
    },
    {
      "description": "Write an allowed browser policy key (with user consent).",
      "properties": {
        "browser": {
          "type": "string"
        },
        "op": {
          "const": "browser.policy",
          "type": "string"
        },
        "policy": true
      },
      "required": [
        "op",
        "browser",
        "policy"
      ],
      "type": "object"
    },
    {
      "description": "Set an allowed NetworkManager key (MAC randomization, global DNS).",
      "properties": {
        "key": {
          "type": "string"
        },
        "op": {
          "const": "nm.setting",
          "type": "string"
        },
        "value": true
      },
      "required": [
        "op",
        "key",
        "value"
      ],
      "type": "object"
    },
    {
      "description": "Install a package via PackageKit only; never automatically\nreversible (flagged in the plan).",
      "properties": {
        "op": {
          "const": "package.install",
          "type": "string"
        },
        "package": {
          "type": "string"
        }
      },
      "required": [
        "op",
        "package"
      ],
      "type": "object"
    },
    {
      "description": "Make a self-signed certificate and its private key at the given\npaths (inside `write_paths`). The key is made when the plan is\napplied and never appears in the plan, so no preview, log or proposal\ncan hold it. Rollback removes both files, or restores the old ones.",
      "properties": {
        "cert_path": {
          "type": "string"
        },
        "days": {
          "format": "uint32",
          "minimum": 0,
          "type": "integer"
        },
        "hosts": {
          "description": "Names or addresses clients will use.",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "key_group": {
          "description": "Group that may read the key (mode 0640): `root` or one of\nIbexWall's own groups.",
          "type": "string"
        },
        "key_path": {
          "type": "string"
        },
        "op": {
          "const": "tls.keypair",
          "type": "string"
        }
      },
      "required": [
        "op",
        "cert_path",
        "key_path",
        "hosts",
        "days",
        "key_group"
      ],
      "type": "object"
    },
    {
      "description": "Run an allowlisted binary with fixed argv; no shell.",
      "properties": {
        "args": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "op": {
          "const": "exec",
          "type": "string"
        },
        "path": {
          "type": "string"
        }
      },
      "required": [
        "op",
        "path",
        "args"
      ],
      "type": "object"
    }
  ],
  "title": "Op"
}
```

</details>

## OpPreview

One operation as previewed to the user (op kind + target + diff).

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "RiskFlag": {
      "description": "Risk flags attached to plans and transactions (spec §4.5).",
      "enum": [
        "network",
        "auth",
        "boot",
        "reboot_to_revert",
        "irreversible"
      ],
      "type": "string"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "One operation as previewed to the user (op kind + target + diff).",
  "properties": {
    "diff": {
      "default": null,
      "type": [
        "string",
        "null"
      ]
    },
    "op": {
      "type": "string"
    },
    "risk": {
      "default": [],
      "items": {
        "$ref": "#/$defs/RiskFlag"
      },
      "type": "array"
    },
    "target": {
      "type": "string"
    }
  },
  "required": [
    "op",
    "target"
  ],
  "title": "OpPreview",
  "type": "object"
}
```

</details>

## Plan

A previewable, expiring plan produced by `PlanChange`.

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "OpPreview": {
      "additionalProperties": false,
      "description": "One operation as previewed to the user (op kind + target + diff).",
      "properties": {
        "diff": {
          "default": null,
          "type": [
            "string",
            "null"
          ]
        },
        "op": {
          "type": "string"
        },
        "risk": {
          "default": [],
          "items": {
            "$ref": "#/$defs/RiskFlag"
          },
          "type": "array"
        },
        "target": {
          "type": "string"
        }
      },
      "required": [
        "op",
        "target"
      ],
      "type": "object"
    },
    "Reversible": {
      "description": "How easily an operation reverses.",
      "enum": [
        "immediate",
        "reboot",
        "irreversible"
      ],
      "type": "string"
    },
    "RiskFlag": {
      "description": "Risk flags attached to plans and transactions (spec §4.5).",
      "enum": [
        "network",
        "auth",
        "boot",
        "reboot_to_revert",
        "irreversible"
      ],
      "type": "string"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "A previewable, expiring plan produced by `PlanChange`.",
  "properties": {
    "expires_at": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "may_affect_keys": {
      "default": [],
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "ops": {
      "items": {
        "$ref": "#/$defs/OpPreview"
      },
      "type": "array"
    },
    "plugin": {
      "type": "string"
    },
    "requires_confirm": {
      "type": "boolean"
    },
    "reversible": {
      "$ref": "#/$defs/Reversible"
    },
    "risk": {
      "default": [],
      "items": {
        "$ref": "#/$defs/RiskFlag"
      },
      "type": "array"
    }
  },
  "required": [
    "id",
    "plugin",
    "ops",
    "reversible",
    "requires_confirm",
    "expires_at"
  ],
  "title": "Plan",
  "type": "object"
}
```

</details>

## PluginInfo

Plugin card data.

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "PluginOrigin": {
      "enum": [
        "official",
        "community",
        "local"
      ],
      "type": "string"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "Plugin card data.",
  "properties": {
    "compatible": {
      "type": "boolean"
    },
    "conflicts": {
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "enabled": {
      "type": "boolean"
    },
    "id": {
      "type": "string"
    },
    "kinds": {
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "locked": {
      "type": "boolean"
    },
    "name": {
      "description": "The name in the source language (English).",
      "type": "string"
    },
    "names": {
      "additionalProperties": {
        "type": "string"
      },
      "default": {},
      "description": "The name in every language the manifest has, by locale tag, so a\nscreen can show it in the person's language.",
      "type": "object"
    },
    "origin": {
      "$ref": "#/$defs/PluginOrigin"
    },
    "status": {
      "type": "string"
    },
    "version": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "version",
    "kinds",
    "enabled",
    "origin",
    "status",
    "compatible",
    "conflicts",
    "locked"
  ],
  "title": "PluginInfo",
  "type": "object"
}
```

</details>

## PluginKind

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "enum": [
    "check",
    "control",
    "monitor"
  ],
  "title": "PluginKind",
  "type": "string"
}
```

</details>

## PluginOrigin

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "enum": [
    "official",
    "community",
    "local"
  ],
  "title": "PluginOrigin",
  "type": "string"
}
```

</details>

## PolicyBundle

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "BundleSignature": {
      "additionalProperties": false,
      "properties": {
        "alg": {
          "type": "string"
        },
        "key_id": {
          "type": "string"
        },
        "value": {
          "description": "ed25519 over JCS(bundle without `signature`), base64.",
          "type": "string"
        }
      },
      "required": [
        "alg",
        "key_id",
        "value"
      ],
      "type": "object"
    },
    "OrgIdentity": {
      "additionalProperties": false,
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "name"
      ],
      "type": "object"
    },
    "ReportSpec": {
      "additionalProperties": false,
      "description": "Which sections the generated report may include. The report schema has\nno fields for browsing/DNS history, files, screen, passwords or\nkeystrokes (spec §4.14).",
      "properties": {
        "include": {
          "default": [],
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      },
      "type": "object"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "properties": {
    "expires_at": {
      "type": "string"
    },
    "issued_at": {
      "type": "string"
    },
    "locks": {
      "default": [],
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "org": {
      "$ref": "#/$defs/OrgIdentity"
    },
    "report": {
      "$ref": "#/$defs/ReportSpec",
      "default": {
        "include": []
      }
    },
    "schema": {
      "type": "string"
    },
    "settings": true,
    "signature": {
      "anyOf": [
        {
          "$ref": "#/$defs/BundleSignature"
        },
        {
          "type": "null"
        }
      ],
      "default": null,
      "description": "Detached for the signed representation (JCS excludes this field)."
    },
    "version": {
      "format": "uint64",
      "minimum": 0,
      "type": "integer"
    }
  },
  "required": [
    "schema",
    "org",
    "version",
    "issued_at",
    "expires_at",
    "settings"
  ],
  "title": "PolicyBundle",
  "type": "object"
}
```

</details>

## Posture

Posture score and per-protection snapshot.

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "CheckOutcome": {
      "description": "Outcome of one check. `NotApplicable` checks are left out of the score\ndenominator; `NotAssessed` checks cannot be evaluated yet (e.g. they\nneed a plugin that ships later) and are shown honestly, never as passes.",
      "enum": [
        "pass",
        "fail",
        "not_applicable",
        "not_assessed"
      ],
      "type": "string"
    },
    "CheckResult": {
      "additionalProperties": false,
      "description": "One evaluated check; the score is computed from these (spec §5.4).",
      "properties": {
        "id": {
          "type": "string"
        },
        "outcome": {
          "$ref": "#/$defs/CheckOutcome"
        },
        "severity": {
          "$ref": "#/$defs/Severity"
        }
      },
      "required": [
        "id",
        "severity",
        "outcome"
      ],
      "type": "object"
    },
    "ProtectionStatus": {
      "additionalProperties": false,
      "description": "State of one protection as shown on the overview screen.",
      "properties": {
        "detail": {
          "default": null,
          "type": [
            "string",
            "null"
          ]
        },
        "plugin": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "summary_key": {
          "type": "string"
        }
      },
      "required": [
        "plugin",
        "state",
        "summary_key"
      ],
      "type": "object"
    },
    "Severity": {
      "description": "Finding severity. Weights drive the posture score (spec §5.4).",
      "enum": [
        "info",
        "low",
        "medium",
        "high",
        "critical"
      ],
      "type": "string"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "Posture score and per-protection snapshot.",
  "properties": {
    "generated_at": {
      "type": "string"
    },
    "open_findings": {
      "format": "uint32",
      "minimum": 0,
      "type": "integer"
    },
    "protections": {
      "items": {
        "$ref": "#/$defs/ProtectionStatus"
      },
      "type": "array"
    },
    "results": {
      "default": [],
      "description": "The check results the score was computed from (\"How we calculate\").",
      "items": {
        "$ref": "#/$defs/CheckResult"
      },
      "type": "array"
    },
    "score": {
      "description": "`None` until at least one applicable check has run.",
      "format": "uint8",
      "maximum": 255,
      "minimum": 0,
      "type": [
        "integer",
        "null"
      ]
    }
  },
  "required": [
    "generated_at",
    "protections",
    "open_findings"
  ],
  "title": "Posture",
  "type": "object"
}
```

</details>

## Prompt

A connection held in Ask mode, waiting for the user. The strings come

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "A connection held in Ask mode, waiting for the user. The strings come\nfrom other programs and the network: show them, never interpret them.",
  "properties": {
    "address": {
      "type": "string"
    },
    "app": {
      "description": "The app key, as in `AppEntry`.",
      "type": "string"
    },
    "created": {
      "type": "string"
    },
    "destination": {
      "description": "A domain when the resolver's answer was correlated, else the address.",
      "type": "string"
    },
    "exe_path": {
      "default": null,
      "type": [
        "string",
        "null"
      ]
    },
    "expires": {
      "description": "When the fallback applies if nobody answers.",
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "kind": {
      "type": "string"
    },
    "port": {
      "format": "uint16",
      "maximum": 65535,
      "minimum": 0,
      "type": "integer"
    }
  },
  "required": [
    "id",
    "app",
    "kind",
    "destination",
    "address",
    "port",
    "created",
    "expires"
  ],
  "title": "Prompt",
  "type": "object"
}
```

</details>

## Proposal

A change proposed through the API (e.g. by the MCP assistant);

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "OpPreview": {
      "additionalProperties": false,
      "description": "One operation as previewed to the user (op kind + target + diff).",
      "properties": {
        "diff": {
          "default": null,
          "type": [
            "string",
            "null"
          ]
        },
        "op": {
          "type": "string"
        },
        "risk": {
          "default": [],
          "items": {
            "$ref": "#/$defs/RiskFlag"
          },
          "type": "array"
        },
        "target": {
          "type": "string"
        }
      },
      "required": [
        "op",
        "target"
      ],
      "type": "object"
    },
    "ProposalStatus": {
      "description": "Lifecycle of an AI/client proposal.",
      "enum": [
        "pending",
        "approved",
        "rejected",
        "expired"
      ],
      "type": "string"
    },
    "Reversible": {
      "description": "How easily an operation reverses.",
      "enum": [
        "immediate",
        "reboot",
        "irreversible"
      ],
      "type": "string"
    },
    "RiskFlag": {
      "description": "Risk flags attached to plans and transactions (spec §4.5).",
      "enum": [
        "network",
        "auth",
        "boot",
        "reboot_to_revert",
        "irreversible"
      ],
      "type": "string"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "A change proposed through the API (e.g. by the MCP assistant);\napproval is always human.",
  "properties": {
    "client": {
      "type": "string"
    },
    "created_at": {
      "type": "string"
    },
    "decided_at": {
      "default": null,
      "type": [
        "string",
        "null"
      ]
    },
    "id": {
      "type": "string"
    },
    "justification": {
      "description": "Written by the AI: shown as generated, never as an instruction.",
      "type": "string"
    },
    "may_affect_keys": {
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "patch": {
      "description": "What the client asked for (the plugin's own patch)."
    },
    "plan_id": {
      "type": "string"
    },
    "plugin": {
      "type": "string"
    },
    "preview": {
      "description": "The operations the plan would run, as the human will review them.",
      "items": {
        "$ref": "#/$defs/OpPreview"
      },
      "type": "array"
    },
    "requires_confirm": {
      "type": "boolean"
    },
    "reversible": {
      "$ref": "#/$defs/Reversible"
    },
    "risk": {
      "default": [],
      "items": {
        "$ref": "#/$defs/RiskFlag"
      },
      "type": "array"
    },
    "status": {
      "$ref": "#/$defs/ProposalStatus"
    }
  },
  "required": [
    "id",
    "client",
    "plugin",
    "plan_id",
    "patch",
    "preview",
    "may_affect_keys",
    "reversible",
    "requires_confirm",
    "justification",
    "status",
    "created_at"
  ],
  "title": "Proposal",
  "type": "object"
}
```

</details>

## ProposalStatus

Lifecycle of an AI/client proposal.

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Lifecycle of an AI/client proposal.",
  "enum": [
    "pending",
    "approved",
    "rejected",
    "expired"
  ],
  "title": "ProposalStatus",
  "type": "string"
}
```

</details>

## ProtectionStatus

State of one protection as shown on the overview screen.

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "State of one protection as shown on the overview screen.",
  "properties": {
    "detail": {
      "default": null,
      "type": [
        "string",
        "null"
      ]
    },
    "plugin": {
      "type": "string"
    },
    "state": {
      "type": "string"
    },
    "summary_key": {
      "type": "string"
    }
  },
  "required": [
    "plugin",
    "state",
    "summary_key"
  ],
  "title": "ProtectionStatus",
  "type": "object"
}
```

</details>

## Reference

Reference to a control in an external framework (own wording only;

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "Reference to a control in an external framework (own wording only;\nnever copy protected norm texts).",
  "properties": {
    "framework": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "url": {
      "default": null,
      "type": [
        "string",
        "null"
      ]
    }
  },
  "required": [
    "framework",
    "id"
  ],
  "title": "Reference",
  "type": "object"
}
```

</details>

## Remediation

Remediation metadata for a finding.

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "Remediation metadata for a finding.",
  "properties": {
    "may_affect_keys": {
      "default": [],
      "description": "Fluent keys for the \"may affect\" callout.",
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "plan_template": {
      "default": null,
      "description": "Plan template id the core can render into a previewable plan.",
      "type": [
        "string",
        "null"
      ]
    }
  },
  "title": "Remediation",
  "type": "object"
}
```

</details>

## Report

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "AppCount": {
      "additionalProperties": false,
      "properties": {
        "app": {
          "type": "string"
        },
        "count": {
          "format": "uint64",
          "minimum": 0,
          "type": "integer"
        }
      },
      "required": [
        "app",
        "count"
      ],
      "type": "object"
    },
    "BlockedConnectionsSummary": {
      "additionalProperties": false,
      "properties": {
        "top_apps": {
          "default": [],
          "items": {
            "$ref": "#/$defs/AppCount"
          },
          "type": "array"
        },
        "total_24h": {
          "format": "uint64",
          "minimum": 0,
          "type": "integer"
        }
      },
      "required": [
        "total_24h"
      ],
      "type": "object"
    },
    "HistoryEntry": {
      "additionalProperties": false,
      "description": "Audit/history row.",
      "properties": {
        "actor": {
          "type": "string"
        },
        "plugin": {
          "type": "string"
        },
        "result": {
          "type": "string"
        },
        "seq": {
          "format": "uint64",
          "minimum": 0,
          "type": "integer"
        },
        "transaction": {
          "default": null,
          "type": [
            "string",
            "null"
          ]
        },
        "ts": {
          "type": "string"
        }
      },
      "required": [
        "seq",
        "ts",
        "actor",
        "plugin",
        "result"
      ],
      "type": "object"
    },
    "ProtectionStatus": {
      "additionalProperties": false,
      "description": "State of one protection as shown on the overview screen.",
      "properties": {
        "detail": {
          "default": null,
          "type": [
            "string",
            "null"
          ]
        },
        "plugin": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "summary_key": {
          "type": "string"
        }
      },
      "required": [
        "plugin",
        "state",
        "summary_key"
      ],
      "type": "object"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "properties": {
    "blocked_connections": {
      "anyOf": [
        {
          "$ref": "#/$defs/BlockedConnectionsSummary"
        },
        {
          "type": "null"
        }
      ],
      "default": null
    },
    "change_audit": {
      "default": [],
      "items": {
        "$ref": "#/$defs/HistoryEntry"
      },
      "type": "array"
    },
    "findings_by_severity": {
      "additionalProperties": {
        "format": "uint32",
        "minimum": 0,
        "type": "integer"
      },
      "default": {},
      "type": "object"
    },
    "findings_open": {
      "format": "uint32",
      "minimum": 0,
      "type": "integer"
    },
    "generated_at": {
      "type": "string"
    },
    "package_versions": {
      "additionalProperties": {
        "type": "string"
      },
      "default": {},
      "type": "object"
    },
    "policy_version": {
      "default": null,
      "format": "uint64",
      "minimum": 0,
      "type": [
        "integer",
        "null"
      ]
    },
    "protections": {
      "items": {
        "$ref": "#/$defs/ProtectionStatus"
      },
      "type": "array"
    },
    "schema": {
      "type": "string"
    },
    "score": {
      "format": "uint8",
      "maximum": 255,
      "minimum": 0,
      "type": "integer"
    }
  },
  "required": [
    "schema",
    "generated_at",
    "score",
    "protections",
    "findings_open"
  ],
  "title": "Report",
  "type": "object"
}
```

</details>

## Reversible

How easily an operation reverses.

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "How easily an operation reverses.",
  "enum": [
    "immediate",
    "reboot",
    "irreversible"
  ],
  "title": "Reversible",
  "type": "string"
}
```

</details>

## RiskFlag

Risk flags attached to plans and transactions (spec §4.5).

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Risk flags attached to plans and transactions (spec §4.5).",
  "enum": [
    "network",
    "auth",
    "boot",
    "reboot_to_revert",
    "irreversible"
  ],
  "title": "RiskFlag",
  "type": "string"
}
```

</details>

## Severity

Finding severity. Weights drive the posture score (spec §5.4).

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Finding severity. Weights drive the posture score (spec §5.4).",
  "enum": [
    "info",
    "low",
    "medium",
    "high",
    "critical"
  ],
  "title": "Severity",
  "type": "string"
}
```

</details>

## Transaction

A transaction (apply) of a plan.

<details><summary>JSON Schema</summary>

```json
{
  "$defs": {
    "TransactionState": {
      "description": "Change-engine transaction states (spec §4.5).",
      "enum": [
        "planned",
        "approved",
        "applying",
        "applied",
        "pending_confirm",
        "committed",
        "rolled_back",
        "failed"
      ],
      "type": "string"
    }
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": false,
  "description": "A transaction (apply) of a plan.",
  "properties": {
    "confirm_deadline": {
      "default": null,
      "type": [
        "string",
        "null"
      ]
    },
    "id": {
      "type": "string"
    },
    "plan_id": {
      "type": "string"
    },
    "restore_point": {
      "type": "string"
    },
    "started_at": {
      "type": "string"
    },
    "state": {
      "$ref": "#/$defs/TransactionState"
    }
  },
  "required": [
    "id",
    "plan_id",
    "state",
    "started_at",
    "restore_point"
  ],
  "title": "Transaction",
  "type": "object"
}
```

</details>

## TransactionState

Change-engine transaction states (spec §4.5).

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Change-engine transaction states (spec §4.5).",
  "enum": [
    "planned",
    "approved",
    "applying",
    "applied",
    "pending_confirm",
    "committed",
    "rolled_back",
    "failed"
  ],
  "title": "TransactionState",
  "type": "string"
}
```

</details>

## UnitAction

Allowed systemd unit actions.

<details><summary>JSON Schema</summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Allowed systemd unit actions.",
  "enum": [
    "start",
    "stop",
    "restart",
    "enable",
    "disable",
    "mask",
    "unmask"
  ],
  "title": "UnitAction",
  "type": "string"
}
```

</details>
