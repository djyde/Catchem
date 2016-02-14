<template lang="jade">
header
  nav
    a(v-link="{ name: 'apps', exact: true }") APPS
    a(v-link="{ name: 'services', exact: true }") SERVICES
router-view
</template>

<script>

</script>

<style>
@import "normalize.css";
@import "purecss";

body{
  width: 960px;
  margin: 0 auto;
  margin-top: 8em;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.v-link-active{
  border-bottom-color: #000;
}

header{
  nav{
    text-align: center;

    a{
      transition: all .2s;
      margin: 1em;
      padding-bottom: .4em;
      color: #000;
      text-decoration: none;
      border-bottom: 2px solid #fff;
      &:hover{
        border-bottom-color: #000;
      }
    }
  }
}
</style>
