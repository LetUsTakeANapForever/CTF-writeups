---
title: "Level 12 → Level 13"
description: "Learn to unzip files."
date: 2026-08-14
platform: OverTheWire
game: Bandit
level: "12 → 13"
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
ssh -p 2220 bandit12@bandit.labs.overthewire.org 
```

## Exploitation

After logging in:

1.  Generate a random string.
```sh title="Terminal"
mktemp -d 
# The result:
/tmp/tmp.YVIgEpcTfg
```
2. Now copy data.txt to the directory that has just been created.
```sh title="Terminal"
cp data.txt /tmp/tmp.YVIgEpcTfg/copied_data.txt
```
3. We're going to need to rename the `copied_data.txt` file to a simple name like `data` without the file extension.
```sh title="Terminal"
cd /tmp/tmp.YVIgEpcTfg
mv copied_data.txt data
```
4. Use `xxd` command to convert the data into its binary equivalent.
```sh title="Terminal"
xxd -r data > binary
```
5. Then use `file` command to list file details out.
```sh title="Terminal"
file binary

# The result:
binary: gzip compressed data, was "data2.bin", last modified: Thu May  7 18:14:30 2020, max compression, from Unix
```

6. Then we add file extension to the binary file as `.gz` (Gzip compressed file).
```sh title="Terminal"
mv binary binary.gz
```

7. Next, use `gunzip` command to decompress the data.
```sh title="Terminal"
gunzip binary.gz or gzip -d binary.gz 
# The result:
binary


file binary
# The result: as you can see, the file is now in bzip2 type.
binary: bzip2 compressed data, block size = 900k
```

8. Now, to decompress an bzip2 file we will use the `bunzip2` command.
```sh title="Terminal"
bunzip2 binary


ls
binary.out


file binary.out
# The result:
binary.out: gzip compressed data, was "data4.bin", last modified: Wed Jun 24 14:58:46 2026, max compression, from Unix, original size modulo 2^32 20480

```
- Note: It's repetitive, so let me just simply explain the flow real quick.

- ___Explaination: So it's gzip again and we need to decompress it using `mv binary.out binary.gz` → then we `gunzip binary.gz` → to get the file `binary`___

- Once we run this command below to check file type:
```sh title="Terminal"
file binary

# The result: now it's become a .tar archive file
POSIX tar archive (GNU)_
```

9. To extract files from an archive to the current working directory, we use `tar` command.
- The flag `-x` stands for `Extract`.
- The flag `-f` stands fot `File`, which specifies that the very next argument is the name of the archive file you want to operate on.
```sh title="Terminal"
tar -xf binary

ls
# The result: the data5.bin is what we got
binary  data  data5.bin

# We check the data5.bin type and we know that it's still a tar achieve.
file data5.bin
data5.bin: POSIX tar archive (GNU)

# We extract afile from it again.
tar -xf data5.bin

# Now we got data6.bin.
ls
binary  data  data5.bin  data6.bin

# Roses are red, but what's next to do is we check it over again.
file data6.bin
data6.bin: bzip2 compressed data, block size = 900k
```

10. As you can clearly see, it's finally a bzip2 file. Now we use `bunzip2` to decompress it.
```sh title="Terminal"
bunzip2 data6.bin

# Just checking.
ls
binary  data  data5.bin  data6.bin.out

# And checking.
file data6.bin.out
data6.bin.out: POSIX tar archive (GNU)

# It's a tar archive again, so now we know what to do——extract from it!
tar -xf data6.bin.out
→ data8.bin

# Now we check. So, it's gzip file again. 
file data8.bin
data8.bin: gzip compressed data, was "data9.bin", last modified: Wed Jun 24 14:58:46 2026, max compression, from Unix, original size modulo 2^32 49
```

- ___If it's gzip file again, we repeat the same `mv` it  → `gunzip` it → and then we check it.___


```sh title="Terminal"
# Finally, it's a text file. Now we can read it.
file data 8
data8: ASCII text

cat data8
```

So, the file `data8` contains the password needed to access the next Bandit level.

The real password is intentionally omitted from this public example. Run the commands above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- I think I explained a lot and enough already. So the key takeaway for this level may be just to keep peeling an onion until you can see its core. Enjoy! 

:::
