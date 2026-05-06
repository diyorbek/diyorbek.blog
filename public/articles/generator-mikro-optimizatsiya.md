---
layout: post
publishDate: Nov 24, 2022
title: Generator funksiya bilan erishilgan mikro-optimizatsiya
tags: js, react, performance
isListed: true
---

O'tgan kuni ishlayotgan proyektimining notifikatsiyalarni render qiluvchi qismiga ko'zim tushib qoldi. Yaxshilab e'tibor bersam oddiy narsani qilish uchun 60 qator kod va ortiqcha logika ishlatilgandek tuyuldi menga.

Demak, vaziyat bunday: veb-sahifa ochilganda serverdan kelgan notifikatsiyalarni birma-bir ko'rsatish kerak. Ya'ni bir paytda bitta notifikatsiya ko'rsatamiz, u yopilganda esa keyingisini. Demonstratsiya uchun kichik prototip:

![Generator funksiya bilan erishilgan mikro-optimizatsiya](/public/images/generator-mikro-optimizatsiya-1.gif)

Yozilgan kod esa bunday edi:

1. Serverdan notifikatsiyalarni olamiz va eng birinchisini render qilamiz.
2. Notifikatsiya yopilganda uni yopilganlar ro'yhatiga kiritamiz.
3. Keyin for-loop orqali yopilganlar ro'yhatida bo'lmagan eng birinchi notifikatsiyani render qilamiz.
4. 2-punktga qaytamiz.

Kodning yuqoridagi prototip na'munasida soddalashtrilgan varianti:

```jsx
<div id="notificationBox">
  Notification 
  <span id="content"></span>
  <button 
    id="closeBtn" 
    onclick="showNotification()"
  >Close</button>
</div>
```

Soddalashtirish uchun notifikatsiyalar hard-code qilingan:

```js
const closed = [6]; // bu aslida localStorage
const serverNotifications = [1, 2, 3, 4, 5, 6];

function getNextNotification() { 
  for (const notification of serverNotifications)
    if (!closed.includes(notification))
      return notification;
}

function showNotification() {
  const nextNotification = getNextNotification();

  if (nextNotification) {
    content.innerText = nextNotification;
    closed.push(nextNotification);
  } else {
    notificationBox.remove();
  }
}

// birinchi notifikatsiya renderi uchun
showNotification();
```

Bu yerda menga yoqmagan narsalar:

**getNextNotification:** Keyingi notifikatsiyani ko'rsatish uchun biz yana bir marta notifikatsiyalar ustidan yurib chiqishimiz kerak. Ustiga ustak o'sha har bir notifikatsiyani yopilgan notifikatsiyalarda yo'qligi uchun ham tekshirishimiz kerak. Har safar 2 qavatli for-loop ishlaydi!

**Re-render: **Dastur React'da yozilgan. Dastur konteksti bo'yicha bu yerda har safar URL-path o'zgarganda notifikatsiya komponenti re-render qilinadi. Bu esa notifikatsiyalar ustida har render'da for-loop ishlaydi degani. Xattoki hammasi yopilgan bo'lsa ham o'sha yopilganligini tekshirish uchun bu operatsiya bajariladi. Qisqasi ortiqcha ish.

### Xo'sh, bu muammolarni qanday bartaraf qilamiz?

Ideal holatda, render qilinish kerak bo'lgan notifikatsiyalarni **eng boshida, bir marta filterlab olish kerak** bo'lardi. Bu albatta muammo emas.

```js
const notifications = serverNotifications
  .filter((notification) => 
    !closed.includes(notification));
```

Lekin baribir har safar notifikatsiyani yopganimizda undan keyingi turganini ko'rsatishimiz kerak. Nima qilamiz? Yana boshqa "filterlab yopilganlar" ro'yhatini qo'shamizmi? Ey-yo'q, oxirgi yopilganini indeksini saqlab borsakchi? Yo'q, yo'q, yo'q, yana ortiqcha logika.

Qaniydi shunday bir funksiya bo'lsa va u uni har safar chaqirganimizda notifikatsiyalarni birma-bir, ketma-ket `return` qilsa.

Iya, axir bu generator funksiyalarning ayni xislati-ku! Ular chaqirilganda ma'lum qiymatlar ketma-ketligini birma-bir `yield` qiladi, ya'ni chiqarib beradi. Uning o'zida "internal state", ya'ni ichki holat bo'lib, chaqirilganda o'zining ma'lum bir qismida to'xtab, keyingi chaqirilishida o'sha joydan davom etib keta oladi.

Biz ham notifikatsiyalarimini generator funksiyani chaqirish orqali olsak, u bizga har safar navbatdagi notifikatsiyani beradi.

```js
function* getNextNofication() {
  for (const notification of notifications)
    yield notification;
}
```

*Generator funksiya yaratish uchun shunchaki *`function`* dan keyin asterisk(*) belgisini qo'ysak bo'di. Qiymat qaytarish uchun esa *`return`* emas *`yield`* ishlatiladi.*

Endi `getNextNotification` funksiyasini chaqirganimizda u bizga Generator qaytaradi. Unda esa qiymatni saqlovchi "value", tugatilganlikni ko'rsatuvchi "done" field'lari mavjud. Funksiyani kelgan joyidan davom ettish uchun esa "next()" metodi bor.

Endi yangi funksiya bo'yicha `showNotification` funksiyasini ham o'zgartiramiz:

```js
// generatorni initsializatsiya qilamiz
const notificationSequence = getNextNofication();

function showNotification() {
  const { done, value } = notificationSequence.next();

  if (!done) {
    content.innerText = value;
    closed.push(value);
  } else {
    notificationBox.remove();
  }
}
```

Ana endi, har safar keyingi notifikatsiyani olish uchun for-loop qilib o'timaymiz. Kodimiz ham ancha ifodali va o'qishli bo'ldi-qoldi.

Bu prototip uchun kodni yanayam soddalashtirib tashlash mumkin. Masalan, getNextNotification va showNotification'larni birlashtirish orqali:

```js
function* showNotification() {
  for (const notification of notifications) {
    content.innerText = notification;
    closed.push(notification);
    yield;
  }

  notificationBox.remove();
}

const notificationSequence = showNotification();
notificationSequence.next();
```

Ko'rib turganingizdek `yield` ni qiymatsiz ishlatish ham mumkin, xuddi `return` kabi.

### Xulosa

Shunday qilib, o'zi aslida mayda bo'lgan "muammo"ni JavaScript'ning o'z imkoniyatlaridan foydalanib hal qildik. Shuni esda tutishingizni xohlagan bo'lardim: har doim yozgan kodingizga qarab, buni yaxshilash mumkinmi degan savolni o'zingizga berib ko'ring. Agar javob "ha" bo'lsa, uni qilish arzigulikmi degan savolni bering. Men ham shu savolni o'zimga berdim va "hozir arzimaydi" degan xulosaga keldim. Chunki muhim ishlar tuganda bunga vaqt ketkazgim kelmadi. Shuning uchun ham kodni refaktor qilganim yo'q.

Shunday dedim-u, qilmagan ishim haqida vaqt ayamay post yozibman-a! 😄
