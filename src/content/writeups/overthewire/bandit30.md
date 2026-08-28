---
title: "Level 30 -> Level 31"
description: "Learn how to use git tag."
date: 2026-08-28
platform: OverTheWire
game: Bandit
level: "30 -> 31"
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
git clone ssh://bandit30-git@bandit.labs.overthewire.org:2220/home/bandit30-git/repo
```

## Exploitation

After cloning the repo:
```sh title="Terminal"
cd repo
                                                                                                                                   
ls
README.md


cat README.md   
just an epmty file... muahaha
```
Uh, now, not only there's no password but this README file really does not give us a thing.

Let's see if we can gain some info from somewhere else.

```sh title="Terminal"
git branch -a
# The result:
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```

Well, this doesn't provide any more info.


Now, I try git tag.
```sh title="Terminal"
git tag
# The result:
secret
```

There's a tag called "secret". Let's try to take a look at its description.
```sh title="Terminal"
git show secret
```

The tag description contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `git tag` is used to list out all tag names.
- `git show <tag-name>` is used to show tag description.

:::
