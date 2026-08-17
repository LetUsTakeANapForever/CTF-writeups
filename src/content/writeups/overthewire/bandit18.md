---
title: "Level 18 → Level 19"
description: "Learn about ways to execute a command on a remote machine."
date: 2026-08-17
platform: OverTheWire
game: Bandit
level: "18 → 19"
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
ssh -p 2220 bandit18@bandit.labs.overthewire.org 
```

## Exploitation

After logging in: 

The problem with this level is

`"Someone has modified .bashrc to log you out when you log in with SSH."`

That means, the default shell "Bash" has no longer been allowed any login using SSH.

And ‘.bashrc’ is a file that is run every time a terminal is loaded.  It is the default.

So, we have two good options to pass this level.

**Option 1:** Change the shell.

1. So firstly, read all details of the available shells on a system.
```sh title="Terminal"
cat /etc/shells 
```
I picked `bin/sh` shell.

2. Use `-t` flag to specify the shell to be used to login into the system

```sh title="Terminal"
ssh bandit18@bandit.labs.overthewire.org -p 2220 -t "/bin/sh"
```

And now, you have sucessfully logged in.

Let's take a look at the other option.

**Option 2:** No need to log in, just type command after ssh command.
```sh title="Terminal:
# Check files
ssh bandit18@bandit.labs.overthewire.org -p 2220 -t "ls"
# Read the file
ssh bandit18@bandit.labs.overthewire.org -p 2220 -t "cat readme"
```

To explain,

you can execute a remote command via SSH by appending the command to the standard SSH connection string without needing to open an interactive terminal session first.

**P.S. This is different from logging in:**

- SSH authenticates you, starts a login shell, and hands the interactive terminal prompt directly over to you. You stay connected, typing commands one by one, until you type exit.

- Remote Execution (ssh user@host "command"): SSH authenticates you, runs that specific command immediately, captures the output, sends it back to your local terminal, and closes the connection instantly.

So we've finished this, the `readme` file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- SSH authenticates you, starts a login shell, and hands the interactive terminal prompt directly over to you. You stay connected, typing commands one by one, until you type exit.

- Remote Execution (ssh user@host "command"): SSH authenticates you, runs that specific command immediately, captures the output, sends it back to your local terminal, and closes the connection instantly.

:::
