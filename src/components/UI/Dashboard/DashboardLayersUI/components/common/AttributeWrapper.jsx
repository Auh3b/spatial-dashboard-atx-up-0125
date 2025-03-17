import { Box, Divider, Grid2, Typography } from "@mui/material";

export default function AttributeWrapper({ title, children, action = null }) {
  return (
    <Box sx={{ my: 1 }}>
      <Grid2 container alignItems={"center"} justifyContent={"space-between"}>
        <Typography variant="overline" sx={{ fontSize: 10, mb: 1 }}>
          {title}
        </Typography>
        {action}
      </Grid2>
      <Box sx={{ pl: 1 }}>{children}</Box>
      <Divider sx={{ my: 1, borderStyle: "dashed" }} />
    </Box>
  );
}
