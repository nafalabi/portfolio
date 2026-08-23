import styled from "@emotion/styled";
import { MdOutlineArticle } from "react-icons/md";
import Chip from "@/components/Chip";
import Typography from "@/components/Typography";
import { CommonComponentProps } from "@/components/types";
import type { BlogPost } from "@/services/api";

export interface BlogPostCardProps extends CommonComponentProps {
  post: BlogPost;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const Row = styled.a(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  padding: "1rem",
  backgroundColor: "#fff",
  borderRadius: "0.5rem",
  boxShadow: theme.shadow[0],
  color: "#333",
  textDecoration: "none",
  transition: "box-shadow 0.2s ease, transform 0.2s ease",

  "&:hover": {
    boxShadow: theme.shadow[1],
    transform: "translateY(-2px)",
  },

  "& .cover": {
    width: "96px",
    height: "96px",
    borderRadius: "0.375rem",
    objectFit: "cover",
    flexShrink: 0,
  },

  "& .cover-placeholder": {
    width: "96px",
    height: "96px",
    borderRadius: "0.375rem",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.button.blue,
    color: "#fff",
  },

  "& .body": {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
  },

  "& .meta": {
    fontSize: theme.typography.body2,
    opacity: 0.7,
  },

  "& .tags": {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
  },

  "& .preview": {
    fontSize: theme.typography.body2,
    lineHeight: 1.5,
    opacity: 0.85,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
}));

const BlogPostCard = ({ post, ...props }: BlogPostCardProps) => {
  return (
    <Row href={post.link} target="_blank" rel="noopener noreferrer" {...props}>
      {post.coverImage ? (
        <img className="cover" src={post.coverImage} alt="" loading="lazy" />
      ) : (
        <div className="cover-placeholder">
          <MdOutlineArticle size={36} />
        </div>
      )}
      <div className="body">
        <Typography variant="title" fontWeight={600} css={{ fontSize: 20 }}>
          {post.title}
        </Typography>
        <div className="meta">
          {formatDate(post.publishedAt)} · {post.readingMinutes} min read
        </div>
        <div className="tags">
          {post.tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>
        <div className="preview">{post.preview}</div>
      </div>
    </Row>
  );
};

export default BlogPostCard;
