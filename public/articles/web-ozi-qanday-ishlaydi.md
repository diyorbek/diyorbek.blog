---
layout: post
publishDate: Apr 6, 2021
title: Web o'zi qanday ishlaydi?
tags: web, frontend, backend
isListed: true
---

Web-dasturchi bo'lishni niyat qilganlar uchun web va web-texnologiyalari haqida qisqacha maqola.

![WWW](/public/images/hdww/www.jpg)

Web o'zi nima?
--------------

World Wide Web (WWW) ingliz tilidan "Butun jahon o'rgimchak to'ri" deb, yoki to'liqroq, "Yer yuzicha kattalikdagi o'rgimchak to'ri" deya tarjima qilinadi. WWWni yoki webni internet bilan adashtirmaslik kerak. Agar qisqacha tushintrilsa, internet bu eng katta kompyuter tarmo'gidir, ya'ni butun dunyodagi kompyuter tarmoqlarini bog'lab turuvchi gigantik infrastruktura. Web esa internetda (internet orqali) ishlovchi ma'lumot almashish sistemasidir. Yanada soddalashtirsak: internet - bu kompyuter, web esa undagi bir dastur.

Web nafaqat web-saytlar, balki e-mail, messenjerlar, video muloqot dasturlari va shu kabi boshqa dasturlar ishlash tizimini qamrab oladi. Shu dasturlardan foydalanayotganda ular serverlar bilan muloqot qilishadi. Sodda qilib aytganda, serverlarni internetdagi xizmat ko'rsatuvchi, kun-u tun ishlab turadigan kompyuterlar deb qarasak bo'ladi. Ular vazifasiga ko'ra farqlanadi. Masalan, web-serverlar o'zida web-sayt sahifalari, undagi ma'lumotlarni saqlaydi. Serverlar o'zlarining maxsus takrorlanmas IP (unique IP) adresiga ega. Shu IP adres orqali biz internetda o'zimizga kerakli serverni topib muloqot qilamiz. Qizig'i shuki, agar xohlasangiz siz ham internet provayderingizdan statik IP adres sotib olib shaxsiy kompyuteringizni serverga aylantirishingiz mumkin. O'sha IP adres orqali dunyoning istalgan burchagidan sizning "server"ingiz bilan bog'lanish mumkin bo'ladi.

Web-saytga kirganda nimalar ro'y beradi?
----------------------------------------

Web-saylarning ishlash prinsipi juda oddiy. Web-sayt serverda joylashgan. Brauzer serverga **maxsus so'rov (request)** jo'natadi va unga mos **javob (response)** qabul qiladi. Qabul qilingan ma'lumotlar (xususan fayllar) asosida brauzer web-sahifani vizual ko'rinishga olib keladi. Serverdan yuklab olinadigan asosiy fayllar - HTML, CSS va JavaScript fayllaridir.

URL va DNS (Domain Name System)
-------------------------------

