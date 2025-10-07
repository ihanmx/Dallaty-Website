// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  //MUI props recognize only primary and secondary colors by default.
  // to use others like accent, light, dark, etc., you need to define them manually by style or sx from theme object.
  palette: {
    primary: {
      main: "#11747f",
    },
    secondary: {
      main: "#9ab5ae",
    },

    accent: {
      main: "#a26d5d",
    },

    accent1: {
      main: "#385e5b",
    },

    light: { main: "#dbdad5" },
    dark: { main: "#0d3147" },
  },
});

export default theme;

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px
