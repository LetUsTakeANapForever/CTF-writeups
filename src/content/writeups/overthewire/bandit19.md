---
title: "Level 19 → Level 20"
description: "Learn about setuid."
date: 2026-08-17
platform: OverTheWire
game: Bandit
level: "19 → 20"
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
ssh -p 2220 bandit19@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

```sh title="Terminal"
ls -a

# The result:
-rwsr-x--- 1 bandit20 bandit19 
```

This means the binary can be executed by bandit19 but it is done as bandit20.

To explain,
- Owner (bandit20): Has full control (rws - read, write, execute, plus setuid).
- Group (bandit19): Has read and execute permissions (r-x).
- The s: Because the setuid bit is active, whenever user bandit19 runs this binary, the system temporarily elevates their privileges to run it as bandit20.

Without `s` or `setuid`:
It runs as bandit19: Instead of temporarily borrowing bandit20's identity, the program will execute with the exact permissions of whoever is running it (bandit19). And it will likely fail due to permission denied.

Like this one below:

```sh title="Terminal"
# An example of the permission denied result.
./bandit20-do 
Run a command as another user.
  Example: ./bandit20-do whoami
  ```

So now that we have the `s`, we can execute and read the password.
```sh title="Terminal"
./bandit20-do cat /etc/bandit_pass/bandit20
```
The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `setuid` (Set User ID) is a special file permission in Unix-like operating systems that allows an executable file to be run with the privileges of its owner rather than the user who is running it.

:::
