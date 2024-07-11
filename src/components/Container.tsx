import { ReactNode } from "react";
import { CommonComponentProps } from "./types";

export interface ContainerProps
  extends CommonComponentProps,
  React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Container = ({ css: customStyles, ...props }: ContainerProps) => {
  return (
    <div
      css={[
        (theme) => `
        box-sizing: border-box;
				max-width: ${theme.breakpoints.md}px;
        margin: auto;
        padding: 2rem;
        @media (max-width: ${theme.breakpoints.sm}px) {
          padding: 1rem;
        }
			`,
        customStyles,
      ]}
      {...props}
    />
  );
};

export default Container;
