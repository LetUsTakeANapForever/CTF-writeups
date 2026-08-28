---
title: "Level 29 -> Level 30"
description: "Learn how to use git branch."
date: 2026-08-28
platform: OverTheWire
game: Bandit
level: "29 -> 30"
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

Clone the repo first.
```sh title="Terminal"
git clone ssh://bandit29-git@bandit.labs.overthewire.org:2220/home/bandit29-git/repo
```

## Exploitation

After cloning the repo:
```sh title="Terminal"
cd repo

ls
README.md
                                                                                                                                   
cat README.md 
# Bandit Notes
Some notes for bandit30 of bandit.

## credentials

- username: bandit30
- password: <no passwords in production!>
```

Looks like it's no passwords here. Or maybe, no password on this branch.
Let's find some other branches.

```sh title="Terminal"
# This will list all local and remote branches in the repo.
git branch -a
# The result:
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/dev
  remotes/origin/master
  remotes/origin/sploits-dev
```

As you can see, we're on the master branch.
Now let's check out to remotes/origin/dev branch and read the README file.
```sh title="Terminal"
git checkout remotes/origin/dev

cat README.md
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `git branch` is used to list out all branches on local.
- `git branch -a`, with flag `-a`, this command will list out all branches both on local and remote.

:::
