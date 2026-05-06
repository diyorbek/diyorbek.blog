---
layout: post
publishDate: May 17, 2024
title: React state'ni DOM boshqarganda
tags: react, js, debugging
isListed: true
---

O'zi [TransitionEvent haqida yozganimning](/blog/web-animations-va-transition) sababi, uni noto'g'ri usulda ishlatib qo'yganimni aytish edi. Hozir shu haqida aytib beraman.

Bu API haqida o'qiganimdan keyin, `transitionstart` va `transitionend` bilan komponent state'ni boshqarmoqchi bo'ldim.

Kursor komponent ustida borganda, ya'ni "mouseover" bo'lganida, u animatsiya bilan ochilishi kerak. Komponent ichidagi tugma bosilganda esa komponent yopilishi kerak edi.

```jsx
// pseudo kod
<Component
  ref={compRef}
  onMouseOver={() => {
    if (disabled) return;

    startTimer({ disabled: true });
    setOpen(true);
  }}
  onButtonClick={() => {
    if (disabled) return;

    startTimer({ disabled: true });
    setOpen(false);
  }}
  style={{ transition: "1s" }}
/>
```

Ochilish va yopilish animatsiyasi vaqtida event listener'lar ishlamasligi kerak, ya'ni "disabled" bo'lishi kerak. Chunki unday qilmasangiz "mouseover" ishga tushib komponent yana ochilib, animatsiya ishga tushib ketishi mumkin. "disabled" bu yerda React state.

Buning uchun men setTimeout'da foydalanyotgandim. Transition boshlanganda `disabled === true` bo'lib, taymerni ishlatib, tugaganda `disabled === false` bo'lishi kerak edi.

```jsx
// pseudo kod
function startTimer({ disabled }) {
  setDisabled(true);
  setTimeout(() => setDisabled(false), 1000);
}
```

Shu yerda taymerni butunlay o'chirib tashlab, o'rniga `transitionstart` va `transitionend`'dan foydalanib ko'rdim. Chunki taymer bilan ishlash murakkab va ko'pincha "bug"larga sabab bo'ladi.

```jsx
// pseudo kod
<Component
  onMouseOver={() => {
    if (!disabled) setOpen(true);
  }}
  onButtonClick={() => {
    if (!disabled) setOpen(false);
  }}
  onTransitionStart={() => setDisabled(true)}
  onTransitionEnd={() => setDisabled(false)}
  style={{ transition: "1s" }}
/>
```

Refaktor qilganimdan so'ng, kod ancha soddalashdi va endi `transitionstart`'da `disabled === true`, `transitionend`'da esa `disabled === false` bo'lishi kerak edi. Lekin endi komponent "lipirlay" boshladi.

Nega? Axir `transitionstart`'da event listener'lar `disabled === true` bo'lishi kerak edi-ku?

Biroz mulohazadan keyin tushundimki, "React falsafasi"ga qarshi ish qilib qo'yibman.

Komponent tugmasi bosilganda transition ishga tushadi. Bu paytda kursor hali komponent ustida turgan bo'ladi-ku, to'g'rimi? Shuning uchun "mouseover" ishga tushib komponentni yana ochib yuboradi (ya'ni ochilish animatsiyasi ishlab ketadi). Undan KEYINGINA `disabled === true` bo'ladi — deb o'ylasangiz yanglishasiz. Chunki endi `transitionend` ishlab `disabled === false` bo'lib qoladi!

Mana sizga chigallik!

React har bir (sinxron) state'lar zanjiri to'liq o'zgarib, virtual DOM "pishgandan" keyin haqiqiy DOM'ga o'zgarishlarni kiritadi. Ya'ni event loop bir marta aylanishiga bitta render bo'ladi!!! (Har holda shunga harakat qiladi. Xato aytgan bo'lsam to'g'irlanglar.)

Sichqoncha bilan bog'liq har bir event/hodisa event loop'ga bitta aylanish vazifasini yuklaydi. Komponentimizdagi `onButtonClick` listeneri "disabled" state'ini o'zgartirmaydi. "Disabled" o'zgarishi keyingi event loop'da sodir bo'ladi. Shuning uchun orada undan oldin "mouseenter" tiqilib olishga ulguradi.

Xullas kalom, bu yerdagi eng katta xato shuki, men state'ni DOM'dan o'qiganim bo'ladi. Chunki `transitionstart` bu DOM o'zgarishi orqali sodir bo'luvchi event!

**React'da state DOM'ni boshqaradi, DOM state'ni emas!!!**

Buni React'ni endi o'rganayotgan paytimda o'qiganman. Shuning uchun e'tiborli bo'linglar.
