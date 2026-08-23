import { useEffect, useState } from "react";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import emotionStyled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { FaChevronLeft } from "react-icons/fa";
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

const pulse = keyframes`
  0% { opacity: 0.45; }
  50% { opacity: 0.9; }
  100% { opacity: 0.45; }
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

  "& .content": {
    marginTop: "3rem",
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
  gap: "1rem",
});

const SkeletonRow = emotionStyled("div")(({ theme }) => ({
  height: "128px",
  borderRadius: "0.5rem",
  backgroundColor: "#fff",
  boxShadow: theme.shadow[0],
  animation: `${pulse} 1.4s ease-in-out infinite`,
}));

const Notice = emotionStyled("div")({
  padding: "2rem",
  textAlign: "center",
  opacity: 0.85,

  "& a": {
    color: "inherit",
    fontWeight: 600,
  },
});

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
          <div className="title-row">
            <Link to="/" title="Back to Home">
              <FaChevronLeft size={24} />
            </Link>
            <Typography variant="heading">Blog</Typography>
          </div>
          <Typography
            css={{ fontSize: "medium", opacity: 0.8, marginTop: "0.25rem" }}
          >
            Thoughts and stories, also published on Medium
          </Typography>
        </div>
        <div className="content">
          {status === "loading" && (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          )}
          {status === "error" && (
            <Notice>
              Could not load posts right now.{" "}
              <a
                href={MEDIUM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read on Medium instead →
              </a>
            </Notice>
          )}
          {status === "success" && posts.length === 0 && (
            <Notice>No posts yet.</Notice>
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
