---
title: "Level 27 -> Level 28"
description: "Learn how to use git."
date: 2026-08-28
platform: OverTheWire
game: Bandit
level: "27 -> 28"
difficulty: Easy
category: Linux
tags:
  - SSH
  - Linux
  - Beginner
---

## Challenge

From your local machine, clone the repository and find the password for the next level. 

## Enumeration

Clone the repo first. Since it's on port 2220, we're gonna add port after `:` too.
```sh title="Terminal"
git clone ssh://bandit27-git@bandit.labs.overthewire.org:2220/home/bandit27-git/repo
```

## Exploitation

After cloning the repo:
```sh title="Terminal"
cd repo

ls
README

cat README
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- The syntax for `git clone` over ssh is: `git clone ssh://[username]@[hostname]:[port]/[path/to/repository]`

:::
