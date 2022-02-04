import styled from "@emotion/styled";
import Chip from "./Chip";
import Link from "./Link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    cursor: "pointer",
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
  company: string;
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
  return (
    <RootProjectItem>
      <div className="project-image">
        <Carousel
          showArrows={true}
          onChange={() => {}}
          onClickItem={() => {}}
          onClickThumb={() => {}}
          swipeable={true}
          emulateTouch={true}
          showThumbs={false}
        >
          {images.map((img, index) => (
            <img src={img} key={index} />
          ))}
        </Carousel>
      </div>
      <div className="project-detail">
        <div className="title">{title}</div>
        <div className="company">{company}</div>
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
