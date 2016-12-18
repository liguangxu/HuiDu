<template>
  <div class="history-content">
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
      <el-table :data="historyData" border>
        <el-table-column type="index" label="序号" width="140" align="center"></el-table-column>
        <el-table-column prop="spotid" label="监测点位" width="180" align="center"></el-table-column>
        <el-table-column prop="spotlocation" label="监测点名称" align="center"></el-table-column>
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
        <el-col :span="11">
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

export default {
  components: {
    'my-historycharts': MyHistoryCharts
  },
  data () {
    return {
      timegap: '',
      dataChartVisible: false,
      currentPage1: 1,
      apiUrl: 'api/history/enter',
      searchUrl: 'api/history/search',
      sendData_history: {
        userid: '',
        pagenum: '1',
        sceneid: '',
        factor: ''
      },
      sendData_historySearch: {
        id: '',
        begintime: '',
        endtime: ''
      },
      historyData: []
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
    viewHistoryData (row) {
      this.dataChartVisible = true
      this.$set(this.sendData_historySearch, 'id', row.channelid)
      // let myChart = echarts.init(document.getElementById('historydata-chart'))
      // var option = {
      //   title: {
      //     text: '未来一周气温变化',
      //     subtext: '纯属虚构'
      //   },
      //   tooltip: {
      //     trigger: 'axis'
      //   },
      //   legend: {
      //     data: ['最高气温', '最低气温']
      //   },
      //   toolbox: {
      //     show: true,
      //     feature: {
      //       mark: {show: true},
      //       dataView: {show: true, readOnly: false},
      //       magicType: {show: true, type: ['line', 'bar']},
      //       restore: {show: true},
      //       saveAsImage: {show: true}
      //     }
      //   },
      //   calculable: true,
      //   xAxis: [
      //     {
      //       type: 'category',
      //       boundaryGap: false,
      //       data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: 'value',
      //       axisLabel: {
      //         formatter: '{value} °C'
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name: '最高气温',
      //       type: 'line',
      //       data: [11, 11, 15, 13, 12, 13, 10],
      //       markPoint: {
      //         data: [
      //           { type: 'max', name: '最大值' },
      //           { type: 'min', name: '最小值' }
      //         ]
      //       },
      //       markLine: {
      //         data: [
      //           { type: 'average', name: '平均值' }
      //         ]
      //       }
      //     }
      //   ]
      // }
      // myChart.setOption(option)
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
        }
      }
      console.log('history sceneid : ' + sceneid)
      return sceneid
    },
    setSendData_history () {
      console.log('111111')
      let storage = window.localStorage
      let nowUser = storage.getItem('nowUser')
      let userid = null
      if (!(nowUser === null)) {
        userid = JSON.parse(nowUser)._id
      }
      this.$set(this.sendData_history, 'userid', userid)
      this.$set(this.sendData_history, 'sceneid', this.getSceneid())
    },
    getData () {
      console.log('2333333')
      this.setSendData_history()
      console.log('23333333333')
      this.$http.post(this.apiUrl, this.sendData_history)
          .then((response) => {
            console.log('response code : ')
            console.log(response)
            if (response.data.code === '0') {
              this.showError(response.data.data)
            } else {
              this.$set(this, 'historyData', response.data.data)
            }
          })
          .catch(function (response) {
            this.showError('网络断开，请稍后再试')
          })
    },
    searchHistoryData () {
      console.log('time gap : ')
      let begints = Math.round(this.timegap[0])
      let endts = Math.round(this.timegap[1])
      // let result = null
      let yData = []
      let xData = []
      console.log(begints)
      console.log(endts)
      this.$set(this.sendData_historySearch, 'begintime', begints)
      this.$set(this.sendData_historySearch, 'endtime', endts)
      console.log(this.sendData_historySearch)
      this.$http.post(this.searchUrl, this.sendData_historySearch)
          .then((response) => {
            console.log('response code : ')
            // console.log(response)
            if (response.data.code === '0') {
              this.showError(response.data.data)
            } else {
              // result = response.data.data
              // console.log('here 233333333333')
              console.log(response.data.data)
              for (var i = 0; i < response.data.data.length; i++) {
                let item = response.data.data[i]
                console.log(item)
                yData.push(item.value)
                xData.push(item.date)
              }
              // for (let i in response.data.data) {
              //   console.log(i.value)
              //   yData.push(i.value)
              // }
              console.log('here 233333333333')
              console.log(yData)
              console.log('here 22222222222')
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
            this.showError('网络断开，请稍后再试')
          })
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
  margin-top: 100px;
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