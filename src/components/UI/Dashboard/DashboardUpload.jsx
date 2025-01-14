import { UploadFile } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid2,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function DashboardUpload() {
  const [apiUrl, setApiUrl] = useState("");
  const [file, setFile] = useState();
  const [openHeatMapModal, setOpenHeatMapModal] = useState(false);
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  // Open/Close Heatmap Modal
  const handleOpenHeatMapModal = () => setOpenHeatMapModal(true);
  const handleCloseHeatMapModal = () => setOpenHeatMapModal(false);

  // Handle heatmap data fetch
  const handleFetchHeatMap = () => {
    if (apiUrl) {
      onFetchHeatMapData(apiUrl);
      handleCloseHeatMapModal();
    }
  };
  return (
    <Grid2 sx={{ p: 1 }}>
      {/* File Upload */}
      <Box>
        <Typography variant={"subtitle2"} gutterBottom>
          Upload File
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          startIcon={<UploadFile />}
          component="label">
          Upload
          <input
            type="file"
            accept=".json,.geojson"
            hidden
            onChange={handleFileUpload}
          />
        </Button>
      </Box>

      {/* Open Heatmap Modal */}
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="warning"
          fullWidth
          onClick={handleOpenHeatMapModal}>
          Add Heatmap
        </Button>
      </Box>

      {/* Heatmap Modal */}
      <Modal open={openHeatMapModal} onClose={handleCloseHeatMapModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}>
          <Typography id="heatmap-modal-title" variant="h6" gutterBottom>
            Enter API URL for Heatmap
          </Typography>
          <TextField
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="Enter API URL"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleFetchHeatMap}>
            Load Heatmap
          </Button>
        </Box>
      </Modal>
    </Grid2>
  );
}
