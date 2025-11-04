---
layout: post
publishDate: Sep 21, 2024
title: setTimeout(callback, 0) qachon kerak?
tags: browser, frontend, js
isListed: true
---

![settimeout 0](/public/images/settimeout0.jpg)

`setTimeout()` hodisalar sikliga yangi makrovazifa qo’shadi. Shu sabab “callback” keyingi siklda sodir bo’ladi. Bitta hodisa sikli davomida:

1.  barcha sinxron kodlar ishlab, chaqiruvlar steki (call stack) bo’shatiladi.
2.  UI va DOM dagi o’zgarishlar ekranga chiqadi.

Funksiyani keyingi hodisa siklda chaqirish UI o’zgarishlari to’liq “chizilishi” uchun imkon beradi, la la la, la la… .

Shunda bunday qilishdan maqsad “og’ir” funksiyani kechroqqa surishmi? Kechga sursak ham baribir keyingi siklda o’sha funksiya chaqiriladi-ku! Sahifa baribir qotib qoladigan bo’lsa, bunaday qilishdan nima naf? 🤔

“Yielding” - Yo’l berish
------------------------

Hodislar sikli har aylanishda JavaScript kodni bajarishdan tashqari, foydalanuvchi kiritmalarini (user input) ham qabul qilib oladi. Bular har xil interaktiv hodislar bo’lishi mumkin (click, scroll, hover, keypress, v.h.k.). `setTimeout(callback, 0)` orqali biz ana shu hodislar uchun brauzerga **“yield”** qilgan bo’lamiz, ya’ni yo’l bergan bo’lamiz.

“Og’ir” vazifalarni bo'lish
---------------------------

Yuqoridagi asosiy savolga javob mana shu:

`setTimeout(callback, 0)` og’ir vazivafalarni bo’laklarga bo’lib bajarish uchun kerak! **Funksiyani kechiktirmaymiz, balki uni bo’laklarga bo’lib, keyingi sikllarga yoyamiz.**

Mana bir misol:

```js
// Barcha ma'lumotni bittada hisoblash.
// Hodisalar sikli operatsiya tugamaguncha qotadi.
function processData() {
  let i = 0;

  while (i < bigData.length) {
    heavyProcess(bigData\[i\]);
    i++;
  }
}
```

Shuni sal o'zgartiramiz:

```js
// Ma'lumotni bo'laklarga bo'lib hisoblash.
function processData() {
  let i = 0;

  function chunk() {
    while (i < bigData.length) {
      heavyProcess(bigData\[i\]);
      i++;

      // Har 1000-elementda vazifani keyingi silkga o'tkaz
      ﻿if (i % 1000 === 0) {
        setTimeout(chunk, 0);
        break;
      }
    }
  }

  chunk();
}
```

Bu misolda, butun massivni bir vaqtning o'zida qayta ishlash o'rniga, biz uni 1000 ta elementdan iborat bo’laklarda qayta ishlaymiz. Har bir bo’lakdan so'ng, keyingi bo’lakning rejalashtirish uchun setTimeout-dan foydalanamiz, bu esa brauzerga o’sha bo’laklar orasida UI-ni yangilash va foydalanuvchi kiritmalariga javob berish imkonini beradi.

Render sikli
------------

`setTimeout(callback, 0)` texnikasining foydasini tushunish uchun faqat hodisalar siklining qanday ishlashini tushunish yetmaydi. Qo’shimcha ravishda brauzerning render sikli va “user input”ga qanday javob berishini tushunish ham kerak.

**Brauzer har bir hodisa siklidan keyin UI-ni yangilamaydi!** Sahifani render qilishda ba’zi sikllarni birlashtirib bajariladi. Chunki brauzerlar iloji boricha samarali ishlashga harakat qiladi.

Aslida `setTimeout`\-dan foydalanib, hatto 0 kechikish bilan ham, biz brauzerga shunday degan bo’lamiz: _"Bu kodni joriy vazifani tugatganingdan va_ **_UI-ni yangilash imkoniyating bo'lganidan keyin ishga tushir._**_"_

Quyidagi funksiya ba’zida “loader” ni ko’rsatmaydi. Chunki hodisa sikli bilan render sikli mos tushmay qolishi mumkin.

```js
function proccessData() {
	loader.style.display = 'block';

	setTimeout(() => {
		// Og'ir operatsiya simulyatsiyasi
		for (let i = 0; i < 1e9; i++) {}
		
		loader.style.display = 'none';
	});
}
```

Buni to’g’rilash uchun `requestAnimationFrame` dan foydalanish kerak bo’ladi. `setTimeout` ni `requestAnimationFrame` ichida chaqiramiz. Chunki “loader”ni joriy siklda emas, keyingi siklda yashirishimiz kerak.

```js
function showMenu() {
	loader.style.display = 'block';
	
	requestAnimationFrame(() => {
		setTimeout(() => {
			// Og'ir operatsiya simulyatsiyasi
			for (let i = 0; i < 1e9; i++) { }
			
			loader.style.display = 'none';
		});
	});
}
```

Shu sabab ham `setTimeout` yoki `setInterval` bilan yasalagan animatsiyalar yoki UI yangilanishlari ba'zan g'adir-budur ko'rinishi mumkin. Aynan animatsiyalar va UI o’zgarishlari uchun `requestAnimationFrame` ko'pincha yaxshiroq tanlov, chunki u brauzerning render sikli bilan sinxronlashadi.

WebWorkerlar
------------

`setTimeout(callback, 0)` foydali bo'lishi mumkin bo'lsa-da, u universal yechim emas. Agar ma’lum bir operatsiylar juda uzoq vaqt oladigan va og’ir bo’lsa, **WebWorker**lar dan foydalangan yaxshiroq.

Chunki `setTimeout` ni ishlatganimiz bilan baribir operatsiyalar sahifa asosiy “thread”ida bajariladi. Agar WebWorker orqali operatsiyani alohida “thread”da bajarsak, operatsiya sahifani qotirib tashlashidan havotir olmasak bo’ladi (albatta WebWorker bilan aloqani minimumda ushlagan holatda).

![task threads](/public/images/taskthreads.jpg)