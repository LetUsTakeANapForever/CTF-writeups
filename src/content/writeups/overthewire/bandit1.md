---
title: "Level 0 → Level 1"
description: "Find `readme` file and read it."
date: 2026-07-30
platform: OverTheWire
game: Bandit
level: "0 → 1"
difficulty: Easy
category: Linux
tags:
  - SSH
  - Linux
  - Beginner
---

## Challenge

Connect to the Bandit game server over SSH and locate the password for the next level.

## Enumeration

The challenge starts with SSH credentials for `bandit0`. Connect to the non-standard SSH port:

```sh title="Terminal"
ssh -p 2220 bandit1@bandit.labs.overthewire.org 
```

## Exploitation

After logging in, list the files and read the `readme` file:

```sh title="Terminal"
ls

cat readme
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `cat` is a command for viewing, creating, and combining file contents.
- syntax: cat `<file_name>` 

:::
