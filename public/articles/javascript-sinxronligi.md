---
layout: post
publishDate: Oct 16, 2022
title: JavaScript'ning sinxronligi
tags: js, browser, event-loop
isListed: true
---

Oldin JavaScript nimaligiga javob beraylik. JavaScript bu — ECMAScript spetsifikatsiyasi bo'yicha ishlab chiqilgan til. Ya'ni ECMAScript bu — standart, JavaScript esa o'sha standartning implementatsiyasi. (Yuzaki tushuntirish bo'ldi, chunki bu mavzu uchun alohida post yozsa arziydi.)

JS kodimiz ishga tusharkan, interpretator kodimizni o'ngdan chapga, tepadan pastga qatorma-qator o'qishini bilamiz. Bizning yozgan har bitta amal ketma-ket, sinxron ravishda bajariladi. Masalan:

```js
function bigProcess() {
  let sum = 0;
  let i = 100000000;

  while (i--) sum += i;

  return sum;
}

console.log('start');
console.log(bigProcess());
console.log('end');
```

Natija:

```
> start
> 4999999950000000
> end
```

Ko'rinib turibdiki, `bigProcess()` tugamas ekan, undan keyingi kodimiz ishga tushmaydi. Ya'ni kodimiz bajarilishi shu joyda bloklanib qoladi. Eng yomon tarafi, bu kodni brauzerda ishlatarkanmiz, bu og'ir operatsiya oxiriga yetmaguncha butun sahifa qotib qoladi. Hatto CSS bilan yozilgan animatsiyalargacha muzlaydi.

Buning sababi, JS "single-threaded" (shunga o'zbekcha nom topish kerak) va veb-sahifadagi barcha operatsiyalar o'sha thread'da bajariladi. Bunga HTML'ni tahlil qilinishi ham, CSS stillarni biriktirilishi ham kiradi. Bularning barchasini esa hodisalar sikli ("event loop") ma'lum ketma-ketlikda bajarilishini ta'minlaydi. Hodisalar sikli "call stack"ni, "callback queue"ni, DOMdagi o'zgarishlarni va boshqalarni kuzatib turadi. Ularning birortasida qilinadigan ish paydo bo'lsa, o'sha ishlar asosiy "thread"da bajariladi.
