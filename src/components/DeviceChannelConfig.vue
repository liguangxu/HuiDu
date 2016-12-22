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
        <el-table-column prop="portidx" label="通道编号" width="180" align="center"></el-table-column>
        <el-table-column prop="userdesc" label="监测因子" width="100" align="center"></el-table-column>
        <el-table-column prop="userunit" label="监测因子单位" width="100" align="center"></el-table-column>
        <el-table-column prop="datatype" label="通道类型" width="100" align="center"></el-table-column>
        <el-table-column prop="usermaxdata" label="用户定义最大值" width="100" align="center"></el-table-column>
        <el-table-column prop="usermindata" label="用户定义最小值" width="100" align="center"></el-table-column>
        <el-table-column prop="scenename" label="所属场景" width="100" align="center"></el-table-column>
        <el-table-column prop="spotlocation" label="所属监控点" width="120" align="center"></el-table-column>
        <el-table-column prop="active" inline-template label="是否挂载" align="center">
          <span>{{ row.active | isActiveShow }}</span>
        </el-table-column>
        <el-table-column :context="_self" inline-template label="操作" width="160" fixed="right" align="center">
          <div>
            <el-button size="small" type="primary" @click="openUpdateChannelForm(row)">修改</el-button>
          </div>
        </el-table-column>
      </el-table>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
    </el-row>

    <el-dialog title="新增通道" v-model="addChannelFormVisible">
      <el-form ref="addChannelForm" :model="addChannelForm" :rules="rules" 
      label-position="top">
      <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="10">
        <el-form-item label="设备类型" prop="devicetype">
          <el-input v-model="addChannelForm.devicetype" placeholder="请输入设备类型"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="deviceid">
          <el-input v-model="addChannelForm.deviceid" placeholder="请输入设备编号"></el-input>
        </el-form-item>
        <el-form-item label="通道编号" prop="portidx">
          <el-input v-model="addChannelForm.portidx" placeholder="请输入通道编号"></el-input>
        </el-form-item>
        <el-form-item label="监测因子" prop="userdesc">
          <el-input v-model="addChannelForm.userdesc" placeholder="请输入监测因子"></el-input>
        </el-form-item>
        <el-form-item label="所属场景" prop="sceneid">
          <!-- <el-select v-model="selectedSceneid" @change="setSpotOptions"> -->
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
        <el-form-item label="监测因子单位" prop="userunit">
          <el-input v-model="addChannelForm.userunit" placeholder="请输入监测因子单位">
          </el-input>
        </el-form-item>
        <el-form-item label="通道类型" prop="datatype">
          <el-select v-model="addChannelForm.datatype">
            <el-option
              v-for="item in dataTypeOptions"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="用户定义最大值" prop="usermaxdata">
          <el-input v-model="addChannelForm.usermaxdata" placeholder="请输入自定义最大值">
          </el-input>
        </el-form-item>
        <el-form-item label="用户定义最小值" prop="usermindata">
          <el-input v-model="addChannelForm.usermindata" placeholder="请输入自定义最小值">
          </el-input>
        </el-form-item>
         <el-form-item label="所属监测点" prop="_id">
          <el-select v-model="addChannelForm._id" filterable placeholder="请选择所属监测点">
            <el-option
              v-for="item2 in spotOptions"
              :label="item2.spotlocation"
              :value="item2._id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddChannelForm">取 消</el-button>
        <el-button type="primary" @click="handleAddChannelForm">确定并挂载</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改通道" v-model="updateChannelFormVisible">
      <el-form ref="updateChannelForm" :model="updateChannelForm" :rules="rules2" label-position="top">
      <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="10">
        <el-form-item label="设备类型" prop="devicetype">
          <el-input v-model="updateChannelForm.devicetype" placeholder="请输入设备类型"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="deviceid">
          <el-input v-model="updateChannelForm.deviceid" placeholder="请输入设备编号"></el-input>
        </el-form-item>
        <el-form-item label="通道编号" prop="portidx">
          <el-input v-model="updateChannelForm.portidx" placeholder="请输入通道编号"></el-input>
        </el-form-item>
        <el-form-item label="监测因子" prop="userdesc">
          <el-input v-model="updateChannelForm.userdesc" placeholder="请输入监测因子"></el-input>
        </el-form-item>
        <el-form-item label="所属场景">
          <el-select v-model="updateChannelForm.sceneid" @change="setSpotOptions" placeholder="所属场景禁止修改" disabled>
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
        <el-form-item label="监测因子单位" prop="userunit">
          <el-input v-model="updateChannelForm.userunit" placeholder="请输入监测因子单位">
          </el-input>
        </el-form-item>
        <el-form-item label="通道类型">
          <el-input v-model="updateChannelForm.datatype" placeholder="请输入通道类型" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="用户定义最大值" prop="usermaxdata">
          <el-input v-model="updateChannelForm.usermaxdata" placeholder="请输入自定义最大值">
          </el-input>
        </el-form-item>
        <el-form-item label="用户定义最小值" prop="usermindata">
          <el-input v-model="updateChannelForm.usermindata" placeholder="请输入自定义最小值">
          </el-input>
        </el-form-item>
         <el-form-item label="所属监测点">
          <el-select v-model="updateChannelForm.spotid" filterable placeholder="所属监测点禁止修改" disabled>
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
        <el-button type="primary" @click="handleUpdateChannelForm">确定并挂载</el-button>
      </div>
    </el-dialog>
  </div>  
