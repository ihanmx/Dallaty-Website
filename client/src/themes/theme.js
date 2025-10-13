// theme.js

import { createTheme, darken, lighten } from "@mui/material/styles";

const createCustomColor = (mainColor) => ({
  main: mainColor,
  light: lighten(mainColor, 0.2),
  dark: darken(mainColor, 0.2),
  contrastText: "#fff",
});

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

    light: createCustomColor("#dbdad5"),
    dark: { main: "#0d3147" },

    black1: { main: "#222222" },
    black2: { main: "#222831" },
    black3: { main: "#686D76" },
  },

  //you use it from sx typoggraphy attribute or variant prop in Typography component
  typography: {
    // Base font family (you can replace this)
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',

    // Responsive font sizes for headings
    h1: {
      fontWeight: 700,
      fontSize: "2.2rem",
      "@media (min-width:600px)": { fontSize: "2.6rem" },
      "@media (min-width:900px)": { fontSize: "3rem" },
      "@media (min-width:1200px)": { fontSize: "3.4rem" },
      "@media (min-width:1536px)": { fontSize: "3.8rem" },
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.9rem",
      "@media (min-width:600px)": { fontSize: "2.2rem" },
      "@media (min-width:900px)": { fontSize: "2.6rem" },
      "@media (min-width:1200px)": { fontSize: "3rem" },
      "@media (min-width:1536px)": { fontSize: "3.2rem" },
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.6rem",
      "@media (min-width:600px)": { fontSize: "1.8rem" },
      "@media (min-width:900px)": { fontSize: "2.2rem" },
      "@media (min-width:1200px)": { fontSize: "2.4rem" },
      "@media (min-width:1536px)": { fontSize: "2.6rem" },
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.4rem",
      "@media (min-width:600px)": { fontSize: "1.6rem" },
      "@media (min-width:900px)": { fontSize: "1.8rem" },
      "@media (min-width:1200px)": { fontSize: "2rem" },
      "@media (min-width:1536px)": { fontSize: "2.2rem" },
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.2rem",
      "@media (min-width:600px)": { fontSize: "1.3rem" },
      "@media (min-width:900px)": { fontSize: "1.5rem" },
      "@media (min-width:1200px)": { fontSize: "1.6rem" },
      "@media (min-width:1536px)": { fontSize: "1.8rem" },
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.1rem",
      "@media (min-width:600px)": { fontSize: "1.2rem" },
      "@media (min-width:900px)": { fontSize: "1.3rem" },
      "@media (min-width:1200px)": { fontSize: "1.4rem" },
      "@media (min-width:1536px)": { fontSize: "1.5rem" },
    },

    // Body text sizes
    body1: {
      fontSize: "0.9rem",
      "@media (min-width:600px)": { fontSize: "1rem" },
      "@media (min-width:900px)": { fontSize: "1.05rem" },
      "@media (min-width:1200px)": { fontSize: "1.1rem" },
      "@media (min-width:1536px)": { fontSize: "1.15rem" },
    },
    body2: {
      fontSize: "0.8rem",
      "@media (min-width:600px)": { fontSize: "0.85rem" },
      "@media (min-width:900px)": { fontSize: "0.9rem" },
      "@media (min-width:1200px)": { fontSize: "0.95rem" },
      "@media (min-width:1536px)": { fontSize: "1rem" },
    },
  },
});

export default theme;

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

// 🎨 Responsive Font Size Guide (in rem)
// --------------------------------------

// For MUI breakpoints:
// xs = 0–599px
// sm = 600–899px
// md = 900–1199px
// lg = 1200–1535px
// xl = 1536px+

// Headings:
// ---------
// h1:  xs: 2.2rem | sm: 2.6rem | md: 3rem | lg: 3.4rem | xl: 3.8rem
// h2:  xs: 1.9rem | sm: 2.2rem | md: 2.6rem | lg: 3rem | xl: 3.2rem
// h3:  xs: 1.6rem | sm: 1.8rem | md: 2.2rem | lg: 2.4rem | xl: 2.6rem
// h4:  xs: 1.4rem | sm: 1.6rem | md: 1.8rem | lg: 2rem | xl: 2.2rem
// h5:  xs: 1.2rem | sm: 1.3rem | md: 1.5rem | lg: 1.6rem | xl: 1.8rem
// h6:  xs: 1.1rem | sm: 1.2rem | md: 1.3rem | lg: 1.4rem | xl: 1.5rem

// Body text:
// ----------
// body:   xs: 0.9rem | sm: 1rem | md: 1.05rem | lg: 1.1rem | xl: 1.15rem
// small:  xs: 0.8rem | sm: 0.85rem | md: 0.9rem | lg: 0.95rem | xl: 1rem

// Notes:
// ------
// - Use rem for accessibility and scalability.
// - These values provide a balanced modern hierarchy.
// - Works well with Material UI’s sx prop:
//     fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2.2rem", lg: "2.4rem", xl: "2.6rem" }
// - You can define these once in theme.typography for consistency.
