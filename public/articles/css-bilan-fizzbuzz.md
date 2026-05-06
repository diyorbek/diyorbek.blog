---
layout: post
publishDate: Dec 1, 2022
title: CSS bilan FizzBuzz
tags: css, puzzle
isListed: true
---

Eng mashxur intervyu savollaridan biri bo'lgan FizzBuzz masalasini deyarli hammamiz har xil dasturlash tillarida ishlab ko'rganmiz. Keling o'sha tillar qatoriga CSS'ni ham qo'shamiz.

***Disclaimer:**** Qila olasiz degani, qilishingiz kerak degani emas!*

Kecha Slack'dagi muhokamada intervyu savollari mavzusi ochilib qoldi. Jiddiy gaplar tugagandan so'ng muhokama ancha hazilomus tus oldi.

### Implement FizzBuzz in CSS

Shu masala taklif qilinishi bilan, menda uni yechish uchun qandaydir kutilmagan istak paydo bo'ldi. Deamk, masala sharti bunday:

*"1 dan 100 gacha sonlarni ekranga chiqaruvchi dastur tuzing. Agar son 3 ga karrali bo'lsa ****Fizz****, 5 ga karrali bo'lsa ****Buzz**** yozilsin. Agar son ham 3 ga, ham 5 ga karrali bo'lsa ****FizzBuzz**** yozilsin."*

<ol> elementi sonlarni chiqarish uchun eng to'g'ri tanlov bo'lib ko'rindi. `:befrore` ichida esa "Fizz" yozish kerak edi:

```css
li:nth-child(3n):before {
    content: 'Fizz';
}
```

Va "Buzz"ni ham:

```css
li:nth-child(5n):after {
    content: 'Buzz';
}
```

Keyin esa o'sha elementlarda sonlarni ko'rsatmaslik kerak:

```css
li:nth-child(3n),
li:nth-child(5n) {
    list-style: none;
}
```

Natija esa bunday bo'ldi:

![CSS bilan FizzBuzz](/public/images/css-bilan-fizzbuzz-1.png)

Maqola Trys Mudford blogidan tarjima qilindi. 
Original maqola linki: [https://www.trysmudford.com/blog/fizzbuzz-in-css/](https://www.trysmudford.com/blog/fizzbuzz-in-css/)
