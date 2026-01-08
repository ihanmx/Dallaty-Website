//MUI components

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";

// Router
import { Link } from "react-router-dom";

// i18-next
import { useTranslation } from "react-i18next";

const StatusMessage = ({ message, description, icon, showHomepage }) => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="column"
      textAlign="center"
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        background: "linear-gradient(135deg, #11747f 0%, #385e5b 100%)",
      }}
    >
      <Card
        sx={{
          width: { xs: "70%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 5, md: 6, lg: 10 },
        }}
      >
        {icon}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {message}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          {showHomepage && (
            <Link to="/home">
              <Button variant="contained" size="small">
                {t("Homepage")}
              </Button>
            </Link>
          )}
        </CardActions>
      </Card>
    </Stack>
  );
};

export default StatusMessage;
