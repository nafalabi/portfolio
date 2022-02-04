import styled from "@emotion/styled";
import { transparentize } from "polished";

export interface TimelineProps {
  backgroundColor: string;
  foreColor: string;
  children: JSX.Element[];
  itemGap?: number;
}

const RootTimeline = styled.div<Omit<TimelineProps, "children">>(
  ({ theme, foreColor, backgroundColor, itemGap }) => ({
    display: "flex",
    flexDirection: "column",

    "& .item": {
      display: "flex",
      alignItems: "center",
      color: foreColor,
      transition: "all 0.5s ease",
      position: "relative",

      "& .indicator": {
        minWidth: "40px",
        maxWidth: "40px",
        display: "flex",
        justifyContent: "center",
        zIndex: 1,
      },

      "& .bullet": {
        borderRadius: "100%",
        border: "10px solid",
        transition: "all 0.5s ease",
        backgroundColor: foreColor,

        "& .dot": {
          backgroundColor: foreColor,
          borderRadius: "100%",
          width: "10px",
          height: "10px",
        },
      },

      "& .content": {
        display: "flex",
        flexDirection: "column",
        marginLeft: "2rem",
        marginTop: itemGap ? Math.floor(itemGap / 2) : "0.5rem",
        marginBottom: itemGap ? Math.floor(itemGap / 2) : "0.5rem",
        opacity: 0.7,
        transition: "opacity 0.3s ease",
      },
    },

    "& .item:after": {
      content: "' '",
      borderLeft: "2px solid",
      position: "absolute",
      top: 0,
      left: 20,
      bottom: 0,
      zIndex: 0,
    },

    "& .item:first-of-type:after": { top: "50%" },
    "& .item:last-child:after": { bottom: "50%" },

    "& .item:hover": {
      color: foreColor,

      "& .bullet": {
        border: "2px solid",
        padding: "13px",
        backgroundColor: backgroundColor,

        "& .dot": {
          backgroundColor: foreColor,
        },
      },

      "& .content": {
        opacity: 1,
      },
    },
  })
);

const Timeline = ({ children, ...props }: TimelineProps) => {
  return (
    <RootTimeline {...props}>
      {children.map((content, index) => (
        <div className="item" key={index}>
          <div className="indicator">
            <div className="bullet">
              <div className="dot" />
            </div>
          </div>
          <div className="content">{content}</div>
        </div>
      ))}
    </RootTimeline>
  );
};

export default Timeline;
