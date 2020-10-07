const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  // res.render('index', { restaurant: restaurantList.results })
  Restaurant
    .find()
    .lean()
    .sort({ id: 'asc' })
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.error(error))
})

modules.exports = router