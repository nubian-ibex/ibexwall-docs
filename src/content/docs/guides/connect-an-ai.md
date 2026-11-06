---
title: "Connect an AI"
description: "Let an AI assistant read your security status and suggest changes, without ever being able to apply one."
sidebar:
  order: 4
---

IbexWall can talk to an AI assistant through the Model Context Protocol (MCP). The assistant can read your score and findings, and if you allow it, show you what a change would do or leave a suggestion. It cannot apply, approve or undo anything. Only you can, with your password.

This needs the `ibexwall-mcp` package.

## Connect a program

1. Open **Connect an AI**.
2. Pick the program you use: Claude Code, OpenCode or VS Code.
3. Copy the text shown and put it in the file the screen names for that program.
4. Choose what it may do.

Without a choice, an AI can only read your score and your findings. The three presets are:

- **Read only:** your score, findings and recent events, and nothing else.
- **Read and plan:** also shows what a change would do, without making it.
- **Read, plan and suggest changes:** also leaves a suggestion for you to approve or reject.

The user who runs the program must be in the `ibexwall-assistants` group, then log in again:

```sh
sudo usermod -aG ibexwall-assistants $USER
```

On the command line, `ibexctl mcp config claude-code` prints the snippet and the matching stanza for `/etc/ibexwall/mcp.toml`. The other names are `opencode` and `vscode`. Add `--with-proposals` to include suggestions. Printing needs no daemon and changes nothing.

## What an assistant sees

Names, addresses, Wi-Fi names and home folders are replaced by stable pseudonyms before the assistant sees them. Text that comes from outside, such as a domain or a program name, is marked as not checked, so it cannot pose as an instruction. Sensitive plugins are closed by default, and answers are limited in size and rate.

Everything the scopes allow still goes to the model you connected. Prefer a local model for anything beyond the posture.

Every call an assistant makes is written to `~/.local/state/ibexwall/mcp-audit.jsonl` before it runs. Check that no line was removed with:

```sh
ibexwall-mcp --verify-log
```

## Review its suggestions

Suggestions appear on the **AI assistant** screen, marked "Suggested by CLIENT (an AI)", with the exact operations that would change. The assistant's own explanation is shown as text "Written by the AI, not checked by IbexWall", so read the plan and not the words.

Press **Approve and apply** or **Reject**. If the plan changed since it was suggested, nothing is applied and you are asked to have it suggested again. Suggestions expire after a day, and changes that cannot be undone are never accepted. At most 20 can wait, and 8 per client.

```sh
ibexctl proposals list
ibexctl proposals show ID
ibexctl proposals approve ID
ibexctl proposals reject ID
```

## Remote access over HTTPS

Off by default. When on, an assistant on another computer can connect, but only over TLS and only with a key you make. There is no plain mode.

1. On **Connect an AI**, make a certificate for the names or addresses the other computer will use. It is valid for a year. The screen shows its SHA-256 fingerprint: check it on the other computer before trusting the certificate.
2. Make a key: give it a name, what it may do and an optional end date. Copy it now. It is shown once, and IbexWall keeps only a hash.
3. Choose where to listen (`127.0.0.1` keeps it on this computer; `0.0.0.0` with a port lets other computers in) and turn it on.
4. On the other computer, keep the key in the `IBEXWALL_MCP_TOKEN` environment variable.

From the command line, `ibexctl mcp token --name "work laptop" --preset propose --expires 2027-01-31` makes a key and plans the change that lets it in, and `ibexctl mcp config claude-code --url https://HOST:PORT/mcp` prints the remote snippet.

To remove a key, press **Remove** next to it and apply the change. It stops working at once. A stolen key works until it is removed or expires, so give keys an end date.
