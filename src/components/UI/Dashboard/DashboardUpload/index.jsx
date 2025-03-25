import { Box, Button, Grid2 } from "@mui/material";
import React, { Fragment, useState } from "react";
import AddLayerModal from "../DashboardLayersUI/components/AddLayerModal";

export default function DashboardUpload({ selected, index }) {
  return (
    <Fragment>
      {selected === index && (
        <Grid2>
          <AddLayerButton />
        </Grid2>
      )}
    </Fragment>
  );
}

function AddLayerButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ p: 1 }}>
      <Button variant='outlined' onClick={handleOpen} fullWidth>
        Add Data
      </Button>
      <AddLayerModal
        open={open}
        type='source'
        defaultValue={"url"}
        onClose={handleClose}
        disabledSections={["existing"]}
      />
    </Box>
  );
}
