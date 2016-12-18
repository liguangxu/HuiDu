<template>
	<div>
		<my-sidebar></my-sidebar>
		<router-view></router-view>
	</div>
</template>

<script>
import MySidebar from './Sidebar.vue'
import MySystemCenterContent from './SystemCenterContent.vue'

export default {
  name: 'systemcenter',
  components: {
    'my-sidebar': MySidebar,
    'my-systemcentercontent': MySystemCenterContent
  }
}
</script>