---
layout: post
publishDate: May 8, 2024
title: Web Animations API va TransitionEvent
tags: js, css, animation
isListed: true
---

Shu paytgacha CSS animatsiyalarni JS orqali ham yozsa, boshqarsa bo'lishini bilmagan ekanman! CSS'dagi animatsiyalarni JS orqali boshqarish desa faqat ular bog'langan klasslarni elementga biriktirish/o'chirishni tushunardim.

Masalan, g'oyib bo'lish animatsiyasini solishtirsak bo'ladi:

**CSS:**

```css
#element {
  animation: fade 3s ease forwards;
}

@keyframes fade {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

**JS:**

```js
const element = document.getElementById('element');

const keyframes = [
  { opacity: 0 },
  { opacity: 1 }
];

const options = {
  duration: 3000,
  easing: 'ease',
  fill: 'forwards',
};

const animation = new Animation(new KeyframeEffect(element, keyframes, options));

animation.play();
animation.pause();
animation.finish();
animation.cancel();
```

## Qachon qaysi birini ishlatamiz?

Animatsiyalar uchun `requestAnimationFrame()` dan foydalanish ham mumkin. Faqat u CPU dan foydalanadi. CSS animatsiyalar esa GPU dan.

**Web Animations API:**

1. Bizga aynan CSS'dagi animatsiyalarni boshqarish imkonini KENGAYTIRADI.
2. Lekin baribir aslida siz CSS animatsiyalarni ishlatayotgan bo'lasiz.
3. Piksellarning hisob-kitobi "main thread"dan tashqarida bo'ladi.
4. UI komponentlar yaratish uchun juda mos.
5. Deklarativ.

**`requestAnimationFrame()`:**

1. Animatsiyani kadrma-kadr yaratish imkonini beradi.
2. Animatsiyani boshqarish to'laqonli JS kodga bog'liq bo'ladi.
3. Shu sabab, har bir kadr uchun piksellarni hisoblash "main thread"da amalga oshadi.
4. O'yinlar va o'ta murakkab, sinxron harakat qiluvchi elementlardan iborat animatsiyalar uchun mos.
5. Imperativ.

## TransitionEvent

Animatsiya bilan bir qatorda transition'lar haqida ham gaplashsak.

Buni qarangki, CSS orqali boshqariladigan transition'larni JS bilan kuzatish imkoni ham bor ekan. Buni ham yaqinda bilib qoldim.

Masalan, `:hover` qilganda kengayadigan elementni olaylik:

```css
#box {
  width: 50px;
  transition: 2s;
  transition-delay: .5s;

  &:hover {
    width: 100px;
  }
}
```

Aytaylik, kengayib kichrayyotgan paytda, element ichidagi tugmacha yoki linklar "disabled" bo'lishi kerak (JS bilan). Buni qanday qilardingiz?

Misol uchun men `mouseenter`, `mouseleave` event'laridan foydalanib, `setTimeout` orqali transition tugashini kuzatardim. Bunda albatta "timeout" vaqti `transition-duration` + `delay` ga teng bo'ladi. Tepadagi misolga ko'ra `2 + 0.5 = 2.5` sekund.

Bu usul ishlaydi. Lekin ikkovi bir-biriga bog'liq bo'lmagan parallel operatsiyalar hisoblanadi. Chunki sinxronizatsiyani "qo'lda" qilyapmiz.

TransitionEvent bilan esa buni qilish ancha sodda:

```js
const box = document.getElementById('#box');

box.addEventListener('transitionstart', () => button.disabled = true);
box.addEventListener('transitionend', () => button.disabled = false);
```

TransitionEvent o'zi 4 ta event'dan iborat:

1. `transitionrun` — transition'ni boshlovchi event sodir bo'lganda (hover, focus, click, v.h.k.) va "delay" taymeri boshlanganda.
2. `transitionstart` — aynan transition boshlanganda, ya'ni o'zgarish boshlanganda; "delay" taymeri tugaganidan keyin.
3. `transitionend` — transition tugaganda, ya'ni element o'zgarishi tugagach.
4. `transitioncancel` — transition paytida uni bekor qiladigan event sodir bo'lganda, ya'ni `transitionrun`'dan keyin, `transitionend`'dan oldin.
