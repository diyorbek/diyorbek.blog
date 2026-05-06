---
layout: post
publishDate: Jan 20, 2023
title: Nega "useCallback"ni ishlatish ba'zida yomon?
tags: react, js, performance
isListed: true
---

Komponentlar optimizatsiyasi uchun `React.useCallback` ni ishlatishimiz kerakligini ko'p eshitamiz. Chunki "inline" funksiyalar kodimiz tezligiga tasir qilishi mumkin. Lekin bu har doim ham to'g'ri emas (hayotdagi ko'p narsalar kabi).

Quyidagi misolni olaylik:

```jsx
function CandyDispenser() {
  const [candies, setCandies] = React.useState(initialCandies);
  const dispense = candy => {
    setCandies(allCandies => 
      allCandies.filter(c => c !== candy)
    );
  };
  
  return (
    <ul>{candies.map(candy => (
      <li key={candy}>
        <button onClick={() => dispense(candy)}>grab</button>
        {candy}
      </li>
    ))}</ul>
  );
}
```

Shu komponentda `dispense` funksiyasi "inline" qilib yozilgan. Uni `React.useCallback` bilan o'raymiz.

```js
const dispense = React.useCallback(candy => {
  setCandies(allCandies => allCandies.filter(c => c !== candy));
}, []);
```

Mulohaza qilib ko'ring, qaysi usul komponentimiz ishlashiga yomon ta'sir qiladi?

.

.

.

.

.

.

`React.useCallback` bilan yozilgan kodni sal o'zgartiraman:

```js
const dispense = candy => {
  setCandies(allCandies => allCandies.filter(c => c !== candy))
};
const dispenseCallback = React.useCallback(dispense, []);
```

Mana bu eng birinchi variantimiz. Solishtiring:

```js
const dispense = candy => {
  setCandies(allCandies => allCandies.filter(c => c !== candy))
};
```

Nima o'zgardi?

Ha, shunchaki mana shu bir qator kodni kiritibmiz xolos:

```js
const dispenseCallback = React.useCallback(dispense, []);
```

Bu ikki holatda ham kodimiz bir xil ishlaydi. **LEKIN** 2-usulda biz ko'proq ish bajaryapmiz! `React.useCallback` ni chaqirib, uning ichida bo'ladigan barcha logikalarni ham koponentimiz ichiga tashiyapmiz. Yetmaganiga yoniga massiv (`[]`) ham e'lon qilyapmiz.

Shuning uchun ham bu misolda `React.useCallback` ishlatish bizga foydadan ko'ra ko'roq zarar beradi. Agar `React.useCallback(()=>{})` qilish o'rniga yuqoridagidek argumentni alohida e'lon qilib, `React.useCallback(dispense)` qilib chaqirsak, xotiradan yana yutqazamiz. Chunki biz "closure" paydo qilib qo'yganimiz uchun, o'sha alohida e'lon qilingan `dispense` "garbage-collect" qilinmaydi.

### Unda bizga React.useCallback ning nima keragi bor? Shunga bosh og'riq bo'lsa, umuman ishlatmasak bo'ladiku?

`React.useCallback` , `React.useMemo` kabi huklar nega mavjudligini eslab olaylik.

1. `React.useCallback` - komponentda e'lon qilingan funksiyani renderlar oralig'ida kesh (cache) qilish uchun ishlatiladi. Uning davomiyligini "dependecy-list" belgilaydi. Agar "dependency-list" dagi biror element o'zgarsagina funksiya qaytadan kesh qilinadi.
2. `React.useMemo` - komponentda e'lon qilingan kompyutatsiyasi og'ir bo'lgan o'zgaruvchi qiymatlarni renderlar oralig'ida kesh (cache) qilish uchun ishlatiladi. Uning ham "dependency-list" idagi biror element o'zgarsa qiymat qaytadan hisoblanib kesh qilinadi.

Keltirgan misolimda aslida e'tibor berish kerak bo'lga joy ancha pastroqda edi:

```jsx
<button onClick={() => dispense(candy)}>grab</button>
```

