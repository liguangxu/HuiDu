<template>
	<div>
		<div id="background" style="position:absolute; left:0px; top:0px; width:100%; height:100%; position:fixed; z-index:-1;">
			<img :src="backgroundimg" height="100%" width="100%">
		</div>
		<div id="login">
			<el-row>
				<el-col :span="24"><img :src="loginlogo" width="450" height="65"></el-col>
			</el-row><br><br>
			<el-form ref="loginForm" :model="loginForm">
				<el-row>
					<el-col :span="2">&nbsp;</el-col>
					<el-col :span="20">
						<el-form-item>
							<el-input v-model="loginForm.username" size="large" placeholder="请输入用户名"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input v-model="loginForm.password" size="large" placeholder="请输入密码" 
								type="password"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="large" style="width: 100%;" @click="onSubmit">登 录
							</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="2">&nbsp;</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
  import Util from '../utils/util.js'

  export default {
    data () {
      return {
        loginlogo: '../../static/image/index/login_logo.png',
        backgroundimg: '../../static/image/index/loginbg.png',
        loginForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit: function () {
        this.$http.post(Util.userApi.login, this.loginForm)
          .then((response) => {
            // console.log(response.data.code)
            if (response.data.code === '0') {
              Util.showError('登录失败', '用户名或密码错误，请重新登录')
            } else {
              Util.localStorageSet('nowUser', response.data.data)
              Util.setNowSceneid(null, response.data.data.sceneList)
              // console.log(JSON.parse(window.localStorage['nowUser']))
              this.$router.push({path: '/main'})
            }
          })
          .catch(function (response) {
            Util.showError('登录失败', '网络错误，请稍后重试')
          })
      },
      goto () {
        if (this.loginForm.username === 'a' && this.loginForm.password === 'a') {
          this.$router.push({path: '/main'})
        }
      },
      goto2 () {
        if (this.username === 'admin' && this.password === 'admin') {
          this.$router.push({path: '/main'})
          return
        }
      },
      onSubmitTest () {
        Util.showError('哈哈哈', '2333')
        this.$http.get('../../static/json/login.json')
          .then((response) => {
            // console.log(response)
            if (response.data.code === '0') {
              this.showError(this.loginErrorInfo)
            } else {
              var storage = window.localStorage
              storage.setItem('nowUser', JSON.stringify(response.data.data))
              console.log(JSON.parse(storage['nowUser']))
              this.$router.push({path: '/main'})
            }
          })
      },
      getCompanyByUrl () {
        let url = window.location.href
        let arrays = url.split('#')
        let currentPath = 'http://114.55.92.31/'
        if (arrays !== null && arrays.length > 0) {
          currentPath = arrays[0]
        }
        // currentPath = 'http://114.55.92.31/'
        let body = { homepageurl: currentPath }
        console.log('url body-------------')
        console.log(body)
        this.$http.post(Util.systemApi.companyGetByUrl, body)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取当前公司信息失败', response.data.data)
            } else {
              Util.localStorageSet('currentCompanyInfo', response.data.data)
              console.log('url back-------------')
              console.log(response.data.data)
              if (response.data.data.loginlogo !== null) {
                this.$set(this, 'loginlogo', response.data.data.loginlogo)
              }
              if (response.data.data.backgroundimg !== null) {
                this.$set(this, 'backgroundimg', response.data.data.backgroundimg)
              }
            }
          })
          .catch(function (response) {
            Util.showError('获取当前公司信息失败', '网络错误，请稍后重试')
          })
      }
    },
    mounted: function () {
      this.getCompanyByUrl()
    }
  }
</script>

<style>
#login {
	width: 450px;
	height: 380px;
	position: fixed;
	text-align: center;	
	left:50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
.loginlogImg {
  width: 450px;
  height: 65px;
}
</style>
