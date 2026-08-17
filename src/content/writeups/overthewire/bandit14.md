---
title: "Level 14 → Level 15"
description: "Learn to use `nc` command"
date: 2026-08-14
platform: OverTheWire
game: Bandit
level: "14 → 15"
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
ssh -p 2220 bandit14@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

Use `nc` command to connect to localhost port 3000 and write the password.
-  syntax: `nc [dest.] [port]`
```sh title="Terminal"
nc localhost 30000

# After opening the connection, we pass Bandit14's password, and it will return the next level password back.
<Previous Level Password>
```
The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `nc` command will establish arbitrary TCP and UDP connections and listens to them.
- `nc` stands for `netcat`.

:::
