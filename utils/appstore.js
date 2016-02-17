'use strict'

const cheerio = require('cheerio')
const request = require('superagent')

// const URL = 'https://itunes.apple.com/cn/app/shadowmatic/id775888026?mt=8'
function search(key){
  return new Promise((resolve, reject) => {
    request
      .get('https://itunes.apple.com/search')
      .query({
        term: key,
        country: 'CN',
        entity: 'software'
      })
      .end((err, res) => {
        if (err) {
          console.log(err.text)
          reject(err)
        } else {
          resolve(JSON.parse(res.text).results)
        }
      })
  })
}

function fetchAppInfo(url){
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, res) => {
        if (err) {
          reject(err)
        } else {
          const $ = cheerio.load(res.text)
          const itemProps = $('*[itemprop]')

          let info = {
            url,
            name: [],
            screenshot: []
          }

          itemProps.each((index, item) => {
            const type = $(item).prop('itemprop')
            const src = $(item).prop('src') || $(item).prop('content')
            const html = $(item).html()
            const content = $(item).text()

            switch(type){
              case 'name':
                info[type].push(content)
                break
              case 'image':
                info[type] = src
                break
              case 'description':
                info['textDescription'] = content
                info[type] = html
                break
              case 'screenshot':
                info[type].push(src)
                break
              default:
                info[type] = content
                break
            }
            resolve(info)
          })
        }
      })
  })
}

exports.fetchAppInfo = fetchAppInfo
exports.search = search