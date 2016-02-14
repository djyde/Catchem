'use strict'

const db = require('../db')
const Sequelize = require('sequelize')

const App = db.define('app', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  icon: Sequelize.STRING,
  price: Sequelize.STRING
})

App.sync()

function add(info){
  return new Promise((resolve, reject) => {
    App.findOne({
      where: {
        name: info.name[0]
      }
    })
    .then(app => {
      if (app) {
        // exists
        reject({
          status: 2,
          message: 'App exists'
        })
      } else {
        App.create({
          name: info.name[0],
          price: info.price,
          icon: info.image
        })
        .then(app => resolve(app))
        .catch(err => reject(err))
      }
    }).catch(err => reject(err))
  })
}

function list(){
  return new Promise((resovle, reject) => {
    App.findAll()
       .then(apps => resovle(apps))
       .catch(err => reject(err))
  })
}

module.exports = {
  add, list
}