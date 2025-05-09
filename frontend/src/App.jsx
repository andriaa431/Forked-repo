import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
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

const ProtectedRoute = () => {
  const { initialLoading } = useContext(AuthContext);

  if (initialLoading) return null;

  // TODO: if user is already logged in, return inner route outlet
  // if ()

  // TODO: if user is NOT logged in, navigate to the login page
  // if ()
};

const RedirectIfLoggedIn = () => {
  const { user, initialLoading } = useContext(AuthContext);

  if (initialLoading) return null;

  // TODO: if user is already logged in, navigate to the inbox page
  // if ()

  // TODO: if user is NOT logged in, return inner route outlet
  // if ()
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>

      {/* TODO: add <ProtectedRoute> layout route around these pages */}
      <Route index element={<Navigate to="c/inbox" />} />
      <Route path="c/:emailCategory" element={<EmailListPage />} />
      <Route path="c/:emailCategory/:emailId" element={<Email />} />
      <Route path="compose" element={<ComposeEmailPage />} />

      {/* TODO: add <RedirectIfLoggedIn> layout route around these pages */}
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      <Route path="*" element={<NotFoundPage />} />
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
