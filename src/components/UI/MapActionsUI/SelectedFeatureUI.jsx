import { Grid2, IconButton, Typography } from "@mui/material";
import React, { Fragment } from "react";
import TableChartIcon from "@mui/icons-material/TableChart";
import { useSelector } from "react-redux";
import { getFilteredData } from "../../../store/mapStore";

export default function SelectedFeatureUI() {
  const count = useSelector((state) => getFilteredData(state))?.count || 0;
  const handleClick = () => {};
  return (
    <Fragment>
      {Boolean(count) && (
        <Grid2 container alignItems={"center"} gap={1}>
          <Typography variant="caption">{count} Selected Features</Typography>
          <IconButton onClick={handleClick}>
            <TableChartIcon fontSize="small" />
          </IconButton>
        </Grid2>
      )}
    </Fragment>
  );
}
