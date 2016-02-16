'use strict'

const Sequelize = require('sequelize')
const config = require('../config')
const path = require('path')

const db = new Sequelize(config.db.name, 'catchem', 'catchem', {
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../', '_db/catchem.sqlite')
})

module.exports = db