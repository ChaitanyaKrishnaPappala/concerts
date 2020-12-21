require('dotenv').config()
// eslint-disable-next-line max-len
const googleGeoBaseUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
module.exports = {googleGeoBaseUrl}
