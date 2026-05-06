---
layout: post
publishDate: Jan 17, 2026
title: Client-side vs server-side computation
tags: architecture, opinion, performance
isListed: true
---

GDG DevFest Tashkent 2025 da ["Browsers are the new OS"](/public/Browsers%20are%20the%20new%20OS.pdf) mavzusida gapirgandim. Mavzu bo'yicha qo'shimcha fikrlar:

Ba'zida client-side qilsa bo'ladigan narsalarni, serverda qilish to'g'riroq bo'ladi. Eng avvalo bu qaror sizning dasturingiz qiladigan ishga bog'liq. Shuni yanada aniqroq aytsam, dasturingiz hal qilishi kerak bo'lgan muammoga bog'liq.

## Misol

PDF fayldan rasmlarni ajratib oluvchi dastur yasamoqchisiz. Buning uchun brauzerda ishlaydigan tayyor JS kutubxona ishlatasiz. Kichik fayllar uchun dastur yaxshi ishlashi mumkin. Lekin 500 betlik 20MB fayl yuklansa, foydalanuvchi kompyuteri "qizishni" boshlaydi. Chunki katta faylni analiz qilyapsiz. Agar foydalanuvchi telefonda bo'lsa, telefon rostakamiga qiziydi va quvvati keskin kamayishni boshlaydi. Web Worker ishlatib UX'ni yaxshilashingiz mumkin, lekin bu bilan dastur tezlashib qolmaydi. Baribir shuncha resurs ishlatiladi, balki ko'proqdir.

Bu holatda yechim dasturning texnik implementatsiyasiga bog'liq emas. Agar shu dasturni C/C++ yozsangiz ham, "time-complexity" baribir o'zgarmaydi. Javob esa, yana qaytaraman, **dasturingiz hal qilishi kerak bo'lgan muammoga bog'liq!**

PDF analiz dasturimiz misolini olsak, deylik, asosiy xususiyat, bir payt o'zida 10 tagacha fayl analiz qilish mumkin. Agar bu xususiyatdan maqsad, foydalanuvchi ishini tezlashtirish bo'lsa, kuchsiz kompyuterlar, telefonlarda bu aksiga aylanishi mumkin. "Undan ko'ra qo'lda qilganim yaxshi edi" deydigan darajada!

Demak, maqsad odamlarning vaqtini tejash va ishini tez hal qilib berish bo'lsa, balki ularga tezroq ishlaydigan kompyuter ham taklif qilish kerakdir? Ya'ni ishni ularning qurilmasiga emas, o'zimizning tez ishlaydigan serverga yuklash kerakdir?

Bu savolga javob esa, loyiha va foydalanuvchilar hajmidan, va albatta, cho'ntak hajmidan kelib chiqib beriladi. 😬
