import { cyan, green } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const font = [
  "Sora",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
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
      primary: cyan,
      secondary: green,
    },
    typography: {
      fontFamily: font,
      h1:{
        fontWeight:700,
      },
      subtitle2: {
        fontWeight: 600,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          fontFamily: font,
          color: "textPrimary",
        },
      },
    },
  
  });

theme = responsiveFontSizes(theme);

export default theme;