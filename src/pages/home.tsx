import Box from "@/components/Box";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Typography from "@/components/Typography";
import Footer from "@/components/Footer";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

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
}));

const Home = () => {
  const navigate = useNavigate();
  return (
    <RootMain>
      <Navbar />
      <Container className="container">
        <Typography variant="heading">Software Engineer</Typography>
        <Typography variant="title">Hi, my name is Nanda Abi Fahmi.</Typography>
        <Typography variant="body" css={{ marginTop: "1rem" }}>
          I'm a software engineer with over 5 years of experience building
          scalable applications. I love connecting the dots between product
          development, backend APIs, and DevOps to create reliable and secure
          solutions that bring ideas to life.
        </Typography>
        <Box css={{ display: "flex", marginTop: "2rem", gap: "1rem" }}>
          <Button color="blue" onClick={() => navigate("/about-me")}>
            About me
          </Button>
          <Button color="red" onClick={() => navigate("/contact")}>
            Contact
          </Button>
        </Box>
      </Container>
      <Footer />
    </RootMain>
  );
};

export default Home;
