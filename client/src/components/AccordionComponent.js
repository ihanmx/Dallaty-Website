import Accordion from "@mui/material/Accordion";

import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const AccordionComponent = ({ title, body }) => {
  const accordionStyle = {
    width: { xs: "80%", sm: "70%", md: "50%", lg: "45%" },
    bgcolor: "accent1.main",
    color: "white",
  };

  const accordionIconStyle = { color: "white" };

  return (
    <Accordion sx={accordionStyle}>
      <AccordionSummary
        expandIcon={<AddRoundedIcon sx={accordionIconStyle} />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography component="span">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{body}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionComponent;
