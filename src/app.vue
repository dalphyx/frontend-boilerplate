<template>
  <div class="app">
    <h1>{{ countValue }}</h1>
    <div class="trigger" @click="increment">
      Increment + 1
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { store } from './stores/store'
export default {
  store,
  computed: {
    ...mapGetters({
      countValue: 'getCount'
    })
  },
  methods: {
    ...mapActions({
      increment: 'INCREMENT_COUNTER'
    })
  }
}
</script>

<style>
.trigger
  display: inline-block
  padding: 10px
  color: #333
  box-shadow: 0 0 1px #000.5
  border-radius: 5px
</style>