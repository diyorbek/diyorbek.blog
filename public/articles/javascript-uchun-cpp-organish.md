---
layout: post
publishDate: May 27, 2024
title: JavaScript'ni zo'r o'rganmoqchi bo'lsangiz C++ ni o'rganing
tags: js, cpp, learning, opinion
isListed: true
---

## 1. JavaScript ostida C++ da yozilgan kodlar yotadi

Hech o'ylab ko'rganmisiz, `setTimeout` o'zi qanday ishlaydi? Uning kodi qanday yozilgan?

Yoki `addEventListener` aslida signalni qayerda oladi?

Yoki oddiy `<button>` HTML tegi qanday qilib ekranga tugmacha chiqaradi?

"Event loop" o'z nomi bilan oddiy "while loop" asosida ishlashini bilarmidingiz?

O'ylab ko'rmagan bo'lsangiz, endi o'ylab ko'ring!

## 2. Xotirani boshqarish (Memory management)

JavaScript'da bu narsani siz qilmaysiz. Sahna ortidagi JS engine bu ishlarni siz uchun qiladi. Uning qanday ishlashini tushunsangiz, quyidagi JS ko'nikmalaringiz rivojlanadi:

a. kod optimizatsiyasi

b. katta ma'lumotlar bilan ishlash

c. "memory-leak"larni payqay olish (ha JS'da ham bo'ladi)

## 3. Multithreading

Bu ham JS'da yo'q — desam xato gapirgan bo'laman. Shunchaki JS'da boshqacha konstruksiya bor xolos (WebWorker'lar). Undan tashqari "event-listener"lar va shu kabi brauzerning asinxron API'lari boshqa thread'da ishlaydi. Ularni yaxshi tushunish uchun "multithreading" qanday ishlashini bilish foydali.

## 4. Har bir texnologiya aslida sodda texnologiyalar jamlanmasi ekanini tushunish

Ularning murakkabligi o'sha jamlanmaning kattaligida, ko'pligida. Lupa ostiga olib qarasangiz ularning qanchalik sodda ekanligini ko'rasiz.

*P.S. C++ dan tashqari Go, Rust kabi tillarni ham misol qilsam bo'lardi. Lekin ularda memory management bo'yicha qo'shimcha konstruksiyalar kiritilgan. Shu sabab "memory-management"ni yaxshi tushunish uchun C/C++ ga teng kelolmaydi (IMHO).*

*Undan tashqari eng kuchli JS engine bo'lmish V8 C++ da yozilgan. Chrome ustiga qurilgan har bir brauzerda V8 ishlaydi. NodeJS va Deno ham. Bun ham ancha-muncha C++ kodga ega.*
