import React, { useState, useEffect } from "react";
import axios from "axios";
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
import API_URL from "../config/api";

const DatabaseViewer = () => {
  const [currentTable, setCurrentTable] = useState("payments");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]);

  const tables = ["payments", "lostreports", "foundreports", "matched_items"];

  useEffect(() => {
    fetchTableData(currentTable);
  }, [currentTable]);

  const fetchTableData = async (tableName) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/table/${tableName}`);
      const data = res.data;
      setRows(data.map((row, index) => ({ id: row.id || index, ...row }))); // Ensure ID

      if (data.length > 0) {
        const cols = Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key.toUpperCase(),
          flex: 1,
          minWidth: 150,
        }));
        setColumns(cols);
      }
    } catch (err) {
      console.error("Failed to fetch table data:", err);
      // alert("Failed to load table data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ p: 4, height: "90vh", display: "flex", flexDirection: "column" }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Database Viewer</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Table</InputLabel>
          <Select
            value={currentTable}
            label="Select Table"
            onChange={(e) => setCurrentTable(e.target.value)}
          >
            {tables.map((table) => (
              <MenuItem key={table} value={table}>
                {table}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id} // Ensure uniqueness
        sx={{ flex: 1, bgcolor: "background.paper" }}
      />
    </Box>
  );
};

export default DatabaseViewer;
