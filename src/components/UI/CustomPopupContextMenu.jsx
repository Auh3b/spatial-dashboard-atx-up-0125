import { Box, Button, Paper, Typography } from "@mui/material";
import React, { Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopup, removePopup } from "../../store/mapStore";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import geoWorker from "../../workers/geoWorker/index";
import {
  LOADER_TYPE,
  METHOD_NAMES,
} from "../../workers/geoWorker/methods/methodUtils";
import { setBatchData, setDataLoadingFeed } from "../../store/appStore";
import useMapNavigation from "../hooks/useMapNavigation";
import { FILTER_TYPES } from "../../utils/filterFuncs";

export default function CustomPopupContextMenu() {
  const { flyToFeature } = useMapNavigation();
  const dispatch = useDispatch();
  const popup = useSelector((state) => getPopup(state));
  const handleLevelOneZoom = useCallback(async () => {
    dispatch(removePopup());
    if (popup.show) {
      const { level, next_level, p_code, feature } = popup;
      dispatch(
        setDataLoadingFeed({
          isLoading: true,
          message: "Loading Admin " + next_level,
        }),
      );
      const results = await geoWorker({
        name: METHOD_NAMES.FETCH_DATA,
        params: {
          queue: [
            {
              name: `admin_${next_level}`,
              title: `Admin_${next_level}`,
              url: `http://localhost:5001/proxy/geojson?country=${
                p_code.split(".")[0]
              }&detail=${next_level}`,
              type: LOADER_TYPE.GEOJSON,
              filter: {
                type: FILTER_TYPES.IN,
                column: `GID_${level}`,
                value: p_code,
              },
            },
          ],
        },
      });
      dispatch(setDataLoadingFeed({ isLoading: false, message: "" }));
      dispatch(setBatchData(results));
      flyToFeature(feature);
    }
  }, [popup]);

  return (
    <Fragment>
      {popup.show && (
        <Box
          sx={{
            position: "absolute",
            transform: `translate(${popup.x}px, ${popup.y}px)`,
          }}>
          <Paper sx={{ py: 1, display: "flex", flexDirection: "column" }}>
            <Typography sx={{ px: 1 }} variant="overline">
              {popup.content}
            </Typography>
            {popup.next_level && (
              <Button
                onClick={handleLevelOneZoom}
                sx={{ px: 1, borderRadius: 0, textTransform: "capitalize" }}
                size="small"
                startIcon={<ZoomInMapIcon />}>
                Zoom To Admin {popup.next_level}
              </Button>
            )}
          </Paper>
        </Box>
      )}
    </Fragment>
  );
}
