import { useEffect, useState } from "react";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import emotionStyled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { FaChevronLeft } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { HiArrowUpRight } from "react-icons/hi2";
import { MdOutlineArticle } from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostCard from "@/components/BlogPostCard";
import { getPosts, BlogPost } from "@/services/api";

type Status = "loading" | "error" | "success";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

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
    opacity: 0,
    animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards`,
  },

  "& .title-header": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
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
      },
    },
  },

  "& .medium-profile-link": {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    padding: "0.45rem 1rem",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    color: "#222222",
    fontSize: "13px",
    fontWeight: 600,
    textDecoration: "none",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
      borderColor: "rgba(0, 0, 0, 0.15)",
      color: theme.colors.button.blue,
    },
  },

  "& .content": {
    marginTop: "2.5rem",
    width: "100%",
    opacity: 0,
    animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards`,
  },

  "& #footer": {
    width: "100%",
  },
}));

const PostList = emotionStyled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
});

const SkeletonCardRoot = emotionStyled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  gap: "1.5rem",
  padding: "1.25rem 1.5rem",
  backgroundColor: "#f2f0ee",
  borderRadius: "16px",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",

  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
    flexDirection: "column",
    padding: "1.25rem",
  },

  "& .shimmer": {
    background: "linear-gradient(90deg, #e4e2de 25%, #edebe8 50%, #e4e2de 75%)",
    backgroundSize: "200% 100%",
    animation: `${shimmer} 1.6s infinite linear`,
    borderRadius: "6px",
  },

  "& .skeleton-image": {
    width: "200px",
    height: "135px",
    borderRadius: "12px",
    flexShrink: 0,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "100%",
      height: "180px",
    },
  },

  "& .skeleton-body": {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "0.75rem",
  },

  "& .skeleton-meta": {
    width: "180px",
    height: "18px",
    borderRadius: "10px",
  },

  "& .skeleton-title-1": {
    width: "85%",
    height: "22px",
    borderRadius: "6px",
    marginTop: "0.2rem",
  },

  "& .skeleton-title-2": {
    width: "55%",
    height: "22px",
    borderRadius: "6px",
    marginTop: "0.3rem",
  },

  "& .skeleton-preview": {
    width: "95%",
    height: "14px",
    borderRadius: "4px",
    marginTop: "0.4rem",
  },

  "& .skeleton-tags": {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },

  "& .skeleton-tag": {
    width: "65px",
    height: "22px",
    borderRadius: "14px",
  },
}));

const SkeletonCard = () => (
  <SkeletonCardRoot>
    <div className="skeleton-image shimmer" />
    <div className="skeleton-body">
      <div>
        <div className="skeleton-meta shimmer" />
        <div className="skeleton-title-1 shimmer" />
        <div className="skeleton-title-2 shimmer" />
        <div className="skeleton-preview shimmer" />
      </div>
      <div className="skeleton-tags">
        <div className="skeleton-tag shimmer" />
        <div className="skeleton-tag shimmer" />
        <div className="skeleton-tag shimmer" />
      </div>
    </div>
  </SkeletonCardRoot>
);

const NoticeCard = emotionStyled("div")(({ theme }) => ({
  padding: "3rem 2rem",
  textAlign: "center",
  backgroundColor: "#f2f0ee",
  borderRadius: "16px",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",

  "& .notice-icon": {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#555",
  },

  "& .notice-title": {
    fontSize: "18px",
    fontWeight: 600,
    color: theme.colors.text,
  },

  "& .notice-desc": {
    fontSize: "14px",
    color: "#555",
    maxWidth: "420px",
    lineHeight: 1.5,
  },

  "& .notice-btn": {
    marginTop: "0.5rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    padding: "0.55rem 1.25rem",
    borderRadius: "20px",
    backgroundColor: theme.colors.button.blue,
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 600,
    textDecoration: "none",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
    transition: "all 0.2s ease",
    "&:hover": {
      opacity: 0.9,
      transform: "translateY(-1px)",
    },
  },
}));

const MEDIUM_PROFILE_URL = "https://medium.com/@nandaabifahmi";

const BlogPage = () => {
  const [status, setStatus] = useState<Status>("loading");
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    let cancelled = false;
    getPosts()
      .then((data) => {
        if (!cancelled) {
          setPosts(data);
          setStatus("success");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Root id="blog" className="section">
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
          <div className="title-header">
            <div className="title-row">
              <Link to="/" title="Back to Home">
                <FaChevronLeft size={24} />
              </Link>
              <Typography variant="heading">Blog</Typography>
            </div>

            <a
              href={MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="medium-profile-link"
              title="Visit Medium profile"
            >
              <FaMedium size={15} />
              <span>Medium Profile</span>
              <HiArrowUpRight size={13} />
            </a>
          </div>

          <Typography
            css={{ fontSize: "medium", opacity: 0.8, marginTop: "0.25rem" }}
          >
            Thoughts, stories, and engineering insights
          </Typography>
        </div>

        <div className="content">
          {status === "loading" && (
            <PostList>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </PostList>
          )}

          {status === "error" && (
            <NoticeCard>
              <div className="notice-icon">
                <MdOutlineArticle size={26} />
              </div>
              <div className="notice-title">Unable to load blog posts</div>
              <div className="notice-desc">
                Could not fetch the latest articles right now. You can view all articles directly on Medium.
              </div>
              <a
                href={MEDIUM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="notice-btn"
              >
                <FaMedium size={15} />
                <span>Read on Medium</span>
                <HiArrowUpRight size={14} />
              </a>
            </NoticeCard>
          )}

          {status === "success" && posts.length === 0 && (
            <NoticeCard>
              <div className="notice-icon">
                <MdOutlineArticle size={26} />
              </div>
              <div className="notice-title">No posts published yet</div>
              <div className="notice-desc">
                Articles will appear here once published on Medium.
              </div>
              <a
                href={MEDIUM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="notice-btn"
              >
                <FaMedium size={15} />
                <span>Visit Medium Profile</span>
              </a>
            </NoticeCard>
          )}

          {status === "success" && posts.length > 0 && (
            <PostList>
              {posts.map((post) => (
                <BlogPostCard key={post.link} post={post} />
              ))}
            </PostList>
          )}
        </div>
      </Container>
      <Footer />
    </Root>
  );
};

export default BlogPage;

