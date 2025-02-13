---
layout: post
publishDate: Feb 14, 2023
title: new Date() pand berganda
tags: js, brauzer
isListed: true
---

Foydalanuvchi tug'ilgan sanasini kiritganda forma validatsiyasi ishlaydi va kiritilgan sana to'g'riligi, foydalanuvchi 18 yoshdan kattaligi tekshiriladi. Ba'zi sabablarga ko'ra "datepicker" ishlatmay, sanani qo'lda kiritiladigan qilishimiz kerak edi. Shuning uchun 31-fevralga o'xshagan noto'g'ri sanalarga ham validatsiya zarur.

Kecha "customer support"dan xabar kelyapti. Foydalanuvchi **"12.05.1990"** sanasini kiritsa noto'g'ri sana deb xatolik ko'rsatib yotgan emish. Skrinshotlar bor. Sana to'g'ri ko'rsatilgan. Proyektni ham lokal, ham "staging"da tekshirib ko'rdim. Hammasi joyida. 🤔

Xatolik chiqishi mumkin bo'lgan har bitta nuqtani sinchiklab tekshirib chiqdim. Komponentdan tortib, ishlatilgan kutubxonalargacha. Testlar ham ishlayapti.

Yoshni tekshirishdagi **`new Date().getFullYear()`** dan boshqa barcha nuqtalarni test qilib chiqdim. Chunki eng boshidan **`new Date()`** pand beryotganiga ishongim kelmayotgandi. Yoshni hisoblaydigan kod taxminan shunday ishlaydi(aynan shunday emas!):

```js
const userAge = new Date().getFullYear() - new Date(user.birthDate).getFullYear();

if (userAge < 18)
  throw new Error('Not old enough!');

```

So'ng noiloj, "support"dagilarga foydalanuvchi kompyuteridagi sistema sanasini tekshirib ko'rishi kerakligini aytdim. Lekin ich-ichimdan o'zimni xatolikni topolmay jinnicha bahona qilganday his qildim.

Keyin bilsak, rostan ham foydalanuvchi kompyuteri sanani 2005-yilga tushib qolgan ekan. Shuning uchun ham 1990-yilda tu'gilgan odamni hali 18 ga to'lmagan deb hisoblayotgan ekan, yaramas! 😄

Xulosa: *EVERYTHING CAN FAIL!*
