<template>
  <div class="content">
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="3">通道列表</el-col>
      <el-col :span="2">
        <el-button size="large" type="primary" @click="openAddChannelForm">新 增
        </el-button>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
      <el-table :data="tableData" stripe border>
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="devicetype" label="设备类型" width="100" align="center"></el-table-column>
        <el-table-column prop="deviceid" label="设备编号" width="100" align="center"></el-table-column>
        <el-table-column prop="channelid" label="通道编号" width="180" align="center"></el-table-column>
        <el-table-column prop="userdesc" label="监测因子" width="100" align="center"></el-table-column>
        <el-table-column prop="userunit" label="监测因子单位" width="100" align="center"></el-table-column>
        <el-table-column prop="usermaxdata" label="用户定义最大值" width="100" align="center"></el-table-column>
        <el-table-column prop="usermindata" label="用户定义最小值" width="100" align="center"></el-table-column>
        <el-table-column prop="sceneid" label="所属场景" width="100" align="center"></el-table-column>
        <el-table-column prop="spotlocation" label="所属监控点" width="120" align="center"></el-table-column>
        <el-table-column prop="active" inline-template label="是否挂载" align="center">
          <span>{{ row.active | isActiveShow }}</span>
        </el-table-column>
        <el-table-column :context="_self" inline-template label="操作" width="160" fixed="right" align="center">
          <div>
            <el-button size="small" type="primary" @click="openUpdateChannelForm(row)">修改</el-button>
            <el-button size="small" type="danger" @click="">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
    </el-row>

    <el-dialog title="新增通道" v-model="addChannelFormVisible">
      <el-form :model="addChannelForm" label-position="top">
      <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="10">
        <el-form-item label="设备类型">
          <el-input v-model="addChannelForm.devicetype" placeholder="请输入设备类型"></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="addChannelForm.deviceid" placeholder="请输入设备编号"></el-input>
        </el-form-item>
        <el-form-item label="通道编号">
          <el-input v-model="addChannelForm.channelid" placeholder="请输入通道编号"></el-input>
        </el-form-item>
        <el-form-item label="监测因子">
          <el-input v-model="addChannelForm.userdesc" placeholder="请输入监测因子"></el-input>
        </el-form-item>
        <el-form-item label="所属场景">
          <el-select v-model="addChannelForm.sceneid" @change="setSpotOptions">
            <el-option
              v-for="item in sceneOptions"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="10">
        <el-form-item label="监测因子单位">
          <el-input v-model="addChannelForm.userunit" placeholder="请输入监测因子单位">
          </el-input>
        </el-form-item>
        <el-form-item label="监测因子图标">
          <el-input v-model="addChannelForm.smallicon" placeholder="请输入监测因子图标" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="用户定义最大值">
          <el-input v-model="addChannelForm.usermaxdata" placeholder="请输入自定义最大值">
          </el-input>
        </el-form-item>
        <el-form-item label="用户定义最小值">
          <el-input v-model="addChannelForm.usermindata" placeholder="请输入自定义最小值">
          </el-input>
        </el-form-item>
         <el-form-item label="所属监测点">
          <el-select v-model="addChannelForm.spotid" filterable placeholder="请选择所属监测点">
            <el-option
              v-for="item2 in spotOptions"
              :label="item2.spotlocation"
              :value="item2.spotid">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addChannelFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddChannelForm">确定并挂载</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改通道" v-model="updateChannelFormVisible">
      <el-form :model="updateChannelForm" label-position="top">
      <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="10">
        <el-form-item label="设备类型">
          <el-input v-model="updateChannelForm.devicetype" placeholder="请输入设备类型"></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="updateChannelForm.deviceid" placeholder="请输入设备编号"></el-input>
        </el-form-item>
        <el-form-item label="通道编号">
          <el-input v-model="updateChannelForm.channelid" placeholder="请输入通道编号"></el-input>
        </el-form-item>
        <el-form-item label="监测因子">
          <el-input v-model="updateChannelForm.userdesc" placeholder="请输入监测因子"></el-input>
        </el-form-item>
        <el-form-item label="所属场景">
          <el-select v-model="updateChannelForm.sceneid" @change="setSpotOptions" placeholder="请选择所属场景">
            <el-option
              v-for="item3 in sceneOptions"
              :label="item3.name"
              :value="item3._id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="10">
        <el-form-item label="监测因子单位">
          <el-input v-model="updateChannelForm.userunit" placeholder="请输入监测因子单位">
          </el-input>
        </el-form-item>
        <el-form-item label="监测因子图标">
          <el-input v-model="updateChannelForm.smallicon" placeholder="请输入监测因子图标" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="用户定义最大值">
          <el-input v-model="updateChannelForm.usermaxdata" placeholder="请输入自定义最大值">
          </el-input>
        </el-form-item>
        <el-form-item label="用户定义最小值">
          <el-input v-model="updateChannelForm.usermindata" placeholder="请输入自定义最小值">
          </el-input>
        </el-form-item>
         <el-form-item label="所属监测点">
          <el-select v-model="updateChannelForm.spotid" filterable placeholder="请选择所属监测点">
            <el-option
              v-for="item4 in spotOptions"
              :label="item4.spotlocation"
              :value="item4.spotid">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateChannelFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateChannelFormVisible = false">确定并挂载</el-button>
      </div>
    </el-dialog>
  </div>  
