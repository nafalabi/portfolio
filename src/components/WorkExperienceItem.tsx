import { useTheme } from "@emotion/react";
import Typography from "./Typography";

export interface WorkExperience {
  jobTitle: string;
  timeRange: string;
  company: string;
  companyIcon: any;
  description: string;
}

const WorkExperienceItem = ({
  jobTitle,
  timeRange,
  company,
  companyIcon,
  description,
}: WorkExperience) => {
  const theme = useTheme();

  return (
    <div>
      <div
        css={{
          display: "flex",
          alignItems: "start",
          gap: "0.5rem",
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="body" fontWeight="bold">
          {jobTitle}
        </Typography>
        <Typography variant="body2" fontWeight="normal" css={{ whiteSpace: 'nowrap' }}>
          &middot;
          &nbsp;
          {timeRange}
        </Typography>
      </div>
      <div
        css={{
          marginTop: "0.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={companyIcon}
          css={{
            marginRight: "0.5rem",
            height: 24,
            width: 24,
            filter: "grayscale(20%)",
            backgroundColor: theme.colors.text2,
            borderRadius: "5px",
          }}
        />
        <div>{company}</div>
      </div>
      <div css={{ whiteSpace: "pre-wrap", marginTop: "0.5rem" }}>
        {description}
      </div>
    </div>
  );
};

export default WorkExperienceItem;
