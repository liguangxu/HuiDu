<template>
	<div>
		<my-header></my-header>
		<router-view></router-view>
    <my-footer></my-footer>
	</div>
</template>

<script>
import MyHeader from './Header.vue'
import MyFooter from './Footer.vue'

export default {
  components: {
    'my-header': MyHeader,
    'my-footer': MyFooter
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.navbar {
  top: 0px;
  left: 0px;
}
.sidebar {
}
.bg-dark {
  background: #8492A6;
}
</style>