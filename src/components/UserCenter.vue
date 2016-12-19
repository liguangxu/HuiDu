<template>
	<div>
		<br>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2" class="content">用户列表</el-col>
      <el-col :span="2">
        <el-button size="large" type="primary" @click="userAddFormVisible = true">新 增
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
            				<el-button size="small" type="primary" @click="userEdit($index, row)">修改</el-button>
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
                <el-input v-model="userEditForm.name" placeholder="请输入用户名" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.name" placeholder="请输入密码" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.name" placeholder="请再次输入密码确认" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.name" placeholder="请输入备注" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.name" placeholder="请输入所属公司" class="input-content"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item>
                <el-input v-model="userEditForm.name" placeholder="请输入职位" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.name" placeholder="请输入电话" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.name" placeholder="请输入邮箱" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.name" placeholder="请输入微信" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.name" placeholder="请输入地址" class="input-content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="userEditForm.name" placeholder="请输入权限等级" class="input-content"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
      <el-card>
        <div slot="header">
          <span style="line-height: 5px;">请选择所属监测点</span>
        </div>
        <div>
          <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="6">
              <el-tree :data="scenes" :props="props" show-checkbox>
              </el-tree>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="6">
              <el-tree :data="scenes" :props="props" show-checkbox>
              </el-tree>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="6">
              <el-tree :data="scenes" :props="props" show-checkbox>
              </el-tree>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>
        </div>
      </el-card>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="userEditFormVisible = false">确 定</el-button>
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
                <el-input v-model="userAddForm.companyid" placeholder="请输入所属公司" class="input-content"></el-input>
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
                <el-input v-model="userAddForm.level" placeholder="请输入权限等级" class="input-content"></el-input>
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
        <div slot="header">
          <span style="line-height: 5px;">请选择所属监测点</span>
        </div>
        <div>
          <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="6">
              <el-tree :data="scenes" :props="props" show-checkbox>
              </el-tree>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="6">
              <el-tree :data="scenes" :props="props" show-checkbox>
              </el-tree>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="6">
              <el-tree :data="scenes" :props="props" show-checkbox>
              </el-tree>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
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
      userGetBody: { _id: '' },
      userDeleteBody: { _id: '' },
      userEditFormVisible: false,
      userAddFormVisible: false,
      userEditForm: {
        name: '',
        username: ''
      },
      userAddForm: {
        name: '',
        username: ''
      },
      formLabelWidth: '100px',
      userTableData: [],
      scenes: [{
        label: '场景一',
        children: [{
          label: '监测点1'
        },
        {
          label: '监测点2'
        }]
      }],
      props: {
        label: 'label',
        children: 'children'
      },
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
    userEdit (index, row) {
      this.userEditFormVisible = true
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
      this.$set(this.userGetBody, '_id', userid)
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
      this.$http.post(this.apiUrl + 'add', this.userAddForm)
        .then((response) => {
          // console.log(response.data.code)
          if (response.data.code === '0') {
            this.showError('请求失败，请稍后再试')
          } else {
            this.getUsers()
          }
        })
        .catch(function (response) {
          this.showError('请求失败，请稍后再试')
        })
      this.userAddFormVisible = false
      // console.log('here')
      // this.$http.get('../../static/json/user.json')
      //     .then((response) => {
      //       console.log(response)
      //       this.$set(this, 'userTableData', response.data.tableData)
      //     })
    },
    deleteUser (row) {
      this.$set(this.sendDate_delete, '_id', row._id)
      console.log(this.sendDate_delete)
      this.$http.post(this.apiUrl + 'delete', this.sendDate_delete)
        .then((response) => {
          // console.log(response.data.code)
          if (response.data.code === '0') {
            this.showError('请求失败，请稍后再试')
          } else {
            this.getUsers()
          }
        })
        .catch(function (response) {
          this.showError('请求失败，请稍后再试')
        })
    },
    handleAddSubmit (ev) {
      this.$refs.userAddForm.validate((valid) => {
        if (valid) {
          this.addUser()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted: function () {
    this.getUsers()
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
</style>