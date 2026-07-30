---
title: "Level 1 → Level 2"
description: "Learn to read a dashed filename file."
date: 2026-07-30
platform: OverTheWire
game: Bandit
level: "1 → 2"
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
ssh -p 2220 bandit2@bandit.labs.overthewire.org 
```

## Exploitation

After logging in, list the files and read the `-` file:

```sh title="Terminal"
ls

cat./-
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- Use `./` before a dashed filename (like `-file.txt`) because the terminal command will mistake the leading dash for a command option or flag instead of a file name

:::
