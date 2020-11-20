const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const Restaurant = require('../restaurant')
let restaurantList = require('../../restaurant.json')
const db = require('../../config/mongoose')
const SEED_USER1 = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}
const SEED_USER2 = {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}


db.once('open', () => {

  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER1.password, salt))
    .then(hash => User.create({
      name: SEED_USER1.name,
      email: SEED_USER1.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      for (let i = 0; i < 3; i++) {
        Restaurant.create({
          id: restaurantList.results[i].id,
          name: restaurantList.results[i].name,
          name_en: restaurantList.results[i].name_en,
          category: restaurantList.results[i].category,
          image: restaurantList.results[i].image,
          location: restaurantList.results[i].location,
          phone: restaurantList.results[i].phone,
          google_map: restaurantList.results[i].google_map,
          rating: restaurantList.results[i].rating,
          description: restaurantList.results[i].description,
          userId: userId
        })
      }
    })
    .then(() => {
      // console.log('done.')
    })


  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER2.password, salt))
    .then(hash => User.create({
      name: SEED_USER2.name,
      email: SEED_USER2.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      for (let i = 3; i < 6; i++) {
        Restaurant.create({
          id: restaurantList.results[i].id,
          name: restaurantList.results[i].name,
          name_en: restaurantList.results[i].name_en,
          category: restaurantList.results[i].category,
          image: restaurantList.results[i].image,
          location: restaurantList.results[i].location,
          phone: restaurantList.results[i].phone,
          google_map: restaurantList.results[i].google_map,
          rating: restaurantList.results[i].rating,
          description: restaurantList.results[i].description,
          userId: userId
        })
      }
    })
    .then(() => {

      setTimeout(() => {
        console.log('done.')
        process.exit()
      }, 1000)
    })

})
