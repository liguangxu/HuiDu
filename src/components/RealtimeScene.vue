<template>
	<div>
		<img :src="sceneData" style="width:400px;height:300px;">
	</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['sceneData']
}
</script>
