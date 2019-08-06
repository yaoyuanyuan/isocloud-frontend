<template>
  <div class="appmain-bg">
    <div class="ad-header layui-form">
      <div class="adh-logo">
        <svg-icon icon-class="Icon-System-information"></svg-icon>
      </div>
      <h3 class="adh-title">体系信息列表</h3>
      <div class="adh-selected">
        <a href="javascript:;" class="isselected">全部<i>(</i>{{total}}<i>)</i></a>
      </div>
      <div class="adh-right">
        <div class="adh-sreach">
          <select name="sysreach" lay-filter="sysreach">
            <option value="0">体系ID</option>
            <option value="1">体系名称</option>
            <option value="2">国家标准</option>
            <option value="3">国际标准</option>
            <option value="4">状态</option>
          </select>
        </div>
        <div style="width: 170px;position: r;" v-show="issreach" id="headerselect">
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==0" :clearable='true' @blur="headerselectblur" popper-class="selectwidth170">
            <el-option v-for="(item,index) in codeobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==1" :clearable='true' @blur="headerselectblur" popper-class="selectwidth170">
            <el-option v-for="(item,index) in nameobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==2" :clearable='true' @blur="headerselectblur" popper-class="selectwidth170">
            <el-option v-for="(item,index) in nationalStandardobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==3" :clearable='true' @blur="headerselectblur" popper-class="selectwidth170">
            <el-option v-for="(item,index) in internationalStandardobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
        </div>
        <div style="width: 170px;" v-show="issreachsel">
          <select name="sys-sel" lay-filter="sys-sel" id="syssel">
            <option value="" selected="">全部</option>
            <option value="0">已上架</option>
            <option value="1">已下架</option>
          </select>
        </div>
        <div class="adh-sreachbtn adh-npborderleft" @click="simpleSearch()">
          <svg-icon icon-class="Icon-Search"></svg-icon>
        </div>
        <div class="adh-advancedSearch" @click="changeadvanced()"><span>高级搜索</span><i>
            <svg-icon icon-class="Icon-Advanced-Search" :class="isadvanced?'adh-xuanzhuan':''"></svg-icon>
          </i></div>
        <ul class="adh-ul">
          <li v-if="menuexport" @click="sysexport()">
            <svg-icon icon-class="Icon-Export"></svg-icon>
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
                <svg-icon icon-class="Icon-Export"></svg-icon>
              </i><span @click="sysexport()">导出</span><b @click="checked(1)">
                <svg-icon :icon-class="ismenuexport?Unchecked:check"></svg-icon>
              </b></li>
              <li><i>
                  <svg-icon icon-class="Icon-Refresh"></svg-icon>
                </i><span @click="refsh()">刷新</span><b @click="checked(2)">
                  <svg-icon :icon-class="ismenurefresh?Unchecked:check"></svg-icon>
                </b></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ad-Advanced-Search layui-form" v-show="isadvanced">
      <div class="layui-inline mr15">
        <label class="layui-form-label">状态：</label>
        <div class="layui-input-inline" style="width: 100px;">
          <select name="sys-gaojisel" lay-filter="sys-gaojisel" id="sys-gaojisel">
            <option value="" selected="">全部</option>
            <option value="0">已上架</option>
            <option value="1">已下架</option>
          </select>
        </div>
      </div>
      <div class="layui-inline mr15">
        <label class="layui-form-label">体系ID：</label>
        <div class="layui-input-inline">
          <div style="width: 100px;">
            <el-select v-model="code" filterable placeholder="" :clearable='true' @blur="codeselectblur" popper-class="selectwidth100">
              <el-option v-for="(item,index) in codeobj" :key="index" :value="item" :title="item">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="layui-inline mr15">
        <label class="layui-form-label">体系名称：</label>
        <div class="layui-input-inline">
          <div style="width: 200px;">
            <el-select v-model="name" filterable placeholder="" :clearable='true' @blur="nameselectblur" popper-class="selectwidth200">
              <el-option v-for="(item,index) in nameobj" :key="index" :value="item" :title="item">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="layui-inline mr15">
        <label class="layui-form-label">国家标准：</label>
        <div class="layui-input-inline">
          <div style="width: 200px;">
            <el-select v-model="nationalStandard" filterable placeholder="" :clearable='true' @blur="nationalStandardselectblur" popper-class="selectwidth200">
              <el-option v-for="(item,index) in nationalStandardobj" :key="index" :value="item" :title="item">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="layui-inline mr15 mt10-3">
        <label class="layui-form-label">国际标准：</label>
        <div class="layui-input-inline">
          <div style="width: 200px;margin-right: 18px;">
            <el-select v-model="internationalStandard" filterable placeholder="" :clearable='true'
                @blur="internationalStandardselectblur" popper-class="selectwidth200">
              <el-option v-for="(item,index) in internationalStandardobj" :key="index" :value="item" :title="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <button class="layui-btn" @click="advancedSearch()">查询</button>
        <button type="reset" class="layui-btn layui-btn-primary" @click="reset()">重置</button>
      </div>
    </div>
    <el-table ref="multipleTable" :data="mainmsg.list" tooltip-effect="dark" style="width: 100%" border @sort-change='tableSortChange' @cell-click="tiaozhuan">
     <!-- <el-table-column type="selection" width="46" align="center">
      </el-table-column> -->
      <el-table-column prop="code" label="体系ID" min-width="127" sortable="custom" class-name="tdpl36">
      </el-table-column>
      <el-table-column prop="name" label="体系名称" min-width="200" sortable="custom">
      </el-table-column>
      <el-table-column prop="nationalStandardHtml" label="国家标准" min-width="178" class-name="tdpre">
        <template slot-scope="scope">
          <div v-html="scope.row.nationalStandardHtml"></div>
        </template>
      </el-table-column>
      <el-table-column prop="nationalStandardHtml" label="国际标准" min-width="182" class-name="tdpre">
        <template slot-scope="scope">
          <div v-html="scope.row.nationalStandardHtml"></div>
        </template>
      </el-table-column>
      <el-table-column prop="productNumbers" label="关联产品数" min-width="120" sortable="custom">
        <template slot-scope="scope">
          <span style="color: #099fff;cursor: pointer;">{{scope.row.productNumbers}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="templateGroupNumbers" label="关联模块组数" min-width="132" sortable="custom">
         <template slot-scope="scope">
          <span style="color: #099fff;cursor: pointer;">{{scope.row.templateGroupNumbers}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="enterpriseNumber" label="已开通企业数" min-width="134" sortable="custom">
        <template slot-scope="scope">
          <span style="color: #099fff;cursor: pointer;">{{scope.row.enterpriseNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.displayStatus==0">已上架</span>
          <span style="color: #ff4912;" v-else>已下架</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页容器-->
    <div id="pagination"></div>
  </div>
</template>

<script>
  import {
    getlist,
    condition,
    systemStandard,
    sysadd,
    sysdelete,
    getsys,
    updatesys,
    sysexport
  } from '@/api/system'
  export default {
    inject: ['reload'],
    data() {
      return {
        'isFirstEnter': false, // 是否第一次进入，默认false
        'show': false,
        'check': 'Icon-Check',
        'Unchecked': 'Icon-Unchecked',
        'checkindex': -1,
        'menuexport': true,
         'menurefresh': true,
        'ismenuexport': false,
        'ismenurefresh': false,
        'issreach': true,
        'issreachsel': false,
        'isadvanced': false,
        'automsg': '',
        'headerselected': 0,
        'mainmsg': '',
        'preparems': '',
        "total": '',
        'selectedarr': [],
        'changemainmsg': true,
        //高级搜索参数
        "code": "",
        "displayStatus": '',
        "internationalStandard": "",
        "name": "",
        "nationalStandard": "",
        'restaurants': '',
        'syssel': '',
        //模糊搜索
        'codeobj': '',
        "internationalStandardobj": "",
        "nameobj": "",
        "nationalStandardobj": "",
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
      this.getmohu();
    },
    methods: {
      menushow: function() {
        this.show = false
      },
      checked: function(index) {
        this.checkindex = index
        if (index == 1) {
          this.ismenuexport = !this.ismenuexport
          if (this.ismenuexport) {
            this.menuexport = false
          } else {
            this.menuexport = true
          }
        }else if (index == 2) {
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
        this.automsg = ''
        $('#syssel').siblings("div.layui-form-select").find('dl').find('dd[lay-value=""]').click();
        if (data.value == 4) {
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
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "code": "",
            "displayStatus": "",
            "internationalStandard": "",
            "name": "",
            "nationalStandard": ""
          }
        }
        this.preparems = parems
        getlist(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result;
            this.total = res.result.total
          }
        })
      },
      //模糊查询
      getmohu: function() {
        condition().then(res => {
          if (res.code == 200) {
            this.codeobj = res.result.codes
            this.internationalStandardobj = res.result.internationalStandards
            this.nameobj = res.result.names
            this.nationalStandardobj = res.result.nationalStandards
          }
        })
      },
      //简单搜索
      simpleSearch: function() {
        let headerindex = this.headerselected
        if (headerindex == 0) {
          var parems = {
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "code": this.automsg.trim(),
            "displayStatus": "",
            "internationalStandard": "",
            "name": "",
            "nationalStandard": ""
          }
        } else if (headerindex == 1) {
          var parems = {
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "code": "",
            "displayStatus": "",
            "internationalStandard": "",
            "name": this.automsg.trim(),
            "nationalStandard": ""
          }
        } else if (headerindex == 2) {
          var parems = {
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "code": "",
            "displayStatus": "",
            "internationalStandard": "",
            "name": "",
            "nationalStandard": this.automsg.trim()
          }
        } else if (headerindex == 3) {
          var parems = {
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "code": "",
            "displayStatus": "",
            "internationalStandard": this.automsg.trim(),
            "name": "",
            "nationalStandard": ""
          }
        } else if (headerindex == 4) {
          var parems = {
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "code": "",
            "displayStatus": this.syssel,
            "internationalStandard": "",
            "name": "",
            "nationalStandard": ""
          }
        }
        this.preparems = parems
        getlist(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result
            this.total = res.result.total
          }
        })
      },
      //高级搜索
      advancedSearch: function() {
        var parems = {
          "orderBy": "",
          "pageNum": 1,
          "pageSize": 10,
          "code": this.code.trim(),
          "displayStatus": this.displayStatus,
          "internationalStandard": this.internationalStandard.trim(),
          "name": this.name.trim(),
          "nationalStandard": this.nationalStandard.trim()
        }
        this.preparems = parems
        getlist(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result
            this.total = res.result.total
          }
        })
      },
      //重置
      reset: function() {
        this.code = ''
        this.internationalStandard = ''
        this.nationalStandard = ''
        this.name = ''
        $('#sys-gaojisel').siblings("div.layui-form-select").find('dl').find('dd[lay-value=""]').click();
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
        if (val.prop == 'code') {
          if (val.order == null) {
            parems.orderBy = ''
          } else if (val.order == 'descending') {
            parems.orderBy = 'code desc'
          } else if (val.order == "ascending") {
            parems.orderBy = 'code asc'
          }
        } else if (val.prop == 'name') {
          if (val.order == null) {
            parems.orderBy = ''
          } else if (val.order == 'descending') {
            parems.orderBy = 'name desc'
          } else if (val.order == "ascending") {
            parems.orderBy = 'name asc'
          }
        } else if (val.prop == 'productNumbers') {
          if (val.order == null) {
            parems.orderBy = ''
          } else if (val.order == 'descending') {
            parems.orderBy = 'product_numbers desc'
          } else if (val.order == "ascending") {
            parems.orderBy = 'product_numbers asc'
          }
        }else if (val.prop == 'templateGroupNumbers') {
          if (val.order == null) {
            parems.orderBy = ''
          } else if (val.order == 'descending') {
            parems.orderBy = 'template_group_numbers desc'
          } else if (val.order == "ascending") {
            parems.orderBy = 'template_group_numbers asc'
          }
        }else if (val.prop == 'enterpriseNumber') {
          if (val.order == null) {
            parems.orderBy = ''
          } else if (val.order == 'descending') {
            parems.orderBy = 'enterprise_number desc'
          } else if (val.order == "ascending") {
            parems.orderBy = 'enterprise_number asc'
          }
        }
        parems.pageNum = 1
        parems.pageSize = 10
        this.getquery(parems)
        this.preparems = parems
      },
      //刷新table
      refshtable: function() {
        let parems = this.preparems
        getlist(parems).then(res => {
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
      //table里面做的事件
      tableuse: function(_this) {
        $('.td-hover-father').parent().parent().parent().hover(function() {
          $(this).find('div.td-hover-father').show()
        }, function() {
          $(this).find('div.td-hover-father').hide()
        })
      },
      //模糊搜索
      headerselectblur: function(Event) {
        let val = Event.target.value;
        this.automsg = val
      },
      //高级模糊搜索
      codeselectblur: function(Event) {
        let val = Event.target.value;
        this.code = val
      },
      nameselectblur: function(Event) {
        let val = Event.target.value;
        this.name = val
      },
      nationalStandardselectblur: function(Event) {
        let val = Event.target.value;
        this.nationalStandard = val
      },
      internationalStandardselectblur: function(Event) {
        let val = Event.target.value;
        this.internationalStandard = val
      },
      tiaozhuan:function(row,column){
        if(column.property == 'productNumbers'){
          this.$router.push({
						path: '/product/productType',
						query: {
							id: row.code
						}
					});
        }
      },
      //导出
      sysexport:function(){
         var params = this.preparems
        window.open('http://test.issosaas.com:8000/scc/systemType/exportSysType?code=' + params.code + '&displayStatus=' + params.displayStatus +
        '&name=' + params.name + '&internationalStandard=' + params.internationalStandard + '&nationalStandard=' +
        params.nationalStandard)
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
        form.on('select(sysreach)', function(data) {
          _this.changestates(data);
        })
        form.on('select(sys-sel)', function(data) {
          _this.syssel = data.value;
        })
        form.on('select(sys-gaojisel)', function(data) {
          _this.displayStatus = data.value;
        })
        form.on('select(quiz1)', function(data) {
          _this.adpublishStatus = data.value == 0 ? '' : data.value;
        })
      })
    }
  }
</script>

<style>

</style>
