<template>
  <div id="app">
    <dashboard/>
  </div>
</template>

<script>
import Dashboard from './views/components/Dashboard.vue'

export default {
  components: {Dashboard},
  name: 'App',
}
</script>

<style lang="sass" scoped>
  body
    margin: 0
    padding: 0
    *
      box-sizing: border-box
</style>

