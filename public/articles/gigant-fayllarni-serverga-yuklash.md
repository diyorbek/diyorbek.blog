---
layout: post
publishDate: July 14, 2025
title: Gigant fayllarni serverga yuklash
tags: js, frontend, backend, professional
isListed: true
---

![sync-dropbox](/public/images/sync-dropbox.png)

3 oycha oldin Dropbox kompaniyasida offer oldim. Mening dizayn sistemalari bo’yicha tajribam va texnik suhbatlardagi natijalarim ularga juda yoqib tushdi.

Texnik suhbatlarning birida aynan fayl yuklanishi ustida ishlagan senior frontendchi bor edi. Suhbat oxirida undan katta fayllar qanday yuklanishi haqida so’radim. Chunki o’zim ham pet-proyektim uchun 100MB dan oshiq fayllar yuklanishini optimizatsiya qilish haqida bosh qotirib yurgandim.

## Parallel yuklash

Men o’zim sinab ko’rgan usul, faylni mayda bo’laklarga bo’lib, parallel ravishda “upload” qilish edi. Server esa, barchasi yuklangach bo’laklarni qayta yig’adi.
20-25MB lik bo’laklar (chunk) mening loyiham uchun yaxshi natija ko’rsatayotgan edi. Bu usul fayl yuklanishini 10-30% gacha tezlashtira olardi.

Mening savolim shu bo’ldiki:

Aytaylik, 2GB fayl qanday qilib parallel yuklanadi? Agar uni ham 20MB lik “chunk”larga bo’lsak, ~100 ta parallel fetch/XHR so’rovnoma jo’natishga to’g’ri keladi. Umuman brauzer “fetch” chaqiruvlariga limit qo’yadimi?\*\*

Katta “chunk”larga bo’lish, masalan har bir bo’lakni 500MB qilish ham unchalik yaxshi yechim emas. Sabablari:

### **Xotira**

1. **Brauzer:** Katta fayllar yuklanganda, brauzer butun faylni xotiraga yuklaydi. Bu degani RAM to’lib, brauzer qotib qolishi mumkin degani.
2. **Server:** Server ham qabul qilinayotgan ma’lumotni yuklanish to’xtamaguncha xotirada saqlaydi. Bu ham server katta bosim ostida qoladi degani.

### Tarmoq

1. So’rovnoma timeout berishi mumkin. Internet tezligi yaxshi bo’lmasa, 500MB ni yuklash aaaancha vaqt olishi mumkin.
2. Brauzer, proksi, gateway, CDN, load balancer kabi klient va server orasida turuvchi vositalar limiti, timeout berishi, ularning “bandwidth”ini ham inobatga olish kerak.

… xullas, bosh og’rig’i ko’p.

## Ketma-ket parallel yuklash

_Bu usul nomini bilmayman. Shunga shunaqa deb qo’yaverdim._

O’sha senior frontendchining javobiga ko’ra Dropbox fayllarni bo’laklab yuklaydi. Har bir bo’lak ~16MB atrofida bo’ladi. Unda 2GB fayl qanday yuklanadi?

2GB fayl uchun bu 2048 / 16 = 128 ta bo’lak degani. Ya’ni 128 ta yuklash so’rovnomalari.

**Brauzerda, albatta, bir payting o’zida yuzlab “fetch” qila olmaysiz. Odatda brauzerlar _har bir domen uchun_ 6-8 ta parallel fetch/XHR so’rovnomalarga ruxsat beradi.**

Demak, tabiiy yechim bu — **6 ta bo’lakda iborat to’plamlar** hosil qilish. Har bir to’plamni parallel ravishda yuklaymiz. **To’plamlarning o’zini esa ketma-ket yuklab boramiz.**

To’plam deganda biz shunchaki parallel yuklanadigan 6 ta bo’lakni nazarda tutamiz xolos. Asosiy urg’u baribir bo’laklarning o’zida bo’ladi. Chunki server ularni qayta yig’ishi kerak bo’ladi.

## Server bo’laklarni qanday yig’adi?

Har bir bo’lakni yuklovchi so’rovnomada qo’shimcha ma’lumotlar ham jo’natiladi. Dropbox so’rovnomalarida **`Dropbox-Api-Arg`** degan “header” bor. Unda ushbu ma’lumotlar **frontend tomondan serverga** jo’natilar ekan:

