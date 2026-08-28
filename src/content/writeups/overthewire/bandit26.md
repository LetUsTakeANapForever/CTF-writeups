---
title: "Level 26 -> Level 27"
description: "Learn about setuid."
date: 2026-08-18
platform: OverTheWire
game: Bandit
level: "26 -> 27"
difficulty: Easy
category: Linux
tags:
  - SSH
  - Linux
  - Beginner
---

## Challenge

The instruction: `"Good job getting a shell! Now hurry and grab the password for bandit27!"`

Alright, you know what to do right? 

Let's re-login to bandit26 using the same method as level 25.
You can go check it out for more explanation. But for now, let's just get started.

```sh title="Terminal"
# Shrink the screen into one line and login.
ssh -i bandit26.sshkey bandit26@bandit.labs.overthewire.org -p 2220

# Press v and change the shell type then open the shell.
:set shell=/bin/bash
:shell

# Then hit q to quit and you're good to go.
```

## Enumeration

Connect to the non-standard SSH port:

```sh title="Terminal"
ssh -p 2220 bandit26@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:
```sh title="Terminal"
cat /etc/bandit_pass/bandit27
# The result:
cat: /etc/bandit_pass/bandit27: Permission denied

ls -l /etc/bandit_pass/
# The result:
-r-------- 1 bandit27 bandit27 33 Jun 24 14:58 /etc/bandit_pass/bandit27
```

Apparently, it can only be read by bandit27. So we need setuid for bandit27.

Let's list to check.
```sh title="Terminal"
ls
# The result
ls
bandit27-do  text.txt

# Let me read the text.txt
cat text.txt 
# The result:
  _                     _ _ _   ___   __  
 | |                   | (_) | |__ \ / /  
 | |__   __ _ _ __   __| |_| |_   ) / /_  
 | '_ \ / _` | '_ \ / _` | | __| / / '_ \ 
 | |_) | (_| | | | | (_| | | |_ / /| (_) |
 |_.__/ \__,_|_| |_|\__,_|_|\__|____\___/ 
```
Ok, so this is a logo.

Alright, let's run the other one.
```sh title="Terminal"
./bandit27-do
# The result: 
Run a command as another user.
  Example: ./bandit27-do id
```

Let's try again with a command
```sh title="Terminal"
./bandit27-do cat /etc/bandit_pass/bandit27
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- You can escape the restricted shell by changing its shell to `/bin/bash`.
- Use the provided setuid `bandit27-do` binary to read protected files as `bandit27`.

:::
