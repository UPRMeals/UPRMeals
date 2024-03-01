import { colors } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

enum Colors {
  Charcoal = "#042325",
  BlueCharcoal = "#002A32",
  ColegioGreen = "#009A44",
  Teal = "#087F8C",
  Gold = "#BB9F06",
  OrangeSunset = "#C7421A",
  Red = "#E71D36",
}

let theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fffdf9",
    },
    primary: {
      main: Colors.Charcoal,
    },
    text: {
      primary: Colors.Charcoal,
      secondary: Colors.OrangeSunset,
    },
    secondary: {
      main: Colors.BlueCharcoal,
    },
    warning: {
      main: Colors.Red,
    },
    success: {
      main: Colors.ColegioGreen,
    },
    info: {
      main: Colors.Teal,
    },
  },
  typography: {
    fontFamily: ["Poppins", "Bungee", "Open Sans"].join(","),
    h1: {
      fontWeight: 900,
    },
    subtitle2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: ["Poppins", "Bungee", "Open Sans"].join(","),
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
