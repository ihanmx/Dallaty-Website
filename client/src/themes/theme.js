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
      fontFamily: '"Amiri", "Scheherazade New" serif',

      // Responsive font sizes for headings
      h1: {
        fontFamily: '"Amiri",serif',
        fontWeight: 700,
        fontSize: "2.2rem",
        "@media (min-width:600px)": { fontSize: "2.6rem" },
        "@media (min-width:900px)": { fontSize: "3rem" },
        "@media (min-width:1200px)": { fontSize: "3.4rem" },
        "@media (min-width:1536px)": { fontSize: "3.8rem" },
      },
      h2: {
        fontFamily: '"Amiri" serif',
        fontWeight: 600,
        fontSize: "1.9rem",
        "@media (min-width:600px)": { fontSize: "2.2rem" },
        "@media (min-width:900px)": { fontSize: "2.6rem" },
        "@media (min-width:1200px)": { fontSize: "3rem" },
        "@media (min-width:1536px)": { fontSize: "3.2rem" },
      },
      h3: {
        fontFamily: '"Amiri" serif',
        fontWeight: 600,
        fontSize: "1.6rem",
        "@media (min-width:600px)": { fontSize: "1.8rem" },
        "@media (min-width:900px)": { fontSize: "2.2rem" },
        "@media (min-width:1200px)": { fontSize: "2.4rem" },
        "@media (min-width:1536px)": { fontSize: "2.6rem" },
      },
      h4: {
        fontFamily: '"Amiri" serif',
        fontWeight: 600,
        fontSize: "1.4rem",
        "@media (min-width:600px)": { fontSize: "1.6rem" },
        "@media (min-width:900px)": { fontSize: "1.8rem" },
        "@media (min-width:1200px)": { fontSize: "2rem" },
        "@media (min-width:1536px)": { fontSize: "2.2rem" },
      },
      h5: {
        fontFamily: '"Amiri" serif',
        fontWeight: 500,
        fontSize: "1.2rem",
        "@media (min-width:600px)": { fontSize: "1.3rem" },
        "@media (min-width:900px)": { fontSize: "1.5rem" },
        "@media (min-width:1200px)": { fontSize: "1.6rem" },
        "@media (min-width:1536px)": { fontSize: "1.8rem" },
      },
      h6: {
        fontFamily: '"Amiri" serif',
        fontWeight: 500,
        fontSize: "1.1rem",
        "@media (min-width:600px)": { fontSize: "1.2rem" },
        "@media (min-width:900px)": { fontSize: "1.3rem" },
        "@media (min-width:1200px)": { fontSize: "1.4rem" },
        "@media (min-width:1536px)": { fontSize: "1.5rem" },
      },

      // Body text sizes
      body1: {
        fontFamily: '"Scheherazade New" serif',
        fontSize: "0.9rem",
        "@media (min-width:600px)": { fontSize: "1rem" },
        "@media (min-width:900px)": { fontSize: "1.05rem" },
        "@media (min-width:1200px)": { fontSize: "1.1rem" },
        "@media (min-width:1536px)": { fontSize: "1.15rem" },
      },
      body2: {
        fontFamily: '"Scheherazade New" serif',
        fontSize: "0.8rem",
        "@media (min-width:600px)": { fontSize: "0.85rem" },
        "@media (min-width:900px)": { fontSize: "0.9rem" },
        "@media (min-width:1200px)": { fontSize: "0.95rem" },
        "@media (min-width:1536px)": { fontSize: "1rem" },
      },
    },

    //overrides some MUI components css
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
