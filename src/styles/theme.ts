import { Inter } from "next/font/google";
import { grey, red } from "@mui/material/colors";
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
      100: grey[100],
      200: "#D9D9D9",
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
