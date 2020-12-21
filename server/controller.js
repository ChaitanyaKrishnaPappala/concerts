const axios = require('axios')
const events = require('../fixtures/events')
const {googleGeoBaseUrl} = require('./config')
const {sendJSON, sendError, ensureParameter, calcCrow} = require('./utils')


const fetchEvents = function (req, res) {
    const {title, startdate, enddate, latitude, longitude, radius} = req.query
    let result = events

    Promise.all(result.map((event) => {
        const {City = '', State = '', Country = ''} = event['Location']
        return axios.get(`${googleGeoBaseUrl}&address='${City}, ${State}, ${Country}'`)
    })).then((values) => {
        values.forEach((value, index) => {
            if (value.data && value.data.results && value.data.results.length > 0
                && value.data.results[0].geometry && value.data.results[0].geometry.location) {
                const {lat, lng} = value.data.results[0].geometry.location
                if (lat && lng) {
                    result[index].lat = lat
                    result[index].lng = lng
                    if(latitude && longitude) {
                        result[index].distance = calcCrow(latitude, longitude, lat, lng)
                    }
                }

            }
        })
        if(!(req.query)){
            return sendJSON(res, result)
        }else{
            // filter by partial title matches
            if (title) {
                result = events.filter((event) => event &&
                    (event.Title || '').toLowerCase().includes(title.toString()))
            }

            // filter by startDate
            if (startdate) {
                result = result.filter((event) => event && event.Time >= startdate)
            }

            // filter by endDate
            if (enddate) {
                result = result.filter((event) => event && event.Time <= enddate)
            }
            if(radius) {
                result = result.filter((event) => +event.distance <= +radius)
            }

            // get events by latitude, longitude (should be pass with radius for nearby events)
            if (radius) {
                if (!latitude) {
                    return ensureParameter('Missing latitude parameter', res)
                }
                if (!longitude) {
                    return ensureParameter('Missing longitude parameter', res)
                }
                // get all with valid location keys
                result = result.filter((event) => event.Location)
                return sendJSON(res, result)
            }else{
                return sendJSON(res, result)
            }
        }

    }).catch((ex) => {
        return sendError(res, ex.toString(), 500, 'Internal Server Error')
    })

}
module.exports={fetchEvents}
