import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import { MainLayout } from "@layouts/index";

// pages
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Cart = lazy(() => import("@pages/Cart"));
const Categories = lazy(() => import("@pages/Categories"));
const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const Products = lazy(() => import("@pages/Products"));
const Register = lazy(() => import("@pages/Register"));
const Profile = lazy(() => import("@pages/Profile"));
import Error from "@pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "/",
        element: (
          <Suspense fallback="loading please wait...">
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback="loading please wait...">
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "about-us",
        element: (
          <Suspense fallback="loading please wait...">
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback="loading please wait...">
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: (
          <Suspense fallback="loading please wait...">
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("bad request", {
              statusText: "category not found",
            });
          }
          return true;
        },
      },
      {
        path: "login",
        element: (
          <Suspense fallback="loading please wait...">
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback="loading please wait...">
            <Register />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback="loading please wait...">
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
