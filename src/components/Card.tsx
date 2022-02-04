import styled from "@emotion/styled";
import { CommonComponentProps } from "./types";

const CardRoot = styled.div(({ theme }) => ({
  padding: "2rem",
  background: "white",
  color: "#333",
  borderRadius: "0.5rem",
  boxShadow: theme.shadow[0],
  margin: "10px",
  width: "200px",
  transition: "all 0.3s ease",

  "& .title": {
    fontSize: "20px",
    fontWeight: "bold",
  },

  "& .body": {
    marginTop: "1rem",
    fontSize: "15px",
    lineHeight: 1.5,
  },

  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: theme.shadow[1],
  },
}));

export interface CardProps extends CommonComponentProps {
  title: string;
}

const Card = ({ title, children, ...props }: CardProps) => {
  return (
    <CardRoot {...props}>
      <div className="title">{title}</div>
      <div className="body">{children}</div>
    </CardRoot>
  );
};

export default Card;
