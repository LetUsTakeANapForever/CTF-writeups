---
title: "Level 5 -> Level 6"
description: "Bypass a weak login check by changing a client-side cookie value."
date: 2026-09-09
platform: OverTheWire
game: Natas
level: "5 -> 6"
difficulty: Easy
category: Web
tags:
  - Web
  - Cookies
  - DevTools
  - Beginner
---

## Challenge

Log in to Natas level 5 and locate the password for the next level.

```txt title="Credentials"
Username: natas5
URL:      http://natas5.natas.labs.overthewire.org
```

## Enumeration

After logging in, the page displays this message:

```txt title="Page message"
Access disallowed. You are not logged in
```

At first, this looks misleading. We are already authenticated with HTTP Basic Auth, but the application still says we are not logged in. That means the page is probably using a separate application-level check.

My first instinct was to open DevTools and inspect the page state.

In Chrome DevTools, go to:

```txt title="DevTools path"
Application -> Cookies -> http://natas5.natas.labs.overthewire.org/
```

There is a cookie named `loggedin`, and its value is set to `0`.

## Exploitation

Change the cookie value from `0` to `1`:

```txt title="Cookie change"
loggedin=0
loggedin=1
```

What we are doing is changing the client-side value that the server checks to decide whether we are logged in. Since the application trusts this cookie directly, setting it to `1` bypasses the check.

Refresh the page after changing the cookie.

The page now grants access:

```txt title="Successful response"
Access granted. The password for natas6 is [NextLevelPassword]
```

The real password is intentionally omitted from this public writeup. Run the steps above to retrieve it yourself.

## What are cookies?

Cookies are small pieces of data that a website stores in your browser. After a cookie is set, the browser automatically sends it back to the same website on future requests.

Web applications often use cookies to remember state, such as session IDs, preferences, tracking identifiers, or whether a user has completed part of a flow. For example, a real login system usually stores a random session token in a cookie, then checks that token on the server to identify the logged-in user.

In this level, the cookie is much weaker. Instead of storing a secure session token, the application uses a simple value:

```txt title="Cookie"
loggedin=0
```

Because cookies live in the browser, the user can inspect and edit them with DevTools or an intercepting proxy. Changing the value to `loggedin=1` works here because the server trusts the cookie value directly.

That is the important security problem: cookies can store state, but sensitive decisions still need to be verified server-side.

###### Suggested improvements

The server should not trust a cookie like `loggedin=1` as the source of truth. A better design is to send the browser a random, unpredictable session token after login:

```txt title="Cookie"
session_id=random_unpredictable_value
```

Then, on every protected request, the server should verify that token against server-side session storage:

```txt title="Server-side verification flow"
1. Read the session_id cookie from the request.
2. Look up that session_id in the server's session store.
3. Confirm the session exists, has not expired, and belongs to a valid user.
4. Grant access only if the server-side session is valid.
```

With this design, changing a cookie value in DevTools does not create a valid login session. The browser only holds an identifier, while the trusted login state stays on the server.

For extra protection, the cookie should also be set with security flags such as `HttpOnly`, `Secure`, and `SameSite`.

## Lessons learned

:::tip[Key takeaways]

- Cookies are client-controlled and can be edited in the browser.
- A cookie such as `loggedin=1` should not be trusted as proof of authorization by itself.
- Browser DevTools are useful for inspecting storage, cookies, and other client-side state.

:::
