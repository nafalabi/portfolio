import * as React from "react";

export enum Section {
  INTRO,
  WORK_EXPERIENCE,
  ABOUT_ME,
  PROJECTS,
  FOOTER,
}

interface IPageStateContex {
  activeSection: Section;
  setSection: (section: Section) => void;
}

export const PageStateContext = React.createContext<IPageStateContex>({
  activeSection: Section.INTRO,
  setSection: (section) => {},
});

export const PageStateProvider = ({ children }) => {
  const [activeSection, setSection] = React.useState<Section>(Section.INTRO);

  return (
    <PageStateContext.Provider value={{ activeSection, setSection }}>
      {children}
    </PageStateContext.Provider>
  );
};
