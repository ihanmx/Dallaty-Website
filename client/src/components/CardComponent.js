import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const CardComponent = ({ img, title, body }) => {
  const { t, i18n } = useTranslation();
  return (
    <Card
      sx={{
        width: { xs: 260, sm: 280, md: 300, lg: 320 }, // responsive widths
        height: { xs: 320, sm: 340, md: 360, lg: 380 }, // proportional height
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden", // keeps image corners rounded
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          height: { xs: 120, sm: 130, md: 150 },
          p: 2,
        }}
      >
        <CardMedia
          component="img"
          image={img}
          alt={title}
          sx={{
            objectFit: "contain",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ textAlign: "center", fontWeight: 600 }}
        >
          {t(title)}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          {t(body)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
