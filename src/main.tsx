import "@fontsource/montserrat";
import "./global.css";

import { Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ThemeProvider from "./theme";
import Home from "./pages/home.tsx";
import AboutMePage from "./pages/about-me.tsx";
import ProjectsPage from "./pages/projects.tsx";
import ContactPage from "./pages/contact.tsx";
import Error404 from "./pages/404.tsx";

const globalStyles = (
  <Global
    styles={(theme) => ({
      body: {
        margin: 0,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: "montserrat",
        fontSize: theme.typography.body,
        boxSizing: "border-box",
      },
    })}
  />
);

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/about-me",
    element: <AboutMePage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      {globalStyles}
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
