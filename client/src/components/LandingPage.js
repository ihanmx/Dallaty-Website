import Stack from "@mui/material/Stack";
import landpageImage from "../images/landpageImage.png";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import DeviceUnknownOutlinedIcon from "@mui/icons-material/DeviceUnknownOutlined";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";

const LandingPage = () => {
  const h1Styles = { xs: "1rem", sm: "1.2rem", md: "1.8rem", lg: "1.8rem" };

  return (
    // Main container
    <Stack
      direction={{ md: "row", xs: "column" }}
      justifyContent="center"
      alignItems="center"
      spacing={0}
      sx={{
        pt: 4,
        height: "110vh",
        maxHeight: { md: "110vh", xs: "auto" },
        maxWidth: "100vw",
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: { md: "space-around", xs: "center" },

        // backgroundColor: "red",
      }}

      // sx={{ backgroundColor: "light.main" }}
    >
      {/* left side (buttons and typogrophy) */}

      <Stack
        sx={{
          height: { md: "100%", xs: "30%" },
          maxHeight: { md: "100%", xs: "30%" },
          maxWidth: { md: "40%", xs: "100%" },
          width: { md: "40%", xs: "100%" },
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, md: 1 },
          // backgroundColor: "green",
          order: { xs: 2, md: 1 }, // flips on small screens to show the image before the text
        }}
      >
        {/* Typography stack */}
        <Stack
          className="Typography-Stack"
          direction={"column"}
          //  sx={{ backgroundColor: "yellow" }}
          gap={2}
        >
          <Typography
            textAlign={"center"}
            sx={{
              fontSize: h1Styles, //rem=16px
              fontWeight: 600,
            }}
            color="primary.main"
          >
            We work on{" "}
            <Typography
              component="span"
              color="secondary.main"
              fontWeight={700}
              sx={{
                fontSize: h1Styles, //rem=16px
                fontWeight: 600,
              }}
            >
              matching
            </Typography>{" "}
            lost items reports with those who find them
          </Typography>

          <Typography
            textAlign={"center"}
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.5rem",
                lg: "2.5rem",
              }, //rem=16px
              fontWeight: 700,
            }}
            color="secondary.main"
          >
            Precisely, Quickly, and Securely
          </Typography>
        </Stack>

        {/* Buttons stack */}
        <Stack className="Buttons-Stack" direction={"row"} spacing={2} mt={4}>
          <Button
            variant="contained"
            startIcon={<DeviceUnknownOutlinedIcon />}
            sx={{ bgcolor: "primary.main" }}
          >
            Lost Something
          </Button>

          <Button
            variant="outlined"
            startIcon={<ScreenSearchDesktopOutlinedIcon />}
          >
            Found Something
          </Button>
        </Stack>
      </Stack>

      {/* right side (image) */}
      <Stack
        sx={{
          height: { md: "100%", xs: "65%" },
          maxHeight: { md: "100%", xs: "65%" },
          maxWidth: { md: "55%", xs: "100%" },
          width: { md: "55%", xs: "100%" },
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "blue",
          order: { xs: 1, md: 2 }, // flips on small screens to show the image before the text
        }}
      >
        <img
          src={landpageImage}
          alt="Landing Page"
          style={{
            width: "90%",
            height: "80%",
            objectFit: "contain",
          }}
        />
      </Stack>
    </Stack>
  );
};

export default LandingPage;
