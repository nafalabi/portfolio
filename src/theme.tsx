import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

export const theme = {
  colors: {
    background: "#e1dfde",
    text: "#010102",
    background2: "#333",
    text2: "#fff",
    button: {
      blue: "#150c6c",
      red: "#991b1b",
    },
    buttonText: {
      white: "#fff",
    },
    chip: {
      blue: "#150c6c",
      red: "#991b1b",
      default: "#ddd",
    },
  },
  breakpoints: {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1200,
  },
  typography: {
    jumbo: 80,
    heading: 50,
    heading2: 40,
    title: 24,
    body: 18,
    body2: 15,
  },
  shadow: {
    0: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    1: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    2: "2px 2px 3px #000000ab",
    3: "0px 3px 5px #000000b8",
  },
};

export type CustomTheme = typeof theme;

declare module "@emotion/react" {
  interface Theme extends CustomTheme {}
}

interface Props {
  children: any;
}

const ThemeProvider = (props: Props) => {
  return <EmotionThemeProvider theme={theme} {...props} />;
};

export default ThemeProvider;
