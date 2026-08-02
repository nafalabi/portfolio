import { useState } from "react";
import styled from "@emotion/styled";
import { FaBuilding, FaChevronDown } from "react-icons/fa";
import { CommonComponentProps } from "./types";

const CardRoot = styled.div(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  gap: "1.5rem",
  alignItems: "flex-start",

  [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: "1rem",
  },

  "& .node-wrapper": {
    position: "relative",
    zIndex: 2,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "32px",
  },

  "&:not(:last-child)::after": {
    content: '""',
    position: "absolute",
    left: "15px",
    top: "46px",
    height: "calc(100% + 2rem)",
    width: "2px",
    backgroundColor: "rgba(0, 0, 0, 0.18)",
    borderRadius: "1px",
    zIndex: 1,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  },

  "& .timeline-dot": {
    position: "relative",
    zIndex: 2,
    width: "16px",
    height: "16px",
    marginTop: "38px",
    borderRadius: "50%",
    backgroundColor: theme.colors.button.blue,
    boxShadow: `0 0 0 4px ${theme.colors.background}`,
    border: "2px solid #ffffff",
    boxSizing: "border-box",
  },

  "& .card-body": {
    flexGrow: 1,
    backgroundColor: "#f2f0ee",
    borderRadius: "16px",
    padding: "1.5rem 1.75rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    transition: "all 0.25s ease",
    "&:hover": {
      backgroundColor: "#f9f8f6",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 28px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.03)",
      borderColor: "rgba(0, 0, 0, 0.12)",
    },
  },

  "& .header-row": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.75rem",
  },

  "& .title-with-logo": {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  "& .company-logo-container": {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    color: theme.colors.button.blue,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    flexShrink: 0,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      padding: "3px",
    },
  },

  "& .title-text-group": {
    display: "flex",
    flexDirection: "column",
  },

  "& .job-title": {
    fontSize: "20px",
    fontWeight: 700,
    color: theme.colors.text,
    lineHeight: 1.3,
  },

  "& .company-name": {
    fontSize: "15px",
    fontWeight: 600,
    color: theme.colors.button.blue,
    marginTop: "0.2rem",
  },

  "& .work-period-badge": {
    fontSize: "13px",
    fontWeight: 600,
    color: "#444444",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: "0.35rem 0.85rem",
    borderRadius: "20px",
    whiteSpace: "nowrap",
    border: "1px solid rgba(0, 0, 0, 0.08)",
  },

  "& .description": {
    marginTop: "1rem",
    fontSize: "15px",
    lineHeight: 1.65,
    color: "#333333",
  },

  "& .tech-chips": {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "1.25rem",
  },

  "& .tech-tag": {
    fontSize: "12px",
    fontWeight: 600,
    color: "#222222",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    padding: "0.3rem 0.85rem",
    borderRadius: "20px",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#f7f5f3",
      borderColor: "rgba(0, 0, 0, 0.15)",
    },
  },

  "& .toggle-details-btn": {
    marginTop: "1.25rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.4rem 0.85rem",
    borderRadius: "8px",
    backgroundColor: "transparent",
    border: "1px solid rgba(153, 27, 27, 0.2)",
    color: theme.colors.button.red,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "13px",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(153, 27, 27, 0.06)",
      borderColor: theme.colors.button.red,
    },
  },

  "& .more-info-container": {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px dashed rgba(0, 0, 0, 0.1)",
  },

  "& .more-info-list": {
    margin: 0,
    paddingLeft: "1.25rem",
    fontSize: "14px",
    lineHeight: 1.65,
    color: "#444444",
    "& li": {
      marginBottom: "0.6rem",
      "&:last-child": {
        marginBottom: 0,
      },
    },
  },
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
      <div className="node-wrapper">
        <div className="timeline-dot" />
      </div>

      <div className="card-body">
        <div className="header-row">
          <div className="title-with-logo">
            <div className="company-logo-container">
              {logo ? (
                <img src={logo} alt={companyName} />
              ) : (
                <FaBuilding size={20} />
              )}
            </div>
            <div className="title-text-group">
              <div className="job-title">{jobTitle}</div>
              <div className="company-name">{companyName}</div>
            </div>
          </div>
          <div className="work-period-badge">{workPeriod}</div>
        </div>

        {description && <div className="description">{description}</div>}

        {techs && techs.length > 0 && (
          <div className="tech-chips">
            {techs.map((tech, idx) => (
              <span key={idx} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        {moreInfo && moreInfo.length > 0 && (
          <>
            <button
              className="toggle-details-btn"
              onClick={() => setExpanded(!expanded)}
            >
              <span>{expanded ? "Hide Details" : "Key Accomplishments & Impact"}</span>
              <FaChevronDown
                size={11}
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                }}
              />
            </button>

            {expanded && (
              <div className="more-info-container">
                <ul className="more-info-list">
                  {moreInfo.map((info, idx) => (
                    <li key={idx}>{info}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </CardRoot>
  );
};

export default ExperienceCard;
