import { UploadFile } from "@mui/icons-material";
import { Button, Grid2, Skeleton, TextField, Typography } from "@mui/material";
import useFileUpload from "../../../hooks/useFileUpload";

export default function FileUploadUI() {
  const { file, fileForm, isLoading, handleFileUpload, handleFormChange } =
    useFileUpload();
  return (
    <Grid2 container direction={"column"} gap={2} sx={{ p: 1 }}>
      <Typography variant={"subtitle2"} gutterBottom>
        Upload File
      </Typography>
      {file && (
        <FileUploadForm
          fileForm={fileForm}
          handleFormChange={handleFormChange}
        />
      )}
      {isLoading && (
        <>
          {Array(3)
            .fill("a")
            .map((l, i) => (
              <Typography key={l + i} variant="h4">
                <Skeleton />
              </Typography>
            ))}
        </>
      )}
      <Grid2 justifyContent={"space-between"} container gap={2} wrap="nowrap">
        <Button size="small" variant="outlined" component="label">
          Select File
          <input
            type="file"
            accept=".json,.geojson,.csv"
            hidden
            onChange={handleFileUpload}
          />
        </Button>
        <Button
          disabled={!file}
          size="small"
          variant={"contained"}
          startIcon={<UploadFile />}>
          Upload
        </Button>
      </Grid2>
    </Grid2>
  );
}

function FileUploadForm({ fileForm, handleFormChange }) {
  return (
    <Grid2 container gap={2} direction={"column"}>
      {Object.entries(fileForm).map(([key, value]) => (
        <TextField
          size={"small"}
          fullWidth
          key={key}
          value={value}
          onChange={handleFormChange(key)}
          label={key}
        />
      ))}
    </Grid2>
  );
}
