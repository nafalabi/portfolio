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

const CONTACT_CHANNELS = [
  {
    label: "LinkedIn",
    value: "in/nanda-abi-fahmi",
    link: "https://www.linkedin.com/in/nanda-abi-fahmi/",
    icon: <FaLinkedin size={26} color="#0A66C2" />,
  },
  {
    label: "Email",
    value: "nandaabifahmi@gmail.com",
    link: "mailto:nandaabifahmi@gmail.com",
    icon: <FaEnvelope size={24} color="#EA4335" />,
  },
  {
    label: "GitHub",
    value: "github.com/nafalabi",
    link: "https://github.com/nafalabi",
    icon: <FaGithub size={26} color="#24292e" />,
  },
  {
    label: "Mobile",
    value: "+62 851-7317-4375",
    link: "tel:+6285173174375",
    icon: <FaPhoneSquareAlt size={24} color="#25D366" />,
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

  "& .section-title": {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
  },

  "& .content": {
    marginTop: "2rem",
    width: "100%",
  },

  "& .lead-intro": {
    fontSize: "16px",
    lineHeight: 1.55,
    color: "#333333",
    marginBottom: "2.5rem",
    maxWidth: "680px",
  },

  "& .contact-grid": {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1.25rem",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      gridTemplateColumns: "1fr",
    },
  },

  "& .contact-card": {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
    backgroundColor: "#f2f0ee",
    padding: "1.25rem 1.5rem",
    borderRadius: "16px",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
    textDecoration: "none",
    color: "inherit",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
      borderColor: "rgba(0, 0, 0, 0.14)",
    },
  },

  "& .icon-box": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    flexShrink: 0,
  },

  "& .card-info": {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
    overflow: "hidden",
  },

  "& .card-label": {
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "#666666",
  },

  "& .card-value": {
    fontSize: "15px",
    fontWeight: 600,
    color: "#111111",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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
          paddingTop: "2rem",
          paddingBottom: "4rem",
        }}
      >
        <div className="section-title">
          <Typography variant="heading">Contact</Typography>
          <Typography css={{ fontSize: "medium", opacity: 0.8, marginTop: "0.25rem" }}>
            Get in touch with me
          </Typography>
        </div>
        <div className="content">
          <p className="lead-intro">
            If you're working on interesting challenges or want to talk about anything, feel free to reach out!
          </p>

          <div className="contact-grid">
            {CONTACT_CHANNELS.map((item) => (
              <a
                key={item.label}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="icon-box">{item.icon}</div>
                <div className="card-info">
                  <span className="card-label">{item.label}</span>
                  <span className="card-value">{item.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
      <Footer />
    </Root>
  );
};

export default ContactPage;
