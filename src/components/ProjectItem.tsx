import styled from "@emotion/styled";
import { useState, useEffect, useCallback, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes, FaSearchPlus } from "react-icons/fa";

const RootProjectItem = styled.div(({ theme }) => ({
  marginBottom: "3.5rem",
  display: "flex",
  flexDirection: "row",
  gap: "2rem",
  alignItems: "center",

  "@keyframes shimmer": {
    "0%": {
      backgroundPosition: "-200% 0",
    },
    "100%": {
      backgroundPosition: "200% 0",
    },
  },

  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: "1.25rem",
  },

  "& .project-image": {
    position: "relative",
    flexShrink: 0,
    width: "42%",
    minWidth: "280px",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "100%",
    },

    "& .showcase-container": {
      position: "relative",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      backgroundColor: "transparent",
      cursor: "zoom-in",

      "&:hover .nav-btn, &:hover .zoom-badge": {
        opacity: 1,
      },

      "& img": {
        width: "100%",
        height: "auto",
        maxHeight: "260px",
        display: "block",
        objectFit: "cover",
        transition: "opacity 0.25s ease-in-out",
      },
    },

    "& .skeleton-placeholder": {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      borderRadius: "12px",
      background: "linear-gradient(90deg, #e4e2de 25%, #f2f0ee 50%, #e4e2de 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite linear",
      zIndex: 1,
    },

    "& .nav-btn": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      color: "#ffffff",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      width: "32px",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      opacity: 0,
      transition: "all 0.2s ease",
      zIndex: 10,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        borderColor: "rgba(255, 255, 255, 0.6)",
        transform: "translateY(-50%) scale(1.1)",
      },
      "&.prev": { left: "8px" },
      "&.next": { right: "8px" },
      [`@media (max-width: 768px)`]: {
        opacity: 0.85,
      },
    },

    "& .counter-badge": {
      position: "absolute",
      bottom: "8px",
      right: "8px",
      backgroundColor: "rgba(0, 0, 0, 0.65)",
      color: "#ffffff",
      fontSize: "11px",
      fontWeight: 600,
      padding: "3px 8px",
      borderRadius: "10px",
      letterSpacing: "0.5px",
      backdropFilter: "blur(4px)",
      pointerEvents: "none",
    },

    "& .zoom-badge": {
      position: "absolute",
      top: "8px",
      right: "8px",
      backgroundColor: "rgba(0, 0, 0, 0.65)",
      color: "#ffffff",
      fontSize: "12px",
      padding: "6px",
      borderRadius: "50%",
      opacity: 0,
      transition: "opacity 0.2s ease",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },

  "& .project-detail": {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",

    "& .title-container": {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      flexWrap: "wrap",
    },

    "& .title": {
      fontSize: "22px",
      fontWeight: 600,
      color: theme.colors.text,
      lineHeight: 1.2,
    },

    "& .company-badge": {
      fontSize: "12px",
      fontWeight: 600,
      color: "#555555",
      backgroundColor: "rgba(0, 0, 0, 0.06)",
      padding: "3px 10px",
      borderRadius: "12px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },

    "& .description": {
      fontSize: "15px",
      lineHeight: 1.5,
      color: "#333333",
      whiteSpace: "pre-wrap",
    },

    "& .techs": {
      display: "flex",
      gap: "0.4rem 0.5rem",
      flexWrap: "wrap",
      marginTop: "0.25rem",
      marginBottom: "0.5rem",
    },

    "& .tech-badge": {
      fontSize: "13px",
      fontWeight: 500,
      color: "#2b3e50",
      backgroundColor: "#e4e2de",
      padding: "4px 10px",
      borderRadius: "6px",
      border: "1px solid rgba(0, 0, 0, 0.05)",
    },

    "& .links": {
      display: "flex",
      gap: "0.75rem",
      flexWrap: "wrap",
      marginTop: "0.25rem",
    },

    "& .action-button": {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "8px 16px",
      borderRadius: "20px",
      backgroundColor: theme.colors.button.blue,
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 500,
      textDecoration: "none",
      transition: "all 0.2s ease",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
      "&:hover": {
        opacity: 0.9,
        transform: "translateY(-1px)",
      },
    },
  },
}));

