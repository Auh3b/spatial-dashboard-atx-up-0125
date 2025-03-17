# Change logs based on phases

## 14/01/2025

### GeoFence Drawing Tool

- Developing geofences to select highlighted features.
- Redesigned Dashboard to incorporate side panel which provides context and control of map features

### Layers

- Optimise Hexagon layer. Currently using demo data
- Added heatmap layer, utilises the same data as hexagon layer i.e. Deck.GL example data

### Data Source Integration

-Not yet started. Waiting for data URLs or API endpoints.

### RTK Integration

- Initiated state management with redux-toolkit. Have added states for Layers and popup

### Testing and Optimisation

- Change Polygon layer to GeoJson which is better at handle geojson formatted data
- Resolved package compatibility issues. Upgrade map packages to latest version. If any trouble try delete the "node_modules" folder and "package-lock.json" file
- Reorganised UI components, destructuring into granular components.
- Testing and Polishing is ongoing

## 15/01/2025

### GeoFence Drawing Tool

- Developing custom geofencing to account for requirements and optimisation issues.

### RTK Integration

- Added app state to control other application information including feedback

### Testing and Optimisation

- Added snackbar for feedback.
- Optimised Layer styling.
- Fix popup misalignment on countries layer.
- Testing and Polishing is ongoing

## 16/01/2025

### GeoFence Drawing Tool

- Optimised custom drawing tool to take account of different drawing states i.e. `free`, `point`, `circle`, `rectange`, and `polygon`

### Testing and Optimisation

- Added custom navigation item

## 17/01/2025

### Testing and Optimisation

- Added worker for processing data and provide a single source of truth on different thread.
- Implemented table view of loaded data
- UI improvements

## 20/01/2025

## GeoFence Drawing Tool

- Drawing tools can will highlight overlapping features. Only polygon features are highlighted.

## 29/10/2026

### Data layers

- Added ability to drill down to admin levels country( lv0) --> states/provinces(lv1) --> counties (lv2)

## 12/03/2025

### Layers (Breaking Changes)

- The nature in which layers are add to the map has changed, and does not use individual files. Layers are generated based on a source, and the source can be taken from a existing source, from HTTPS/URL, or uploaded by a local file. Data is stored locally and will disappear when application is closed.

## 17/03/2024

### New Features

- Improved in-memory layers:
  - Extended costumisation of layers for in-app changes.
  - Multiple layers can be generated from one source. Filtering allows for categorisation of data items.
  - MaterialUI Icons can be used in Icon Layer.
- Circle geofence shows radius in kilometers when popup is lauched
- Selected features through geofence can copied to clipboard.
