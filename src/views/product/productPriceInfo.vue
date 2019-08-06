<template>
  <div class="appmain-bg">
    <div class="ad-header layui-form">
      <div class="adh-logo">
        <svg-icon icon-class="Icon-Product-management"></svg-icon>
      </div>
      <h3 class="adh-title">产品套餐信息列表</h3>
      <div class="adh-selected">
        <a href="javascript:;" class="isselected">全部<i>(</i>{{total}}<i>)</i></a>
      </div>
      <div class="adh-right">
        <div class="adh-sreach">
          <select name="sysreach" lay-filter="sysreach">
            <option value="0">套餐ID</option>
            <option value="1">套餐名称</option>
            <option value="2">归属产品</option>
            <option value="3">体系名称</option>
            <option value="4">状态</option>
          </select>
        </div>
        <div style="width: 170px;" v-show="issreach" id="headerselect">
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==0" :clearable='true' @blur="headerselectblur" popper-class="selectwidth170">
            <el-option v-for="(item,index) in idobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==1" :clearable='true' @blur="headerselectblur" popper-class="selectwidth170">
            <el-option v-for="(item,index) in nameobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==2" :clearable='true' @blur="headerselectblur" popper-class="selectwidth170">
            <el-option v-for="(item,index) in productnameobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==3" :clearable='true' @blur="headerselectblur" popper-class="selectwidth170">
            <el-option v-for="(item,index) in sysnameobj" :key="index" :value="item" :title="item">
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
        <label class="layui-form-label">归属产品：</label>
        <div class="layui-input-inline">
          <div style="width: 100px;">
            <el-select v-model="productname" filterable placeholder="" :clearable='true' @blur="productnameselectblur" popper-class="selectwidth100">
              <el-option v-for="(item,index) in productnameobj" :key="index" :value="item" :title="item">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="layui-inline mr15">
        <label class="layui-form-label">体系名称：</label>
        <div class="layui-input-inline">
          <div style="width: 200px;">
            <el-select v-model="sysname" filterable placeholder="" :clearable='true' @blur="sysnameselectblur" popper-class="selectwidth200">
              <el-option v-for="(item,index) in sysnameobj" :key="index" :value="item" :title="item">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="layui-inline mr15">
        <label class="layui-form-label">套餐ID：</label>
        <div class="layui-input-inline">
          <div style="width: 100px;">
            <el-select v-model="priceid" filterable placeholder="" :clearable='true' @blur="priceidselectblur" popper-class="selectwidth100">
              <el-option v-for="(item,index) in idobj" :key="index" :value="item" :title="item">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="layui-inline mr15">
        <label class="layui-form-label">套餐名称：</label>
        <div class="layui-input-inline">
          <div style="width: 200px;">
            <el-select v-model="pricename" filterable placeholder="" :clearable='true' @blur="pricenameselectblur" popper-class="selectwidth200">
              <el-option v-for="(item,index) in nameobj" :key="index" :value="item" :title="item">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="layui-inline mr15 mt10-4">
        <button class="layui-btn" @click="advancedSearch()">查询</button>
        <button type="reset" class="layui-btn layui-btn-primary" @click="reset()">重置</button>
      </div>
    </div>
    <el-table ref="multipleTable" :data="mainmsg.list" tooltip-effect="dark" style="width: 100%" border @sort-change='tableSortChange' @cell-mouse-enter="handleMouseEnter"
      @cell-mouse-leave="handleMouseOut">
      <!-- <el-table-column type="selection" width="46" align="center">
      </el-table-column> -->
      <el-table-column prop="code" label="套餐ID" min-width="136" sortable="custom" class-name="tdpl36">
      </el-table-column>
      <el-table-column prop="name" label="套餐名称" min-width="132">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" min-width="156">
      </el-table-column>
      <el-table-column prop="validMonths" label="有效期(月)" min-width="122">
      </el-table-column>
      <el-table-column prop="productName" label="归属产品" min-width="132">
      </el-table-column>
      <el-table-column prop="systemTypeName" label="体系名称" min-width="208" sortable="custom">
      </el-table-column>
      <el-table-column prop="enterpriseNumbers" label="企业数" min-width="136" sortable="custom">
        <template slot-scope="scope">
          <span style="color: #099fff;cursor: pointer;">{{scope.row.enterpriseNumbers}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="96">
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
    alltixi,
    productadd,
    prdelete,
    getproduct,
    updateproductprice,
    sysexport
  } from '@/api/productPrice'
  export default {
    inject: ['reload'],
    data() {
      return {
        'isFirstEnter': false, // 是否第一次进入，默认false
        'show': false,
        'check': 'Icon-Check',
        'Unchecked': 'Icon-Unchecked',
        'checkindex': -1,
        'menurefresh': true,
        'menuexport': true,
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
        "productname": "",
        "displayStatus": '',
        "sysname": "",
        'priceid': '',
        'pricename': '',
        'syssel': '',
        //模糊搜索
        'idobj': '',
        "nameobj": "",
        "productnameobj": "",
        'sysnameobj': '',
        //导出
        exporthref:''
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
        } else if (index == 2) {
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
            "code": "",
            "displayStatus": '',
            "name": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "productName": "",
            "systemTypeName": ""
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
            this.idobj = res.result.productPricePackageCodeList
            this.nameobj = res.result.productPricePackageNameList
            this.productnameobj = res.result.productNameList
            this.sysnameobj = res.result.systemTypeNameList
          }
        })
      },
      //简单搜索
      simpleSearch: function() {
        let headerindex = this.headerselected
        if (headerindex == 0) {
          var parems = {
            "code": this.automsg,
            "displayStatus": '',
            "name": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "productName": "",
            "systemTypeName": ""
          }
        } else if (headerindex == 1) {
          var parems = {
            "code": '',
            "displayStatus": '',
            "name": this.automsg,
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "productName": "",
            "systemTypeName": ""
          }
        } else if (headerindex == 2) {
          var parems = {
            "code": '',
            "displayStatus": '',
            "name": '',
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "productName":this.automsg,
            "systemTypeName": ""
          }
        } else if (headerindex == 3) {
          var parems = {
            "code": '',
            "displayStatus": '',
            "name": '',
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "productName":'',
            "systemTypeName": this.automsg
          }
        }else if (headerindex == 4) {
          var parems = {
            "code": '',
            "displayStatus": this.syssel,
            "name": '',
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "productName":'',
            "systemTypeName": ''
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
          "displayStatus": this.displayStatus,
          "code": this.priceid,
          "name": this.pricename,
          "orderBy": "",
          "pageNum": 1,
          "pageSize": 10,
          "productName":this.productname,
          "systemTypeName": this.sysname
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
        this.priceid = ''
        this.pricename = ''
        this.productname = ''
        this.sysname = ''
        $('#sys-gaojisel').siblings("div.layui-form-select").find('dl').find('dd[lay-value=""]').click();
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
        } else if (val.prop == 'systemTypeName') {
          if (val.order == null) {
            parems.orderBy = ''
          } else if (val.order == 'descending') {
            parems.orderBy = 'system_type_name desc'
          } else if (val.order == "ascending") {
            parems.orderBy = 'system_type_name asc'
          }
        } else if (val.prop == 'enterpriseNumbers') {
          if (val.order == null) {
            parems.orderBy = ''
          } else if (val.order == 'descending') {
            parems.orderBy = 'enterprise_numbers desc'
          } else if (val.order == "ascending") {
            parems.orderBy = 'enterprise_numbers asc'
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
      //模糊搜索
      headerselectblur: function(Event) {
        let val = Event.target.value;
        this.automsg = val
      },
      //高级模糊搜索
      productnameselectblur: function(Event) {
        let val = Event.target.value;
        this.productname = val
      },
      sysnameselectblur: function(Event) {
        let val = Event.target.value;
        this.sysname = val
      },
      priceidselectblur: function(Event) {
        let val = Event.target.value;
        this.priceid = val
      },
      pricenameselectblur: function(Event) {
        let val = Event.target.value;
        this.pricename = val
      },
      handleMouseEnter: function(row, column, cell, event) {
        if (column.property == 'systemTypeName') {
           var guojiaarr = row.nationalStandard.split(',')
           var guojiarr = row.internationalStandard.split(',')
           var str = ''
           var newstrarr = []
           for(var i=0;i<guojiaarr.length;i++){
             var newstr = guojiaarr[i]+'/'+guojiarr[i]
             newstrarr.push(newstr)
           }
          var fullname = ''
          for (var i = 0; i < newstrarr.length; i++) {
            fullname = fullname + '<p style="line-height:18px">' + newstrarr[i] + '</p>'
          }
          str = '<div style="color:#6f6f77">' + row.systemTypeName + '</div>' + fullname
          layer.tips(str, cell, {
            tips: 3,
            time: 0
          })
          event.target.style.color = '#0099ff'
        }
      },
      handleMouseOut: function(row, column, cell, event) {
        if (column.property == 'systemTypeName') {
          layer.close(layer.index);
          event.target.style.color = '#1b1b2a'
        }
      },
      sysexport:function(){
       var params = this.preparems
      window.open('http://test.issosaas.com:8000/scc/productPricePackage/exportByQueryDto?code=' + params.code + '&displaystatus=' + params.displaystatus +
      '&name=' + params.name + '&productName=' + params.productName + '&systemTypeName=' +
      params.systemTypeName)
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
  .productlength {
    color: #aaaaaf;
    position: absolute;
    left: 515px;
    top: 0;
    line-height: 30px;
    font-size: 12px;
  }

  .dialogWidth600 {
    width: 600px;
  }
</style>
