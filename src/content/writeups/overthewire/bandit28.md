---
title: "Level 28 -> Level 29"
description: "Learn how to use git log and git checkout."
date: 2026-08-28
platform: OverTheWire
game: Bandit
level: "28 -> 29"
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
git clone ssh://bandit28-git@bandit.labs.overthewire.org:2220/home/bandit28-git/repo
```

## Exploitation

After cloning the repo:
```sh title="Terminal"
cd repo

ls
README.md

cat README.md
# Bandit Notes
Some notes for level29 of bandit.

## credentials

- username: bandit29
- password: xxxxxxxxxx
```

Looks like it is censored.
Now what we can do is to log out the commit history.

```sh title="Terminal"
git log
# The result:                      
commit 83d77407b76c9f86ac4e691a47618641c9d527ba (HEAD -> master, origin/master, origin/HEAD)
Author: Morla Porla <morla@overthewire.org>
Date:   Wed Jun 24 14:59:06 2026 +0000

    fix info leak

commit 13bbc4d2414ffe0439b8ee4f5e5c2949780cf4b3
Author: Morla Porla <morla@overthewire.org>
Date:   Wed Jun 24 14:59:06 2026 +0000

    add missing data

commit f3334fbccbf9446a6af88a3c71021c2f57163322
Author: Ben Dover <noone@overthewire.org>
Date:   Wed Jun 24 14:59:06 2026 +0000

    initial commit of README.md
```

So the latest commit is to fix the info leak, it is possible that before this commit the password might still be revealed in order to get leaked.

We will use `git checkout` to that commit.
```sh title="Terminal"
git checkout 13bbc4d2414ffe0439b8ee4f5e5c2949780cf4b3 

cat README.md
```

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `git log` is used to view the commit history of a repository, displaying author details, timestamps, commit messages, and commit hashes.
- `git checkout` is used to switch between branches, restore files to a previous state, or navigate back in history to inspect older commits.

```sh title="Terminal"
# P.S. if you want to go back to the previous commit which is the origin/HEAD without having to check out commit hash, you can use:

git reflog
# The result:                                     
13bbc4d (HEAD) HEAD@{0}: checkout: moving from master to 13bbc4d2414ffe0439b8ee4f5e5c2949780cf4b3
83d7740 (origin/master, origin/HEAD, master) HEAD@{1}: reset: moving to HEAD@{5}
13bbc4d (HEAD) HEAD@{2}: reset: moving to HEAD@{3}
13bbc4d (HEAD) HEAD@{3}: reset: moving to HEAD@{2}
13bbc4d (HEAD) HEAD@{4}: reset: moving to HEAD@{1}
f3334fb HEAD@{5}: reset: moving to HEAD~
13bbc4d (HEAD) HEAD@{6}: reset: moving to HEAD~
83d7740 (origin/master, origin/HEAD, master) HEAD@{7}: clone: from ssh://bandit.labs.overthewire.org:2220/home/bandit28-git/repo


# And you can type this command, to reset to origin/master:
git reset --hard HEAD@{7}
```

:::
