---
title: "Level 6 → Level 7"
description: "Learn about flags"
date: 2026-08-03
platform: OverTheWire
game: Bandit
level: "6 → 7"
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
ssh -p 2220 bandit6@bandit.labs.overthewire.org 
```

## Exploitation

After logging in, find the file with the following properties:

owned by user bandit7
owned by group bandit6
33 bytes in size

```sh title="Terminal"
cat $(find / -type f -user bandit7 -group bandit6 -size 33c 2>/dev/null)
```

Explanation:
- /: Starts the search from the root directory.
- type f: Searches only for files, ignoring directories.
- user bandit7: Filters for files owned by user bandit7.
- group bandit6: Filters for files owned by group bandit6.
- size 33c: Matches files that are exactly 33 bytes (c stands for bytes).
- 2>/dev/null: Mutes "Permission denied" errors from directories you cannot access.

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- 2>/dev/null: the number `2` represents the Standard Error (stderr) stream
- By using 2>, you are explicitly telling the shell to redirect only this error channel away from your screen.

:::
