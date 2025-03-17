import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import { Button, Typography } from "@mui/material";
import React, { Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { admin1Config, admin2Config } from "../../../data/layerConfig";
import { setBatchData, setDataLoadingFeed } from "../../../store/appStore";
import { addLayer, getPopup, removePopup } from "../../../store/mapStore";
import { FILTER_TYPES } from "../../../utils/filterFuncs";
import geoWorker from "../../../workers/geoWorker/index";
import {
  LOADER_TYPE,
  METHOD_NAMES,
} from "../../../workers/geoWorker/methods/methodUtils";
import useMapNavigation from "../../hooks/useMapNavigation";

const adminLevelConfigs = {
  1: admin1Config,
  2: admin2Config,
};

export default function ExploreMenu({}) {
  const { flyToFeature } = useMapNavigation();
  const dispatch = useDispatch();
  const popup = useSelector((state) => getPopup(state));

  const handleLevelOneZoom = useCallback(async () => {
    try {
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
        const config = adminLevelConfigs[next_level];
        const value = { ...config, source: results[0] };
        dispatch(
          addLayer({
            id: config.id,
            value,
          }),
        );
        flyToFeature(feature);
      }
    } catch (error) {}
    dispatch(removePopup());
  }, [popup]);

  return (
    <Fragment>
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
    </Fragment>
  );
}
