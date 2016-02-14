'use strict'

var express = require('express')
var router = express.Router()

const appstore = require('../utils/appstore')
const appModel = require('../models/app')

router
  .get('/app', (req, res) => {
    appModel.list()
      .then(apps => res.send(apps))
      .catch(err => res.send(err))
  })

  .post('/app', (req, res) => {
    const URL = req.body.url
    appstore.fetchAppInfo(URL)
      .then(info => appModel.add(info))
      .then(app => res.send(app))
      .catch(err => res.send(err))
  })

  .delete('/app/:id', (req, res) => {

  })

module.exports = router