const LightboxOverlay = styled.div({
  position: "fixed",
  inset: 0,
  zIndex: 99999,
  backgroundColor: "rgba(0, 0, 0, 0.88)",
  backdropFilter: "blur(8px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  animation: "fadeIn 0.2s ease-out",
  padding: "1rem",

  "& .lightbox-header": {
    position: "absolute",
    top: "1.25rem",
    left: "1.5rem",
    right: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#ffffff",
    zIndex: 100000,
  },

  "& .lightbox-title": {
    fontSize: "16px",
    fontWeight: 500,
    color: "rgba(255, 255, 255, 0.9)",
  },

  "& .close-btn": {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    color: "#ffffff",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      transform: "scale(1.08)",
    },
  },

  "& .lightbox-image-container": {
    position: "relative",
    maxWidth: "92vw",
    maxHeight: "82vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& img": {
      maxWidth: "100%",
      maxHeight: "82vh",
      objectFit: "contain",
      borderRadius: "10px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
      transition: "transform 0.2s ease",
    },
  },

  "& .lightbox-nav": {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "#ffffff",
    border: "1.5px solid rgba(255, 255, 255, 0.35)",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    zIndex: 100001,
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.95)",
      borderColor: "rgba(255, 255, 255, 0.7)",
      transform: "translateY(-50%) scale(1.1)",
    },
    "&.prev": { left: "1.5rem" },
    "&.next": { right: "1.5rem" },
    [`@media (max-width: 768px)`]: {
      width: "40px",
      height: "40px",
      "&.prev": { left: "0.75rem" },
      "&.next": { right: "0.75rem" },
    },
  },
});

export interface ProjectItemProps {
  images: string[];
  title: string;
  company?: string;
  description: string;
  techs: string[];
  links: { text: string | JSX.Element; link: string }[];
}

const ProjectItem = ({
  images,
  title,
  company,
  description,
  techs,
  links,
}: ProjectItemProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Check if image is already cached/complete on index change
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [currentIdx, images]);

  // Preload neighboring screenshots to eliminate flickering
  useEffect(() => {
    if (images.length <= 1) return;
    const nextIdx = (currentIdx + 1) % images.length;
    const prevIdx = (currentIdx - 1 + images.length) % images.length;

    const imgNext = new Image();
    imgNext.src = images[nextIdx];
    const imgPrev = new Image();
    imgPrev.src = images[prevIdx];
  }, [currentIdx, images]);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIsLoaded(false);
      setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [images.length]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIsLoaded(false);
      setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [images.length]
  );

  // Touch swipe gesture handlers for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, handlePrev, handleNext]);

  return (
    <RootProjectItem>
      {images.length > 0 && (
        <div className="project-image">
          <div
            className="showcase-container"
            onClick={() => setIsLightboxOpen(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            title="Click for full preview"
          >
            {!isLoaded && <div className="skeleton-placeholder" />}
            <img
              ref={imgRef}
              src={images[currentIdx]}
              alt={`${title} screenshot ${currentIdx + 1}`}
              onLoad={() => setIsLoaded(true)}
              style={{
                opacity: isLoaded ? 1 : 0,
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="nav-btn prev"
                  onClick={handlePrev}
                  title="Previous image"
                >
                  <FaChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  className="nav-btn next"
                  onClick={handleNext}
                  title="Next image"
                >
                  <FaChevronRight size={14} />
                </button>
                <span className="counter-badge">
                  {currentIdx + 1} / {images.length}
                </span>
              </>
            )}
            <span className="zoom-badge">
              <FaSearchPlus size={12} />
            </span>
          </div>
        </div>
      )}

      <div className="project-detail">
        <div className="title-container">
          <div className="title">{title}</div>
          {company && <span className="company-badge">{company}</span>}
        </div>
        <div className="description">{description}</div>
        <div className="techs">
          {techs.map((tech) => (
            <span className="tech-badge" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <div className="links">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="action-button"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>

      {/* Medium-style Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <LightboxOverlay
          onClick={() => setIsLightboxOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="lightbox-header"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="lightbox-title">
              {title} ({currentIdx + 1} of {images.length})
            </span>
            <button
              className="close-btn"
              onClick={() => setIsLightboxOpen(false)}
              title="Close preview (Esc)"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <div
            className="lightbox-image-container"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIdx]}
              alt={`${title} enlarged screenshot ${currentIdx + 1}`}
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                className="lightbox-nav prev"
                onClick={handlePrev}
                title="Previous image (←)"
              >
                <FaChevronLeft size={22} />
              </button>
              <button
                className="lightbox-nav next"
                onClick={handleNext}
                title="Next image (→)"
              >
                <FaChevronRight size={22} />
              </button>
            </>
          )}
        </LightboxOverlay>
      )}
    </RootProjectItem>
  );
};

export default ProjectItem;
