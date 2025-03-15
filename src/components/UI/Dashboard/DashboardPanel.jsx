import FileUploadIcon from "@mui/icons-material/FileUpload";
import HomeIcon from "@mui/icons-material/Home";
import LayersIcon from "@mui/icons-material/Layers";
import SettingsIcon from "@mui/icons-material/Settings";
import TableChartIcon from "@mui/icons-material/TableChart";
import {
  Box,
  Divider,
  Grid2,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import DashboardHome from "./DashboardHome";
import DashboardSetting from "./DashboardSetting";
import DashboardTable from "./DashboardTable";
import DashboardUpload from "./DashboardUpload";
import DashboardLayersUI from "./DashboardLayersUI/index";

const contentData = {
  0: {
    title: "Dashboard",
  },
  1: {
    title: "layers",
  },
  2: {
    title: "tables",
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
      <Grid2 container sx={{ height: "100%" }} wrap='nowrap'>
        <PanelTabs value={selectedPanel} onChange={handlePanelSelect} />
        <Divider orientation='vertical' flexItem />
        <PanelContent title={title}>
          <DashboardHome selected={selectedPanel} index={0} />
          <DashboardLayersUI selected={selectedPanel} index={1} />
          <DashboardTable selected={selectedPanel} index={2} />
          <DashboardUpload selected={selectedPanel} index={3} />
          <DashboardSetting selected={selectedPanel} index={4} />
        </PanelContent>
        <Divider orientation='vertical' flexItem />
      </Grid2>
    </Box>
  );
}

function PanelContent({ title, children }) {
  return (
    <Box sx={{ width: "275px" }}>
      <Grid2 container direction={"column"}>
        <Typography variant='overline' sx={{ p: 1 }}>
          {title}
        </Typography>
        <Divider flexItem />
        <Box sx={{ maxHeight: "85vh", overflowY: "auto" }}>{children}</Box>
      </Grid2>
    </Box>
  );
}

function PanelTabs(props) {
  return (
    <Tabs {...props} orientation='vertical'>
      <CustomTab icon={<HomeIcon />} value={0} />
      <CustomTab icon={<LayersIcon />} value={1} />
      <CustomTab icon={<TableChartIcon />} value={2} />
      <CustomTab icon={<FileUploadIcon />} value={3} />
      <CustomTab icon={<SettingsIcon />} value={4} />
    </Tabs>
  );
}

function CustomTab(props) {
  return (
    <Tooltip title={contentData[props.value].title} placement='right'>
      <Tab
        {...props}
        sx={{
          minWidth: "unset",
        }}
      />
    </Tooltip>
  );
}
