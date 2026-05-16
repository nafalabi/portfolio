import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Typography from "@/components/Typography";
import Footer from "@/components/Footer";
import emotionStyled from "@emotion/styled";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPhoneSquareAlt,
} from "react-icons/fa";

const Root = emotionStyled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.colors.background,
  color: theme.colors.text,
  marginTop: "80px",
  minHeight: "calc(100vh - 80px)",

  "& .section-title": {
    fontWeight: 500,
    marginBottom: "2.5rem",
  },

  "& .content": {
    marginTop: "3rem",
    fontSize: theme.typography.body,

    "& ul": {
      paddingInlineStart: "1rem",
    },

    "& li": {
      marginBottom: "1rem",

      "& div": {
        fontWeight: "bold",
      },
    },

    "& a": {
      color: theme.colors.button.blue,
      overflowWrap: "break-word",
    },
  },

  "& #footer": {
    width: "100%",
  },
}));

const ContactPage = () => {
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
          <Typography variant="heading">Contact</Typography>
          <Typography css={{ fontSize: "medium" }}>
            Get in touch with me
          </Typography>
        </div>
        <div className="content">
          <ul>
            <li>
              <div>
                <FaLinkedin /> Linkedin
              </div>
              <a href="https://www.linkedin.com/in/nanda-abi-fahmi/">
                https://www.linkedin.com/in/nanda-abi-fahmi/
              </a>
            </li>
            <li>
              <div>
                <FaEnvelope /> Mail
              </div>
              <a href="mailto:nandaabifahmi@gmail.com">
                nandaabifahmi@gmail.com
              </a>
            </li>
            <li>
              <div>
                <FaGithub /> Github
              </div>
              <a href="https://github.com/nafalabi">
                https://github.com/nafalabi
              </a>
            </li>
            <li>
              <div>
                <FaPhoneSquareAlt /> Mobile
              </div>
              <a href="tel:+6285173174375">+62 851-7317-4375</a>
            </li>
          </ul>
          
          <p style={{ marginTop: "2rem", fontSize: "16px" }}>
            If you're working on interesting challenges or want to talk about anything, feel free to reach out!
          </p>
        </div>
      </Container>
      <Footer />
    </Root>
  );
};

export default ContactPage;
