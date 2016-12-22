<template>
	<div>
		<br>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2" class="content-userlist">用户列表</el-col>
      <el-col :span="2">
        <el-button size="large" type="primary" @click="openAddUserForm">新 增
        </el-button>
      </el-col>
		</el-row>
		<br>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="20">
				 <el-table v-loading.body="loading" :data="userTableData" stripe border>
    				<el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
    				<el-table-column prop="name" label="姓名" width="140" align="center"></el-table-column>
    				<el-table-column prop="username" label="用户名" width="140" align="center"></el-table-column>
    				<el-table-column prop="job" label="职位" width="140" align="center"></el-table-column>
    				<el-table-column prop="phone" label="电话" width="140" align="center"></el-table-column>
    				<el-table-column prop="email" label="邮箱" width="180" align="center"></el-table-column>
    				<el-table-column prop="address" label="地址" width="240" align="center"></el-table-column>
            <el-table-column prop="desc" label="备注" align="center"></el-table-column>
    				<el-table-column :context="_self" inline-template label="操作" width="300" 
            fixed="right" align="center">
          				<div>
            				<el-button size="small" type="info" @click="userEdit(row)">修改基本信息</el-button>
                    <el-button size="small" type="primary" @click="userEditPassword(row)">修改密码</el-button>
            				<el-button size="small" type="danger" @click="userDelete(row)">删除</el-button>
          				</div>
        			</el-table-column>
  				</el-table>
			</el-col>
		</el-row>
		
		<el-dialog title="修改用户" v-model="userEditFormVisible" class="content">
    <el-form ref="userEditForm" :model="userEditForm" :rules="rules2" label-width="100px" label-position="left">
  			<el-row>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="userEditForm.name" placeholder="请输入姓名" class="input-content"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userEditForm.username" placeholder="请输入用户名" class="input-content"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
                <el-input v-model="userEditForm.desc" placeholder="请输入备注" class="input-content"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="userEditForm.address" placeholder="请输入地址" class="input-content"></el-input>
            </el-form-item>
            <el-form-item label="所属公司" prop="companyid">
                <el-select v-model="userEditForm.companyid" 
                :disabled="companyOptions === null" 
              :placeholder="nowCompanyname">
                <el-option v-for="item in companyOptions" :label="item.companyname" :value="item.companyid">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item label="职位" prop="job">
                <el-input v-model="userEditForm.job" placeholder="请输入职位" class="input-content"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="userEditForm.phone" placeholder="请输入电话" class="input-content"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="userEditForm.email" placeholder="请输入邮箱" class="input-content"></el-input>
            </el-form-item>
            <el-form-item label="微信" prop="weixin">
                <el-input v-model="userEditForm.weixin" placeholder="请输入微信" class="input-content"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="level">
                <el-select v-model="userEditForm.level" placeholder="请选择权限">
                <el-option v-for="item in levelOptions" :label="item.label" :value="item.value + ''">
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
          <el-button style="float: right;" type="primary" @click="setSelectedSpotOptions">点击查询所有监测点</el-button>
          <!-- <el-button style="float: right;" type="primary" @click="test">test</el-button> -->
        </div>
        <div>
          <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="22">
              <el-tree ref="editUserSpotsTree" :data="spotOptions" node-key="id" :props="props" :show-checkbox="true"
              :load="getSelectedSceneSpots"
              @node-click="handleEditNodeClick" :default-checked-keys="defaultSpotsList"
              :expand-on-click-node="true" :default-expand-all="true"
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
          <el-button @click="closeUpdateUserForm">取 消</el-button>
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
            <el-form-item prop="password">
                <el-input v-model="userAddForm.password" placeholder="请输入密码" class="input-content"></el-input>
            </el-form-item>
            <el-form-item prop="desc">
                <el-input v-model="userAddForm.desc" placeholder="请输入备注" class="input-content"></el-input>
            </el-form-item>
            <el-form-item prop="companyid">
                <el-select v-model="userAddForm.companyid" :disabled="companyOptions === null" 
              :placeholder="nowCompanyname">
                <el-option v-for="item in companyOptions" :label="item.companyname" :value="item.companyid">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item prop="job">
                <el-input v-model="userAddForm.job" placeholder="请输入职位" class="input-content"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input v-model="userAddForm.phone" placeholder="请输入电话" class="input-content"></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input v-model="userAddForm.email" placeholder="请输入邮箱" class="input-content"></el-input>
            </el-form-item>
            <el-form-item prop="weixin">
                <el-input v-model="userAddForm.weixin" placeholder="请输入微信" class="input-content"></el-input>
            </el-form-item>
            <el-form-item prop="level">
                <el-select v-model="userAddForm.level" placeholder="请选择权限">
                <el-option v-for="item in levelOptions" :label="item.label" :value="item.value + ''">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
      <el-form-item prop="address">
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
              <el-tree :data="spotOptions" :props="props" :load="getSceneSpots" @node-click="handleNodeClick" :expand-on-click-node="true" :default-expand-all="true"
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
          <el-button @click="closeAddUserForm">取 消</el-button>
          <el-button type="primary" @click="handleAddSubmit">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="修改密码" v-model="userEditPasswordFormVisible" class="content">
    <el-form ref="userEditPasswordForm" :model="userEditPasswordForm" :rules="rules3" label-width="100px" label-position="left">
        <el-row>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="20">
            <el-form-item label="新密码" prop="password">
                <el-input v-model="userEditPasswordForm.password" placeholder="请输入新密码" class="input-content"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
                <el-input v-model="userEditPasswordForm.password2" placeholder="请再次输入密码确认" class="input-content"></el-input>
            </el-form-item>
      </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeUpdateUserPasswordForm">取 消</el-button>
          <el-button type="primary" @click="handleEditPasswordSubmit">确 定</el-button>
        </div>
    </el-dialog>  

	</div>
