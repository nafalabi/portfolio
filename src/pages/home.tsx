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
          I am a well rounded Software Engineer, proficient in Web & Mobile
          Development and good knowledge in server management. I have proven to
          have handled enterprise grade application with more than 5 years of
          experience.
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
