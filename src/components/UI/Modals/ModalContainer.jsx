import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Grid2,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

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
        <Paper sx={{ width: "50%", p: 3 }}>
          <ModelTitle title={title} onClose={onClose} />

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
    <Grid2
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ mb: 2 }}>
      <Typography>{title}</Typography>
      <IconButton disableRipple onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Grid2>
  );
}
