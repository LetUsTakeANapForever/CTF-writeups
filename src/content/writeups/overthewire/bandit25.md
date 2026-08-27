---
title: "Level 25 -> Level 26"
description: "Learn about more and how to set shell."
date: 2026-08-18
platform: OverTheWire
game: Bandit
level: "25 -> 26"
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
ssh -p 2220 bandit25@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:
Let's lisst out to check first.
```sh title="Terminal"
ls
# The result:
bandit26.sshkey
```

Ok so we need to log in to level 26 using the sshkey.

First press `ctrl + d` to log out and then we use `scp` command to copy bandit26.sshkey to the local.
```sh title="Terminal"
scp -P 2220 bandit25@bandit.labs.overthewire.org:bandit26.sshkey .
```

Then we log into the bandit26.
```sh title="Terminal"
ssh -i bandit26.sshkey bandit26@bandit.labs.overthewire.org -p 2220

# But this is the result:
Connection to bandit.labs.overthewire.org closed.
```

Now as the instruction said `"The shell for user bandit26 is not /bin/bash, but something else."`

So now we need to log in as bandit25, and inspect inside `/etc/passwd` about bandit26.

```sh title="Terminal"
grep bandit26 /etc/passwd
# The result: This means that it uses bin/showtext not bin/bash.
bandit26:x:11026:11026:bandit level 26:/home/bandit26:/usr/bin/showtext
```

Let's see what it looks like inside.
```sh title="Terminal"
cat /usr/bin/showtext
```


The result:
```sh title="Terminal"
#!/bin/sh

export TERM=linux

exec more ~/text.txt
exit 0
```

To explain:

`#!/bin/sh`
The "shebang" line tells the system to execute this script using the standard Bourne shell (sh).

`export TERM=linux`
Sets the terminal type environment variable to linux. This tells programs how to format text, handle colors, and draw layout elements for a standard Linux console.

`exec more ~/text.txt`
The exec command replaces the current shell process with the more command, opening the file located at your home directory (~/text.txt) for reading. Because exec replaces the shell process entirely, no commands after this will run normally.

`exit 0`
This indicates a successful exit code (0), though in this specific script, it won't actually be reached because the exec command above already replaced the process.

To sum up, this script configures a basic Linux terminal environment (`TERM=linux`) and immediately launches the **`more`** utility to read the file `~/text.txt`, completely replacing the current shell process in the process.

So now our plan is to shrink the screen, because by doing so, it forces the `more` command to pause and display only a tiny portion of the text at a time instead of filling the screen and quitting immediately.

While `more` is paused and waiting for you to press space or enter, you can interrupt it (usually by pressing `v` to open a text editor like `vi` inside the session, or escaping the pager depending on the trick), which lets you break out of that restricted shell script and get a full interactive bash prompt for bandit26.

Let's do it.
```sh title="Terminal"
ssh -i bandit26.sshkey bandit26@bandit.labs.overthewire.org -p 2220
```

Now we press `v` and type command to set shell and execute it.
```sh title="Terminal"
:set shell=/bin/bash
:shell
```

Then hit `q` to quit, and now we're logged in as bandit26, let's capture the flag.
```sh title="Terminal"
cat /etc/bandit_pass/bandit26
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- While `more` is paused and waiting for you to press space or enter, you can interrupt it by pressing `v` to open a text editor like `vi` which lets you break out of that restricted shell script and get a full interactive bash prompt.

:::