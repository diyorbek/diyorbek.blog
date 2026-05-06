---
layout: post
publishDate: Jan 25, 2023
title: Kodni qayerda izohlash kerak?
tags: code-quality, comments
isListed: true
---

![Kodni qayerda izohlash kerak?](/public/images/kodni-qayerda-izohlash-kerak-1.png)

Oxirgi paytlarda ko‘pincha komment yozib ketadigan vaziyatlarimda komment yozmaydigan bo‘ldim. Nega? Chunki kod haqidagi barcha ma’lumotni, metadata’ni commit message yoki PR (Pull Request) description’ga to‘liq yozib kelyapman. Agar nimanidir tushunmay qolsam darrov **GitLens** orqali kim, qachon kodni yozganini, commit message’ni va PR ni ko‘rib qo‘yman. **Ishoning, bu usul sizga boshqalar yozgan kodni ipdan-ignasigacha tushutirib qo‘yadi!**

Eng yaxshi ko‘rgan PR’larim - ichida muhokamalar ketganlari. Ayniqsa, shunchaki oydinlik kiritish uchun kiritilgan kommentariyalar (koddagi emas, PR’dagi). Ba’zida PR muhokamalari vaqtida **ahmoqona savol** deb o‘ylaydiganlarimiz 1 oydan keyin juda qimmatli ma’lumotga aylanarkan!

Hozir kodga komment yozishdan ko‘ra, **Github**’dagi PR’ga yozishni ma’qul ko‘ryapman. Bu “code review” paytida ham, keyinchalik o‘zingiz uchun ham tushunish uchun yengillik yaratadi.

## **Lekin komment yozish osonroq va soddaroq emasmi?**

To‘g‘ri. Lekin qaysi usulni qachon qo‘llashni bilish kerak. **Koddagi kommentlar kodingizning bir qismi**. U yerga qator-qator matn kiritishni hech kim yoqlamaydi. Ko‘payib ketsa, kodning sifatini oshirish o‘rniga uni yomonlashtiradi. Kodni o‘qish qiyinlashadi.

Kommentlar qisqa va lo‘nda bo‘lishi kerak. Bittada anglash qiyin bo‘lgan vaziyatlarda kontekstni yorituvchi izoh bo‘lishi kerak.

## **Kommentlar aldaydi, kod esa borini aytadi**

Eng yomoni ba’zida kommentariyalar noto‘g‘ri yozilishidir. Shunaqalari borki, komment bir narsa deydi, kodga qarasangiz boshqa narsa bo‘ladi. Buning sababi 2 ta bo‘lishi mumkin:

1. Avtor kommentni qisqa yozaman deb muhim detallarni qoldirib ketadi.
2. Avtor o‘zi yozgan koni to‘liq tushunmagan bo‘ladi.

**Aytgancha, o‘sha avtor ko‘pincha siz bo‘lasiz! Tan oling, bugun yozgan kodingizni bir haftadan keyin o‘zingiz tanimaysiz!**

## **Demak koddagi kommentlarini tashlab PR va commit orqali izoh qoldiraylikmi?**

Albatta yo‘q! Faqat bitta usul bilan ishlash hech bir sohada hech qachon samara bermagan. Muhimi, qaysi usuldan qachon foydalanishni bilish.

Hamma kompaniya/jamoalarda ham Git va uning atrofidagi texnologiyalar yaxshi ishlatilmaydi. Palapartish tuzilgan repozitoriylar ko‘p. Shuning uchun unday joylarda faqat kodga komment yozish mumkin xolos.

Lekin bu degani, vaziyatni o‘z holiga tashlab qo‘yish kerak degani emas. O‘zingiz ishlayotgan jamoa yoki shaxsiy loyihalaringizga e’tibor bering.

### **Quyidagi maslahatlarga amal qiling:**

- Avvalo Git ishlating!
- Commit’laringiz ixcham bo‘lsin. Bitta ish uchun bitta kommit!
- Commit message’larga prefiks qo‘shing: tuzatishlar uchun *“****fix****: ***”*, yangi narsalar uchun *“****feat****: ***”*, refaktor uchun *“****refactor****: ***”* va hokazo.
- Bitta vazifa uchun har doim alohida branch oching va ishni yakunlagach uni o‘chirib tashlang.
- Pull Request description qismida kodingizga iloji boricha ko‘proq ma’lumot va kontekst berib keting. Agar UI/UX ga aloqador bo‘lsa, skrinshotlardan foydalaning.

### **Va o‘zingizga savol bering:**

- Git’dan to‘gri foydalanyapmanmi?
- Commit message’lar ma’nolimi? Biror formatga egami yoki tilimga kelganini yozib tashlayapmanmi?
- Commit’larim ixchammi? Bir-biriga bog‘liq bo‘lgan narsalarni aralashtirib tashlamayapmanmi?
- Pull Request’lar formatga/shablonga egami? Nega degan savollarga javob yozilyaptimi?

Omad!
