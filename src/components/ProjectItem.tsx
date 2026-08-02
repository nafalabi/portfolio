import styled from "@emotion/styled";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FocusEvent, useState } from "react";

const RootProjectItem = styled.div(({ theme }) => ({
  marginBottom: "3.5rem",
  display: "flex",
  flexDirection: "row",
  gap: "2rem",
  alignItems: "center",

  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: "1.25rem",
  },

  "& .project-image": {
    position: "relative",
    flexShrink: 0,
    width: "42%",
    minWidth: "280px",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "100%",
    },

    "& .carousel-container": {
      position: "relative",
      transition: "all 0.3s ease",
      cursor: "zoom-in",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
      border: "1px solid rgba(0, 0, 0, 0.08)",

      "& img": {
        borderRadius: "12px",
        display: "block",
        objectFit: "cover",
      },
    },

    "&.enlarged": {
      "& .carousel-container": {
        padding: "0.5rem",
        borderRadius: "12px",
        backgroundColor: theme.colors.background2,
        boxShadow: theme.shadow[3],
        transform: "scale(1.8) translate3d(15%, 0, 10px)",
        zIndex: 1000,
        maxHeight: "100vh",
        width: "auto",
        cursor: "grabbing",
      },
    },
  },

  "& .project-detail": {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",

    "& .title-container": {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      flexWrap: "wrap",
    },

    "& .title": {
      fontSize: "22px",
      fontWeight: 600,
      color: theme.colors.text,
      lineHeight: 1.2,
    },

    "& .company-badge": {
      fontSize: "12px",
      fontWeight: 600,
      color: "#555555",
      backgroundColor: "rgba(0, 0, 0, 0.06)",
      padding: "3px 10px",
      borderRadius: "12px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },

    "& .description": {
      fontSize: "15px",
      lineHeight: 1.5,
      color: "#333333",
      whiteSpace: "pre-wrap",
    },

    "& .techs": {
      display: "flex",
      gap: "0.4rem 0.5rem",
      flexWrap: "wrap",
      marginTop: "0.25rem",
      marginBottom: "0.5rem",
    },

    "& .tech-badge": {
      fontSize: "13px",
      fontWeight: 500,
      color: "#2b3e50",
      backgroundColor: "#e4e2de",
      padding: "4px 10px",
      borderRadius: "6px",
      border: "1px solid rgba(0, 0, 0, 0.05)",
    },

    "& .links": {
      display: "flex",
      gap: "0.75rem",
      flexWrap: "wrap",
      marginTop: "0.25rem",
    },

    "& .action-button": {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "8px 16px",
      borderRadius: "20px",
      backgroundColor: theme.colors.button.blue,
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 500,
      textDecoration: "none",
      transition: "all 0.2s ease",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
      "&:hover": {
        opacity: 0.9,
        transform: "translateY(-1px)",
      },
    },
  },
}));

export interface ProjectItemProps {
  images: string[];
  title: string;
  company?: string;
  description: string;
  techs: string[];
  links: { text: string | JSX.Element; link: string }[];
}

const ProjectItem = ({
  images,
  title,
  company,
  description,
  techs,
  links,
}: ProjectItemProps) => {
  const [isCarouselEnlarged, setEnlargeCarousel] = useState(false);

  const handleClickCarousel = () => {
    setEnlargeCarousel((oldVal) => !oldVal);
    setEnlargeCarousel(true);
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement, Element>) => {
    const el = e.relatedTarget;
    const ignore = ["control-arrow", "dot"];
    if (ignore.some((cls) => el?.classList?.contains(cls))) {
      return;
    }
    setEnlargeCarousel(false);
  };

  return (
    <RootProjectItem>
      {images.length > 0 && (
        <div
          className={"project-image" + (isCarouselEnlarged ? " enlarged" : "")}
          onClick={handleClickCarousel}
          onBlurCapture={handleBlur}
          tabIndex={-1}
        >
          <div className="carousel-container" title="Click to enlarge">
            <Carousel
              showArrows={true}
              swipeable={true}
              emulateTouch={true}
              showThumbs={false}
            >
              {images.map((img, index) => (
                <img src={img} key={index} alt={`${title} screenshot ${index + 1}`} />
              ))}
            </Carousel>
          </div>
        </div>
      )}
      <div className="project-detail">
        <div className="title-container">
          <div className="title">{title}</div>
          {company && <span className="company-badge">{company}</span>}
        </div>
        <div className="description">{description}</div>
        <div className="techs">
          {techs.map((tech) => (
            <span className="tech-badge" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <div className="links">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="action-button"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </RootProjectItem>
  );
};

export default ProjectItem;
