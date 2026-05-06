---
layout: post
publishDate: Nov 18, 2022
title: JS tuples
tags: js, ecmascript
isListed: true
---

1-2 kun oldin forma validatsiyasi bilan bog'liq vazifa ustida ishlayotgandim. Foydalanuvchi bank hisob raqamini verifikatsiyadan o'tkazishi uchun unga jo'natilgan 2 ta mikrodeposit qiymatlarini formaga kiritishi kerak. Formada buning uchun 2 ta input bor.

![Mana shu vaziyatda JS tuple juda qo'l kelardi](/public/images/js-tuple-misol-1.png)

Kiritilgan qiymatlar to'g'riligina faqat serverga request jo'natish orqali bilish mumkin. Agar foydalanuvchi qiymatlarni xato kiritisa, forma xatolik xabarini ko'rsatishi va verifikatsiya tugmasi "disabled", ya'ni bosilmaydigan holatga tushishi kerak.

![Mana shu vaziyatda JS tuple juda qo'l kelardi](/public/images/js-tuple-misol-2.png)

Vazifaning qiziq tarafi shundaki, foydalanuvchi oldin xato kiritgan qiymatlarni yana kiritmoqchi bo'lsa, serverga request jo'natmay turib formada xatolik ko'rsatish kerak bo'ladi. Buning uchun albatta oldin kiritilgan xato qiymatlarni massivda saqlab borishimiz kerak. Forma submit qilinganda esa request jo'natishdan oldin, qiymatlar oldin xato kiritilganlar orasida yo'qligini tekshirishimiz kerak.

```js
const invalidValues = []; // Array<[number, number]>

function isInvalid(values) {
  return !!invalidValues.find(
      ([a, b]) => a === values[0] && b === values[1]
  );
}

isInvalid([12, 3]);
```

E'tibor bersangiz `isInvalid` funksiyasi bizga javob berishi uchun har bitta xato kiritilgan qiymatlar ustidan yurib chiqishi kerak. Uning ustida 2 ta qiymatning har birini tenglikka tekshirish ham bor. **Kod mujmallashyapti!** 
Ustiga ustak "Time-complexity" tarafdan bu algoritm O(n) da ishlaydi. Xo'sh, buni konstataga, O(1) ga tushira olamizmi?

> Ha, bu vaziyatda masalaga bunchalik chuqurlashish noo'rin. Chunki foydalanuvchi nari borsa 3 marta xato kiritar. 3 ta elementlik massivda qidiruv qilish "qiyomat emas", albatta. Lekin bu yerda asosiy gap kodni soddalashtirish haqida.

Qidiruv algoritmlarini tezlashtirish uchun hashmap, set kabi ma'lumotlar tuzilmalaridan foydalaniladi. Biz ham bu yerda JS'ning `Set` obyektidan foydalansak bo'ladi.

```js
const invalidValues = new Set(); // Set<[number, number]>

function isInvalid(values) {
  return invalidValues.has(values);
}

isInvalid([12, 3]);
```

Lekin `Set`ga `Array` joylagan bilan JS ularni qiymatlari bilan tekshirmaydi-ku! `Array` obyekt bo'lgani uchun faqat reference orqali tenglikka tekshira olamiz. Aynan o'sha o'zgaruvchi bilan qidirmasak, `Set.has` bizga har doim `false` qaytaradi.

**Xato qiymatlar jufligini `Tuple` qilib saqlay olganimizda bunday muammo bo'lmasdi!** Chunki tuple'lar primitiv va ularni bemalol tenglikka O(1) da tekshirsak bo'ladi. Quyida `invalidValues` o'zida tuple'larni saqlovchi Set'ga teng.

```js
const invalidValues = new Set(); // Set<#[number, number]>

function isInvalid(values) {
  return invalidValues.has(values);
}

isInvalid(#[12, 3]);
```

Ahamiyat bering `isInvalid` funksiyani endi oddiy `Array` emas, `Tuple` tipidagi argument bilan chaqirayapmiz. Kodimiz juda ixcham va o'qishga juda qulay. Har qanday dastuchi bitta qarab nima bo'layotganini aytib bera oladi. Undan tashqari, bu kod formaga kiritilgan xato qiymatlarni aniqlashni konstata vaqtda bajaradi, ya'ni O(1) time-complexity!

Afsuski, hali tuple'lar JS'ga rasmiy ravishda kiritlgani yo'q shuning uchun bu usuldan hozircha foydalana olmayman. Va albatta, yuqorida ta'kidlagan sabablarim bo'yicha bu kichik optimizatsiya unchalik ham ahamiyatli emas. Shuning uchun kodni 1-usuldagidek qoldirdim.
