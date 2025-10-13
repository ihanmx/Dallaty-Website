import { useState } from "react";
import { useFoundUserInfo } from "../contexts/FoundUserInfoContext";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import MenuItem from "@mui/material/MenuItem";
import design1dark from "../images/design1dark.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom"; //to avoid MUI link conflict

import ReportInstruction from "./ReportInstruction";
const FoundForm = () => {
  const whereYouHear = [
    {
      value: "Freind/Family",
      label: "Freind/Family",
    },
    {
      value: "X (twitter)",
      label: "X (twitter)",
    },
    {
      value: "Instagram",
      label: "Instagram",
    },
    {
      value: "TikTok",
      label: "TikTok",
    },

    {
      value: "LinkedIn",
      label: "LinkedIn",
    },
  ];
  //Access foundUserInfo and setFoundUserInfo from context
  const { foundUserInfo, setFoundUserInfo } = useFoundUserInfo();

  //To store file preview temporaryly
  const [filePreview, setFilePreview] = useState(null);

  const [fileName, setFileName] = useState("");

  const { t, i18n } = useTranslation();

  //state handelers
  const handleNameChange = (e) => {
    setFoundUserInfo({ ...foundUserInfo, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setFoundUserInfo({ ...foundUserInfo, email: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setFoundUserInfo({ ...foundUserInfo, description: e.target.value });
  };

  const handleLocationChange = (e) => {
    setFoundUserInfo({ ...foundUserInfo, location: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]; //make sure that the file exists

    if (file) {
      setFoundUserInfo({ ...foundUserInfo, file: file });
      setFileName(file.name);
      setFilePreview(URL.createObjectURL(file)); //create a temporary URL for the file preview
    } else {
      setFoundUserInfo({ ...foundUserInfo, file: null });
      setFileName("file.name");
      setFilePreview(null);
    }
  };

  const handleResourceChange = (e) => {
    setFoundUserInfo({ ...foundUserInfo, resource: e.target.value });
  };

  const handleTermsChange = (e) => {
    setFoundUserInfo({ ...foundUserInfo, terms: !foundUserInfo.terms });
  };

  const handleInstructionChange = (e) => {
    setFoundUserInfo({
      ...foundUserInfo,
      instruction: !foundUserInfo.instruction,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      //create a form data object to be able to send file data types
      const formData = new FormData();
      formData.append("name", foundUserInfo.name);
      formData.append("email", foundUserInfo.email);
      formData.append("description", foundUserInfo.description);
      formData.append("location", foundUserInfo.location);
      formData.append("resource", foundUserInfo.resource);
      formData.append("terms", foundUserInfo.terms);
      formData.append("instruction", foundUserInfo.instruction);
      // append the file only when a real File object exists. Avoid appending null which becomes the string "null"
      if (foundUserInfo.file) {
        formData.append("image", foundUserInfo.file); //append the file to the form data
      }
      //name of append must match the name in the backend multer single("image")

      const response = await fetch("http://localhost:5000/form/found", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log("Server response:", responseData);
      alert("Form submitted successfully");

      //reset foundUserInfo and file preview for new submissions

      setFoundUserInfo({
        name: "",
        email: "",
        description: "",
        location: "",
        file: null,
        resource: "",
        terms: false,
        instruction: false,
      });
      setFilePreview(null);
      setFileName("");
      console.log(foundUserInfo);
    } catch (err) {
      console.error(err.message);
      alert("Error submitting form");
    }
  };

  return (
    <div>
      <ReportInstruction thememode="dark" />
      {/* form container */}

      <Stack
        sx={{
          width: "100%",
          maxWidth: "100%",
          p: 2,
          minHeight: "100vh",
          bgcolor: (theme) => theme.palette.light.main,
          padding: "1rem",
          boxSizing: "border-box",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${design1dark})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // to cover the container
          backgroundPosition: "center",

          overflowX: "hidden",
        }}
      >
        {/* this box act as the form component */}
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
          sx={{
            width: { xs: "80%", sm: "70%", md: "50%", lg: "45%" }, // responsive breakpoints
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderRadius: "8px",
            p: { xs: "1rem", md: "1.5rem" },
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            boxSizing: "border-box",
          }}
        >
          <Typography textAlign={"center"} variant="h3" color="primary.main">
            {t("What did you find ?")}
          </Typography>

          <Typography>
            {t("Lost an item ?")}{" "}
            <Link
              component={RouterLink}
              to="/foundform"
              target="_blank"
              rel="noopener noreferrer"
              underline="always"
              sx={{ fontWeight: "bold" }}
            >
              {t("Lost items form")}
            </Link>{" "}
          </Typography>
          <InputLabel htmlFor="name-input" sx={{ mt: 2 }}>
            {t("Name")} <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            required
            name="name"
            id="name-input"
            type="text"
            placeholder={t("Enter your full name")}
            fullWidth
            size="small"
            value={foundUserInfo.name}
            onChange={handleNameChange}
          />

          <InputLabel htmlFor="email-input" sx={{ mt: 2 }}>
            {t("Email")} <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            required
            name="email"
            id="email-input"
            type="email"
            placeholder={t("Enter your email")}
            fullWidth
            size="small"
            value={foundUserInfo.email}
            onChange={handleEmailChange}
          />

          <InputLabel htmlFor="description-input" sx={{ mt: 2 }}>
            {t("Description of the found item")}{" "}
            <span style={{ color: "red" }}>*</span>
          </InputLabel>

          <TextField
            required
            name="description"
            id="description-input"
            multiline
            rows={4}
            placeholder={t(
              "Mention details such as type, color, brand, size, place, any unique features, etc."
            )}
            value={foundUserInfo.description}
            onChange={handleDescriptionChange}
          />

          <InputLabel htmlFor="location-input" sx={{ mt: 2 }}>
            {t("When did you find the item?")}
            <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            required
            name="date"
            id="date-input"
            type="text"
            placeholder={t("Enter the date")}
            fullWidth
            size="small"
            value={foundUserInfo.location}
            onChange={handleLocationChange}
          />

          <InputLabel htmlFor="location-input" sx={{ mt: 2 }}>
            {t("Where did you find the item?")}
            <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            required
            name="location"
            id="location-input"
            type="text"
            placeholder={t("Enter the location")}
            fullWidth
            size="small"
            value={foundUserInfo.location}
            onChange={handleLocationChange}
          />

          <InputLabel htmlFor="description-input" sx={{ mt: 2 }}>
            {t("Where and who did you take the item to?")}{" "}
            <span style={{ color: "red" }}>*</span>
          </InputLabel>

          <TextField
            required
            name="recipientDescription"
            id="recipientDescription-input"
            multiline
            rows={4}
            placeholder={t(
              "Please enter a description of the place and information about the recipient if possible."
            )}
            value={foundUserInfo.description}
            onChange={handleDescriptionChange}
          />

          <InputLabel htmlFor="file-input" sx={{ mt: 2 }}>
            {t("Item photo")} <span style={{ color: "red" }}>*</span>
          </InputLabel>

          {/* label button to style file input */}
          <Button name="file" variant="outlined" component="label" required>
            {/* file upload should be req */}
            <FileUploadRoundedIcon />
            {t("Upload Item Photo")}
            <input
              id="file-input"
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          {fileName && (
            <p>
              {t("Selected file:")} {fileName}
            </p>
          )}

          <FormControlLabel
            control={
              <Checkbox
                required
                name="instruction"
                id="instruction-checkbox"
                checked={foundUserInfo.instruction}
                onChange={handleInstructionChange}
              />
            }
            label={t(
              "I acknowledge that I committed to all instructions for reporting a found item."
            )}
          />

          <FormControlLabel
            control={
              <Checkbox
                required
                name="terms"
                id="terms-checkbox"
                checked={foundUserInfo.terms}
                onChange={handleTermsChange}
              />
            }
            label={
              <>
                {t("I agree to the")}{" "}
                <Link
                  href="https://dhallaty.sa/TC-en"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {t("Terms and Conditions")}
                </Link>
              </>
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              width: "40%",
              alignSelf: "center",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {t("Submit")}
          </Button>
        </Box>
      </Stack>
    </div>
  );
};
export default FoundForm;
