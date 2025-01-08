import React, { useState } from 'react'
import {
  Box,
  Button,
  Select,
  MenuItem,
  Typography,
  Modal,
  TextField,
} from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import AddIcon from '@mui/icons-material/Add'
import DataTable from './DataTable'
import SearchBar from './SearchBar'

function Dashboard({
  onAddLayer,
  onSwitchStyle,
  onUploadFile,
  onFetchHeatMapData,
  onLayerSelect,
}) {
  const [selectedLayer, setSelectedLayer] = useState('hexagon')
  const [apiUrl, setApiUrl] = useState('')
  const [openTable, setOpenTable] = useState(false)
  const [openHeatMapModal, setOpenHeatMapModal] = useState(false)
  const [tableData, setTableData] = useState([])

  const handleLayerSelect = (event) => {
    setSelectedLayer(event.target.value)
    onLayerSelect(event.target.value)
  }

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      onUploadFile(file)
    }
  }

  // Handle heatmap data fetch
  const handleFetchHeatMap = () => {
    if (apiUrl) {
      onFetchHeatMapData(apiUrl)
      handleCloseHeatMapModal()
    }
  }

  // Open/Close DataTable Modal
  const handleOpenTable = () => setOpenTable(true)
  const handleCloseTable = () => setOpenTable(false)

  // Open/Close Heatmap Modal
  const handleOpenHeatMapModal = () => setOpenHeatMapModal(true)
  const handleCloseHeatMapModal = () => setOpenHeatMapModal(false)

  // Function to update the DataTable with fetched data
  const handleDataFetched = (data) => {
    setTableData(data)
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 10,
        left: 10,
        width: 300,
        padding: 2,
        backgroundColor: '#1e1e1e',
        borderRadius: 2,
        color: 'white',
        boxShadow: 3,
      }}
    >
      <Typography variant='h6' gutterBottom>
        Dashboard
      </Typography>

      {/* Add Layer Button */}
      <Button
        variant='contained'
        color='primary'
        fullWidth
        startIcon={<AddIcon />}
        sx={{ marginBottom: 3 }}
        onClick={onAddLayer}
      >
        Add Layer
      </Button>

      {/* Search Bar Component */}
      <SearchBar onDataFetched={handleDataFetched} />

      {/* Select Layer Type Dropdown */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant='subtitle1' gutterBottom>
          Select Layer Type
        </Typography>
        <Select
          value={selectedLayer}
          fullWidth
          onChange={handleLayerSelect}
          sx={{ backgroundColor: 'white', color: 'black' }}
        >
          <MenuItem value='hexagon'>Hexagon Layer</MenuItem>
          <MenuItem value='polygon'>Polygon Layer</MenuItem>
          <MenuItem value='events'>Events Layer</MenuItem>
        </Select>
      </Box>

      {/* Map Style Selection */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant='subtitle1' gutterBottom>
          Switch Map Style
        </Typography>
        <Select
          defaultValue='dark-v10'
          fullWidth
          onChange={(event) =>
            onSwitchStyle(`mapbox://styles/mapbox/${event.target.value}`)
          }
          sx={{ backgroundColor: 'white', color: 'black' }}
        >
          <MenuItem value='satellite-streets-v11'>Satellite Streets</MenuItem>
          <MenuItem value='light-v10'>Light</MenuItem>
          <MenuItem value='dark-v10'>Dark</MenuItem>
          <MenuItem value='satellite-v9'>Satellite</MenuItem>
        </Select>
      </Box>

      {/* File Upload */}
      <Box>
        <Typography variant='subtitle1' gutterBottom>
          Upload File
        </Typography>
        <Button
          variant='outlined'
          color='secondary'
          fullWidth
          startIcon={<UploadFileIcon />}
          component='label'
        >
          Upload
          <input
            type='file'
            accept='.json,.geojson'
            hidden
            onChange={handleFileUpload}
          />
        </Button>
      </Box>

      {/* Open Data Table Button */}
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant='contained'
          color='info'
          fullWidth
          onClick={handleOpenTable}
        >
          Open Tables
        </Button>
      </Box>

      {/* Data Table Modal */}
      <Modal open={openTable} onClose={handleCloseTable}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: 'auto',
          }}
        >
          <Typography id='datatable-modal-title' variant='h6' gutterBottom>
            Data Table
          </Typography>
          <DataTable data={tableData} />
          <Button
            variant='contained'
            color='secondary'
            onClick={handleCloseTable}
            sx={{ marginTop: 2, float: 'right' }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      {/* Open Heatmap Modal */}
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant='contained'
          color='warning'
          fullWidth
          onClick={handleOpenHeatMapModal}
        >
          Add Heatmap
        </Button>
      </Box>

      {/* Heatmap Modal */}
      <Modal open={openHeatMapModal} onClose={handleCloseHeatMapModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id='heatmap-modal-title' variant='h6' gutterBottom>
            Enter API URL for Heatmap
          </Typography>
          <TextField
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder='Enter API URL'
            variant='outlined'
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant='contained'
            color='secondary'
            fullWidth
            onClick={handleFetchHeatMap}
          >
            Load Heatmap
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default Dashboard
