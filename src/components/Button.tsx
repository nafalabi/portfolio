import styled from "@emotion/styled";
import { darken } from "polished";

export type ButtonColors = "blue" | "red";

export interface ButtonProps {
  color?: ButtonColors;
}

const StyledButton = styled.button<ButtonProps>(({ theme, color }) => {
  let backgroundColor = theme.colors.button.blue;
  let textColor = theme.colors.buttonText.white;

  switch (color) {
    case "blue":
      backgroundColor = theme.colors.button.blue;
      textColor = theme.colors.buttonText.white;
      break;
    case "red":
      backgroundColor = theme.colors.button.red;
      textColor = theme.colors.buttonText.white;
      break;
    default:
      break;
  }

  return {
    appearance: "none",
    border: "none",
    backgroundColor: backgroundColor,
    color: textColor,
    padding: "0.5rem 1rem",
    borderRadius: "1rem",
    cursor: "pointer",
    boxShadow: theme.shadow[2],
    fontSize: "17px",
    transition: "all 0.2s ease-in",

    "&:hover": {
      backgroundColor: darken(0.05)(backgroundColor),
      boxShadow: theme.shadow[3],
      borderRadius: "0.5rem",
    },
  };
});

export default StyledButton;
