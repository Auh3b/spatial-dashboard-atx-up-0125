import { CopyAllRounded, TableChart } from "@mui/icons-material";
import { Grid2, IconButton, Tooltip, Typography } from "@mui/material";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredParams } from "../../../store";
import { setFeedback } from "../../../store/appStore";
import {
  getDrawingProps,
  getFilteredData,
  getIsDrawing,
} from "../../../store/mapStore";
import { tabulationHandlers } from "../../../utils/dataTable";
import DataTableModal from "../Modals/DataTableModal";

export default function SelectedFeatureUI() {
  const dispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const filteredData = useSelector((state) => getFilteredData(state));
  const filteredParams = useSelector((state) => getFilteredParams(state));

  const dataTableProps = useMemo(() => {
    if (!filteredData || !filteredParams) return null;
    if (filteredData?.requestor !== filteredParams?.id) return null;
    const { count, data } = filteredData;
    const { title, type, schema } = filteredParams.source;
    const columns = schema.map((d) => ({
      field: d,
      fieldName: d,
      width: 100,
    }));
    const rows = tabulationHandlers[type](data);
    const tableProps = {
      density: "compact",
      initialState: {
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      },
    };
    return {
      count,
      title,
      columns,
      rows,
      columns,
      tableProps,
    };
  }, [filteredData, filteredParams]);

  const handleOpen = () => {
    setModelOpen(true);
  };
  const handleClose = () => {
    setModelOpen(false);
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(filteredData.data));
    dispatch(setFeedback({ message: "Saved to clipboard", status: "info" }));
  }, [filteredData]);

  return (
    <Grid2 container alignItems={"center"} gap={1} wrap="nowrap">
      {Boolean(dataTableProps) ? (
        <Fragment>
          <Typography variant="caption" noWrap>
            {dataTableProps.count} selected features
          </Typography>
          <Tooltip title="See properties">
            <IconButton disableRipple onClick={handleOpen} size="small">
              <TableChart fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy features">
            <IconButton
              disableFocusRipple
              size="small"
              onClick={handleCopy}
              disabled={!filteredData}>
              <CopyAllRounded />
            </IconButton>
          </Tooltip>
        </Fragment>
      ) : (
        <NoSelectedLayerFeedback />
      )}
      <DataTableModal
        {...dataTableProps}
        open={modelOpen}
        onClose={handleClose}
      />
    </Grid2>
  );
}

function NoSelectedLayerFeedback() {
  const drawingProps = useSelector((state) => getDrawingProps(state));
  const isDrawing = useSelector((state) => getIsDrawing(state));
  return (
    <Fragment>
      {drawingProps && !isDrawing ? (
        <Typography variant="caption">No layer selected</Typography>
      ) : null}
    </Fragment>
  );
}
