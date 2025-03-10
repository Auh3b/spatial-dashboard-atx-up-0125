import { Divider, Grid2 } from "@mui/material";
import React, { Fragment } from "react";
import HeatMapUploadModal from "./HeatMapUploadModal";
import FileUploadUI from "./FileUploadUI";

export default function DashboardUpload({ selected, index }) {
  return (
    <Fragment>
      {selected === index && (
        <Grid2>
          <FileUploadUI />
          <Divider flexItem sx={{ my: 2 }} orientation={"horizontal"} />
          <HeatMapUploadModal />
        </Grid2>
      )}
    </Fragment>
  );
}
