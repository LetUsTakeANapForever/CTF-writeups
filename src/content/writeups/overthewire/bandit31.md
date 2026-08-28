---
title: "Level 31 -> Level 32"
description: "Learn how to push a file onto a remote branch."
date: 2026-08-28
platform: OverTheWire
game: Bandit
level: "31 -> 32"
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
git clone ssh://bandit31-git@bandit.labs.overthewire.org:2220/home/bandit31-git/repo
```

## Exploitation

After cloning the repo:
```sh title="Terminal"

cd repo

ls
README.md

cat README.md 
This time your task is to push a file to the remote repository.

Details:
    File name: key.txt
    Content: 'May I come in?'
    Branch: master
```
Let's do it, we need to push `key.txt` which contain the content above on the master branch.

Firstly, echo content to create the file.

```sh title="Terminal"
echo "May I come in?" > key.txt

# Let's check if it's created successfully.
ls
# The result:
key.txt README.md
```

Ok it is. Then we add it to stage it and after that we'll commit it.
```sh title="Terminal"
git add key.txt
# The result:
The following paths are ignored by one of your .gitignore files:
key.txt
hint: Use -f if you really want to add them.
hint: Disable this message with "git config set advice.addIgnoredFile false"
```

Looks like it's listed in the .gitignore file. So we're gonna force-add it instead.
```sh title="Terminal"
git add -f key.txt
```

We can check that status using `git status`.
```sh title="Terminal"
git status
# The result:                    
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   key.txt
```

Alright, now we can commit.
```sh title="Terminal"
git commit -m 'bandit31 commit' 
# The result:
[master 2d8527a] bandit31 commit
 1 file changed, 1 insertion(+)
 create mode 100644 key.txt
```

Then we push it onto master branch.
```sh title="Terminal"
git push origin master
```

After you push, you'll be able to see the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.


## Lessons learned

:::tip[Key takeaways]

- `git status` shows the current state of your working directory and staging area (tracked/untracked files, pending changes).

- `git add` stages changes or new files, selecting them to be included in the next commit.

- `git commit` saves your staged changes locally with a descriptive message to track history.

- `git push` uploads your local commits to a remote repository (like GitHub) to share your code.

:::
