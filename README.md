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

### Git

ცვლილებების შემდეგ (თქვენზეა დამოკიდებული რამდენად ხშირად, რას ჩათვლით საკმარის ცვლილებად) გამოიყენეთ Git და კოდი ატვირთეთ Github-ზე:

#### Staging გარემოში დამატება
```bash
# თითო-თითო ფაილის დამატება
git add file1

# ან Current directory/subdirectory-ებიდან ყველა ფაილის დამატება
git add . 
```

#### Commit & push
```
git commit -m "Add reply functionality"
git push
```

ოპერაციების თანმიმდევრობაა `add`, `commit` და ბოლოს `push`.

### სხვა

თარიღების ფორმატირებისთვის შეგიძლიათ გამოიყენოთ [`toLocaleDateString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) ან სხვა რომელიმე მეთოდი.

```js
new Date(email.sentAt).toLocaleDateString(locales, options)
```

ახალი ხაზები პროგრამულად იწერება როგორც `\n`. შეგიძლიათ გამოიყენოთ `split` ფუნქცია და ბაზაში შენახული მეილის ახალი ხაზების მიხედვით დაარენდეროთ `<br />` tag-ები.

```
mailText.split("\n") // do something with this
```

#### input ველის ფოკუსირება პირველი რენდერისას + კურსორის პირველ ხაზზე მოთავსება

```jsx
useEffect(() => {
  textareaRef.current.focus()
  textareaRef.current.setSelectionRange(0, 0)
}, [])
```

#### სხვა გვერდისთვის ინფორმაციის გადაცემა / ველების შევსება

მარტივი შემთხვევებისას, უცვლელი ინფორმაციისთვის შეგიძლიათ გამოიყენოთ [`navigate`](https://reactrouter.com/en/main/components/navigate) ფუნქციის `state` კონფიგურაცია. `state`-ის შიგთავსი URL-ში არ გამოჩნდება.

```jsx
navigate("/compose", { state: { email: emailObjToReplyTo } })
```

compose გვერდიდან ამ state-ს [`useLocation`](https://reactrouter.com/en/main/hooks/use-location#locationstate) hook-ით წაიკითხავთ

```jsx
import { useLocation } from "react-router-dom"

// ...

const location = useLocation()

// location.state.email
// use email object for prepopulating form fields
```

ამ გადაცემული state-ით შეგიძლიათ ველების/მნიშვნელობების წინასწარ და _მყისიერად_ შევსება.

_ზოგადად_, **უფრო დინამიური და უსაფრთხო ალტერნატივაა** გადასასვლელ გვერდზე `useEffect`-ის და `fetch`-ის გამოყენება (გადასასვლელ გვერდზე ყოველი ნავიგაციისას განახლებული ინფორმაცია წამოვა).

თუმცა ამ პროექტში mail-ების შიგთავსი არ იცვლება, ამიტომ შეგიძლიათ `navigate` და `state` კონფიგურაციაც გამოიყენოთ.
