---
layout: post
publishDate: Sep 11, 2024
title: Brauzerni buzgan CSS funksiya
tags: html, css, brauzer
isListed: true
---

Pinterest ilovasini dunyo bo’ylab salkam 600 million odam aktiv ravishda ishlatadi. Shuncha odam ishlatadigan platformada albatta har xil tillar uchun interfeys bor. Undan tashqari Pinterest vebsayti turli brauzerlarda, istalgan qurilmada xatoliklarsiz ishlashi taminlanishi kerak.

## O’ngdan chapga (RTL)

Men Pinterest dizayn sistemasi - Gestalt kutubxonasi ustida ishlaganim uchun, komponentlarda uchraydigan xatoliklarni tuzatish uchun ham javobgarman. Menga anchadan beri “backlog”da turib qolgan bir kichik vazifani yuklatishdi:

- O’ngdan chapga yoziladigan (RTL) tillar uchun Video progres paneli ham o’ngdan chapga ko’rinishida bo’lishi kerak.
- RTL tillari: arab, fors, urdu, ibroniy va boshqalar

LTR va RTL video komponentni solishtirib ko'rishingiz mumkin:

![LTR-video](images/ltr-video.png) ![RTL-video](images/rtl-video.png)


Ko’rib turganingizdek, RTL da nafaqat yozuv balki boshqa UI elementlari ham “akslantirilishi” kerak. **Albatta, istisnolarni hisobga olgan holda.** Bu yerda xatto video progres paneli ham o’ngdan chapga harakatlanadi. Ikonkalar esa 180 gradus teskari o’girilgan.

Shunday keyin, yana bir bug haqida vazifa kelib tushdi. Pinterest vebsaytining mobile versiayasida video kontrollerlari yo’qolib qolyotgan ekan.

![RTL-video-buf](images/rtl-video-bug.gif)

Bazida video umuman qotib qolyotgan emish. Boshida bu `z-index` yoki `position: absolute` tufayli bo’lyotgan odatiy xatolikdek tuyuldi. Chunki Video komponenti bu HTML video elementi va uning ustidan ko’rsatiladigan kontrollerlardan iborat edi. Tahminan shunday:

```jsx
<div style="position: relative;">
  <video src="..." />
	
  <Controls style="position: absolute;" />
</div>
```

Biroq… 

## Bug faqatgina iOS qurilmalarida sodir bo’layotgandi!

Desktop brauzerlarda va Android brauzerlarida xatolik umuman kuzatilmayotgandi. Faqat iOS qurilmalarida (iPhone, iPad) qanday brauzer bo’lmasin sodir bo’lyotgandi. O’ylab ko’ringa, bug faqat Chrome yoki Safarida emas, **iPhonega o’rnatilgan har qanday brauzerda chiqib kelaverardi**. 

Shuning o’zi ham maummo bizning kodda emas, brauzerda ekaniga signal edi. Lekin meni bunga ishonchim komil emas edi. Shunchaki ishongim kelmayotgandi!

## Debugging

Xullas, Pinterest vebsayti kodidan tortib, Gestalt kutubxonamizning kodlarigacha qatorma-qator, harfma-harf kovlab chiqdim. Lekin hech qayerda HTML Video elementini boshqa elementlardan tepaga chiqarib yuboradigan kodni topolmadim. 

Asl muammoni topolmagach, simptopmlar bilan kurashishga o’tdim. Eng birinchi ish bu bugni izolyatsiya qilishdir. Shuning uchun top-toza HTML sahifa yaratib unda oddiy HTML va CSSda Video komponentning prototipini yasadim.

![RTL-video-buf](images/video-svg-bug.gif)

Bug hali ham mavjud. Bildimki, muammo CSS da!

## Tuzatish

Ishonasizmi, hech qanday `z-index` bilan ham Video elementini kontrollerdan pastga tushura olmadim. Faqat mana shu usulgina ishladi xolos:

```diff
 <div style="position: relative;">
   <video src="...">
	
-  <Controls style="position: absolute;" />
+  <Controls style="position: absolute; z-index: 0" />
  </div>
```

 `Controls` eng tepada bo’lishi uchun unga `z-index: 0` qo’yish kerak emish! What!? 

Yana bir jinnicha “workaround” bu sahifaga mana buni qo’shish:

```diff
+ <div style="padding: 1%">
 
  <div style="position: relative;">
    <video src="...">
    <Controls style="position: absolute;" />
  </div>
```

> Nima bu? Nimasan san?

\- deb komment qoldirishga arziydigan tuzatish! 

