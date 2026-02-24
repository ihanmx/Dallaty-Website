//react hooks
import { useState, useEffect } from "react";

//MUI
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
//router-dom
import { Link } from "react-router-dom";
//config
import config from "../config";
import usePagination from "../hooks/usePagination";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const DatabaseViewer = () => {
  const [currentTable, setCurrentTable] = useState("payments");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]);

  // Note: MUI DataGrid uses 0-based pages, your backend uses 1-based — handle below
  const { paginationModel, setPaginationModel, rowCount, setRowCount } =
    usePagination(); //default page 0 and size 10

  //selected rows from the data grid (This is stores ONLY the IDs of rows the user selected by checking the boxes.)
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [openDialog, setOpenDialog] = useState(false);

  const logout = useLogout();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const tables = ["payments", "lostreports", "foundreports", "matched_items"];

  useEffect(() => {
    fetchTableData(currentTable);
  }, [currentTable, paginationModel]);

  const fetchTableData = async (tableName) => {
    setLoading(true);

    setSelectedRows([]); //  reset selection when fetching
    try {
      const { page, pageSize } = paginationModel;
      const res = await axiosPrivate.get(`/admin/table/${tableName}`, {
        params: {
          page: page + 1, // MUI is 0-based, backend is 1-based, so add 1
          limit: pageSize,
        },
      });

      setRows(res.data.rows); // Only the page's rows
      setRowCount(res.data.total); // Total count for pagination controls
      if (res.data.rows.length > 0) {
        const cols = Object.keys(res.data.rows[0]).map((key) => {
          const col = {
            field: key,
            headerName: key.toUpperCase(),
            flex: 1,
            minWidth: 150,
          };

          // Render filepath columns as clickable image thumbnails
          if (key === "file") {
            col.minWidth = 120;
            col.flex = 0;
            col.headerName = "IMAGE";
            col.renderCell = (params) => {
              if (!params.value) return "No image";
              const imageUrl = `${config.apiUrl}${params.value}`;
              return (
                <Box
                  component="a"
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  View Image
                </Box>
              );
            };
          }

          return col;
        });
        setColumns(cols);
      }
    } catch (err) {
      console.error("Failed to fetch table data:", err);
      // alert("Failed to load table data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    //if no rows selected, alert and return

    if (selectedRows.length === 0) {
      alert("No rows selected for deletion.");
      return;
    }
    //if rows selected, open confirmation dialog
    setOpenDialog(true);
  };

  //When deletion is confirmed call API to delete rows
  const handleConfirmDelete = async () => {
    setLoading(true);
    const idFieldMap = {
      lostreports: "reportid",
      foundreports: "reportid",
      payments: "report_id",
    };

    const idField = idFieldMap[currentTable] || "id"; //get the correct ID field for the table
    //selected rows only contains the row IDs, we need to map them to actual database data
    const selectedRowsData = rows.filter((row) =>
      selectedRows.includes(row.id),
    );
    // Extract the correct ID field values
    const idsToDelete = selectedRowsData.map((row) => row[idField]);
    console.log("Delete IDs:", idsToDelete);

    try {
      await axiosPrivate.delete(`/admin/table/${currentTable}`, {
        //body
        data: { ids: idsToDelete },
      });
      //to refresh the table data after deletion
      setRows(rows.filter((row) => !selectedRows.includes(row.id)));
      //set loading false and close dialog
      setSelectedRows([]);
      setOpenDialog(false);
      alert(`${selectedRows.length} row(s) deleted successfully`);
    } catch (err) {
      console.error("Failed to delete rows:", err);
      alert("Failed to delete selected rows.");
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          position: "sticky",
          top: "80px",
          zIndex: 100,
          backgroundColor: "#fafafa",
          width: "100%",
          borderBottom: "1px solid #ddd",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          p: 2,
        }}
      >
        <Typography variant="h4">Database Viewer</Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="outlined"
            component={Link}
            to="/admin-match-dashboard"
          >
            Admin Match Dashboard
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
            disabled={selectedRows.length === 0}
          >
            {`Delete (${selectedRows?.length || 0})`}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            // sx={{ width: "40%", mt: 2, fontWeight: 600, fontSize: 18 }}
            onClick={async () => {
              await logout();
              navigate("/admin-login", { replace: true });
            }}
          >
            Logout
          </Button>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Select Table</InputLabel>
            <Select
              value={currentTable}
              label="Select Table"
              onChange={(e) => {
                setCurrentTable(e.target.value);
                setSelectedRows([]);
              }}
            >
              {tables.map((table) => (
                <MenuItem key={table} value={table}>
                  {table}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <Box
        sx={{
          p: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        {/* Add key prop to force remount on table change */}
        {/* 
    type: 'include' → individual selection, use the IDs from the Set directly
type: 'exclude' → "select all", compute all row IDs minus the excluded ones */}
        <DataGrid
          key={currentTable} // This forces a complete remount
          rows={rows}
          rowCount={rowCount}
          columns={columns}
          loading={loading}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection) => {
            if (newSelection?.type === "include") {
              // Individual rows selected — use the IDs directly
              setSelectedRows(Array.from(newSelection.ids));
            } else if (newSelection?.type === "exclude") {
              // "Select all" — all rows except the excluded ones
              const excludedIds = newSelection.ids;
              setSelectedRows(
                rows.map((row) => row.id).filter((id) => !excludedIds.has(id)),
              );
            } else {
              // Fallback for plain array format
              setSelectedRows(newSelection || []);
            }
          }}
          getRowId={(row) => row.id}
          sx={{ flex: 1, bgcolor: "background.paper" }}
          slots={{
            noRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No data available
              </Stack>
            ),
          }}
        />

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete {selectedRows.length} selected
              row(s) from the <strong>{currentTable}</strong> table?
              <br />
              <br />
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DatabaseViewer;
