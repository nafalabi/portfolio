import { Interpolation, Theme } from "@emotion/react";

export interface CommonComponentProps {
  css?: Interpolation<Theme>;
  children?: any;
}
