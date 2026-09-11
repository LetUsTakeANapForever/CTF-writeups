---
title: "Level 6 -> Level 7"
description: "Exploit a file include parameter to read the next level password from the server filesystem."
date: 2026-09-10
platform: OverTheWire
game: Natas
level: "6 -> 7"
difficulty: Easy
category: Web
tags:
  - Web
  - PHP
  - Local File Inclusion
  - DevTools
  - Beginner
---

## Challenge

Log in to Natas level 7 and locate the password for the next level.

```txt title="Credentials"
Username: natas7
URL:      http://natas7.natas.labs.overthewire.org
```

## Enumeration

The page has two links: `Home` and `About`.

Clicking either link changes the URL:

```txt title="Page links"
http://natas7.natas.labs.overthewire.org/index.php?page=home
http://natas7.natas.labs.overthewire.org/index.php?page=about
```

The important detail is the `page` query parameter. The application appears to load a page based on whatever value is passed into `page`.

Next, open DevTools and inspect the page HTML. There is a comment with a hint:

```html title="HTML hint"
<!-- hint: password for webuser natas8 is in /etc/natas_webpass/natas8 -->
```

That tells us the password file path directly.

## Exploitation

Since the application uses the `page` parameter to decide what file to display, try replacing `home` or `about` with the password file path from the hint:

```txt title="LFI payload"
http://natas7.natas.labs.overthewire.org/index.php?page=/etc/natas_webpass/natas8
```

The response includes the password for the next level:

```txt title="Successful response"
[NextLevelPassword]
```

The real password is intentionally omitted from this public writeup. Run the steps above to retrieve it yourself.

## Why this works

This is a local file inclusion issue. The server reads a file path from user input and includes or displays that file without safely restricting it to an allowed list of pages.

The intended links use harmless values:

```txt title="Expected values"
page=home
page=about
```

But because the parameter is not properly validated, we can provide an absolute filesystem path instead:

```txt title="Injected file path"
page=/etc/natas_webpass/natas8
```

The server then reads that local file and returns its contents in the response.

## Lessons learned

:::tip[Key takeaways]

- Query parameters can control server-side file loading if the application is built unsafely.
- HTML comments can reveal useful hints, paths, and implementation details.
- File include features should use strict allowlists instead of trusting user-provided paths.

:::
