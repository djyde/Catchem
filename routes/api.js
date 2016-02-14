'use strict'

var express = require('express')
var router = express.Router()

const appstore = require('../utils/appstore')
const appModel = require('../models/app')

router
  .get('/app', (req, res) => {

  })

  .post('/app', (req, res) => {
    const URL = req.body.url
    appstore.fetchAppInfo(URl)
      .then(info => appModel.add(info))
      .catch(err => res.send(err))
  })

  .delete('/app/:id', (req, res) => {

  })

module.exports = router
