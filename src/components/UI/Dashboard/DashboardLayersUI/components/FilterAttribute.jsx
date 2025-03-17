import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { ascending } from "d3";
import { produce } from "immer";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateLayer } from "../../../../../store/mapStore";
import { getUniqueId } from "../../../../../utils/axillaryUtils";
import { FILTER_TYPES } from "../../../../../utils/filterFuncs";
import { METHOD_NAMES } from "../../../../../workers/geoWorker/methods/methodUtils";
import AttributeWrapper from "../../../../common/AttributeWrapper";
import ValueSelector from "../../../../common/ValueSelector";
import useGeoWorker from "../../../../hooks/useGeoWorker";
import useLayerConfig from "../../../../hooks/useLayerConfig";

const filterOptions = Object.values(FILTER_TYPES).map((d) => ({
  label: d,
  option: d,
}));

export default function FilterAttribute({ id }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [type, setType] = useState("");
  const [column, setColumn] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const { layer } = useLayerConfig(id);

  const { data } = useGeoWorker({
    name: METHOD_NAMES.GET_UNIQUE_COLUMN_VALUES,
    params: { ...layer, column },
  });

  const columnOptions = useMemo(() => {
    if (!layer?.source?.schema) return [];
    return layer.source.schema
      .map((d) => ({ label: d, option: d }))
      .sort((a, b) => ascending(a.label, b.label));
  }, [layer]);

  const valueOptions = useMemo(() => {
    if (!data) return [];
    return data.map((d) => ({ label: d, option: d }));
  }, [data]);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleColumnChange = (e) => {
    setColumn(e.target.value);
  };

  const handleSelectedValueChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleAddFilter = useCallback(() => {
    const value = produce(layer, (draft) => {
      draft.filters = [
        ...(draft?.filters || []),
        { id: getUniqueId(), type, column, value: selectedValue },
      ];
    });
    dispatch(updateLayer({ id, value }));
    handleClose();
    handleReset();
  }, [layer, type, column, selectedValue, id]);

  const handleReset = () => {
    setType("");
    setColumn("");
    setSelectedValue("");
  };

  const handleRemoveFilter = useCallback(
    (filterId) => {
      return () => {
        const value = produce(layer, (draft) => {
          draft.filters = draft.filters.filter(({ id }) => id !== filterId);
        });
        dispatch(updateLayer({ id, value }));
      };
    },
    [layer, id],
  );

  console.log(layer.filters);
  return (
    <AttributeWrapper
      title={"Filters"}
      action={
        <IconButton
          onClick={handleOpen}
          size="small"
          color={"default"}
          disableRipple
          sx={{ p: 0 }}>
          <Add sx={{ fontSize: 16 }} />
        </IconButton>
      }>
      {layer?.filters && layer?.filters.length ? (
        <ViewFilter filters={layer.filters} onRemove={handleRemoveFilter} />
      ) : null}
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom">
        {/* <ClickAwayListener onClickAway={handleClose}> */}
        <Paper sx={{ mt: 1, p: 2, width: 250 }}>
          <Grid2 container direction={"column"} wrap="nowrap" gap={2}>
            <ValueSelector
              label="column"
              value={column}
              options={columnOptions}
              onChange={handleColumnChange}
            />
            <ValueSelector
              label={"Type"}
              value={type}
              options={filterOptions}
              onChange={handleTypeChange}
            />
            <ValueSelector
              label={"Value"}
              value={selectedValue}
              options={valueOptions}
              onChange={handleSelectedValueChange}
            />
            <Grid2
              container
              alignItems={"center"}
              gap={2}
              justifyContent={"space-between"}>
              <Button
                onClick={handleAddFilter}
                startIcon={<Add />}
                size="small"
                disabled={!selectedValue || !column || !type}
                color="secondary"
                disableRipple>
                Add Filter
              </Button>
              <Button
                variant="outlined"
                onClick={handleClose}
                size="small"
                color={"inherit"}
                disableRipple>
                Close
              </Button>
            </Grid2>
          </Grid2>
        </Paper>
        {/* </ClickAwayListener> */}
      </Popper>
    </AttributeWrapper>
  );
}

function ViewFilter({ filters, onRemove }) {
  return (
    <Box>
      <table className="filter-table">
        <tr>
          <th className="header">
            <Typography variant="subtitle2">Column</Typography>
          </th>
          <th className="header">
            <Typography variant="subtitle2">Type</Typography>
          </th>
          <th className="header">
            <Typography variant="subtitle2">Value</Typography>
          </th>
        </tr>
        {filters.map(({ column, type, value, id }) => (
          <tr>
            <td className="row">
              <Typography variant="caption">{column}</Typography>
            </td>
            <td className="row">
              <Typography variant="caption">{type}</Typography>
            </td>
            <td className="row">
              <Typography variant="caption">{value}</Typography>
            </td>
            <td className="row action">
              <IconButton disableRipple onClick={onRemove(id)}>
                <Remove />
              </IconButton>
            </td>
          </tr>
        ))}
      </table>
    </Box>
  );
}
