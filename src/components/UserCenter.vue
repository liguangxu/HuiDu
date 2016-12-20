<template>
	<div>
		<br>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2" class="content">用户列表</el-col>
      <el-col :span="2">
        <el-button size="large" type="primary" @click="openAddUserForm">新 增
        </el-button>
      </el-col>
		</el-row>
		<br>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="20">
				 <el-table :data="userTableData" stripe border>
    				<el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
    				<el-table-column prop="name" label="姓名" width="140" align="center"></el-table-column>
    				<el-table-column prop="username" label="用户名" width="140" align="center"></el-table-column>
    				<el-table-column prop="job" label="职位" width="140" align="center"></el-table-column>
    				<el-table-column prop="phone" label="电话" width="140" align="center"></el-table-column>
    				<el-table-column prop="email" label="邮箱" width="180" align="center"></el-table-column>
    				<el-table-column prop="address" label="地址" width="240" align="center"></el-table-column>
            <el-table-column prop="desc" label="备注" align="center"></el-table-column>
    				<el-table-column :context="_self" inline-template label="操作" width="160" align="center">
          				<div>
            				<el-button size="small" type="primary" @click="userEdit(row)">修改</el-button>
            				<el-button size="small" type="danger" @click="userDelete(row)">删除</el-button>
          				</div>
        			</el-table-column>
  				</el-table>
			</el-col>
		</el-row>
		
		<el-dialog title="修改用户" v-model="userEditFormVisible" class="content">
    <el-form :model="userEditForm" label-position="left">
  			<el-row>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item>
                <el-input v-model="userEditForm.name" placeholder="请输入姓名" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.username" placeholder="请输入用户名" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.password" placeholder="请输入密码" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.password2" placeholder="请再次输入密码确认" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.desc" placeholder="请输入备注" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="userEditForm.companyid" :disabled="companyOptions === null" 
              :placeholder="nowCompanyname">
                <el-option v-for="item in companyOptions" :label="item.companyname" :value="item.companyid">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item>
                <el-input v-model="userEditForm.job" placeholder="请输入职位" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.phone" placeholder="请输入电话" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.email" placeholder="请输入邮箱" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.weixin" placeholder="请输入微信" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.address" placeholder="请输入地址" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="userEditForm.level" placeholder="请选择权限">
                <el-option v-for="item in levelOptions" :label="item.label" :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
      <el-card>
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">请选择所属监测点</span>
          <el-button style="float: right;" type="primary" @click="setSpotOptions">点击查询所有监测点</el-button>
        </div>
        <div>
          <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="22">
              <el-tree :data="spotOptions" :props="props" :load="getSceneSpots" @node-click="handleEditNodeClick" 
              @check-change="handleEditCheckChange" lazy show-checkbox>
              </el-tree>
            </el-col>
          </el-row>
        </div>
      </el-card>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
        </div>
		</el-dialog>

    <el-dialog title="新增用户" v-model="userAddFormVisible" class="content">
    <el-form ref="userAddForm" :model="userAddForm" :rules="rules" label-position="left">
        <el-row>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item prop="name">
                <el-input v-model="userAddForm.name" placeholder="请输入姓名" class="input-content"></el-input>
            </el-form-item>
            <el-form-item prop="username">
                <el-input v-model="userAddForm.username" placeholder="请输入用户名" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userAddForm.password" placeholder="请输入密码" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userAddForm.desc" placeholder="请输入备注" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="userAddForm.companyid" :disabled="companyOptions === null" 
              :placeholder="nowCompanyname">
                <el-option v-for="item in companyOptions" :label="item.companyname" :value="item.companyid">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item>
                <el-input v-model="userAddForm.job" placeholder="请输入职位" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userAddForm.phone" placeholder="请输入电话" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userAddForm.email" placeholder="请输入邮箱" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userAddForm.weixin" placeholder="请输入微信" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="userAddForm.level" placeholder="请选择权限">
                <el-option v-for="item in levelOptions" :label="item.label" :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
      <el-form-item>
                <el-input v-model="userAddForm.address" placeholder="请输入地址" class="input-content"></el-input>
            </el-form-item>
            </el-col>
      <el-col :span="1">&nbsp;</el-col>
      </el-row>
      <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
      <el-card>
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">请选择所属监测点</span>
          <el-button style="float: right;" type="primary" @click="setSpotOptions">点击查询所有监测点</el-button>
        </div>
        <div>
          <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="22">
              <el-tree :data="spotOptions" :props="props" :load="getSceneSpots" @node-click="handleNodeClick" 
              @check-change="handleCheckChange" lazy show-checkbox>
              </el-tree>
            </el-col>
          </el-row>
        </div>
      </el-card>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userAddFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddSubmit">确 定</el-button>
        </div>
    </el-dialog>
	</div>
</template>

<script>
import Util from '../utils/util.js'

