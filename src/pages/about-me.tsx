import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Typography from "@/components/Typography";
import Footer from "@/components/Footer";
import emotionStyled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import ExpertiseCard from "@/components/ExpertiseCard";
import profileAvatar from "@/images/profile-avatar.jpeg";
import Button from "@/components/Button";
import { LuDatabase, LuGlobe } from "react-icons/lu";
import { VscTools } from "react-icons/vsc";

const Root = emotionStyled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.colors.background,
  color: theme.colors.text,
  marginTop: "80px",
  minHeight: "calc(100vh - 80px)",

  "& .header-section": {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "2.5rem",
  },

  "& .section-title": {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },

  "& .avatar-container": {
    float: "right",
    marginLeft: "2.5rem",
    marginBottom: "1.5rem",
    flexShrink: 0,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      float: "none",
      display: "block",
      margin: "0 auto 1.5rem auto",
      textAlign: "center",
    },
    "& img": {
      width: "200px",
      height: "200px",
      borderRadius: "32px",
      objectFit: "cover",
      boxShadow: "0 12px 36px rgba(0, 0, 0, 0.12)",
      border: "4px solid rgba(255, 255, 255, 0.8)",
    },
  },

  "& .subsection-title": {
    marginTop: "4rem",
    fontWeight: 600,
    marginBottom: "1.5rem",
  },

  "& .content": {
    width: "100%",
  },

  "& .intro-text": {
    fontSize: "15px",
    fontWeight: 400,
    lineHeight: 1.45,
    color: "#333333",
    "& p": {
      margin: "0 0 0.65rem 0",
    },
    "& strong": {
      fontWeight: 600,
      color: "#000000",
    },
  },

  "& .intro-greeting": {
    fontSize: "15px",
    fontWeight: 400,
    margin: "0 0 0.65rem 0",
    color: "#333333",
  },

  "& .sub-page-links": {
    clear: "both",
    paddingTop: "1.5rem",
    marginBottom: "3.5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: "1.5rem",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      justifyContent: "center",
      flexWrap: "wrap",
    },
    "& a": {
      textDecoration: "none",
    },
  },

  "& .expertise-grid": {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1.5rem",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      gridTemplateColumns: "1fr",
    },
  }
}));

const AboutMePage = () => {
  const navigate = useNavigate();

  return (
    <Root>
      <Navbar />
      <Container
        css={{
          margin: "0 0 auto",
          width: "100%",
          paddingTop: "2rem",
          paddingBottom: "4rem",
        }}
      >
        <div className="header-section">
          <div className="section-title">
            <Typography variant="heading">About me</Typography>
            <Typography css={{ fontSize: "medium", opacity: 0.8, marginTop: "0.25rem" }}>
              Get to know about me
            </Typography>
          </div>
        </div>

        <div className="content">
          <div className="intro-text">
            <div className="avatar-container">
              <img src={profileAvatar} alt="Nanda Abi Fahmi" />
            </div>
            <p className="intro-greeting">
              Hi, my name is <strong>Nanda Abi Fahmi</strong>.
            </p>
            <p>
              I'm a <strong>software engineer</strong> from <strong>Indonesia</strong> with over <strong>5 years</strong> of experience architecting and deploying scalable, enterprise-grade applications.
            </p>
            <p>
              I help <strong>modernize technical ecosystems</strong>, with hands-on experience in  <strong>streamlining cloud infrastructure</strong> and applications.
            </p>
            <p>
              I thrive on bridging the gap between <strong>product development</strong>, backend <strong>API design</strong>, and <strong>DevOps</strong> to consistently deliver highly available and secure software solutions.
            </p>
            <p>
              My tech stack mainly are <strong>TypeScript</strong>, <strong>Go</strong>, <strong>React.js</strong>, and <strong>PostgreSQL</strong>, but I'm flexible and eager to adapt to other technologies.
            </p>

            <div className="sub-page-links">
              <Button color="blue" onClick={() => navigate("/experience")}>View Experiences</Button>
              <Button color="red" onClick={() => navigate("/projects")}>Explore Side Projects</Button>
            </div>
          </div>

          <Typography variant="title" className="subsection-title">Technical Expertise</Typography>
          <div className="expertise-grid">
            <ExpertiseCard
              icon={<LuGlobe size={24} />}
              title="Languages"
              items="Go (Golang), TypeScript, C++, Python, PHP, Bash"
            />
            <ExpertiseCard
              icon={<FaReact size={24} />}
              title="Frameworks & Libs"
              items="React.js, React Native, Flutter, Next.js, Django, Node.js, Go-Echo, Laravel"
            />
            <ExpertiseCard
              icon={<LuDatabase size={24} />}
              title="Databases"
              items="PostgreSQL, MySQL, Redis, Firebase, CouchDB"
            />
            <ExpertiseCard
              icon={<VscTools size={24} />}
              title="Tools & Infrastructure"
              items="Docker, Kubernetes & Helm Chart, Webpack, Unix tooling (grep, sed, awk)"
            />
          </div>
          <br/>
          <br/>
        </div>
      </Container>
      <Footer />
    </Root>
  );
};

export default AboutMePage;
