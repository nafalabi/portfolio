import { CSSObject } from "@emotion/react";
import styled from "@emotion/styled";
import { CustomTheme } from "../theme";
import { CommonComponentProps } from "./types";

export type TypographyVariant = keyof CustomTheme["typography"];

export interface TypographyProps extends CommonComponentProps {
  variant?: TypographyVariant;
  fontWeight?: CSSObject["fontWeight"];
}

const Typography = styled.p<TypographyProps>(
  ({ theme, variant, fontWeight }) => ({
    fontFamily: "montserrat",
    margin: 0,
    fontSize: theme.typography[variant],
    fontWeight,
  })
);

export default Typography;
