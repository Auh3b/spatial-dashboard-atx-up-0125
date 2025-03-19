import {
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  Grid2,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import CoordinateSelector from "./components/CoordinateSelector";
import FilterAttribute from "./components/FilterAttribute";
import HeatMapAttrChanger from "./components/HeatMapAttrChanger";
import HexAttrChanger from "./components/HexAttrChanger";
import IconAttrChanger from "./components/IconAttrChanger";
import NameChanger from "./components/NameChanger";
import RadiusChanger from "./components/RadiusChanger";
import ShapePicker from "./components/ShapePicker";
import ShowInLegendToggle from "./components/ShowInLegendToggle";
import StrokeChanger from "./components/StrokeChanger";

export default function LayerUI({
  id,
  selected,
  type,
  sourceType,
  source,
  onDelete,
  onClick,
  noHeader = false,
  divider = true,
  allowedAttributes = undefined,
}) {
  const isSelected = selected === id;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  return (
    <Box>
      <Grid2 container direction={"column"}>
        <Grid2
          container
          alignItems={"center"}
          wrap="nowrap"
          sx={{
            display: noHeader ? "none" : "flex",
            backgroundColor: (theme) =>
              isSelected ? theme.palette.action.hover : "unset",
            py: 0.5,
          }}>
          <Checkbox
            size="small"
            checked={isSelected}
            disableRipple
            onClick={onClick}
          />
          <Box sx={{ flexGrow: 1 }}>
            <NameChanger id={id} />
          </Box>
          <IconButton disableRipple onClick={handleOpen}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Grid2>
        <Collapse in={noHeader ? true : open}>
          <Grid2 sx={{ p: 1 }}>
            <FilterAttribute id={id} />
            <ShapePicker id={id} />
            <ColorPicker id={id} type={type} />
            <StrokeChanger id={id} type={type} />
            <CoordinateSelector
              id={id}
              type={type}
              sourceType={sourceType}
              source={source}
            />
            <RadiusChanger id={id} type={type} />
            <HexAttrChanger id={id} type={type} />
            <HeatMapAttrChanger id={id} type={type} />
            <IconAttrChanger id={id} type={type} />
            <ShowInLegendToggle id={id} />
            <Button
              onClick={onDelete}
              size="small"
              variant="contained"
              color="error"
              startIcon={<Delete />}
              sx={{ mb: 1, display: noHeader ? "none" : "inline-block" }}>
              Delete Layer
            </Button>
          </Grid2>
        </Collapse>
      </Grid2>
      {divider && <Divider variant="vertical" />}
    </Box>
  );
}

// const LegendTypeUI = {
//   category: CategoryLegend,
//   ramp: RampLegend,
// };

// function Legend({ type, colors, labels }) {
//   const LegendVisual = useMemo(() => LegendTypeUI[type], [type]);
//   return (
//     <Box px={1}>
//       <LegendVisual type={type} colors={colors} labels={labels} />
//     </Box>
//   );
// }

// function CategoryLegend({ colors, labels }) {
//   const values = zip(labels, colors);
//   return (
//     <Grid2 container direction={"column"}>
//       {values.map(([label, color]) => (
//         <Grid2 container gap={2} key={label} alignItems={"center"}>
//           <Box
//             sx={{
//               backgroundColor: color,
//               width: "10px",
//               height: "10px",
//               borderRadius: "50%",
//             }}></Box>
//           <Typography variant="caption">{label}</Typography>
//         </Grid2>
//       ))}
//     </Grid2>
//   );
// }

// function RampLegend({ colors, labels }) {
//   return (
//     <Grid2 container direction={"column"}>
//       <Grid2 container justifyContent={"space-between"}>
//         {labels.map((d) => (
//           <Typography key={d} variant="caption">
//             {d}
//           </Typography>
//         ))}
//       </Grid2>
//       <Box
//         width={"100%"}
//         height={"10px"}
//         sx={{
//           background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
//         }}></Box>
//     </Grid2>
//   );
// }
