import { useState } from "react";
import { useLostUserInfo } from "../contexts/LostUserInfoContext";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import MenuItem from "@mui/material/MenuItem";
import design1 from "../images/design1.png";

import Link from "@mui/material/Link";
const LostForm = () => {
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
  //Access lostUserInfo and setLostUserInfo from context
  const { lostUserInfo, setLostUserInfo } = useLostUserInfo();

  //To store file preview temporaryly
  const [filePreview, setFilePreview] = useState(null);

  const [fileName, setFileName] = useState("");

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

      const response = await fetch("http://localhost:5000/form", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log("Server response:", responseData);
      alert("Form submitted successfully");

      //reset lostUserInfo and file preview for new submissions

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
    } catch (err) {
      console.error(err.message);
      alert("Error submitting form");
    }
  };

  return (
    <div>
      {/* form container */}
      <Stack
        sx={{
          width: "100vw",
          maxWidth: "100vw",
          bgcolor: "light.main",
          padding: "1rem",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${design1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // to cover the container
          backgroundPosition: "center",
          bgcolor: "rgba(255, 255, 255, 0.7)", // color as backgroung of img
          backgroundBlendMode: "lighten", // lighten the contrast of image
        }}
      >
        <form
          style={{
            width: "55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
            borderRadius: "8px",
            padding: "1rem",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          encType="multipart/form-data"
          onSubmit={handleFormSubmit}
        >
          <InputLabel htmlFor="name-input" sx={{ mt: 2, width: "65%" }}>
            Name <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            required
            name="name"
            id="name-input"
            type="text"
            placeholder="Enter your name"
            fullWidth
            size="small"
            value={lostUserInfo.name}
            onChange={handleNameChange}
          />

          <InputLabel htmlFor="email-input" sx={{ mt: 2, width: "65%" }}>
            Gmail <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            required
            name="email"
            id="email-input"
            type="email"
            placeholder="Enter your gmail"
            fullWidth
            size="small"
            value={lostUserInfo.email}
            onChange={handleEmailChange}
          />

          <InputLabel htmlFor="description-input" sx={{ mt: 2, width: "65%" }}>
            Description of the Lost Item <span style={{ color: "red" }}>*</span>
          </InputLabel>

          <TextField
            required
            name="description"
            id="description-input"
            multiline
            rows={4}
            placeholder="Mention details such as type, color, brand, size, place, any unique features, etc."
            value={lostUserInfo.description}
            onChange={handleDescriptionChange}
          />

          <InputLabel htmlFor="location-input" sx={{ mt: 2, width: "65%" }}>
            Approximate Location
            <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            required
            name="location"
            id="location-input"
            type="text"
            placeholder="Enter the approximate location"
            fullWidth
            size="small"
            value={lostUserInfo.location}
            onChange={handleLocationChange}
          />

          <InputLabel htmlFor="file-input" sx={{ mt: 2, width: "65%" }}>
            Item Photo <span style={{ color: "red" }}>*</span>
          </InputLabel>

          {/* label button to style file input */}
          <Button name="file" variant="outlined" component="label" required>
            {/* file upload should be req */}
            <FileUploadRoundedIcon />
            Upload photo
            <input
              id="file-input"
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>

          <InputLabel htmlFor="resource-input" sx={{ mt: 2, width: "65%" }}>
            How Did You Hear About Us? <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            required
            name="resource"
            id="resource-input"
            select
            label="Select"
            size="small"
            value={lostUserInfo.resource}
            onChange={handleResourceChange}
          >
            <MenuItem value="">
              <em>Select...</em> {/*  default empty value option */}
            </MenuItem>
            {whereYouHear.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {fileName && <p>Selected file: {fileName}</p>}

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
            label="I acknowledge that a service fee of 25 SAR applies if the item is found"
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
                I agree to the{" "}
                <Link
                  href="https://dhallaty.sa/TC-en"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  Terms and Conditions
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
            Submit
          </Button>
        </form>
      </Stack>
      {/* <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={lostUserInfo.name}
          onChange={handleNameChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={lostUserInfo.email}
          onChange={handleEmailChange}
        />
        <br />
        <input
          type="text"
          name="description"
          placeholder="Enter description"
          value={lostUserInfo.description}
          onChange={handleDescriptionChange}
        />
        <br />
        <input
          type="text"
          name="location"
          placeholder="Enter location"
          value={lostUserInfo.location}
          onChange={handleLocationChange}
        />
        <br />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <br />
        <input
          list="resources"
          name="resource"
          placeholder="Choose a resource"
          value={lostUserInfo.resource}
          onChange={handleResourceChange}
        />
        <br />
        <datalist id="resources">
          <option value="linked in" />
          <option value="friend" />
          <option value="family" />
        </datalist>
        <br />
        <input
          type="checkbox"
          name="terms"
          checked={lostUserInfo.terms}
          onChange={handleTermsChange}
        />{" "}
        I agree to the terms and conditions
        <br />
        <input
          type="checkbox"
          name="fees"
          checked={lostUserInfo.fees}
          onChange={handleFeesChange}
        />{" "}
        I agree to the fees
        <br />
        <input type="submit" value="Submit" />
      </form> */}
    </div>
  );
};
export default LostForm;
