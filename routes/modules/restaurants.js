const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


//single
router.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  console.log(id)
  return Restaurant.findOne({ id: id, userId: userId }).lean().then(restaurant => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))

})

router.get('/search', (req, res) => {
  const userId = req.user._id
  Restaurant
    .find({ userId })
    .lean()
    .then(restaurants => {
      return restaurants.filter(restaurant => restaurant.name.includes(req.query.keyword) || restaurant.category.includes(req.query.keyword))
    })
    .then(restaurant => res.render('index', { restaurant: restaurant, keyword: req.query.keyword }))
    .catch(error => console.error(error))

})

//create page
router.get('/new', (req, res) => {
  let newID = 0
  return Restaurant.findOne().sort({ _id: -1 }).then(restaurant => {
    newID = Number(restaurant.id) + 1
    console.log(newID)
    return res.render('new', { newID: newID })
  })
    .catch(error => console.log(error))

})
//create post
router.post('/new', (req, res) => {
  const { id, name, name_en, category, image, location, phone, rating, description } = req.body
  const google_map = req.body.googlemap
  const userId = req.user._id
  const errors = []

  if (!id || !name || !name_en || !category || !image || !location || !phone || !google_map || !rating || !description) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (rating > 5 || rating < 0) {
    errors.push({ message: 'Rating range in 0~5。' })
  }
  if (errors.length) {
    let errarray = {
      id: id,
      name: name,
      name_en: name_en,
      category: category,
      image: image,
      location: location,
      phone: phone,
      google_map: google_map,
      rating: rating,
      description: description
    }
    return res.render('new', {
      errors, restaurant: errarray
    })
  }


  const restaurant = new Restaurant({ id, name, name_en, category, image, location, phone, google_map, rating, description, userId })
  return restaurant.save().then(() => res.redirect('/')).catch(error => console.log(error))
})


router.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ id: id, userId: userId }).lean().then(restaurant => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

router.put('/restaurants/:id', (req, res) => {
  const { id, name, name_en, category, image, location, phone, rating, description } = req.body
  const google_map = req.body.googlemap
  const userId = req.user._id
  const errors = []
  if (!id || !name || !name_en || !category || !image || !location || !phone || !google_map || !rating || !description) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (rating > 5 || rating < 0) {
    errors.push({ message: 'Rating range in 0~5。' })
  }
  if (errors.length) {
    let errarray = {
      id: id,
      name: name,
      name_en: name_en,
      category: category,
      image: image,
      location: location,
      phone: phone,
      google_map: google_map,
      rating: rating,
      description: description
    }
    return res.render('edit', {
      errors, restaurant: errarray
    })
  }

  return Restaurant.findOne({ id: id })
    .then(restaurant => {
      restaurant.id = id
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      restaurant.userId = userId
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ id: id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router