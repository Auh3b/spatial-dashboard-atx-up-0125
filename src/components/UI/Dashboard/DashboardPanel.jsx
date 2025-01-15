import { Box, Grid2, Tab, Typography, Tabs, Divider } from "@mui/material";
import React, { useMemo, useState } from "react";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import DashboardTable from "./DashboardTable";
import DashboardUpload from "./DashboardUpload";
import DashboardLayersUI from "./DashboardLayersUI";
import DashboardSetting from "./DashboardSetting";
import DashboardHome from "./DashboardHome";

const contentData = {
  0: {
    title: "Dashboard",
  },
  1: {
    title: "layers",
  },
  2: {
    title: "table",
  },
  3: {
    title: "File upload",
  },
  4: {
    title: "Settings",
  },
};

export default function DashboardPanel() {
  const [selectedPanel, setSelectedPanel] = useState(0);
  const handlePanelSelect = (_e, value) => {
    setSelectedPanel(value);
  };
  const { title } = useMemo(() => contentData[selectedPanel], [selectedPanel]);
  return (
    <Box height={"100%"}>
      <Grid2 container sx={{ height: "100%" }}>
        <PanelTabs value={selectedPanel} onChange={handlePanelSelect} />
        <Divider orientation="vertical" flexItem />
        <PanelContent title={title}>
          <DashboardHome selected={selectedPanel} index={0} />
          <DashboardLayersUI selected={selectedPanel} index={1} />
          <DashboardTable selected={selectedPanel} index={2} />
          <DashboardUpload selected={selectedPanel} index={3} />
          <DashboardSetting selected={selectedPanel} index={4} />
        </PanelContent>
      </Grid2>
    </Box>
  );
}

function PanelContent({ title, children }) {
  return (
    <Box sx={{ minWidth: "250px" }}>
      <Grid2 container direction={"column"}>
        <Typography variant="overline" sx={{ p: 1 }}>
          {title}
        </Typography>
        <Divider flexItem />
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Grid2>
    </Box>
  );
}

function PanelTabs(props) {
  return (
    <Tabs {...props} orientation="vertical">
      <CustomTab icon={<OtherHousesOutlinedIcon />} value={0} />
      <CustomTab icon={<LayersOutlinedIcon />} value={1} />
      <CustomTab icon={<TableChartOutlinedIcon />} value={2} />
      <CustomTab icon={<UploadFileOutlinedIcon />} value={3} />
      <CustomTab icon={<SettingsApplicationsOutlinedIcon />} value={4} />
    </Tabs>
  );
}

function CustomTab(props) {
  return (
    <Tab
      {...props}
      sx={{
        minWidth: "unset",
      }}
    />
  );
}
