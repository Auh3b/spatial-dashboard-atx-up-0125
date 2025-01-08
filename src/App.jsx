
import './App.css'
import React from 'react'
import MapWrapper from './components/MapWrapper' // Import MapWrapper

function App() {
  return (
    <div className='app-container' style={{ width: '100%', height: '100vh' }}>
      {/* Render the MapWrapper component */}
      <MapWrapper />
    </div>
  )
}

export default App