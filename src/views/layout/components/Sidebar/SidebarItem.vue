<template>
	<ul class="layui-nav layui-nav-tree" lay-filter="leftselected" lay-shrink="all" :xx="thisrouterselected">
		<li v-for="(item,index) in newroutes" class="layui-nav-item" :data-name="item.name||item.path" :class="headerchange&&index==0&&thisrouterselected!=1?'layui-nav-itemed':''"
		 :key="index" :data="index">

			<router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.children[0].alwaysShow"
			 :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
				<!-- <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon> -->
				<cite v-if="item.children[0].meta&&item.children[0].meta.title">{{generateTitle(item.children[0].meta.title)}}</cite>
			</router-link>

			<a v-else :key="item.name">
				<!-- <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon> -->
				<cite v-if="item.meta&&item.meta.title">{{generateTitle(item.meta.title)}}</cite>
				<span class="layui-nav-more"></span>
			</a>
			<dl v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow">
			</dl>
			<dl v-else class="layui-nav-child">
				<dd v-for="(child,index1) in item.children" v-if="!child.hidden" :data-name="item.path+'/'+child.path" :class="headerchange&&index==0&&index1==0&&thisrouterselected!=1?'layui-this':''"
				 :key="index1" :data="index1">
					<sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]"
					 :key="child.path"></sidebar-item>

					<router-link v-else :to="item.path+'/'+child.path" :key="child.name">
						<svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
						<cite v-if="child.meta&&child.meta.title">{{generateTitle(child.meta.title)}}</cite>
					</router-link>
				</dd>
			</dl>
		</li>
	</ul>
</template>

<script>
	import {
		generateTitle
	} from '@/utils/i18n'
	export default {
		name: 'SidebarItem',
		data() {
			return {
				'layui-nav-itemed': 'layui-nav-itemed',
				'layui-this': 'layui-this',
				'headerchange': false,
				'thisroutes': this.routes,
				'newroutes': '',
				'firstleftselectedpath': '',
				'thisrouterselected': this.routerselected
			}
		},
		props: {
			routes: {
				type: Array
			},
			routerselected: {
				type: String
			}
		},
		watch: {
			'routerselected': function(newVal, oldVal) {
				this.thisrouterselected = newVal;
				const newrouters = this.thisroutes;
				for (var i = 0; i < newrouters.length; i++) {
					if (newrouters[i].grade == this.thisrouterselected) {
						this.newroutes = newrouters[i].children
						if (newrouters[i].children) {
							this.firstleftselectedpath = newrouters[i].children[0].path + '/' + newrouters[i].children[0].children[0].path
						} else {
							this.firstleftselectedpath = newrouters[i].children[0].path
						}
					}
				}
				this.headerchange = true;
				layui.use('element', function() {
					const element = layui.element;
					element.init();
				})
				if (newVal == 1) {

				} else {
					this.leftselected()
				}
			},
			'routes': {
				immediate: true, // 很重要！！！
				handler: function(val) {
					for (var i = 0; i < val.length; i++) {
						if (val[i].grade == this.thisrouterselected) {
							this.newroutes = val[i].children
						}
					}
				}
			}
		},
		mounted() {
      $('.layui-header .layui-nav-item').find('a').removeClass('firstselected')
			$('.layui-header .layui-nav-item').eq(this.thisrouterselected-1).find('a').addClass('firstselected')
			$('a.router-link-exact-active').parent().parent().parent().addClass('layui-nav-itemed')
			$('a.router-link-exact-active').parent().addClass('layui-this')
			layui.use('element', function() {
				var element = layui.element;
				element.init();
				//一些事件监听
				// element.on('nav(leftselected)', function(data){
				// 	sessionStorage.setItem('isselected',[_this.routerselected,data.parent().parent().parent().attr('data'),data.parent().attr('data')])
				// });
			})
		},
		methods: {
			generateTitle,
			hasOneShowingChildren(children) {
				const showingChildren = children.filter(item => {
					return !item.hidden
				})
				if (showingChildren.length === 1) {
					return true
				}
				return false
			},
			leftselected() {
				let path = this.firstleftselectedpath
				this.$router.push({
					path: path
				});
			}
		},
		updated() {
			$('.layui-side-menu .layui-nav-itemed').removeClass('layui-nav-itemed')
			$('.layui-side-menu .layui-this').removeClass('layui-this')
			if (this.thisrouterselected != 1) {
				$('.layui-side-menu .layui-nav-item').eq(0).addClass('layui-nav-itemed')
				$('.layui-side-menu .layui-nav-child dd').eq(0).addClass('layui-this')
			}
		}
	}
</script>
