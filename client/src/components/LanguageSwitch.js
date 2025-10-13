import Tooltip from "@mui/material/Tooltip";

import flagEn from "../images/design1.png";
import flagAr from "../images/design1dark.png";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const LanguageSwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 40,
  padding: 8,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      transform: "translateX(28px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url(${flagAr})`,
        backgroundSize: "contain", // ensures image fits inside
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.background.paper,
    width: 30,
    height: 30,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundImage: `url(${flagEn})`,
      backgroundSize: "contain", // <--- important
      backgroundPosition: "center", // <--- center the image
      backgroundRepeat: "no-repeat", // <--- prevent repetition
      borderRadius: "50%", // keep it inside the circle
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 20,
    opacity: 1,
    backgroundColor: theme.palette.grey[300],
  },
}));

export default LanguageSwitch;
