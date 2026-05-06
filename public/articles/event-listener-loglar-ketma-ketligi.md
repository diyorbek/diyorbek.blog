---
layout: post
publishDate: Oct 26, 2022
title: JavaScript'da mikro vazifalar bajarilishi
tags: js, browser, event-loop
isListed: true
---

Quyidagi kodni ishga tushirsak natija qanday bo'ladi?

```js
button.addEventListener('click', () => {
  Promise.resolve().then(() => {
    console.log('Promise 1');
  });

  console.log('Click 1');
});

button.addEventListener('click', () => {
  Promise.resolve().then(() => {
    console.log('Promise 2');
  });

  console.log('Click 2');
});

button.click();
```

**Javob:** Click 1, Click 2, Promise 1, Promise 2

### Tahlil

Skriptimiz ishga tushganda 3 ta narsa sodir bo'ladi:

1. 2 marta tugmacha uchun "click" listener registratsiya qilamiz.
2. Tugmachaning "click" hodisasini **sinxron **ravishda chaqiramiz.

"button.click()" chaqirilgandagi umumiy holat quyidagicha:

![Quyidagi kodni ishga tushirsak natija qanday bo'ladi?](/public/images/kod-natijasini-toping-1-2.png)

**Chaqiruvlar stekiga "button.click()" kiritiladi va u biz registratsiya qilgan listener funksiyalarimizni ketma-ket, sinxron ravishda chaqirishni boshlaydi.**

Demak, endigi qadam 1-listener funksiyamizning chaqirilishi. Bunda chaqiruvlar steki quyidagicha o'zgaradi:

![Soddaroq bo'lishi uchun "Promise.resolve"ni qo'shmadim](/public/images/kod-natijasini-toping-1-3.png)

Soddaroq bo'lishi uchun "Promise.resolve"ni qo'shmadim

Albatta bu orada Promise'dan mikrovazifa qabul qilib olamiz va umumiy ko'rinish mana bunday holatga keladi:

![Quyidagi kodni ishga tushirsak natija qanday bo'ladi?](/public/images/kod-natijasini-toping-1-4.png)

"Click 1" konsolda chop editadi va shu bilan "Listener 1"ning ishi tugaydi. Lekin hali "button.click()"ning ishi tugamadi. Chunki bizda hali "Listener 2" bor shuning uchun ham "button.click()" stekdan chiqib ketmaydi:

![Quyidagi kodni ishga tushirsak natija qanday bo'ladi?](/public/images/kod-natijasini-toping-1-5.png)

**Chaqiruvlar steki boshagani yo'q. Shuning uchun hodisalar sikli mikrovazifalarga o'tmay turadi.**

Endi "button.click()" 2-listener funksiyani chaqiradi va chaqiruvlar steki quyidagicha o'zgaradi:

![Soddalashtirish uchun "Promise.resolve" qoldirib ketilgan](/public/images/kod-natijasini-toping-1-6.png)

Soddalashtirish uchun "Promise.resolve" qoldirib ketilgan

Listener'dagi Promise'dan mikrovazifa olinadi va navbatga qo'shib qo'yiladi. Umumiy holat esa shu holatga keladi:

![Quyidagi kodni ishga tushirsak natija qanday bo'ladi?](/public/images/kod-natijasini-toping-1-7.png)

"Click 2" chop etilgandan keyin "Listener 2"ning ishi tugaydi. Keyin esa, vanihoyat, "button.click()" o'z ishini to'liq yakunlaydi va stekdan chiqib ketadi:

![Quyidagi kodni ishga tushirsak natija qanday bo'ladi?](/public/images/kod-natijasini-toping-1-8.png)

Endi bo'lsa hodisalar sikli chaqiruvlar steki bo'shagani uchun mikrovazifalarni bajarishga kirishadi. Mikrovazifalarimiz esa birma-bir, kiritilgan ketma-ketligida bajarilishni boshlaydi:

![Quyidagi kodni ishga tushirsak natija qanday bo'ladi?](/public/images/kod-natijasini-toping-1-9.png)

![Quyidagi kodni ishga tushirsak natija qanday bo'ladi?](/public/images/kod-natijasini-toping-1-10.png)

![Quyidagi kodni ishga tushirsak natija qanday bo'ladi?](/public/images/kod-natijasini-toping-1-11.png)

Shunday qilib, skriptimiz o'z ishini yakunladi. Endi u faqat brauzerdan keladigan asinxron hodisalarga javob berishni boshlaydi. Bu hodisalarga javob beruvchi listener funksiyalarimiz esa makrovazifa sifatida vazifalar navbatiga qo'shiladi. Hodisalar sikli esa ularni birin-ketin chaqiruvlar stekiga kitishni boshladi. [Bundan oldingi yozgan tahlilim](/Foydalanuvchi-buttonni-bosganida-loglarimiz-qaysi-ketma-ketlikda-boladi-10-26)dagi holat bilan tepadagi holatning ham faqri anyan shunda:

- **"button.click" skript ishga tushganidan sinxron ravishda listener funksiyalarni birma-bir o'zi chaqiruvlar stekiga kiritadi.** Hodisalar sikli stek bo'shamaguncha hech narsa qilmaydi. Shuning uchun ham mikrovazifalar eng oxirida bajarilyapti.
- **Agar foydalanuvchi tugmani bossa, har bir listener vazifalar navbatiga alohida makrovazifa qilib kiritiladi. **Hodisalar sikli esa keyingi makrovazifaga o'tishdan oldin, barcha mikrovazifalarni stekka kiritib bo'lishi kerak.

Tushunarli va foydali bo'ldi degan umiddaman. Omad!
