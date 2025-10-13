// theme.js

import { createTheme, darken, lighten } from "@mui/material/styles";

const createCustomColor = (mainColor, lightAmount = 0.2, darkAmount = 0.2) => ({
  main: mainColor,
  light: lighten(mainColor, lightAmount),
  dark: darken(mainColor, darkAmount),
  contrastText: "#fff",
});

const getTheme = (direction = "ltr") =>
  createTheme({
    direction,
    //MUI props recognize only primary and secondary colors by default.
    // to use others like accent, light, dark, etc., you need to define them manually by style or sx from theme object.
    palette: {
      primary: createCustomColor("#11747f"),
      secondary: createCustomColor("#9ab5ae"),
      accent: createCustomColor("#a26d5d"),
      accent1: createCustomColor("#385e5b"),
      light: createCustomColor("#dbdad5"),
      dark: createCustomColor("#0d3147"),
      black1: createCustomColor("#222222"),
      black2: createCustomColor("#222831"),
      black3: createCustomColor("#686D76"),
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
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#f8f9fa",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f1f3f5",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#9ab5ae",
                  borderWidth: "2px",
                },
              },
              "&.Mui-focused": {
                backgroundColor: "#ffffff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#11747f",
                  borderWidth: "2px",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e0e0e0",
                transition: "all 0.3s ease",
              },
            },
            "& .MuiInputLabel-root": {
              fontWeight: 500,
              "&.Mui-focused": {
                color: "#11747f",
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            padding: "10px 24px",
            boxShadow: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
          },
          contained: {
            "&:hover": {
              boxShadow: "0 6px 20px rgba(17, 116, 127, 0.3)",
            },
          },
          outlined: {
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            color: "#495057",
            marginBottom: "8px",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            backgroundColor: "#f8f9fa",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#f1f3f5",
            },
            "&.Mui-focused": {
              backgroundColor: "#ffffff",
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            borderRadius: "6px",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(17, 116, 127, 0.08)",
            },
          },
        },
      },
    },
  });

export default getTheme;

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
