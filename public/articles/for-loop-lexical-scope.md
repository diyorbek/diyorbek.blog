---
layout: post
publishDate: Dec 14, 2022
title: For-loop, lexical scope va "let"
tags: js, performance
isListed: true
---

Quyidagi kod ishga tushganda nima chop etiladi?

```js
for (
  let i = (setTimeout(() => console.log(i)), 0);
  i < 5;
  i++
) {}
```

## Chalg'ituvchi sintaksis

Kodda chalg'ituvchi kichik narsa bor edi. Ko'pchilik bu sintaksisni bilmaydi. Agar qavs ichida qiymatlar vergul bilan ketma-ket yozilsa, faqat oxirgisi olinadi:

```js
let i = (0, 1, 2, 3);
console.log(i); // 3
```

Qavs ichida xohlagan ishingizni qilsangiz bo'ladi. Masalan setTimeout:

```js
let i = (setTimeout(() => alert()), 2);
console.log(i); // 2
// keyin alert ishlaydi
```

Aytgancha setTimeout 2-parametrini berish shart emas. O'zi nol bo'lib ketadi:

```js
setTimeout(() => alert());
// bir xil
setTimeout(() => alert(), 0);
```

## Lexical scopes in for-loop

For-loop strukturasi 4 ta asosiy ifodaviy qismlardan iborat:

```js
for (ifoda1; ifoda2; ifoda3) {
  ifoda4;
}
```

1-ifoda sikl boshida **FAQAT BIR MARTA** ishga tushadi. Bu yerda biz ko'pincha o'zgaruvchilar e'lon qilamiz, boshlang'ich holatni belgilaymiz.

2-ifoda har safar sikl boshida ishga tushadi. Bu yerga sikl tugatilish sharti qo'yiladi.

4-ifoda siklimiz tanasi. 2-ifodadan ROST qiymatini olar ekanmiz, 4-ifoda har doim bajariladi.

3-ifoda har safar sikl tugaganida ishga tushadi. Bu yerda sikl yakunlanganida qilinishi kerak bo'lgan amal(lar)ni joylaymiz.

JavaScript'da "lexical scope" tushunchasi mavjud. Qisqacha ma'nosi leksik maydon. Yuqoridagi **for-loop strukturasidagi ifodalarning har biri o'z leksik maydonini yarata oladi.**

Misolga qaraydigan bo'lsak, `setTimeout` 1-ifodaning "lexical scope"ida joylashgan. Ifoda esa bir martagina ishga tushadi. O'zgaruvchi `let` orqali e'lon qilingani uchun "i"ning qiymati `setTimeout` uchun o'shaligicha qolaveradi.

1-ifoda ekvivalenti bunday bo'ladi:

```js
let i = (setTimeout(() => console.log(i)), 0);

// tushunarliroq qilib yozsak
{
  let i = 0;
  setTimeout(() => console.log(i), 0);
}
```

Shunday ekan, for-loop'da bo'ladigan keyingi o'zgarishlarning setTimeout ichidagi "i"ga hech qanday tasiri yo'q. Chunki u alohida "lexical scope"da.

**Javob: 0**

## "Let" o'zgaruvchi for-loop'ni sekinlashtiradi

Yuqorida for-loop ifodaviy qismlarining barchasida leksik maydon hosil qilish mumkinligini aytdik. Agar for-loop uchun iterativ o'zgaruvchini "let" orqali e'lon qilsak, har bir iteratsiyada alohida leksik maydon hosil bo'ladi. Bu leksik maydonlar o'zidan oldingisiga ham bog'langan bo'ladi. Chunki yangi leksik maydonga undan oldingisidagi o'zgaruvchi qiymatlari nusxalab ko'chiriladi. Endi tasavvur qiling ichma-ich yozilgan katta for-loop'lar "let" bilan ishlasa qanday gigant "lexical scope graph" hosil qiladi.

Agar JS engine'lar bu holatda shuncha ish qilyotgan bo'lsa, kodimiz tezligi tushib ketishi turgan gap. Bu bo'yicha [V8 engine'da alohida raport qilingan](https://bugs.chromium.org/p/v8/issues/detail?id=4762#c7). U yerdagi muhokamani o'qisangiz iloji boricha "for(;;)" strukturasini ishlatmaslik tavsiya qilingan. Albatta agar tezlik muhim bo'lsa. Uning o'rniga "for-of" yoki "for-in"lardan foydalanish nisbatan tezroq bo'lar ekan.

Agar "for(;;)"ni ishlatish chorasiz bo'lib qolsa, uni "var" bilan ishlatish ham kod tezligini oshiradi. Chunki bu holatda har bir iteratsiyada leksik maydonlar zanjiri hosil bo'lmaydi.

Benchmarking uchun [kichik na'munaga link](https://replit.com/@diyorbek/for-loop-benchmarking?v=1) qoldiraman. Kodni bir necha marta yuritib ko'rsangiz, "var for-loop" nisbatan tezroq, "let for-loop" esa eng sekini ekanligini ko'rasiz.
