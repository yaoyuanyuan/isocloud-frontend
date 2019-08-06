<template>
  <div Class="layui-side-scroll">
    <div class="layui-logo"><img src="static/img/logo.png"></div>
      <sidebar-item :routes="permission_routers" :routerselected="routerselected"></sidebar-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routers',
			'routerselected'
    ])
  },
	methods:{
		
	}
}
</script>