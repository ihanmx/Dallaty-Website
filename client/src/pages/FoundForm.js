//hooks
import { useState } from "react";
//contexts
import { useFoundUserInfo } from "../contexts/FoundUserInfoContext";
import { useSnackbar } from "../contexts/SnackbarProvider";
// i18-next
import { useTranslation } from "react-i18next";
//MUI components
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
//MUI icons
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
//MUI date pickers
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//dayjs
import dayjs from "dayjs";
// react router-dom
import { Link as RouterLink } from "react-router-dom";
//local images
import design1dark from "../images/design1dark.png";
//local components
import ReportInstruction from "../components/ReportInstruction";
//api config
import axios from "../api/axios";

const FoundForm = () => {
  //Access foundUserInfo and setFoundUserInfo from context
  const { foundUserInfo, setFoundUserInfo } = useFoundUserInfo();

  //To store file preview temporaryly
  const [filePreview, setFilePreview] = useState(null);

  const [fileName, setFileName] = useState("");
  // const [foundDate, setFoundDate] = useState(null);

  const { t } = useTranslation();

  const { showSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

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

  // DatePicker onChange provides a Dayjs value (or null) — not an event
  const handleFoundDateChange = (value) => {
    setFoundUserInfo({ ...foundUserInfo, foundDate: value });
  };

  const handleLocationChange = (e) => {
    setFoundUserInfo({ ...foundUserInfo, location: e.target.value });
  };

  const handleRecipientDescriptionChange = (e) => {
    setFoundUserInfo({
      ...foundUserInfo,
      recipientDescription: e.target.value,
    });
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
    setLoading(true);
    try {
      //create a form data object to be able to send file data types
      const formData = new FormData();
      formData.append("name", foundUserInfo.name);
      formData.append("email", foundUserInfo.email);
      formData.append("description", foundUserInfo.description);
      formData.append("location", foundUserInfo.location);
      formData.append(
        "recipientDescription",
        foundUserInfo.recipientDescription,
      );

      formData.append("terms", foundUserInfo.terms);
      formData.append("instruction", foundUserInfo.instruction);

      // Append the found date if it exists
      if (foundUserInfo.foundDate) {
        // ensure we format whatever the stored value is using dayjs
        const formatted = dayjs(foundUserInfo.foundDate).format("YYYY-MM-DD");
        formData.append("foundDate", formatted);
      }

      // append the file only when a real File object exists. Avoid appending null which becomes the string "null"
      if (foundUserInfo.file) {
        formData.append("image", foundUserInfo.file); //append the file to the form data
      }
      //name of append must match the name in the backend multer single("image")

      const response = await axios.post("/form/found", formData);

      console.log("Server response:", response.data);

      if (response.status === 200) {
        showSnackbar(t("Form submitted successfully!"), "success");
        setFoundUserInfo({
          name: "",
          email: "",
          description: "",
          foundDate: null,
          location: "",
          recipientDescription: "",
          file: null,
          terms: false,
          instruction: false,
        });
        setFilePreview(null);
        setFileName("");

        // console.log(foundUserInfo);
      }
    } catch (err) {
      // console.error(err.response?.data || err.message);
      if (err.response?.status === 429) {
        showSnackbar(
          t("Too many submissions. Please try again later."),
          "warning.main",
        );
      } else {
        showSnackbar(t("Error submitting form. Please try again."), "error");
      }
    } finally {
      setLoading(false);
    } //to stop loading when there is an error
  };

  return (
    <div>
      <ReportInstruction />
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
          backgroundSize: "cover",
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
            width: { xs: "80%", sm: "70%", md: "50%", lg: "45%" },
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderRadius: "8px",
            p: { xs: "1rem", md: "1.5rem" },
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            boxSizing: "border-box",
            mt: 2,
          }}
        >
          <Typography textAlign={"center"} variant="h3" color="primary.main">
            {t("What did you find ?")}
          </Typography>

          <Typography>
            {t("Lost an item ?")}{" "}
            <Link
              component={RouterLink}
              to="/lostform"
              rel="noopener noreferrer"
              underline="always"
              sx={{ fontWeight: "bold" }}
            >
              {t("Lost items form")}
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
            value={foundUserInfo.name}
            onChange={handleNameChange}
          />

          <InputLabel htmlFor="email-input" sx={{ mt: 2, width: "65%" }}>
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

          <InputLabel htmlFor="description-input" sx={{ mt: 2, width: "65%" }}>
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
              "Mention details such as type, color, brand, size, place, any unique features, etc.",
            )}
            value={foundUserInfo.description}
            onChange={handleDescriptionChange}
          />

          <InputLabel htmlFor="date-input" sx={{ mt: 2, width: "65%" }}>
            {t("When did you find the item?")}
            <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={foundUserInfo.foundDate}
              onChange={handleFoundDateChange}
              slotProps={{
                textField: {
                  required: true,
                  fullWidth: true,
                  size: "small",
                  id: "date-input",
                  placeholder: t("Select the date"),
                },
              }}
              maxDate={dayjs()}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>

          <InputLabel htmlFor="location-input" sx={{ mt: 2, width: "65%" }}>
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

          <InputLabel
            htmlFor="recipientDescription-input"
            sx={{ mt: 2, width: "65%" }}
          >
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
              "Please enter a description of the place and information about the recipient if possible.",
            )}
            value={foundUserInfo.recipientDescription}
            onChange={handleRecipientDescriptionChange}
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
              "I acknowledge that I committed to all instructions for reporting a found item.",
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
                {/* Updated to use React Router Link for internal navigation to new T&C page */}
                <Link
                  href="/terms-and-conditions"
                  underline="hover"
                  component={require("react-router-dom").Link}
                  to="/terms-and-conditions"
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
    </div>
  );
};
export default FoundForm;
