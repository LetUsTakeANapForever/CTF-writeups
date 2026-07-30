---
title: "Level 2 → Level 3"
description: "Learn to read a filename with spaces file."
date: 2026-07-30
platform: OverTheWire
game: Bandit
level: "2 → 3"
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
ssh -p 2220 bandit2@bandit.labs.overthewire.org 
```

## Exploitation

After logging in, list the files and read the `--spaces in this filename--` file:

```sh title="Terminal"
cat ./"--spaces in this filename--"
```

or


```sh title="Terminal"
cat ./--spaces\ in\ this\ filename--
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

To read filename with spaces

- Either use double quotes `""` to wrap filename or blackslash (escape character) `\` between each space.
- Both ways force the shell to treat the spaces as literal characters rather than break points.
- Blackslash tells the shell: Treat the very next character literally. Do not use it as a special rule or delimiter.
- Double quotes turn off word splitting for everything inside them, preserving whitespace.

:::
