---
layout: post
publishDate: Apr 16, 2023
title: JS Hoisting
tags: js, puzzle
isListed: true
---

Yaqinda menga intervyuda tushgan savollardan biri:

```js
var a = 5;

void function () {
  console.log(a);
  var a = 10;
}();

console.log(a);
```

Xo'sh, kod natijasi qanday bo'ladi?

JS Hoisting haqida yaxshi tushunchaga ega bo'lganlar uchun bu misol oddiy.

**Javob:**

```
> undefined
> 5
```

"Nega funksiya ichidagi `console.log` global `a` ning qiymatini olmadi?" deyotgan bo'lsangiz, davom eting.

## Hoisting

Hoisting haqida qisqacha gaplashsak, hoisting bu e'lon qilingan funksiyalar va "var" o'zgaruvchilarining interpretator tomonidan o'z scope'lari tepasiga ko'chirilishidir. Shuning uchun ham biz funksiyalarni ular e'lon qilingan qatorlardan tepada chaqira olamiz.

Bu yerda "declaration" va "definition" farqini tushunish ham muhim. Declaration — e'lon qilish, definition — aniqlanish (aniqlash?/ta'riflash?).

JS'da "declaration" va "definition" tushunchasi faqat o'zgaruvchilar uchun mavjud. Tepadagi misolda `var a = 5` ham "declaration", ham "definition". Agar ikkovini ajratsak:

```js
var a; // declaration
a = 5; // definition
```

Hoisting "declaration"larni tepaga chiqaradi! Ya'ni ular hech qanday qiymatsiz e'lon qilinadi.

Lekin, JavaScript'da funksiyalar uchun alohida "declaration" imkoniyati yo'q. Funksiyalar shunchaki "declare", e'lon qilinadi.

Masalan, C++ da bu imkoniyat bor va funksiyalar chaqirilishidan oldin hech bo'lmasa "declare" qilinishi kerak, "definition" esa kodning oxirida kelsa ham bo'laveradi.

*Hoisting haqida kuni bo'yi gaplashilsa bo'ladi, juda katta mavzu. Qo'ldan kelgancha qisqa tushuntirishga harakat qildim.*
