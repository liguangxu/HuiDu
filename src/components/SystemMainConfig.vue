<template>
	<div class="content-name">
		<el-row>
		  <el-col :span="2">&nbsp;</el-col>
		  <el-col :span="3">公司信息</el-col>
		  <el-col :span="2"><el-button size="large" type="primary" v-if="level === 0" @click="openAddCompanyForm">新 增</el-button>
		  </el-col>
		</el-row>
		<br>
		<el-row>
		  <el-col :span="2">&nbsp;</el-col>
		  <el-col :span="20">
			<el-table :data="tableData" stripe border>
    				<el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
    				<el-table-column prop="companyname" label="公司名称" width="140" align="center"></el-table-column>
    				<el-table-column prop="phone" label="电话" width="140" align="center"></el-table-column>
    				<el-table-column prop="address" label="地址" width="200" align="center"></el-table-column>
    				<el-table-column prop="provice" label="省" width="140" align="center"></el-table-column>
    				<el-table-column prop="city" label="市" width="140" align="center"></el-table-column>
    				<el-table-column prop="district" label="区" width="140" align="center"></el-table-column>
                    <el-table-column prop="baidulongitude" label="经度" width="100" align="center"></el-table-column>
                    <el-table-column prop="baidulatitude" label="纬度" align="center"></el-table-column>
    				<el-table-column :context="_self" inline-template label="操作" width="160" align="center" fixed="right">
          				<div>
            				<el-button size="small" type="primary" @click="openUpdateCompanyForm(row)">修改
            				</el-button>
          				</div>
        			</el-table-column>
  				</el-table>
		  </el-col>
		</el-row>

		<el-dialog title="新增公司" v-model="addCompanyFormVisible">
      		<el-form ref="addCompanyForm" :model="addCompanyForm" :rules="rules" 
          label-position="top">
        	<el-row>
          		<el-col :span="2">&nbsp;</el-col>
          		<el-col :span="9">
            	<el-form-item label="省" prop="provice">
              	<el-input v-model="addCompanyForm.provice"></el-input>
            	</el-form-item>
            	<el-form-item label="市" prop="city">
              	<el-input v-model="addCompanyForm.city"></el-input>
            	</el-form-item>
            	<el-form-item label="区" prop="district">
              	<el-input v-model="addCompanyForm.district"></el-input>
            	</el-form-item>
            	<el-form-item label="公司名称" prop="companyname">
              	<el-input v-model="addCompanyForm.companyname"></el-input>
            	</el-form-item>
          		</el-col>
          		<el-col :span="2">&nbsp;</el-col>
          		<el-col :span="9">
            	<el-form-item label="经度" prop="baidulongitude">
              	<el-input v-model="addCompanyForm.baidulongitude"></el-input>
            	</el-form-item>
            	<el-form-item label="纬度" prop="baidulatitude">
              	<el-input v-model="addCompanyForm.baidulatitude"></el-input>
            	</el-form-item>
            	<el-form-item label="电话" prop="phone">
              	<el-input v-model="addCompanyForm.phone"></el-input>
            	</el-form-item>
            	<el-form-item label="地址" prop="address">
              	<el-input v-model="addCompanyForm.address"></el-input>
            	</el-form-item>
          		</el-col>
        	</el-row>
        	<el-row>
        	<el-col :span="2">&nbsp;</el-col>
        	<el-col :span="20">
        	 <el-form-item label="登陆页LOGO" prop="loginlogo">
              <el-upload :action="imgUploadUrl" type="drag" :before-upload="handleUploadBefore" :on-preview="handlePreview"
              :on-error="handleUploadError" :on-success="handleLoginLogoUploadSuccess" :default-file-list="fileList"
              :thumbnail-mode="true">
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            </el-col>
        	</el-row>
        	<el-row>
        	<el-col :span="2">&nbsp;</el-col>
        	<el-col :span="20">
        	 <el-form-item label="登陆页背景图" prop="backgroundimg">
              <el-upload :action="imgUploadUrl" type="drag" :before-upload="handleUploadBefore" :on-preview="handlePreview"
              :on-error="handleUploadError" :on-success="handleBackgroundimgUploadSuccess" 
              :default-file-list="fileList"
              :thumbnail-mode="true">
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            </el-col>
        	</el-row>
        	<el-row>
        	<el-col :span="2">&nbsp;</el-col>
        	<el-col :span="20">
        	 <el-form-item label="左上角LOGO" prop="logo">
              <el-upload :action="imgUploadUrl" type="drag" :before-upload="handleUploadBefore" :on-preview="handlePreview"
              :on-error="handleUploadError" :on-success="handleLogoUploadSuccess" :default-file-list="fileList"
              :thumbnail-mode="true">
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            </el-col>
        	</el-row>
      		</el-form>
      	<div slot="footer" class="dialog-footer">
        <el-button @click="closeAddCompanyForm">取 消</el-button>
        <el-button type="primary" @click="handleAddCompany">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改公司" v-model="updateCompanyFormVisible">
      		<el-form ref="updateCompanyForm" :model="updateCompanyForm" :rules="rules2" label-position="top">
        	<el-row>
          		<el-col :span="2">&nbsp;</el-col>
          		<el-col :span="9">
            	<el-form-item label="省" prop="provice">
              	<el-input v-model="updateCompanyForm.provice"></el-input>
            	</el-form-item>
            	<el-form-item label="市" prop="city">
              	<el-input v-model="updateCompanyForm.city"></el-input>
            	</el-form-item>
            	<el-form-item label="区" prop="district">
              	<el-input v-model="updateCompanyForm.district"></el-input>
            	</el-form-item>
            	<el-form-item label="公司名称" prop="companyname">
              	<el-input v-model="updateCompanyForm.companyname"></el-input>
            	</el-form-item>
          		</el-col>
          		<el-col :span="2">&nbsp;</el-col>
          		<el-col :span="9">
            	<el-form-item label="经度" prop="baidulongitude">
              	<el-input v-model="updateCompanyForm.baidulongitude"></el-input>
            	</el-form-item>
            	<el-form-item label="纬度" prop="baidulatitude">
              	<el-input v-model="updateCompanyForm.baidulatitude"></el-input>
            	</el-form-item>
            	<el-form-item label="电话" prop="phone">
              	<el-input v-model="updateCompanyForm.phone"></el-input>
            	</el-form-item>
            	<el-form-item label="地址" prop="address">
              	<el-input v-model="updateCompanyForm.address"></el-input>
            	</el-form-item>
          		</el-col>
        	</el-row>
        	<el-row>
        	<el-col :span="2">&nbsp;</el-col>
        	<el-col :span="20">
        	 <el-form-item label="登陆页LOGO" prop="loginlogo">
              <el-upload :action="imgUploadUrl" type="drag" 
              :before-upload="handleUploadBefore" :on-remove="handleLoginLogoRemove"
              :on-error="handleUploadError" :on-success="handleLoginLogoUploadSuccess2" 
              :default-file-list="loginlogoList" :on-preview="handlePreview"
              :thumbnail-mode="true">
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            </el-col>
        	</el-row>
        	<el-row>
        	<el-col :span="2">&nbsp;</el-col>
        	<el-col :span="20">
        	 <el-form-item label="登陆页背景图" prop="backgroundimg">
              <el-upload :action="imgUploadUrl" type="drag" 
              :before-upload="handleUploadBefore" :on-remove="handleBgimgRemove"
              :on-error="handleUploadError" :on-success="handleBackgroundimgUploadSuccess2" 
              :default-file-list="bgimgList" :on-preview="handlePreview"
              :thumbnail-mode="true">
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            </el-col>
        	</el-row>
        	<el-row>
        	<el-col :span="2">&nbsp;</el-col>
        	<el-col :span="20">
        	 <el-form-item label="左上角LOGO" prop="logo">
              <el-upload :action="imgUploadUrl" type="drag" 
              :before-upload="handleUploadBefore" :on-remove="handleLogoRemove"
              :on-error="handleUploadError" :on-success="handleLogoUploadSuccess2" 
              :default-file-list="logoList" :on-preview="handlePreview"
              :thumbnail-mode="true">
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            </el-col>
        	</el-row>
      		</el-form>
      	<div slot="footer" class="dialog-footer">
        <el-button @click="updateCompanyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateCompany">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="图片查看" v-model="imgViewVisible">
      <span><img :src="imgViewUrl" style="width:100%;height:100%;"></span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="imgViewVisible = false">取 消</el-button>
      <el-button type="primary" @click="imgViewVisible = false">确 定</el-button>
      </span>
    </el-dialog>

	</div>
