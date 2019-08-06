<template>
	<div mode="horizontal">
		<ul class="layui-nav layui-layout-left">
			<li class="layui-nav-item layui-hide-xs" lay-unselect="" v-for="(item,index) in permission_routers" v-if="!item.hidden&&item.grade" :key="index">
					<a href="javascript:;" @click="headerClick(item.grade)" :class="item.grade==selected?firstselected:''">{{generateTitle(item.meta.title)}}
						</a>
			</li>
			<li class="layui-nav-item layui-hide-xs" lay-unselect="" style="margin-left: 50px;">
				<input type="text" placeholder="搜索..." autocomplete="off" class="layui-input layui-input-search" layadmin-event="serach"
				 lay-action="template/search/keywords=" style="width: 400px;height: 26px;border-radius: 13px;">
			</li>
		</ul>
		<ul class="layui-nav layui-layout-right">
			<li class="layui-nav-item layui-hide-xs" lay-unselect="">
					<a href="javascript:;">管理员名称
						</a>
				
			</li>
			<li class="layui-nav-item layui-hide-xs" lay-unselect="">
				<a href="javascript:;">1001
					</a>
			</li>
			<li class="layui-nav-item layui-hide-xs" lay-unselect="">
				<a href="javascript:;" @click="logout">
					退出
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import nxLangSelect from '@/components/nx-lang-select/index'
	import { generateTitle } from '@/utils/i18n'

	export default {
		name: 'navBar',
		data(){
			return {
				firstselected:'firstselected',
				selected:'1'
			}
		},
		components: {
			nxLangSelect
		},
		computed: {
			...mapGetters(['sidebar', 'name', 'avatar','permission_routers','routerselected'])
		},
		mothed(){
				layui.use('element',function(){
					var element = layui.element;
				})
		},
		methods: {
			generateTitle,
			logout() {
				this.$store.dispatch('LogOut').then(() => {
					location.reload() // In order to re-instantiate the vue-router object to avoid bugs
				})
			},
			headerClick(index){
				this.selected = index;
				if(index==1){
					this.$router.push({
						path: "/dashboard/dashboard"
					});
				}
				this.$store.commit('SET_ROUTERSELECTED', index);
			}
		}
	}
</script>
<style>
	.firstselected{
		color: #f2f2f2;
		background-color: #383846;
	}
</style>