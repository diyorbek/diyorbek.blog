---
layout: post
publishDate: Nov 12, 2022
title: Record va Tuple'lar
tags: js, ecmascript
isListed: true
---

![Record va Tuple'lar](/public/images/record-va-tuple-1.png)

ECMAScript’ning keyingi versiyasiga 2 ta yangi primitiv tip qo’shilish arafasida. [Bu porposal](https://github.com/tc39/proposal-record-tuple) ustida yaqin yillardan beri ishlab kelinyotgandi. Hozirda proposal 2-etapda, ya’ni 3-etap, reliz qilinishidan bitta oldingisida.

`Record` - obyektga o’xshagan “deeply-immutable” pritmitiv.

```js
const rec = #{ a: 5, b: 'c' };
typeof rec === "record" // true
```

`Tuple` - massivga o’xshagan “deeply-immutable” primitiv.

```js
const tup = #[1, 2, 3];
typeof tup === "tuple" // true
```

“Deeply-immutable”ning ma’nosi chuqur o’zrgamas degani.

Bilamiz JS’da obyeklar “reference” orqali nusxalanadi, primitivlar esa qiymati orqali. Shuning uchun ham obyektlar o’zidan boshqa, lekin aynan bir xil qiymatlari bor obyekt bilan taqqoslansa ham ular teng bo’lmaydi. Chunki ikkalasi 2 xil obyekt hisoblanadi.

Primitiv tipdagi o’zgaruvchilar esa o’zlaringing qiymati orqali taqqoslanadi. Demak, Record va Tuple primitiv ekan, ular qanchalik kompleks strukturaga ega bo’lmasin, taqqoslanganda ichidagi barcha qiymatlar hisobga olinadi:

```js
const record1 = #{
  a: #{
    foo: "string",
  },
  b: #{
    bar: 123,
  },
};

const record2 = #{
  b: #{
    bar: 123,
  },
  a: #{
    foo: "string",
  },
};

record1 === record2 // true
```

E’tibor bering, record1 va record2 field’lari har xil o’rinda kelgan bo’lsa ham ular teng hisoblanadi.

```js
const tuple1 = #[1, #[2, 3]];
const tuple2 = #[1, #[2, 3]];
const tuple3 = #[#[2, 3], 1];

tuple1 === tuple2 // true
tuple2 === tuple3 // false
```

Lekin Tuple’larda qiymatlar keyma-ketligi muhim.

Record va Tuple o’zlari primitiv bo’lgani uchun ular ichida faqat boshqa primitivlar bolishi mumkin xolos. Ya’ni biz ularning uchida funksiya yoki boshqa turdagi obyektlarni saqlay olmaymiz.

Mavzu haqida to'liqroq ingliz tilidagi maqola: [https://tc39.es/proposal-record-tuple/tutorial/](https://tc39.es/proposal-record-tuple/tutorial/)

Bu yangi sintaksisni o’zingiz mana bu playground'da sinab ko’rishingiz mumkin:[https://rickbutton.github.io/record-tuple-playground](https://rickbutton.github.io/record-tuple-playground)
