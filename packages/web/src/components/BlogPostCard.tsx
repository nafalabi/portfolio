import styled from "@emotion/styled";
import { FaRegClock } from "react-icons/fa";
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

const RowRoot = styled.a(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.75rem",
  padding: "1.35rem 0.75rem",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  color: theme.colors.text,
  textDecoration: "none",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
  borderRadius: "10px",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.035)",

    "& .thumb-img": {
      transform: "scale(1.05)",
    },

    "& .arrow-icon": {
      transform: "translate(2px, -2px)",
      color: theme.colors.button.blue,
    },
  },

  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: "1rem",
    padding: "1.25rem 0.5rem",
  },

  "& .meta-col": {
    width: "120px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },

  "& .date-text": {
    fontSize: "14px",
    fontWeight: 700,
    color: theme.colors.text,
    whiteSpace: "nowrap",
  },

  "& .read-time": {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: "12px",
    fontWeight: 500,
    color: "#666666",
  },

  "& .body-col": {
    flexGrow: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  },

  "& .article-title": {
    fontSize: "18.5px",
    fontWeight: 700,
    lineHeight: 1.35,
    color: theme.colors.text,
    margin: "0 0 0.35rem 0",
  },

  "& .preview-snippet": {
    fontSize: "14px",
    lineHeight: 1.55,
    color: "#4a4a4a",
    margin: "0 0 0.65rem 0",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  "& .tags-row": {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.45rem",
    alignItems: "center",
  },

  "& .tag-chip": {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.15rem",
    fontSize: "11.5px",
    fontWeight: 600,
    color: "#2b3e50",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    border: "1px solid rgba(0, 0, 0, 0.07)",
    padding: "0.2rem 0.6rem",
    borderRadius: "6px",
    letterSpacing: "0.2px",
    transition: "all 0.15s ease",
    "& .tag-hash": {
      opacity: 0.45,
      fontWeight: 500,
    },
    "&:hover": {
      backgroundColor: "#ffffff",
      borderColor: "rgba(0, 0, 0, 0.15)",
      color: theme.colors.button.blue,
    },
  },

  "& .visual-col": {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexShrink: 0,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      justifyContent: "space-between",
      marginTop: "0.25rem",
    },
  },

  "& .thumb-container": {
    width: "120px",
    height: "80px",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#d5d3d0",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    position: "relative",
    flexShrink: 0,
  },

  "& .thumb-img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.35s ease",
  },

  "& .thumb-placeholder": {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, ${theme.colors.button.blue} 0%, #2b3e50 100%)`,
    color: "#ffffff",
  },

  "& .arrow-icon": {
    color: "#888888",
    transition: "all 0.2s ease",
  },
}));

const BlogPostCard = ({ post, ...props }: BlogPostCardProps) => {
  const cleanedPreview = cleanPreviewText(post.preview);

  return (
    <RowRoot
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <div className="meta-col">
        <div className="date-text">{formatDate(post.publishedAt)}</div>
        <div className="read-time">
          <FaRegClock size={11} />
          <span>{post.readingMinutes} min read</span>
        </div>
      </div>

      <div className="body-col">
        <h3 className="article-title">{post.title}</h3>
        {cleanedPreview && (
          <p className="preview-snippet">{cleanedPreview}</p>
        )}
        <div className="tags-row">
          {post.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-chip">
              <span className="tag-hash">#</span>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="visual-col">
        <div className="thumb-container">
          {post.coverImage ? (
            <img
              className="thumb-img"
              src={post.coverImage}
              alt={post.title}
              loading="lazy"
            />
          ) : (
            <div className="thumb-placeholder">
              <MdOutlineArticle size={24} />
            </div>
          )}
        </div>
        <HiArrowUpRight size={18} className="arrow-icon" />
      </div>
    </RowRoot>
  );
};

export default BlogPostCard;


