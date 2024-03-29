import * as React from "react";
import styled from "@emotion/styled";
import Container from "components/Container";
import ProjectItem, { ProjectItemProps } from "components/ProjectItem";
import Typography from "components/Typography";
import { FaGithub, FaLink } from "react-icons/fa";

import CHIdleScreenshot from "images/screenshots/ch/ch-idle.png";
import CHSearchOpen from "images/screenshots/ch/ch-search-panel-open.png";
import CHSearchKeyword from "images/screenshots/ch/ch-search-panel-entered-keyword.png";
import CHMenus from "images/screenshots/ch/ch-menus.png";
import CHNotes from "images/screenshots/ch/ch-notes.png";
import CHBookmarks from "images/screenshots/ch/ch-bookmarks.png";
import CHBackgroundSettings1 from "images/screenshots/ch/ch-background-settings1.png";
import CHBackgroundSettings2 from "images/screenshots/ch/ch-background-settings2.png";

import SARALanding from "images/screenshots/sara/landing.png";
import SARALogin from "images/screenshots/sara/login.png";
import SARAMainDashboard from "images/screenshots/sara/maindashboard.png";
import SARAScheduleDashboard from "images/screenshots/sara/scheduled-requests.png";
import SARAReports1 from "images/screenshots/sara/reports1.png";
import SARAReports2 from "images/screenshots/sara/reports2.png";
import SARAHotelAdminPage from "images/screenshots/sara/hotel-admin-homepage.png";
import SARAChecklistManagement from "images/screenshots/sara/checklist-management.png";

import PayLanding from "images/screenshots/payment-app/landing.png";
import PayAdminLogin from "images/screenshots/payment-app/admin-login.png";
import PayAdminPage from "images/screenshots/payment-app/admin-page.png";
import PayStep1 from "images/screenshots/payment-app/payment-step1.png";
import PayStep2 from "images/screenshots/payment-app/payment-step2.png";
import PayStep3 from "images/screenshots/payment-app/payment-step3.png";
import PayStep4 from "images/screenshots/payment-app/payment-step4.png";
import PayStep5 from "images/screenshots/payment-app/payment-step5.png";

import TofIntro from "images/screenshots/toffin/intro.png";
import TofRegister from "images/screenshots/toffin/register.png";
import TofForgotPass from "images/screenshots/toffin/forgot-password.png";
import TofMainHome from "images/screenshots/toffin/mainhomepage.png";
import TofMyAccount from "images/screenshots/toffin/myaccount.png";
import TofELearning from "images/screenshots/toffin/elearning.png";

import FirChatInitial from "images/screenshots/fir-chatapp/init.png";
import FirChatPreview from "images/screenshots/fir-chatapp/preview.gif";

import IntaraDevice from "images/screenshots/intara/intara-device.png";
import IntaraLogin from "images/screenshots/intara/intara-login.png";
import IntaraOverview from "images/screenshots/intara/intara-overview.png";
import IntaraPasien from "images/screenshots/intara/intara-pasien.png";
import IntaraUsage from "images/screenshots/intara/intara-usage.png";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  // borderTop: "5px solid",
  backgroundColor: theme.colors.background,
  color: theme.colors.text,

  "& .section-title": {
    textAlign: "center",
  },

  "& .content": {
    marginTop: "3rem",
  },

  "@media (max-width: 600px)": {
    height: "auto",
    padding: "2rem 0",
  },
}));

