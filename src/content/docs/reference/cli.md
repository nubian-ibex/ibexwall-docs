---
title: "Command line"
description: "Every ibexctl command, from the program's own help."
sidebar:
  order: 2
---

The `ibexctl` command talks to the daemon. Every command takes `--json` for machine-readable output. This page is generated from the program's own help.

## `ibexctl`

```text
IbexWall control CLI

Usage: ibexctl [OPTIONS] <COMMAND>

Commands:
  status     Daemon and host information
  plugins    Plugin management
  check      Run checks (all enabled plugins, or one)
  findings   List findings
  plan       Simulate a change: build a previewable plan from a patch
  apply      Apply a plan
  confirm    Confirm a pending transaction
  rollback   Roll back a transaction
  history    Recent transactions
  audit      Audit chain operations
  events     Live events
  apps       Applications seen by the connection monitor
  mcp        Connect an AI assistant (MCP) to IbexWall
  proposals  Changes an assistant proposed, waiting for a human decision
  prompts    Connections held in Ask mode, waiting for an answer
  firewall   The inbound firewall: what is allowed in, and changes to it
  tui        Interactive terminal UI

Options:
      --json     Emit machine-readable JSON for every command
  -h, --help     Print help
  -V, --version  Print version
```

### `ibexctl status`

```text
Daemon and host information

Usage: ibexctl status [OPTIONS]

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

### `ibexctl plugins`

```text
Plugin management

Usage: ibexctl plugins [OPTIONS] <COMMAND>

Commands:
  list     
  info     
  enable   
  disable  

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl plugins list`

```text
Usage: ibexctl plugins list [OPTIONS]

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl plugins info`

```text
Usage: ibexctl plugins info [OPTIONS] <ID>

Arguments:
  <ID>  

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl plugins enable`

```text
Usage: ibexctl plugins enable [OPTIONS] <ID>

Arguments:
  <ID>  

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl plugins disable`

```text
Usage: ibexctl plugins disable [OPTIONS] <ID>

Arguments:
  <ID>  

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

### `ibexctl check`

```text
Run checks (all enabled plugins, or one)

Usage: ibexctl check [OPTIONS] [PLUGIN]

Arguments:
  [PLUGIN]  

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

### `ibexctl findings`

```text
List findings

Usage: ibexctl findings [OPTIONS]

Options:
      --json             Emit machine-readable JSON for every command
      --plugin <PLUGIN>  
  -h, --help             Print help
```

### `ibexctl plan`

```text
Simulate a change: build a previewable plan from a patch

Usage: ibexctl plan [OPTIONS] <PLUGIN>

Arguments:
  <PLUGIN>  

Options:
      --json                 Emit machine-readable JSON for every command
      --set <KEY=VALUE>      Setting for the plugin config, e.g. --set template=dropin
      --set-file <KEY=PATH>  Setting whose value is a file's text, e.g. --set-file profile=lab.conf
  -h, --help                 Print help
```

### `ibexctl apply`

```text
Apply a plan

Usage: ibexctl apply [OPTIONS] <PLAN_ID>

Arguments:
  <PLAN_ID>  

Options:
      --confirm-timeout <CONFIRM_TIMEOUT>  Confirmation window in seconds for network-risk plans
      --json                               Emit machine-readable JSON for every command
  -h, --help                               Print help
```

### `ibexctl confirm`

```text
Confirm a pending transaction

Usage: ibexctl confirm [OPTIONS] <TRANSACTION_ID>

Arguments:
  <TRANSACTION_ID>  

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

### `ibexctl rollback`

```text
Roll back a transaction

Usage: ibexctl rollback [OPTIONS] <TARGET>

Arguments:
  <TARGET>  

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

### `ibexctl history`

```text
Recent transactions

Usage: ibexctl history [OPTIONS]

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

### `ibexctl audit`

```text
Audit chain operations

Usage: ibexctl audit [OPTIONS] <COMMAND>

Commands:
  verify  Validate the audit hash chain

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl audit verify`

```text
Validate the audit hash chain

Usage: ibexctl audit verify [OPTIONS]

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

### `ibexctl events`

```text
Live events

Usage: ibexctl events [OPTIONS]

Options:
      --follow  
      --json    Emit machine-readable JSON for every command
  -h, --help    Print help
```

### `ibexctl apps`

```text
Applications seen by the connection monitor

Usage: ibexctl apps [OPTIONS] <COMMAND>

Commands:
  list     Every application seen, most recently active first
  info     One application and where it connects (key from `apps list`)
  default  What apps nobody decided about may do: allow, monitor or ask
  set      Choose what an application may do on the network

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl apps list`

```text
Every application seen, most recently active first

Usage: ibexctl apps list [OPTIONS]

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl apps info`

```text
One application and where it connects (key from `apps list`)

Usage: ibexctl apps info [OPTIONS] <APP>

Arguments:
  <APP>  

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl apps default`

```text
What apps nobody decided about may do: allow, monitor or ask

Usage: ibexctl apps default [OPTIONS] <MODE>

Arguments:
  <MODE>  [possible values: allow, monitor, ask]

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl apps set`

```text
Choose what an application may do on the network

Usage: ibexctl apps set [OPTIONS] <APP> <MODE>

Arguments:
  <APP>   Key from `apps list`
  <MODE>  [possible values: allow, monitor, ask, block]

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

### `ibexctl mcp`

