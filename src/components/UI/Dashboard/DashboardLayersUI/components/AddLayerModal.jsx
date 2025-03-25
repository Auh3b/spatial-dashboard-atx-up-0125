import { Add, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  Modal,
  Paper,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allowedShapes,
  getInitialLayerConfig,
} from "../../../../../data/layerConfig";
import { setBatchData } from "../../../../../store/appStore";
import { addLayer } from "../../../../../store/mapStore";
import { allowedFiles, getFileExt } from "../../../../../utils/fileUploadFuncs";
import { getNameFromString } from "../../../../../utils/legendUtils";
import geoWorker from "../../../../../workers/geoWorker";
import { METHOD_NAMES } from "../../../../../workers/geoWorker/methods/methodUtils";
import ValueSelector from "../../../../common/ValueSelector";
import useFileUpload from "../../../../hooks/useFileUpload";

export default function AddLayerModal({
  open,
  onClose,
  type = "layer",
  defaultValue,
  disabledSections = [],
  actionCallback = () => null,
}) {
  const [selectedTab, setSelectedTab] = useState(defaultValue);
  const handleChange = (_e, value) => {
    setSelectedTab(value);
  };
  return (
    <Modal open={open}>
      <Grid2
        container
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "100%", width: "100%" }}
      >
        <Paper sx={{ width: "50%", p: 2 }}>
          <IconButton
            size='small'
            disableRipple
            onClick={onClose}
            sx={{ display: "block", ml: "auto" }}
          >
            <Close />
          </IconButton>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            sx={{ width: "100%" }}
          >
            {!disabledSections.includes("existing") && (
              <Tab label={"Existing Source"} value='existing' />
            )}
            {!disabledSections.includes("url") && (
              <Tab label={"URL"} value='url' />
            )}
            {!disabledSections.includes("local") && (
              <Tab label={"Upload File"} value='local' />
            )}
          </Tabs>
          <Divider orientation='horizontal' />
          <FromSourceTab
            tab={selectedTab}
            actionType={type}
            onClose={onClose}
          />
          <NewLocalSource
            tab={selectedTab}
            actionType={type}
            onClose={onClose}
          />
          <NewURLSource tab={selectedTab} actionType={type} onClose={onClose} />
        </Paper>
      </Grid2>
    </Modal>
  );
}

function FromSourceTab({ tab, onClose }) {
  const dispatch = useDispatch();
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedLayerType, setSelectedLayerType] = useState("");
  const sources = useSelector((state) => state.app.data);
  const sourceOptions = useMemo(() => {
    if (sources)
      return Object.values(sources).map(({ name }) => ({
        label: name,
        option: name,
      }));
    return [];
  }, [sources]);

  const handleChange = (type) => {
    const setter = type === "layer" ? setSelectedLayerType : setSelectedSource;
    return (e) => {
      const value = e.target.value;
      setter(value);
    };
  };

  const handleAdd = useCallback(() => {
    const id = `${crypto.randomUUID().toString()}`;
    dispatch(
      addLayer({
        id,
        value: getInitialLayerConfig(
          id,
          sources[selectedSource],
          selectedLayerType
        ),
      })
    );
    onClose();
  }, [sources, selectedSource, selectedLayerType]);

  const selected = tab === "existing";

  return (
    <>
      {selected && (
        <Box sx={{ p: 1 }}>
          <Typography variant={"subtitle1"}>
            Add a layer from existing source
          </Typography>
          <Grid2
            container
            alignItems={"flex-start"}
            wrap='nowrap'
            gap={2}
            sx={{ my: 2 }}
          >
            <Grid2 size={4}>
              <Typography variant='overline'>Source</Typography>
            </Grid2>
            <ValueSelector
              options={sourceOptions}
              value={selectedSource}
              onChange={handleChange("source")}
            />
          </Grid2>
          <Grid2
            container
            alignItems={"flex-start"}
            wrap='nowrap'
            gap={2}
            sx={{ my: 2 }}
          >
            <Grid2 size={4}>
              <Typography variant='overline'>Layer</Typography>
            </Grid2>

            <ValueSelector
              options={allowedShapes.map(({ label, value: option }) => ({
                label,
                option,
              }))}
              value={selectedLayerType}
              onChange={handleChange("layer")}
            />
          </Grid2>
          <Button
            sx={{}}
            onClick={handleAdd}
            variant='contained'
            startIcon={<Add />}
            disabled={!selectedLayerType || !selectedSource}
          >
            Add Layer
          </Button>
        </Box>
      )}
    </>
  );
}

