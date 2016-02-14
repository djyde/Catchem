<template lang="jade">
#apps
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

export default {
  data(){
    return {
      apps: []
    }
  },

  route: {
    activate(){
      request
        .get('/api/app')
        .end((err, res) => {
          if (err) {

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
}
</style>
