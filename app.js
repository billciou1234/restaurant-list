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

const routes = require('./routes')
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
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})



