---
layout: post
publishDate: Apr 23, 2025
title: JavaScript o'zi "interpreted"mi?
tags: js, engine
isListed: true
---

![JS engine](/public/images/jsengine.png)

Bir maqolaga ko'zim tushdi. Sarlavhasi shunday:

["JavaScript “interpreted language” emas.](https://medium.com/@bmpmuhabbatpulatova98/javascript-interpreted-language-emas-87e00496a679)

Bu da'vo aksariyat hollarda to'g'ri. Ammo 100% haqiqat emas. Ushbu maqolada uning sabablarini keltirib o'tmoqchiman.

> Disclaimer: Davom etishdan oldin yuqorida keltirilgan maqolani o'qib chiqishni tavsiya qilaman. Chunki bu maqola o'sha maqolaga qo'shimcha sifatida yozilgan!

## JavaScript vs ECMAScript

Oldin JavaScript va ECMAScript o'rtasidagi farqni tushunishimiz kerak. JavaScript - bu dasturlash tili, ECMAScript esa uning standartidir. JavaScript dasturlash tilining ko'plab implementatsiyalari mavjud. Aynan ularni biz "JavaScript engine" deb ataymiz. Masalan, V8, SpiderMonkey, JavaScriptCore va boshqalar.

ECMAScript standarti uning implementatsiyasi "interpreted" yoki "compiled" bo'lishi kerakligini belgilamaydi. Bu faqatgina JavaScript engine'iga o'ziga bog'liq. Eng birinchi JavaScript engine - bu Netscape Navigator brauzerida ishlatilgan SpiderMonkey engine edi. U dastlab "interpreted" bo'lgan, lekin keyinchalik JIT-compiled bo'lib takomillashdi.

Hozirda ommabop brauzerlarda ishlatiladigan asosiy engine'larning barchasi JIT-compiled hisoblanadi.

## React Native

React Native bizga mobil qurilmalar uchun JavaScriptdan foydalanib dasturlar yaratish imkonini beradi. Bu freymvork JavaScript kodni to'g'ridan-to'g'ri mobil qurilmalarda ishga tushiradi va buning uchun o'zining maxsus engine'ini ishlatadi.

Hermes engine'i mobil qurilmalar uchun, React Native uchun, maxsus ishlab chiqilgan. Uning arxitekturasiga ko'ra JIT kompilyatori React Native dasturlari uchun ortiqcha hisoblanadi. Sabablari:

1. Mobil qurilmalarda resurslar cheklangan. Ayniqsa RAM va CPU kuchi. Batareyka quvvatini tejash kerak!
2. JIT kompilyatsiya kod optimizatsiyasi uchun ko'p xotira resurslarini talab qiladi.
3. Startup time ya'ni dastur ilk ishga tushish vaqtini tezlashtirish.
4. iOS da xavfsizlik nuqtayi nazaridan JIT kompilyatsiyasi ishlatish cheklangan.

Hermesda JIT kompilyatori yo'q. Bu uni xotira va resurslarni ishlatish tarafdan yaxshilasa ham, React Native'da yozilgan dasturlar nisbatan sekin ishlaydi deb qaraladi. Chunki unda JIT kompilyatsiyasi beradigan runtime optimizatsiyalari yo'q. Bu uzoq vaqt davomida ishlab turadigan yoki og'ir operatsiya/hisoblashlarni bajaradigan dasturlar uchun muammo bo'lishi mumkin.

## iOS va JavaScriptCore

JavaScriptCore (JSC) iOS va macOS uchun JavaScript engine hisoblanadi. U Apple tomonidan ishlab chiqilgan va Safari brauzerida ishlatiladi. JSC ham JIT-compiled engine hisoblanadi.

Ammo JSC iOS'da maxsus holatga ega:

iOS tizimi tashqi (3rd-party, Apple tomonidan ishlab chiqilmagan) dasturlar uchun JIT kompilyatsiyasini ishlatishni cheklaydi. Bu xavfsizlik siyosatlari bilan bog'liq. Bu degani:

- Safari yoki Apple o'z dasturlarida JavaScriptCore'dan foydalanganda, JIT kompilyatsiya imkoniyatlaridan foydalanishi mumkin
- Tashqi (3rd-party) dasturlar JavaScriptCore'dan foydalanganda esa, JIT kompilyatsiyasiz ishlaydi (faqat interpretator rejimida)

Bu cheklov Apple xavfsizlik modelining bir qismi bo'lib, dasturlarni ishga tushirish vaqtida bajariladigan kodni "yaratishni" oldini olish uchun mo'ljallangan. Ya'ni JIT xavfli bo'lgan kod generatsiya qilib yubormasligi uchun.

## QuickJS

QuickJS - bu juda tez va engil JavaScript engine hisoblanadi. Bu engine'ni asosan qayerda JavaScriptni ishlatish zarur bo'lsa, ishlatish mumkin. Masalan, IoT qurilmalarda, "embedded" tizimlarda, televizorlarda va h.k.

QuickJS engine'i JIT kompilyatsiyasini qo'llab-quvvatlamaydi va faqat "interpreted" rejimida ishlaydi. Chunki u dastur tez ishlashidan ko'ra ko'proq oddiylik va yengillik talab qilinadigan muhitlar uchun mo'ljallangan.

## Xulosa

JavaScript dasturlash tili "interpreted" yoki "JIT-compiled" bo'lishi mumkin. Lekin qisqa qilib javob berish kerak bo'lsa, uni bemalol gibrid deb aytish mumkin.
