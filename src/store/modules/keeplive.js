const keepalive = {
  // 属性初始化
  state: {
    // 动态缓存需要的组件
    keepAlive: [] // 这里添加的是vue文件的name
  },
  // 更改属性状态  同步
  mutations: {
    setKeepAlive: (state, keepAlive) => {
      state.keepAlive = keepAlive;
    }
  },
  // 应用更改的属性状态 异步
  actions: {
  }
}

export default keepalive
