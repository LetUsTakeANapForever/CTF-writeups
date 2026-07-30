---
title: "Level 5 → Level 6"
description: "Learn about find and useful flags"
date: 2026-07-30
platform: OverTheWire
game: Bandit
level: "5 → 6"
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
ssh -p 2220 bandit5@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

Find the file with the following properties,
human-readable
1033 bytes in size
not executable

```sh title="Terminal"
find . -type f -size 1033c -not -executable -exec file {} + | grep ASCII
```

Explanation:
- . : Search the current working directory and all subdirectories inside it recursively
- type f : The flag `f` looks for files only (Exclude Directories)
- size 1033c : The flag `size` looks for files that are exactly 1033 bytes in size (`c` stands for "characters" which equals bytes in this context)
- -not -executable : The flag `not` following by `executable` is used to find only non executable files
- -exec file {} + : This tells the terminal: "Take that list of paths, look inside each file, and tell me what kind of data it holds."
- | : A pipe that takes the raw output from the command on the left and passes it directly as the input to the command on the right
- grep ASCII : grep stands for Global Regular Expression Print, it is used to filter the output of the file command to show only lines containing the word "ASCII"

The file contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- `find` is a command to search for files in a directory hierarchy based on attributes like size, type, and permissions.
- `-type f` discards directories and links to isolate true files.
- `c` suffix explicitly denotes bytes when filtering by size.
- `-exec` automates immediate actions on discovered files without manual copy-pasting.
- `file` peeks inside a file's header to identify its true format regardless of the file extension.
- `grep` scans text line-by-line to isolate specific keywords from a stream of data.

:::
