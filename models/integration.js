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
  description: Sequelize.TEXT,
  params: Sequelize.STRING,

  // webhook
  url: Sequelize.STRING
})

Integration.sync().then(() => {
  Integration.findOrCreate({
    where: {
      name: 'WebHook'
    },
    defaults: {
      url: '',
      params: 'url',
      description: 'When a price is applied, Catchem will trigger this WebHook, request the specific URL with data.'
    }
  })

})

function edit(id, params){
  return new Promise((resolve, reject) => {
    Integration.update(params, {where: { id }})
      .then(() => resolve())
      .catch(err => reject(err))
  })
}

function list(){
  return new Promise((resolve, reject) => {
    Integration.findAll()
      .then(integrations => resolve(integrations))
      .catch(err => reject(err))
  })
}

const webhook = {
  getUrl(){
    return new Promise((resolve, reject) => {
      Integration.findOne({ 
        where: { 
          name: 'WebHook' 
        },
        attributes: ['url']
      })
      .then(webhook => resolve(webhook.url))
      .catch(err => reject(err))
    })
    
  }
}

module.exports = {
  list, edit,
  webhook
}