import styled from "@emotion/styled";
import { ReactNode } from "react";

const CardRoot = styled.div(() => ({
  display: "flex",
  flexDirection: "row" as const,
  gap: "1.25rem",
  alignItems: "flex-start",
  padding: "0.25rem 0",

  "& .icon-container": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "56px",
    height: "56px",
    flexShrink: 0,
    borderRadius: "14px",
    backgroundColor: "#efefef",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
    color: "#010102",
  },

  "& .info": {
    flex: 1,
    lineHeight: 1.5,
    fontSize: "16px",
    paddingTop: "4px",
  },
}));

interface ExpertiseCardProps {
  icon: ReactNode;
  title: string;
  items: string;
}

const ExpertiseCard = ({ icon, title, items }: ExpertiseCardProps) => {
  return (
    <CardRoot>
      <div className="icon-container">{icon}</div>
      <div className="info">
        <span style={{ fontWeight: 600, marginRight: "4px" }}>
          {title}:
        </span>
        <span style={{ opacity: 0.9 }}>
          {items}
        </span>
      </div>
    </CardRoot>
  );
};

export default ExpertiseCard;
