import { Box, Typography, Button, Modal } from "@mui/material";
import React, { Fragment, useState } from "react";
import DataTable from "../../DataTable";

export default function DashboardTable() {
  const [openTable, setOpenTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  // Open/Close DataTable Modal
  const handleOpenTable = () => setOpenTable(true);
  const handleCloseTable = () => setOpenTable(false);
  return (
    <Fragment>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="info"
          fullWidth
          onClick={handleOpenTable}>
          Open Tables
        </Button>
      </Box>

      {/* Data Table Modal */}
      <Modal open={openTable} onClose={handleCloseTable}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: "auto",
          }}>
          <Typography id="datatable-modal-title" variant="h6" gutterBottom>
            Data Table
          </Typography>
          <DataTable data={tableData} />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseTable}
            sx={{ marginTop: 2, float: "right" }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
}
