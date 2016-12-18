<template>
	<div class="content-name">
		<br><br>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="6">公司名称</el-col>
		</el-row>
		<br><br>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="5"><el-input placeholder="请输入公司名称" v-model="companyName" :disabled="true"></el-input></el-col>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="2">
				<el-button type="info" @click="updateCompanyName">修改</el-button>
			</el-col>
		</el-row>
		<br><br><br>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="6">登陆页Logo</el-col>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="6">登陆页背景图</el-col>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="6">左上角Logo</el-col>
			<el-col :span="3">&nbsp;</el-col>
		</el-row>
		<br>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="6">
				<el-upload action="//jsonplaceholder.typicode.com/posts/" type="drag" :thumbnail-mode="true" 
					:on-preview="handlePreview" :on-remove="handleRemove" :default-file-list="logoList">
					<i class="el-icon-upload"></i>
					<div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-col>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="6">
				<el-upload action="//jsonplaceholder.typicode.com/posts/" type="drag" :thumbnail-mode="true" 
					:on-preview="handlePreview" :on-remove="handleRemove" :default-file-list="bgList">
					<i class="el-icon-upload"></i>
					<div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-col>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="6">
				<el-upload action="//jsonplaceholder.typicode.com/posts/" type="drag" :thumbnail-mode="true" 
					:on-preview="handlePreview" :on-remove="handleRemove" :default-file-list="logoList">
					<i class="el-icon-upload"></i>
					<div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-col>
			<el-col :span="2">&nbsp;</el-col>
		</el-row>
		<br><br><br>
		<el-row>
			<el-col :span="16">&nbsp;</el-col>
			<el-col :span="3">
				<el-button type="primary" size="large" class="submit-button">提交</el-button>
			</el-col>
			<!-- <el-col :span="10">&nbsp;</el-col> -->
		</el-row>
	</div>
</template>

<script>
export default {
  data () {
    return {
      companyName: '蓝丰科技有限公司',
      // updateCompanyLogo: false,
      logoList: [{name: 'logo图', url: '../../static/image/index/login_logo.png'}],
      bgList: [{name: '背景图', url: '../../static/image/index/loginbg.png'}]
    }
  },
  methods: {
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
    handlePreview (file) {
      console.log(file)
    }
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
</style>