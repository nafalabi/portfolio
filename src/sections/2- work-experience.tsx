import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Box from "../components/Box";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Timeline from "../components/Timeline";

import mplusLogo from "images/mplus.ico";
import freelanceLogo from "images/freelance.svg";
import WorkExperienceItem, {
  WorkExperience,
} from "components/WorkExperienceItem";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.colors.background2,
  color: theme.colors.text2,
  height: "100vh",
  width: "100%",
  minHeight: "670px",

  "@media (max-width: 600px)": {
    height: "auto",
    padding: "2rem 0",
  },
}));

const workExperiences: WorkExperience[] = [
  {
    jobTitle: "Freelance Software Engineer",
    timeRange: "May 2021 - Feb 2022",
    company: "Freelance",
    companyIcon: freelanceLogo,
    description:
      "Working on various projects from website to mobile apps\nTech used: Laravel, Codeigniter, React.js, and flutter",
  },
  {
    jobTitle: "System Administrator",
    timeRange: "Aug 2020 - May 2021",
    company: "M+ Software",
    companyIcon: mplusLogo,
    description:
      "Responsibility\n- Setting up an environment for a project's app/website. Usually includes setting up a server instance, setting up standardize server utilities, setting up required services, domain management, etc.\n- Responsible for monitoring server abnormal activities as well as setting up server alerts\n- Maintaining server and fixing breaking changes when an unintentional update occurred",
  },
  {
    jobTitle: "Software Engineer",
    timeRange: "Des 2018 - May 2021",
    company: "M+ Software",
    companyIcon: mplusLogo,
    description:
      "Being a core developer to maintain & improve an existing project.\nColaborate with the team to develop web & mobile apps.\nTech used: React.js, Codeigniter, React Native",
  },
];

const Section2WorkExperience = () => {
  const theme = useTheme();

  return (
    <Root id="workExperience">
      <Container css={{ position: "relative" }}>
        <Heading>Working Experience</Heading>
        <Box
          css={{
            marginTop: "4rem",
          }}
        >
          <Timeline
            foreColor={theme.colors.text2}
            backgroundColor={theme.colors.background2}
            itemGap={30}
          >
            {workExperiences.map((props) => (
              <WorkExperienceItem
                key={props.jobTitle + props.company}
                {...props}
              />
            ))}
          </Timeline>
        </Box>
      </Container>
    </Root>
  );
};

export default Section2WorkExperience;