Aynan nima sabab bilmadim, lekin mana shu 1% padding’i bor div qo’shilsa, xatolik o’z-o’zidan yo’qolib ketdi. Mening gumonim, `padding: 1%` brauzerni qayta hisoblashga va **sahifadagi piksellarni boshqacharoq usulda chizishga majbur qiladi.** Yana bilmadim.

## Asl muammoni topish

`z-index: 0` bilan qilingan tuzatishni boshqalarga ko’rsatib, bundan boshqa chora yo’qligini aytib, vazifani yopmoqchi edim. Lekin men CSS ga yengilganimni tan olgim kelmadi va asl muammoni topishga qattiqroq kirishdim. Vaholanki 2 kundan beri faqat shu vazifa ustida ishyotgan edim.

Oldinroq ishlatishim kerak bo’lgan strategiyani ishlatishni boshladim: **Binary elimination debugging**. Bu usul haqida 1 yil oldin [GDGda berga nutqimda](https://youtu.be/3Tr2Az3Jv8s?t=752) gapirganman.

Shu usulni ishlatganimda ayon bo’diki muammo ikonkalarda ekan! 

**Eslang, RTL da ikonkalar 180 gradusga teskari o’girilgan bo’ladi. Ikonkalar SVG elementlari edi.**

Xullas, asl mummo:

> Safari brauzerida HTML video elementi usiga `transform: translateY(...)` CSS qoidasi bo'lgan SVG elementi chiqarilsa, video elementi ishdan chiqadi.

Ishdan chiqish:
 - video qotib qoladi
 - video tasvir faqat qisman korinadi
 - ustida korishini kerak bo'lgan elementlardan tepaga chiqib ketadi
> 

Gestalt kutubxonasida RTL da ikonkalarni teskari o’girish uchun mana shu CSS kodi yozilgan edi:

```css
html[dir="rtl"] svg {
  transform: rotateY(180deg);
}
```

Bu kod `base.css` da joylashgan va aynan shu kod Pinterest vebsaytining video pleyerini ishdan chiqarishga yetarli bo’lgan.

Xatolikni tuzatish esa juda sodda - shunchaki `rotateY(180deg)` ni ishlatmaslik kerak. 

Chunki, muammo faqat `rotateY()` funksiyasida ekan. `rotate3d`, `rotateX`, `rotateX` va boshqa “aylantirish” funksiyalarda bug kuzatilmadi.

`rotateY(180deg)` o’rniga `scale(-1, 1)` ni ishlatish ham mumkin. Shuni ishlatib qo’yaverdim!

## Agar muammo mobile Safarida bo’lsa, nega boshqa brauzerlarda ham xatolik chiqqan?

O’sha kuni bildimki, iOSda ishlaydigan barcha brauzerlar mobile Safarining “render engine”ini  (Safari Webkit) ishlatar ekan. Surprise, surprise! 

iOS xavfsizlik nuqtai nazaridan boshqa brauzerlarni ham Safari “engine”ini ishlatishga majburlar ekan.

Lekin bu 2024-yil boshida o’zgardi va hozirda Chrome iOSda o’zining Blink “engine”ini ishlatadi. Manbaa: https://www.theverge.com/2024/1/25/24050478/apple-ios-17-4-browser-engines-eu

## Safari Webkit hozir xatolikni “patch” qilgan

Agar bugni hozir qayta “reproduce” qilmoqchi bo’lsangiz o’xshamaydi. Chunki tahminan 5-6 oylar o’tib buning iloji bo’lmay qoldi. Tushundimki, tuzatishgan.

Safari Webkitdagi bu qiziq bug aynan `rotateY` funksiyasida deb o’ylamayman. Katta ehtimollik bilan SVG larni render qilish bilan bog’liq xatolik. Agar Safari Webkit open-source bo’lganida, albatta o’sha zahoti Githubda “issue” ochgan bo’lardim.

## Xulosa

Xulosa shuki, ba’zida ayb siz yozgan kodda emas, u ishlaydigan muhitda bo’ladi. 

Shu bugni topganimda brauzerlar ham judaaa ishonchli emasligini, ular ham bir dastur ekanini tushunib yetganman.

Maqolani hujjat sifatida qoldirish uchun bugni to’g’rilash uchun jo’natgan PR ga va “reproduce” qiluvchi Github Gist ga link qoldiraman.

PR: https://github.com/pinterest/gestalt/pull/3202

Github Gist: https://gist.github.com/diyorbek/945189e3036552d2de34ae955a1605ee
