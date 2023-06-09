import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#071958",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#1F34A7",
    },
    error: {
      light: red[100],
      main: red.A400,
    },
    info: {
      light: "#BFCBE2",
      main: "#A4BDFF",
    },
    grey: {
      100: "#EFEFEF",
      200: "#D9D9D9",
      300: "#6B6B6B",
      400: "#F3F3F3",
      500: "#F0F0F0",
      600: "#F7F7F7",
      700: "#6E727D",
      800: "#111111",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    background: {
      paper: "#02081E",
    },
  },
  typography: {
    fontFamily: ["SUIT", "Pretendard", "Racing Sans One"].join(","),
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
