import { Grid2, Paper, Snackbar, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { getDataLoadingFeed } from "../../store/appStore";
import LoadingUI from "../common/LoadingUI";

export default function DataLoadingFeed() {
  const { message = "Data is Loading", isLoading = false } = useSelector(
    (state) => getDataLoadingFeed(state),
  );

  return (
    <Fragment>
      {isLoading && (
        <Paper sx={{ position: "fixed", p: 1, bottom: 16, left: 16 }}>
          <Grid2
            wrap="nowrap"
            width={"100%"}
            container
            gap={2}
            alignItems={"center"}>
            <LoadingUI />
            <Typography
              sx={{ flexGrow: 1 }}
              noWrap
              variant="caption"
              width={"100%"}>
              Loading Data
            </Typography>
          </Grid2>
        </Paper>
      )}
    </Fragment>
  );
}
