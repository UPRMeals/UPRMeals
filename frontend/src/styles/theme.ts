import { cyan, green } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const font = [
  "Roboto",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(",");

let theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f0f0f0",
    },
    // TODO: These colors are temporary
    primary: {
      main: "#35A576",
    },
    secondary: {
      main: "#1B7F7D",
    },
  },
  typography: {
    fontFamily: font,
    h1: {
      fontWeight: 700,
    },
    subtitle2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: font,
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
