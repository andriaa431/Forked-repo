import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  redirect,
  Outlet
} from "react-router";
import { RootLayout } from "@/pages/RootLayout";
import { AuthContext, AuthContextProvider } from "@/components/AuthContext";
import { useContext } from "react";
import { Email } from "@/pages/EmailPage";
import { EmailListPage } from "@/pages/EmailListPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ComposeEmailPage } from "@/pages/ComposeEmailPage";
import { Inbox, User } from "lucide-react";


const ProtectedRoute = () => {
  const { initialLoading } = useContext(AuthContext);

  if (initialLoading) return null;



        if (User != null) return(
          <Outlet/>
           
        )



  if (User == null) Navigate = LoginPage
};

const RedirectIfLoggedIn = () => {
  const { user, initialLoading } = useContext(AuthContext);

  if (initialLoading) return null;


  if( user !== null ){
    Navigate = Inbox
  }



  if(user == null) return(
    <Outlet />
  )
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>


      <Route element={<ProtectedRoute/>} >
      <Route index element={<Navigate to="c/inbox" />} />
      <Route path="c/:emailCategory"  element={<EmailListPage />} />
      <Route path="c/:emailCategory/:emailId" ProtectedRoute element={<Email />} />
      <Route path="compose" ProtectedRoute element={<ComposeEmailPage />} />
 </Route>
 <Route element={<RedirectIfLoggedIn/>}>
 
   <Route path="login" RedirectIfLoggedIn element={<LoginPage />} />
      <Route path="register" RedirectIfLoggedIn element={<RegisterPage />} />

      <Route path="*" element={<NotFoundPage />} />
 </Route>
     
    </Route>
  )
);

export const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};
