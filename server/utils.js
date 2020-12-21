const delay = require('lodash.delay')

let useDelay = true
process.argv.forEach(function (val) {
    if (val === '--no-delay') useDelay = false
})

const toRad = function(Value) {
    return Value * Math.PI / 180;
}

const sendJSON = function (res, data) {
    res.setHeader('Content-Type', 'application/json')

    if (useDelay) {
        delay(() => res.send(JSON.stringify(data)), Math.random()*300)
    } else {
        res.send(JSON.stringify(data))
    }

    return res
}

const sendError = function (res, detail, code = 400, title = 'Bad Request') {
    res.statusCode = code
    sendJSON(res, {
        errors: [
            {status: code, title, detail}
        ]
    })
    return false
}

const ensureParameter = function (param, res) {
        res.statusCode = 400
        return sendJSON(res, {
            errors: [
                {
                    status: 400,
                    title: 'Invalid parameter',
                    detail: param
                }
            ]
        })
}

const calcCrow = function (lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = toRad(lat2-lat1);
    const dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}

module.exports = {
    sendJSON,
    ensureParameter,
    sendError,
    calcCrow
}
