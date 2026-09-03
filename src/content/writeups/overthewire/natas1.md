---
title: "Level 1 → Level 2"
description: "Bypass a right-click block to read the page's HTML source."
date: 2026-09-03
platform: OverTheWire
game: Natas
level: "1 → 2"
difficulty: Easy
category: Web
tags:
  - Web
  - HTML
  - Beginner
---

## Challenge

Log in to Natas level 1 and locate the password for the next level.

```txt title="Credentials"
Username: natas1
URL:      http://natas1.natas.labs.overthewire.org
```

Once logged in, the page reads:

```txt title="Page content"
You can find the password for the next level on this page, but rightclicking has been blocked!
```

## Enumeration

Right-clicking is disabled, so the usual "Inspect" context-menu option isn't available. That doesn't actually stop us from viewing the source, though — right-click is just one way to open developer tools.

## Exploitation

Press `F12` instead, which opens the browser's developer tools directly without needing the context menu. Switch to the **Elements** tab to view the page's raw HTML.

Digging through the markup reveals a comment left in the source, same as before:

```html title="HTML source"
You can find the password for the
next level on this page, but rightclicking has been blocked!
<!--The password for natas2 is [Password for the next level] -->
```

The file contains the password needed to access the next Natas level.

The real password is intentionally omitted from this public example. Run the steps above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- Disabling right-click is a client-side trick, not a security control — the underlying HTML is still fully accessible.
- `F12` opens developer tools directly, bypassing any restrictions placed on the right-click context menu.

:::
