import styled from "@emotion/styled";
import { darken } from "polished";

export type ButtonColors = "blue" | "red";
export type ButtonVariants = "filled" | "outlined";

export interface ButtonProps {
  color?: ButtonColors;
  variant?: ButtonVariants;
}

const Button = styled.button<ButtonProps>(({ theme, color, variant = "filled" }) => {
  let backgroundColor = theme.colors.button.blue;
  const textColor = theme.colors.buttonText.white;

  switch (color) {
    case "blue":
      backgroundColor = theme.colors.button.blue;
      break;
    case "red":
      backgroundColor = theme.colors.button.red;
      break;
    default:
      break;
  }

  const isOutlined = variant === "outlined";

  return {
    appearance: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: isOutlined ? `2px solid ${backgroundColor}` : "none",
    backgroundColor: isOutlined ? "transparent" : backgroundColor,
    color: isOutlined ? backgroundColor : textColor,
    padding: "0.55rem 1.5rem",
    borderRadius: "2rem",
    cursor: "pointer",
    boxShadow: isOutlined ? "none" : theme.shadow[2],
    fontSize: "15px",
    fontWeight: 500,
    lineHeight: 1.2,
    transition: "all 0.2s ease-in",

    "&:hover": {
      backgroundColor: isOutlined ? `${backgroundColor}10` : darken(0.05)(backgroundColor),
      boxShadow: isOutlined ? "none" : theme.shadow[3],
      transform: "translateY(-1px)",
    },
  };
});

export default Button;
