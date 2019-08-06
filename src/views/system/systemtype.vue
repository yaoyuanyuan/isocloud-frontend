<template>
  <div class="appmain-bg">
    <div class="ad-header layui-form">
      <div class="adh-logo">
        <svg-icon icon-class="Icon-System-information"></svg-icon>
      </div>
      <h3 class="adh-title">体系管理</h3>
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
        <div style="width: 170px;" v-show="issreach" id="headerselect">
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==0" :clearable='true' @blur="headerselectblur"
            popper-class="selectwidth170">
            <el-option v-for="(item,index) in codeobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==1" :clearable='true' @blur="headerselectblur"
            popper-class="selectwidth170">
            <el-option v-for="(item,index) in nameobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==2" :clearable='true' @blur="headerselectblur"
            popper-class="selectwidth170">
            <el-option v-for="(item,index) in nationalStandardobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==3" :clearable='true' @blur="headerselectblur"
            popper-class="selectwidth170">
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
            <el-select v-model="nationalStandard" filterable placeholder="" :clearable='true' @blur="nationalStandardselectblur"
              popper-class="selectwidth200">
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
            <el-select v-model="internationalStandard" filterable placeholder="" :clearable='true' @blur="internationalStandardselectblur"
              popper-class="selectwidth200">
              <el-option v-for="(item,index) in internationalStandardobj" :key="index" :value="item" :title="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <button class="layui-btn" @click="advancedSearch()">查询</button>
        <button type="reset" class="layui-btn layui-btn-primary" @click="reset()">重置</button>
      </div>
    </div>
    <el-table ref="multipleTable" :data="mainmsg.list" tooltip-effect="dark" style="width: 100%" border @select="tableSelected"
      @select-all="tableAllSelected" @sort-change='tableSortChange'>
      <el-table-column type="selection" width="46" align="center">
      </el-table-column>
      <el-table-column prop="code" label="体系ID" min-width="100" sortable="custom">
      </el-table-column>
      <el-table-column prop="name" label="体系名称" min-width="190" sortable="custom">
      </el-table-column>
      <el-table-column prop="nationalStandardHtml" label="国家标准" min-width="168" class-name="tdpre">
        <template slot-scope="scope">
          <div v-html="scope.row.nationalStandardHtml"></div>
        </template>
      </el-table-column>
      <el-table-column prop="internationalStandardHtml" label="国际标准" min-width="140" class-name="tdpre">
        <template slot-scope="scope">
          <div v-html="scope.row.internationalStandardHtml"></div>
        </template>
      </el-table-column>
      <el-table-column label="发布日期" min-width="94">
        <template slot-scope="scope">
          {{scope.row.publishTime==null||scope.row.publishTime==''?'':scope.row.publishTime.substring(0,10)}}
        </template>
      </el-table-column>
      <el-table-column label="实施日期" min-width="94">
        <template slot-scope="scope">
          {{scope.row.invalidTime==null||scope.row.invalidTime==''?'':scope.row.invalidTime.substring(0,10)}}
        </template>
      </el-table-column>
      <el-table-column label="来源" min-width="80">
        <template slot-scope="scope">
          {{scope.row.dataSource==0?'系统自带':'自定义'}}
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="74">
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
              <div class="td-hover"><span @click="tdedit(scope.row)" v-if="scope.row.dataSource!=0">编辑</span><span
                  @click="tdshang(scope.row)" v-if="scope.row.displayStatus==1">上架</span><span @click="tdxia(scope.row)"
                  v-if="scope.row.displayStatus==0">下架</span><span @click="tddel(scope.row)" v-if="scope.row.dataSource!=0">删除</span></div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页容器-->
    <div id="pagination"></div>
    <el-dialog :title="thisdialog==0?'新增体系':'编辑体系'" :visible.sync="dialogFormVisible" center append-to-body v-if='dialogFormVisible'
      @close="closedialog()" custom-class="dialogWidth600">
      <div style="max-height: 300px;overflow: hidden auto;margin-right: -20px;padding-bottom: 100px;" class="divscrollbar">
        <div class="layui-form">
          <div class="layui-form-item">
            <label class="layui-form-label" style="font-size: 12px;">体系名称：</label>
            <div class="layui-input-block">
              <input type="text" name="title" required lay-verify="required" placeholder="请输入体系名称" autocomplete="off"
                class="layui-input" style="width: 474px;padding-right: 40px;font-size: 12px;color: #1B1B2A;" v-model="title"
                maxlength="60" @focus="titleerror=false;$refs.title.style.borderColor='#e6e6e6'" ref="title">
              <span class="syslength">{{titlelength}}</span>
            </div>
          </div>
        </div>
        <div class="layui-form">
          <div class="layui-form-item">
            <label class="layui-form-label" style="font-size: 12px;">体系标准：</label>
            <div class="layui-input-inline">
              <div class="layui-input-inline" v-for="(it, index1) in list" :key="index1" style="width: 430px;margin-bottom: 10px;">
                <el-select v-model="oneId[index1]" placeholder="输入体系标准关键字搜索" filterable :clearable='true' @change="changeitem(oneId[index1],index1)"
                  popper-class="maxheight200">
                  <el-option v-for="(item,index) in systemStandard" :key="index" :value="item.systemStandard">
                  </el-option>
                </el-select>
                <span @click="delItem(index1,oneId[index1])" class="sysdel" v-if="index1>0">删除</span>
              </div>
              <span @click="addItem()" class="sysadd">增加标准</span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
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
    systemStandard,
    sysadd,
    sysdelete,
    getsys,
    updatesys,
    sysedit
  } from '@/api/system'
  export default {
    name:'systemtype',
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
        //新增
        thisdialog: 0,
        dialogFormVisible: false,
        title: '',
        titlelength: '0/60',
        list: [''],
        oneId: [''],
        systemStandard: '',
        xinnationalStandard: '',
        xininternationalStandard: ''
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
      //所有体系查询
      alltixi: function() {
        systemStandard().then(res => {
          if (res.code == 200) {
            this.systemStandard = res.result
          }
        })
      },
      //根据ID查体系
      getsysitem: function(id) {
        getsys(id).then(res => {
          if (res.code == 200) {
            this.title = res.result.name
            this.list = []
            this.oneId = []
            let guojiaarr = res.result.nationalStandard.split(',')
            let guojiarr = res.result.internationalStandard.split(',')
            for (var i = 0; i < guojiaarr.length; i++) {
              this.list.push('')
              this.oneId[i] = guojiaarr[i] + '/' + guojiarr[i]
            }
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
      //header删除
      headerdel: function() {
        let _this = this;
        let parems = [];
        console.log(this.selectedarr)
        for (var i = 0; i < this.selectedarr.length; i++) {
          if (this.selectedarr[i].dataSource == 0) {
            this.$confirm('选中项目中包含了系统自带的体系，不可删除！', '', {
              showConfirmButton: false,
              cancelButtonText: '确定',
              type: 'warning'
            }).catch(() => {

            })
            return
          } else if (this.selectedarr[i].productNumbers > 0) {
            this.$confirm('选中项目中包含了已关联产品的体系类型，不可删除！', '', {
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
        let length = '确认删除所选的' + parems.length + '个体系';
        if (parems.length > 0) {
          this.$confirm(length, '', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            sysdelete(parems).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  center: true
                });
                _this.selectedarr = [];
                _this.refshtable()
                _this.getmohu()
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
        if (val.productNumbers > 0) {
          this.$confirm('本体系标准已关联产品，不可删除！', '', {
            showConfirmButton: false,
            cancelButtonText: '确定',
            type: 'warning'
          }).catch(() => {

          })
          return
        }
        let length = '确认删除此体系吗';
        this.$confirm(length, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sysdelete(parems).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '删除成功',
                type: 'success',
                center: true,
                time: 0
              });
              this.refshtable()
              this.getmohu()
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
          for (var i = 0; i < this.selectedarr.length; i++) {
            if (this.selectedarr[i].dataSource == 0) {
              this.$confirm('本体系为系统自带体系标准，不可以编辑！', '', {
                showConfirmButton: false,
                cancelButtonText: '确定',
                type: 'warning'
              }).catch(() => {

              })
              return
            }
          }
          this.thisdialog = 1
          this.alltixi()
          this.dialogFormVisible = true
          this.getsysitem(parems[0])
        }
      },
      //td编辑
      tdedit: function(val) {
        let parems = val.id
        this.selectedarr[0] = val
        this.alltixi()
        this.thisdialog = 1
        this.dialogFormVisible = true
        this.getsysitem(parems)
      },
      //新增
      headeradd: function() {
        this.alltixi()
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
        this.$confirm('确认上架本体系类型吗？', '', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          updatesys(parems).then(res => {
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
        this.$confirm('体系下架后用户新建产品时将不可以选择此体系标准，确定下架吗？', '', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          updatesys(parems).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '下架成功',
                type: 'success',
                center: true,
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
          var length = '共选择' + parems.length + '条数据，是否将其中已下架的' + xiajia.length + '条体系上架';
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
            updatesys(paremsobj).then(res => {
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
          var length = '共选择' + parems.length + '条数据，是否将其中已上架的' + shangjia.length + '条体系下架';
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
            updatesys(paremsobj).then(res => {
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
        } else if (val.prop == 'name') {
          if (val.order == null) {
            parems.orderBy = ''
          } else if (val.order == 'descending') {
            parems.orderBy = 'name desc'
          } else if (val.order == "ascending") {
            parems.orderBy = 'name asc'
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
      addItem: function() {
        this.oneId[this.list.length] = ''
        this.list.push('');
      },
      delItem: function(index1, obj) {
        this.oneId.splice(index1, 1)
        this.list.splice(index1, 1)
        var newarr = this.oneId
        var guojiastr = ''
        var guojistr = ''
        for (var i = 0; i < newarr.length; i++) {
          var newstr = newarr[i].split("/")
          if (newstr[0] != ' ') {
            if (guojiastr == '') {
              guojiastr = newstr[0]
            } else {
              guojiastr = guojiastr + ',' + newstr[0]
            }
          } else {
            if (guojiastr == '') {
              guojiastr = '-'
            } else {
              guojiastr = guojiastr + ',-'
            }
          }
          if (newstr[1] != ' ') {
            if (guojistr == '') {
              guojistr = newstr[1]
            } else {
              guojistr = guojistr + ',' + newstr[1]
            }
          } else {
            if (guojistr == '') {
              guojistr = '-'
            } else {
              guojistr = guojistr + ',-'
            }
          }
        }
        this.xinnationalStandard = guojiastr
        this.xininternationalStandard = guojistr
      },
      changeitem: function(obj, index1) {
        var newarr = [];
        var oneIdarr = this.oneId
        newarr = oneIdarr
        var guojiastr = ''
        var guojistr = ''
        var newarr2 = []
        for (var j = 0; j < newarr.length; j++) {
          if (newarr[j] != '') {
            newarr2.push(newarr[j])
          }
        }
        if ((new Set(newarr2)).size != newarr2.length) {
          if (index1 != undefined) {
            this.oneId[index1] = ''
            newarr[index1] = ''
          }
          this.$confirm('已经添加过同一标准', '', {
            showConfirmButton: false,
            cancelButtonText: '确定',
            type: 'warning'
          }).catch(() => {})
        }
        for (var i = 0; i < newarr.length; i++) {
          var newstr = newarr[i].split("/")
          if (newstr[0] != ' ') {
            if (guojiastr == '') {
              guojiastr = newstr[0]
            } else {
              guojiastr = guojiastr + ',' + newstr[0]
            }
          } else {
            if (guojiastr == '') {
              guojiastr = '-'
            } else {
              guojiastr = guojiastr + ',-'
            }
          }
          if (newstr[1] != ' ') {
            if (guojistr == '') {
              guojistr = newstr[1]
            } else {
              guojistr = guojistr + ',' + newstr[1]
            }
          } else {
            if (guojistr == '') {
              guojistr = '-'
            } else {
              guojistr = guojistr + ',-'
            }
          }
        }
        this.xinnationalStandard = guojiastr
        this.xininternationalStandard = guojistr
      },
      diasys: function() {
        if (this.title == '') {
          this.$confirm('体系名称不可为空！', '', {
            showConfirmButton: false,
            cancelButtonText: '确定',
            type: 'warning'
          }).catch(() => {})
          return
        }
        var listarr = this.list
        for (var i = 0; i < listarr.length; i++) {
            if (this.oneId[i] != '') {

            } else {
              this.$confirm('请选择体系类型标准！', '', {
                showConfirmButton: false,
                cancelButtonText: '确定',
                type: 'warning'
              }).catch(() => {})
              return
            }
        }
        var newarr = this.oneId
        var guojiastr = ''
        var guojistr = ''
        for (var i = 0; i < newarr.length; i++) {
          var newstr = newarr[i].split("/")
          if (newstr[0] != ' ') {
            if (guojiastr == '') {
              guojiastr = newstr[0]
            } else {
              guojiastr = guojiastr + ',' + newstr[0]
            }
          } else {
            if (guojiastr == '') {
              guojiastr = '-'
            } else {
              guojiastr = guojiastr + ',-'
            }
          }
          if (newstr[1] != ' ') {
            if (guojistr == '') {
              guojistr = newstr[1]
            } else {
              guojistr = guojistr + ',' + newstr[1]
            }
          } else {
            if (guojistr == '') {
              guojistr = '-'
            } else {
              guojistr = guojistr + ',-'
            }
          }
        }
        this.xinnationalStandard = guojiastr
        this.xininternationalStandard = guojistr
        var parems = {
          "internationalStandard": this.xininternationalStandard,
          "name": this.title,
          "nationalStandard": this.xinnationalStandard
        }
        if (this.thisdialog == 0) {
          parems.dataSource = 1
          sysadd(parems).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '新增成功',
                type: 'success',
                center: true,
                time: 0
              });
              this.dialogFormVisible = false
              this.refshtable()
              this.getmohu()
              this.closedialog();
            }
          })
        } else {
          parems.id = this.selectedarr[0].id
          sysedit(parems).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '编辑成功',
                type: 'success',
                center: true,
                time: 0
              });
              this.dialogFormVisible = false
              this.refshtable()
              this.closedialog();
            }
          })
        }
      },
      closedialog: function() {
        this.title = ''
        this.list = ['']
        this.oneId = ['']
        this.selectedarr = []
      }
    },
    watch: {
      'mainmsg': function(newVal, oldVal) {
        if (newVal != oldVal) {
          this.changemainmsg = true
          //this.getmohu()
        }
      },
      'title': function(newVal, oldVal) {
        this.titlelength = newVal.length + '/60'
      },
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

<style scoped="scoped">
  .syslength {
    color: #aaaaaf;
    position: absolute;
    left: 495px;
    top: 0;
    line-height: 30px;
    font-size: 12px;
  }

  .sysadd {
    font-size: 12px;
    line-height: 12px;
    color: #0099ff;
    cursor: pointer;
    position: relative;
    top: -7px;
  }

  .sysadd:before {
    content: '+';
    font-size: 15px;
  }

  .sysdel {
    line-height: 30px;
    position: absolute;
    top: 0;
    right: -30px;
    font-size: 12px;
    color: #0099ff;
    cursor: pointer;
  }

  .dialogWidth600 {
    width: 600px;
  }
</style>
