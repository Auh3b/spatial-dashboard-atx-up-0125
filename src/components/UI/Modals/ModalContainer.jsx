import {
  Box,
  Divider,
  Grid2,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function ModalContainer({ open, title, onClose, children }) {
  return (
    <Modal open={open}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Paper sx={{ width: "50%", p: 4 }}>
          <ModelTitle title={title} onClose={onClose} />
          <Divider sx={{ mb: 4 }} />
          {children}
        </Paper>
      </Box>
    </Modal>
  );
}

function ModelTitle({ title, onClose }) {
  const handleClose = () => {
    onClose();
  };
  return (
    <Grid2 container alignItems={"center"} justifyContent={"space-between"}>
      <Typography>{title}</Typography>
      <IconButton onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Grid2>
  );
}
