import styled from "@emotion/styled";
import { useState, useRef, useEffect } from "react";
import Container from "./Container";
import { MdMenu, MdClose, MdPersonOutline, MdOutlineArticle, MdPhone } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const RootNavbar = styled.nav(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.colors.background,
  transition: "all 0.3s ease",
  zIndex: 1000,
}));

const MenuToggleButton = styled.button(({ theme }) => ({
  display: "none",
  background: "none",
  border: "none",
  color: theme.colors.text,
  cursor: "pointer",
  padding: "4px",
  borderRadius: "6px",
  transition: "opacity 0.2s ease",
  "&:hover": {
    opacity: 0.7,
  },
  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const NavList = styled.ul<{ expanded: boolean }>(({ theme, expanded }) => ({
  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "2rem",

  "& li": {
    display: "flex",
    alignItems: "center",
  },

  "& a": {
    textDecoration: "none",
    color: theme.colors.text,
    fontSize: "15px",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "color 0.2s ease",
    "&:hover": {
      color: theme.colors.button.blue,
    },
    "&.active": {
      color: theme.colors.button.blue,
    },
  },

  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    gap: "1rem",
    padding: expanded ? "1rem 2rem 1.5rem 2rem" : "0 2rem",
    backgroundColor: theme.colors.background,
    borderBottom: expanded ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid transparent",
    boxShadow: expanded ? "0 8px 20px rgba(0, 0, 0, 0.04)" : "none",
    opacity: expanded ? 1 : 0,
    maxHeight: expanded ? "240px" : "0px",
    transform: expanded ? "translateY(0)" : "translateY(-8px)",
    pointerEvents: expanded ? "auto" : "none",
    overflow: "hidden",
    transition: "opacity 0.25s ease, max-height 0.25s ease, transform 0.25s ease, padding 0.25s ease, border-color 0.25s ease",
    "& li": {
      width: "100%",
    },
    "& a": {
      width: "100%",
      padding: "0.4rem 0",
      fontSize: "16px",
      justifyContent: "flex-start",
    },
  },
}));

interface NavigationItem {
  name: string;
  link: string;
  isExternal?: boolean;
  icon: React.ReactNode;
}

const items: NavigationItem[] = [
  { name: "About me", link: "/about-me", icon: <MdPersonOutline size={20} /> },
  { name: "Blog", link: "https://medium.com/@nandaabifahmi", isExternal: true, icon: <MdOutlineArticle size={20} /> },
  { name: "Contact", link: "/contact", icon: <MdPhone size={20} /> },
];

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setExpanded(false);
  }, [pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <RootNavbar ref={rootRef}>
      <Container
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          padding: "1.25rem 2rem",
        }}
      >
        <span css={{ fontWeight: 700, fontSize: "20px" }}>
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
        <MenuToggleButton
          onClick={(e) => {
            e.preventDefault();
            setExpanded((old) => !old);
          }}
          aria-label="Toggle navigation menu"
        >
          {expanded ? <MdClose size={32} /> : <MdMenu size={32} />}
        </MenuToggleButton>
        <NavList expanded={expanded}>
          {items.map(({ name, link, isExternal, icon }) => {
            const isActive = pathname === link;
            return (
              <li key={name}>
                {isExternal ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setExpanded(false)}
                  >
                    {icon} {name}
                  </a>
                ) : (
                  <Link
                    to={link}
                    className={isActive ? "active" : ""}
                    onClick={() => setExpanded(false)}
                  >
                    {icon} {name}
                  </Link>
                )}
              </li>
            );
          })}
        </NavList>
      </Container>
    </RootNavbar>
  );
};

export default Navbar;
