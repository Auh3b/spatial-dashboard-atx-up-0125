import { Box, Divider, Grid2, Typography } from "@mui/material";

export default function AttributeWrapper({
  title,
  children,
  action = null,
  divider = true,
}) {
  return (
    <Box>
      <Grid2 container alignItems={"center"} justifyContent={"space-between"}>
        <Typography variant="overline" sx={{ fontSize: 10, mb: 1 }}>
          {title}
        </Typography>
        {action}
      </Grid2>
      <Box sx={{ pl: 1 }}>{children}</Box>
      {divider && <Divider sx={{ my: 1, borderStyle: "dashed" }} />}
    </Box>
  );
}
