---
layout: post
publishDate: Sep 10, 2022
title: JSON.stringify metodida shu xususiyat borligini bilasizmi?
tags: js
isListed: true
---

Obyektlarni `String`ga o'girib beruvchi bu metodni ko'pincha 1 ta parametr bilan ishlatamiz: 

```js
JSON.stringify(object)
```

Lekin metodda yana 2 ta (optional) parametr bor. To'liq korinishi: 

```js
JSON.stringify(
  object,
  ?replacer,
  ?space
)
```

1. `replacer` -- bu parametr funksiya yoki string'lar massivi bo'lishi mumkin. 

Agar massiv bersak, obyektning faqat massivdagi elementlarga mos keluvchi field/maydonlarigina olinadi. Masalan:

```js
> JSON.stringify({ a: 5, b: 3 }, ['b'])
> '{"b":3}'
```

Agar funksiya bo'lsa, u orqali biz field'larni filter qilishimiz mumkin:

```js
> JSON.stringify(
   { a: 5, b: 3 }, 
   (key, value) => key == 'a' ? 10 : value)
> '{"a":10,"b":3}'
```

2. `space` -- bu parametr orqali obyektimizni indentatsiya qilishimiz mumkin. Masalan space parametri 2 ga teng bo'lsa, natija quydagicha bo'ladi:

```js
> var obj = { name: "Tony", status: { rank : 1, type: "Avenger"}}
> console.log(JSON.stringify(obj, undefined, 2))
{
 "name": "Tony",
 "status": {
  "rank": 1,
  "type": "Avenger"
 }
}
```
