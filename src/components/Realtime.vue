<template>
	<div>
		<!-- <my-header></my-header> -->
		<my-sidebar></my-sidebar>
		<my-realtimecontent></my-realtimecontent>
	</div>
</template>

<script>
import MySidebar from './Sidebar.vue'
import MyRealtimeContent from './RealtimeContent.vue'

export default {
  name: 'realtime',
  components: {
    'my-sidebar': MySidebar,
    'my-realtimecontent': MyRealtimeContent
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