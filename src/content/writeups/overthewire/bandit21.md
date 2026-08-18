---
title: "Level 21 -> Level 22"
description: "Learn about cronjob."
date: 2026-08-
platform: OverTheWire
game: Bandit
level: "21 -> 22"
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
ssh -p 2220 bandit21@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:
```sh title="Terminal"
cd /ext/cron.d
ls -la 

# After listing out, we'll see cronjob_bandit22, the file that we're gonna read.

cat cronjob_bandit22
# The result:
@reboot bandit22 /usr/bin/cronjob_bandit22.sh &> /dev/null
* * * * * bandit22 /usr/bin/cronjob_bandit22.sh &> /dev/null
```

This cronjob runs the file /usr/bin/cronjob_bandit22.sh

```sh title="Terminal"
cat /usr/bin/cronjob_bandit22.sh
```

This is what we get:

```sh title="Terminal"
#!/bin/bash
chmod 644 /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
cat /etc/bandit_pass/bandit22 > /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv

```
It is a bash file to change permission and write bandit22's password to the file /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv.

Now we know where to read the password from.

```sh title="Terminal"
cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- Cron jobs can expose useful behavior by writing files into predictable locations like `/tmp`.
- Always inspect `/etc/cron.d` and the scripts those jobs call.
- If a cron script changes file permissions, that can make a sensitive file readable to another user.

:::