Keling misol uchun Wikipedianing internet haqidagi sahifasini olamiz. Link: [https://en.wikipedia.org/wiki/Internet](https://en.wikipedia.org/wiki/Internet). Link URL(Uniform Resource Locator) ham deyiladi, ya'ni umumiylashtirilgan (yoki birlashtirilgan) resurs ko'rsatuvchisi (yoki aniqlovchisi).

![Address bar](/public/images/hdww/urlbar.png)

Bu yerda `wikipedia.org` web-sahifa "domain name"idir. Uning oldidagi `en.` subdomain deyiladi (batafsil keyinroq). `wiki/Internet` esa "path"(so'qmoq) yoki "route"(yo'l) deb nomlanadi. Ya'ni biz web-saytning `wiki/Internet` "path"ida joylashgan resursni (sahifani) ko'rmoqchimiz.

Enter tugmasini bosishimiz bilan birinchi sodir bo'ladgan narsa, brauzer biz kiritgan manzil bilan DNS serverga maxsus so'rov (request) jo'natadi. DNS serverni o'zida web-sayt adreslari va ularning IP adreslarini saqlovchi kompyuter deb qarasak bo'ladi. Hozir unga request jo'natsak bizni Wikipedianing mos IP raqamli severga yo'naltiradi. Aslida, web-saytlarga ularning IP adresini brauzerga yozish orqali ham kirish mumkin, faqat IP adresdan ko'ra "domain name"lar qulayroq.

Request va HTTP/HTTPS
---------------------

Endi so'rovimiz Wikipedianing serveriga jo'natildi. Shu joyda e'tiborimizni URLning `https://` qismiga qarataylik. Internetda requestlar turli protokollar asosida amalga oshiriladi. Protokollarni kompyuter tarmog'idagi kommunikatsion standart turlari deb tushinsak bo'ladi. Brauzerimiz va web-sayt serverlari o'zaro asosan HTTP (Hypertext Transfer Protocol) requestlar orqali muloqot qiladi. HTTPS (Hypertext Transfer Protocol Secure) HTTPning xavfsiz versiyasi bo'lib, u orqali ma'lumotlar shifrlangan (encrypted) holatda uzatiladi. Ya'ni o'rtada kimdir ma'lumotlarini ushlab olish imkoniyati bo'lsada, uni o'qiy olmaydi.

Bizning Wikipediaga qilayotgan requestimiz HTTPS, hammasi joyida 🙂.

Keling endi brauzerimizning Developer tools (yoki dasturchi uskunalari) oynasini ochamiz. Bu oyda barcha brauzerlarda mavjud, uni ochish uchun F12 tugmasini bosish yetarli. So'ngra oynadagi Network menyusini tanlaymiz. Bu menyuda brauzer orqali bajarilgan va bajarilayotgan requestlarni ko'rishimiz mumkin. Agar sizda bu jadval ko'rinmayotgan bo'lsa, sahifani qayta yuklab olsangiz jadval ham qayta yuklanadi.

![Network tab](/public/images/hdww/networktab.png)

Ko'rib turganingizdek eng birinchi request bu "Internet", ya'ni web-sahifaning o'zini yuklab olish uchun jo'natilgan. Endi o'sha request ustiga bosamiz va Headers menyusidagi General bo'limiga qaraymiz.

![Request headers](/public/images/hdww/reqheaders.png)

Bu yerda requestimiz status kodi 200, ya'ni muvaffaqiyatli yakunlangan ([HTTP status kodlari ro'yxati)](https://httpstatuses.com/). **Remote Address** satrida esa web-sayt serverining IP adresi ko'rsatilgan. **Request Method,** jo'natilgan request uslubi yoki turi, bu yerda **GET.** Ma'nosi shuki, requestimiz serverga hech qanday ma'lumot jo'natmaydi faqat qabul qiladi ([HTTP request metodlari ro'yxati](https://www.restapitutorial.com/lessons/httpmethods.html)).

Response
--------

Response menyusini ochganimizda deyarli hammaga tanish HTML kodni ko'rishimiz mumkin. Buni bizga web-sayt serveri so'rovimiz asosida jo'natdi.

![response html](/public/images/hdww/resphtml.png)

Preview menyusini ochganimizda bizga jo'natilgan HTML koding vizual variantini ko'rishimiz mumkin. Lekin bu ko'rinish brauzerning o'zidagi ko'rinishda tamoman farq qiladi. Sababi, bu yerda biz faqat HTML hujjat o'zinigina ko'ryapmiz. Bu - sahifaning ko'rinishini boyituvchi ma'lumotlar, rasmlar, CSS va JavaScript fayllar hali yuklanmagan bosqichdagi holati.

![response preview](/public/images/hdww/resppreview.png)

Requeslar jadvaliga qaytamiz. Jadvalning "Initiator" ustuniga qarasangiz qolgan requestlarni sahifaning o'zi initsializatiya qilgan. Bu requestlar o'sha biz aytgan rasm(webp/png), CSS(stylesheet) va JavaScript(script) fayllarni yuklab olish uchun jo'natilgan.

![request initiators](/public/images/hdww/reqinitiators.png)

Jadvaldagi barcha requestlar muvaffaqiyatli yakunlangach web-sahifa kutilgan ko'rinishga keladi.

Backend
-------

Web-sayt serverlariga requestlar jo'natilishi haqida ko'p gaplashdik. Albatta, ular o'z-o'zidan response qaytarmaydi. Ular requestlarni qabul qilish, ularni qayta ishlash va response qaytarish uchun dasturlanadi. Wikipedia sayti misoliga qaytsak, biz unga internet haqidagi maqolani request qildik, server requestni qabul qildi va shu asosda o'zining ma'lumotlar bazasidan o'sha maqolani topib bizga response jo'natdi. Bu jarayon **Request Handling** (so'rovlar bilan ishlash) deb nomlanadi va webning **Server-Side** yoki **Backend** dasturlashning muhim qismi hisoblanadi Backend o'zi ancha katta soha va mavzu bo'lib, biz hozir uning boshlang'ich tushunchasini ko'rib chiqyapmiz xolos.

Texnik tarafdan olinsa, backend istalgan dasturlash tiidan foydalanib dasturlanishi mumkin. Chunki, server bu - kompyuter, u bilan aloqa qilish esa unda ishlayotgan dasturga bog'liq. Ommabop server-side dasturlash tillari: Python, PHP, Java va boshqalar. Bu tillar backend dasturlashni yengillashtiruvchi o'zlarining freymvorklariga ega. Masalan, PHPda Laravel, Yii; Pythonda Django va boshqa freymvorklar mavjud.

Frontend
--------

Brauzer web-sahifani vizuallashtirishi uchun unga eng birinchi HTML(Hyper Text Markup Language) hujjat zarur. HTML hujjat sahifa elementlari va strukturasini belgilab beradi. Sahifa elementlarini stilizatsiya qilish, ularga yanada vizual bezak berish uchun CSS(Cascading Style Sheets)dan foydalaniladi. CSS fayl HTML hujjat elementlari uchun stilizatiya qoidalari to'plamidan iborat bo'ladi. Sahifaning interaktiv va dinamik bo'lishi uchun esa JS(JavaScript)dan foydalaniladi. Tugmachalarning bosilishidagi amallardan tortib, brauzerda o'ynaladigan 3D o'yinlargacha JS orqali qilinadi.

Web-sahifalar faqat va faqat mana shu 3 ta texnologiya (HTML, CSS, JS) asosida ishlaydi va bu **Browser-Side** yoki **Frontend** dasturlashing asosini tashkil qiladi. Frontend uchun juda ham ko'p freymvork va kutubxonalar mavjud. Masalan, React, Angular, Vue.js kabi freymvork/kutubxonalar murakkab interfeys va xususiyatlarga ega sahifalarni (web-application) yaratish uchun keng qo'llaniladi. Bootstrap, MaterialUI, SemanticUI kabi freymvorklar o'zidan tayyor stilizatsiya qilingan funksional komponentlar va ko'plab boshqa yordamchi funksiyalarni taqdim qiladi.

Shunday qilib, bu web va undagi texnologiyalar haqida qisqacha, iloji boricha sodda qilib yozishga harakat qilingan maqola edi. Umid qilamanki, web haqida tushunchangiz oldingidan biroz bo'lsada kengaydi.

O'rganishdan to'xtamang. Omad!