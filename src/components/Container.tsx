import { CommonComponentProps } from "./types";

export interface ContainerProps
  extends CommonComponentProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: any;
}

const Container = ({ css: customStyles, ...props }: ContainerProps) => {
  return (
    <div
      css={[
        (theme) => `
				width: 1100px;
				max-width: 1100px;
        margin: auto;
        padding: 2rem;

				@media (max-width: ${theme.breakpoints.xl}px) {
					width: 1000px;
				  max-width: 1000px;
				}
				@media (max-width: ${theme.breakpoints.lg}px) {
					width: auto;
				}
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
