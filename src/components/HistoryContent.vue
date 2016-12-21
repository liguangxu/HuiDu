<template>
  <div class="history-content">
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
      <br>
      <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
      <el-pagination
        :current-page="currentPage1"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
      </el-col>

      <el-dialog title="查看历史数据" v-model="dataChartVisible">
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
          <!-- <my-historycharts></my-historycharts> -->
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
      timegap: '',
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
      historyData: []
    }
  },
  methods: {
    viewHistoryData (row) {
      this.dataChartVisible = true
      this.$set(this.historySearchBody, 'channel_id', row.channel_id)
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
      this.setHistoryEnterBody()
      this.$http.post(Util.historyApi.enter, this.historyEnterBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取历史数据失败', response.data.data)
            } else {
              this.$set(this, 'historyData', response.data.data)
              console.log('history sidebar : ----------------------')
              console.log(response.data)
            }
          })
          .catch(function (response) {
            Util.showError('获取历史数据失败', '网络断开，请稍后再试')
          })
    },
    searchHistoryData () {
      let begints = Math.round(this.timegap[0])
      let endts = Math.round(this.timegap[1])
      let yData = []
      let xData = []
      this.$set(this.historySearchBody, 'begintime', begints)
      this.$set(this.historySearchBody, 'endtime', endts)
      console.log('historySearchBody------------------')
      console.log(this.historySearchBody)
      this.$http.post(Util.historyApi.search, this.historySearchBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取阶段历史数据失败', response.data.data)
            } else {
              for (var i = 0; i < response.data.data.length; i++) {
                let item = response.data.data[i]
                yData.push(item.value)
                xData.push(item.date)
              }
              let myChart = echarts.init(document.getElementById('historydata-chart'))
              var option = {
                title: {
                  text: '折线图'
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
              myChart.setOption(option)
            }
          })
          .catch(function (response) {
            Util.showError('获取阶段历史数据失败', '网络断开，请稍后再试')
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