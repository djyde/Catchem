<template lang="jade">
#apps
  #add
    input(v-model="appUrl", @keyup.enter="add" ,type="text", placeholder="App URL", lazy)
    a(href="javascript:void(0)", @click="add") ADD
    #select
      .option(v-for="result in searchResults")
        .icon
          img(:src="result.artworkUrl100")
        .name {{ result.trackName }}
  p(v-show="apps.length === 0") loading...
  .pure-g(v-else)
    .pure-u-1-6(v-for="app in apps")
      .app
        .icon
          img.pure-img(:src="app.icon")
        .name {{ app.name }}
        .price {{ app.price }}
</template>

<script>
import request from 'superagent'
import notie from 'notie'
import nprogress from 'nprogress'
import * as appstore from '../utils/appstore'

export default {
  data(){
    return {
      apps: [],
      adding: false,
      appUrl: '',
      searchResults: []
    }
  },

  watch:{
    appUrl(val, oldVal){
      if (val && !val.startsWith('http')) {
        this.search()
      } else if (!val) {
        this.searchResults = []
      }
    }
  },

  methods: {
    add(){
      if (!this.adding) {
        nprogress.start()
        this.adding = true
        request
          .post('/api/app')
          .send({
            url: this.appUrl
          })
          .end((err, res) => {
            nprogress.done()
            this.adding = false
            if (err) {
              console.log(err)
              notie.alert(3, err.message, 1.5)
            } else {
              notie.alert(1, 'Success', 1.5)
              this.appUrl = ''
              this.apps.push(res.body)
            }
          })
      }
    },

    search(){
      if (!this.appUrl.startsWith('http')) {
        request
          .get(`/api/appstore/${this.appUrl}`)
          .end((err, res) => {
            if (err) {
              notie.alert(3, err, 1.5)
            } else {
              this.searchResults = res.body
            }
          })
      }
    }
  },

  route: {
    activate(){
      nprogress.start()
      request
        .get('/api/app')
        .end((err, res) => {
          nprogress.done()
          if (err) {
            notie.alert(3, err.message, 1.5)
          } else {
            this.apps = res.body
          }
        })
    }
  }
}
</script>

<style>
#apps{
  .app{
    text-align: center;
    .icon{
      padding: 3em;
      padding-bottom: .6em;
      img{
        border-radius: 20%;
      }
    }
    .name{
      font-size: .8em;
    }
    .price{
      font-size: .8em;
      margin-top: .2em;
    }
  }

  #add{
    text-align: center;
    margin-top: 3em;
    input{
      width: 30em;
      border: 1px solid #d5d5d5;
      border-right: none;
      border-radius: 2em 0 0 2em;
      padding-left: 1em;
      padding-right: 1em;
      padding-top: .4em;
      padding-bottom: .4em;
      outline: none;
    }

    a{
      color: #000;
      background-image: linear-gradient(#fcfcfc, #eee);
      border: 1px solid #d5d5d5;
      padding: .4em;
      padding-left: 1em;
      text-decoration: none;
      border-radius: 0 2em 2em 0;
      padding-right: 1em;
    }

    #select{
      height: 20em;
      overflow: auto;
      .option{
        border: 1px solid gray;
        width: 36em;
        margin: 0 auto;
        margin-top: .1em;
      }
    }
  }
}
</style>
