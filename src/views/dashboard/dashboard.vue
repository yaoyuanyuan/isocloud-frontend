<template>

		<div class="layui-fluid">
			<!-- <div class="da-1">
		<div class="da-1-left"></div>
		<div class="da-1-right"></div>
	</div> -->
	<img src="../../../static/img/shouye.png" style="display: block;width: 100%;height: 100%;">
		</div>
</template>

<script>

import nxDataDisplay from '@/components/nx-data-display/nx-data-display'
import nxDataCard from '@/components/nx-data-card/nx-data-card'
import nxDataTabs from '@/components/nx-data-tabs/nx-data-tabs'
import nxDataIcons from '@/components/nx-data-icons/nx-data-icons'
export default {
  name: 'report',
  components: {
    nxDataDisplay,
    nxDataCard,
    nxDataTabs,
    nxDataIcons
  },
  data() {
    return {
    }
  },
  created() {
		$('.layui-side-menu a').parent().parent().parent().removeClass('layui-nav-itemed')
		$('.layui-side-menu a').parent().removeClass('layui-this')
	},
  watch: {},
  mounted() {},
  computed: {}
}
</script>

<style>

</style>
