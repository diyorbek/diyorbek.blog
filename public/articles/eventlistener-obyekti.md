---
layout: post
publishDate: Sep 11, 2022
title: EventListener obyekti
tags: js
isListed: true
---

Yaqinda `addEventListener` metodi callback sifatida faqat funksiya emas obyekt ham olishini bilib qoldim. Agar MDN Web Docs 'dan qarasangiz ham listenerga shunday tarif berilgan: 

_"The object that receives a notification" (_[_link_](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#:~:text=The%20object%20that%20receives%20a%20notification)_)._

Ya'ni bildirishdi qabul qiluvchi obyekt! Keyin o'ylab qoldim, agar biz listener sifatida obyekt ishlata olsak, u bilan bog'liq bo'gan kodimizni o'sha obyekt bilan inkapsulyatsiya qilishimiz mumkin bo'ladi. Masalan:

```js
const listener = {
 state: {
  message: "Hello",
  count: 0,
 },
 handleEvent(event) {
  this.state.count++;

  console.log(event.type, this.state.message, this.state.count);
 },
};

button.addEventListener("click", listener);
```

Albatta bu usul qanchalik amaliyotga to'g'ri kelishi haqida shubham bor. Shuning uchun keyingi safar event'lar bilan ishlaganimda shu usuldan foydalanib ko'raman. Chunki tajriba qilish o'rganishning eng samarali yo'li.