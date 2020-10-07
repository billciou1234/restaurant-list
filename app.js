// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
//join restaurants list
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongdb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//index
app.get('/', (req, res) => {
  // res.render('index', { restaurant: restaurantList.results })
  Restaurant
    .find()
    .lean()
    .sort({ id: 'asc' })
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.error(error))
})

//single
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ id: id }).lean().then(restaurant => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const restaurants = restaurantList.results.filter(function (restaurant) {
    if (restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())) {
      return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
    } else {
      return restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase())
    }

  })
  res.render('index', { restaurant: restaurants, keyword: req.query.keyword })

})

//create page
app.get('/new', (req, res) => {
  let newID = 0
  return Restaurant.findOne().sort({ _id: -1 }).then(restaurant => {
    newID = Number(restaurant.id) + 1
    console.log(newID)
    return res.render('new', { newID: newID })
  })
    .catch(error => console.log(error))

})
//create post
app.post('/new', (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.googlemap
  const rating = req.body.rating
  const description = req.body.description

  if (name.length === 0) {
    return alert('Please keyin restaurant name!')
  }
  if (name_en.length === 0) {
    return alert('Please keyin restaurant english name!')
  }
  if (category.length === 0) {
    return alert('Please keyin restaurant category!')
  }
  if (image.length === 0) {
    return alert('Please keyin restaurant image url!')
  }
  if (location.length === 0) {
    return alert('Please keyin restaurant location!')
  }
  if (phone.length === 0) {
    return alert('Please keyin restaurant phone!')
  }
  if (google_map.length === 0) {
    return alert('Please keyin restaurant google map!')
  }
  if (rating.length === 0 || rating > 5 || rating < 0 || parseFloat(rating).toString() == 'NaN') {
    return alert('Please keyin restaurant rating and range in 0~5!')
  }
  if (description.length === 0) {
    return alert('Please keyin restaurant description!')
  }

  const restaurant = new Restaurant({ id, name, name_en, category, image, location, phone, google_map, rating, description })
  return restaurant.save().then(() => res.redirect('/')).catch(error => console.log(error))
})


app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ id: id }).lean().then(restaurant => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.googlemap
  const rating = req.body.rating
  const description = req.body.description

  if (name.length === 0) {
    return alert('Please keyin restaurant name!')
  }
  if (name_en.length === 0) {
    return alert('Please keyin restaurant english name!')
  }
  if (category.length === 0) {
    return alert('Please keyin restaurant category!')
  }
  if (image.length === 0) {
    return alert('Please keyin restaurant image url!')
  }
  if (location.length === 0) {
    return alert('Please keyin restaurant location!')
  }
  if (phone.length === 0) {
    return alert('Please keyin restaurant phone!')
  }
  if (google_map.length === 0) {
    return alert('Please keyin restaurant google map!')
  }
  if (rating.length === 0 || rating > 5 || rating < 0 || parseFloat(rating).toString() == 'NaN') {
    return alert('Please keyin restaurant rating and range in 0~5!')
  }
  if (description.length === 0) {
    return alert('Please keyin restaurant description!')
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

      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ id: id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})



