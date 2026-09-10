---
title: "Level 2 -> Level 3"
description: "Use robots.txt to find a hidden directory and recover the next password."
date: 2026-09-09
platform: OverTheWire
game: Natas
level: "2 -> 3"
difficulty: Easy
category: Web
tags:
  - Web
  - robots.txt
  - Directory Listing
  - Beginner
---

## Challenge

Log in to Natas level 3 and locate the password for the next level.

```txt title="Credentials"
Username: natas3
URL:      http://natas3.natas.labs.overthewire.org
```

## Enumeration

The page itself does not show anything useful:

```html title="HTML source"
There is nothing on this page
<!-- No more information leaks!! Not even Google will find it this time... -->
```

The comment mentions Google, which points toward search engines, crawling, indexing, and hidden pages. When a website gives that kind of hint, `robots.txt` is one of the first places worth checking.

Open the `robots.txt` file from the web root:

```txt title="URL"
http://natas3.natas.labs.overthewire.org/robots.txt
```

The file contains:

```txt title="robots.txt"
User-agent: *
Disallow: /s3cr3t/
```

This tells search engine crawlers not to visit the `/s3cr3t/` directory. It does not prevent a normal user from opening that directory directly.

## Exploitation

Open the disallowed directory:

```txt title="URL"
http://natas3.natas.labs.overthewire.org/s3cr3t/
```

Directory listing is enabled, and it shows a `users.txt` file.

Open the file:

```txt title="URL"
http://natas3.natas.labs.overthewire.org/s3cr3t/users.txt
```

The file contains the password for the next level:

```txt title="s3cr3t/users.txt"
natas4:[Password for the next level]
```

The real password is intentionally omitted from this public writeup. Run the steps above to retrieve it yourself.

## What is robots.txt?

In web administration, the `robots.txt` file is placed in the root directory of a website to instruct search engine crawlers which pages or folders they are allowed or forbidden to visit.

It is only a crawler instruction file. It is not an access control mechanism.

## Lessons learned

:::tip[Key takeaways]

- Check `robots.txt` when a challenge hints at search engines, indexing, or crawling.
- `Disallow` entries can reveal hidden directories.
- `robots.txt` should not be used to protect sensitive files.

:::
