'use strict'

const Sequelize = require('sequelize')
const _config = require('../_config')
const path = require('path')

const db = new Sequelize(_config.db.name, 'catchem', 'catchem', {
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../', '_db/catchem.sqlite')
})

module.exports = db