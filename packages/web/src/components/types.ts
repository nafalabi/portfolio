import { Interpolation, Theme } from "@emotion/react";
import { ReactNode } from "react";

export interface CommonComponentProps {
  css?: Interpolation<Theme>;
  children?: ReactNode;
}
