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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "2rem",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      flexDirection: "column",
      textAlign: "center",
      gap: "1.5rem",
    },
  },

  "& .section-title": {
    fontWeight: 500,
    flex: 1,
  },

  "& .intro-top": {
    display: "flex",
    flexDirection: "row",
    gap: "3rem",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      flexDirection: "column-reverse",
      alignItems: "flex-start",
      textAlign: "left",
    },
  },

  "& .avatar-container": {
    flexShrink: 0,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      alignSelf: "center",
    },
    "& img": {
      width: "180px",
      height: "180px",
      borderRadius: "32px",
      objectFit: "cover",
      boxShadow: theme.shadow[3],
    },
  },

  "& .subsection-title": {
    marginTop: "4rem",
    fontWeight: 500,
    fontSize: theme.typography.title,
    marginBottom: "1.5rem",
  },

  "& .content": {
    width: "100%",
    fontSize: "16px",
    lineHeight: 1.6,

    "& strong": {
      fontWeight: "600",
    }
  },

  "& .intro-text": {
    marginTop: "1rem",
    "& p": {
      marginBottom: "1.25rem",
    }
  },

  "& .sub-page-links": {
    marginTop: "3rem",
    marginBottom: "5rem",
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
        }}
      >
        <div className="header-section">
          <div className="section-title">
            <Typography variant="heading">About me</Typography>
            <Typography css={{ fontSize: "medium", opacity: 0.8 }}>
              Get to know Nanda Abi Fahmi
            </Typography>
          </div>
        </div>

        <div className="content">
          <div className="intro-text">
            <div className="intro-top">
              <div style={{ flex: 1, minWidth: "300px" }}>
                <p className="content" style={{marginTop: 0}}>Hi, my name is Nanda Abi Fahmi.</p>
                <p className="content">
                  I'm a <strong>versatile software engineer</strong> from <strong>Indonesia</strong> with over <strong>5 years</strong> of experience architecting and deploying scalable,
                  enterprise-grade applications.
                </p>
                <p style={{marginBottom: 0}}>
                  I have a proven track record in driving comprehensive <strong>system
                  modernization</strong>, from conducting cross-platform mobile migrations (React
                  Native to Flutter) to <strong>optimizing cloud infrastructure</strong>.
                </p>
              </div>
              <div className="avatar-container">
                <img src={profileAvatar} alt="Nanda Abi Fahmi" />
              </div>
            </div>
            <p>
              I thrive on bridging the gap between <strong>product development</strong>,&nbsp;
              backend <strong>API design</strong>, and <strong>DevOps</strong> to
              consistently deliver highly available and secure software solutions.
            </p>
            <p>
              My tech stack mainly are <strong>TypeScript</strong>, <strong>Go</strong>, <strong>React.js</strong>, and <strong>PostgreSQL</strong>, but I'm flexible and eager to adapt to other technologies.
            </p>

            <div className="sub-page-links">
              <Button color="red" onClick={() => navigate("/experience")}>View Experiences</Button>
              <Button color="red" variant="outlined" onClick={() => navigate("/projects")}>Explore Side Projects</Button>
            </div>
          </div>

          <Typography variant="title" className="subsection-title">Technical Expertise:</Typography>
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
