import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Layout from "./page/Layout";
import Hero from "./page/Hero";
import About from "./page/About";
import Gallery from "./page/Gallery"; // Assuming you have a Gallery component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Hero />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
