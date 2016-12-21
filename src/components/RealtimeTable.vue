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
      <!-- <el-switch @change="" v-bind:v-model="row.value === '1'" on-text="开" off-text="关" off-color="#ff4949"
        v-bind:disabled="row.datatype === 'DI'">
      </el-switch> -->
      <el-button type="primary" size="small" @click="control(row)" 
      v-bind:disabled="row.datatype === 'DI'">
      {{ row.value | valueShow }}</el-button>
    </el-table-column>
	</el-table>
</template>

<script>
import Util from '../utils/util.js'
import { bus } from '../utils/bus.js'

export default {
  data () {
    return {
      tableData: [],
      realtimeGetBody: {
        userid: '',
        pagenum: '1',
        sceneid: '',
        factor: ''
      },
      controlBody: { channel_id: '', value: '' }
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
    valueShow (value) {
      let result = '打开'
      if (value === '1') {
        result = '关闭'
      }
      if (value === '0') {
        result = '打开'
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
    },
    getData () {
      this.setRealtimeGetBody()
      console.log('realtimeGetBody---------------')
      console.log(this.realtimeGetBody)
      if (this.realtimeGetBody.sceneid !== null) {
        this.$http.post(Util.realtimeApi.get, this.realtimeGetBody)
          .then((response) => {
            console.log('response code : ')
            console.log(response)
            if (response.data.code === '0') {
              Util.showError('获取实时监控数据失败', response.data.data)
            } else {
              this.$set(this, 'tableData', response.data.data)
              Util.setFactors(response.data.factorList)
              bus.$emit('factorsUpdate', response.data.factorList)
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
      this.getData()
    },
    control (row) {
      this.$set(this.controlBody, 'channel_id', row.channel_id)
      let value = '1'
      if (row.value === '0') {
        value = '1'
      } else {
        value = '0'
      }
      this.$set(this.controlBody, 'value', value)
      console.log('controlBody--------------------')
      console.log(this.controlBody)
      this.$http.post(Util.realtimeApi.control, this.controlBody)
          .then((response) => {
            console.log('response code : ')
            console.log(response)
            if (response.data.code === '0') {
              Util.showError('控制失败', response.data.data)
            } else {
              Util.showInfo('控制消息发送成功', '请等待结果')
              this.getData()
              // this.$set(this, 'tableData', response.data.data)
              // Util.setFactors(response.data.factorList)
              // bus.$emit('factorsUpdate', response.data.factorList)
            }
          })
          .catch(function (response) {
            Util.showError('控制失败', '网络断开，请稍后再试')
          })
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
  }
}
</script>