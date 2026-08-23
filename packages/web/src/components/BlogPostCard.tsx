import styled from "@emotion/styled";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { MdOutlineArticle } from "react-icons/md";
import { HiArrowUpRight } from "react-icons/hi2";
import { CommonComponentProps } from "@/components/types";
import type { BlogPost } from "@/services/api";

export interface BlogPostCardProps extends CommonComponentProps {
  post: BlogPost;
}

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

const cleanPreviewText = (text: string) => {
  if (!text) return "";
  return text
    .replace(/^(Photo|Image)\s+by\s+[^.]+\s+on\s+Unsplash\s*/i, "")
    .replace(/^(Photo|Image)\s+by\s+[^.]+\.\s*/i, "")
    .trim();
};

const CardRoot = styled.a(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  gap: "1.5rem",
  padding: "1.25rem 1.5rem",
  backgroundColor: "#f2f0ee",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  color: theme.colors.text,
  textDecoration: "none",
  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
  position: "relative",
  overflow: "hidden",

  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
    flexDirection: "column",
    gap: "1.1rem",
    padding: "1.25rem",
  },

  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.07), 0 2px 6px rgba(0, 0, 0, 0.03)",
    borderColor: "rgba(0, 0, 0, 0.14)",

    "& .card-title": {
      color: theme.colors.button.blue,
    },

    "& .cover-img": {
      transform: "scale(1.04)",
    },

    "& .read-more-arrow": {
      transform: "translate(2px, -2px)",
    },
  },

  "& .cover-wrapper": {
    width: "200px",
    height: "135px",
    borderRadius: "12px",
    overflow: "hidden",
    flexShrink: 0,
    backgroundColor: "#e8e6e3",
    border: "1px solid rgba(0, 0, 0, 0.06)",
    position: "relative",

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "100%",
      height: "180px",
    },
  },

  "& .cover-img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.35s ease",
  },

  "& .cover-placeholder": {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    background: `linear-gradient(135deg, ${theme.colors.button.blue} 0%, #2b3e50 100%)`,
    color: "#ffffff",
  },

  "& .body-content": {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "0.5rem",
    flexGrow: 1,
  },

  "& .meta-row": {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.6rem",
    fontSize: "12.5px",
    color: "#555555",
    fontWeight: 500,
  },

  "& .meta-badge": {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: "0.2rem 0.65rem",
    borderRadius: "14px",
    border: "1px solid rgba(0, 0, 0, 0.06)",
    fontSize: "12px",
    fontWeight: 600,
    color: "#444444",
  },

  "& .medium-pill": {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    backgroundColor: "#ffffff",
    padding: "0.2rem 0.65rem",
    borderRadius: "14px",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    fontSize: "11.5px",
    fontWeight: 600,
    color: "#222222",
  },

  "& .card-title": {
    fontSize: "19px",
    fontWeight: 700,
    lineHeight: 1.35,
    color: theme.colors.text,
    transition: "color 0.2s ease",
    margin: "0.15rem 0",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  "& .preview-text": {
    fontSize: "14px",
    lineHeight: 1.55,
    color: "#4a4a4a",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  "& .footer-row": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.6rem",
    marginTop: "0.35rem",
    paddingTop: "0.35rem",
  },

  "& .tags-list": {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
    alignItems: "center",
  },

  "& .tag-chip": {
    fontSize: "11.5px",
    fontWeight: 600,
    color: "#2b3e50",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    padding: "0.2rem 0.65rem",
    borderRadius: "14px",
    transition: "all 0.2s ease",
  },

  "& .read-link": {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: "13px",
    fontWeight: 600,
    color: theme.colors.button.blue,
    marginLeft: "auto",
    whiteSpace: "nowrap",
  },

  "& .read-more-arrow": {
    transition: "transform 0.2s ease",
  },
}));

const BlogPostCard = ({ post, ...props }: BlogPostCardProps) => {
  const cleanedPreview = cleanPreviewText(post.preview);

  return (
    <CardRoot
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <div className="cover-wrapper">
        {post.coverImage ? (
          <img
            className="cover-img"
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
          />
        ) : (
          <div className="cover-placeholder">
            <MdOutlineArticle size={36} />
            <span style={{ fontSize: "11px", fontWeight: 600, opacity: 0.9 }}>
              Article
            </span>
          </div>
        )}
      </div>

      <div className="body-content">
        <div>
          <div className="meta-row">
            <span className="medium-pill">
              <FaMedium size={13} />
              Medium
            </span>
            <span className="meta-badge">
              <FaRegCalendarAlt size={11} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="meta-badge">
              <FaRegClock size={11} />
              {post.readingMinutes} min read
            </span>
          </div>

          <h3 className="card-title">{post.title}</h3>

          {cleanedPreview && (
            <p className="preview-text">{cleanedPreview}</p>
          )}
        </div>

        <div className="footer-row">
          <div className="tags-list">
            {post.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>

          <span className="read-link">
            Read article
            <HiArrowUpRight size={14} className="read-more-arrow" />
          </span>
        </div>
      </div>
    </CardRoot>
  );
};

export default BlogPostCard;

