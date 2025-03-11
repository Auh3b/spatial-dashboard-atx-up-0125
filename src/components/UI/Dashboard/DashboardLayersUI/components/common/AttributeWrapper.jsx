import { Box, Typography } from "@mui/material";

export default function AttributeWrapper({ title, children }) {
  return (
    <Box sx={{ my: 1 }}>
      <Typography variant="overline" sx={{ fontSize: 10, mb: 1 }}>
        {title}
      </Typography>
      <Box sx={{ pl: 1 }}>{children}</Box>
    </Box>
  );
}