</template>

<script>
import Util from '../utils/util.js'

export default {
  data () {
    var validatePassword1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        if (this.userEditPasswordForm.password2 !== '') {
          this.$refs.userEditPasswordForm.validateField('password2')
        }
        callback()
      }
    }
    var validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userEditPasswordForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      defaultSpotsList: [],
      nowCompanyname: this.getNowCompanyname(),
      companyOptions: [],
      levelOptions: [],
      userGetBody: { userid: '' },
      userDeleteBody: { _id: '' },
      userEditFormVisible: false,
      userEditPasswordFormVisible: false,
      userAddFormVisible: false,
      userEditPasswordForm: {
        _id: '',
        password: '',
        password2: '',
        name: '',
        username: '',
        level: '',
        companyid: '',
        job: '',
        phone: '',
        email: '',
        address: '',
        desc: '',
        weixin: '',
        ownspotlist: []
      },
      userEditForm: {
        _id: '',
        name: '',
        username: '',
        password: '',
        level: '',
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
        level: '',
        password: '',
        companyid: Util.getNowCompanyid(),
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
          { required: true, message: '姓名不能为空', trigger: 'change' }
        ],
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '备注不能为空', trigger: 'change' }
        ],
        companyid: [
          { required: true, message: '所属公司不能为空', trigger: 'change' }
        ],
        job: [
          { required: true, message: '职位不能为空', trigger: 'change' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'change' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'change' }
        ],
        weixin: [
          { required: true, message: '微信不能为空', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '电话不能为空', trigger: 'change' }
        ],
        level: [
          { required: true, message: '权限等级不能为空', trigger: 'change' }
        ]
      },
      rules2: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'change' }
        ],
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '备注不能为空', trigger: 'change' }
        ],
        companyid: [
          { required: true, message: '所属公司不能为空', trigger: 'change' }
        ],
        job: [
          { required: true, message: '职位不能为空', trigger: 'change' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'change' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'change' }
        ],
        weixin: [
          { required: true, message: '微信不能为空', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '电话不能为空', trigger: 'change' }
        ],
        level: [
          { required: true, message: '权限等级不能为空', trigger: 'change' }
        ]
      },
      rules3: {
        password: [
          { required: true, validator: validatePassword1, trigger: 'change' }
        ],
        password2: [
          { required: true, validator: validatePassword2, trigger: 'change' }
        ]
      }
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
        console.log('node get spots--------------------')
        console.log(body)
        if (node.data.id !== null && node.data.id !== undefined) {
          this.$http.post(Util.userApi.spotGet, body)
            .then((response) => {
              // console.log(response)
              if (response.data.code === '0') {
                // Util.showError('获取监测点数据失败', response.data.data)
              } else {
                let temp = response.data.data
                // console.log('node get spots--------------------')
                // console.log(body)
                // console.log(temp)
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
    setSelectedSpotOptions () {
      let scenes = Util.getCompanyScenes()
      let tempOptions = []
      for (var i = 0; i < scenes.length; i++) {
        let item = { id: i, label: scenes[i].name, sceneid: scenes[i]._id, children: [] }
        tempOptions.push(item)
      }
      this.$set(this, 'spotOptions', tempOptions)
      // this.$set(this, 'defaultSpotsList', Util.getSelectedSpots())
      // this.$refs.editUserSpotsTree.getCheckedKeys()
      // this.$refs.editUserSpotsTree.setCheckedNodes([1, 2])
    },
    getSelectedSceneSpots (node, resolve) {
      if (node.level > 1) {
        return resolve([])
      }
      if (node.level === 1) {
        let body = { sceneid: node.data.sceneid }
        // console.log('node get spots--------------------')
        // console.log(body)
        // console.log('node key--------------------')
        // console.log(node.key)
        if (node.data.sceneid !== null && node.data.sceneid !== undefined) {
          this.$http.post(Util.userApi.spotGet, body)
            .then((response) => {
              // console.log(response)
              if (response.data.code === '0') {
                // Util.showError('获取监测点数据失败', response.data.data)
              } else {
                let temp = response.data.data
                console.log('node get spots--------------------')
                console.log(body)
                // console.log(temp)
                let item = []
                for (var j = 0; j < temp.length; j++) {
                  let tmp = temp[j].sceneid + '' + temp[j].spotid
                  let childItem = { id: tmp, label: temp[j].spotlocation, spotid: temp[j].spotid, sceneid: temp[j].sceneid }
                  item.push(childItem)
                }
                resolve(item)
              }
            })
            .catch(function (response) {
              Util.showError('获取监测点数据失败', '网络错误，请稍后重试')
            })
          let tmpSpots = Util.getSelectedSpots()
          let tmpKeys = []
          for (let k = 0; k < tmpSpots.length; k++) {
            let tmpKey = tmpSpots[k].sceneid + '' + tmpSpots[k].spotid
            tmpKeys.push(tmpKey)
          }
          this.$refs.editUserSpotsTree.setCheckedKeys(tmpKeys, true)
          this.$set(this.userEditForm, 'ownspotlist', tmpSpots)
          // console.log('set here----------')
          // console.log(tmp)
        }
      }
    },
    // test () {
    //   console.log('test----------')
    //   let tmp = Util.getSelectedSpots()
    //   let tmp1 = tmp[0].sceneid + '' + tmp[0].spotid
    //   this.$refs.editUserSpotsTree.setCheckedKeys([tmp1])
    // },
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
      console.log('------ppppppppppp123')
      console.log(temp)
    },
    handleEditCheckChange (data, checked, indeterminate) {
      console.log('check change----------------')
      console.log(data)
      // console.log('get checked keys----------------')
      // console.log(this.$refs.editUserSpotsTree.getCheckedNodes())
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
      } else if (level === 1) {
        let nowUser = Util.localStorageGet('nowUser')
        let companyid = nowUser === null ? null : nowUser.companyid
        let body = { companyid: companyid }
        console.log('level 1-----------hhh')
        console.log(body)
        this.$http.post(Util.userApi.oneCompanyGet, body)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取公司数据失败', response.data.data)
            } else {
              console.log('level 1-----------')
              console.log(response.data)
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
      console.log('CompanyScenes1111111-------------')
      console.log(this.userSceneGetBody)
      this.$http.post(Util.userApi.sceneGet, this.userSceneGetBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取场景数据失败', response.data.data)
            } else {
              console.log('CompanyScenes-------------')
              console.log(response.data.data)
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
          { label: '超级管理员', value: 0 },
          { label: '公司管理员', value: 1 },
          { label: '操作员', value: 2 },
          { label: '普通用户', value: 3 }]
      } else {
        this.levelOptions = [
          { label: '公司管理员', value: 1 },
          { label: '操作员', value: 2 },
          { label: '普通用户', value: 3 }]
      }
    },
    userEdit (row) {
      this.userEditFormVisible = true
      this.$set(this.userEditForm, '_id', row._id)
      this.$set(this.userEditForm, 'name', row.name)
      this.$set(this.userEditForm, 'username', row.username)
      this.$set(this.userEditForm, 'desc', row.desc)
      this.$set(this.userEditForm, 'job', row.job)
      this.$set(this.userEditForm, 'phone', row.phone)
      this.$set(this.userEditForm, 'email', row.email)
      this.$set(this.userEditForm, 'weixin', row.weixin)
      this.$set(this.userEditForm, 'address', row.address)
      this.$set(this.userEditForm, 'level', row.level + '')
      this.$set(this.userEditForm, 'companyid', row.companyid)
      this.$set(this.userEditForm, 'ownchannel', row.ownchannel)
      console.log('row.ownchannel-----------------')
      console.log(row.ownchannel)
      // this.companyOptions = null
      // this.spotOptions = []
      this.getCompanys()
      this.setLevelOptions()
      // this.setSpotOptions()
      // console.log(row.address)
      this.$set(this, 'spotOptions', [])
      let spotBody = { _id: row._id }
      this.$http.post(Util.userApi.currentSpotGet, spotBody)
        .then((response) => {
          if (response.data.code === '0') {
            // Util.showError('获取已勾选监测点数据失败', response.data.data)
            Util.setSelectedSpots([])
          } else {
            let temp = response.data.data
            console.log('selected spots--------------------')
            console.log(temp)
            Util.setSelectedSpots(temp)
          }
        })
        .catch(function (response) {
          Util.showError('获取已勾选监测点数据失败', '网络错误，请稍后重试')
          Util.setSelectedSpots([])
        })
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
      this.loading = true
      let nowUser = Util.localStorageGet('nowUser')
      let userid = nowUser === null ? null : nowUser._id
      this.$set(this.userGetBody, 'userid', userid)
      console.log('userGetBody-------------------')
      console.log(this.userGetBody)
      console.log(Util.userApi.get)
      this.$http.post(Util.userApi.get, this.userGetBody)
        .then((response) => {
          console.log(response.data)
          if (response.data.code === '0') {
            Util.showError('获取用户数据失败', response.data.data)
          } else {
            console.log('userGetBack233333333-------------------')
            console.log(response.data.data)
            this.$set(this, 'userTableData', response.data.data)
            this.loading = false
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
      this.$set(this.userAddForm, 'level', Number(this.userAddForm.level))
      this.$http.post(Util.userApi.add, this.userAddForm)
        .then((response) => {
          if (response.data.code === '0') {
            Util.showError('添加用户失败', response.data.data)
          } else {
            this.getUsers()
          }
        })
        .catch(function (response) {
          Util.showError('添加用户失败', '网络错误，请稍后再试')
        })
      this.userAddFormVisible = false
    },
    editUser () {
      if (this.userEditForm.companyid === '' || this.userEditForm.companyid === null) {
        this.$set(this.userEditForm, 'companyid', Util.getNowCompanyid())
      }
      this.$set(this.userEditForm, 'level', Number(this.userEditForm.level))
      // console.log('updateUserBody--------------')
      // console.log(this.userEditForm)
      this.$http.post(Util.userApi.update, this.userEditForm)
        .then((response) => {
          if (response.data.code === '0') {
            Util.showError('修改用户失败', response.data.data)
          } else {
            console.log('updateUserBack--------------')
            console.log(response.data)
            this.getUsers()
          }
        })
        .catch(function (response) {
          Util.showError('修改用户失败', '网络错误，请稍后再试')
        })
      this.userEditFormVisible = false
    },
    deleteUser (row) {
      this.$set(this.userDeleteBody, '_id', row._id)
      this.$http.post(Util.userApi.delete, this.userDeleteBody)
        .then((response) => {
          if (response.data.code === '0') {
            Util.showError('删除用户失败', '请稍后再试')
          } else {
            this.getUsers()
          }
        })
        .catch(function (response) {
          Util.showError('删除用户失败', '网络错误，请稍后再试')
        })
    },
    handleAddSubmit (ev) {
      this.$refs.userAddForm.validate((valid) => {
        if (valid) {
          console.log('---------kkkkkkkkkkkkkk')
          console.log(this.userAddForm)
          this.addUser()
          this.$refs.userAddForm.resetFields()
          this.refreshUserInfo()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEditSubmit (ev) {
      this.$refs.userEditForm.validate((valid) => {
        if (valid) {
          console.log('---------ooooooooooo')
          console.log(this.userEditForm)
          this.editUser()
          this.refreshUserInfo()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    openAddUserForm () {
      this.userAddFormVisible = true
      // this.$refs.userAddForm.resetFields()
      this.getCompanys()
      this.setLevelOptions()
      this.$set(this, 'spotOptions', [])
      this.$set(this.userAddForm, 'ownspotlist', [])
    },
    closeAddUserForm () {
      this.$refs.userAddForm.resetFields()
      this.userAddFormVisible = false
    },
    closeUpdateUserForm () {
      this.$refs.userEditForm.resetFields()
      this.userEditFormVisible = false
    },
    userEditPassword (row) {
      this.userEditPasswordFormVisible = true
      this.$set(this.userEditPasswordForm, '_id', row._id)
      this.$set(this.userEditPasswordForm, 'name', row.name)
      this.$set(this.userEditPasswordForm, 'username', row.username)
      this.$set(this.userEditPasswordForm, 'desc', row.desc)
      this.$set(this.userEditPasswordForm, 'job', row.job)
      this.$set(this.userEditPasswordForm, 'phone', row.phone)
      this.$set(this.userEditPasswordForm, 'email', row.email)
      this.$set(this.userEditPasswordForm, 'weixin', row.weixin)
      this.$set(this.userEditPasswordForm, 'address', row.address)
      this.$set(this.userEditPasswordForm, 'level', row.level + '')
      this.$set(this.userEditPasswordForm, 'companyid', row.companyid)
      this.$set(this.userEditPasswordForm, 'ownchannel', row.ownchannel)
    },
    closeUpdateUserPasswordForm () {
      this.$refs.userEditPasswordForm.resetFields()
      this.userEditPasswordFormVisible = false
    },
    editUserPassword () {
      this.$http.post(Util.userApi.update, this.userEditPasswordForm)
        .then((response) => {
          if (response.data.code === '0') {
            Util.showError('修改用户密码失败', response.data.data)
          } else {
            console.log('updateUserBackPassword--------------')
            console.log(response.data)
            this.getUsers()
          }
        })
        .catch(function (response) {
          Util.showError('修改用户密码失败', '网络错误，请稍后再试')
        })
      this.userEditPasswordFormVisible = false
    },
    handleEditPasswordSubmit () {
      this.$refs.userEditPasswordForm.validate((valid) => {
        if (valid) {
          console.log('---------ppppppppppp')
          console.log(this.userEditPasswordForm)
          this.editUserPassword()
          this.refreshUserInfo()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted: function () {
    this.getUsers()
    this.getScenes()
  }
}
</script>

<style scoped>
.content-userlist {
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