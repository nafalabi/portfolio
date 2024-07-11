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
          Experienced Software Engineer with wide range of skills. Proven to
          have handled a production-grade application. Provide fast development
          and maintainable source code.
          <br />4 years of experience in Web &amp; Mobile development
        </Typography>
        <Box css={{ display: "flex", marginTop: "2rem", gap: "1rem" }}>
          <Button color="blue" onClick={() => navigate("/contact")}>
            Get In Touch
          </Button>
          <Button color="red" onClick={() => navigate("/about-me")}>
            Learn more
          </Button>
        </Box>
      </Container>
      <Footer />
    </RootMain>
  );
};

export default Home;
