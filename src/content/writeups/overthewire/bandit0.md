---
title: "Level 0"
description: "Connect to the first Bandit level over SSH and retrieve the password for the next challenge."
date: 2026-07-27
platform: OverTheWire
game: Bandit
level: 0
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
ssh -p 2220 bandit0@bandit.labs.overthewire.org 
```
```sh title="Terminal"
bandit@bandit.labs.overthewire.org's password: bandit0
```

## Exploitation

After logging in, list the files and read the `readme` file:

```sh title="Terminal"
ls
cat readme
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- SSH can connect on a custom port with the `-p` option.
- ssh -p `<PORT>` `<USERNAME@HOST>`

:::
