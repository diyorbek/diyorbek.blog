---
layout: post
publishDate: Sep 27, 2022
title: Number metodlari
tags: js
isListed: true
---

JavaScript'da primitiv tiplar obyekt kabi ishlatilishi mumkin. Chunki primitivlarning metodlari yoki property'larini ishlatarkanmiz JS bizga o'sha primitivni mos obyekt bilan o'rab beradi ([manbaa](https://developer.mozilla.org/en-US/docs/Glossary/Primitive#:~:text=When%20properties%20are%20accessed%20on%20primitives%2C%20JavaScript%20auto%2Dboxes%20the%20value%20into%20a%20wrapper%20object%20and%20accesses%20the%20property%20on%20that%20object%20instead)). Quyida aynan Number'larning "metod"larini ko'rib chiqamiz:

### `toExponential()`

Sonni eksponensial (mantissa va o'nning darajasi) ifodaga o'giradi.

```js
const num = 12000;
num.toExponential(); // '1.2e+4'
```

*"Exponential notation" atamasining o'zbekchasi bilsangiz, iltimos, kommentlarda qoldiring.*

### `toFixed(n)`

Sonni o'nli kasrda ko'rinishida nuqtadan keyin n ta son qoldirgan holda ifodalaydi. n soni [0, 100] oralig'ida bo'lishi shart:

```js
const num = 12000;
num.toFixed(2); // '12000.00'

const num1 = 3.141592;
num1.toFixed(1); // '3.1'
num1.toFixed(0); // '3'
```

### `toPrecision(n)`

Sonning n ta muhim raqamini saqlab qolgan holda eksponensial ko'rinishda ifodalaydi. n soni [1, 100] oralig'ida bo'lishi shart.

`toFixed()` dan farqi shuki, bu metod nuqtadan keyin emas, balki sonning boshidan boshlab muhim raqamlarni hisobga oladi:

```js
(12).toPrecision(4); // '12.00'
(1234).toPrecision(2); // '1.2e+4'
(1234).toPrecision(3); // '1.23e+4'
```