function NewLocalSource({ tab, onClose, actionType }) {
  const dispatch = useDispatch();
  const [selectedLayerType, setSelectedLayerType] = useState("");
  const { file, handleFileUpload } = useFileUpload();

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedLayerType(value);
  };

  const selected = tab === "local";

  const handleAdd = useCallback(async () => {
    try {
      const name = METHOD_NAMES.SET_DATA;
      const params = file;
      const source = await geoWorker({ name, params });
      dispatch(setBatchData([source]));
      if (actionType === "source") return onClose();

      const id = crypto.randomUUID().toString();
      const value = getInitialLayerConfig(id, source, selectedLayerType);
      dispatch(
        addLayer({
          id,
          value,
        })
      );

      onClose();
    } catch (error) {}
  }, [file, selectedLayerType, actionType]);
  const disabled =
    actionType === "source" ? !file : !selectedLayerType || !file;
  return (
    <>
      {selected && (
        <Box sx={{ p: 1 }}>
          <Typography variant={"subtitle1"}>
            Add a layer from new source.{" "}
            <span style={{ fontStyle: "italic" }}>
              Allowed files include {allowedFiles.join(", ")}
            </span>
          </Typography>

          <Grid2
            container
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            wrap='nowrap'
            gap={2}
            sx={{ my: 2 }}
          >
            <Grid2 size={4}>
              <Typography variant='overline'>Upload Source</Typography>
            </Grid2>
            <Tooltip>
              <Typography noWrap={true} sx={{ flexGrow: 1 }}>
                {file?.name || ""}
              </Typography>
            </Tooltip>
            <Grid2 size={3}>
              <Button
                size='small'
                fullWidth
                variant='outlined'
                component='label'
              >
                Select File
                <input
                  type='file'
                  accept='.json,.geojson,.csv'
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid2>
          </Grid2>
          {actionType === "source" ? null : (
            <Grid2
              container
              alignItems={"flex-start"}
              wrap='nowrap'
              gap={2}
              sx={{ my: 2 }}
            >
              <Grid2 size={4}>
                <Typography variant='overline'>Layer</Typography>
              </Grid2>

              <ValueSelector
                options={allowedShapes.map(({ label, value }) => ({
                  label,
                  option: value,
                }))}
                value={selectedLayerType}
                onChange={handleChange}
              />
            </Grid2>
          )}
          <Button
            sx={{}}
            onClick={handleAdd}
            variant='contained'
            startIcon={<Add />}
            disabled={disabled}
          >
            Add {actionType}
          </Button>
        </Box>
      )}
    </>
  );
}

function NewURLSource({ tab, onClose, actionType }) {
  const dispatch = useDispatch();
  const [selectedLayerType, setSelectedLayerType] = useState("");
  const [url, setUrl] = useState("");

  const handleChange = (type) => {
    const setter = type === "layer" ? setSelectedLayerType : setUrl;
    return (e) => {
      const value = e.target.value;
      setter(value);
    };
  };

  const selected = tab === "url";

  const handleAdd = useCallback(async () => {
    try {
      const name = getNameFromString(url);
      const title = name;
      const method = METHOD_NAMES.FETCH_DATA;
      const type = getFileExt(url);
      const queue = [
        {
          name,
          title,
          url,
          type,
        },
      ];
      const result = await geoWorker({
        name: method,
        params: {
          queue,
        },
      });

      if (!result) throw "Something went happened.";
      dispatch(setBatchData(result));

      if (actionType === "source") return onClose();
      const id = crypto.randomUUID().toString();
      const value = getInitialLayerConfig(id, result[0], selectedLayerType);
      dispatch(addLayer({ id, value }));

      onClose();
    } catch (error) {}
  }, [selectedLayerType, url, actionType]);

  const disabled = actionType === "source" ? !url : !selectedLayerType || !url;

  return (
    <>
      {selected && (
        <Box sx={{ p: 1 }}>
          <Typography variant={"subtitle1"}>
            Add a layer from new URL/HTTPS source
          </Typography>

          <Grid2
            container
            alignItems={"flex-start"}
            wrap='nowrap'
            gap={2}
            sx={{ my: 2 }}
          >
            <Grid2 size={4}>
              <Typography variant='overline'>Source Url</Typography>
            </Grid2>
            <TextField
              value={url}
              size='small'
              fullWidth
              onChange={handleChange("url")}
            />
          </Grid2>
          {actionType === "source" ? null : (
            <Grid2
              container
              alignItems={"flex-start"}
              wrap='nowrap'
              gap={2}
              sx={{ my: 2 }}
            >
              <Grid2 size={4}>
                <Typography variant='overline'>Layer</Typography>
              </Grid2>

              <ValueSelector
                options={allowedShapes.map(({ label, value }) => ({
                  label,
                  option: value,
                }))}
                value={selectedLayerType}
                onChange={handleChange("layer")}
              />
            </Grid2>
          )}
          <Button
            sx={{}}
            onClick={handleAdd}
            variant='contained'
            startIcon={<Add />}
            disabled={disabled}
          >
            Add {actionType}
          </Button>
        </Box>
      )}
    </>
  );
}
