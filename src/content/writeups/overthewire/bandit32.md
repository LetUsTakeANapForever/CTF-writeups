---
title: "Level 32 → Level 33"
description: "Learn how to escape uppercase shell"
date: 2026-09-01
platform: OverTheWire
game: Bandit
level: "32 → 33"
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
ssh -p 2220 bandit32@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:


```sh title="Terminal"
WELCOME TO THE UPPERCASE SHELL
>> ls
sh: 1: LS: Permission denied
```

It seems like we're in the uppercase shell rather than a bash shell.

And the uppercase shell will take what we enter, convert it to uppercase 
and execute the command.

To escape this, we need to use the special shell variable `$0` which holds a reference to the current shell/interpreter.
```sh title="Terminal"
>> $0
$
```

Let's check files.
```sh title="Terminal"
$ ls -la
total 36
drwxr-xr-x   2 root     root      4096 Jun 24 14:59 .
drwxr-xr-x 150 root     root      4096 Jun 24 15:02 ..
-rw-r--r--   1 root     root       220 Feb 13  2026 .bash_logout
-rw-r--r--   1 root     root      3851 Jun 24 14:50 .bashrc
-rw-r--r--   1 root     root       807 Feb 13  2026 .profile
-rwsr-x---   1 bandit33 bandit32 15136 Jun 24 14:59 uppershell
```

So the uppershell script can be run by bandit32 but it will be run as bandit33.

So who are we really?
```sh title="Terminal"
whoami
bandit33
```

We are bandit33 now, let's try to retrieve the password as bandit33.
```sh title="Terminal"
cat /etc/bandit_pass/bandit33
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `$0` is the special shell variable which holds a reference to the current shell/interpreter.

:::