```text
Connect an AI assistant (MCP) to IbexWall

Usage: ibexctl mcp [OPTIONS] <COMMAND>

Commands:
  config  What to paste to connect a client, and the matching mcp.toml stanza
  token   Make an access token for an assistant on another machine and plan the change that lets it in. The token is shown once; only its hash is sent

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl mcp config`

```text
What to paste to connect a client, and the matching mcp.toml stanza

Usage: ibexctl mcp config [OPTIONS] <CLIENT>

Arguments:
  <CLIENT>  [possible values: claude-code, opencode, vscode]

Options:
      --json                         Emit machine-readable JSON for every command
      --with-proposals               Show the stanza with change proposals allowed
      --url <https://HOST:PORT/mcp>  Reach `ibexwall-mcp --http` on another machine (https only)
  -h, --help                         Print help
```

#### `ibexctl mcp token`

```text
Make an access token for an assistant on another machine and plan the change that lets it in. The token is shown once; only its hash is sent

Usage: ibexctl mcp token [OPTIONS] --name <NAME>

Options:
      --json               Emit machine-readable JSON for every command
      --name <NAME>        What the token is for, e.g. "work laptop"
      --preset <PRESET>    What the assistant may do: read, plan or propose [default: read]
      --client <CLIENT>    The client entry it belongs to (default: `remote-ID`)
      --id <ID>            Three to sixteen lowercase letters or digits (default: random)
      --expires <EXPIRES>  Last day it works, YYYY-MM-DD
      --secret-stdin       Read your own secret from standard input instead of generating one
  -h, --help               Print help
```

### `ibexctl proposals`

```text
Changes an assistant proposed, waiting for a human decision

Usage: ibexctl proposals [OPTIONS] <COMMAND>

Commands:
  list     The proposals, newest first (pending by default)
  show     What one proposal would do
  approve  Approve: the plan is made again and applied if it is what was shown
  reject   Reject: nothing is applied

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl proposals list`

```text
The proposals, newest first (pending by default)

Usage: ibexctl proposals list [OPTIONS]

Options:
      --json             Emit machine-readable JSON for every command
      --status <STATUS>  [possible values: pending, approved, rejected, expired]
  -h, --help             Print help
```

#### `ibexctl proposals show`

```text
What one proposal would do

Usage: ibexctl proposals show [OPTIONS] <ID>

Arguments:
  <ID>  

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl proposals approve`

```text
Approve: the plan is made again and applied if it is what was shown

Usage: ibexctl proposals approve [OPTIONS] <ID>

Arguments:
  <ID>  

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl proposals reject`

```text
Reject: nothing is applied

Usage: ibexctl proposals reject [OPTIONS] <ID>

Arguments:
  <ID>  

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

### `ibexctl prompts`

```text
Connections held in Ask mode, waiting for an answer

Usage: ibexctl prompts [OPTIONS] <COMMAND>

Commands:
  list    The open questions
  answer  Answer one: allow or block, for this connection, this destination or the whole app

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl prompts list`

```text
The open questions

Usage: ibexctl prompts list [OPTIONS]

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl prompts answer`

```text
Answer one: allow or block, for this connection, this destination or the whole app

Usage: ibexctl prompts answer [OPTIONS] <ID> <DECISION>

Arguments:
  <ID>        
  <DECISION>  [possible values: allow, block]

Options:
      --json           Emit machine-readable JSON for every command
      --scope <SCOPE>  [default: once] [possible values: once, destination, always]
  -h, --help           Print help
```

### `ibexctl firewall`

```text
The inbound firewall: what is allowed in, and changes to it

Usage: ibexctl firewall [OPTIONS] <COMMAND>

Commands:
  status   What the firewall allows today
  allow    Let a port or a service in: `8080/tcp`, `53/udp` or `service:http`
  profile  Network profiles (home, work, public, travel): with no name, list them; with a name, switch to it (firewalld only)
  deny     Stop letting a port or a service in

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl firewall status`

```text
What the firewall allows today

Usage: ibexctl firewall status [OPTIONS]

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```

#### `ibexctl firewall allow`

```text
Let a port or a service in: `8080/tcp`, `53/udp` or `service:http`

Usage: ibexctl firewall allow [OPTIONS] <TARGET>

Arguments:
  <TARGET>  

Options:
      --json  Emit machine-readable JSON for every command
      --yes   Apply it now (otherwise only the plan is shown)
  -h, --help  Print help
```

#### `ibexctl firewall profile`

```text
Network profiles (home, work, public, travel): with no name, list them; with a name, switch to it (firewalld only)

Usage: ibexctl firewall profile [OPTIONS] [NAME]

Arguments:
  [NAME]  

Options:
      --json  Emit machine-readable JSON for every command
      --yes   Apply it now (otherwise only the plan is shown)
  -h, --help  Print help
```

#### `ibexctl firewall deny`

```text
Stop letting a port or a service in

Usage: ibexctl firewall deny [OPTIONS] <TARGET>

Arguments:
  <TARGET>  

Options:
      --json  Emit machine-readable JSON for every command
      --yes   Apply it now (otherwise only the plan is shown)
  -h, --help  Print help
```

### `ibexctl tui`

```text
Interactive terminal UI

Usage: ibexctl tui [OPTIONS]

Options:
      --json  Emit machine-readable JSON for every command
  -h, --help  Print help
```
