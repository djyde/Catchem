'use strict'

const request = require('superagent')
const schedule = require('node-schedule')

const db = require('../db')
const Sequelize = require('sequelize')

const appstore = require('../utils/appstore')

const integrationModel = require('./integration')

const App = db.define('app', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  url: Sequelize.STRING,
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
          icon: info.image,
          url: info.url
        })
        .then(app => resolve(app))
        .catch(err => reject(err))
      }
    }).catch(err => reject(err))
  })
}

function list(){
  return new Promise((resolve, reject) => {
    App.findAll()
       .then(apps => resolve(apps))
       .catch(err => reject(err))
  })
}

function edit(id, info){
  return new Promise((resolve, reject) => {
    App.update(info, {
      where: {
        id: id
      }
    })
    .then(app => resolve(app))
    .catch(err => reject(err))
  })
}

function check(){
  console.log('======= Checking begin =======')

  return new Promise((resolve, reject) => {
    let count = 0
    list().then(apps => apps.map((app, index) => {
      appstore.fetchAppInfo(app.url)
        .then(info => {
          console.log('Fetched', info.name)
          count++
          console.log(count, apps.length)
          if (count === apps.length) {
            resolve()
          }
          if (info.price !== app.price) {
            console.log(info.name, '\'s price had changed')

            // figure out up or down or free
            let numNewPrice = info.price.substr(1)
            let numOriginPrice = app.price.substr(1)

            let status = 0 // 0.平稳 1.降价 2.限免

            if (isNaN(numNewPrice)) {
              // free
              status = 2
            } else {
              status = numNewPrice > numOriginPrice ? 0 : 1
            }

            // trigger service interface
            integrationModel.webhook.getUrl()
              .then(url => {
                if (url) {
                  request
                    .post(url)
                    .send({
                      status,
                      name: info.name[0],
                      price: info.price,
                      description: info.textDescription
                    })
                    .end((err) => {
                      if (err) { console.error('Triggering WebHook failed.', err) }
                    })
                }
              })

            // modify app info
            edit(app.id, {
              status,
              price: info.price
            })
            .catch(err => reject(err))
            
          }
        })
    }))
  })
}

// check every 2 hours
function cronJob(){
  check().then(() => console.log('Checking finsihed'))
}

cronJob()

let job = schedule.scheduleJob('0 */2 * * *', () => cronJob())


module.exports = {
  add, list, check, edit
}
