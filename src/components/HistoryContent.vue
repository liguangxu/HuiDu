<template>
  <div v-loading.body="loading" class="history-content">
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
      <el-table :data="historyData" border>
        <el-table-column type="index" label="序号" width="140" align="center"></el-table-column>
        <el-table-column prop="spotid" label="监测点位" width="180" align="center"></el-table-column>
        <el-table-column prop="spotlocation" label="监测点名称" width="180" align="center"></el-table-column>
        <el-table-column prop="userdesc" label="监测因子" align="center"></el-table-column>
        <el-table-column :context="_self" inline-template label="操作" align="center">
          <div id="historydatabtn">
            <el-button size="small" type="info" @click="viewHistoryData(row)">查看数据
            </el-button>
          </div>
        </el-table-column>
      </el-table>
      </el-col>
      </el-row>
      <!-- <el-dialog title="查看历史数据" v-model="dataChartVisible">
      <el-row>
        <el-col :span="14">
          <div class="block">
          <el-date-picker v-model="timegap" type="datetimerange" placeholder="选择时间范围"style="width:350px">
          </el-date-picker>
          </div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="searchHistoryData">查询</el-button>
          </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <div id="historydata-chart">
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dataChartVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataChartVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->

    <el-dialog title="查看历史数据" v-model="dataChartVisible">
      <el-row>
        <el-col :span="20" style="text-align:left;">
          <div>
          <span class="demonstration">选择开始时间：</span>
          <el-date-picker v-model="selectedStarttime" type="datetime" placeholder="选择开始时间"style="width:350px">
          </el-date-picker>
          </div>
          </el-col>
          </el-row>
          <el-row><br>
          <el-col :span="20" style="text-align:left;">
          <div>
          <span>选择结束时间：</span>
          <el-date-picker v-model="selectedEndtime" type="datetime" placeholder="选择结束时间"style="width:350px">
          </el-date-picker>
          </div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" style="width:100%" @click="searchHistoryData">点击查询</el-button>
          </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <div id="historydata-chart">
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dataChartVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataChartVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    </div>
</template>

<script>
import MyHistoryCharts from './HistoryCharts.vue'
import echarts from 'echarts'
import Util from '../utils/util.js'

export default {
  components: {
    'my-historycharts': MyHistoryCharts
  },
  data () {
    return {
      loading: false,
      timegap: '',
      selectedStarttime: '',
      selectedEndtime: '',
      dataChartVisible: false,
      currentPage1: 1,
      historyEnterBody: {
        userid: '',
        pagenum: '1',
        sceneid: '',
        factor: ''
      },
      historySearchBody: {
        channel_id: '',
        begintime: '',
        endtime: ''
      },
      historyData: [],
      myChart: null,
      defaultOptions: {
        title: {
          text: '历史数据查询'
        },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '',
          type: 'line',
          data: []
        }]
      }
    }
  },
  methods: {
    getDefaultTimeGap () {
      let end = new Date()
      let start = new Date() - parseInt(60 * 10 * 1000)
      let array = []
      array.push(start)
      array.push(end)
      console.log('default time------')
      console.log(array)
      return array
    },
    viewHistoryData (row) {
      this.dataChartVisible = true
      // this.myChart = null
      // this.myChart.setOption(null)
      if (this.myChart !== null) {
        this.myChart.clear()
      }
      this.$set(this.historySearchBody, 'channel_id', row.channel_id)
      this.$set(this, 'timegap', this.getDefaultTimeGap())
      this.$set(this, 'selectedStarttime', this.getDefaultTimeGap()[0])
      this.$set(this, 'selectedEndtime', this.getDefaultTimeGap()[1])
    },
    setHistoryEnterBody () {
      console.log('111111')
      let userid = null
      let nowUser = Util.localStorageGet('nowUser')
      if (nowUser != null) {
        userid = nowUser._id
      }
      let sceneid = Util.getNowSceneid()
      this.$set(this.historyEnterBody, 'userid', userid)
      this.$set(this.historyEnterBody, 'sceneid', sceneid)
    },
    getData () {
      this.loading = true
      this.setHistoryEnterBody()
      this.$http.post(Util.historyApi.enter, this.historyEnterBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取历史数据失败', response.data.data)
            } else {
              this.$set(this, 'historyData', response.data.data)
              console.log('history sidebar : ----------------------')
              console.log(response.data)
              this.loading = false
            }
          })
          .catch(function (response) {
            Util.showError('获取历史数据失败', '网络断开，请稍后再试')
          })
    },
    searchHistoryData () {
      let begints = Math.round(this.selectedStarttime)
      let endts = Math.round(this.selectedEndtime)
      let yData = []
      let xData = []
      this.$set(this.historySearchBody, 'begintime', begints)
      this.$set(this.historySearchBody, 'endtime', endts)
      console.log('historySearchBody------------------')
      console.log(this.selectedStarttime)
      console.log(this.selectedEndtime)
      console.log(this.historySearchBody)
      if (this.myChart !== null) {
        this.myChart.showLoading()
      } else {
        this.myChart = echarts.init(document.getElementById('historydata-chart'))
        this.myChart.showLoading()
      }
      this.$http.post(Util.historyApi.search, this.historySearchBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取阶段历史数据失败', response.data.data)
              this.myChart.hideLoading()
            } else {
              for (var i = 0; i < response.data.data.length; i++) {
                let item = response.data.data[i]
                yData.push(item.value)
                xData.push(item.date)
              }
              if (this.myChart === null) {
                this.myChart = echarts.init(document.getElementById('historydata-chart'))
              }
              this.myChart.hideLoading()
              var option = {
                title: {
                  text: '历史数据查询'
                },
                tooltip: {
                  trigger: 'axis'
                },
                calculable: true,
                xAxis: [
                  {
                    type: 'category',
                    boundaryGap: false,
                    data: xData
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    axisLabel: {
                      formatter: '{value}'
                    }
                  }
                ],
                series: [
                  {
                    name: '',
                    type: 'line',
                    data: yData,
                    markPoint: {
                      data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                      ]
                    },
                    markLine: {
                      data: [
                        { type: 'average', name: '平均值' }
                      ]
                    }
                  }
                ]
              }
              this.myChart.clear()
              this.myChart.setOption(option, true)
            }
          })
          .catch(function (response) {
            Util.showError('获取阶段历史数据失败', '网络断开，请稍后再试')
            this.myChart.hideLoading()
          })
    },
    handleRouteChange () {
      let sceneid = this.$route.params.sceneid
      Util.setNowSceneid(sceneid, null)
      this.getData()
    }
  },
  watch: {
    $route () {
      this.handleRouteChange()
    }
  },
  mounted: function () {
    console.log('history getData here-------')
    this.getData()
  }
}
</script>

<style scoped>
.history-content {
  margin-left: 200px;
  margin-top: 20px;
  min-width: 1024px;
}
#historydata-chart {
 /* position: absolute;
  top:70px;
  right: 100px;*/
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  height: 500px;
  text-align: center;
  /*border: 2px solid yellow;*/
}
</style>