---
title: "Level 7 → Level 8"
description: "Learn to use grep to search for a specific pattern."
date: 2026-08-03
platform: OverTheWire
game: Bandit
level: "7 → 8"
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
ssh -p 2220 bandit7@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

```sh title="Terminal"
cat data.txt | grep "millionth"
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `grep` is a command for searching text for lines that match a regular expression.

:::
