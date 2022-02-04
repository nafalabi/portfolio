import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Box from "components/Box";
import Card from "components/Card";
import Chip from "components/Chip";
import Container from "components/Container";
import Link from "components/Link";
import Typography from "components/Typography";
import { darken, lighten } from "polished";
import { FaGithub, FaLinkedin, FaEnvelopeSquare } from "react-icons/fa";

const Root = styled("div")(
  ({ theme }) => `
  display: flex;
  height: 100vh;
  width: 100%;
  min-height: 620px;
  position: relative;
	overflow: hidden;
  background-color: white;
  color: ${theme.colors.text};
  box-shadow: ${theme.shadow[1]};

	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		flex-wrap: wrap;
		padding-top: 0;
		padding-bottom: 0;
		width: 100%;
		height: 100%;

		.heading {
		 	position: relative;
		}

		.content {
			margin-left: 2rem;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			.col {
				display: flex;
				flex-direction: column;
				align-self: center;
			}
		}
	}

	@media (max-width: 600px) {
    height: auto;

		.container {
			margin-top: 2rem;
			margin-bottom: 2rem;
		}
  },
	
`
);

const Section3AboutMe = () => {
  return (
    <Root id="aboutMe" className="section">
      <Container className="container">
        <div className="heading">
          <Typography variant="heading">about me</Typography>
          <Typography>Get to know a little about me</Typography>
        </div>
        <div className="content">
          <div className="col">
            <Card title="Educations">
              <div>Universitas Bina Sarana Informatika</div>
              <div css={{ fontSize: 10 }}>Informatics Management</div>
            </Card>

            <Card title="Skills">
              <div>Fullstack Development</div>
              <div>Web Development</div>
              <div>Mobile Development</div>
              <div>System Administration</div>
            </Card>
          </div>

          <div className="col">
            <Card title="Technologies">
              <Box css={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <Chip color="blue">React.js</Chip>
                <Chip color="blue">Redux</Chip>
                <Chip color="blue">Typescript</Chip>
                <Chip color="blue">Firebase</Chip>
                <Chip color="blue">CouchDB</Chip>
                <Chip color="blue">MongoDB</Chip>
                <Chip color="blue">Mysql</Chip>
                <Chip color="blue">Node.js</Chip>
                <Chip color="blue">Laravel</Chip>
                <Chip color="blue">Flutter</Chip>
                <Chip color="blue">React Native</Chip>
                <Chip color="blue">Docker</Chip>
              </Box>
            </Card>

            <Card title="Contacts">
              <Link
                href="https://www.linkedin.com/in/nanda-abi-fahmi/"
                color="red"
              >
                <FaLinkedin
                  css={{ marginRight: "0.5rem", marginBottom: "-2px" }}
                />
                LinkedIn
              </Link>
              <Link href="https://github.com/nafalabi" color="red">
                <FaGithub
                  css={{ marginRight: "0.5rem", marginBottom: "-2px" }}
                />
                Github
              </Link>
              <Link href="mailto:nandaabifahmi@gmail.com" color="red">
                <FaEnvelopeSquare
                  css={{ marginRight: "0.5rem", marginBottom: "-2px" }}
                />
                E-Mail
              </Link>
            </Card>
          </div>
        </div>
      </Container>
    </Root>
  );
};

export default Section3AboutMe;
