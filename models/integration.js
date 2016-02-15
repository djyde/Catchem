'use strict'

const db = require('../db')
const Sequelize = require('sequelize')

const Integration = db.define('integration', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,

  // webhook
  url: Sequelize.STRING
})

Integration.sync().then(() => {
  Integration.findOrCreate({
    where: {
      name: 'webhook'
    },
    defaults: {
      url: ''
    }
  })

})


const webhook = {
  setUrl(url){
    return new Promise((resolve, reject) => {
      Integration.update({ url }, where: { name: 'webhook' })
        .then(() => resolve)
        .catch(err => reject(err))
    })
  }
}

module.exports = {
  webhook
}