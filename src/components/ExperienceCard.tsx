import { useState } from "react";
import styled from "@emotion/styled";
import { FaBuilding, FaChevronRight } from "react-icons/fa";
import { CommonComponentProps } from "./types";
import Chip from "./Chip";

const CardRoot = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  padding: "1rem 0",
  gap: "1.5rem",
  borderBottom: "1px solid #e0e0e0",
  "&:last-child": {
    borderBottom: "none",
  },
  
  "& .logo-col": {
    width: "48px",
    flexShrink: 0,
  },

  "& .logo": {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "white",
    color: theme.colors.button.blue,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    marginTop: "4px",
    boxShadow: theme.shadow[0],
  },

  "& .content-col": {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },

  "& .work-period": {
    fontSize: "14px",
    color: "#666",
    fontWeight: 500,
  },

  "& .job-title": {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "6px",
  },

  "& .company-name": {
    fontSize: "16px",
    fontWeight: "600",
    color: "#444",
    marginTop: "6px",
  },

  "& .tech-chips": {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "1.25rem",
  },

  "& .description": {
    marginTop: "1.25rem",
    fontSize: "16px",
    lineHeight: 1.6,
  },

  "& .show-more-btn": {
    marginTop: "1.5rem",
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0",
    background: "none",
    border: "none",
    color: theme.colors.button.red,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    "&:hover": {
      textDecoration: "underline",
    }
  },

  "& .more-info": {
    marginTop: "1rem",
    fontSize: "15px",
    lineHeight: 1.6,
    paddingLeft: "1.5rem",
    "& li": {
      marginBottom: "0.5rem",
    }
  }
}));

export interface ExperienceCardProps extends CommonComponentProps {
  companyName: string;
  jobTitle: string;
  workPeriod: string;
  description?: string;
  techs?: string[];
  moreInfo?: string[];
  logo?: string;
}

const ExperienceCard = ({
  companyName,
  jobTitle,
  workPeriod,
  description,
  techs,
  moreInfo,
  logo,
  ...props
}: ExperienceCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <CardRoot {...props}>
      <div className="logo-col">
        <div className="logo">
          {logo ? (
            <img 
              src={logo} 
              alt={companyName} 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'contain', padding: '4px' }} 
            />
          ) : (
            <FaBuilding />
          )}
        </div>
      </div>
      <div className="content-col">
        <div className="work-period">{workPeriod}</div>
        <div className="job-title">{jobTitle}</div>
        <div className="company-name">{companyName}</div>

        {description && <div className="description">{description}</div>}

        {techs && techs.length > 0 && (
          <div className="tech-chips">
            {techs.map((tech, idx) => (
              <Chip key={idx} color="blue">{tech}</Chip>
            ))}
          </div>
        )}

        {moreInfo && moreInfo.length > 0 && (
          <>
            <button 
              className="show-more-btn" 
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less" : "Read More"} <FaChevronRight size={12} style={{ transform: expanded ? 'rotate(-90deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {expanded && (
              <ul className="more-info">
                {moreInfo.map((info, idx) => (
                  <li key={idx}>{info}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </CardRoot>
  );
};

export default ExperienceCard;
