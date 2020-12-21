const express = require('express')
const router = express.Router()
const {fetchEvents} = require('./controller')

router.get('/events', (req, res) => {
    fetchEvents(req, res)
})

module.exports = router
