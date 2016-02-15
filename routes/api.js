'use strict'

var express = require('express')
var router = express.Router()

const appstore = require('../utils/appstore')
const appModel = require('../models/app')
const integrationModel = require('../models/integration')

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

  .get('/integration', (req, res) => {
    integrationModel.list()
      .then(integrations => res.send(integrations))
      .catch(err => res.send(err))
  })
  .put('/integration/:id', (req, res) => {
    integrationModel.edit(req.params.id, req.body)
      .then(() => res.success())
      .catch(err => res.send(err))
  })

module.exports = router
