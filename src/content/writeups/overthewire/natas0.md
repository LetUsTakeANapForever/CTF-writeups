---
title: "Level 0"
description: "Find the password hidden in the page's HTML source."
date: 2026-09-03
platform: OverTheWire
game: Natas
level: "0"
difficulty: Easy
category: Web
tags:
  - Web
  - HTML
  - Beginner
---

## Challenge

Log in to the first Natas level and locate the password for the next level.

## Enumeration

The challenge starts with credentials for `natas0`. Log in at the given URL using HTTP basic auth:

```txt title="Credentials"
Username: natas0
Password: natas0
URL:      http://natas0.natas.labs.overthewire.org
```

Once logged in, the page simply says:

```txt title="Page content"
You can find the password for the next level on this page.
```

## Exploitation

Since the password is supposed to be "on this page" but isn't visible anywhere in the rendered content, it's likely hidden in the page's source code rather than the text itself.

Press `F12` (or right-click → **Inspect**) to open the browser's developer tools and switch to the **Elements** tab. This shows the raw HTML that makes up the page, including anything hidden from view — like an HTML comment.

Sure enough, digging through the markup reveals a comment left in the source:

```html title="HTML source"
You can find the password for the next level on this page.
<!--The password for natas1 is [Password for the next level] -->
```

The file contains the password needed to access the next Natas level.

The real password is intentionally omitted from this public example. Run the steps above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- Never trust what's rendered on screen alone — always check a page's HTML source, since developers sometimes leave sensitive information in comments.
- Browser developer tools (`F12` or right-click → Inspect) let you view a page's raw HTML via the **Elements** tab.

:::