export default {
  data () {
    return {
      nowCompanyname: this.getNowCompanyname(),
      companyOptions: [],
      levelOptions: [],
      userGetBody: { userid: '' },
      userDeleteBody: { _id: '' },
      userEditFormVisible: false,
      userAddFormVisible: false,
      userEditForm: {
        _id: '',
        name: '',
        username: '',
        level: null,
        password: '',
        companyid: '',
        job: '',
        phone: '',
        email: '',
        address: '',
        desc: '',
        weixin: '',
        ownspotlist: []
      },
      userAddForm: {
        name: '',
        username: '',
        level: null,
        password: '',
        companyid: '',
        job: '',
        phone: '',
        email: '',
        address: '',
        desc: '',
        weixin: '',
        ownspotlist: []
      },
      formLabelWidth: '100px',
      userTableData: [],
      spotOptions: [],
      props: {
        label: 'label',
        children: 'children'
      },
      userSceneGetBody: { companyid: '' },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    setSpotOptions () {
      let scenes = Util.getCompanyScenes()
      console.log('---------------------------111')
      console.log(scenes)
      let tempOptions = []
      for (var i = 0; i < scenes.length; i++) {
        let item = { label: scenes[i].name, id: scenes[i]._id, children: [] }
        // let spots = this.getSceneSpots(scenes[i]._id)
        // for (var j = 0; j < spots.length; j++) {
        //   let childItem = { label: spots[j].spotlocation, value: spots[j].spotid }
        //   item.children.push(childItem)
        // }
        tempOptions.push(item)
      }
      this.$set(this, 'spotOptions', tempOptions)
    },
    getSceneSpots (node, resolve) {
      if (node.level > 1) {
        return resolve([])
      }
      if (node.level === 1) {
        let body = { sceneid: node.data.id }
        if (node.data.id !== null && node.data.id !== undefined) {
          this.$http.post(Util.userApi.spotGet, body)
            .then((response) => {
              // console.log(response)
              if (response.data.code === '0') {
                Util.showError('获取监测点数据失败', response.data.data)
              } else {
                let temp = response.data.data
                console.log(temp)
                let item = []
                for (var j = 0; j < temp.length; j++) {
                  let childItem = { label: temp[j].spotlocation, spotid: temp[j].spotid, sceneid: temp[j].sceneid }
                  item.push(childItem)
                }
                resolve(item)
              }
            })
            .catch(function (response) {
              Util.showError('获取监测点数据失败', '网络错误，请稍后重试')
            })
        }
      }
    },
    handleNodeClick (data) {
      // console.log(data)
      // this.$set(this.userAddForm, 'ownspotlist', data)
    },
    handleEditNodeClick (data) {
      // console.log(data)
      // this.$set(this.userAddForm, 'ownspotlist', data)
    },
    findSpotInSpotList (type, spot) {
      if (type === 'add') {
        for (let i = 0; i < this.userAddForm.ownspotlist.length; i++) {
          if (this.userAddForm.ownspotlist[i].spotid === spot.spotid &&
            this.userAddForm.ownspotlist[i].sceneid === spot.sceneid) {
            return i
          }
        }
        return -1
      }
      if (type === 'edit') {
        for (let i = 0; i < this.userEditForm.ownspotlist.length; i++) {
          if (this.userEditForm.ownspotlist[i].spotid === spot.spotid &&
            this.userEditForm.ownspotlist[i].sceneid === spot.sceneid) {
            return i
          }
        }
        return -1
      }
    },
    checkSpotInSpotList (list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].spotid === null || list[i].spotid === undefined) {
          return i
        }
      }
      return -1
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log('selected -----------------')
      console.log(data, checked, indeterminate)
      let temp = this.userAddForm.ownspotlist
      let spot = { spotid: data.spotid, spotlocation: data.label, sceneid: data.sceneid }
      if (checked) {
        temp.push(spot)
      } else {
        let index = this.findSpotInSpotList('add', spot)
        if (index > -1) {
          temp.splice(index, 1)
        }
      }
      let idx = this.checkSpotInSpotList(temp)
      console.log(idx)
      if (idx > -1) {
        temp.splice(idx, 1)
      }
      this.$set(this.userAddForm, 'ownspotlist', temp)
    },
    handleEditCheckChange (data, checked, indeterminate) {
      let temp = this.userEditForm.ownspotlist
      let spot = { spotid: data.spotid, spotlocation: data.label, sceneid: data.sceneid }
      if (checked) {
        temp.push(spot)
      } else {
        let index = this.findSpotInSpotList('edit', spot)
        if (index > -1) {
          temp.splice(index, 1)
        }
      }
      let idx = this.checkSpotInSpotList(temp)
      console.log(idx)
      if (idx > -1) {
        temp.splice(idx, 1)
      }
      this.$set(this.userEditForm, 'ownspotlist', temp)
    },
    getNowCompanyname () {
      return Util.getNowCompanyname()
    },
    getCompanys () {
      let level = Util.getNowLevel()
      if (level === 0) {
        this.$http.get(Util.userApi.companyGet)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取公司数据失败', response.data.data)
            } else {
              this.$set(this, 'companyOptions', response.data.data)
            }
          })
          .catch(function (response) {
            Util.showError('获取公司数据失败', '网络错误，请稍后重试')
          })
      } else {
        this.$set(this, 'companyOptions', null)
      }
    },
    getScenes () {
      let level = Util.getNowLevel()
      if (level !== 0) {
        let nowUser = Util.localStorageGet('nowUser')
        let companyid = nowUser === null ? null : nowUser.companyid
        this.$set(this.userSceneGetBody, 'companyid', companyid)
      } else {
        this.$set(this.userSceneGetBody, 'companyid', '')
      }
      this.$http.post(Util.userApi.sceneGet, this.userSceneGetBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取场景数据失败', response.data.data)
            } else {
              Util.setCompanyScenes(response.data.data)
            }
          })
          .catch(function (response) {
            Util.showError('获取场景数据失败', '网络错误，请稍后重试')
          })
    },
    setLevelOptions () {
      let level = Util.getNowLevel()
      if (level === 0) {
        this.levelOptions = [
          { label: '0', value: 0 },
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 }]
      } else {
        this.levelOptions = [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 }]
      }
    },
    userEdit (row) {
      this.userEditFormVisible = true
      this.$set(this.userEditForm, '_id', row._id)
      this.companyOptions = null
      this.spotOptions = []
      this.getCompanys()
      this.setLevelOptions()
      this.setSpotOptions()
      console.log(row.address)
    },
    userDelete (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.deleteUser(row)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getUsers () {
      let nowUser = Util.localStorageGet('nowUser')
      let userid = nowUser === null ? null : nowUser._id
      this.$set(this.userGetBody, 'userid', userid)
      console.log(this.userGetBody)
      console.log(Util.userApi.get)
      this.$http.post(Util.userApi.get, this.userGetBody)
        .then((response) => {
          console.log(response.data)
          if (response.data.code === '0') {
            Util.showError('获取用户数据失败', response.data.data)
          } else {
            this.$set(this, 'userTableData', response.data.data)
          }
        })
        .catch(function (response) {
          Util.showError('获取用户数据失败', '网络错误，请稍后再试')
        })
    },
    addUser () {
      if (this.userAddForm.companyid === '' || this.userAddForm.companyid === null) {
        this.$set(this.userAddForm, 'companyid', Util.getNowCompanyid())
      }
      this.$http.post(Util.userApi.add, this.userAddForm)
        .then((response) => {
          if (response.data.code === '0') {
            this.showError('添加用户失败', '请稍后再试')
          } else {
            this.getUsers()
          }
        })
        .catch(function (response) {
          this.showError('添加用户失败', '网络错误，请稍后再试')
        })
      this.userAddFormVisible = false
    },
    editUser () {
      if (this.userEditForm.companyid === '' || this.userEditForm.companyid === null) {
        this.$set(this.userEditForm, 'companyid', Util.getNowCompanyid())
      }
      this.$http.post(Util.userApi.update, this.userEditForm)
        .then((response) => {
          if (response.data.code === '0') {
            this.showError('修改用户失败', '请稍后再试')
          } else {
            this.getUsers()
          }
        })
        .catch(function (response) {
          this.showError('修改用户失败', '网络错误，请稍后再试')
        })
      this.userEditFormVisible = false
    },
    deleteUser (row) {
      this.$set(this.userDeleteBody, '_id', row._id)
      this.$http.post(Util.userApi.delete, this.userDeleteBody)
        .then((response) => {
          if (response.data.code === '0') {
            this.showError('删除用户失败', '请稍后再试')
          } else {
            this.getUsers()
          }
        })
        .catch(function (response) {
          this.showError('删除用户失败', '网络错误，请稍后再试')
        })
    },
    handleAddSubmit (ev) {
      this.$refs.userAddForm.validate((valid) => {
        if (valid) {
          console.log('---------kkkkkkkkkkkkkk')
          console.log(this.userAddForm)
          this.addUser()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEditSubmit (ev) {
      // this.$refs.userAddForm.validate((valid) => {
      //   if (valid) {
      //     console.log('---------ooooooooooo')
      //     console.log(this.userEditForm)
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      console.log('---------ooooooooooo')
      console.log(this.userEditForm)
      this.editUser()
    },
    openAddUserForm () {
      this.userAddFormVisible = true
      this.getCompanys()
      this.setLevelOptions()
      this.setSpotOptions()
    }
  },
  mounted: function () {
    this.getUsers()
    this.getScenes()
  }
}
</script>

<style scoped>
.content {
  font-size: 20px;
  color: #8492A6;
  text-align: left;
  min-width: 100px;
}
.submit-button {
  width: 100%;
}
.input-content {
  min-width: 100px;  
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>