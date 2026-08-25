import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Typography from "@/components/Typography";
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
    textAlign: "center",
  },

  "& .content": {
    marginTop: "3rem",
  },

  "& #footer": {
    width: "100%",
  },
}));

const Error404 = () => {
  return (
    <Root>
      <Navbar />
      <div
        css={{
          display: "flex",
          margin: "auto",
        }}
      >
        <div className="section-title">
          <Typography variant="jumbo">404</Typography>
          <Typography>Page can't be found</Typography>
        </div>
      </div>
      <Footer />
    </Root>
  );
};

export default Error404;
