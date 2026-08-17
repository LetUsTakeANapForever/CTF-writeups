---
title: "Level 20 → Level 21"
description: "Learn how to exploit local network services and leverage the netcat utility to interact with a setuid binary for privilege escalation."
date: 2026-08-17
platform: OverTheWire
game: Bandit
level: "20 → 21"
difficulty: Easy
category: Linux
tags:
  - SSH
  - Linux
  - Beginner
---

## Challenge

Connect to the Bandit game server over SSH and locate the password for the next level.

First, let's read it line by line of what we need to do:
1. There is a setuid binary in the homedirectory that makes a connection to localhost on the port you specify as a commandline argument. 
2. Then reads a line of text from the connection and compares it to the password in the previous level (bandit20). 
3. If the password is correct, it will transmit the password for the next level (bandit21).

Now, we're ready to work on it.

## Enumeration

Connect to the non-standard SSH port:

```sh title="Terminal"
ssh -p 2220 bandit20@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:
1. We need to open a connection and feed the password we got from the previous level.
```sh title="Terminal"
echo -n "[PreviousLevelPassword]" | nc -l -p 1234 &
```
Note: The `&` runs the netcat command in the background so your terminal remains free.

2. Then we execute the binary with the port argument as bandit21 to get the password.
```sh title="Terminal"
./suconnect 1234
```
This contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- Network Interception & Local Listeners: Using `nc` (netcat) in listen mode (`-l`) allows you to act as a local server to capture or supply data to programs communicating over network sockets.

- Background Processes: Appending an ampersand (`&`) to a command executes it in the background, keeping your current shell interactive so you can run subsequent commands simultaneously.

- Setuid Binary Behavior: Understanding how setuid binaries execute allows you to interact with privileged programs by feeding them expected inputs locally.

:::
