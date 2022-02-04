import styled from "@emotion/styled";
import { useState } from "react";
import Container from "./Container";
import { CommonComponentProps } from "./types";
import Typography from "./Typography";
import { MdMenu } from "react-icons/md";
import { useEffect } from "react";
import { useRef } from "react";

//====================================================

const RootNavbar = styled.nav(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.colors.background,
  transition: "all 0.3s",
  zIndex: 1000,
}));

const ButtonExpandNav = styled.div(({ theme }) => ({
  display: "none",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.5,
  },
  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
    display: "initial",
  },
}));

const NavList = styled.ul<{ expanded: boolean }>(({ theme, expanded }) => ({
  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "row",
  gap: "3rem",

  "& li": {
    cursor: "pointer",
  },
  "& a": {
    textDecoration: "none",
    color: "inherit",
  },
  [`@media (max-width: ${theme.breakpoints.md}px)`]: expanded
    ? {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: 0,
        right: 0,
        top: 75,
        gap: 0,
        padding: "1rem 2rem",
        backgroundColor: theme.colors.background,
        "& li": {
          padding: "0.5rem",
          "&:after": {
            marginTop: "0.5rem",
            color: "#999",
          },
        },
      }
    : { display: "none" },
}));

//=====================================

interface NavigationItem {
  name: string;
  link: string;
}

interface Props extends Omit<CommonComponentProps, "children"> {
  title: string;
  navigations: NavigationItem[];
}

const Navbar = ({ title, navigations }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const prevScrollpos = useRef(0);

  useEffect(() => {
    const updateNavbarBackground = () => {
      const navbarEl = rootRef.current;
      const section1 = document.getElementById("top");
      const section2 = document.getElementById("workExperience");
      const section3 = document.getElementById("aboutMe");
      const section4 = document.getElementById("projects");

      if (!navbarEl) return;

      const navbarBound = navbarEl.getBoundingClientRect();
      const section1Bound = section1.getBoundingClientRect();
      const section2Bound = section2.getBoundingClientRect();
      const section3Bound = section3.getBoundingClientRect();
      const section4Bound = section4.getBoundingClientRect();

      const isInTheAreaOf = (rect: DOMRect) => {
        return (
          rect.top <= navbarBound.bottom &&
          rect.height + rect.top >= navbarBound.bottom
        );
      };

      const setBackgroundColorAs = (el: HTMLElement) => {
        const style = getComputedStyle(el);
        navbarEl.style.backgroundColor = style.backgroundColor;
        navbarEl.style.color = style.color;
      };

      if (isInTheAreaOf(section1Bound)) {
        setBackgroundColorAs(section1);
      } else if (isInTheAreaOf(section2Bound)) {
        setBackgroundColorAs(section2);
      } else if (isInTheAreaOf(section3Bound)) {
        setBackgroundColorAs(section3);
      } else if (isInTheAreaOf(section4Bound)) {
        setBackgroundColorAs(section4);
      }
    };

    const hideNavbar = () => {
      const navbarEl = rootRef.current;

      if (!navbarEl) return;

      const clientBound = navbarEl.getBoundingClientRect();
      const currentScrollPos = window.pageYOffset;

      if (prevScrollpos.current > currentScrollPos) {
        navbarEl.style.top = "0";
      } else {
        navbarEl.style.top = `-${clientBound.height}px`;
      }

      prevScrollpos.current = currentScrollPos;
    };

    const scrollListener = () => {
      updateNavbarBackground();
      hideNavbar();
    };

    window.addEventListener("scroll", scrollListener);
    () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <RootNavbar ref={rootRef}>
      <Container
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          padding: "1.5rem 2rem",
        }}
      >
        <Typography variant="title" css={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <ButtonExpandNav
          onClick={(e) => {
            e.preventDefault();
            setExpanded((old) => !old);
          }}
        >
          <MdMenu size={40} />
        </ButtonExpandNav>
        <NavList expanded={expanded}>
          {navigations.map(({ name, link }) => {
            return (
              <li key={name}>
                <a
                  onClick={() =>
                    document
                      .querySelector(link)
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {name}
                </a>
              </li>
            );
          })}
        </NavList>
      </Container>
    </RootNavbar>
  );
};

export default Navbar;
