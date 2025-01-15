# Change logs based on phases

## 14/01/2025

### Phase 1: GeoFence Drawing Tool

- Developing geofences to select highlighted features.
- Redesigned Dashboard to incorporate side panel which provides context and control of map features

### Phase 2: Hexagon Layer

- Optimise Hexagon layer. Currently using demo data

### Phase 3: Heatmap Layer

- Added heatmap layer, utilises the same data as hexagon layer i.e. Deck.GL example data

### Phase 4: Data Source Integration

-Not yet started. Waiting for data URLs or API endpoints from the client.

### Phase 5: RTK Integration

- Initiated state management with redux-toolkit. Have added states for Layers and popup

### Phase 6: Testing and Optimisation

- Change Polygon layer to GeoJson which is better at handle geojson formatted data
- Resolved package compatibility issues. Upgrade map packages to latest version.
- Reorganised UI components, destructuring into granular components.
- Testing and Polishing is ongoing
