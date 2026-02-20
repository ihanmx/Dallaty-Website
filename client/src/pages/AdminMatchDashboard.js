//React hooks
import { useState, useEffect } from "react";

//MUI components
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField, Typography } from "@mui/material";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { Stack } from "@mui/system";

import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

//React router

import { Link } from "react-router-dom";

//api config
import config from "../config";
import usePagination from "../hooks/usePagination";
import useDebounce from "../hooks/useDebounce";
const AdminMatchDashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [lostReports, setLostReports] = useState([]);
  const [foundReports, setFoundReports] = useState([]);
  // Search state
  const [lostSearch, setLostSearch] = useState("");
  const [foundSearch, setFoundSearch] = useState("");

  //the names of the json keys should match the backend to avoid setData conflict
  const [lostLoading, setLostLoading] = useState(true);
  const [foundLoading, setFoundLoading] = useState(true);

  const [selectedLostReportId, setSelectedLostReportId] = useState("");
  const [selectedFoundReportId, setSelectedFoundReportId] = useState("");

  //pagination instances
  const lostPagination = usePagination();
  const foundPagination = usePagination();

  // debounced — only updates 400ms after user stops typing
  const debouncedLostSearch = useDebounce(lostSearch, 400);
  const debouncedFoundSearch = useDebounce(foundSearch, 400);

  const logout = useLogout();
  const navigate = useNavigate();

  // re-fetch lost when its page OR search changes
  useEffect(() => {
    fetchLostReports();
  }, [lostPagination.paginationModel, debouncedLostSearch]); /// fire request only when debounced value changes, not raw value

  useEffect(() => {
    fetchFoundReports();
  }, [foundPagination.paginationModel, debouncedFoundSearch]);

  const fetchLostReports = async () => {
    setLostLoading(true);
    try {
      const { page, pageSize } = lostPagination.paginationModel; //extract model state
      const res = await axiosPrivate.get(`/admin/table/lostreports`, {
        params: {
          page: page + 1, //MUI counts from 0
          limit: pageSize,
          search: debouncedLostSearch || undefined, //this ommit params if search is empty
        },
      });

      setLostReports(res.data.rows);
      lostPagination.setRowCount(res.data.total);
    } catch (err) {
      console.error("Error fetching lost reports:", err);
    } finally {
      setLostLoading(false);
    }
  };

  const fetchFoundReports = async () => {
    setFoundLoading(true);
    try {
      const { page, pageSize } = foundPagination.paginationModel;
      const res = await axiosPrivate.get(`/admin/table/foundreports`, {
        params: {
          page: page + 1,
          limit: pageSize,
          search: debouncedFoundSearch || undefined,
        },
      });
      setFoundReports(res.data.rows);
      foundPagination.setRowCount(res.data.total);
    } catch (err) {
      console.error("Error fetching found reports:", err);
    } finally {
      setFoundLoading(false);
    }
  };

  // reset to page 0 when search changes so results start from the beginning
  const handleLostSearch = (e) => {
    setLostSearch(e.target.value);
    lostPagination.resetPagination();
  };

  const handleFoundSearch = (e) => {
    setFoundSearch(e.target.value);
    foundPagination.resetPagination();
  };

  const handleSubmitMatch = async () => {
    try {
      const payload = {
        matchedLostReportId: selectedLostReportId,
        matchedFoundReportId: selectedFoundReportId,
      };

      const res = await axiosPrivate.post("/admin/confirm-match-lost", payload);
      alert(res.data.message || "Payment email sent successfully.");
      fetchFoundReports();
      fetchLostReports();
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
    {
      field: "file",
      headerName: "Image",
      flex: 0,
      minWidth: 120,
      //controls how image are being displayed
      renderCell: (params) => {
        if (!params.value) return "No image";
        const imageUrl = `${config.apiUrl}${params.value}`;
        return (
          <Box
            component="a"
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            View Image
          </Box>
        );
      },
    },

    { field: "status", headerName: "Status", flex: 1 },
  ];

  const foundColumns = [
    { field: "id", headerName: "ID", flex: 0.8 },
    { field: "reportid", headerName: "Report Id", flex: 1.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "location", headerName: "Location", flex: 1 },
    {
      field: "file",
      headerName: "Image",
      flex: 0,
      minWidth: 120,
      renderCell: (params) => {
        if (!params.value) return "No image";
        const imageUrl = `${config.apiUrl}${params.value}`;
        return (
          <Box
            component="a"
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            View Image
          </Box>
        );
      },
    },
    { field: "recipientdescription", headerName: "recipient", flex: 2 },
    { field: "found_date", headerName: "date", flex: 1 },

    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <Stack direction={"column"} alignItems={"center"}>
      <Box
        sx={{
          position: "sticky",
          top: "64px",
          zIndex: 1100,
          backgroundColor: "#fafafa",
          width: "100%",
          borderBottom: "1px solid #ddd",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <Typography variant="h4">Admin Match Dashboard</Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              disabled={!selectedLostReportId || !selectedFoundReportId}
              onClick={handleSubmitMatch}
            >
              Submit Match
            </Button>
            <Button
              variant="outlined"
              color="primary"
              // sx={{ width: "40%", mt: 2 }}
              onClick={async () => {
                await logout();
                navigate("/admin-login", { replace: true });
              }}
            >
              Logout
            </Button>

            <Button variant="outlined" component={Link} to="/admin-db-viewer">
              View RAW Database (Tables)
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          mt: 2,
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
            onChange={handleLostSearch}
            sx={{ mb: 1 }}
          />
          <DataGrid
            loading={lostLoading}
            rows={lostReports}
            columns={lostColumns}
            paginationMode="server"
            rowCount={lostPagination.rowCount}
            paginationModel={lostPagination.paginationModel}
            onPaginationModelChange={lostPagination.setPaginationModel}
            getRowId={(row) => row.reportid}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            disableMultipleRowSelection
            sx={{ overflowX: "auto" }}
            getRowHeight={() => "auto"}
            onRowSelectionModelChange={(rowSelectionModel) => {
              setSelectedLostReportId(...rowSelectionModel.ids);
              // console.log(...rowSelectionModel.ids); //...  because  rowSelectionModel.ids gives set as result and to convert set into array i need to use ...
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
            onChange={handleFoundSearch}
            sx={{ mb: 1 }}
          />
          <DataGrid
            rows={foundReports}
            columns={foundColumns}
            loading={foundLoading}
            paginationMode="server"
            paginationModel={foundPagination.paginationModel}
            onPaginationModelChange={foundPagination.setPaginationModel}
            rowCount={foundPagination.rowCount}
            getRowId={(row) => row.reportid}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            disableMultipleRowSelection
            sx={{ overflowX: "auto" }}
            getRowHeight={() => "auto"}
            onRowSelectionModelChange={(rowSelectionModel) => {
              setSelectedFoundReportId(...rowSelectionModel.ids);
              // console.log(...rowSelectionModel.ids); //...  because  rowSelectionModel.ids gives set as result and to convert set into array i need to use ...
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default AdminMatchDashboard;
