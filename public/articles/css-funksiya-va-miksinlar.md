---
layout: post
publishDate: Aug 13, 2025
title: CSS Funksiya va Miksinlar
tags: css, frontend
isListed: true
---

Oxirgi yillarda CSSga juda ko'p imkoniyatlar qo'shildi. Yaqinda qo'shiladigan funksiya va miksinlar Sass, Less kabi preprotsessorlarga ehtiyojni yanada kamaytiradi. Bular:

## @function

```scss
@function --negative(--value) {
  result: calc(-1 * var(--value));
}

div {
  --padding: 20px;
  margin-inline: --negative(var(--padding));
}
```

CSS uchun funksiya tushunchasi begona emas: `calc()`, `rgb()`, `translate()` kabilarni har doim ishlatib kelganmiz. Endi esa o'zimiz maxsus (custom) funksiyalar yozsak bo'lar ekan.

Maxsus funksiyalar o'ta dinamik o'zgaruvchilarga o'xshaydi - Parametrlarga asoslangan dinamik qiymat.
Uning ichida har xil sharli ifodalar, xatto media-query'lar yozish mumkin. 😍

Oddiy misol, ekran o'lchamiga qarab shriftni katta ykoi kichik qilish:

```scss
@function --suitable-font-size() {
  --size: 16px;

  @media (width > 1000px) {
    --size: 20px;
  }

  result: var(--size);
}
```

Sal murakkabroq holat, konteyner o'chamiga qarab o'zgaruvchi shrift funksiyasi:

```scss
@function --at-breakpoints(
  --s: 1em;
  --m: 1em + 0.5vw;
  --l: 1.2em + 1vw;
) {
  @container (inline-size < 20em) {
    result: calc(var(--s));
  }
  @container (20em < inline-size < 50em) {
    result: calc(var(--m));
  }
  @container (50em < inline-size) {
    result: calc(var(--l));
  }
}

h1 {
  font-size: --at-breakpoints(1.94rem, 1.77rem + 0.87vw, 2.44rem);
  padding: --at-breakpoints(0.5em, 1em, 1em + 1vw);
}
```

Maxsus funskiyalar dizayn sistema va CSS kutubxonalarni abstraktsiyalash bilan ixchamlashtiradi va ularning ham imkoniyatini oshiradi.

## @mixin

```scss
@mixin --center-content {
  display: grid;
  place-content: center;
}

.card {
  @apply --center-content;
}
```

Funksiyalardan farqli, miksinlar qiymat emas qoidalar to'plamini beradi. Ular ham parametrlarga asoslangan bo'lishi mumkin. Yana defolt qiymatlar bersa ham bo'larkan! Shu jihatdan ularni "side-effect" funksiyalarga qiyoslash mumkin.

Misol uchun quyida gradient matn hosil qiluvchi miksin:

```scss
@mixin --gradient-text(
  --from: mediumvioletred;
  --to: teal;
  --angle: to bottom right;
) {
  color: var(--from, var(--to));

  @supports (background-clip: text) or (-webkit-background-clip: text) {
    --gradient: linear-gradient(var(--angle), var(--from), var(--to));
    background: var(--gradient, var(--from));
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
}

h1 {
  @apply --gradient-text(pink, powderblue);
}
```

## Bular o'zi qachon kerak?

Bor ekan deb ishlatib ketaverish yaramaydi, albatta. Katta ehtimollik bilan bular siz "overengineer" qilib yuborgan vizitka saytingiz uchun kerak emas. Aynan zarur bo'ladigan holatlar:

1. Light/Dark Theme boshqaruvi
2. Ko'p takrorlanuvchi, uzun, murakkab qoidalar to'plamini umumiylashtirish
3. Dizayn sistemada shrift, spacing kabi xususiyarlar uchun. Aynan, ularning dinamikasini abstraktlashtirish
4. Dinamik ranglarga asoslangan elementlarni stillash
5. Kontekstga asoslangan `@media`, `@supports`, `@container` kabi query'lari bor stillar uchun.

Aslida CSSning hozida mavjud imkoniyatlari bilan bular muammo emas. Maxsus funksiyalar va miksinlar beruvchi asosiy ustunlik bu - **abstraksiya**!

Undan tashqari, Sass, Less kabi preprotsessorlarda funksiyalar va miksinlar anchadan beri bor. Ammo CSS funksiya va miksinlar "cascade" asosiya ishlaydi, "copy&paste" asosida emas! Bu sayt yuklaydigan CSS hajmini kamaytiradi.

_Chrome 139 versiyasidan boshlab CSS funskiya va miksinlarni ishlatish mumkin. Hozir ham canary versiyani o'rnatib sinab ko'rishingiz ham mumkin ekan._

## Manbaalar

- [Github Proposal](https://github.com/w3c/csswg-drafts/issues/9350)
- [Draft Specs](https://drafts.csswg.org/css-mixins/)
- [Medium'dagi maqola](https://medium.com/@projectluis/native-css-functions-mixins-a-glimpse-into-the-future-ce6096191ee8)
