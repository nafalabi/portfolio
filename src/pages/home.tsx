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

const RootMain = styled("main")(({ theme }) => ({
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

  "& .hero-item-1": {
    opacity: 0,
    animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards`,
  },
  "& .hero-item-2": {
    opacity: 0,
    animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards`,
  },
  "& .hero-item-3": {
    opacity: 0,
    animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards`,
  },
  "& .hero-item-4": {
    opacity: 0,
    animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards`,
  },
}));

const Home = () => {
  const navigate = useNavigate();
  return (
    <RootMain>
      <Navbar />
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
          <Box css={{ display: "flex", marginTop: "2rem", gap: "1rem" }}>
            <Button color="blue" onClick={() => navigate("/about-me")}>
              About me
            </Button>
            <Button color="red" onClick={() => navigate("/contact")}>
              Contact
            </Button>
          </Box>
        </div>
      </Container>
      <Footer />
    </RootMain>
  );
};

export default Home;
