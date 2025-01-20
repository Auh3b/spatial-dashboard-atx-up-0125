import {
  Box,
  Typography,
  Modal,
  Grid2,
  IconButton,
  CircularProgress,
  Paper,
  Link,
  Divider,
} from "@mui/material";
import React, { Fragment, useMemo, useState } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { getAllData } from "../../../store/appStore";
import { isEmpty } from "lodash";
import useGeoWorker from "../../hooks/useGeoWorker";
import { METHOD_NAMES } from "../../../workers/geoWorker/methods/methodUtils";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "d3";
import { tabulationHandlers } from "../../../utils/dataTable";

export default function DashboardTable({ selected, index }) {
  const [selectedSource, setSelectedSource] = useState(null);
  const _datasets = useSelector((state) => getAllData(state));
  const data = useMemo(() => {
    if (isEmpty(_datasets)) return false;
    return Object.values(_datasets);
  }, [_datasets]);

  const handleOpen = (e) => {
    setSelectedSource(e);
  };
  const handleClose = () => {
    setSelectedSource(null);
  };

  return (
    <Fragment>
      {selected === index && (
        <Box sx={{ p: 1 }}>
          {data &&
            data.map(({ name, ...rest }) => (
              <DataItem
                key={name}
                source={name}
                {...rest}
                onOpen={handleOpen}
              />
            ))}
          {selectedSource && data && (
            <DataViewModel
              source={selectedSource}
              dataset={_datasets}
              onClose={handleClose}
            />
          )}
        </Box>
      )}
    </Fragment>
  );
}

function DataViewModel({ source, dataset, onClose }) {
  const d = useMemo(() => dataset[source], [source, dataset]);
  const open = Boolean(source);
  return (
    <Modal open={open}>
      <Grid2
        container
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "100%" }}>
        <Paper sx={{ p: 4, width: "650px" }}>
          <Grid2 container justifyContent={"space-between"}>
            <Typography variant="subtitle1">{d.title}</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid2>
          <Divider sx={{ mb: 2 }} />
          <DataView source={source} type={d.type} schema={d.schema} />
        </Paper>
      </Grid2>
    </Modal>
  );
}

function DataView({ source, type, schema }) {
  const { isLoading, data } = useGeoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: { name: source },
  });
  const handler = tabulationHandlers[type];
  const columns = schema.map((d) => ({ field: d, fieldName: d, width: 100 }));
  return (
    <Box>
      {!isLoading && data ? (
        <DataGrid
          density={"compact"}
          rows={handler(data)}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
        />
      ) : (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

function DataItem({ title, source, loaded, volume, onOpen }) {
  const handleOpen = () => {
    onOpen(source);
  };
  return (
    <Box sx={{ mb: 2 }}>
      <Grid2 container justifyContent={"space-between"}>
        <Grid2 container direction={"column"} alignItems={"start"}>
          <Typography
            sx={{ fontSize: "0.65rem", lineHeight: "1.25rem" }}
            variant="overline">
            {title}
          </Typography>
          <Typography variant={"caption"}>
            {format(",")(volume)} Items
          </Typography>
        </Grid2>
        <Link disabled={!loaded} onClick={handleOpen} color="inherit">
          <ArrowOutwardIcon fontSize="small" />
        </Link>
      </Grid2>
    </Box>
  );
}
