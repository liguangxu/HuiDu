<template>
	<div class="sidebar">
		<el-menu v-bind:default-active="path" class="sidebar" router>
      <template v-if="$route.path.indexOf('/main/realtime') === 0 || $route.path === '/main'">
        <div v-for="scene in sceneList">
          <el-menu-item v-bind:index="'/main/realtime/'+scene._id" class="sidebar-font">{{ scene.name }}</el-menu-item>
        </div>
     </template>
      <template v-if="$route.path.indexOf('/main/history') === 0">
        <div v-for="scene in historySceneList">
          <el-menu-item v-bind:index="'/main/history/'+scene._id" class="sidebar-font">{{ scene.name }}</el-menu-item>
        </div>
     </template>
     <template v-if="$route.path.indexOf('/main/systemCenter') === 0">
       <el-menu-item index="/main/systemCenter/systemMainConfig" class="sidebar-font">
          <i class="fa fa-home" aria-hidden="true"></i> 主界面配置
        </el-menu-item>
       <el-menu-item index="/main/systemCenter/systemIconConfig" class="sidebar-font">
          <i class="fa fa-picture-o" aria-hidden="true"></i> Icon库配置
        </el-menu-item>
     </template>
     <template v-if="$route.path.indexOf('/main/deviceCenter') === 0">
       <el-menu-item index="/main/deviceCenter/deviceSceneConfig" class="sidebar-font">
          <i class="fa fa-university" aria-hidden="true"></i> 场景配置</el-menu-item>
       <el-menu-item index="/main/deviceCenter/deviceChannelConfig" class="sidebar-font">
          <i class="fa fa-bars" aria-hidden="true"></i> 通道配置</el-menu-item>
     </template>
   </el-menu>
 </div>
</template>

<script>
import Util from '../utils/util.js'

export default {
  data () {
    return {
      path: this.getCurrentPath(),
      sceneList: this.getSceneList(),
      historySceneList: [],
      historySceneListGetBody: { userid: '' }
    }
  },
  methods: {
    getCurrentPath () {
      let currentPath = this.$route.path
      if (currentPath === '/main/deviceCenter') {
        currentPath = '/main/deviceCenter/deviceSceneConfig'
      }
      if (currentPath === '/main/systemCenter') {
        currentPath = '/main/systemCenter/systemMainConfig'
      }
      if (currentPath === '/main' || currentPath === '/main/realtime') {
        let sceneid = Util.getNowSceneid()
        if (sceneid != null) {
          if (Util.isInRealtimeScenes(sceneid)) {
            currentPath = '/main/realtime/' + sceneid
          } else {
            let temp = Util.getRealtimeFirstSceneid()
            currentPath = '/main/realtime/' + temp
            Util.setNowSceneid(temp, null)
          }
        }
      }
      if (currentPath === '/main/history') {
        let sceneid = Util.getNowSceneid()
        if (sceneid != null) {
          currentPath = '/main/history/' + sceneid
        }
      }
      return currentPath
    },
    getSceneList () {
      let storage = window.localStorage
      let nowUser = storage.getItem('nowUser')
      let sceneList = null
      // console.log(nowUser)
      if (!(nowUser === null)) {
        sceneList = JSON.parse(nowUser).sceneList
      }
      // console.log(sceneList)
      return sceneList
    },
    getHistorySceneList () {
      let storage = window.localStorage
      let nowUser = storage.getItem('nowUser')
      let userid = null
      if (!(nowUser === null)) {
        userid = JSON.parse(nowUser)._id
      }
      this.$set(this.historySceneListGetBody, 'userid', userid)
      this.$http.post(Util.historyApi.sceneListGet, this.historySceneListGetBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取历史场景失败', response.data.data)
            } else {
              console.log(response.data)
              this.$set(this, 'historySceneList', response.data.data)
            }
          })
          .catch(function (response) {
            Util.showError('获取历史场景失败', '网络断开，请稍后再试')
          })
    }
  },
  mounted: function () {
    this.getHistorySceneList()
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.sidebar {
  position: absolute;
  top: 30px;
  bottom: 0;
  width: 200px;
}
.sidebar-font {
  font-size: 16px;
}
.sidebar-bg {
  top: 30px;
  width: 100%;
  height: 100%;
  /*background: #8492A6;*/
}

</style>