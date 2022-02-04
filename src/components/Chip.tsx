import styled from "@emotion/styled";
import { CustomTheme } from "theme";
import { CommonComponentProps } from "./types";

interface ChipProps extends CommonComponentProps {
  color?: keyof CustomTheme["colors"]["chip"];
}

const Chip = styled.div<ChipProps>(({ theme, color = "default" }) => ({
  padding: "0.3rem 1rem",
  backgroundColor: theme.colors.chip[color],
  color: color !== "default" ? "white" : "initial",
  display: "inline-block",
  borderRadius: "2rem",
  fontSize: "12px",
}));

export default Chip;
