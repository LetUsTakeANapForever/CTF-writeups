---
title: "Level 22 -> Level 23"
description: "Learn how cron jobs can be reversed."
date: 2026-08-18
platform: OverTheWire
game: Bandit
level: "22 -> 23"
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
ssh -p 2220 bandit22@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:
```sh title="Terminal"
cd /etc/cron.d/
cat cronjob_bandit23
```

Try reading the bash script
```sh title="Terminal"
cat /usr/bin/cronjob_bandit23.sh
```

So now we know that it will display text as copying passwordfile from a place to another place.
```sh title="Terminal"
cd /../..

cd /usr/bin/
```

Try running the script to get the result.
```sh title="Terminal"
./cronjob_bandit23.sh

# The result:
Copying passwordfile /etc/bandit_pass/bandit22 to /tmp/8169b67bd894ddbb4412f91573b38db3
```

So this is for bandit22 but we need to find values of variables for bandit23.

```sh title="Terminal"
whoami
# The result:
bandit23
```

We're gonna replace `$myname` with whoami result
```sh title="Terminal"
echo I am user bandit23 | md5sum | cut -d ' ' -f 1 
# This is what we got.
8169b67bd894ddbb4412

# And now we know where to look for the password.
cat /tmp/8ca319486bfbbc3663ea0fbe81326349
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- Cron jobs often build file paths from variables, so understanding the script logic is the key to finding the output.
- `whoami` is useful when the script depends on the current username.

:::