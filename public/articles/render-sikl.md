---
layout: post
publishDate: Sep 19, 2024
title: Render sikl
tags: browser, frontend, js
isListed: true
---

Brauzerda asosiy ikkita sikl mavjud:

**1. Event Loop** (Hodisalar Sikli): Bu JavaScript vazifalarini boshqarish uchun javob beradi. Jumladan:

1.  kodni bajarish
2.  hodisalarga javob berish
3.  asinxron operatsiyalarni (setTimeout, Promise yoki AJAX kabi jarayonlar) boshqaradi.

**2. Rendering (Paint) Cycle** (Sahifani Renderi Sikli): Hodisalar sikli vazifalarni qayta ishlagandan so'ng, brauzer rendering jarayonini amalga oshiradi:

1.  CSS stillarni hisoblash
2.  joylashuvni aniqlash
3.  kompozitsiyalash ya’ni piksellarni ekranga chizish.

Bu ikki sikl mustaqil ravishda ishlaydi, lekin yaqindan o'zaro ta'sir qiladi.

`requestAnimationFrame` - vazifalarni render sikli bilan sinxronlash uchun ishlatiladi.

`setTimeout` - hodisalar sikli bilan ishlaydi va unga yangi vazifa qo’shishda ishlatiladi.

![Render cycle](/public/images/render-cycle.jpg)