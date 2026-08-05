---
title: "Level 10 → Level 11"
description: "Learn to decode base64 file"
date: 2026-08-05
platform: OverTheWire
game: Bandit
level: "10 → 11"
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
ssh -p 2220 bandit10@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

```sh title="Terminal"
base64 -d data.txt
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `base64 -d`: A command used to decode Base64-encoded text or files back into their original format.

:::
