import { Grid2, IconButton, Typography } from "@mui/material";
import React, { Fragment, useState, useMemo } from "react";
import TableChartIcon from "@mui/icons-material/TableChart";
import { useSelector } from "react-redux";
import { getFilteredData } from "../../../store/mapStore";
import DataTableModal from "../Modals/DataTableModal";
import { getFilteredParams } from "../../../store";
import { tabulationHandlers } from "../../../utils/dataTable";

export default function SelectedFeatureUI() {
  const [modelOpen, setModelOpen] = useState(false);
  const filteredData = useSelector((state) => getFilteredData(state));
  const filteredParams = useSelector((state) => getFilteredParams(state));
  const dataTableProps = useMemo(() => {
    if (filteredData) {
      const { count, data } = filteredData;
      const { title, type, schema } = filteredParams;
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
    }
    return null;
  }, [filteredData]);
  const handleOpen = () => {
    setModelOpen(true);
  };
  const handleClose = () => {
    setModelOpen(false);
  };

  return (
    <Fragment>
      {Boolean(dataTableProps) && (
        <Fragment>
          <Grid2 container alignItems={"center"} gap={1} wrap="nowrap">
            <Typography variant="caption" noWrap>
              {dataTableProps.count} selected features
            </Typography>
            <IconButton onClick={handleOpen}>
              <TableChartIcon fontSize="small" />
            </IconButton>
          </Grid2>
          <DataTableModal
            {...dataTableProps}
            open={modelOpen}
            onClose={handleClose}
          />
        </Fragment>
      )}
    </Fragment>
  );
}
