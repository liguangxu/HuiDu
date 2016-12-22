<template>
  <div>
    <div v-for="item in iconData" class="realtime-icon">
    <div class="grid-content bg-purple-dark">
      <el-tooltip placement="right" effect="light">
      <img src="../../static/image/realtime/circle.png" height="128" width="128">
      <span id="factor1-value">{{ item.value }}{{ item.userunit }}</span>
      <span id="factor1-factor">{{ item.userdesc }}</span>
      <span id="factor1-name">{{ item.spotlocation }}</span>
      <div slot="content">
        <span id="tooltipdesc">监测点名称:{{ item.spotlocation }}</span><br/>
        <span id="tooltipdesc">监测因子:{{ item.userdesc }}</span><br/>
        <span id="tooltipdesc">监测值:{{ item.value }}</span><br/>
        <span id="tooltipdesc">获取时间:{{ item.timestamp | parseTime }}</span><br/>
        <span id="tooltipdesc">设备状态:{{ item.isOn | isOnShow }}</span>
      </div>
    </el-tooltip>
    </div>
    </div>
  </div>  
</template>

<script>
export default {
  data () {
    return {
      // items: [1, 2, 3, 4, 5, 6],
    }
  },
  props: ['iconData'],
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
  }
}
</script>

<style scoped>
#realtime-icon {
  /*float: left;*/
  /*padding: 10px;*/
  width: 100%;
  /*position: absolute;*/
  /*width: 130px;*/
  /*height: 160px;*/
  /*border: 2px solid red;*/
}
#factor1-value {
  position: absolute;
  display: inline-block;
  top:20px;
  left:12px;
  width: 100px;
  line-height: 30px;
  font-size: 25px;
  text-align: center;
  overflow: hidden;
  /*border: 1px solid red;*/
}
#factor1-factor {
  position: absolute;
  display: inline-block;
  bottom:20px;
  left: 12px;
  width: 100px;
  line-height: 30px;
  font-size: 20px;
  text-align: center;
  overflow: hidden;
}
#factor1-name {
  position: absolute;
  display: inline-block;
  bottom:-30px;
  left: 12px;
  width: 100px;
  line-height: 30px;
  font-size: 20px;
  text-align: center;
  overflow: hidden;
}
#tooltipdesc {
  display: inline-block;
  font-size: 10px;
  line-height: 20px;
}
.grid-content {
  margin-bottom: 30px;
  margin-right: 50px;
  /*margin-bottom: 30px;*/
  border-radius: 4px;
  min-height: 180px;
  height: 180px;
  width: 180px;
  float: left;
  /*padding: 10px;*/
}
.bg-purple-dark {
    /*background: #99a9bf;*/
}
</style>