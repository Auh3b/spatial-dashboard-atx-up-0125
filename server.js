 import express from 'express'
 import axios from 'axios'
 import cors from 'cors'

 const app = express()
 app.use(cors())

 app.get('/proxy/geojson', async (req, res) => {
   const { country, detail } = req.query
   try {
     const response = await axios.get(
       `https://geodata.ucdavis.edu/gadm/gadm4.1/json/gadm41_${country}_${detail}.json`
     )
     res.json(response.data)
   } catch (error) {
     console.error('Error fetching GeoJSON data:', error)
     res.status(500).send('Error fetching GeoJSON data')
   }
 })

 const PORT = 5001
 app.listen(PORT, () => {
   console.log(`Proxy server running on http://localhost:${PORT}`)
 })
