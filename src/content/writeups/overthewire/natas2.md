---
title: "Level 2 → Level 3"
description: "Discover a hidden directory listing behind a static file reference."
date: 2026-09-03
platform: OverTheWire
game: Natas
level: "2 → 3"
difficulty: Easy
category: Web
tags:
  - Web
  - Directory Listing
  - Beginner
---

## Challenge

Log in to Natas level 2 and locate the password for the next level.

```txt title="Credentials"
Username: natas2
URL:      http://natas2.natas.labs.overthewire.org
```

## Enumeration

Press `F12` and check the **Elements** tab. The page's HTML is:

```html title="HTML source"
There is nothing on this page
<img src="files/pixel.png">
```

No password is visible in the markup this time, but the `<img>` tag stands out — it references a static file sitting in a `files/` directory on the server.

Since it's just a static asset, we can browse to it directly:

```txt title="URL"
http://natas2.natas.labs.overthewire.org/files/pixel.png
```

It turns out to be a tiny, blank-looking pixel image — nothing useful even when zoomed in.

## Exploitation

If there's a `files/` directory serving assets, it's worth checking whether the directory itself is browsable. Navigating up one level to:

```txt title="URL"
http://natas2.natas.labs.overthewire.org/files/
```

reveals directory listing is enabled, showing two files: `pixel.png` (the one referenced in the page) and `users.txt`.

Opening `users.txt` reveals a list of usernames and passwords:

```txt title="files/users.txt"
natas3:[Password for the next level]
```

The file contains the password needed to access the next Natas level.

The real password is intentionally omitted from this public example. Run the steps above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- A referenced static asset can hint at an entire directory sitting on the server — always check whether the parent directory is browsable.
- Directory listing left enabled on a web server can expose files that were never meant to be linked to, such as credential dumps.

:::
