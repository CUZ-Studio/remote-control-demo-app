import { Inter } from "next/font/google";
import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#B8E5FF",
    },
    error: {
      light: red[100],
      main: red.A400,
    },
    grey: {
      100: "#EFEFEF",
      200: "#D9D9D9",
      300: "#6B6B6B",
      400: "#F3F3F3",
      500: "#F0F0F0",
      600: "#F7F7F7",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: undefined,
    h2: undefined,
    h3: undefined,
    h4: undefined,
    h5: undefined,
    h6: undefined,
    body1: undefined,
    body2: undefined,
    button: undefined,
  },
});

export default theme;