Komponent har safar qayta render qilinganda `button` ning `onClick` propini yangidan beryapmiz. Biz shunday qilishga majburmiz, chunki `dispense` ni undan tashqaridagi "scope"da turgan `candy` bilan chaqirish uchun. **Bu yerda `dispence` kesh qilinganmi, yo'qmi, farqi yo'q! **

### Qachon farqi bo'ladi?

Mana bu holatda:

```jsx
export default function App() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(c => c + 1);

  return (
    <div className="App">
      <Counter value={count} onClick={increment} />
    </div>
  );
}

function Counter({ value, onClick }) {
  React.useEffect(
    () => console.log("Counter reconcile!!!"), 
    [onClick]
  );

  return <button onClick={onClick}>click {value}</button>;
}
```

Ko'rinib turibdiki `Counter` ichida `onClick` propiga tobelik mavjud. U har safar o'zgarganida `React.useEffect` amal bajaryapti.

![Nega "useCallback"ni ishlatish ba'zida yomon?](/public/images/nega-usecallback-yomon-1.gif)

Har safar `count` o'zgarganda bu komponentlar re-render qilinadi va `increment` funksiyani har safar qayta e'lon qilinadi. "Dependency-list" elementlari agar primitiv bo'lmasa, "reference" orqali taqqoslanadi. Shu sabab `onClick` har renderda yangidan yaratilyotgani uchun  `React.useEffect` har safar ishlayveradi. Tasavvur qiling-a, bu effekt ichida `console.log` emas, biror muhim logika yozilgan bo'lsa nima bo'lardi?

Buni tuzatish uchun endi `React.useCallback` ishlatsak to'g'ri bo'ladi:

```js
const increment = React.useCallback(() => setCount(c => c + 1), []);
```

![Nega "useCallback"ni ishlatish ba'zida yomon?](/public/images/nega-usecallback-yomon-2.gif)

Bunday holatda  `React.useCallback` ishlatmaslik `App` komponenti ichida joylashgan,  `React.useCallback` siz proplari bor barcha komponentlar ishlashini yomonlashtiradi.

Tepadagi misolda 2 ta `Counter` komponenti bo'lganida nima bo'lardi?

```jsx
export default function App() {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);
  const increment1 = () => setCount1(count=>count + 1);
  const increment2 = () => setCount2(count=>count + 1);

  return (
    <div className="App">
      <Counter value={count1} onClick={increment1} />
      <Counter value={count2} onClick={increment2} />
    </div>
  );
}
```

![Nega "useCallback"ni ishlatish ba'zida yomon?](/public/images/nega-usecallback-yomon-3.gif)

Nima bo'lyotganini tushundingizmi?

Ikkinchi `Counter` ga umuman tegilmagan bo'lsa ham undagi `React.useEffect` ishlab ketyapti. Chunki birinchi komponent `count` ni o'zgartirganda, qayta render bo'lgan paytda nafaqat `increment1`, balki `increment2` ham qayta e'lon qilinyapti. Shu sabab bu ikkkinchi `Counter` komponentidagi effektlar ishlab ketishiga, umuman, re-render bo'lishiga olib keladi.

### Xulosa

Ko'p holatlarda bunday ortiqcha renderlarni optimizatsiya qilish shart emas va arzimaydi. Lekin bu dasturingizda juda ko'p joyda uchrayotgan muammo bo'lsa, yoki shu muammoli komponent ko'p va qayta qayta ishlatilayotgan bo'lsa, buni albatta tuzatish kerak. Dasturning noto'g'ri ishlashiga ta'sir qiluvchi holatlarni gapirmasam ham bo'ladi.

Qisqasi shuki, bu utilitlarda oqilona va faqat kerakli vaziyatlarda, ya'ni ishlatish "makes sense" qiladigan joylarda foydalaning.

> Har qanday optimizatsiya "tekin"ga kelmaydi, uning o'ziga yarasha "narxi" bo'ladi. Eng yomoni shuki, optimizatsiyadan oladigan foydangiz o'sha "harajat"ingizni har doim ham qoplamaydi.

*Maqolani yozishda ushbu manbaadan foydalanildi: *[*https://kentcdodds.com/blog/usememo-and-usecallback*](https://kentcdodds.com/blog/usememo-and-usecallback)