```json
{
  "cursor": {
    "session_id": "pid_upload_session:AFAJbe...",
    "offset": 0
  },
  "close": false,
  "content_hash": "27c4339a9f6e9232b719890e72e99330"
}
```

Shu yerda `cursor.offset` qiymatiga e’tibor bering. Endi quyidagi bo’lakdagi `cursor.offset` ga e’tibor bering:

```json
{
  "cursor": {
    "session_id": "pid_upload_session:AFAJbe...",
    "offset": 16777216
  },
  "close": false,
  "content_hash": "d2418c7280671a43a29c4b7925f99dfe"
}
```

16777216 — bu 16 \* 2^20 degani.

Har bir bo’lak 16MB ekanini eslaylik. Bu degani 2-JSON 2-bo’lakka tegishli.

Demak Dropbox serveri `cursor.offset` dagi songa, ya’ni qabul qilingan “chunk” qaysi baytdan boshlanishiga asoslanib, ularning ketma-ketligini aniqlay oladi. `close` qiymatining `true` yoki `false` ekaniga qarab oxirgi “chunk” aniqlansa kerak. Sababi `cursor.offset` orqali tartiblash yetarli edi deb o’ylayman. Balki men ko’zdan qochirayotgan detal bordir. 🤷‍♂️

Xullas, shu asnoda bo’laklarimiz serverda qayta yig’ilib, butun faylga ay1lantiriladi. Yetarlicha sodda va ishonchli sistema. Ammo kichik xato ham faylning buzilishiga olib kelishi mumkin.

## Content Hashing

`content_hash` — jo’natilayotgan bo’lakning takrorlanmas xos belgisi. Shu ma’lumotga asoslanib bo’laklarning butunligini va eng so’ngida faylning butunligini tekshirish mumkin. Hash qilishi haqida chuqurroq o’rganishni maslahat berardim; juda qiziq mavzu.

Bu ma’lumotning yana bir muhim jihati shundaki, undan foydalanib, fayl yuklanishini to’xtagan joyidan davom ettirish mumkin!

Faraz qiling, 2GB fayl yuklayapsiz va 80% ga kelganida internet o’chib qoldi. Yoki sahifa yopilib ketdi. O’sha faylni qayta yuklayman desangiz, fayli to’liq boshidan yuklashga to’g’ri keladi. o’sha 80% dan davom ettirsa bo’ladimi? Ha!

Faylni qayta yuklar ekanmiz, u oldingiday bir xil 16Mb lik bo’laklarga bo’linadi. Tabiiyki ularning hashlari ham bir xil bo’ladi. Shu orqali ma’lum bir fayl qayta yuklanganda serverdan aynan qaysi bo’laklar kerakligini so’rab olish mumkin. Keyin esa faqat o’sha bo’laklarni jo’natish orqali, oldingi progressni saqlab qolish mumkin. Bu usul yuklashni pauzaga qo’yishda ham ishlatiladi.

Dropboxning va bosha shunday servislarning asosiy samaradorlik mexanizmi ham shu — fayl sinxronizatsiyasida faqat o’zgargan qismlarni yuklash.

Qizig’i Dropbox vebsaytini biroz kovlashtirganimda, bu mexanizmni ko’rmadim. Balki sinchiklab e’tibor berish kerakdir? 🤷‍♂️

## Xulosa

Suhbat mobaynida bularning hammasini gaplashganimiz yo’q, albatta. Shunchaki umumiy holatda tushuntirib berishdi. Yozganlarimning yarimini o’zim keyinchalik izlanib, yaxshilab ko’rib chiqdim.

Texnik suhbatlar oxiridagi savollar ham baholanadi. Qanchalik yaxshi, qiziq savol bersangiz intervyu oluvchi insonda yaxshi taassurot qoldirasiz. Ayniqsa shunga o’xshash savollar bo’lsa. Bu sizning texnik bilimingiz va tajribangizday so’ylaydi!

Undan tashqari bu siz uchun kompaniyadagi yetakchi dasturchilar uchun suhbat qurish imkoni. Savollaringiz texnik bo’lishi shart emas. Muhimi qiziq va professional bo’lsin.

Juda ko’p texnik suhbatlarda bo’lganim uchun, oxirgi paytlarda bunday suhbatlar menga konsultatsiyadek bo’lib qoldi. O’zim bilmagan narsalarni shunaqa so’rab oladigan bo’ldim. 😬