</template>
<script>
import Util from '../utils/util.js'

export default {
  data () {
    return {
      active: 0,
      addChannelFormVisible: false,
      updateChannelFormVisible: false,
      formLabelWidth: '120px',
      addChannelForm: {
        sceneid: '',
        name: '',
        spotid: ''
      },
      updateChannelForm: {
        sceneid: '',
        name: '',
        spotid: ''
      },
      tableData: [],
      channelGetBody: '',
      sceneOptions: [],
      spotOptions: [],
      sceneGetBody: { companyid: '' },
      spotGetBody: ''
    }
  },
  filters: {
    isActiveShow (active) {
      let result = null
      if (active === '1') {
        result = '已挂载'
      }
      if (active === '0') {
        result = '未挂载'
      }
      return result
    }
  },
  methods: {
    getChannelData () {
      let nowUser = Util.localStorageGet('nowUser')
      let userid = nowUser === null ? null : nowUser._id
      this.$set(this, 'channelGetBody', userid)
      this.$http.post(Util.deviceApi.channelGet, this.channelGetBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取通道数据失败', response.data.data)
            } else {
              this.$set(this, 'tableData', response.data.data)
              console.log(response.data.data)
            }
          })
          .catch(function (response) {
            Util.showError('获取通道数据失败', '网络错误，请稍后重试')
          })
    },
    setSceneOptions () {
      let level = Util.getNowLevel()
      if (level !== 0) {
        let nowUser = Util.localStorageGet('nowUser')
        let companyid = nowUser === null ? null : nowUser.companyid
        this.$set(this.sceneGetBody, 'companyid', companyid)
      } else {
        this.$set(this.sceneGetBody, 'companyid', '')
      }
      this.$http.post(Util.deviceApi.sceneGet, this.sceneGetBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取场景数据失败', response.data.data)
            } else {
              this.$set(this, 'sceneOptions', response.data.data)
            }
          })
          .catch(function (response) {
            Util.showError('获取场景数据失败', '网络错误，请稍后重试')
          })
    },
    setSpotOptions (sceneid) {
      this.$set(this, 'spotGetBody', sceneid)
      console.log('get spot here------------')
      console.log(this.spotGetBody)
      this.$http.post(Util.deviceApi.channelSpotGet, this.spotGetBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取可用监测点数据失败', response.data.data)
            } else {
              this.$set(this, 'spotOptions', response.data.data)
              console.log(response.data)
            }
          })
          .catch(function (response) {
            Util.showError('获取可用监测点数据失败', '网络错误，请稍后重试')
          })
    },
    openAddChannelForm () {
      this.addChannelFormVisible = true
      this.setSceneOptions()
    },
    handleAddChannelForm () {
      this.$http.post(Util.deviceApi.channelAdd, this.addChannelForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('添加通道失败', response.data.data)
            } else {
              this.getChannelData()
            }
          })
          .catch(function (response) {
            Util.showError('添加通道失败', '网络错误，请稍后重试')
          })
    },
    openUpdateChannelForm (row) {
      this.updateChannelFormVisible = true
      this.sceneOptions = []
      this.$set(this.updateChannelForm, 'devicetype', row.devicetype)
      this.$set(this.updateChannelForm, 'deviceid', row.deviceid)
      this.$set(this.updateChannelForm, 'channelid', row.channelid)
      this.$set(this.updateChannelForm, 'userdesc', row.userdesc)
      this.$set(this.updateChannelForm, 'userunit', row.userunit)
      this.$set(this.updateChannelForm, 'usermaxdata', row.usermaxdata)
      this.$set(this.updateChannelForm, 'usermindata', row.usermindata)
      this.setSceneOptions()
    },
    channelUpdate (row) {
      this.updateChannelFormVisible = true
    }
  },
  mounted: function () {
    console.log('get Channel Data here-------')
    this.getChannelData()
  }
}
</script>

<style scoped>
.content {
  font-size: 20px;
  color: #8492A6;
  margin-top: 20px;
  margin-left: 200px;
  text-align: left;
  /*background-color: #20A0FF;*/
}
.submit-button {
  width: 100%;
}
</style>