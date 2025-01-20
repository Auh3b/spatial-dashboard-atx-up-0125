import React from "react";
import ModalContainer from "./ModalContainer";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTableModal({
  open,
  title,
  onClose,
  rows,
  columns,
  tableProps,
}) {
  return (
    <ModalContainer open={open} title={title} onClose={onClose}>
      <DataTable rows={rows} columns={columns} {...tableProps} />
    </ModalContainer>
  );
}

function DataTable(props) {
  return (
    <Box>
      <DataGrid {...props} />
    </Box>
  );
}
