<template>
  <div>
    <script id="editor" type="text/plain"></script>
		<div class="contenterror" v-if="contenterror">公告内容为空</div>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
			contenterror:{
				type:Boolean
			}
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        //_this.editor.setContent('111'); // 确保UE加载完成后，放入内容。
      });
			this.editor.addListener('focus',function(){
				_this.contenterror = false;
			})
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
			setUEContent(val) { // 获取内容方法
			  return this.editor.setContent(val)
			}
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
<style>
	.contenterror{
		color: #ff4912;
	}
</style>