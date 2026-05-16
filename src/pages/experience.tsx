import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Typography from "@/components/Typography";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import emotionStyled from "@emotion/styled";

import NetpolitanLogo from "@/images/companies/netpolitan_logo.jpeg";
import StaffanyLogo from "@/images/companies/staffany_logo.jpeg";
import MajooLogo from "@/images/companies/majoo_indonesia_logo.jpeg";
import MPlusLogo from "@/images/companies/mplus_software_logo.jpeg";

const EXPERIENCE_DATA = [
  {
    companyName: "Netpolitan",
    logo: NetpolitanLogo,
    jobTitle: "Software Engineer",
    workPeriod: "Aug 2024 - Present",
    description: "Netpolitan is an Indonesian EdTech and digital learning provider, specializing in end-to-end corporate talent development and LMS solutions for Fortune 100 companies.",
    techs: ["Server Management", "CI/CD", "Google Cloud Provider", "Django", "Go", "Flutter"],
    moreInfo: [
      "Mobile Architecture: Migrated the app from React Native to Flutter. Architected the core foundation, optimizing layout structure, query/caching layers, background execution, and offline SCORM player integration.",
      "Backend & R&D: Progressively migrating core APIs from Django to Go. Leading R&D for a multi-tenant SSO authentication gateway (Keycloak/Django) and AICC content integrations.",
      "Cloud Infrastructure: Executed full infrastructure migration from GCP to BytePlus, reducing server operational cost by 20%. Implemented a CDN over bucket storage to accelerate content delivery.",
      "DevOps & Security: Deployed a Prometheus/Grafana monitoring stack. Built an automated CI/CD deployment pipeline using Jenkins. Remediated vulnerabilities from penetration tests."
    ]
  },
  {
    companyName: "Staffany",
    logo: StaffanyLogo,
    jobTitle: "Software Engineer",
    workPeriod: "May 2023 - Nov 2023",
    description: "Staffany is a Singaporean SaaS startup providing integrated workforce management solutions to 1,000+ F&B and retail brands across Southeast Asia.",
    techs: ["React.js", "TypeScript", "React Native", "Hapi.js", "Data Analytics & Investigations"],
    moreInfo: [
      "Engineered and deployed full-stack features and resolved critical bugs across backend services, web dashboards, and mobile applications.",
      "Served as the primary on-call engineer on a bi-weekly rotation, rapidly triaging and resolving user-reported production defects to maintain system reliability.",
      "Optimized the Staff Leaves engine by conducting deep-dive data investigations and designing Metabase observability dashboards; implemented targeted backend fixes that reduced critical data discrepancies from ~15% to less than 5%."
    ]
  },
  {
    companyName: "Majoo Indonesia",
    logo: MajooLogo,
    jobTitle: "Frontend Engineer",
    workPeriod: "Mar 2022 - Feb 2023",
    description: "Majoo is an Indonesian SaaS company providing an all-in-one business management platform (POS, Accounting, Inventory) for over 45,000 MSMEs nationwide.",
    techs: ["React.js", "React hooks", "Context API", "Stitches.js"],
    moreInfo: [
      "Engineered and maintained features for a Third-Party Marketplace Management dashboard, handling seamless order aggregation and transactions across Tokopedia, Shopee, Bukalapak, GrabFood, and GoFood.",
      "Refactored legacy codebases to align with modern software engineering best practices, significantly improving code maintainability and system scalability.",
      "Resolved complex bugs and provided ongoing system maintenance to ensure high availability for the core dashboard platform. Successfully fixes 75% available issues.",
      "Working scope: marketplace integration (Tokopedia, Shopee, Bukalapak, Grabfood, Gofood)"
    ]
  },
  {
    companyName: "Freelance Software Engineer",
    jobTitle: "Software Engineer",
    workPeriod: "Jun 2021 - Mar 2022",
    description: "Working on various projects from website to mobile apps.",
    techs: ["Laravel", "Codeigniter", "React.js", "Flutter"],
  },
  {
    companyName: "M+ Software",
    logo: MPlusLogo,
    jobTitle: "System Administrator",
    workPeriod: "Aug 2020 - May 2021",
    description: "M+ Software is an international software development company and Odoo Partner specializing in ERP implementations and custom business solutions with offices in Melbourne and Jakarta.",
    techs: ["Linux Server Administration", "Shell Scripting", "AWS Cloud", "Nagios Monitoring Server", "Dokuwiki"],
    moreInfo: [
      "Provisioned and configured project environments, including server instance setup, standardized server utilities, required services, and domain management for application deployment.",
      "Monitoring server activity for abnormal behaviour and setting up server alerts.",
      "Maintaining server operations and addressing breaking changes."
    ]
  },
  {
    companyName: "M+ Software",
    logo: MPlusLogo,
    jobTitle: "Software Engineer",
    workPeriod: "Dec 2018 - May 2021",
    description: "M+ Software is an international software development company and Odoo Partner specializing in ERP implementations and custom business solutions with offices in Melbourne and Jakarta.",
    techs: ["React.js", "Codeigniter", "React Native", "Firebase", "CouchDB"],
    moreInfo: [
      "Being a core developer to maintain & improve a SaaS called SARA, a staff-communication tool for managing service and maintenance requests in 250+ hotels in Southeast Asia (including Pullman and Novotel).",
      "Improved frontend performance by up to 80% and reduced Firebase cost by 25% by eliminating faulty logic.",
      "Successfully implemented a chat feature with media and audio attachment using Firebase and CouchDB.",
      "Successfully migrated an admin panel from monolithic CodeIgniter into React.js, implemented custom webpack and baked it into CodeIgniter."
    ]
  }
];

import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Root = emotionStyled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.colors.background,
  color: theme.colors.text,
  marginTop: "80px",
  minHeight: "calc(100vh - 80px)",

  "& .section-title": {
    fontWeight: 500,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  "& .title-row": {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    "& a": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "inherit",
      textDecoration: "none",
      padding: "8px",
      borderRadius: "50%",
      transition: "background-color 0.2s",
      marginLeft: "-12px",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      }
    }
  },

  "& .content": {
    marginTop: "3rem",
    fontSize: "16px",

    "& strong": {
      fontWeight: "600",
    }
  },

  "& #footer": {
    width: "100%",
  },
}));

const ExperiencePage = () => {
  return (
    <Root>
      <Navbar />
      <Container
        css={{
          margin: "0 0 auto",
          width: "100%",
        }}
      >
        <div className="section-title">
          <div className="title-row">
            <Link to="/about-me" title="Back to About me">
              <FaChevronLeft size={24} />
            </Link>
            <Typography variant="heading">Experience</Typography>
          </div>
          <Typography css={{ fontSize: "medium", marginLeft: "40px" }}>
            My professional journey
          </Typography>
        </div>
        <div className="content">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {EXPERIENCE_DATA.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>
          <br/>
        </div>
      </Container>
      <Footer />
    </Root>
  );
};

export default ExperiencePage;
