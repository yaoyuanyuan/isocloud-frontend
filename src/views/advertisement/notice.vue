<template>
  <div class="appmain-bg">
    <div class="ad-header layui-form">
      <div class="adh-logo">
        <svg-icon icon-class="Icon-Adplacement"></svg-icon>
      </div>
      <h3 class="adh-title">消息公告</h3>
      <div class="adh-selected">
        <a href="javascript:;" class="isselected">全部<i>(</i>{{total}}<i>)</i></a>
      </div>
      <div class="adh-right">
        <div class="adh-sreach">
          <select name="sreach" lay-filter="sreach">
            <option value="0">发布人</option>
            <option value="1">发布账号</option>
            <option value="2">公告标题</option>
          </select>
        </div>
        <input type="text" name="title" lay-verify="" autocomplete="off" placeholder="" class="adh-input" v-model="headermsg">
        <div class="adh-sreachbtn adh-npborderleft" @click="simpleSearch()">
          <svg-icon icon-class="Icon-Search"></svg-icon>
        </div>
        <div class="adh-advancedSearch" @click="changeadvanced()"><span>高级搜索</span><i>
            <svg-icon icon-class="Icon-Advanced-Search" :class="isadvanced?'adh-xuanzhuan':''"></svg-icon>
          </i></div>
        <ul class="adh-ul">
          <li v-if="menuadd" @click="headeradd()">
            <svg-icon icon-class="Icon-Add"></svg-icon>
          </li>
          <li v-if="menuedit" @click="headeredit()">
            <svg-icon icon-class="Icon-Ddit"></svg-icon>
          </li>
          <li v-if="menudelete" @click="headerdel()">
            <svg-icon icon-class="Icon-Delete"></svg-icon>
          </li>
          <li v-if="menurefresh" @click="refsh()">
            <svg-icon icon-class="Icon-Refresh"></svg-icon>
          </li>
        </ul>
        <div v-clickoutside="menushow">
          <div class="adh-moremenu" @click="show=!show">
            <svg-icon icon-class="Icon-Menu"></svg-icon>
          </div>
          <ul class="adh-menu-ul" v-show="show">
            <li><i>
                <svg-icon icon-class="Icon-Add"></svg-icon>
              </i><span @click="headeradd()">新增</span><b @click="checked(1)">
                <svg-icon :icon-class="ismenuadd?Unchecked:check"></svg-icon>
              </b></li>
            <li><i>
                <svg-icon icon-class="Icon-Ddit"></svg-icon>
              </i><span @click="headeredit()">编辑</span><b @click="checked(2)">
                <svg-icon :icon-class="ismenuedit?Unchecked:check"></svg-icon>
              </b></li>
            <li><i>
                <svg-icon icon-class="Icon-Delete"></svg-icon>
              </i><span @click="headerdel()">删除</span><b @click="checked(3)">
                <svg-icon :icon-class="ismenudelete?Unchecked:check"></svg-icon>
              </b></li>
            <li><i>
                <svg-icon icon-class="Icon-Refresh"></svg-icon>
              </i><span @click="refsh()">刷新</span><b @click="checked(6)">
                <svg-icon :icon-class="ismenurefresh?Unchecked:check"></svg-icon>
              </b></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ad-Advanced-Search layui-form" v-show="isadvanced">
      <div class="layui-inline mr15">
        <label class="layui-form-label">发布人：</label>
        <div class="layui-input-inline">
          <input type="tel" name="name" autocomplete="off" class="layui-input" style="width:100px" v-model="adpublisherName">
        </div>
      </div>
      <div class="layui-inline mr15">
        <label class="layui-form-label">发布账号：</label>
        <div class="layui-input-inline">
          <input type="text" name="email" autocomplete="off" class="layui-input" style="width:100px" v-model="adpublisherAccount">
        </div>
      </div>
      <div class="layui-inline mr15">
        <label class="layui-form-label">公告标题：</label>
        <div class="layui-input-inline">
          <input type="text" name="email" autocomplete="off" class="layui-input" style="width:200px" v-model="adtitle">
        </div>
      </div>
      <div class="layui-inline mr15 mt10-2">
        <label class="layui-form-label">创建时间：</label>
        <div class="layui-input-inline timeicon" style="margin-right: 13px;">
          <input type="text" class="layui-input" id="time2" placeholder=" - " style="width: 200px;" autocomplete="off"
            ref="time2">
        </div>
        <button class="layui-btn" @click="advancedSearch()">查询</button>
        <button type="reset" class="layui-btn layui-btn-primary" @click="reset()">重置</button>
      </div>
    </div>
    <el-table ref="multipleTable" :data="mainmsg.list" tooltip-effect="dark" style="width: 100%" border @select="tableSelected"
      @select-all="tableAllSelected" @sort-change='tableSortChange' @cell-mouse-enter="handleMouseEnter"
      @cell-mouse-leave="handleMouseOut" @cell-click="titleclick">
      <el-table-column type="selection" width="46" align="center">
      </el-table-column>
      <el-table-column prop="publisherName" label="发布人" min-width="72">
      </el-table-column>
      <el-table-column prop="publisherAccount" label="发布账号" min-width="82">
      </el-table-column>
      <el-table-column prop="title" label="公告标题" min-width="566" class-name="moretitle">
      </el-table-column>
      <el-table-column label="展示时间" min-width="196">
        <template slot-scope="scope">
          {{scope.row.expireType==0?scope.row.startTime.substring(0,11)+'至 '+scope.row.expireTime.substring(0,11):'长期有效'}}
        </template>
      </el-table-column>
      <el-table-column prop="publishTime" label="创建时间" min-width="176" sortable="custom">
      </el-table-column>
      <el-table-column label="" width="58">
        <template slot-scope="scope">
          <div style="cursor: pointer;position: relative;text-align: center;">
            <svg-icon icon-class="Icon-tablemore"></svg-icon>
            <div class="td-hover-father">
              <div class="td-hover"><span class="tdhedit" @click="tdedit(scope.row)">编辑</span><span class="tddel"
                  @click="tddel(scope.row)">删除</span></div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页容器-->
    <div id="pagination"></div>
  </div>
