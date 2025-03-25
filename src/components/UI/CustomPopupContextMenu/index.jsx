import { Close } from "@mui/icons-material";
import { Box, IconButton, Paper } from "@mui/material";
import { Fragment, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopup, setPopup } from "../../../store/mapStore";
import DrawingMenu from "./DrawingMenu";
import ExploreMenu from "./ExploreMenu";

const popupMenus = {
  ["drawing"]: DrawingMenu,
  ["explore"]: ExploreMenu,
};

export default function CustomPopupContextMenu() {
  const dispatch = useDispatch();
  const popup = useSelector((state) => getPopup(state));

  const menuContent = useMemo(() => {
    if (!popup.show) return null;
    const Menu = popupMenus[popup.type];
    return <Menu />;
  }, [popup]);

  const handleClose = () => {
    dispatch(setPopup({ show: false, disableClickAway: false }));
  };

  return (
    <Fragment>
      {popup.show && (
        <Box
          sx={{
            position: "absolute",
            transform: `translate(${popup.x}px, ${popup.y}px)`,
          }}
        >
          <Paper sx={{ display: "flex", flexDirection: "column" }}>
            {popup?.disableClickAway && (
              <IconButton
                onClick={handleClose}
                disableRipple
                sx={{ alignSelf: "end", p: 0.5 }}
              >
                <Close sx={{ fontSize: 12 }} />
              </IconButton>
            )}
            {menuContent}
          </Paper>
        </Box>
      )}
    </Fragment>
  );
}
