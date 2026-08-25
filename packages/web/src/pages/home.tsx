import { useState } from "react";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Typography from "@/components/Typography";
import Footer from "@/components/Footer";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutDown = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(28px) scale(0.96);
  }
`;

const fadeOutDownOnly = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(32px);
  }
`;

const fadeOutUp = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const radarPulse = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
    box-shadow: 0 0 0 0 rgba(1, 1, 2, 0.7);
  }
  50% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(1, 1, 2, 0.25);
  }
  100% {
    opacity: 0;
    transform: scale(1.8);
    box-shadow: 0 0 0 12px rgba(1, 1, 2, 0);
  }
`;

const PlayIndicatorButton = styled("button")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "40px",
  padding: "0 8px",
  borderRadius: "20px",
  border: "1px solid transparent",
  backgroundColor: "transparent",
  color: theme.colors.text,
  fontSize: "0.875rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "visible",
  whiteSpace: "nowrap" as const,
  outline: "none",

  "& .dot-container": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    flexShrink: 0,
  },

  "& .dot": {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: theme.colors.text,
    animation: `${radarPulse} 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
    flexShrink: 0,
  },

  "& .label": {
    maxWidth: "0px",
    opacity: 0,
    overflow: "hidden",
    display: "inline-block",
    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  "&:hover, &:focus-visible, &.is-expanded": {
    padding: "0 16px",
    backgroundColor: "rgba(1, 1, 2, 0.06)",
    borderColor: "rgba(1, 1, 2, 0.2)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
    "& .label": {
      maxWidth: "140px",
      opacity: 1,
      marginLeft: "8px",
    },
    "& .dot": {
      animation: "none",
      opacity: 1,
      transform: "scale(1)",
    },
  },
}));

const HeroActionsRow = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  marginTop: "2rem",
  gap: "0.85rem",
  alignItems: "center",
  "@media (max-width: 480px)": {
    marginTop: "1.5rem",
    gap: "0.65rem",
    "& button": {
      fontSize: "14px",
      padding: "0.45rem 1.15rem",
    },
  },
});

const RootMain = styled("main")<{ isExiting?: boolean }>(({ theme, isExiting }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  minHeight: "400px",
  backgroundColor: theme.colors.background,
  color: theme.colors.text,
  "@media (max-height: 620px)": {
    "& .container": {
      marginTop: "100px",
    },
  },

  "& .nav-wrapper": isExiting
    ? { animation: `${fadeOutUp} 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.32s forwards` }
    : {},
  "& .footer-wrapper": isExiting
    ? { animation: `${fadeOutDownOnly} 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.32s forwards` }
    : {},

  "& .hero-item-1": isExiting
    ? { animation: `${fadeOutDown} 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.24s forwards` }
    : {
        opacity: 0,
        animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards`,
      },
  "& .hero-item-2": isExiting
    ? { animation: `${fadeOutDown} 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.16s forwards` }
    : {
        opacity: 0,
        animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards`,
      },
  "& .hero-item-3": isExiting
    ? { animation: `${fadeOutDown} 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.08s forwards` }
    : {
        opacity: 0,
        animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards`,
      },
  "& .hero-item-4": isExiting
    ? { animation: `${fadeOutDown} 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.0s forwards` }
    : {
        opacity: 0,
        animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards`,
      },
}));

const Home = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleNavigateWithDispose = (targetPath: string) => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(targetPath);
    }, 650);
  };

  const handleIndicatorClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      if (!isExpanded) {
        e.preventDefault();
        e.stopPropagation();
        setIsExpanded(true);
        return;
      }
    }
    handleNavigateWithDispose("/snake");
  };

  return (
    <RootMain isExiting={isExiting}>
      <div className="nav-wrapper">
        <Navbar />
      </div>
      <Container className="container">
        <div className="hero-item-1">
          <Typography variant="heading">Software Engineer</Typography>
        </div>
        <div className="hero-item-2">
          <Typography variant="title">Hi, my name is Nanda Abi Fahmi.</Typography>
        </div>
        <div className="hero-item-3">
          <Typography variant="body" css={{ marginTop: "1rem" }}>
            I'm a software engineer with over 5 years of experience building
            scalable applications. I love connecting the dots between product
            development, backend APIs, and DevOps to create reliable and secure
            solutions that bring ideas to life.
          </Typography>
        </div>
        <div className="hero-item-4">
          <HeroActionsRow>
            <Button color="blue" onClick={() => handleNavigateWithDispose("/about-me")}>
              About me
            </Button>
            <Button color="red" onClick={() => handleNavigateWithDispose("/contact")}>
              Contact
            </Button>
            <PlayIndicatorButton
              className={isExpanded ? "is-expanded" : ""}
              onClick={handleIndicatorClick}
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              title="Play Snake"
            >
              <span className="dot-container">
                <span className="dot" />
              </span>
              <span className="label">Let&apos;s play 🐍</span>
            </PlayIndicatorButton>
          </HeroActionsRow>
        </div>
      </Container>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </RootMain>
  );
};

export default Home;
