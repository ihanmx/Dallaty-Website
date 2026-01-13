// i18-next
import { useTranslation } from "react-i18next";

//framer motion
import { motion } from "framer-motion";

//MUI components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CardComponent = ({ img, title, body, index = 0 }) => {
  const { t } = useTranslation();

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <Card
      component={motion.div}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{
        y: -10,
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3 },
      }}
      sx={{
        width: { xs: 260, sm: 280, md: 300, lg: 320 },
        height: { xs: 320, sm: 340, md: 360, lg: 380 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        boxSizing: "border-box",
        cursor: "pointer",
        background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
        transition: "all 0.3s ease",
      }}
    >
      <Box
        component={motion.div}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
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
          sx={{
            textAlign: "center",
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          {t(title)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          {t(body)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