</template>
<script>
import Util from '../utils/util.js'

export default {
  data () {
    var validatePortIdx = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error('通管编号必须为数字'))
      } else {
        if (value < 0) {
          callback(new Error('通道编号必须大于0'))
        } else {
          callback()
        }
      }
    }
    var validateUserData = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('不能为空'))
      } else {
        if (isNaN(value)) {
          callback(new Error('必须为数字'))
        } else {
          callback()
        }
      }
    }
    return {
      active: 0,
      addChannelFormVisible: false,
      updateChannelFormVisible: false,
      formLabelWidth: '120px',
      addChannelForm: {
        userid: '',
        devicetype: '',
        deviceid: '',
        htmllocation: 'x,y',
        datatype: '',
        portidx: null,
        bigicon: '',
        smallicon: '',
        sceneid: '',
        usermaxdata: '',
        usermindata: '',
        userdesc: '',
        userunit: '',
        _id: ''
      },
      updateChannelForm: {
        userid: '',
        devicetype: '',
        deviceid: '',
        htmllocation: 'x,y',
        datatype: '',
        portidx: null,
        bigicon: '',
        smallicon: '',
        usermaxdata: '',
        usermindata: '',
        userdesc: '',
        userunit: '',
        _id: '',
        old_id: ''
      },
      tableData: [],
      channelGetBody: '',
      sceneOptions: [],
      spotOptions: [],
      dataTypeOptions: [{ label: 'DI', value: 'DI' },
        { label: 'DO', value: 'DO' },
        { label: 'AI', value: 'AI' },
        { label: 'AO', value: 'AO' },
        { label: 'DS', value: 'DS' }],
      sceneGetBody: { companyid: '' },
      spotGetBody: '',
      selectedSceneid: '',
      rules: {
        devicetype: [
          { required: true, message: '设备类型不能为空', trigger: 'change' }
        ],
        deviceid: [
          { required: true, message: '设备编号不能为空', trigger: 'change' }
        ],
        portidx: [
          { required: true, validator: validatePortIdx, trigger: 'change' }
        ],
        userdesc: [
          { required: true, message: '监测因子不能为空', trigger: 'change' }
        ],
        userunit: [
          { required: true, message: '监测因子单位不能为空', trigger: 'change' }
        ],
        usermaxdata: [
          { required: true, validator: validateUserData, trigger: 'change' }
        ],
        usermindata: [
          { required: true, validator: validateUserData, trigger: 'change' }
        ],
        datatype: [
          { required: true, message: '通道类型不能为空', trigger: 'change' }
        ],
        sceneid: [
          { required: true, message: '所属场景不能为空', trigger: 'change' }
        ],
        _id: [
          { required: true, message: '所属监测点不能为空', trigger: 'change' }
        ]
      },
      rules2: {
        devicetype: [
          { required: true, message: '设备类型不能为空', trigger: 'change' }
        ],
        deviceid: [
          { required: true, message: '设备编号不能为空', trigger: 'change' }
        ],
        portidx: [
          { required: true, validator: validatePortIdx, trigger: 'change' }
        ],
        userdesc: [
          { required: true, message: '监测因子不能为空', trigger: 'change' }
        ],
        userunit: [
          { required: true, message: '监测因子单位不能为空', trigger: 'change' }
        ],
        usermaxdata: [
          { required: true, validator: validateUserData, trigger: 'change' }
        ],
        usermindata: [
          { required: true, validator: validateUserData, trigger: 'change' }
        ]
      }
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
    refreshUserInfo () {
      let nowUser = Util.localStorageGet('nowUser')
      let userid = nowUser === null ? null : nowUser._id
      let body = { _id: userid }
      this.$http.post(Util.userApi.currentDataGet, body)
        .then((response) => {
          if (response.data.code === '0') {
            Util.showError('更新用户数据失败', '请稍后重试')
          } else {
            Util.localStorageSet('nowUser', response.data.data)
            Util.setNowSceneid(null, response.data.data.sceneList)
              // console.log(JSON.parse(window.localStorage['nowUser']))
          }
        })
        .catch(function (response) {
          Util.showError('更新用户数据失败', '网络错误，请稍后重试')
        })
    },
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
      let nowUser = Util.localStorageGet('nowUser')
      let userid = nowUser === null ? null : nowUser._id
      this.$set(this.addChannelForm, 'userid', userid)
    },
    closeAddChannelForm () {
      this.$refs.addChannelForm.resetFields()
      this.addChannelFormVisible = false
    },
    handleAddChannelForm () {
      this.$refs.addChannelForm.validate((valid) => {
        if (valid) {
          this.$set(this.addChannelForm, 'portidx', Number(this.addChannelForm.portidx))
          console.log('addChannelForm : --------------------')
          console.log(this.addChannelForm)
          this.$http.post(Util.deviceApi.channelAdd, this.addChannelForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('添加通道失败', response.data.data)
            } else {
              this.addChannelFormVisible = false
              this.getChannelData()
              this.refreshUserInfo()
            }
          })
          .catch(function (response) {
            Util.showError('添加通道失败', '网络错误，请稍后重试')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    openUpdateChannelForm (row) {
      this.updateChannelFormVisible = true
      this.setSceneOptions()
      let nowUser = Util.localStorageGet('nowUser')
      let userid = nowUser === null ? null : nowUser._id
      this.$set(this.updateChannelForm, 'userid', userid)
      this.$set(this.updateChannelForm, 'devicetype', row.devicetype)
      this.$set(this.updateChannelForm, 'deviceid', row.deviceid)
      this.$set(this.updateChannelForm, 'portidx', row.portidx)
      this.$set(this.updateChannelForm, 'userdesc', row.userdesc)
      this.$set(this.updateChannelForm, 'userunit', row.userunit)
      this.$set(this.updateChannelForm, 'usermaxdata', row.usermaxdata)
      this.$set(this.updateChannelForm, 'usermindata', row.usermindata)
      this.$set(this.updateChannelForm, 'sceneid', row.sceneid)
      this.$set(this.updateChannelForm, 'spotid', row.spotid)
      this.$set(this.updateChannelForm, '_id', row._id)
      // this.$set(this.updateChannelForm, 'old_id', row._id)
      // this.setSceneOptions()
    },
    handleUpdateChannelForm () {
      this.$refs.updateChannelForm.validate((valid) => {
        if (valid) {
          this.$set(this.updateChannelForm, 'portidx', Number(this.updateChannelForm.portidx))
          this.$http.post(Util.deviceApi.channelAdd, this.updateChannelForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('修改通道信息失败', response.data.data)
            } else {
              this.updateChannelFormVisible = false
              this.getChannelData()
            }
          })
          .catch(function (response) {
            Util.showError('修改通道信息失败', '网络错误，请稍后重试')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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