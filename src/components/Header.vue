<template>
	<div>
		<div class="navbar">
			<el-menu theme="dark" class="header" v-bind:default-active="path" mode="horizontal" router>
					<el-menu-item index="0" class="navbar-logo navbar-font">蓝丰科技工业物联网监控云平台</el-menu-item>
				<div class="navbar-item">
					<el-menu-item v-if="1" index="/main/realtime" class="navbar-font">
						<i class="fa fa-video-camera" aria-hidden="true"></i> 实时监控
					</el-menu-item>
					<el-menu-item v-if="1" index="/main/history" class="navbar-font">
						<i class="fa fa-history" aria-hidden="true"></i> 历史数据
					</el-menu-item>
					<el-menu-item v-if="level < 2" index="/main/userCenter" class="navbar-font">
						<i class="fa fa-users" aria-hidden="true"></i> 用户中心
					</el-menu-item>
					<el-menu-item v-if="level < 3" index="/main/deviceCenter" class="navbar-font">
						<i class="fa fa-microchip" aria-hidden="true"></i> 设备中心
					</el-menu-item>
					<el-menu-item v-if="level < 2" index="/main/systemCenter" class="navbar-font">
						<i class="fa fa-cog" aria-hidden="true"></i> 系统管理
					</el-menu-item>
          <el-menu-item index="/" class="navbar-font">
            <el-button type="danger" @click="logout">退出</el-button>
          </el-menu-item>
				</div>
			</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      // path: this.$route.path === '/main' ? '/main/realtime' : this.$route.path
      path: this.getCurrentPath(),
      level: this.getLevel()
    }
  },
  methods: {
    getCurrentPath () {
      let currentPath = ''
      if (this.$route.path === '/main') {
        currentPath = '/main/realtime'
      } else {
        let arrays = this.$route.path.split('/')
        currentPath = arrays[0] + '/' + arrays[1] + '/' + arrays[2]
      }
      return currentPath
    },
    getLevel () {
      let storage = window.localStorage
      let level = 3
      let nowUser = storage.getItem('nowUser')
      if (!(nowUser === null)) {
        level = JSON.parse(nowUser).level
      }
      console.log('level : ' + level)
      return level
    },
    logout () {
      window.localStorage.clear()
      this.$router.push({path: '/'})
    }
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
  min-width: 1024px;
}
.header {
  background-color: #1F2D3D;
}
.navbar-logo {	
  pointer-events: none; 
}
.navbar-font {
  font-size: 18px;
}
.navbar-item {
  float: right;
}
</style>