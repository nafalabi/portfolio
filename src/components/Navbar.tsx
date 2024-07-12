import styled from "@emotion/styled";
import { useState, useRef } from "react";
import Container from "./Container";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

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

const items: NavigationItem[] = [
  { name: "About me", link: "/about-me" },
  { name: "Projects", link: "/projects" },
  { name: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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
        <span css={{ fontWeight: 600 }}>
          <Link
            css={{
              color: "inherit",
              textDecoration: "none",
            }}
            to="/"
          >
            Nanda
          </Link>
        </span>
        <ButtonExpandNav
          onClick={(e) => {
            e.preventDefault();
            setExpanded((old) => !old);
          }}
        >
          <MdMenu size={40} />
        </ButtonExpandNav>
        <NavList expanded={expanded}>
          {items.map(({ name, link }) => {
            return (
              <li key={name}>
                <Link
                  to={link}
                  css={{
                    fontWeight: 600,
                  }}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </NavList>
      </Container>
    </RootNavbar>
  );
};

export default Navbar;
