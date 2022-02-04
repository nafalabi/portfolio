import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Box from "../components/Box";
import Button from "../components/Button";
import Container from "../components/Container";
import Typography from "../components/Typography";

const Root = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
  minHeight: "400px",
});

const Section1Intro = () => {
  return (
    <Root id="top">
      <Container>
        <Typography variant="heading">Software Engineer</Typography>
        <Typography variant="title">Hi, my name is Nanda Abi Fahmi.</Typography>
        <Typography variant="body" css={{ marginTop: "1rem" }}>
          Experienced Software Engineer with wide range of skills. Proven to
          have handled a production-grade application. Provide fast development
          and maintainable source code.
          <br />3 years of experience in Web &amp; Mobile development
        </Typography>
        <Box css={{ display: "flex", marginTop: "2rem", gap: "1rem" }}>
          <Button color="blue">Get In Touch</Button>
          <Button color="red">Learn more</Button>
        </Box>
      </Container>
    </Root>
  );
};

export default Section1Intro;
