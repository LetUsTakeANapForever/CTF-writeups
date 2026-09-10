---
title: "Level 5 -> Level 6"
description: "Find an included PHP secret file and use its value to pass the form check."
date: 2026-09-10
platform: OverTheWire
game: Natas
level: "5 -> 6"
difficulty: Easy
category: Web
tags:
  - Web
  - PHP
  - Source Code
  - Beginner
---

## Challenge

Log in to Natas level 6 and locate the password for the next level.

```txt title="Credentials"
Username: natas6
URL:      http://natas6.natas.labs.overthewire.org
```

## Enumeration

The page shows an input box asking for a secret. If the submitted secret is incorrect, it displays:

```txt title="Page message"
Wrong secret
```

There is also a link called `View sourcecode`, so I opened it to inspect the application logic.

```php title="Source code"
<?

include "includes/secret.inc";

    if(array_key_exists("submit", $_POST)) {
        if($secret == $_POST['secret']) {
        print "Access granted. The password for natas7 is <censored>";
    } else {
        print "Wrong secret";
    }
    }
?>
```

The code checks whether the submitted POST value named `secret` matches the `$secret` variable.

The interesting line is this one:

```php title="Included file"
include "includes/secret.inc";
```

This means the secret value is being loaded from another file on the web server.

## Exploitation

Since the included file is inside the web root, we can request it directly:

```txt title="Secret file URL"
http://natas6.natas.labs.overthewire.org/includes/secret.inc
```

The response reveals the value of `$secret`:

```php title="Secret file"
<?
$secret = [SecretValue];
?>
```

Now submit that secret value in the form.

The page grants access:

```txt title="Successful response"
Access granted. The password for natas7 is [NextLevelPassword]
```

The real password is intentionally omitted from this public writeup. Run the steps above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- PHP `include` files can expose sensitive data if they are placed somewhere directly accessible from the browser.
- Source-code disclosure often reveals hidden files, parameters, and server-side logic.
- Secrets should not be stored in web-accessible paths.

:::
