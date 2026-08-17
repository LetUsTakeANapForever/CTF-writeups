---
title: "Level 17 → Level 18"
description: "Learn to use diff command."
date: 2026-08-17
platform: OverTheWire
game: Bandit
level: "17 → 18"
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
ssh -p 2220 bandit17@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

```sh title="Terminal"
diff passwords.old passwords.new 
```
The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `diff` is a command used to compare two files or directories line by line.

:::
