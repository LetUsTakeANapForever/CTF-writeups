---
title: "Level 4 → Level 5"
description: "Find the only human-readable file in the inhere directory"
date: 2026-07-30
platform: OverTheWire
game: Bandit
level: "4 → 5"
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

Connect to the non-standard SSH port:

```sh title="Terminal"
ssh -p 2220 bandit4@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

```sh title="Terminal"
cd inhere

file ./-file01

.
.
.

file ./-file07
```

Keep using `file` command to check if it's written in ASCII file (human-readable file).

Then, I finally found the file: -file07.

It contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `file` command is used to identify file type.
- ASCII is a standard text file containing only human-readable characters.

:::
