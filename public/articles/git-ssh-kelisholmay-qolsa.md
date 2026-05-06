---
layout: post
publishDate: May 23, 2023
title: Git va SSH kelisholmay qolsa
tags: git, ssh, devops
isListed: true
---

Github, Bitbucket'ga o'xshagan "repository-hosting-service"larga deyarli har doim SSH orqali bog'lanib, Git amallarini bajaramiz (clone, pull, push v.h.k). SSH aloqada albatta SSH sertifikat yaratib, "public-key"ni hosting servisga kiritib qo'yishimiz kerak bo'ladi.

Agar 2 ta Github akkaunt bo'lsa, har bittasi uchun alohida SSH sertifikat yaratish kerak. Lekin Git qaysi sertifikatni ishlatishni "qaerdan" biladi? 🤔

Yangi ishimda kechadan beri internal repo'ni klon qilolmay sochimni yulyotuvdim. Open-source repo'lar uchun shaxsiy Github akkauntimni ishlatishimni aytishdi. Lekin ichki repo'lar uchun faqat korporativ akkauntdagina ruxsat bor va ular ham Github'da. Tabiiyki ikkalovi uchun 2 ta sertifikat yaratganman. Git bo'lsa har safar shaxsiy akkauntim sertifikatidan foydalanayotgan ekan. Uniyam bugun anglab yetdim! 😖

Xo'sh, muammoni topdik! 🙂

Endi uni yechish kerak! ☹️

Qisqasi, qaysi hostlar uchun qaysi SSH sertifikatni ishlatishni aytish uchun **`.ssh` papkasida `config`** faylini yaratish kerak ekan. Men ham o'sha faylda `personal` va `work` degan host "alias"larni qo'shib, kerakli SSH-key'larni kiritib qo'ydim:

```
Host work
  HostName github.com
  IdentityFile ~/.ssh/id_rsa_work
  User git

Host personal
  HostName github.com
  IdentityFile ~/.ssh/id_rsa_personal
  User git
```

Keyin repo'ni kerakli "alias" bilan klon qildim:

```
git clone git@work:username/my-work-project.git
git clone git@personal:username/my-personal-project.git
```

Shunaqa. 😌
