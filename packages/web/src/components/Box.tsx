import { CommonComponentProps } from "./types";

const Box = ({ css, ...props }: CommonComponentProps) => {
  return <div css={css} {...props} />;
};

export default Box;
