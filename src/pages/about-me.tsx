import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Typography from "@/components/Typography";
import Footer from "@/components/Footer";
import emotionStyled from "@emotion/styled";
import { Link } from "react-router-dom";

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
  },

  "& .content": {
    marginTop: "2.5rem",
    fontWeight: 600,
    fontSize: theme.typography.body,
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
          <p>Hi my name is Nanda Abi Fahmi.</p>
          <p>
            I'm a software engineer with over 5 years of experience in Web (both
            Backend and Frontend) and mobile development.
          </p>
          <p>
            Developing software is like a hobby to me, because oftentimes I try
            to improve how I do my mundane tasks a bit easier.
          </p>

          <p>
            Programming Languages:
            <br />- Typescript, Golang, C++, PHP, Python, Bash
          </p>

          <p>
            Frameworks & Libs:
            <br />- React.js, React Native, Flutter, Next.js
            <br />- Express.js, Nest.js, Go-Echo
            <br />- Laravel, Codeigniter, Django
          </p>

          <p>
            Databases:
            <br />- MySQL, PostgreSQL, Firebase, CouchDB, Redis
          </p>

          <p>
            Tools & Others:
            <br />- Docker, Webpack, Unix tooling (grep, sed, awk, etc.)
          </p>

          <p>
            While I mostly do Web & Mobile development as a profession, I am
            also interested in system design and low-level engineering. I often
            do side projects in those areas.
          </p>

          <p>
            If you have any interesting thing to work on or just want to get in
            touch, feel free to contact me <Link to="/contact">here</Link>.
          </p>
        </div>
      </Container>
      <Footer />
    </Root>
  );
};

export default AboutMePage;
