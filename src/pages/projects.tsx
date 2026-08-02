import { lazy, Suspense } from "react";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import emotionStyled from "@emotion/styled";
import { FaGithub, FaLink, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import CHIdleScreenshot from "@/images/screenshots/ch/ch-idle.png";
import CHSearchOpen from "@/images/screenshots/ch/ch-search-panel-open.png";
import CHSearchKeyword from "@/images/screenshots/ch/ch-search-panel-entered-keyword.png";
import CHMenus from "@/images/screenshots/ch/ch-menus.png";
import CHNotes from "@/images/screenshots/ch/ch-notes.png";
import CHBookmarks from "@/images/screenshots/ch/ch-bookmarks.png";
import CHBackgroundSettings1 from "@/images/screenshots/ch/ch-background-settings1.png";
import CHBackgroundSettings2 from "@/images/screenshots/ch/ch-background-settings2.png";

import SARALanding from "@/images/screenshots/sara/landing.png";
import SARALogin from "@/images/screenshots/sara/login.png";
import SARAMainDashboard from "@/images/screenshots/sara/maindashboard.png";
import SARAScheduleDashboard from "@/images/screenshots/sara/scheduled-requests.png";
import SARAReports1 from "@/images/screenshots/sara/reports1.png";
import SARAReports2 from "@/images/screenshots/sara/reports2.png";
import SARAHotelAdminPage from "@/images/screenshots/sara/hotel-admin-homepage.png";
import SARAChecklistManagement from "@/images/screenshots/sara/checklist-management.png";

import PayLanding from "@/images/screenshots/payment-app/landing.png";
import PayAdminLogin from "@/images/screenshots/payment-app/admin-login.png";
import PayAdminPage from "@/images/screenshots/payment-app/admin-page.png";
import PayStep1 from "@/images/screenshots/payment-app/payment-step1.png";
import PayStep2 from "@/images/screenshots/payment-app/payment-step2.png";
import PayStep3 from "@/images/screenshots/payment-app/payment-step3.png";
import PayStep4 from "@/images/screenshots/payment-app/payment-step4.png";
import PayStep5 from "@/images/screenshots/payment-app/payment-step5.png";

import TofIntro from "@/images/screenshots/toffin/intro.png";
import TofRegister from "@/images/screenshots/toffin/register.png";
import TofForgotPass from "@/images/screenshots/toffin/forgot-password.png";
import TofMainHome from "@/images/screenshots/toffin/mainhomepage.png";
import TofMyAccount from "@/images/screenshots/toffin/myaccount.png";
import TofELearning from "@/images/screenshots/toffin/elearning.png";

import IntaraDevice from "@/images/screenshots/intara/intara-device.png";
import IntaraLogin from "@/images/screenshots/intara/intara-login.png";
import IntaraOverview from "@/images/screenshots/intara/intara-overview.png";
import IntaraPasien from "@/images/screenshots/intara/intara-pasien.png";
import IntaraUsage from "@/images/screenshots/intara/intara-usage.png";

import OPLogin from "@/images/screenshots/open-pos/login-page.webp";
import OPCanceled from "@/images/screenshots/open-pos/pos-canceled.webp";
import OPComplete from "@/images/screenshots/open-pos/pos-complete.webp";
import OPCreateProduct from "@/images/screenshots/open-pos/pos-create-product.webp";
import OPHomeCart from "@/images/screenshots/open-pos/pos-home-cart.webp";
import OPListOrders from "@/images/screenshots/open-pos/pos-list-orders.webp";
import OPListProduct from "@/images/screenshots/open-pos/pos-list-product.webp";
import OPMobileViewDetail from "@/images/screenshots/open-pos/pos-mobile-view-detail.webp";
import OPMobileView from "@/images/screenshots/open-pos/pos-mobile-view.webp";
import OPPaid from "@/images/screenshots/open-pos/pos-paid.webp";
import OPPendingCash from "@/images/screenshots/open-pos/pos-pending-cash.webp";
import OPPendingQris from "@/images/screenshots/open-pos/pos-pending-qris.webp";

import PatunganDashboard from "@/images/screenshots/patungan_app/dashboard.webp";
import PatunganLogin from "@/images/screenshots/patungan_app/login.webp";
import PatunganDuePayment from "@/images/screenshots/patungan_app/payment-due-payment.webp";
import PatunganDuesPlanFixed from "@/images/screenshots/patungan_app/payment-dues-by-plan-fixed.webp";
import PatunganPlans from "@/images/screenshots/patungan_app/plans.webp";
import PatunganSettings from "@/images/screenshots/patungan_app/settings.webp";
import PatunganUsers from "@/images/screenshots/patungan_app/users.webp";

const projects = [
  {
    images: [
      OPPendingQris,
      OPPendingCash,
      OPCanceled,
      OPComplete,
      OPCreateProduct,
      OPHomeCart,
      OPListOrders,
      OPListProduct,
      OPMobileViewDetail,
      OPMobileView,
      OPPaid,
      OPLogin,
    ],
    title: "Open POS",
    company: "Personal project",
    description:
      "Open POS is an open sourced version of my thesis app at Nusamandiri. It was built with Go & React.js with Midtrans as the payment gateway. it features Cash POS, Dynamic QRIS POS, live notifier webhook through websocket.",
    techs: ["Go", "Echo", "React.js", "Midtrans gateway", "Sqlite"],
    links: [
      {
        text: (
          <>
            <FaGithub css={{ marginBottom: "-2px" }} />
            &nbsp; Source
          </>
        ),
        link: "https://github.com/nafalabi/open-pos",
      },
    ],
  },
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
      "Toffin App is a coffee company app\nIt provides E-Commerce, E-Learning, After-sales service, and things around coffee making\nBuilt with flutter",
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
      IntaraLogin,
      IntaraOverview,
      IntaraUsage,
      IntaraDevice,
      IntaraPasien,
    ],
    title: "Intara Iot",
    company: "Freelance",
    description:
      "Intara Iot is an Iot project used for medical infusion monitoring.\nAn Iot device will be attached to an infusion system and it will send live data through internet.\nIt was build with arduino, firebase and next.js",
    techs: ["Firebase", "Arduino", "Next.js"],
    links: [
      {
        text: (
          <>
            <FaGithub css={{ marginBottom: "-2px" }} />
            &nbsp; Source
          </>
        ),
        link: "https://github.com/nafalabi/intara-iot-firebase",
      },
      {
        text: (
          <>
            <FaLink css={{ marginBottom: "-2px" }} />
            &nbsp; Demo
          </>
        ),
        link: "https://intara-iot.vercel.app",
      },
    ],
  },
  {
    title: "Patungan App",
    images: [
      PatunganDashboard,
      PatunganPlans,
      PatunganLogin,
      PatunganDuesPlanFixed,
      PatunganDuePayment,
      PatunganUsers,
      PatunganSettings,
    ],
    company: "Personal project",
    description:
      "Patungan App is a web application designed to manage shared expenses, recurring plans, and payment dues. Built with Go (Echo) and Templ, it features secure Firebase authentication, automated recurring billing plan schedules.",
    techs: [
      "Go",
      "Echo",
      "Templ",
      "HTMX",
      "TailwindCSS",
      "PostgreSQL",
      "Redis",
      "Midtrans",
      "Mayar.id",
      "Firebase",
    ],
    links: [
      {
        link: "https://github.com/nafalabi/patungan_app",
        text: (
          <>
            <FaGithub css={{ marginBottom: "-2px" }} />
            &nbsp; Source
          </>
        ),
      },
    ],
  },
];

const Root = emotionStyled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.colors.background,
  color: theme.colors.text,
  marginTop: "80px",
  minHeight: "calc(100vh - 80px)",

  "& .section-title": {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
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
  },

  "& #footer": {
    width: "100%",
  },
}));

const ProjectItem = lazy(() => import("@/components/ProjectItem"));

const ProjectsPage = () => {
  return (
    <Root id="projects" className="section">
      <Navbar />
      <Container
        css={{
          margin: "0 0 auto",
          width: "100%",
          paddingTop: "2rem",
          paddingBottom: "4rem",
        }}
      >
        <div className="section-title">
          <div className="title-row">
            <Link to="/about-me" title="Back to About me">
              <FaChevronLeft size={24} />
            </Link>
            <Typography variant="heading">Personal Projects</Typography>
          </div>
          <Typography css={{ fontSize: "medium", opacity: 0.8, marginTop: "0.25rem" }}>
            Things I have developed in my spare time
          </Typography>
        </div>
        <div className="content">
          <Suspense fallback="Loading...">
            {projects.map((project) => (
              <ProjectItem key={project.title} {...project} />
            ))}
          </Suspense>
        </div>
      </Container>
      <Footer />
    </Root>
  );
};

export default ProjectsPage;
