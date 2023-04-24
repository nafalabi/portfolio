import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Box from "../components/Box";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Timeline from "../components/Timeline";
import WorkExperienceItem, { WorkExperience } from "components/WorkExperienceItem";

import mplusLogo from "images/mplus.ico";
import freelanceLogo from "images/freelance.svg";
import majooLogo from "images/company/majoo.jpeg";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.colors.background2,
  color: theme.colors.text2,
  minHeight: "100vh",
  width: "100%",

  "@media (max-width: 600px)": {
    height: "auto",
    padding: "2rem 0",
  },
}));

const workExperiences: WorkExperience[] = [
  {
    jobTitle: "Software Engineer",
    timeRange: "May 2021 - Present",
    company: "Freelance",
    companyIcon: freelanceLogo,
    description:
      "Working on various projects from website to mobile apps.\nNotable works:\n- Develop super app for coffee company (Toffin) using Flutter\n- Develop recurring payment web app for a private company using Laravel and React.js\nTech used: Laravel, Codeigniter, React.js, Flutter",
  },
  {
    jobTitle: "Frontend Engineer",
    timeRange: "Mar 2022 - Feb 2023",
    company: "Majoo Indonesia",
    companyIcon: majooLogo,
    description:
      "Responsibility, working with a team on Third Party Marketplace Management\n- Doing new features, maintenance & bug fix dashboard platfor\n- Contributed to the company's effort to redesign the dashboard platform to the new design\n- Improve legacy code to comply with the best practices\nWorking scope: marketplace aggregation & transaction (Tokopedia, Shopee, Bukalapak, Grabfood, Gofood)\nTech used: React.js, React hooks & Context API, Stitches.js",
  },
  {
    jobTitle: "System Administrator",
    timeRange: "Aug 2020 - May 2021",
    company: "M+ Software",
    companyIcon: mplusLogo,
    description:
      "Responsibility\n- Setting up an environment for a project's app/website. Usually includes setting up a server instance, setting up standardize server utilities, setting up required services, domain management, etc.\n- Responsible for monitoring server abnormal activities as well as setting up server alerts\n- Maintaining server and fixing breaking changes when an unintentional update occurred\nSkills: Linux Server Administration, Shell Scripting, AWS Cloud, Nagios Monitoring Server, Dokuwiki",
  },
  {
    jobTitle: "Software Engineer",
    timeRange: "Des 2018 - May 2021",
    company: "M+ Software",
    companyIcon: mplusLogo,
    description:
      "Responsibility:\n- Being a core developer to maintain & improve an a project called SARA, a software-as-a-service staff-communication tool for managing service and maintenance requests in hotels. Responsible for doing new features as well as improving the existing functions/processes\n- Collaborate with the team to develop web & mobile apps\nNotable works\n- Successfully implemented a chat feature with media and audio attachment using Firebase and CouchDB\n- Successfully migrated an admin panel from monolithic CodeIgniter pages into React.js, implemented using custom webpack and custom CodeIgniter view\nTech used: React.js, Codeigniter, React Native, Firebase, CouchDB",
  },
];

const Section2WorkExperience = () => {
  const theme = useTheme();

  return (
    <Root id="workExperience" className="section">
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
