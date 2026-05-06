---
layout: post
publishDate: Oct 9, 2022
title: Proxy obyekti
tags: js
isListed: true
---

`Proxy(object, handler)` bizga obyektlar uchun proksi obyekt yaratish imkonini beradi. Bu bilan biz obyektlardagi fundamental operatsiyalarni "intercept/override" qilishimiz mumkin. Ya'ni ularni o'zimizga kerakli ravishda ishlaydigan qila olamiz.

Masalan, eng sodda misol, obyektda biz bergan maydon bo'lmasa "undefined" o'rniga defolt qiymat qaytarish:

```js
const dict = {
  defolt: 'default',
  maydon: 'field',
};

const proxy = new Proxy(dict, {
  get(target, key, receiver) {
    // agar `key` mavjud bo'lsa,
    // mos qiymat qaytaramiz
    if (target[key]) return target[key];

    // agar `key` yo'q bo'sa,
    // `key`ning o'zini
    return key;
  },
});

console.log(proxy.maydon);
// "field"
console.log(proxy.nimadir);
// "nimadir"
```

Yoki setterga validatsiya qo'shishimiz mumkin:

```js
const proxy = new Proxy(dict, {
  set(target, key, val) {
    if (typeof val !== 'string')
      throw new TypeError('Faqat string qiymatlar olinadi!');

    target[key] = val;
    return true;
  },
});
```

Aytgancha, proksi obyekt birinchi obyektimizni to'liq "overwrite" qilishi kerak. Chunki ularning ikkovi ham kodimizda bo'lishi chalkash holatlarni yuzaga keltiradi. Shuning uchun har doim bunday qiling:

```js
let obj = {...};

obj = new Proxy(obj, handler);
```
