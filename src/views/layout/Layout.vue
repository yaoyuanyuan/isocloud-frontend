<template>
  <div class="layui-layout layui-layout-admin">
		<!-- 头部区域 -->
		<div class="layui-header"><navbar></navbar></div>
		<!-- 侧边菜单栏 -->
		<div class="layui-side layui-side-menu"><sidebar> </sidebar></div>
		<!-- 主体内容 -->
    <div class="layui-body">
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    }
  },
  methods: {
    
  }
}
</script>