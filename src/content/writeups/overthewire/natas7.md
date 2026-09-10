---
title: "Level 8 -> Level 9"
description: "Reverse a PHP encoding function to recover the secret and pass the form check."
date: 2026-09-10
platform: OverTheWire
game: Natas
level: "8 -> 9"
difficulty: Easy
category: Web
tags:
  - Web
  - PHP
  - Encoding
  - Source Code
  - Beginner
---

## Challenge

Log in to Natas level 8 and locate the password for the next level.

```txt title="Credentials"
Username: natas8
URL:      http://natas8.natas.labs.overthewire.org
```

## Enumeration

If we open the `View sourcecode` link, we can inspect the PHP logic used by the page:

```php title="Source code"
<?

$encodedSecret = "3d3d516343746d4d6d6c315669563362";

function encodeSecret($secret) {
    return bin2hex(strrev(base64_encode($secret)));
}

if(array_key_exists("submit", $_POST)) {
    if(encodeSecret($_POST['secret']) == $encodedSecret) {
    print "Access granted. The password for natas9 is <censored>";
    } else {
    print "Wrong secret";
    }
}
?>
```

The application takes our submitted `secret`, passes it into `encodeSecret()`, and compares the result with the hardcoded `$encodedSecret`.

The encoding function applies these operations:

```txt title="Encoding order"
base64_encode -> strrev -> bin2hex
```

To recover the original secret, we need to reverse those operations in the opposite order:

```txt title="Decoding order"
hex2bin -> strrev -> base64_decode
```

## Exploitation

I used PHP CLI to decode the value:

```php title="PHP CLI"
$encodedSecret = "3d3d516343746d4d6d6c315669563362";
echo base64_decode(strrev(hex2bin($encodedSecret)));
```

The output is the secret:

```txt title="Decoded secret"
[Secret]
```

Submit that value in the form.

The page grants access:

```txt title="Successful response"
Access granted. The password for natas9 is [NextLevelPassword]
```

The real password is intentionally omitted from this public writeup. Run the steps above to retrieve it yourself.

## Lessons learned

:::tip[Key takeaways]

- If source code reveals a custom encoding function, read the transformation order carefully.
- To decode a value, reverse each operation in the opposite order.
- Encoding is not encryption; values transformed with reversible functions can be recovered.

:::
