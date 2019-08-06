<template>
  <div class="appmain-bg">
    <div class="ad-header layui-form">
      <div class="adh-logo">
        <svg-icon icon-class="Icon-Product-management"></svg-icon>
      </div>
      <h3 class="adh-title">产品套餐管理</h3>
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
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==0" :clearable='true' @blur="headerselectblur"
            popper-class="selectwidth170">
            <el-option v-for="(item,index) in idobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==1" :clearable='true' @blur="headerselectblur"
            popper-class="selectwidth170">
            <el-option v-for="(item,index) in nameobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==2" :clearable='true' @blur="headerselectblur"
            popper-class="selectwidth170">
            <el-option v-for="(item,index) in productnameobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==3" :clearable='true' @blur="headerselectblur"
            popper-class="selectwidth170">
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
          <li v-if="menuadd" @click="headeradd()">
            <svg-icon icon-class="Icon-Add"></svg-icon>
          </li>
          <li v-if="menuedit" @click="headeredit()">
            <svg-icon icon-class="Icon-Ddit"></svg-icon>
          </li>
          <li v-if="menudelete" @click="headerdel()">
            <svg-icon icon-class="Icon-Delete"></svg-icon>
          </li>
          <li v-if="menushelf" @click="headershang()">
            <svg-icon icon-class="Shelf"></svg-icon>
          </li>
          <li v-if="menuobtained" @click="headerxia()">
            <svg-icon icon-class="Obtained"></svg-icon>
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
                <svg-icon icon-class="Shelf"></svg-icon>
              </i><span @click="headershang()">上架</span><b @click="checked(4)">
                <svg-icon :icon-class="ismenushelf?Unchecked:check"></svg-icon>
              </b></li>
            <li><i>
                <svg-icon icon-class="Obtained"></svg-icon>
              </i><span @click="headerxia()">下架</span><b @click="checked(5)">
                <svg-icon :icon-class="ismenuobtained?Unchecked:check"></svg-icon>
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
            <el-select v-model="productname" filterable placeholder="" :clearable='true' @blur="productnameselectblur"
              popper-class="selectwidth100">
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
            <el-select v-model="sysname" filterable placeholder="" :clearable='true' @blur="sysnameselectblur"
              popper-class="selectwidth200">
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
            <el-select v-model="priceid" filterable placeholder="" :clearable='true' @blur="priceidselectblur"
              popper-class="selectwidth100">
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
            <el-select v-model="pricename" placeholder="" filterable :clearable='true' @blur="pricenameselectblur"
              popper-class="selectwidth200">
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
    <el-table ref="multipleTable" :data="mainmsg.list" tooltip-effect="dark" style="width: 100%" border @select="tableSelected"
      @select-all="tableAllSelected" @sort-change='tableSortChange' @cell-mouse-enter="handleMouseEnter"
      @cell-mouse-leave="handleMouseOut">
      <el-table-column type="selection" width="46" align="center">
      </el-table-column>
      <el-table-column prop="code" label="套餐ID" min-width="100" sortable="custom">
      </el-table-column>
      <el-table-column prop="name" label="套餐名称" min-width="122">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" min-width="156">
      </el-table-column>
      <el-table-column prop="validMonths" label="有效期(月)" min-width="122">
      </el-table-column>
      <el-table-column prop="productName" label="归属产品" min-width="122">
      </el-table-column>
      <el-table-column prop="systemTypeName" label="体系名称" min-width="208" sortable="custom">
      </el-table-column>
      <el-table-column label="状态" min-width="96">
        <template slot-scope="scope">
          <span v-if="scope.row.displayStatus==0">已上架</span>
          <span style="color: #ff4912;" v-else>已下架</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" min-width="176" sortable="custom">
      </el-table-column>
      <el-table-column label="" width="58">
        <template slot-scope="scope">
          <div style="cursor: pointer;position: relative;text-align: center;">
            <svg-icon icon-class="Icon-tablemore"></svg-icon>
            <div class="td-hover-father">
              <div class="td-hover"><span @click="tdedit(scope.row)" v-if="scope.row.enterpriseNumbers==0||scope.row.enterpriseNumbers==null">编辑</span><span
                  @click="tdshang(scope.row)" v-if="scope.row.displayStatus==1">上架</span><span @click="tdxia(scope.row)"
                  v-if="scope.row.displayStatus==0">下架</span><span @click="tddel(scope.row)" v-if="scope.row.enterpriseNumbers==0||scope.row.enterpriseNumbers==null">删除</span></div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页容器-->
    <div id="pagination"></div>
    <el-dialog :title="thisdialog==0?'新增产品套餐':'编辑产品套餐'" :visible.sync="dialogFormVisible" center append-to-body v-if='dialogFormVisible'
      @close="closedialog()" custom-class="dialogWidth600">
      <div class="layui-form">
        <div class="layui-form-item">
          <label class="layui-form-label" style="font-size: 12px;">套餐名称：</label>
          <div class="layui-input-block">
            <input type="text" name="title" required lay-verify="required" placeholder="请输入产品名称" autocomplete="off"
              class="layui-input" style="width: 489px;padding-right: 40px;font-size: 12px;color: #1B1B2A;" v-model="title"
              maxlength="20" ref="title">
            <span class="productlength">{{titlelength}}</span>
          </div>
        </div>
      </div>
      <div class="layui-form">
        <div class="layui-form-item">
          <label class="layui-form-label" style="font-size: 12px;">归属体系：</label>
          <div class="layui-input-inline">
            <div class="layui-input-inline" style="width: 489px;">
              <el-select v-model="firstitem" placeholder="输入体系ID，类型或标准关键字搜索" @change="changeitem(firstitem)" :disabled="isedit"
                filterable :clearable='true'>
                <el-option v-for="item in systemStandard" :key="item.id" :value="item.str">
                </el-option>
              </el-select>
            </div>
            <div class="layui-input-inline" style="font-size: 12px;line-height: 20px;white-space: pre-line;">{{firstitemmsg}}</div>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label" style="font-size: 12px;">归属产品：</label>
          <div class="layui-input-inline">
            <div class="layui-input-inline" style="width: 489px;height: 30px;">
              <el-select v-model="seccenditem" placeholder="输入产品ID或名称关键字搜索" @change="changeseccenditem(seccenditem)"
                :disabled="istixi" filterable :clearable='true'>
                <el-option v-for="item in seccenditemobj" :key="item.id" :value="item.str">
                </el-option>
              </el-select>
            </div>
            <div class="layui-input-inline" style="font-size: 12px;line-height: 20px;white-space: pre-line;">{{seccenditemmsg}}</div>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label" style="font-size: 12px;">价格：</label>
          <div class="layui-input-block">
            <input type="text" placeholder="" autocomplete="off" class="layui-input" style="width: 170px;padding-right: 40px;font-size: 12px;color: #1B1B2A;"
              v-model="price">
            <span class="productPricespan" style="left: 212px;">元</span>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label" style="font-size: 12px;">有效期：</label>
          <div class="layui-input-block">
            <input type="text" placeholder="" autocomplete="off" class="layui-input" style="width: 170px;padding-right: 40px;font-size: 12px;color: #1B1B2A;"
              v-model="months">
            <span class="productPricespan" style="left: 224px;">个月</span>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="margin-top: -20px;">
        <el-button type="primary" @click="diasys()" style="margin-right: 12px;">确 定</el-button>
        <el-button @click="dialogFormVisible = false,closedialog()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getlist,
    condition,
    alltixi,
    productadd,
    productedit,
    prdelete,
    getproduct,
    updateproductprice,
    getProductNameByTarget
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
        'menuadd': true,
        'menuedit': true,
        'menudelete': true,
        'menushelf': true,
        'menuobtained': true,
        'menurefresh': true,
        'ismenuadd': false,
        'ismenuedit': false,
        'ismenudelete': false,
        'ismenushelf': false,
        'ismenuobtained': false,
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
        //新增
        thisdialog: 0,
        dialogFormVisible: false,
        title: '',
        titlelength: '0/20',
        firstitem: '',
        firstitemid: '',
        firstitemmsg: '',
        systemStandard: '',
        seccenditem: '',
        seccenditemmsg: '',
        seccenditemobj: '',
        istixi: true,
        isedit: false,
        price: '',
        months: ''
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
      this.getmohu();
      this.alltixi();
      if (this.$route.query.id) {
        var parems = {
          "code": '',
          "displayStatus": '',
          "name": '',
          "orderBy": "",
          "pageNum": 1,
          "pageSize": 10,
          "productName": this.$route.query.id,
          "systemTypeName": ""
        }
        this.getquery(parems)
      } else {
        this.getquery();
      }
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
        } else if (index == 4) {
          this.ismenushelf = !this.ismenushelf
          if (this.ismenushelf) {
            this.menushelf = false
          } else {
            this.menushelf = true
          }
        } else if (index == 5) {
          this.ismenuobtained = !this.ismenuobtained
          if (this.ismenuobtained) {
            this.menuobtained = false
          } else {
            this.menuobtained = true
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
      //所有体系查询
      alltixi: function() {
        alltixi().then(res => {
          if (res.code == 200) {
            var result = res.result
            var resarr = []
            for (var i = 0; i < result.length; i++) {
              var standardContentarr = ''
              for (var j = 0; j < result[i].standardContent.length; j++) {
                if (standardContentarr == '') {
                  standardContentarr = result[i].standardContent[j]
                } else {
                  standardContentarr = standardContentarr + ',' + result[i].standardContent[j]
                }
              }
              var resobj = {
                'str': result[i].code + ' ' + result[i].name + ' ' + standardContentarr,
                'id': result[i].id
              }
              resarr.push(resobj)
            }
            this.systemStandard = resarr
          }
        })
      },
      //根据ID查体系
      getsysitem: function(id) {
        var _this = this
        getproduct(id).then(res => {
          if (res.code == 200) {
            this.title = res.result.name
            this.price = res.result.price
            this.months = res.result.validMonths
            this.isedit = true
            var getproductid = res.result.productId
            getProductNameByTarget(res.result.systemTypeId).then(res => {
              if (res.code == 200) {
                var result = res.result
                var resarr = []
                for (var i = 0; i < result.length; i++) {
                  var resobj = {
                    'str': result[i].code + ' ' + result[i].name,
                    'id': result[i].id
                  }
                  resarr.push(resobj)
                }
                var objproduct = {}
                for (var j = 0; j < resarr.length; j++) {
                  if (resarr[j].id == getproductid) {
                    objproduct = resarr[j]
                    objproduct.name = resarr[j].str.split(' ')[1]
                    objproduct.id = resarr[j].str.split(' ')[0]
                  }
                }
                _this.seccenditem = objproduct.id
                _this.seccenditemmsg = objproduct.name
              }
            })
            var obj = {}
            for (var i = 0; i < this.systemStandard.length; i++) {
              if (this.systemStandard[i].id == res.result.systemTypeId) {
                obj = this.systemStandard[i]
              }
            }
            let valarr = obj.str.split(' ')
            this.firstitem = valarr[0]
            var tixiarr = valarr[2].split(',')
            var tixistr = ''
            for (var i = 0; i < tixiarr.length; i++) {
              if (tixistr == '') {
                tixistr = tixiarr[i]
              } else {
                tixistr = tixistr + '\n' + tixiarr[i]
              }
            }
            this.firstitemmsg = valarr[1] + '\n' + tixistr
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
            "productName": this.automsg,
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
            "productName": '',
            "systemTypeName": this.automsg
          }
        } else if (headerindex == 4) {
          var parems = {
            "code": '',
            "displayStatus": this.syssel,
            "name": '',
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "productName": '',
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
          "productName": this.productname,
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
      //header删除
      headerdel: function() {
        let _this = this;
        let parems = [];
        for (var i = 0; i < this.selectedarr.length; i++) {
          if (this.selectedarr[i].enterpriseNumbers != 0) {
            this.$confirm('删除的产品中已有销售给企业的套餐，不可删除！', '', {
              showConfirmButton: false,
              cancelButtonText: '确定',
              type: 'warning'
            }).catch(() => {

            })
            return
          } else {
            parems.push(this.selectedarr[i].id)
          }
        }
        let length = '确定删除选中的' + parems.length + '个套餐吗？';
        if (parems.length > 0) {
          this.$confirm(length, '', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            prdelete(parems).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  center: true
                });
                _this.selectedarr = [];
                _this.refshtable()
                _this.getmohu();
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
        let length = '确定删除此套餐吗？';
        this.$confirm(length, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          prdelete(parems).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '删除成功',
                type: 'success',
                center: true,
                time: 0
              });
              this.refshtable()
              this.getmohu();
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
          this.thisdialog = 1
          this.alltixi()
          this.dialogFormVisible = true
          this.getsysitem(parems[0])
        }
      },
      //td编辑
      tdedit: function(val) {
        let parems = val.id
        this.thisdialog = 1
        this.dialogFormVisible = true
        this.getsysitem(parems)
      },
      //新增
      headeradd: function() {
        this.thisdialog = 0
        this.dialogFormVisible = true
      },
      //上架
      tdshang: function(val) {
        var _this = this
        var paarr = []
        paarr.push(val.id)
        var parems = {
          'displayStatus': 0,
          ids: paarr
        }
        this.$confirm('确认上架本套餐吗？', '', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          updateproductprice(parems).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '上架成功',
                type: 'success',
                center: true
              });
              _this.refshtable()
            }
          })
        }).catch(() => {

        });
      },
      //下架
      tdxia: function(val) {
        var _this = this
        var paarr = []
        paarr.push(val.id)
        var parems = {
          'displayStatus': 1,
          ids: paarr
        }
        this.$confirm('套餐下架后新企业开户不可以选择此套餐，确定下架吗？', '', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          updateproductprice(parems).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '下架成功',
                type: 'success',
                center: true
              });
              _this.refshtable()
            }
          })
        }).catch(() => {

        });
      },
      //header上架
      headershang: function() {
        let _this = this;
        let parems = [];
        let shangjia = [];
        let xiajia = [];
        for (var i = 0; i < this.selectedarr.length; i++) {
          parems.push(this.selectedarr[i].id)
          if (this.selectedarr[i].displayStatus == 1) {
            xiajia.push(this.selectedarr[i].id)
          } else {
            shangjia.push(this.selectedarr[i].id)
          }
        }
        if (xiajia.length == 0) {
          var length = '已选的' + shangjia.length + '条数据已是上架状态！';
        } else {
          var length = '共选择' + parems.length + '条数据，是否将其中已下架的' + xiajia.length + '个套餐上架';
        }
        var paremsobj = {
          displayStatus: 0,
          ids: parems
        }
        if (parems.length > 0) {
          this.$confirm(length, '', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            updateproductprice(paremsobj).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: '上架成功',
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
      //header下架
      headerxia: function() {
        let _this = this;
        let parems = [];
        let xiajia = [];
        let shangjia = [];
        for (var i = 0; i < this.selectedarr.length; i++) {
          parems.push(this.selectedarr[i].id)
          if (this.selectedarr[i].displayStatus == 0) {
            shangjia.push(this.selectedarr[i].id)
          } else {
            xiajia.push(this.selectedarr[i].id)
          }
        }
        if (shangjia.length == 0) {
          var length = '已选的' + xiajia.length + '条数据已是下架状态！';
        } else {
          var length = '共选择' + parems.length + '条数据，是否将其中已上架的' + shangjia.length + '个套餐下架';
        }
        var paremsobj = {
          displayStatus: 1,
          ids: parems
        }
        if (parems.length > 0) {
          this.$confirm(length, '', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            updateproductprice(paremsobj).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: '下架成功',
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
        } else if (val.prop == 'systemTypeName') {
          if (val.order == null) {
            parems.orderBy = ''
          } else if (val.order == 'descending') {
            parems.orderBy = 'system_type_name desc'
          } else if (val.order == "ascending") {
            parems.orderBy = 'system_type_name asc'
          }
        } else if (val.prop == 'createdTime') {
          if (val.order == null) {
            parems.orderBy = ''
          } else if (val.order == 'descending') {
            parems.orderBy = 'created_time desc'
          } else if (val.order == "ascending") {
            parems.orderBy = 'created_time asc'
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
      changeitem: function(val) {
        if (val != '') {
          this.seccenditem = ''
          this.seccenditemmsg = ''
          let valarr = val.split(' ')
          this.firstitem = valarr[0]
          var tixiarr = valarr[2].split(',')
          var tixistr = ''
          for (var i = 0; i < tixiarr.length; i++) {
            if (tixistr == '') {
              tixistr = tixiarr[i]
            } else {
              tixistr = tixistr + '\n' + tixiarr[i]
            }
          }
          this.firstitemmsg = valarr[1] + '\n' + tixistr
          if (this.thisdialog == 0) {
            this.istixi = false
          }
          var obj = {}
          for (var i = 0; i < this.systemStandard.length; i++) {
            if (this.systemStandard[i].str.includes(this.firstitem)) {
              obj = this.systemStandard[i]
            }
          }
          var parems = obj.id
          getProductNameByTarget(parems).then(res => {
            if (res.code == 200) {
              var result = res.result
              var resarr = []
              for (var i = 0; i < result.length; i++) {
                var resobj = {
                  'str': result[i].code + ' ' + result[i].name,
                  'id': result[i].id
                }
                resarr.push(resobj)
              }
              this.seccenditemobj = resarr
            }
          })
        }else{
          this.istixi = true
          this.firstitemmsg = ''
        }
      },
      changeseccenditem: function(val) {
        if(val!=''){
          let valarr = val.split(' ')
        this.seccenditem = valarr[0]
        this.seccenditemmsg = valarr[1]
        }else{
          this.seccenditemmsg = ''
        }
      },
      diasys: function() {
        if (this.title == '') {
          this.$confirm('产品套餐名称不可为空！', '', {
            showConfirmButton: false,
            cancelButtonText: '确定',
            type: 'warning'
          }).catch(() => {})
          return
        }
        if (this.firstitem == '') {
          this.$confirm('请选择归属体系！', '', {
            showConfirmButton: false,
            cancelButtonText: '确定',
            type: 'warning'
          }).catch(() => {})
          return
        }
        if (this.seccenditem == '') {
          this.$confirm('请选择归属产品！', '', {
            showConfirmButton: false,
            cancelButtonText: '确定',
            type: 'warning'
          }).catch(() => {})
          return
        }
        if (this.price == '') {
          this.$confirm('请输入套餐价格！', '', {
            showConfirmButton: false,
            cancelButtonText: '确定',
            type: 'warning'
          }).catch(() => {})
          return
        }
        if (this.months == '') {
          this.$confirm('请输入套餐有效期！', '', {
            showConfirmButton: false,
            cancelButtonText: '确定',
            type: 'warning'
          }).catch(() => {})
          return
        }
        var obj = {}
        for (var i = 0; i < this.systemStandard.length; i++) {
          if (this.systemStandard[i].str.includes(this.firstitem)) {
            obj = this.systemStandard[i]
            obj.name = this.systemStandard[i].str.split(' ')[1]
          }
        }
        var objproduct = {}
        for (var i = 0; i < this.seccenditemobj.length; i++) {
          if (this.seccenditemobj[i].str.includes(this.seccenditem)) {
            objproduct = this.seccenditemobj[i]
            objproduct.name = this.seccenditemobj[i].str.split(' ')[1]
          }
        }
        console.log(this.seccenditemobj)
        var parems = {
          "id": '',
          "name": this.title,
          "price": this.price,
          "productId": objproduct.id,
          "productName": objproduct.name,
          "systemTypeId": obj.id,
          "systemTypeName": obj.name,
          "validMonths": this.months
        }
        if (this.thisdialog == 0) {
          productadd(parems).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '新增成功',
                type: 'success',
                center: true,
                time: 0
              });
              this.dialogFormVisible = false
              this.refshtable()
              this.getmohu();
              this.closedialog()
            }
          })
        } else {
          parems.id = this.selectedarr[0].id
          productedit(parems).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '编辑成功',
                type: 'success',
                center: true,
                time: 0
              });
              this.dialogFormVisible = false
              this.refshtable()
              this.closedialog()
            }
          })
        }

      },
      closedialog: function() {
        this.title = ''
        this.firstitemid = ''
        this.firstitem = ''
        this.firstitemmsg = ''
        this.seccenditem = ''
        this.seccenditemmsg = ''
        this.istixi = true
        this.price = ''
        this.months = ''
        this.isedit = false
      },
      handleMouseEnter: function(row, column, cell, event) {
        if (column.property == 'systemTypeName') {
          var guojiaarr = row.nationalStandard.split(',')
          var guojiarr = row.internationalStandard.split(',')
          var str = ''
          var newstrarr = []
          for (var i = 0; i < guojiaarr.length; i++) {
            var newstr = guojiaarr[i] + '/' + guojiarr[i]
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
      }
    },
    watch: {
      'mainmsg': function(newVal, oldVal) {
        if (newVal != oldVal) {
          this.changemainmsg = true
          //this.getmohu();
          //this.alltixi();
        }
      },
      'title': function(newVal, oldVal) {
        this.titlelength = newVal.length + '/20'
      },
      'price': function(newVal, oldVal) {
        if (newVal > 0) {
          var s = newVal.toString()
          var r = s.indexOf('.')
          if (r < 0) {
            r = s.length;
            s += '.';
          }
          while (s.length <= r + 2) {
            s += '0';
          }
          if (/^\+?(\d*\.\d{2})$/.test(s)) {

          } else {
            this.price = this.price.substring(0, this.price.toString().indexOf('.') + 3)
          }
        } else {
          this.price = ''
        }
      },
      'months': function(newVal, oldVal) {
        if (/^[0-9]*[1-9][0-9]*$/.test(newVal)) {
          if (newVal > 120) {
            this.months = 120
          }
        } else {
          this.months = ''
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

  .productPricespan {
    position: absolute;
    top: 0;
    line-height: 30px;
    font-size: 12px;
    color: #6f6f77;
  }
</style>
