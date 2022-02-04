import styled from "@emotion/styled";
import Typography, { TypographyProps } from "./Typography";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "nowrap",

  "&:after": {
    content: "' '",
    width: "3rem",
    borderBottom: "2px solid",
    marginLeft: "1rem",
  },
}));

const Heading = ({ css, variant = "heading2", ...props }: TypographyProps) => {
  return (
    <Root>
      <Typography variant={variant} css={[css]} {...props} />
    </Root>
  );
};

export default Heading;
