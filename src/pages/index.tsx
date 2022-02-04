import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import ThemeProvider from "../theme";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

import "@fontsource/montserrat";
import "@fontsource/poppins";

import FloatingActions from "../sections/FloatingActions";
import Section1Intro from "../sections/1-intro";
import Section2WorkExperience from "../sections/2- work-experience";
import Section3AboutMe from "sections/3-about-me";
import Footer from "sections/Footer";
import Section4Projects from "sections/4-projects";
import { PageStateProvider } from "context/PageState";

const globalStyles = (
  <Global
    styles={(theme) => ({
      body: {
        margin: 0,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: "montserrat",
      },
    })}
  />
);

const RootMain = styled("main")`
  /* padding: 2rem; */
`;

const IndexPage = () => {
  return (
    <PageStateProvider>
      <ThemeProvider>
        <Helmet>
          <title>Nanda Abi Fahmi</title>
        </Helmet>
        {globalStyles}
        <RootMain>
          <Navbar
            title="Nanda"
            navigations={[
              { name: "Work Experience", link: "#workExperience" },
              { name: "About me", link: "#aboutMe" },
              { name: "Projects", link: "#projects" },
            ]}
          />

          <FloatingActions />

          <Section1Intro />
          <Section2WorkExperience />
          <Section3AboutMe />
          <Section4Projects />

          <Footer />
        </RootMain>
      </ThemeProvider>
    </PageStateProvider>
  );
};

export default IndexPage;
