<template>
	<div>
		<div id="background" style="position:absolute; left:0px; top:0px; width:100%; height:100%; position:fixed; z-index:-1;">
			<img src="../../static/image/index/loginbg.png" height="100%" width="100%">
		</div>
		<div id="login">
			<el-row>
				<el-col :span="24"><img src="../../static/image/index/login_logo.png"></el-col>
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
  export default {
    data () {
      return {
        username: '',
        password: '',
        apiUrl: '/api/user/login',
        loginForm: {
          username: '',
          password: ''
        },
        loginErrorInfo: '用户名或密码错误，请重新登录',
        networkErrorInfo: '网络错误，请稍后重试'
      }
    },
    methods: {
      // onSubmit: function () {
      //   this.$http.get(this.apiUrl)
      //     .then((response) => {
      //       this.$set(this, 'password', response.data.name)
      //     })
      // },
      showError (info) {
        this.$notify.error({
          title: '登录失败',
          message: info,
          offset: 100
        })
      },
      onSubmit: function () {
        this.$http.post(this.apiUrl, this.loginForm)
          .then((response) => {
            console.log(response.data.code)
            if (response.data.code === '0') {
              this.showError(this.loginErrorInfo)
            } else {
              var storage = window.localStorage
              storage.setItem('nowUser', JSON.stringify(response.data.data))
              console.log(JSON.parse(storage['nowUser']))
              this.$router.push({path: '/main'})
            }
          })
          .catch(function (response) {
            this.showError(this.networkErrorInfo)
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
      }
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
</style>
