import axios from 'axios' // Import axios for making HTTP requests

// Axios instance setup for your backend
const api = axios.create({
  baseURL: 'http://localhost:5001', // Update with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
})

// Fetch event data
export const getEvents = async () => {
  try {
    const response = await api.get('/events') // Adjust the URL for your events endpoint
    return response.data // Return the event data
  } catch (error) {
    console.error('Error fetching events data:', error)
    throw error // Rethrow error so the caller can handle it
  }
}

// Fetch historical MAID data
export const getMaidHistory = async (device_id, start_date, end_date) => {
  try {
    const response = await api.post('/maid/history', {
      device_id,
      start_date,
      end_date,
    })
    return response.data // Return the data from the response
  } catch (error) {
    console.error('Error fetching MAID history:', error)
    throw error // Rethrow error so the caller can handle it
  }
}

/**
 * Fetch GeoJSON data from the proxy server.
 * @param {string} country - The 3-letter country code (e.g., "USA", "CAN").
 * @param {number} detail - The detail level (0 = country borders, 1 = states, 2 = counties, etc.).
 * @returns {Promise<Object>} The GeoJSON data as a JavaScript object.
 * @throws Will throw an error if the API request fails.
 */
export const getGeoJSON = async (country, detail) => {
  try {
    // Make a GET request to the proxy server
    const response = await axios.get(
      `http://localhost:5001/proxy/geojson?country=${country}&detail=${detail}`
    )

    // Return the GeoJSON data from the response
    return response.data
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching GeoJSON data through proxy:', error)

    // Rethrow the error so it can be handled by the caller
    throw error
  }
}
