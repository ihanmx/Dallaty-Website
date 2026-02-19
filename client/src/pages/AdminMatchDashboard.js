import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
//api config
import API_URL from "../config/api";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const AdminMatchDashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [lostReports, setLostReports] = useState([]);
  const [foundReports, setFoundReports] = useState([]);
  // Search state
  const [lostSearch, setLostSearch] = useState("");
  const [foundSearch, setFoundSearch] = useState("");

  //the names of the json keys should match the backend to avoid setData conflict
  const [loading, setLoading] = useState(true);

  const [selectedLostReportId, setSelectedLostReportId] = useState("");
  const [selectedFoundReportId, setSelectedFoundReportId] = useState("");

  // ✅ Load all dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    console.log(
      "Normalized dashboard state updated",
      lostReports,
      foundReports,
    );
  }, [lostReports, foundReports]);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      const res = await axiosPrivate.get("/admin/dashboard-data");
      setLostReports(res.data.lostReports);
      setFoundReports(res.data.foundReports);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      alert("Failed to load data from server.");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmitMatch = async () => {
    try {
      const payload = {
        matchedLostReportId: selectedLostReportId,
        matchedFoundReportId: selectedFoundReportId,
      };

      const res = await axiosPrivate.post(
        "/admin/confirm-match-lost",
        payload,
      );
      alert(res.data.message || "Payment email sent successfully.");
      fetchDashboardData();
    } catch (err) {
      const backendError = err.response?.data?.error;
      if (backendError === "lost_already_matched") {
        alert("Lost report is already matched or pending payment.");
      } else if (backendError === "found_already_matched") {
        alert("Found report is already matched!");
      } else {
        console.error("Error updating the found item state", err);
        alert("Failed to confirm matching");
      }
    }
  };
  const lostColumns = [
    { field: "id", headerName: "ID", flex: 0.8 },
    { field: "reportid", headerName: "Report Id", flex: 1.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "location", headerName: "Location", flex: 1 },
    // {
    //   field: "file",
    //   headerName: "Image",
    //   flex: 2,
    // },

    { field: "status", headerName: "Status", flex: 1 },
  ];

  const foundColumns = [
    { field: "id", headerName: "ID", flex: 0.8 },
    { field: "reportid", headerName: "Report Id", flex: 1.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "location", headerName: "Location", flex: 1 },
    // { field: "file", headerName: "Image", flex: 2 },
    { field: "recipientdescription", headerName: "recipient", flex: 2 },
    { field: "found_date", headerName: "date", flex: 1 },

    { field: "status", headerName: "Status", flex: 1 },
  ];

  // Filter rows based on search
  const filteredLostRows = lostReports.filter(
    (row) =>
      row.name.toLowerCase().includes(lostSearch.toLowerCase()) ||
      row.email.toLowerCase().includes(lostSearch.toLowerCase()) ||
      row.reportid.toLowerCase().includes(lostSearch.toLowerCase()),
  );
  const filteredFoundRows = foundReports.filter(
    (row) =>
      row.name.toLowerCase().includes(foundSearch.toLowerCase()) ||
      row.email.toLowerCase().includes(foundSearch.toLowerCase()) ||
      row.reportid.toLowerCase().includes(foundSearch.toLowerCase()),
  );

  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <Stack direction={"column"} alignItems={"center"}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          minHeight: "80vh",
          width: "100%",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "column",
          },
        }}
      >
        {/* Lost Table */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0, // IMPORTANT for flex scroll
            borderRight: "1px solid #ddd",
          }}
        >
          <Typography variant="h6">Lost Items</Typography>
          <TextField
            placeholder="Search lost items using (ReportId, Name, Email)"
            variant="outlined"
            size="small"
            value={lostSearch}
            onChange={(e) => setLostSearch(e.target.value)}
            sx={{ mb: 1 }}
          />
          <DataGrid
            loading={loading}
            rows={filteredLostRows}
            columns={lostColumns}
            getRowId={(row) => row.reportid}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableMultipleRowSelection
            sx={{ overflowX: "auto" }}
            getRowHeight={() => "auto"}
            onRowSelectionModelChange={(rowSelectionModel) => {
              setSelectedLostReportId(...rowSelectionModel.ids);
              console.log(...rowSelectionModel.ids); //...  because  rowSelectionModel.ids gives set as result and to convert set into array i need to use ...
            }}
          />
        </Box>

        {/* Found Table */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0, //flex+minwidth0 =enable scrollbars+and shrink
          }}
        >
          <Typography variant="h6">Found Items</Typography>
          <TextField
            placeholder="Search found items using (ReportId, Name, Email)"
            variant="outlined"
            size="small"
            value={foundSearch}
            onChange={(e) => setFoundSearch(e.target.value)}
            sx={{ mb: 1 }}
          />
          <DataGrid
            rows={filteredFoundRows}
            columns={foundColumns}
            getRowId={(row) => row.reportid}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableMultipleRowSelection
            loading={loading}
            sx={{ overflowX: "auto" }}
            getRowHeight={() => "auto"}
            onRowSelectionModelChange={(rowSelectionModel) => {
              setSelectedFoundReportId(...rowSelectionModel.ids);
              console.log(...rowSelectionModel.ids); //...  because  rowSelectionModel.ids gives set as result and to convert set into array i need to use ...
            }}
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        disabled={!selectedLostReportId || !selectedFoundReportId}
        sx={{ width: "40%", margin: "2" }}
        onClick={handleSubmitMatch}
      >
        Submit Match
      </Button>

      <Button
        variant="outlined"
        sx={{ width: "40%", mt: 2 }}
        onClick={() => navigate("/admin-db-viewer")}
      >
        View RAW Database (Tables)
      </Button>
      <Button
        variant="outlined"
        color="primary"
        sx={{ width: "40%", mt: 2 }}
        onClick={async () => {
          await logout();
          navigate("/admin-login", { replace: true });
        }}
      >
        Logout
      </Button>
    </Stack>
  );
};

export default AdminMatchDashboard;
