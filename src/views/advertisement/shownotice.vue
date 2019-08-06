<template>
	<div class="appmain-bg">
		<div class="sn-header">
			<div class="sn-logo">
				<svg-icon icon-class="Icon-Message"></svg-icon>
			</div>
			<h3 class="sn-title">公告详情</h3>
			<div class="sn-right">
				<div class="sn-icon" @click="routersreturn()">
					<svg-icon icon-class="Icon-return"></svg-icon>
				</div>
			</div>
		</div>
		<div style="width: 100%;height: 31px;border-top: 1px solid #e8e8ed;margin-top: 10px;"></div>
		<div class="shownotice-container">
			<div class="shownc-title">{{title}}</div>
			<div class="shownc-content"></div>
		</div>

	</div>
</template>

<script>
	import {
		addNotice,getNotice,upNotice
	} from '@/api/notice'
	export default {
		data() {
			return {
				title:'',
				content:''
			}
		},
		created() {
			if (this.$route.query.id) {
				this.isedit = true
				var id = {
					id : this.$route.query.id
				}
				this.getinfo(id)
			}
		},
		methods: {
			//返回上一页
			routersreturn: function() {
				this.$router.go(-1);
			},
			//查询
			getinfo:function(val){
				let _this = this
				getNotice(val).then(res => {
					if (res.code == 200) {
						_this.title = res.result.title;
						_this.content = res.result.content;
						$('.shownc-content').html(res.result.content)
					}
				})
			}
		}
	}
</script>

<style>
	.sn-header {
		width: 100%;
		height: 54px;
		position: relative;
	}

	.sn-logo {
		width: 40px;
		height: 40px;
		position: absolute;
		left: 16px;
		top: 14px;
		background: #0099ff;
		font-size: 40px;
		border-radius: 4px;
	}

	.sn-title {
		font-size: 16px;
		line-height: 16px;
		position: absolute;
		left: 68px;
		top: 14px;
	}

	.sn-right {
		position: absolute;
		right: 16px;
		bottom: 0px;
		display: flex;
		justify-content: flex-start;
		height: 30px;
	}

	.sn-icon {
		width: 32px;
		height: 30px;
		text-align: center;
		line-height: 28px;
		border: 1px solid #DDDDDD;
		cursor: pointer;
		color: #96969d;
		margin-left: 10px;
		overflow: hidden;
	}

	.sn-icon:hover {
		border: 1px solid #0099ff;
		color: #0099ff;
	}

	.shownotice-container {
		margin: 0 17px 17px 17px;
		min-height: 512px;
		border: 1px solid #e8e8ed;
	}
	.shownc-title{
		margin: 60px 70px 0 70px;
		padding-bottom: 32px;
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		border-bottom: 1px solid #e8e8ed;
		word-wrap: break-word;
		word-break: normal;
	}
	.shownc-content{
		margin: 30px 70px 0 70px;
	}
</style>
