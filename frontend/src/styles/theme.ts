import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";

enum Colors {
  Charcoal = "#042325",
  BlueCharcoal = "#002A32",
  ColegioGreen = "#009A44",
  Teal = "#087F8C",
  Gold = "#BB9F06",
  OrangeSunset = "#C7421A",
  Red = "#E71D36",
}

const breakpoints = createBreakpoints({});

const defaultTheme = createTheme({
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
    error: {
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
      color: Colors.Teal,
    },
    h2: {
      fontWeight: 600,
      color: Colors.Teal,
      letterSpacing: 0.25,
    },
    h3: {
      fontWeight: 400,
      color: Colors.Charcoal,
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
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "capitalize",
          borderRadius: 5,
          letterSpacing: 0.25,
          [breakpoints.down("sm")]: {
            fontSize: 18,
          },
          [breakpoints.up("sm")]: {
            fontSize: 20,
          },
        },
        outlined: {
          color: Colors.OrangeSunset,
          borderColor: Colors.OrangeSunset,
          "&:hover": {
            backgroundColor: Colors.OrangeSunset,
            color: "#ffff",
            borderColor: Colors.OrangeSunset,
          },
        },
        contained: {
          disableElevation: true,
          color: "#fffdf9",
          backgroundColor: Colors.OrangeSunset,
          "&:hover": {
            backgroundColor: Colors.Teal,
            color: "#ffff",
            borderColor: Colors.Teal,
          },
        },
        text: {
          color: Colors.OrangeSunset,
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          label: {
            color: Colors.Charcoal,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: Colors.Teal,
        },
      },
    },
  },
});

const theme = responsiveFontSizes(defaultTheme);

export default theme;
