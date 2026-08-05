---
title: "Level 9 → Level 10"
description: "Learn about string command"
date: 2026-08-05
platform: OverTheWire
game: Bandit
level: "9 → 10"
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
ssh -p 2220 bandit9@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

```sh title="Terminal"
strings data.txt | grep "="
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `strings`: Used to scan and extract sequences of printable characters from binary, object, or non-text files.

:::
