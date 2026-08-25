import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Typography from "@/components/Typography";
import Footer from "@/components/Footer";
import emotionStyled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import profileAvatar from "@/images/profile-avatar.jpeg";
import Button from "@/components/Button";
import DownloadCvButton from "@/components/DownloadCvButton";
import { SiTypescript, SiGo, SiPostgresql, SiFlutter } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { LuCloud } from "react-icons/lu";
import { TbApi, TbInfinity } from "react-icons/tb";
import { MdOutlineDescription } from "react-icons/md";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CvBanner = emotionStyled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.25rem",
  backgroundColor: "#f2f0ee",
  padding: "1.25rem 1.75rem",
  borderRadius: "16px",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
  marginTop: "1rem",
  marginBottom: "2.5rem",
  flexWrap: "wrap",
  [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
    flexDirection: "column",
    alignItems: "stretch",
    padding: "1.25rem",
  },
  "& .banner-left": {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  "& .banner-icon": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    color: theme.colors.button.blue,
    flexShrink: 0,
  },
  "& .banner-title": {
    fontSize: "15px",
    fontWeight: 700,
    color: "#111111",
    margin: 0,
  },
  "& .banner-subtitle": {
    fontSize: "13px",
    color: "#666666",
    margin: "0.2rem 0 0 0",
  },
}));

const TECH_EXPERTISE = [
  {
    name: "TypeScript",
    icon: <SiTypescript size={22} color="#007ACC" />,
  },
  {
    name: "Go",
    icon: <SiGo size={26} color="#00ADD8" />,
  },
  {
    name: "React.js",
    icon: <FaReact size={22} color="#61DAFB" />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql size={22} color="#336791" />,
  },
  {
    name: "Flutter",
    icon: <SiFlutter size={20} color="#02569B" />,
  },
  {
    name: "Cloud Infrastructure",
    icon: <LuCloud size={22} color="#4285F4" />,
  },
  {
    name: "API Design",
    icon: <TbApi size={24} color="#150c6c" />,
  },
  {
    name: "DevOps",
    icon: <TbInfinity size={24} color="#150c6c" />,
  },
];

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
    opacity: 0,
    animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards`,
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
      width: "180px",
      height: "180px",
      borderRadius: "32px",
      objectFit: "cover",
      boxShadow: theme.shadow[3],
    },
  },

  "& .subsection-title": {
    marginTop: "3.5rem",
    fontWeight: 600,
    marginBottom: "1rem",
  },

  "& .content": {
    width: "100%",
    opacity: 0,
    animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards`,
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

  "& .tech-badge-grid": {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "0.85rem",
    marginTop: "1.25rem",
    width: "100%",
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "0.6rem",
    },
    [`@media (max-width: 380px)`]: {
      gridTemplateColumns: "1fr",
    },
  },

  "& .tech-badge-card": {
    display: "flex",
    alignItems: "center",
    gap: "0.65rem",
    backgroundColor: "#ffffff",
    padding: "0.75rem 0.85rem",
    borderRadius: "12px",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)",
    border: "1px solid rgba(0, 0, 0, 0.06)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    minWidth: 0,
    boxSizing: "border-box",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
    },
    "& span": {
      fontSize: "14px",
      fontWeight: 600,
      color: "#222222",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
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
              I help <strong>modernize technical ecosystems</strong>, with hands-on experience in <strong>streamlining cloud infrastructure</strong> and applications.
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

          <CvBanner>
            <div className="banner-left">
              <div className="banner-icon">
                <MdOutlineDescription size={26} />
              </div>
              <div>
                <h4 className="banner-title">Download CV / Resume</h4>
                <p className="banner-subtitle">
                  Looking for a detailed summary of my experience?
                </p>
              </div>
            </div>
            <DownloadCvButton color="blue" variant="filled" />
          </CvBanner>

          <Typography variant="title" className="subsection-title">Technical Expertise:</Typography>
          <div className="tech-badge-grid">
            {TECH_EXPERTISE.map((tech, idx) => (
              <div key={idx} className="tech-badge-card">
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
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