const projects: ProjectItemProps[] = [
  {
    title: "Convenient Homepage",
    images: [
      CHIdleScreenshot,
      CHSearchOpen,
      CHSearchKeyword,
      CHMenus,
      CHNotes,
      CHBookmarks,
      CHBackgroundSettings1,
      CHBackgroundSettings2,
    ],
    company: "Personal project",
    description:
      "Convenient Homepage is a chrome extension. it is intended to replace chrome's default new tab page but with many additional features such as automatic background rotation, built-in notes, and many more.",
    techs: ["React.js", "Redux", "Typescript", "Dexie.js", "Material UI	"],
    links: [
      {
        link: "https://github.com/nafalabi/convenient-homepage",
        text: (
          <>
            <FaGithub css={{ marginBottom: "-2px" }} />
            &nbsp; Source
          </>
        ),
      },
    ],
  },
  {
    images: [
      SARALanding,
      SARALogin,
      SARAMainDashboard,
      SARAScheduleDashboard,
      SARAReports1,
      SARAReports2,
      SARAHotelAdminPage,
      SARAChecklistManagement,
    ],
    title: "SARA",
    company: "M+ Software",
    description:
      "SARA is a staff-communication tool for managing service and maintenance requests in hotels but also manages guest requests as well\nIt is equipped with a real-time database (firebase & CouchDB) for watching new requests & chat communications to make the interaction seamless\nHas a nice report to make evaluation easier",
    techs: ["React.js", "Firebase", "CouchDB", "MySQL", "Codeigniter"],
    links: [
      {
        text: (
          <>
            <FaLink css={{ marginBottom: "-2px" }} />
            &nbsp; SARA
          </>
        ),
        link: "https://hotelservices.online",
      },
    ],
  },
  {
    images: [
      PayLanding,
      PayAdminLogin,
      PayAdminPage,
      PayStep1,
      PayStep2,
      PayStep3,
      PayStep4,
      PayStep5,
    ],
    title: "Payment App",
    company: "Freelance",
    description:
      "It's a simple payment application for a company to give its user a way to pay recurring payment",
    techs: ["React.js", "Laravel", "Inertia.js", "Voyager"],
    links: [],
  },
  {
    images: [
      TofIntro,
      TofRegister,
      TofForgotPass,
      TofMainHome,
      TofMyAccount,
      TofELearning,
    ],
    title: "Toffin App",
    company: "Freelance (primercode)",
    description:
      "Toffin App is a coffee company app\nIt provides E-Commerce, E-Learning, After-sales service, and things around coffee making\nBuilt with flutter, and currently is still in development",
    techs: ["Flutter", "Odoo", "Firebase", "Twilio"],
    links: [
      {
        text: (
          <>
            <FaLink css={{ marginBottom: "-2px" }} />
            &nbsp; Primercode
          </>
        ),
        link: "https://primercode.net",
      },
    ],
  },
  {
    images: [FirChatPreview, FirChatInitial],
    title: "Firebase Simple Chat",
    company: "Personal project",
    description: "Project to showcase implementation of a single-room chat app\nIt was built with firebase, react.js and go (cronjob)",
    techs: ["Firebase", "React.js", "Go"],
    links: [
      { text: <><FaGithub css={{ marginBottom: "-2px" }} />&nbsp; Source</>, link: "https://github.com/nafalabi/firebase-simple-chat" },
      { text: <><FaLink css={{ marginBottom: "-2px" }} />&nbsp; Demo</>, link: "https://fir-chat-app-nafalabi.web.app/" },
    ],
  },
  {
    images: [IntaraLogin, IntaraOverview, IntaraUsage, IntaraDevice, IntaraPasien],
    title: "Intara Iot",
    company: "Freelance",
    description: "Intara Iot is an Iot project used for medical infusion monitoring.\nAn Iot device will be attached to an infusion system and it will send live data through internet.\nIt was build with arduino, firebase and next.js",
    techs: ["Firebase", "Arduino", "Next.js"],
    links: [
      { text: <><FaGithub css={{ marginBottom: "-2px" }} />&nbsp; Source</>, link: "https://github.com/nafalabi/intara-iot-firebase" },
      { text: <><FaLink css={{ marginBottom: "-2px" }} />&nbsp; Demo</>, link: "https://intara-iot.vercel.app" },
    ],
  }
];

const Section4Projects = () => {
  return (
    <Root id="projects" className="section">
      <Container>
        <div className="section-title">
          <Typography variant="heading">Projects</Typography>
          <Typography>Things I have developed</Typography>
        </div>
        <div className="content">
          {projects.map((project) => (
            <ProjectItem key={project.title} {...project} />
          ))}
        </div>
      </Container>
    </Root>
  );
};

export default Section4Projects;
