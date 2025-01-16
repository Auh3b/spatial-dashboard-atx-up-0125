import axios from 'axios'

// Axios instance setup for your backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api', // Use VITE_ for Vite
  headers: {
    'Content-Type': 'application/json',
  },
})

// Fetch GADM data via Proxy
export const fetchGADMData = async (countryCode, detailLevel) => {
  const url = `http://localhost:5001/proxy/geojson?country=${countryCode}&detail=${detailLevel}`
  try {
    const response = await axios.get(url)
    return response.data // This will include the GeoJSON data
  } catch (error) {
    console.error(
      `Error fetching GADM data for country: ${countryCode}, level: ${detailLevel}`,
      error
    )
    throw error
  }
}

// Fetch event data
export const getEvents = async () => {
  try {
    const response = await api.get('/events')
    return response.data
  } catch (error) {
    console.error('Error fetching events data:', error)
    throw error
  }
}

// Example Usage in Your Component:
// import { fetchGADMData } from "./Api";
// const gadmData = await fetchGADMData("USA", 1); // Fetch US State Data
// console.log("GADM GeoJSON Data: ", gadmData);

// // Fetch GeoNames data
// export const fetchGeoNamesData = async (latitude, longitude) => {
//   const username = import.meta.env.VITE_GEONAMES_USERNAME || "tabbybg"; // Use VITE_ for Vite
//   const url = `https://secure.geonames.org/countrySubdivisionJSON?lat=${latitude}&lng=${longitude}&username=${username}`;
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error(
//       `Error fetching GeoNames data for lat: ${latitude}, lng: ${longitude}`,
//       error
//     );
//     throw error;
//   }
// };
