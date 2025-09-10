import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Signup from "../pages/Signup"
import Login from "../pages/Login";
import Buy from "../pages/Buy";
import PageNotFound from "../pages/PageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "buy", element: <Buy /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);
