import { Box, Paper } from "@mui/material";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { getPopup } from "../../../store/mapStore";
import DrawingMenu from "./DrawingMenu";
import ExploreMenu from "./ExploreMenu";

const popupMenus = {
  ["drawing"]: DrawingMenu,
  ["explore"]: ExploreMenu,
};

export default function CustomPopupContextMenu() {
  const popup = useSelector((state) => getPopup(state));

  const menuContent = useMemo(() => {
    if (!popup.show) return null;
    const Menu = popupMenus[popup.type];
    return <Menu />;
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
            {menuContent}
          </Paper>
        </Box>
      )}
    </Fragment>
  );
}
