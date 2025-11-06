//hooks
import { useState } from "react";
//contexts
import { useLostUserInfo } from "../contexts/LostUserInfoContext";
import { useSnackbar } from "../contexts/SnackbarProvider";
// i18-next
import { useTranslation } from "react-i18next";
//MUI components
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//MUI icons
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
//local images
import design1 from "../images/design1.png";
//react-router-dom
import { Link as RouterLink } from "react-router-dom";

const LostForm = () => {
  const whereYouHear = [
    {
      value: "Friend/Family",
      label: "Friend/Family",
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
  //Access lostUserInfo and setLostUserInfo from context
  const { lostUserInfo, setLostUserInfo } = useLostUserInfo();
  const { t } = useTranslation();

  //To store file preview temporaryly
  const [filePreview, setFilePreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [fileName, setFileName] = useState("");

  const { showSnackbar } = useSnackbar();

  //state handelers
  const handleNameChange = (e) => {
    setLostUserInfo({ ...lostUserInfo, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setLostUserInfo({ ...lostUserInfo, email: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setLostUserInfo({ ...lostUserInfo, description: e.target.value });
  };

  const handleLocationChange = (e) => {
    setLostUserInfo({ ...lostUserInfo, location: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]; //make sure that the file exists

    if (file) {
      setLostUserInfo({ ...lostUserInfo, file: file });
      setFileName(file.name);
      setFilePreview(URL.createObjectURL(file)); //create a temporary URL for the file preview
    } else {
      setLostUserInfo({ ...lostUserInfo, file: null });
      setFileName("file.name");
      setFilePreview(null);
    }
  };

  const handleResourceChange = (e) => {
    setLostUserInfo({ ...lostUserInfo, resource: e.target.value });
  };

  const handleTermsChange = (e) => {
    setLostUserInfo({ ...lostUserInfo, terms: !lostUserInfo.terms });
  };

  const handleFeesChange = (e) => {
    setLostUserInfo({ ...lostUserInfo, fees: !lostUserInfo.fees });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); //start loading
    try {
      //create a form data object to be able to send file data types
      const formData = new FormData();
      formData.append("name", lostUserInfo.name);
      formData.append("email", lostUserInfo.email);
      formData.append("description", lostUserInfo.description);
      formData.append("location", lostUserInfo.location);
      formData.append("resource", lostUserInfo.resource);
      formData.append("terms", lostUserInfo.terms);
      formData.append("fees", lostUserInfo.fees);
      // append the file only when a real File object exists. Avoid appending null which becomes the string "null"
      if (lostUserInfo.file) {
        formData.append("image", lostUserInfo.file); //append the file to the form data
      }
      //name of append must match the name in the backend multer single("image")

      const response = await fetch("http://localhost:5000/form/lost", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log("Server response:", responseData);

      if (response.ok) {
        showSnackbar(t("Form submitted successfully!"), "success");
        setLostUserInfo({
          name: "",
          email: "",
          description: "",
          location: "",
          file: null,
          resource: "",
          terms: false,
          fees: false,
        });
        setFilePreview(null);
        setFileName("");

        console.log(lostUserInfo);
      }

      //reset lostUserInfo and file preview for new submissions
    } catch (err) {
      console.error(err.message);
      alert("Error submitting form");
    } finally {
      setLoading(false);
    } //to stop loading when there is an error
  };

  return (
    <>
      {/* form container */}

      <Stack
        id="lost-page"
        sx={{
          p: 2,
          minHeight: "100vh",
          width: "100%",
          maxWidth: "100%",
          backgroundColor: "white",
          padding: "1rem",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          backgroundImage: `url(${design1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflowX: "hidden",
        }}
      >
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
          sx={{
            width: { xs: "80%", sm: "70%", md: "50%", lg: "45%" },
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderRadius: "8px",
            p: { xs: "1rem", md: "1.5rem" },
            mt: 2,
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            boxSizing: "border-box",
          }}
        >
          <Typography textAlign={"center"} variant="h3" color="primary.main">
            {t("What did you lose?")}
          </Typography>

          <Typography>
            {t("Found a lost item ?")}{" "}
            <Link
              component={RouterLink}
              to="/foundform"
              rel="noopener noreferrer"
              underline="always"
              sx={{ fontWeight: "bold" }}
            >
              {t("Found items form")}
            </Link>{" "}
          </Typography>

          <InputLabel htmlFor="name-input" sx={{ mt: 2, width: "65%" }}>
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
            value={lostUserInfo.name}
            onChange={handleNameChange}
          />

          <InputLabel htmlFor="email-input" sx={{ mt: 2, width: "65%" }}>
            {t("Gmail")} <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            required
            name="email"
            id="email-input"
            type="email"
            placeholder={t("Enter your gmail")}
            fullWidth
            size="small"
            value={lostUserInfo.email}
            onChange={handleEmailChange}
          />

          <InputLabel htmlFor="description-input" sx={{ mt: 2, width: "65%" }}>
            {t("Description of the Lost Item")}{" "}
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
            value={lostUserInfo.description}
            onChange={handleDescriptionChange}
          />

          <InputLabel htmlFor="location-input" sx={{ mt: 2, width: "65%" }}>
            {t("Approximate Location")}
            <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            required
            name="location"
            id="location-input"
            type="text"
            placeholder={t("Enter the approximate location")}
            fullWidth
            size="small"
            value={lostUserInfo.location}
            onChange={handleLocationChange}
          />

          <InputLabel htmlFor="file-input" sx={{ mt: 2, width: "65%" }}>
            {t("Item Photo")} <span style={{ color: "red" }}>*</span>
          </InputLabel>

          {/* label button to style file input */}
          <Button name="file" variant="outlined" component="label" required>
            <FileUploadRoundedIcon />
            {t("Upload photo")}
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

          <InputLabel htmlFor="resource-input" sx={{ mt: 2, width: "65%" }}>
            {t("How Did You Hear About Us?")}{" "}
            <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            required
            name="resource"
            id="resource-input"
            select
            label={t("Select...")}
            size="small"
            value={lostUserInfo.resource}
            onChange={handleResourceChange}
          >
            <MenuItem value="">
              <em>{t("Select...")}</em>
            </MenuItem>
            {whereYouHear.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {t(option.label)}
              </MenuItem>
            ))}
          </TextField>

          <FormControlLabel
            control={
              <Checkbox
                required
                name="fees"
                id="fees-checkbox"
                checked={lostUserInfo.fees}
                onChange={handleFeesChange}
              />
            }
            label={t(
              "I acknowledge that a service fee of 25 SAR applies if the item is found"
            )}
          />

          <FormControlLabel
            control={
              <Checkbox
                required
                name="terms"
                id="terms-checkbox"
                checked={lostUserInfo.terms}
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
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("Submit")
            )}
          </Button>
        </Box>
      </Stack>
    </>
  );
};
export default LostForm;
