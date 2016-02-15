<template lang="jade">
#integrations
  h3 WebHook
  input(type="text", placeholder="url")
  p.description When a price is applied, Catchem will trigger this WebHook, request the specific URL with data.
</template>


<script>
  
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
}
</style>