</template>

<script>
import Util from '../utils/util.js'

export default {
  data () {
    return {
      imgViewVisible: false,
      imgViewUrl: '',
      level: Util.getNowLevel(),
      companyName: '蓝丰科技有限公司',
      // updateCompanyLogo: false,
      logoList: [],
      bgimgList: [],
      loginlogoList: [],
      companyInfoGetBody: { _id: '' },
      addCompanyForm: {
        provice: '',
        city: '',
        district: '',
        baidulongitude: '',
        baidulatitude: '',
        companyname: '',
        phone: '',
        address: '',
        loginlogo: '',
        backgroundimg: '',
        logo: ''
      },
      updateCompanyForm: {
        _id: '',
        provice: '',
        city: '',
        district: '',
        baidulongitude: '',
        baidulatitude: '',
        companyname: '',
        phone: '',
        address: '',
        loginlogo: '',
        backgroundimg: '',
        logo: ''
      },
      addCompanyFormVisible: false,
      updateCompanyFormVisible: false,
      fileList: [],
      imgUploadUrl: Util.systemApi.companyImgUpload,
      tableData: [],
      rules: {
        provice: [
          { required: true, message: '省不能为空', trigger: 'change' }
        ],
        city: [
          { required: true, message: '市不能为空', trigger: 'change' }
        ],
        district: [
          { required: true, message: '区不能为空', trigger: 'change' }
        ],
        companyname: [
          { required: true, message: '公司名称不能为空', trigger: 'change' }
        ],
        baidulongitude: [
          { required: true, message: '经度不能为空', trigger: 'change' }
        ],
        baidulatitude: [
          { required: true, message: '纬度不能为空', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '电话不能为空', trigger: 'change' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'change' }
        ],
        loginlogo: [
          { required: true, message: '登陆页LOGO不能为空', trigger: 'change' }
        ],
        backgroundimg: [
          { required: true, message: '登陆页背景图不能为空', trigger: 'change' }
        ],
        logo: [
          { required: true, message: '左上角LOGO不能为空', trigger: 'change' }
        ]
      },
      rules2: {
        provice: [
          { required: true, message: '省不能为空', trigger: 'change' }
        ],
        city: [
          { required: true, message: '市不能为空', trigger: 'change' }
        ],
        district: [
          { required: true, message: '区不能为空', trigger: 'change' }
        ],
        companyname: [
          { required: true, message: '公司名称不能为空', trigger: 'change' }
        ],
        baidulongitude: [
          { required: true, message: '经度不能为空', trigger: 'change' }
        ],
        baidulatitude: [
          { required: true, message: '纬度不能为空', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '电话不能为空', trigger: 'change' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'change' }
        ],
        loginlogo: [
          { required: true, message: '登陆页LOGO不能为空', trigger: 'change' }
        ],
        backgroundimg: [
          { required: true, message: '登陆页背景图不能为空', trigger: 'change' }
        ],
        logo: [
          { required: true, message: '左上角LOGO不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    getCompanyInfo () {
      let level = Util.getNowLevel()
      if (level !== 0) {
        let nowUser = Util.localStorageGet('nowUser')
        let companyid = nowUser === null ? null : nowUser.companyid
        this.$set(this.companyInfoGetBody, '_id', companyid)
        // this.$set(this, 'companyInfoGetBody', companyid)
      } else {
        this.$set(this.companyInfoGetBody, '_id', '')
        // this.$set(this, 'companyInfoGetBody', '')
      }
      this.$http.post(Util.systemApi.companyGet, this.companyInfoGetBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取公司数据失败', response.data.data)
            } else {
              this.$set(this, 'tableData', response.data.data)
              console.log(response.data.data)
            }
          })
          .catch(function (response) {
            Util.showError('获取公司数据失败', '网络错误，请稍后重试')
          })
    },
    openAddCompanyForm () {
      this.addCompanyFormVisible = true
    },
    closeAddCompanyForm () {
      this.$refs.addCompanyForm.resetFields()
      this.addCompanyFormVisible = false
    },
    handleAddCompany () {
      this.$refs.addCompanyForm.validate((valid) => {
        if (valid) {
          this.$http.post(Util.systemApi.companyAdd, this.addCompanyForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('新增公司失败', response.data.data)
            } else {
              this.getCompanyInfo()
            }
          })
          .catch(function (response) {
            Util.showError('新增公司失败', '网络错误，请稍后重试')
          })
          this.addCompanyFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    openUpdateCompanyForm (row) {
      this.updateCompanyFormVisible = true
      this.$set(this.updateCompanyForm, '_id', row._id)
      this.$set(this.updateCompanyForm, 'provice', row.provice)
      this.$set(this.updateCompanyForm, 'city', row.city)
      this.$set(this.updateCompanyForm, 'district', row.district)
      this.$set(this.updateCompanyForm, 'companyname', row.companyname)
      this.$set(this.updateCompanyForm, 'phone', row.phone)
      this.$set(this.updateCompanyForm, 'address', row.address)
      this.$set(this.updateCompanyForm, 'baidulongitude', row.baidulongitude)
      this.$set(this.updateCompanyForm, 'baidulatitude', row.baidulatitude)
      this.$set(this.updateCompanyForm, 'loginlogo', row.loginlogo)
      this.$set(this.updateCompanyForm, 'backgroundimg', row.backgroundimg)
      this.$set(this.updateCompanyForm, 'logo', row.logo)
      let temp = [{ name: '登陆页LOGO', url: row.loginlogo }]
      this.$set(this, 'loginlogoList', temp)
      temp = [{ name: '登陆页背景图', url: row.backgroundimg }]
      this.$set(this, 'bgimgList', temp)
      temp = [{ name: '左上角LOGO', url: row.logo }]
      this.$set(this, 'logoList', temp)
    },
    handleUpdateCompany () {
      this.$http.post(Util.systemApi.companyUpdate, this.updateCompanyForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('修改公司信息失败', response.data.data)
            } else {
              this.getCompanyInfo()
            }
          })
          .catch(function (response) {
            Util.showError('修改公司信息失败', '网络错误，请稍后重试')
          })
      this.updateCompanyFormVisible = false
    },
    updateCompanyName () {
      this.$prompt('请输入新的公司名称', '修改公司名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?! +$).+/,
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '公司名称不允许为空'
      })
      .then(({ value }) => {
        this.$message({
          type: 'success',
          message: '您的公司名称是: ' + value
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleLoginLogoRemove (file, fileList) {
      this.loginlogoList = []
    },
    handleBgimgRemove (file, fileList) {
      this.bgimgList = []
    },
    handleLogoRemove (file, fileList) {
      this.logoList = []
    },
    handlePreview (file) {
      this.viewImg(file.url)
    },
    handleUploadBefore (file) {
      console.log(file)
    },
    handleUploadError (err, response, file) {
      console.log(err)
      console.log(response.data.data)
    },
    handleLoginLogoUploadSuccess (response, file, fileList) {
      // console.log(response.data)
      this.$set(this.addCompanyForm, 'loginlogo', response.data)
    },
    handleBackgroundimgUploadSuccess (response, file, fileList) {
      // console.log(response.data)
      this.$set(this.addCompanyForm, 'backgroundimg', response.data)
    },
    handleLogoUploadSuccess (response, file, fileList) {
      // console.log(response.data)
      this.$set(this.addCompanyForm, 'logo', response.data)
    },
    handleLoginLogoUploadSuccess2 (response, file, fileList) {
      // console.log(response.data)
      this.$set(this.updateCompanyForm, 'loginlogo', response.data)
    },
    handleBackgroundimgUploadSuccess2 (response, file, fileList) {
      // console.log(response.data)
      this.$set(this.updateCompanyForm, 'backgroundimg', response.data)
    },
    handleLogoUploadSuccess2 (response, file, fileList) {
      // console.log(response.data)
      this.$set(this.updateCompanyForm, 'logo', response.data)
    },
    viewImg (url) {
      this.imgViewVisible = true
      this.imgViewUrl = url
    }
  },
  mounted: function () {
    this.getCompanyInfo()
  }
}
</script>

<style>
.content-name {
  font-size: 20px;
  color: #8492A6;
  margin-top: 20px;
  margin-left: 200px;
  text-align: left;
  /*background-color: #20A0FF;*/
}
/*.bottom {
  margin-top: 13px;
  line-height: 12px;
}*/
.button {
  float: right;
  margin-bottom: 10px;
}
/*.clearfix:before
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}*/
.submit-button {
  width: 100%;
}
.gap {
  min-width: 20px;	
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background: #d3dce6;
}
</style>