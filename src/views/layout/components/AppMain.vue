<template>
  <div class="layadmin-tabsbody-item layui-show appmain-bg">
    <!-- <transition name="fade" mode="out-in">
     <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition> -->
    <keep-alive :include="keepAlive">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.fullPath
      },
      keepAlive() {
        return this.$store.getters.keepAlive;
      }
    }
  }
</script>
