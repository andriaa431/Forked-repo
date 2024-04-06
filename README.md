## Mail

### პროექტის სტრუქტურა და შექმნა
```
my-mail-project/
├── backend/
├── frontend/
└── .gitignore
```
**შენიშვნა**: git-ის repository იქნება `my-mail-project`. `.gitignore` ან git-ის repository თითოეულ ფოლდერში (backend, frontend) *არ* დაამატოთ. frontend-ში დაგხვდებათ `.gitignore`, რომელსაც `vite` აგენერირებს, შეგიძლიათ ეგ გამოიყენოთ, ოღონდ frontend ფოლდერიდან პროექტის root-ში გადაიტანეთ, როგორც სტრუქტურის აღწერაშია.

### Frontend
```
npm create vite@latest

cd <folder>
npm i formik yup ...
npm run dev
```

### Backend
```
npm init -y
npm i express cors nodemon ...
```
package.json:
```json
"type": "module"
"scripts": {
  "dev": "nodemon server.js"
}
```

```
npm run dev
```

### Protected routes & redirects
როცა ბევრი დაცული route გვაქვს, მოსახერხებელია ProtectedRoute-ის მოდიფიკაცია. `children` prop-ის ნაცვლად ვარენდერებთ `Outlet`-ს. ეს იმას ნიშნავს, რომ `ProtectedRoute` შეგვიძლია Layout-ად გამოვიყენოთ - ბევრ `Route` კომპონენტს დავუწეროთ *ერთი* `ProtectedRoute` კომპონენტი გარშემო.
```jsx
// children prop ამოვიღეთ
const ProtectedRoute = () => {
  const { user, initialLoading } = useContext(AuthContext)
  
  // redirect ლოგიკა ...

  // დავამატეთ Outlet
  return !initialLoading && user ? <Outlet /> : null
}

// ...

<Route element={<ProtectedRoute />}>
  <>
    // <RouteA ... />
    // <RouteB ... />
    // <RouteC ... />
    // <RouteD ... />
  </>
</Route>
```

მსგავსი მიდგომით შეგიძლიათ შექმნათ `RedirectIfLoggedIn` კომპონენტიც.

გადამისამართებისთვის შესაძლოა უფრო მოსახერხებელი იყოს [Navigate *კომპონენტი*](https://reactrouter.com/en/6.22.3/components/navigate) react-router-dom-დან. `useEffect`-ის გამოყენება აღარ დაგჭირდებათ.

### სხვა

თარიღების ფორმატირებისთვის შეგიძლიათ გამოიყენოთ [`toLocaleDateString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) ან სხვა რომელიმე მეთოდი.

```js
new Date(email.sentAt).toLocaleDateString(locales, options)
```

ახალი ხაზები პროგრამულად იწერება როგორც `\n`. შეგიძლიათ გამოიყენოთ `split` ფუნქცია და ბაზაში შენახული მეილის ახალი ხაზების მიხედვით დაარენდეროთ `<br />` tag-ები.

```
mailText.split("\n") // do something with this
```
