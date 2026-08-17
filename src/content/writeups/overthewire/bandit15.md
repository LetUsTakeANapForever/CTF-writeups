---
title: "Level 15 → Level 16"
description: "Learn about connecting to a secure server using OpenSSL"
date: 2026-08-14
platform: OverTheWire
game: Bandit
level: "15 → 16"
difficulty: Easy
category: Linux
tags:
  - SSH
  - Linux
  - Beginner
---

## Challenge

Connect to the Bandit game server over SSH and locate the password for the next level.

***"The password for the next level can be retrieved by submitting the password of the current level to port 30001 on localhost using SSL/TLS encryption."***

So basically, the meaning is, by connecting to the server and submiting the password to it, it gives us response which contains password. Let's do it.

## Enumeration

Connect to the non-standard SSH port:

```sh title="Terminal"
ssh -p 2220 bandit15@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

1. Use `openssl s_client` command to initiates a generic SSL/TLS client connection.
- Syntax: `openssl s_client -connect [hostname]:[port]`

```sh title="Terminal"
openssl s_client -connect localhost:30001
```

2. Then submit the password of the current level.
```sh title="Terminal"
<Current Level Password> # Enter the current level password.
Correct!
<Next Level Password> # This is the next level password we got.
```
The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `openssl s_client` command is used to initiate a generic SSL/TLS client connection.

:::
