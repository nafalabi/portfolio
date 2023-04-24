import styled from "@emotion/styled";
import Chip from "./Chip";
import Link from "./Link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Component, useEffect, useState } from "react";

const RootProjectItem = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  gap: "1.5rem",
  marginBottom: "2rem",
  alignItems: "center",

  "& .project-image": {
    position: "relative",
    flexGrow: 1,
    minWidth: "300px",
    width: "100%",

    "& .carousel-container": {
      position: "relative",
      transition: "all 0.3s ease",
      cursor: "zoom-in",
    },

    "&.enlarged": {
      "& .carousel-container": {
        padding: "0.5rem",
        borderRadius: "5px",
        backgroundColor: theme.colors.background2,
        boxShadow: theme.shadow[3],
        transform: "scale(2) translate3d(27%, 0, 10px)",
        zIndex: 1000,
        maxHeight: "100vh",
        width: "auto",
        cursor: "grabbing",
      },
    },
  },

  "& .project-detail": {
    flexGrow: 1,
    width: "100%",

    "& > *": {
      marginBottom: "0.5rem",
    },

    "& .title": {
      fontSize: "25px",
      fontWeight: "bold",
    },

    "& .description": {
      whiteSpace: "pre-wrap",
    },

    "& .techs": {
      marginTop: "1rem",
      display: "flex",
      gap: "0.5rem",
      flexWrap: "wrap",
    },

    "& .links": {
      display: "flex",
      gap: "1rem",
      marginTop: "1rem",
    },
  },

  "@media (max-width: 600px)": {
    flexWrap: "wrap",
  },
}));

export interface ProjectItemProps {
  images: any[];
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

  const handleBlur = () => {
    setEnlargeCarousel(false);
  };

  return (
    <RootProjectItem>
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
              <img src={img} key={index} />
            ))}
          </Carousel>
        </div>
      </div>
      <div className="project-detail">
        <div className="title">{title}</div>
        {company && (
          <div className="company">{company}</div>
        )}
        <div className="description">{description}</div>
        <div className="techs">
          {techs.map((tech) => (
            <Chip color="blue" key={tech}>
              {tech}
            </Chip>
          ))}
        </div>
        <div className="links">
          {links.map((link) => (
            <Link key={link.link} href={link.link} color="red">
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </RootProjectItem>
  );
};

export default ProjectItem;
