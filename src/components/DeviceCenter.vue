<template>
	<div>
		<my-sidebar></my-sidebar>
		<router-view></router-view>
	</div>
</template>

<script>
import MySidebar from './Sidebar.vue'

export default {
  name: 'devicecenter',
  components: {
    'my-sidebar': MySidebar
  }
}
</script>