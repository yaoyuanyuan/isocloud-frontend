<template>
	<div class="login-container pull-height" @keyup.enter.native="handleLogin">
		<div class="login-header">
			<div class="login-logo">
				<svg-icon icon-class="logo"></svg-icon>
			</div>
			<div class="login-header-item">
				<a href="#" target="_blank" class="separation-line">艾思欧官网</a>
				<a href="#" target="_blank" class="separation-line">加入收藏</a>
				<a href="#" target="_blank" class="separation-line">帮助中心</a>
				<a href="#" target="_blank">社区论坛</a>
			</div>
		</div>
		<div class="loginBg">
			<div class="login-w1000">
				<p class="loginBG-content">高效、方便、快捷</p>
				<p class="loginBG-content loginBG-cbottom">企业管理体系智慧云平台</p>
				<div class="loginBG-img"></div>
				<div class="login-border">
					<h4 class="login-title">管理员登录</h4>
					<div class="login-main">
						<!-- <el-tabs v-model="activeName" style="width: 100%;">
							<el-tab-pane label="用户密码" name="user" stretch="true" style="width: 50%;text-align: center;"> -->
								<userLogin></userLogin>
							<!-- </el-tab-pane> -->
							<!-- <el-tab-pane label="短信验证码" name="code" stretch="true" style="width: 50%;text-align: center;">
								<codeLogin></codeLogin>
							</el-tab-pane> -->
						<!-- </el-tabs> -->
					</div>
				</div>
			</div>
		</div>
		<div class="login-footlink">
			<a href="http://www.szyouxuntong.cn/" target="_blanck" class="login-footsp">关于艾思欧</a>
			<a href="http://www.szyouxuntong.cn/" target="_blanck" class="login-footsp">联系我们</a>
			<a href="http://www.szyouxuntong.cn/" target="_blanck" class="login-footsp">人才招聘</a>
			<a href="http://www.szyouxuntong.cn/" target="_blanck" class="login-footmr">版权声明</a>
			<a href="http://www.miitbeian.gov.cn" target="_blanck">艾思欧版权所有 粤ICP备13005389号-4</a>
		</div>
	</div>
</template>
<script>
	import userLogin from './userlogin'
	import codeLogin from './codelogin'
	export default {
		name: 'login',
		components: {
			userLogin,
			codeLogin
		},
		data() {
			return {
				activeName: 'user'
			}
		},
		created() {},
		mounted() {},
		computed: {

		},
		props: [],
		methods: {}
	}
</script>

<style lang="scss">
	.login-container {}

	.login-header {
		width: 1000px;
		height: 84px;
		position: relative;
		margin: 0 auto;
	}

	.login-logo {
		width: 136px;
		height: 34px;
		position: absolute;
		left: 0;
		top: 25px;
	}

	.login-logo>svg {
		width: 136px !important;
		height: 34px !important;
	}

	.login-header-item {
		font-size: 14px;
		line-height: 14px;
		color: #2b2b2b;
		position: absolute;
		right: 0px;
		top: 35px;
	}

	.login-header-item a.separation-line:after {
		content: "";
		display: inline-block;
		vertical-align: middle;
		margin: -2px 14px 0 14px;
		width: 2px;
		height: 14px;
		background-color: #989898;
		font-size: 0;
	}

	.loginBg {
		width: 100%;
		height: 756px;
		position: relative;
		clear: both;
		background-color: #3fa2ff;
	}

	.login-w1000 {
		width: 1000px;
		height: 756px;
		margin: 0 auto;
		position: relative;
	}

	.loginBG-content {
		font-size: 24px;
		line-height: 24px;
		color: #fff;
		position: absolute;
		left: 0;
		top: 134px;
	}

	.loginBG-cbottom {
		left: 98px;
		top: 170px;
	}

	.loginBG-img {
		width: 590px;
		height: 344px;
		position: absolute;
		left: 0;
		top: 217px;
		background: url(../../assets/images/home/bg.png) no-repeat left top;
	}

	.login-border {
		width: 340px;
		height: 360px;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		box-shadow: 0px 5px 30px 0px rgba(153, 153, 153, 0.3);
		border-radius: 4px;
		position: absolute;
		right: 0;
		top: 150px;
	}

	.login-title {
		margin: 30px 0 10px;
		text-align: center;
		color: #1b1b2a;
		font-size: 16px;
		letter-spacing: 3px;
	}

	.login-main {
		margin: 0 30px;
	}

	.login-submit {
		margin-top: 20px;
		width: 280px;
		height: 44px;
		line-height: 44px;
		border-radius: 2px;
		padding: 0;
		font-size: 16px;
	}

	.login-form {
		//margin-top: 40px;
		padding-top: 40px;
		position: relative;

		.login-error {
			position: absolute;
			top: 10px;
			left: 0px;
			width: 280px;
			height: 24px;
			line-height: 24px;
			color: #ff4912;
			background-color: #ffebeb;
			border: solid 1px #faccc6;
			margin-bottom: -6px;
			text-align: left;
			&:before{
				content: "";
				display: inline-block;
				margin: 0 4px 0 8px;
				background: url(../../assets/images/home/logo-error.png) no-repeat left top;
				width: 16px;
				height: 16px;
				position: relative;
				top: 4px;
			}
		}

		.el-form-item__content {
			width: 280px;
		}

		.el-form-item {
			margin-bottom: 20px;
		}

		.el-input {
			input {
				width: 280px;
				height: 44px!important;
				line-height: 44px;
				font-size: 14px;
				text-indent: 5px;
				border: 1px solid #c9c9c9;
				border-radius: 2px;
			}

			.el-input__prefix {
				i {
					padding: 0 5px;
					font-size: 16px !important;
				}
			}
		}

		.login-check {
			width: 280px;
			display: flex;
			justify-content: space-between;
			line-height: 14px;
			height: 14px;
			margin-bottom: 18px;
			//margin: -10px 0;

			.el-checkbox__label {
				font-size: 12px;
				color: #aaaaaa;
			}

			.login-check-p {
				color: #0099ff;
				cursor: pointer;
			}
		}
	}

	.login-code {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: 0 0 0 10px;
	}

	.login-code-img {
		margin-top: 2px;
		width: 100px;
		height: 32px;
		background-color: #fdfdfd;
		border: 1px solid #f0f0f0;
		color: #333;
		font-size: 14px;
		font-weight: bold;
		letter-spacing: 5px;
		line-height: 32px;
		text-indent: 5px;
		text-align: center;
	}

	.login-footlink {
		width: 1000px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		padding-top: 24px;
		font-size: 12px;
		line-height: 12px;
		color: #828282;
	}

	.login-footlink a.login-footsp:after {
		content: "";
		display: inline-block;
		vertical-align: middle;
		margin: -2px 8px 0 8px;
		width: 1px;
		height: 12px;
		background: #a5a5a5;
	}

	.login-footlink a.login-footmr {
		margin-right: 11px;
	}
</style>
