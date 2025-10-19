//MUI components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//local images
import cameraIcon from "../images/mobile-camera-icon.png";
import policaIcon from "../images/constable-police-icon.png";
import websiteIcon from "../images/software-window-icon.png";
import membershipIcon from "../images/name-id-icon.png";
//local components
import CardComponent from "./CardComponent";
//i18 next
import { useTranslation } from "react-i18next";

const ReportInstruction = () => {
  const instructions = [
    {
      title: "Step 1",
      body: "Take a clear photo of the item",
      img: cameraIcon,
    },
    {
      title: "Step 2",
      body: "Take the item to the nearest person who is in charge in your location (such as: Lost & Found staff, Security guard, etc...).",
      img: policaIcon,
    },
    {
      title: "Step 3",
      body: "Go to Dhallaty's website and fill in the (What did you find?) form.",
      img: websiteIcon,
    },
    {
      title: "Step 4",
      body: "Now, you have become a Dhallaty ambassador, and you'll enjoy the benefits of membership.",
      img: membershipIcon,
    },
  ];

  const { t, i18n } = useTranslation();

  return (
    <Stack
      direction="column"
      sx={{
        p: 2,

        width: "100%",
        maxWidth: "100%",
        padding: "2rem",
        boxSizing: "border-box",
        bgcolor: "#00192F",

        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden",
      }}
      gap={2}
    >
      <Stack
        id="report-text-stack"
        sx={{
          width: "100%",
          maxWidth: "100%",

          boxSizing: "border-box",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <Typography variant="h2">{t("Report Instructions")}</Typography>
        <Typography variant="body1">
          {t("Before continuing to the report form, please do the following:")}
        </Typography>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          p: 2,
          boxSizing: "border-box",

          width: "100%",
          maxWidth: "100%",
          padding: "2rem",

          alignItems: "center",
          justifyContent: "space-around",
        }}
        gap={2}
      >
        {instructions.map((instruction) => {
          return (
            <CardComponent
              img={instruction.img}
              title={instruction.title}
              body={instruction.body}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ReportInstruction;
