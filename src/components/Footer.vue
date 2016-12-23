<template>
	<div class="footer">
		<span>{{ companyname }}</span>
    <!-- <span>蓝丰物联网信息技术有限公司</span> -->
	</div>
</template>

<script>
import Util from '../utils/util.js'

export default {
  data () {
    return {
      companyname: this.getCompanyname()
    }
  },
  methods: {
    getCompanyname () {
      console.log(Util.localStorageGet('currentCompanyInfo').companyname)
      return Util.localStorageGet('currentCompanyInfo').companyname
    }
  }
}
</script>

<style>
.footer {
  position: fixed;
  bottom: 0px;
  right: 20px;
  /*z-index: 999;*/
  /*float: right;*/
}
</style>