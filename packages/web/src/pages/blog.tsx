import { useEffect, useState } from "react";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import emotionStyled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { FaMedium } from "react-icons/fa6";
import { HiArrowUpRight } from "react-icons/hi2";
import { MdOutlineArticle } from "react-icons/md";
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

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.42;
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
    marginBottom: "3.5rem",
    width: "100%",
    opacity: 0,
    animation: `${fadeInUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards`,
  },

  "& .bottom-cta-row": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3rem",
    width: "100%",
  },

  "& .medium-bottom-btn": {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.6rem",
    padding: "0.8rem 2rem",
    borderRadius: "2rem",
    backgroundColor: theme.colors.button.blue,
    color: theme.colors.buttonText.white,
    fontSize: "14.5px",
    fontWeight: 600,
    textDecoration: "none",
    boxShadow: "0 4px 14px rgba(21, 12, 108, 0.25)",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    border: "none",
    "&:hover": {
      transform: "translateY(-2px)",
      backgroundColor: "#0d074b",
      boxShadow: "0 8px 24px rgba(21, 12, 108, 0.35)",
      color: "#ffffff",
      "& .arrow-cta": {
        transform: "translate(3px, -3px)",
      },
    },
    "& .arrow-cta": {
      transition: "transform 0.2s ease",
    },
  },

  "& #footer": {
    width: "100%",
  },
}));

const PostList = emotionStyled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const SkeletonRowRoot = emotionStyled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.75rem",
  padding: "1.35rem 0.75rem",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",

  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: "1rem",
    padding: "1.25rem 0.5rem",
  },

  "& .skeleton-block": {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    animation: `${pulse} 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  },

  "& .skeleton-meta": {
    width: "120px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },

  "& .skeleton-date": {
    width: "90px",
    height: "15px",
    borderRadius: "8px",
  },

  "& .skeleton-time": {
    width: "60px",
    height: "12px",
    borderRadius: "6px",
  },

  "& .skeleton-body": {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },

  "& .skeleton-title": {
    width: "80%",
    height: "18px",
    borderRadius: "8px",
    marginBottom: "0.6rem",
  },

  "& .skeleton-snippet-1": {
    width: "96%",
    height: "12px",
    borderRadius: "6px",
    marginBottom: "0.4rem",
  },

  "& .skeleton-snippet-2": {
    width: "55%",
    height: "12px",
    borderRadius: "6px",
    marginBottom: "0.75rem",
  },

  "& .skeleton-tags": {
    display: "flex",
    gap: "0.45rem",
    alignItems: "center",
  },

  "& .skeleton-tag": {
    width: "55px",
    height: "22px",
    borderRadius: "8px",
  },

  "& .skeleton-visual": {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexShrink: 0,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      justifyContent: "space-between",
      marginTop: "0.25rem",
    },
  },

  "& .skeleton-thumb": {
    width: "120px",
    height: "80px",
    borderRadius: "10px",
    flexShrink: 0,
  },

  "& .skeleton-arrow": {
    width: "16px",
    height: "16px",
    borderRadius: "6px",
  },
}));

const SkeletonCard = () => (
  <SkeletonRowRoot>
    <div className="skeleton-meta">
      <div className="skeleton-block skeleton-date" />
      <div className="skeleton-block skeleton-time" />
    </div>
    <div className="skeleton-body">
      <div className="skeleton-block skeleton-title" />
      <div className="skeleton-block skeleton-snippet-1" />
      <div className="skeleton-block skeleton-snippet-2" />
      <div className="skeleton-tags">
        <div className="skeleton-block skeleton-tag" />
        <div className="skeleton-block skeleton-tag" />
        <div className="skeleton-block skeleton-tag" />
      </div>
    </div>
    <div className="skeleton-visual">
      <div className="skeleton-block skeleton-thumb" />
      <div className="skeleton-block skeleton-arrow" />
    </div>
  </SkeletonRowRoot>
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
            <Typography variant="heading">Blog</Typography>

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
            <>
              <PostList>
                {posts.map((post) => (
                  <BlogPostCard key={post.link} post={post} />
                ))}
              </PostList>

              <div className="bottom-cta-row">
                <a
                  href={MEDIUM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="medium-bottom-btn"
                >
                  <FaMedium size={17} />
                  <span>Read more stories on Medium</span>
                  <HiArrowUpRight size={15} className="arrow-cta" />
                </a>
              </div>
            </>
          )}
        </div>
      </Container>
      <Footer />
    </Root>
  );
};

export default BlogPage;

