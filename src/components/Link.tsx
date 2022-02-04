import styled from "@emotion/styled";

export interface LinkProps {
  color?: "red" | "white" | "black";
}

const Link = styled.a<LinkProps>(({ theme, color }) => {
  let textColor = "inherit";

  switch (color) {
    case "red":
      textColor = "#99231e";
      break;
    case "black":
      textColor = theme.colors.text;
      break;
    case "white":
      textColor = "white";
      break;
    default:
      break;
  }

  return {
    display: "block",
    textDecoration: "none",
    color: textColor,
    fontWeight: "bold",
  };
});

export default Link;