</template>

<script>
  import {
    getAdQuery,
    delAd
  } from '@/api/notice'
  export default {
    name:'notice',
    inject: ['reload'],
    data() {
      return {
        'isFirstEnter': false, // 是否第一次进入，默认false
        'show': false,
        'check': 'Icon-Check',
        'Unchecked': 'Icon-Unchecked',
        'checkindex': -1,
        'menuadd': true,
        'menuedit': true,
        'menudelete': true,
        'menushelf': true,
        'menuobtained': true,
        'menurefresh': true,
        'ismenuadd': false,
        'ismenuedit': false,
        'ismenudelete': false,
        'ismenurefresh': false,
        'isadvanced': false,
        'headermsg': '',
        'headerselected': 0,
        'mainmsg': '',
        'preparems': '',
        "publishStartTime": "",
        "publicEndTime": "",
        "adorderBy": "",
        "adpageNum": 1,
        "adpageSize": 10,
        "adpublisherAccount": "",
        "adpublisherName": "",
        "adtitle": "",
        "total": '',
        'selectedarr': [],
        'changemainmsg': true
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
      this.isFirstEnter = true;
      // 只有第一次进入或者刷新页面后才会执行此钩子函数
      // 使用keep-alive后（2+次）进入不会再执行此钩子函数
      this.getquery();
    },
    methods: {
      menushow: function() {
        this.show = false
      },
      checked: function(index) {
        this.checkindex = index
        if (index == 1) {
          this.ismenuadd = !this.ismenuadd
          if (this.ismenuadd) {
            this.menuadd = false
          } else {
            this.menuadd = true
          }
        } else if (index == 2) {
          this.ismenuedit = !this.ismenuedit
          if (this.ismenuedit) {
            this.menuedit = false
          } else {
            this.menuedit = true
          }
        } else if (index == 3) {
          this.ismenudelete = !this.ismenudelete
          if (this.ismenudelete) {
            this.menudelete = false
          } else {
            this.menudelete = true
          }
        } else if (index == 6) {
          this.ismenurefresh = !this.ismenurefresh
          if (this.ismenurefresh) {
            this.menurefresh = false
          } else {
            this.menurefresh = true
          }
        }
      },
      changestates: function(data) {
        this.headerselected = data.value
        this.headermsg = ''
        if (data.value == 3) {
          this.issreach = false
          this.issreachsel = true
        } else {
          this.issreach = true
          this.issreachsel = false
        }
      },
      changeadvanced: function() {
        //this.selectedalgintable()
        this.isadvanced = !this.isadvanced
      },
      //请求列表数据
      getquery: function(val) {
        if (val) {
          var parems = val
        } else {
          var parems = {
            "publishStartTime": "",
            "publicEndTime": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "publisherAccount": "",
            "publisherName": "",
            "title": ""
          }
        }
        this.preparems = parems
        getAdQuery(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result;
            this.total = res.result.total
          }
        })

      },
      //简单搜索
      simpleSearch: function() {
        var headerindex = this.headerselected
        if (headerindex == 0) {
          var parems = {
            "publishStartTime": "",
            "publicEndTime": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "publisherAccount": "",
            "publisherName": this.headermsg.trim(),
            "title": ""
          }
        } else if (headerindex == 1) {
          var parems = {
            "publishStartTime": "",
            "publicEndTime": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "publisherAccount": this.headermsg.trim(),
            "publisherName": "",
            "title": ""
          }
        } else if (headerindex == 2) {
          var parems = {
            "publishStartTime": "",
            "publicEndTime": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "publisherAccount": "",
            "publisherName": "",
            "title": this.headermsg.trim()
          }
        }
        this.preparems = parems
        getAdQuery(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result
            this.total = res.result.total
          }
        })
      },
      //高级搜索
      advancedSearch: function() {
        var parems = {
          "publishStartTime": this.publishStartTime,
          "publicEndTime": this.publicEndTime,
          "orderBy": "",
          "pageNum": 1,
          "pageSize": 10,
          "publisherAccount": this.adpublisherAccount,
          "publisherName": this.adpublisherName,
          "title": this.adtitle
        }
        this.preparems = parems
        getAdQuery(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result
            this.total = res.result.total
          }
        })
      },
      //重置
      reset: function() {
        this.adpublisherName = ''
        this.adpublisherAccount = ''
        this.adtitle = ''
        this.$refs.time2.value = ''
      },
      //header删除
      headerdel: function() {
        let _this = this;
        let parems = [];
        for (var i = 0; i < this.selectedarr.length; i++) {
          parems.push(this.selectedarr[i].id)
        }
        let length = '确认删除所选的' + parems.length + '广告条记录';
        if (parems.length > 0) {
          this.$confirm(length, '', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            delAd(parems).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  center: true
                });
                _this.selectedarr = [];
                _this.refshtable()
              }
            })
          }).catch(() => {

          });
        } else {
          this.$confirm('请选择1条数据进行操作！', '', {
            showConfirmButton: false,
            cancelButtonText: '确定',
            type: 'warning'
          }).catch(() => {

          })
        }
      },
      //td删除
      tddel: function(val) {
        let parems = []
        parems.push(val.id)
        let length = '确认删除所选的' + parems.length + '广告条记录';
        this.$confirm(length, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delAd(parems).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '删除成功',
                type: 'success',
                center: true,
                time: 0
              });
              this.refshtable()
            }
          })
        }).catch(() => {

        });
      },
      //header编辑
      headeredit: function() {
        let parems = [];
        for (var i = 0; i < this.selectedarr.length; i++) {
          parems.push(this.selectedarr[i].id)
        }
        if (parems.length != 1) {
          this.$confirm('请选择1条数据进行操作！', '', {
            showConfirmButton: false,
            cancelButtonText: '确定',
            type: 'warning'
          }).catch(() => {

          })
        } else {
          this.$router.push({
            path: 'addnotice',
            query: {
              id: parems
            }
          });
        }
      },
      //td编辑
      tdedit: function(val) {
        let parems = []
        parems.push(val.id)
        this.$router.push({
          path: 'addnotice',
          query: {
            id: parems
          }
        });
      },
      //新增
      headeradd: function() {
        this.$router.push({
          path: 'addnotice'
        });
      },
      //判断不能选中多个td
      notmoretd: function() {

      },
      tableSelected: function(val, row) {
        this.selectedarr = val
      },
      tableAllSelected: function(val) {
        this.selectedarr = val
      },
      tableSortChange: function(val) {
        let parems = this.preparems
        if (val.order == null) {
          parems.orderBy = ''
        } else if (val.order == 'descending') {
          parems.orderBy = 'publish_time desc'
        } else if (val.order == "ascending") {
          parems.orderBy = 'publish_time asc'
        }
        parems.pageNum = 1
        parems.pageSize = 10
        this.getquery(parems)
        this.preparems = parems
      },
      //刷新table
      refshtable: function() {
        let parems = this.preparems
        getAdQuery(parems).then(res => {
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
      handleMouseEnter: function(row, column, cell, event) {
        if (column.property == 'title') {
          layer.tips(row.title, cell, {
            tips: 3,
            time: 0
          })
          event.target.style.color = '#0099ff'
        }
      },
      handleMouseOut: function(row, column, cell, event) {
        if (column.property == 'title') {
          layer.close(layer.index);
          event.target.style.color = '#1b1b2a'
        }
      },
      titleclick: function(row, column, cell) {
        if (column.property == 'title') {
          layer.close(layer.index);
          this.$router.push({
            path: 'shownotice',
            query: {
              id: row.id
            }
          });
        }
      },
      //table里面做的事件
      tableuse: function(_this) {
        $('.td-hover-father').parent().parent().parent().hover(function() {
          $(this).find('div.td-hover-father').show()
        }, function() {
          $(this).find('div.td-hover-father').hide()
        })
      }
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
          _this.tableuse();
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
                  _this.selectedarr = []
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
        laydate.render({
          elem: '#time2',
          range: true,
          done: function(value, date) {
            if (value) {
              _this.publishStartTime = value.substring(0, 10) + ' 00:00:00'
              _this.publicEndTime = value.substring(13, 23) + ' 23:59:59'
            } else {
              _this.publishStartTime = ''
              _this.publicEndTime = ''
            }
          }
        });
        form.on('select(sreach)', function(data) {
          _this.changestates(data);
        })
        form.on('select(quiz1)', function(data) {
          _this.adpublishStatus = data.value == 0 ? '' : data.value;
        })
      })
    },
    beforeRouteLeave(to, from, next) {
      if (to.name == 'addnotice'||to.name=='shownotice') {
        this.$store.commit('setKeepAlive', ['notice']); //这是此页面的name属性名字
      } else {
        this.$store.commit('setKeepAlive', []);
      }
      next();
    }
  }
</script>

<style>

</style>
