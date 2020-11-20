const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  // res.render('index', { restaurant: restaurantList.results })
  const userId = req.user._id
  Restaurant
    .find({ userId })
    .lean()
    .sort({ id: 'asc' })
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.error(error))
})

module.exports = router