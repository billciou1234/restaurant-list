// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

//join restaurants list
const restaurantList = require('./restaurant.json')


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.filter(function (restaurant) {
    return restaurant.id === Number(req.params.restaurant_id)
  })
  res.render('show', { restaurant: restaurant[0] })
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

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})



