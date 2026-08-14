---
title: "Level 13 → Level 14"
description: "Learn to use `scp` command"
date: 2026-08-14
platform: OverTheWire
game: Bandit
level: "13 → 14"
difficulty: Easy
category: Linux
tags:
  - SSH
  - Linux
  - Beginner
---

## Challenge

Connect to the Bandit game server over SSH.

But,

***"For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level"***

that is what they say. So let's start.

## Enumeration

Connect to the non-standard SSH port:

```sh title="Terminal"
ssh -p 2220 bandit13@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

1. Use `scp` command to connect to `bandit13` remote machine to get the ssh key.
- The syntax is `scp -P <port> <user>@<IP>:<remotefilepath> <localfilepath>`.
```sh title="Terminal"
scp -P 2220 bandit13@bandit.labs.overthewire.org:sshkey.private .

# Remember that we also need to change its permission. This is what the warning looks like, if we don't.
Permissions 0640 for 'sshkey.private' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "sshkey.private": bad permissions
(-rwxr-x--x  1 nidchamon nidchamon  2602 Jul 23 22:33 sshkey.private
)
```
2. Change permission.
- `700` means ***ONLY*** ***owner*** can read, write and execute it.
```sh title="Terminal"
chmod 700 sshkey.private
```
3. Now, we use ssh with the `-i` flag to allow login with the private key.
- The flag `-i` stands for Identity.
```sh title="Terminal"
ssh -i sshkey.private -p 2220 bandit14@bandit.labs.overthewire.org
```
And it's done? Of course not.

Now we need to get Bandit14 password after we have been successfully logged into Bandit14.

4. `/etc/bandit_pass/` This directory contains passwords, so we will also get bandit14's from here.
```sh title="Terminal"
cat /etc/bandit_pass/bandit14
```
The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `scp` stands for Secure Copy Protocol: it securely copies files between computers over a network using SSH.
- `scp` syntax is `scp -P <port> <user>@<IP>:<remotefilepath> <localfilepath>`.
- The flag `-i` for `ssh` command stands for `Identity`.

:::
