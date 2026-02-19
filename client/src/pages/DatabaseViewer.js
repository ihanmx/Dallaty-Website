import React from "react";
import { Button } from "@mui/material";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const DatabaseViewer = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Database Viewer</h2>
      <Button
        variant="outlined"
        sx={{ width: "40%", mt: 2 }}
        onClick={() => (window.location.href = "/admin-db-viewer")}
      >
        View RAW Database (Tables)
      </Button>
      <Button
        variant="outlined"
        color="primary"
        sx={{ width: "40%", mt: 2, fontWeight: 600, fontSize: 18 }}
        onClick={async () => {
          await logout();
          navigate("/admin-login", { replace: true });
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default DatabaseViewer;