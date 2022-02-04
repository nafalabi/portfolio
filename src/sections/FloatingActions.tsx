import styled from "@emotion/styled";
import { MouseEvent, useCallback, useRef } from "react";
import { useEffect } from "react";
import { VscArrowDown } from "react-icons/vsc";

const Root = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  right: "2rem",
  top: 0,
  bottom: 0,
  zIndex: 1000,

  "& .mid": {
    position: "absolute",
    bottom: "50%",
    transform: "translateY(-50%)",
    right: 0,
  },

  "& .bot": {
    position: "absolute",
    bottom: "2rem",
    right: 0,

    "& #floatingArrow": {
      transition: "transform 1s ease",
      cursor: "pointer",
    },
  },
}));

const ArrowDown = styled(VscArrowDown)(({ theme }) => ({
  transition: "color 0.3s ease-in",
}));

const FloatingActions = () => {
  const midActionRef = useRef<HTMLDivElement>();
  const botActionRef = useRef<HTMLDivElement>();

  const isInTheAreaOf = useCallback((secRect: DOMRect, refRect: DOMRect) => {
    return (
      secRect.top <= refRect.bottom &&
      secRect.height + secRect.top >= refRect.bottom
    );
  }, []);

  useEffect(() => {
    const listenScroll = () => {
      const midActionEl = botActionRef.current;
      const botActionEl = botActionRef.current;

      if (!botActionEl || !midActionEl) return;

      const section1 = document.getElementById("top");
      const section2 = document.getElementById("workExperience");
      const section3 = document.getElementById("aboutMe");
      const section4 = document.getElementById("projects");
      const footer = document.getElementById("footer");

      const midBound = midActionEl.getBoundingClientRect();
      const botBound = botActionEl.getBoundingClientRect();
      const section1Bound = section1.getBoundingClientRect();
      const section2Bound = section2.getBoundingClientRect();
      const section3Bound = section3.getBoundingClientRect();
      const section4Bound = section4.getBoundingClientRect();
      const footerBound = footer.getBoundingClientRect();

      const setBackgroundColorAs = (secEl: HTMLElement, refEl: HTMLElement) => {
        const style = getComputedStyle(secEl);
        refEl.style.color = style.color;
      };

      if (isInTheAreaOf(section1Bound, midBound)) {
        setBackgroundColorAs(section1, midActionEl);
      } else if (isInTheAreaOf(section2Bound, midBound)) {
        setBackgroundColorAs(section2, midActionEl);
      } else if (isInTheAreaOf(section3Bound, midBound)) {
        setBackgroundColorAs(section3, midActionEl);
      } else if (isInTheAreaOf(section4Bound, midBound)) {
        setBackgroundColorAs(section4, midActionEl);
      } else if (isInTheAreaOf(footerBound, midBound)) {
        setBackgroundColorAs(footer, midActionEl);
      }

      if (isInTheAreaOf(section1Bound, botBound)) {
        setBackgroundColorAs(section1, botActionEl);
      } else if (isInTheAreaOf(section2Bound, botBound)) {
        setBackgroundColorAs(section2, botActionEl);
      } else if (isInTheAreaOf(section3Bound, botBound)) {
        setBackgroundColorAs(section3, botActionEl);
      } else if (isInTheAreaOf(section4Bound, botBound)) {
        setBackgroundColorAs(section4, botActionEl);
      } else if (isInTheAreaOf(footerBound, botBound)) {
        setBackgroundColorAs(footer, botActionEl);
      }

      const floatingArrow = document.getElementById("floatingArrow");

      if (isInTheAreaOf(footerBound, botBound)) {
        floatingArrow.style.transform = "rotate(180deg)";
      } else {
        floatingArrow.style.transform = "";
      }
    };

    window.addEventListener("scroll", listenScroll);
    () => window.removeEventListener("scroll", listenScroll);
  }, [isInTheAreaOf]);

  const handleClickArrow = (e: MouseEvent) => {
    const ref = e.target as Element;
    const footerEl = document.getElementById("footer");
    const refBound = ref.getBoundingClientRect();
    const footerBound = footerEl.getBoundingClientRect();

    const isAtTheBottom = isInTheAreaOf(footerBound, refBound);

    const sections = ["top", "workExperience", "aboutMe", "projects", "footer"];

    if (isAtTheBottom) {
      const top = document.getElementById(sections[0]);
      top.scrollIntoView({ behavior: "smooth" });
    } else {
      sections.forEach((section, index) => {
        const secEl = document.getElementById(section);
        const secBound = secEl.getBoundingClientRect();

        if (isInTheAreaOf(secBound, refBound)) {
          const nextSec = document.getElementById(sections[index + 1]);
          nextSec.scrollIntoView({ behavior: "smooth" });
          return;
        }
      });
    }
  };

  return (
    <Root>
      <div className="mid" ref={midActionRef}></div>
      <div className="bot" ref={botActionRef}>
        <div id="floatingArrow" onClick={handleClickArrow}>
          <ArrowDown size={35} />
        </div>
      </div>
    </Root>
  );
};

export default FloatingActions;
