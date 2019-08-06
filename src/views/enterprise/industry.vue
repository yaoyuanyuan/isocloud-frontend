<template>
  <div class="appmain-bg">
    <div class="ad-header layui-form">
      <div class="adh-logo">
        <svg-icon icon-class="Icon-Industry"></svg-icon>
      </div>
      <h3 class="adh-title">行业管理</h3>
      <div class="adh-selected">
        <a href="javascript:;" class="isselected">全部<i>(</i>{{total}}<i>)</i></a>
      </div>
      <div class="adh-right">
        <div class="adh-sreach">
          <select name="sysreach" lay-filter="sysreach">
            <option value="0">行业名称</option>
          </select>
        </div>
        <input type="text" name="title" lay-verify="" autocomplete="off" placeholder="" class="adh-input" v-model="automsg">
        <div class="adh-sreachbtn adh-npborderleft" @click="simpleSearch()">
          <svg-icon icon-class="Icon-Search"></svg-icon>
        </div>
        </div>
      </div>
    <el-table ref="multipleTable" :data="mainmsg.list" tooltip-effect="dark" style="width: 100%" border>
      <!-- <el-table-column type="selection" width="46" align="center">
      </el-table-column> -->
      <el-table-column prop="code" label="国民行业编号" min-width="130" class-name="tdpl36">
      </el-table-column>
      <el-table-column prop="name" label="行业名称" min-width="324">
      </el-table-column>
      <el-table-column prop="englishName" label="行业英文名称" min-width="492">
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" min-width="186">
      </el-table-column>
    </el-table>
    <!--分页容器-->
    <div id="pagination"></div>
  </div>
</template>

<script>
  import {
    getList
  } from '@/api/industry'
  export default {
    inject: ['reload'],
    data() {
      return {
        'isFirstEnter': false, // 是否第一次进入，默认false
        'automsg': '',
        'headerselected': 0,
        'mainmsg': '',
        'preparems': '',
        "total": '',
        'changemainmsg': true,
      }
    },
    //    自定义指令clickoutside绑定了一个函数handleClose用来关闭菜单
    directives: {
      clickoutside: {
        bind: function(el, binding, vnode) {
          function documentHandler(e) {
            if (el.contains(e.target)) {
              return false;
            }
            if (binding.expression) {
              binding.value(e)
            }
          }
          el._vueClickOutside_ = documentHandler;
          document.addEventListener('click', documentHandler);
        },
        unbind: function(el, binding) {
          document.removeEventListener('click', el._vueClickOutside_);
          delete el._vueClickOutside_;
        }
      }
    },
    created() {
      this.getquery();
    },
    methods: {
      //请求列表数据
      getquery: function(val) {
        if (val) {
          var parems = val
        } else {
          var parems = {
            "name": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10
          }
        }
        this.preparems = parems
        getList(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result;
            this.total = res.result.total
          }
        })
      },
      //简单搜索
      simpleSearch: function() {
        let headerindex = this.headerselected
        if (headerindex == 0) {
          var parems = {
            "name": this.automsg,
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10
          }
        }
        this.preparems = parems
        getList(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result
            this.total = res.result.total
          }
        })
      },
      //刷新table
      refshtable: function() {
        let parems = this.preparems
        getList(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result
            this.total = res.result.total
          }
        })
      },
      //刷新路由
      refsh: function() {
        this.reload()
      },
    },
    watch: {
      'mainmsg': function(newVal, oldVal) {
        if (newVal != oldVal) {
          this.changemainmsg = true
        }
      }
    },
    updated: function() {
      let _this = this;
      layui.use(['form'], function() {
        var form = layui.form;
        form.render('select');
      })
      if (this.changemainmsg) {
        this.$nextTick(function() {
          layui.use(['laypage'], function() {
            var laypage = layui.laypage;
            laypage.render({
              elem: 'pagination',
              count: _this.mainmsg.total,
              limit: _this.mainmsg.pageSize,
              curr: _this.mainmsg.pageNum,
              layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
              jump: function(obj, first) {
                if (!first) {
                  let parems = _this.preparems;
                  parems.pageNum = obj.curr;
                  parems.pageSize = obj.limit;
                  _this.getquery(parems)
                }
              }
            });
          });
        });
        this.changemainmsg = false
      }
    },
    mounted() {
      let _this = this;
      layui.use(['form', 'laydate'], function() {
        var form = layui.form;
        var laydate = layui.laydate;
        form.render('select');
        form.on('select(sysreach)', function(data) {
          _this.headerselected = data.value
        })
      })
    }
  }
</script>

<style>
</style>
