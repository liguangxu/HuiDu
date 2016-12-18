<template>
	<div>
		<my-header></my-header>
		<my-sidebar></my-sidebar>
	</div>
</template>

<script>
import MyHeader from './Header.vue'
import MySidebar from './Sidebar.vue'

export default {
  name: 'realtime',
  components: {
    'my-header': MyHeader,
    'my-sidebar': MySidebar
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