---
title: "Level 16 → Level 17"
description: "Learn about `nmap` command."
date: 2026-08-17
platform: OverTheWire
game: Bandit
level: "16 → 17"
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
ssh -p 2220 bandit16@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

1. Find out which of these ports have a server listening on them using `nmap` command.

```sh title="Terminal"
nmap -p31000-32000 localhost

# The result:
PORT      STATE SERVICE
31046/tcp open  unknown
31518/tcp open  unknown
31691/tcp open  unknown
31790/tcp open  unknown
31960/tcp open  unknown
```

2. Then find out which of those speak SSL/TLS and which don’t
```sh title="Terminal"
nmap -sV -p 31046,31518,31691,31790,31960 localhost
```

***Note:***
- *The `-sV` flag forces Nmap to communicate wieth ach open port to determine exactly what service and protocol (like SSL/TLS) is running.*
- *In Nmap, `-sV` stands for Service Version detection.*

```sh title="Terminal"s
# The result:
Output:
PORT      STATE SERVICE     VERSION
31046/tcp open  echo
31518/tcp open  ssl/echo
31691/tcp open  echo
31790/tcp open  ssl/unknown
31960/tcp open  echo
```
`"There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it."`

So it must be `31790/tcp open  ssl/unknown` because `31518/tcp open  ssl/echo` will send back to you whatever you send to it.

3. Now we use `openssl s_client` command to initiate a client connection.

```sh title="Terminal"
openssl s_client -connect localhost:31790

# If you're getting KEYUPDATE then use -quite because The -quiet flag helps because your password starts with a lowercase "k", which openssl s_client treats as an interactive system command rather than plaintext

openssl s_client -connect localhost:31790 -quiet
```

4. Then we create a temp directory to store ssh key → copy and paste the RSA private key.
```sh title="Terminal"
mkdir /tmp/private_sshkey
cd /tmp/private_sshkey
touch sshkey17.private
vim sshkey17.private
```

5. Then change persimmsion, so that we won't get error when we use the key.
```sh title="Terminal"
chmod 700 sshkey17.private
```

6. Now, we have 2 options:
- Either use the key file with the ssh command to access the next level.
```sh title="Terminal"
ssh -i sshkey17.private bandit17@bandit.labs.overthewire.org
cat /etc/bandit_pass/bandit17
```

- Or exit from bandit16 and use scp command → then use the sshkey.17.private to gain access to bandit17.
```sh title="Terminal"
# Use scp command
scp -P 2220 bandit16@bandit.labs.overthewire.org:/tmp/private_sshkey/sshkey17.private .

# Then use the sshkey.17.private to gain access
ssh -i sshkey17.private bandit17@bandit.labs.overthewire.org -p 2220

# Lastly, read the bandit17's password
cat /etc/bandit_pass/bandit17
```
The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `nmap` stands for Network Mapper. It is used to find network, ports, and services.
- In Nmap, `-sV` stands for Service Version detection.
- The `-sV` flag forces Nmap to communicate wieth ach open port to determine exactly what service and protocol (like SSL/TLS) is running.

:::
