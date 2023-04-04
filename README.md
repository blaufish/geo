# Geolocation Playground
===

A small test of geolaction APIs and a bit of map hacking.

Very old alpha quality playground just for fun

## Deprecated for now due to vulernable jquery

```
GHSA ID: GHSA-gxr4-xjj5-5px2
CVE ID: CVE-2020-11022
```

[GHSA-gxr4-xjj5-5px2](https://github.com/advisories/GHSA-gxr4-xjj5-5px2)

> Impact
>
> Passing HTML from untrusted sources - even after sanitizing it -
> to one of jQuery's DOM manipulation methods (i.e. `.html()`,
> `.append()`, and others) may execute untrusted code.
>
> Patches
>
> This problem is patched in jQuery 3.5.0.
