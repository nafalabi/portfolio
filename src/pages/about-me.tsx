import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Typography from "@/components/Typography";
import Footer from "@/components/Footer";
import emotionStyled from "@emotion/styled";

const Root = emotionStyled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.colors.background,
  color: theme.colors.text,
  marginTop: "80px",
  minHeight: "calc(100vh - 80px)",

  "& .section-title": {
    fontWeight: "bold",
    marginBottom: "2.5rem",
  },

  "& .content": {
    marginTop: "3rem",
  },

  "& #footer": {
    width: "100%",
  },
}));

const AboutMePage = () => {
  return (
    <Root>
      <Navbar />
      <Container
        css={{
          margin: "0 0 auto",
          width: "100%",
        }}
      >
        <div className="section-title">
          <Typography variant="heading">About me</Typography>
          <Typography css={{ fontSize: "medium" }}>
            Get to know a little bit about me
          </Typography>
        </div>
        <div className="content">
          <p>Hi my name is Nanda Abi Fahmi</p>
        </div>
      </Container>
      <Footer />
    </Root>
  );
};

export default AboutMePage;
