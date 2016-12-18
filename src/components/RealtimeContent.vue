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
        <my-factor></my-factor>
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
						<my-realtimetable></my-realtimetable>
            <!-- <transition> -->
					</el-tab-pane>
					<el-tab-pane label="图标">图标</el-tab-pane>
					<el-tab-pane label="场景">场景</el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col :span="2"></el-col>
		</el-row>
		<br>
		<div class="block">
			<el-pagination :page-size="8" layout="prev, pager, next, jumper" :total="1000">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import MyRealtimeTable from './RealtimeTable.vue'
import MyFactor from './Factor.vue'

export default {
  data () {
    return {
      list: [{}]
    }
  },
  components: {
    'my-realtimetable': MyRealtimeTable,
    'my-factor': MyFactor
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
    }
  },
  filters: {
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