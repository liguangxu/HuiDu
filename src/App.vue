<template>
  <div id="app">
  <transition>
    <router-view></router-view>
  </transition>
  </div>
</template>

<script>
import Login from './components/Login'

export default {
  name: 'app',
  components: {
    'login': Login
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
