import { extendTheme } from "@mui/joy/styles";

const joytheme = extendTheme({
  // joy UI supports custom keys you can access them directly
  colorSchemes: {
    light: {
      palette: {
        primary: { 500: "#11747f" }, // your MUI primary.main
        secondary: { 500: "#9ab5ae" }, // your MUI secondary.main
        neutral: { 500: "#dbdad5" }, // use MUI light as neutral
        accent: { 500: "#a26d5d" }, // custom key
        accent1: { 500: "#385e5b" }, // custom key
        dark: { 500: "#0d3147" }, // custom key
      },
    },
  },

  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h1: { fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700 },
    body1: { fontSize: "1rem" },
  },
});

export default joytheme;
