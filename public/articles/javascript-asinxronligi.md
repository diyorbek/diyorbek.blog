---
layout: post
publishDate: Oct 19, 2022
title: JavaScript'ning asinxronligi
tags: js, browser, async
isListed: true
---

[Bundan oldingi maqolada](/blog/javascript-sinxronligi) JS'ning sinxronligi va shuning uchun uzoq bajariladigan operatsiyalar asosiy thread'ni bloklab qo'yishini yozgandim. Bu postda esa, asosiy-thread'ni bloklamaydigan asinxron JavaScript haqida gaplashamiz.

JavaScript'dagi asinxron operatsiyalarni quyidagi ketma-ketlik bilan tariflash mumkin:

1. Ma'lum bir funksiyani chaqirish orqali bajarilishi uzoq vaqt oladigan operatsiyani boshlash.
2. Funksiya operatsiyani boshlagandan so'ng darhol "return" qilishi (ya'ni ishini tugatishi) va boshqa amallarni bajarishda davom etishi.
3. Qachonki o'sha operatsiya tugaganda notifikatsiya olish.

Asinxron operatsiyaga eng oddiy misol bu veb-sahifadagi event'lar bilan ishlash:

```js
button.addEventListener(
  'click',
  () => console.log('Tugma bosildi!')
);
```

Tepadagi misolda `addEventListener` metodini chaqirganimizda dasturimiz shu joyda to'xtab qolmaydi. Ya'ni, qachon "click" sodir bo'larkan demasdan undan keyingi keladigan ishlarni bajarishda davom etaveradi. Qachondir "click" sodir bo'lganidagina, biz registratsiya qilgan callback/handler funksiyamiz chaqiriladi.

```js
setTimeout(() => {
  console.log('Vaqt tugadi');
}, 1000);
```

`setTimeout` funksiyasi ham asinxron operatsiya bajaradi. Uni chaqirganimizda, orqa fonda taymer ishga tushadi va taymer vaqti tugab, ishini yakunlarkan, biz bergan callback chaqiriladi.

Umuman olganda, JavaScript'dagi barcha asinxron amallar event tushunchasi bilan bog'liq: qandaydir operatsiya orqa fonda bajariladi va u tugagach unga mos event sodir bo'lgani haqida notifikatsiya beriladi.

Shu joyda bir narsani yodda saqlang: asinxron operatsiyalar (event sodir bo'lishini, network request javobini yoki taymerni kutish) orqa fonda bajariladi, ularning callback/handler'lari esa asosiy thread'da ishga tushadi. Shuning uchun bu asinxron operatsiyalar asosiy thread'ni bloklamasa ham, ulardan keyin qilinadigan operatsiyalar (biz bergan handler'lar) uni bloklab qo'yishi mumkin.

*Davomi:* [JavaScript'da mikro vazifalar bajarilishi](/blog/event-listener-loglar-ketma-ketligi)
