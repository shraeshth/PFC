import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./page/Layout";
import Hero from "./page/Hero";
import About from "./page/About";
import Gallery from "./page/Gallery";
import MerchPage from "./page/MerchPage";
import Events from "./page/Events";
import ErrorPage from "./components/ErrorPage"; // Import your error component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Hero />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/merch",
        element: <MerchPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/events",
        element: <Events />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  // Catch-all route for 404s
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
