---
layout: post
publishDate: May 6, 2023
title: ECMAScript yoki JavaScript?
tags: js, ecmascript, history
isListed: true
---

![ECMAScript yoki JavaScript?](/public/images/ecmascript-yoki-javascript-1.png)

ECMAScript bilan JavaScript nomlarini ko’pincha almashtirib ishlatamiz. Chunki ikkovi bitta narsada, to’g’rimi?

Noto’g’ri!

Tarixga ozgina nazar solamiz. JavaScript 1995-yilda Brendan Eich tomonidan Netscape Navigator brauzeri uchun ishlab chiqilgan. U paytlari veb-saytlar statik bo’lgan (xuddi PDF hujjat sahifasi kabi). Netscape veb-sahifalarni “jonlantirish” missiyasi uchun boshida Java tilini tanlagan. Keyinchalik esa eng yaxshi yechim yangi til ishlab chiqish degan qarorga kelishgan. Yangi tilni JavaScript deb nomlash esa shunchaki Java ning o’sha paytdagi ommabopligidan foydalanish edi.

Internet Explorer ham 1995-yilda dunyo yuzini ko’rganda Netscape va Microsoft o’rtasida “urush” boshlangandi. JavaScript yaratilishi Netscape ga ustunlik bergani aniq edi. Microsoft esa kutib o’tirmay, JavaScript ni “reverse-engineering” qilib, u uchun o’zining JScript degan “engine”ini yaratadi. Albatta, ikki taraf JavaScript “engine”ini o’zicha implementatsiya qilgani uchun, ikkovining ishlashida farqlar sezilgan. O’zi HTML/CSS dagi standartlari har brauzerda har xil ekanligi yetmagandek, endi JavaScript ham ular qatoriga qo’shilgadi. "Best viewed in Netscape" yoki "Best viewed in Internet Explorer” kabi stikerlarni deyarli barcha veb-saytlarda ko’rish mumkin edi. Chunki bunaqangi xaos, betartibliklar davrida veb-sahifani barcha brauzerlarda birdek ishlashini taminlash dasturchilar uchun azob bo’lgan.

Endi o’zingiz mulohaza yuritib ko’ring. Bu muammoni, bu urushni qanday tugatish mumkin?

Albatta, hamma rioya qilishi kerak bo’ladigan standart/protokol ishlab chiqish kerak! Bu shunday **qoidalar to’plami** bo’lishi kerakki, u:

- Tilning sintaksisi va semantikasini

- Ichki (built-in) funksiyalar qanday ishlashini

tartibga solsin va:

- Yozilgan JS kod barcha “engine”larda bir xil ishlashini ta’minlasin

- Yangi “engine”lar uchun ham yo’riqnoma bo’lsin.

Netscape ham bozorda dominantlikni qo’lga kiritish uchun 1996-yil **Ecma International** tashkilotiga JavaScript ning ilk standartini taqdim qildi. 1997-yil esa tashkilot tomonidan ECMAScript deb nomlanga standart chiqarildi. Microsoft ning bu standartlashtitish jarayonida boshida qatnashganiga qaramay keyinchalik buni to’xtatib qo’yadi. Chunki Internet Explorer ning 2000-yillar boshidagi dominantligi, ularning JScript “engine”i standarti ustunligini ham belgilardi.

Vaqt o’tib Firefox, Chrome brauzerlari o’z JS “engine”larini (SpiderMonkey, V8) ECMAScript standarti bo’yicha ishlab chiqishdi. Undan tashqari Adobe Flash animatsiyalari uchun yaratilgan ActionScript tili ham shu standart bo’yicha implemetatsiya qilindi. Ma’lumki ActionScript bilan JavaScript sintaksisi bir xil. Negaligini tushundingizmi?

2015-yilda ECMAScript 6-versiyasi chiqqishi va Internet Explorer tugatilishi, dominant bo’lishga ulgurgan ECMAScript ni JavaScript tili uchun yagona standartga aylantirdi desak adashmagan bo’lamiz.

Xo’sh, shunda ECMAScript bilan JavaScript bitta narsa ekanmi?
