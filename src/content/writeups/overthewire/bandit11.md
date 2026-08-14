---
title: "Level 11 → Level 12"
description: "Learn to implement ROT13 (Rotate by 13 places)"
date: 2026-08-14
platform: OverTheWire
game: Bandit
level: "11 → 12"
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
ssh -p 2220 bandit11@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

```sh title="Terminal"
tr 'A-Za-z' 'N-ZA-Mn-za-m' < data.txt
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `tr`: This command implements rotating by n places, a basic substitution cipher that obfuscates text.

:::
