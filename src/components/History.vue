<template>
	<div>
		<!-- <my-header></my-header> -->
		<my-sidebar></my-sidebar>
		<my-historycontent></my-historycontent>
	</div>
</template>

<script>
import MySidebar from './Sidebar.vue'
import MyHistoryContent from './HistoryContent.vue'

export default {
  name: 'history',
  components: {
    'my-sidebar': MySidebar,
    'my-historycontent': MyHistoryContent
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