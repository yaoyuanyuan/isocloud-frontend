<template>
	<el-form class="login-form" ref="loginForm" :model="loginForm" label-width="0">
		<div class="login-error" v-show="error">{{errorcontent}}</div>
		<el-form-item>
			<el-input size="small" type="count" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off"
			 placeholder="请输入用户名" @focus="error = false;errorcontent = ''">
				<!-- <i slot="prefix" class="icon-yonghu"></i> -->
			</el-input>
		</el-form-item>
		<el-form-item>
			<el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password"
			 auto-complete="off" placeholder="请输入密码" @focus="error = false;errorcontent = ''">
				<i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
				<!-- <i slot="prefix" class="icon-mima"></i> -->
			</el-input>
		</el-form-item>
		<div class="login-check">
			<el-checkbox v-model="checked">记住密码</el-checkbox>
			<p class="login-check-p" @click="wangjimima()">忘记密码？</p>
		</div>
		<el-form-item>
			<el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import {
		isvalidUsername
	} from '@/utils/validate'
	export default {
		name: 'userlogin',
		data() {
			return {
				error: false,
				errorcontent: '',
				loginForm: {
					username: '',
					password: ''
				},
				checked: false,
				passwordType: 'password'
			}
		},
		created() {
			// 在页面加载时从cookie获取登录信息
			let Base64 = require('js-base64').Base64
			let username = this.getCookie("username")
			let password = Base64.decode(this.getCookie("password"))
			// 如果存在赋值给表单，并且将记住密码勾选
			if (username) {
				this.loginForm.username = username
				this.loginForm.password = password
				this.checked = true
			}
		},
		mounted() {},
		computed: {},
		props: [],
		methods: {
			wangjimima() {
				this.$confirm('请与艾思欧相关销售人员联系！', '', {
					showConfirmButton: false,
					cancelButtonText: '确定',
					type: 'warning'
				}).catch(() => {

				})
			},
			showPassword() {
				this.passwordType === '' ?
					(this.passwordType = 'password') :
					(this.passwordType = '')
			},
			handleLogin() {
				if(this.loginForm.username==''){
					this.error = true
					this.errorcontent = '请输入账号'
					return
				}
				if(this.loginForm.password==''){
					this.error = true
					this.errorcontent = '请输入密码'
					return
				}
				this.$store.dispatch('Login', this.loginForm).then(res => {
					this.setUserInfo()
					this.$router.push({
						path: '/dashboard/dashboard'
					})
				})
			},
			// 储存表单信息
			setUserInfo: function() {
				// 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
				// 如果没有勾选，储存的信息为空
				if (this.checked) {
					this.setCookie("username", this.loginForm.username)
					// base64加密密码
					let Base64 = require('js-base64').Base64
					var passWord = Base64.encode(this.loginForm.password)
					this.setCookie("password", passWord)
					this.setCookie("checked", this.checked)
				} else {
					this.setCookie("username", "")
					this.setCookie("password", "")
				}
			},
			// 获取cookie
			getCookie: function(key) {
				if (document.cookie.length > 0) {
					var start = document.cookie.indexOf(key + '=')
					if (start !== -1) {
						start = start + key.length + 1
						var end = document.cookie.indexOf(';', start)
						if (end === -1) end = document.cookie.length
						return unescape(document.cookie.substring(start, end))
					}
				}
				return ''
			},
			// 保存cookie
			setCookie: function(cName, value, expiredays) {
				var exdate = new Date()
				exdate.setDate(exdate.getDate() + expiredays)
				document.cookie = cName + '=' + decodeURIComponent(value) +
					((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
			},
		}
	}
</script>
<style>
</style>
