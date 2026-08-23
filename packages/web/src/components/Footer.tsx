import styled from "@emotion/styled";
import Container from "@/components/Container";
import Link from "@/components/Link";
import { transparentize } from "polished";
import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useLocation } from "react-router-dom";

let globalFooterCompactState = false;

const FooterWrapper = styled.div(({ theme }) => ({
  width: "100%",
  boxSizing: "border-box",
  [`@media (min-width: ${theme.breakpoints.md + 1}px)`]: {
    position: "sticky",
    bottom: 0,
    zIndex: 100,
  },
}));

const FooterRoot = styled.div<{ compact: boolean; disableTransition?: boolean }>(
  ({ theme, compact, disableTransition }) => ({
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: compact ? "10px" : "100px",
    backgroundColor: theme.colors.background2,
    color: transparentize(0.3)(theme.colors.text2),
    fontSize: 13,
    boxSizing: "border-box",
    transition: disableTransition
      ? "none"
      : "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    boxShadow: compact ? "0 -2px 10px rgba(0, 0, 0, 0.25)" : "none",
    borderTop: compact ? "1px solid rgba(255, 255, 255, 0.15)" : "none",

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: "100px",
    },
  })
);

const FooterContentContainer = styled.div<{ compact: boolean }>(({ theme, compact }) => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
  paddingTop: 0,
  paddingBottom: 0,
  opacity: compact ? 0 : 1,
  transition: "opacity 0.25s ease",
  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
    opacity: 1,
  },
}));

const ScrollHintPill = styled.div<{ visible: boolean }>(({ visible }) => ({
  position: "fixed",
  bottom: "2rem",
  left: "50%",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.45rem 1.1rem",
  borderRadius: "20px",
  backgroundColor: "rgba(30, 30, 30, 0.92)",
  color: "#ffffff",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  fontSize: "12px",
  fontWeight: 600,
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  opacity: visible ? 1 : 0,
  pointerEvents: visible ? "auto" : "none",
  transition: "opacity 0.3s ease, transform 0.3s ease",
  transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(12px)",
  cursor: "pointer",
  zIndex: 1000,
  userSelect: "none",
  "&:hover": {
    backgroundColor: "rgba(45, 45, 45, 0.95)",
  },
  "& svg": {
    animation: visible ? "bounce 2s infinite" : "none",
  },
  "@keyframes bounce": {
    "0%, 20%, 50%, 80%, 100%": {
      transform: "translateY(0)",
    },
    "40%": {
      transform: "translateY(3px)",
    },
    "60%": {
      transform: "translateY(1.5px)",
    },
  },
}));

const Footer = () => {
  const { pathname } = useLocation();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const targetCompact = isScrollable && !isAtBottom;
  const [renderedCompact, setRenderedCompact] = useState(globalFooterCompactState);
  const [disableTransition, setDisableTransition] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const updateScrollable = () => {
      const scrollable = document.documentElement.scrollHeight > window.innerHeight + 100;
      setIsScrollable(scrollable);
    };

    updateScrollable();

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtBottom(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);
    window.addEventListener("resize", updateScrollable);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScrollable);
    };
  }, [pathname]);

  useEffect(() => {
    const wasCompact = globalFooterCompactState;
    const nowCompact = targetCompact;

    if (wasCompact === nowCompact) {
      setDisableTransition(true);
      setRenderedCompact(nowCompact);
      const timer = setTimeout(() => setDisableTransition(false), 50);
      return () => clearTimeout(timer);
    } else {
      setDisableTransition(false);
      setRenderedCompact(wasCompact);
      const raf = requestAnimationFrame(() => {
        setRenderedCompact(nowCompact);
        globalFooterCompactState = nowCompact;
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [pathname, targetCompact]);

  useEffect(() => {
    globalFooterCompactState = renderedCompact;
  }, [renderedCompact]);

  const handleScrollDown = () => {
    window.scrollBy({ top: 350, behavior: "smooth" });
  };

  return (
    <>
      <ScrollHintPill visible={renderedCompact} onClick={handleScrollDown}>
        <span>Scroll for more</span>
        <FaChevronDown size={11} />
      </ScrollHintPill>
      <div ref={sentinelRef} style={{ height: "1px", width: "100%" }} />
      <FooterWrapper id="footer" className="section">
        <FooterRoot compact={renderedCompact} disableTransition={disableTransition}>
          <Container
            css={{
              display: "flex",
              width: "100%",
              height: "100%",
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <FooterContentContainer compact={renderedCompact}>
              <div>Nanda Abi Fahmi &nbsp;&middot;&nbsp; 2026</div>
              <div
                css={{
                  display: "flex",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="https://github.com/nafalabi">Github</Link>
                <Link href="https://medium.com/@nandaabifahmi">Medium</Link>
                <Link href="https://www.linkedin.com/in/nanda-abi-fahmi/">
                  LinkedIn
                </Link>
                <Link href="mailto:nandaabifahmi@gmail.com">Email</Link>
              </div>
            </FooterContentContainer>
          </Container>
        </FooterRoot>
      </FooterWrapper>
    </>
  );
};

export default Footer;
