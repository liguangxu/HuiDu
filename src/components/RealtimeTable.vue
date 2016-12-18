<template>
	<el-table :data="tableData" border>
		<el-table-column type="index" label="序号" width="80" align="center">
		</el-table-column>
    <el-table-column prop="spotid" label="监测点位" width="100" align="center">
    </el-table-column>
		<el-table-column prop="spotlocation" label="监测点名称" width="200" align="center">
		</el-table-column>
		<el-table-column prop="userdesc" label="监测因子" width="120" align="center">
		</el-table-column>
		<el-table-column prop="value" label="监测值" width="100" align="center">
		</el-table-column>
    <el-table-column prop="unit" label="监测单位" width="100" align="center">
    </el-table-column>
		<el-table-column prop="timestamp" inline-template label="获取时间" width="200" 
    align="center">
    <span>{{ row.timestamp | parseTime }}</span>
		</el-table-column>
		<el-table-column prop="isOn" inline-template label="设备状态" align="center">
    <span>{{ row.isOn | isOnShow }}</span>
		</el-table-column>
    <el-table-column :context="_self" inline-template label="开关控制" align="center">
      <el-switch @change="" v-bind:v-model="row.value === '1'" on-text="开" off-text="关" off-color="#ff4949"
        v-bind:disabled="row.datatype === 'DI'">
      </el-switch>
    </el-table-column>
	</el-table>
</template>

<script>
export default {
  data () {
    return {
      sceneid: this.getSceneid(),
      tableData: [],
      apiUrl: 'api/realtime/get',
      sendData_realtime: {
        userid: '',
        pagenum: '1',
        sceneid: '',
        factor: ''
      }
    }
  },
  filters: {
    isOnShow (isOn) {
      let result = null
      if (isOn === 'true') {
        result = '在线'
      }
      if (isOn === 'false') {
        result = '离线'
      }
      return result
    },
    parseTime (timestamp) {
      if (timestamp === null) {
        return null
      } else {
        let datetime = new Date()
        datetime.setTime(timestamp)
        let year = datetime.getFullYear()
        let month = datetime.getMonth() + 1
        let date = datetime.getDate()
        let hour = datetime.getHours()
        let minute = datetime.getMinutes()
        let second = datetime.getSeconds()
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
      }
    },
    string2Bool (str) {
      if (str === '1') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    showError (info) {
      this.$notify.error({
        title: '请求失败',
        message: info,
        offset: 100
      })
    },
    getSceneid () {
      let sceneid = this.$route.params.sceneid
      if (sceneid === null || sceneid === undefined) {
        let storage = window.localStorage
        let nowUser = storage.getItem('nowUser')
        if (!(nowUser === null)) {
          let sceneList = JSON.parse(nowUser).sceneList
          if (sceneList != null && sceneList.length > 0) {
            sceneid = JSON.parse(nowUser).sceneList[0]._id
          } else {
            sceneid = null
          }
          // console.log(sceneid)
        }
      }
      console.log('sceneid : ' + sceneid)
      return sceneid
    },
    getApiUrl () {
      return '../../static/json/realtime' + this.getSceneid() + '.json'
    },
    setSceneid () {
      let sceneid = this.$route.params.sceneid
      if (sceneid === null || sceneid === undefined) {
        let storage = window.localStorage
        let nowUser = storage.getItem('nowUser')
        if (!(nowUser === null)) {
          sceneid = JSON.parse(nowUser).sceneList[0].sceneid
        }
      }
      this.$set(this.sendData_realtime, 'sceneid', sceneid)
      // this.$set(this, 'apiUrl', '../../static/json/realtime' + sceneid + '.json')
    },
    setSendData_realtime () {
      let storage = window.localStorage
      let nowUser = storage.getItem('nowUser')
      let userid = null
      if (!(nowUser === null)) {
        userid = JSON.parse(nowUser)._id
      }
      this.$set(this.sendData_realtime, 'userid', userid)
      this.$set(this.sendData_realtime, 'sceneid', this.getSceneid())
    },
    getData () {
      this.setSendData_realtime()
      this.$http.post(this.apiUrl, this.sendData_realtime)
          .then((response) => {
            console.log('response code : ')
            console.log(response)
            if (response.data.code === '0') {
              this.showError(response.data.data)
            } else {
              this.$set(this, 'tableData', response.data.data)
            }
          })
          .catch(function (response) {
            this.showError('网络断开，请稍后再试')
          })
      // this.$http.get(this.apiUrl)
      //     .then((response) => {
      //       console.log('realtime sceneid : ')
      //       console.log(this.sceneid)
      //       console.log('realtime data : ')
      //       console.log(response)
      //       if (response.data.code === '0') {
      //         console.log('realtime data read: error')
      //       } else {
      //         this.$set(this, 'tableData', response.data.data)
      //       }
      //     })
    }
  },
  watch: {
    $route () {
      // this.setSceneid()
      this.getData()
    }
  },
  mounted: function () {
    console.log('getData here-------')
    this.getData()
  }
}
</script>