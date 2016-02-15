<template lang="jade">
#integrations
  .integration(v-for="integration in integrations")
    h3 {{ integration.name }}
    input(v-for="param in integration.params.split(',')", v-model="params[integration.name][param]", type="text", placeholder="{{ param }}", value="{{ integration[param] }}")
    p.description {{ integration.description }}
    button(@click="modify(integration.id, integration.name)") Save
</template>


<script>
import request from 'superagent'
import notie from 'notie'
import nprogress from 'nprogress'


export default {
  data(){
    return {
      requesting: false,
      integrations: [],
      params: {
        WebHook: {}
      }
    }
  },

  methods: {
    modify(id, name){
      if (!this.requesting) {
        nprogress.start()
        this.requesting = true
        request
          .put(`/api/integration/${id}`)
          .send(this.params[name])
          .end((err, res) => {
            console.log('done')
            nprogress.done()
            this.requesting = false
            if (err) {
              notie.alert(3, err.message, 1.5)
            } else {
              notie.alert(1, 'Saved!', 1.5)
            }
          })
      }
    }
  },

  route: {
    activate(){
      nprogress.start()
      request
        .get('/api/integration')
        .end((err, res) => {
          nprogress.done()
          if (err) {
            notie.alert(3, err.message, 1.5)
          } else {
            this.integrations = res.body
          }
        })
    }
  }
}
</script>

<style>
#integrations{
  width: 60%;
  margin: 0 auto;
  input{
    width: 100%;
    padding: .6em;
    box-sizing: border-box;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
  }

  h3{
    color: #555459;
    font-weight: bold;
  }

  .description{
    color: #555459;
    font-size: .9em;
  }

  button{
    background-color: #fbfbfa;
    border-radius: 4px;
    border: 1px solid gray;
    padding-left: .8em;
    padding-right: .8em;
    padding-top: .6em;
    padding-bottom: .6em;
    font-size: .9em;
  }
}
</style>