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
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
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
    },
    common: {
      black: "#000000",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default theme;
