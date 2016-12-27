<template>
	<div class="realtime-content">
    <template v-for="l in list">
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="18" class="realtime-time"><i class="el-icon-time"></i> 当前时间： {{ l.currentTime }}</el-col>
    </el-row>
    </template>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20" class="realtime-factor">
        <my-factor :factors="factors"></my-factor>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
    </el-row>
		<!-- <div class="realtime-factor"> -->
    <!-- <my-factor></my-factor> -->
    <!-- </div> -->
    <el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="20">
				<el-tabs type="card" class="realtime-form">
					<el-tab-pane label="表格">
          <!-- <transition> -->
						<my-realtimetable :tableData="tableData" :loading="loading"></my-realtimetable>
            <!-- <transition> -->
					</el-tab-pane>
					<el-tab-pane label="图标">
            <my-realtimeicon :iconData="iconData"></my-realtimeicon>
          </el-tab-pane>
					<el-tab-pane label="场景">
            <my-realtimescene :sceneData="sceneData"></my-realtimescene>     
          </el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col :span="2"></el-col>
		</el-row>
		<br>
		<div class="block">
			<!-- <el-pagination :page-size="8" layout="prev, pager, next, jumper" :total="1000">
			</el-pagination> -->
		</div>
	</div>
</template>

<script>
import MyRealtimeTable from './RealtimeTable.vue'
import MyRealtimeIcon from './RealtimeIcon.vue'
import MyRealtimeScene from './RealtimeScene.vue'
import MyFactor from './Factor.vue'
import Util from '../utils/util.js'
import { bus } from '../utils/bus.js'

export default {
  data () {
    return {
      loading: false,
      intervalid: '',
      list: [{}],
      tableData: [],
      iconData: [],
      sceneData: '',
      factors: [],
      nowFactor: '',
      hasSendFactors: false,
      realtimeGetBody: {
        userid: '',
        pagenum: '1',
        sceneid: '',
        factor: ''
      },
      controlBody: { channel_id: '', value: '' }
    }
  },
  components: {
    'my-realtimetable': MyRealtimeTable,
    'my-factor': MyFactor,
    'my-realtimeicon': MyRealtimeIcon,
    'my-realtimescene': MyRealtimeScene
  },
  methods: {
    formatTime () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      return (year + ' 年 ' + month + ' 月 ' + day + ' 日 ' + hour + ' 时 ' + minute + ' 分 ' + second + ' 秒 ')
    },
    setRealtimeGetBody () {
      let userid = null
      let nowUser = Util.localStorageGet('nowUser')
      if (nowUser != null) {
        userid = nowUser._id
      }
      let sceneid = Util.getNowSceneid()
      console.log('sceneid----------------')
      console.log(sceneid)
      this.$set(this.realtimeGetBody, 'userid', userid)
      this.$set(this.realtimeGetBody, 'sceneid', sceneid)
      this.$set(this.realtimeGetBody, 'factor', this.nowFactor)
      let sceneImg = Util.getRealtimeSceneImg(sceneid)
      this.$set(this, 'sceneData', sceneImg)
      console.log('sceneData----------------')
      console.log(this.sceneData)
    },
    getData () {
      this.setRealtimeGetBody()
      console.log('realtimeGetBody---------------')
      console.log(this.realtimeGetBody)
      if (this.realtimeGetBody.sceneid !== null) {
        this.loading = true
        this.$http.post(Util.realtimeApi.get, this.realtimeGetBody)
          .then((response) => {
            console.log('response code : ')
            console.log(response)
            if (response.data.code === '0') {
              Util.showError('获取实时监控数据失败', response.data.data)
            } else {
              console.log('realtimeGetBack---------------')
              console.log(response.data)
              this.$set(this, 'tableData', response.data.data)
              this.$set(this, 'iconData', response.data.data)
              if (!this.hasSendFactors) {
                this.$set(this, 'factors', response.data.factorList)
                this.hasSendFactors = true
              }
              this.loading = false
              // Util.setFactors(response.data.factorList)
              // bus.$emit('factorsUpdate', response.data.factorList)
            }
          })
          .catch(function (response) {
            Util.showError('获取实时监控数据失败', '网络断开，请稍后再试')
          })
      }
    },
    handleRouteChange () {
      let sceneid = this.$route.params.sceneid
      Util.setNowSceneid(sceneid, null)
      this.nowFactor = ''
      this.hasSendFactors = false
      this.getData()
    },
    updateCurrentFactor (currentFactor) {
      this.$set(this, 'nowFactor', currentFactor)
      this.getData()
    }
  },
  watch: {
    $route () {
      this.handleRouteChange()
    }
  },
  mounted: function () {
    console.log('getData here-------')
    this.getData()
    this.intervalid = setInterval(() => {
      this.getData()
    }, 30000)
    bus.$on('currentFactor', this.updateCurrentFactor)
  },
  // beforeUpdate: function () {
  //   let self = this
  //   setInterval(function () {
  //     self.getData()
  //   }, 3000)
  // },
  beforeDestroy: function () {
    clearInterval(this.intervalid)
  },
  created: function () {
    let self = this
    setInterval(function () {
      for (let i in self.list) {
        self.$set(self.list[i], 'currentTime', self.formatTime())
      }
    }, 1000)
  }
}
</script>

<style>
.realtime-content {
  margin-left: 200px;
  min-width: 1024px;
}
.realtime-form {
  margin-top: 20px;
  width: 100%;
}
.realtime-factor {
  text-align: center;
  /*margin-top: 20px;*/
  /*position: relative;
  top: 120px;
  left: 200px;
  right: 0;
  width: 100%;
  height: 64px;
  text-align: center;
  background-color: red;*/
}
.realtime-time {
  margin-top: 10px;
  margin-bottom: 40px;
  /*position: fixed;
  top: 100px;*/
  /*left: 220px;
  width: 100%;*/
  font-size: 21px;
  text-align: left;
}	
</style>