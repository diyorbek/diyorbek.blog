---
layout: post
publishDate: Dec 4, 2022
title: React'da input uchun useState ishatish SHART emas!
tags: react, js
isListed: true
---

React bilan ishlaydigan frontendchilar boshqariladigan va boshqarilmaydigan ("controlled" va "uncontrolled") input farqlarini tushunishadi.  Agar input elementi state orqali boshqarilsa, bu boshqariladigan input hisoblanadi:

```jsx
const [name, setName] = useState('');
return (
  <input
    name="firstName" 
    value={value}
    onChange={(e) =>
       setName(e.target.value)
    }
  />
);
```

Agar input elementi qiymatini hech qanday state'ga bog'lamay render qilsak, bu boshqarilmaydigan input bo'ladi:

```jsx
return <input name="firstName" />;
```

Boshqarilamydigan input'larning qiymatini state'siz ham o'qisak bo'ladi. Buning bir necha usullari bor. Eng ko'p ishlatiladigani`useRef` bo'lsa kerak:

```jsx
const inputRef = useRef();

useEffect(()=>{
  console.log(inputRef.current?.value);
});

return <input ref={inputRef} />;
```

Bu usuldan foydalansak har safar input o'zgarsa komponent re-render qilinmaydi. Aynan shu sababli ham ko'pincha boshqarilmaydigan input'lar boshqariladiganlaridan ishlash tezligi va samaradorligi bilan ustunroq turadi.

Keling kattaroq forma misolini ko'ramiz. Aytaylik shu forma submit qilinganda qiymatlar konsolga chiqsin.

![React'da input uchun useState ishatish SHART emas!](/public/images/reactda-input-uchun-usestate-shart-emas-1.png)

Agar shu formani `useState` ishlatib yasasak, kod mana bunday bo'ladi:

```jsx
const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ firstName, lastName, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={firstName}
        onChange={({ target }) => setFirstName(target.value)}
        placeholder="First name"
        type="text"
        name="firstName"
        required
      />
      <input
        value={lastName}
        onChange={({ target }) => setLastName(target.value)}
        placeholder="Last name"
        type="text"
        name="lastName"
        required
      />
      <input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        placeholder="Email address"
        type="email"
        name="email"
        required
      />
      <input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder="Password"
        type="password"
        name="password"
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};
```

*Bu yerda har bir input uchun state ishlatmasdan bitta obyekt saqlaydigan state ishlatsak ham bo'lardi. Lekin `useState`ni primitiv tipdagi qiymatlar bilan ishlatish tavsiya qilinadi.*

Xullas bu kod ishlaganda har safar biror input qiymati o'zgarsa butun forma re-render qilinadi. Daxshat-a?

Agar `useRef` bilan shu kodni yozsak ko'p narsa o'zgarmaydi. Eng qizig'i bu yerda hatto `useRef` ishlatmasdan ham kerakli natijaga erishsak bo'ladi. Albatta JavaScript built-in xususiyatlaridan foydalanib!

```jsx
const Form = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(Object.fromEntries(formData.entries()));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="First name" type="text" name="firstName" required />
      <input placeholder="Last name" type="text" name="lastName" required />
      <input placeholder="Email address" type="email" name="email" required />
      <input placeholder="Password" type="password" name="password" required />

      <button type="submit">Submit</button>
    </form>
  );
};
```

50 qatorlik kod endi 17 qator!

E'tibor bering, bu yerda hamma ishni forma submit qilinganda qilyapmiz. <form> elementi orqali `FormData` yaratish mumkin va o'sh `FormData` qiymatlarini biz bemalol obyektga aylatira olamiz. Natija bir xil bo'ladi va `useState`lardan, keraksiz re-render'lardan qutilamiz.

```js
const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  console.log(Object.fromEntries(formData.entries()));
};
```

## Lekin!

"O'zi bunday qilish to'g'rimi?" degan savol tug'ilgan bo'lsa, to'gri o'ylabsiz! React input'lar har doim boshqariladigan bo'lishini tavsiya qiladi. Chunki React'ning virtual DOMi brauzerning asl DOMi bilan konfliktga uchrab qolishi ehtimoli bor. Boshqarilamaydigan input qiymati o'zgarishi virtual DOMda aks etmaydi. Shuning uchun React virtual DOMga qarab asl DOMga o'zgartirish kiritganda ba'zida kutilmagan xatoliklar yuzaga keladi.

Esdan chiqarmaslik kerak React ancha "yetuk" kutubxona. Unda re-renderni oldini olish uchun yaxshigina optimizatsiyalar qilingan. Shunday ekan bu haqida unchalik ko'p qayg'urish shart emas.

Undan tashqari, forma validatsiyasi har bir qiymat o'zgarishiga bog'lanishi kerak bo'lsa, boshqariladigan input ishlatishdan yaxshiroq yo'l yo'q. Masalan, noto'g'ri qiymat kiritilganda "Submit" tugmasini darrov o'chirib qo'yish boshqariladigan input ishlatishni talab qiladi. "Formik"ga o'xshagan kutubxonalar ham validatsiya uchun baribir boshqariladigan komponentlardan foydalanadi.

Xullas kalom, ikkala usulning ham o'z ishlatilish o'rni bor. Ba'zi vaziyatlarda boshqarilamaydigan komponentlar ishlatish eng to'g'ri va maqsadga muvofiq yechim bo'ladi. Biz esa dasturchi sifatida mana shu fundamental bilim va tajribalarga ega bo'lgan holatda o'sha vaziyatlar uchun mos yechimni bera olishimiz kerak.
