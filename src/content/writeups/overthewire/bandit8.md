---
title: "Level 8 → Level 9"
description: "Learn to use sort and uniq commands"
date: 2026-08-05
platform: OverTheWire
game: Bandit
level: "8 → 9"
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
ssh -p 2220 bandit8@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

```sh title="Terminal"
cat data.txt | sort | uniq -u
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `sort`: Alphabetizes or numerically orders lines of text. Essential to run before uniq, as uniq only detects adjacent identical lines
- `uniq`: Removes the extra copies of whatever is above or below.
- `uniq -u`: The flag `-u` is required because the standard uniq command (without any flags) removes duplicates by keeping one copy of every single line. Simply speaking, it isn't the uniq of the uniq.

:::
