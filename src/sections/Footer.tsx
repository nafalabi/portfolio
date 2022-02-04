import styled from "@emotion/styled";
import Container from "components/Container";
import Link from "components/Link";
import { transparentize } from "polished";

const FooterRoot = styled.div(({ theme }) => ({
  display: "flex",
  height: "100px",
  backgroundColor: theme.colors.background2,
  color: transparentize(0.3)(theme.colors.text2),
  fontSize: 13,
}));

const Footer = () => {
  return (
    <FooterRoot id="footer" className="section">
      <Container
        css={{ display: "flex", flexGrow: 1, justifyContent: "space-between" }}
      >
        <div>Built with Gastbyjs &nbsp;&middot;&nbsp; Nanda Abi Fahmi</div>
        <div css={{ display: "flex", gap: "0.5rem" }}>
          <Link href="https://github.com/nafalabi">Github</Link>
          <Link href="https://www.linkedin.com/in/nanda-abi-fahmi/">
            LinkedIn
          </Link>
          <Link href="mailto:nandaabifahmi@gmail.com">Email</Link>
        </div>
      </Container>
    </FooterRoot>
  );
};

export default Footer;
