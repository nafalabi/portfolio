import "@fontsource/montserrat/latin-100.css";
import "@fontsource/montserrat/latin-200.css";
import "@fontsource/montserrat/latin-300.css";
import "@fontsource/montserrat/latin-400.css";
import "@fontsource/montserrat/latin-500.css";
import "@fontsource/montserrat/latin-600.css";
import "@fontsource/montserrat/latin-700.css";
import "@fontsource/montserrat/latin-800.css";
import "@fontsource/montserrat/latin-900.css";
import "@fontsource/montserrat/latin-100-italic.css";
import "@fontsource/montserrat/latin-200-italic.css";
import "@fontsource/montserrat/latin-300-italic.css";
import "@fontsource/montserrat/latin-400-italic.css";
import "@fontsource/montserrat/latin-500-italic.css";
import "@fontsource/montserrat/latin-600-italic.css";
import "@fontsource/montserrat/latin-700-italic.css";
import "@fontsource/montserrat/latin-800-italic.css";
import "@fontsource/montserrat/latin-900-italic.css";
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
import ExperiencePage from "./pages/experience.tsx";
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
    path: "/experience",
    element: <ExperiencePage />,
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
