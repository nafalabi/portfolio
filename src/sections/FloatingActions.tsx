import styled from "@emotion/styled";
import { useRef } from "react";
import { useEffect } from "react";
import { VscArrowDown } from "react-icons/vsc";

const Root = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  right: "2rem",
  top: 0,
  bottom: 0,

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
  },
}));

const ArrowDown = styled(VscArrowDown)(({ theme }) => ({
  transition: "color 0.3s ease-in",
}));

const FloatingActions = () => {
  const midActionRef = useRef<HTMLDivElement>();
  const botActionRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const listenScroll = () => {
      const midActionEl = botActionRef.current;
      const botActionEl = botActionRef.current;

      if (!botActionEl || !midActionEl) return;

      const boundingMid = midActionEl.getBoundingClientRect();
      const boundingBot = botActionEl.getBoundingClientRect();
    };

    window.addEventListener("scroll", listenScroll);
    () => window.removeEventListener("scroll", listenScroll);
  }, []);

  return (
    <Root>
      <div className="mid" ref={midActionRef}></div>
      <div className="bot" ref={botActionRef}>
        <div>
          <ArrowDown size={35} />
        </div>
      </div>
    </Root>
  );
};

export default FloatingActions;
