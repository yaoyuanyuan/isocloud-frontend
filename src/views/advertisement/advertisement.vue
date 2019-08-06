<template>
  <div class="appmain-bg">
    <div class="ad-header layui-form">
      <div class="adh-logo">
        <svg-icon icon-class="Icon-Adplacement"></svg-icon>
      </div>
      <h3 class="adh-title">广告位管理</h3>
      <div class="adh-selected">
        <a href="javascript:;" :class="isselectedtype1?'isselected':''" @click="typechange(2)">全部 <i>(</i>{{total}}<i>)</i></a>
        <span>|</span>
        <a href="javascript:;" :class="isselectedtype2?'isselected':''" @click="typechange(0)">登录页 <i>(</i>{{totaldenglu}}<i>)</i></a>
        <span>|</span>
        <a href="javascript:;" :class="isselectedtype3?'isselected':''" @click="typechange(1)">首页 <i>(</i>{{totalshouye}}<i>)</i></a>
      </div>
      <div class="adh-right">
        <div class="adh-sreach">
          <select name="sreach" lay-filter="sreach">
            <option value="0">发布人</option>
            <option value="1">发布账号</option>
            <option value="2">广告标题</option>
            <option value="3">广告状态</option>
          </select>
        </div>
        <input type="text" name="title" lay-verify="" autocomplete="off" placeholder="" class="adh-input" v-show="issreach"
          v-model="headermsg">
        <div style="width: 170px;" v-show="issreachsel">
          <select name="adhr-sel" lay-filter="adhr-sel" id="adhrsel">
            <option value="0" selected="">全部</option>
            <option value="1">上架</option>
            <option value="2">下架</option>
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
          <li v-if="menurefresh" @click="refresh()">
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
              </i><span>刷新</span><b @click="checked(6)">
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
        <label class="layui-form-label">广告标题：</label>
        <div class="layui-input-inline">
          <input type="text" name="email" autocomplete="off" class="layui-input" style="width:200px" v-model="adtitle">
        </div>
      </div>
      <div class="layui-inline mr15">
        <label class="layui-form-label">广告状态：</label>
        <div class="layui-input-inline" style="width: 100px;">
          <select name="quiz1" lay-filter="quiz1" id="quiz1">
            <option value="0" selected="">全部</option>
            <option value="1">上架</option>
            <option value="2">下架</option>
          </select>
        </div>
      </div>
      <div class="layui-inline mr15 mt10-1">
        <label class="layui-form-label">投放时间：</label>
        <div class="layui-input-inline timeicon">
          <input type="text" class="layui-input" id="time1" placeholder=" - " style="width: 200px;" autocomplete="off"
            ref="time1">
        </div>
      </div>
      <div class="layui-inline mr15 mt10-1">
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
      @cell-mouse-leave="handleMouseOut">
      <el-table-column type="selection" width="46" align="center">
      </el-table-column>
      <el-table-column prop="publisherName" label="发布人" min-width="72">
      </el-table-column>
      <el-table-column prop="publisherAccount" label="发布账号" min-width="82">
      </el-table-column>
      <el-table-column prop="type" label="广告类型" min-width="128">
        <template slot-scope="scope">
          {{scope.row.type==0?'登录页':'首页'}}
        </template>
      </el-table-column>
      <el-table-column prop="publishStatus" label="广告状态" min-width="82">
        <template slot-scope="scope">
          {{scope.row.publishStatus==1?'上架':'下架'}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="广告标题" min-width="340" class-name="moretitle">
      </el-table-column>
      <el-table-column prop="sort" label="广告顺序" min-width="82">
      </el-table-column>
      <el-table-column label="投放时间" min-width="172">
        <template slot-scope="scope">
          {{scope.row.expireType==0?scope.row.publishTime.substring(0,10)+' 至 '+scope.row.expireTime.substring(0,10):'长期有效'}}
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" min-width="144" sortable="custom">
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
    delAd,
    onsell,
    offsell
  } from '@/api/advertisement'
  export default {
    name:'advertisement',
    inject: ['reload'],
    data() {
      return {
        'isFirstEnter': false, // 是否第一次进入，默认false
        'hoverindex': -1,
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
        'isadvanced': false,
        'issreachsel': false,
        'headermsg': '',
        'headerselected': 0,
        'mainmsg': '',
        'preparems': '',
        'simplepublishStatus': '',
        "adcreateBeginTime": "",
        "adcreateEndTime": "",
        "adexpireTime": "",
        "adorderBy": "",
        "adpageNum": 1,
        "adpageSize": 10,
        "adpublishStatus": '',
        "adpublishTime": "",
        "adpublisherAccount": "",
        "adpublisherName": "",
        "adtitle": "",
        "adtype": '',
        "isselectedtype1": true,
        "isselectedtype2": false,
        "isselectedtype3": false,
        "total": '',
        "totalshouye": '',
        "totaldenglu": '',
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
        this.headermsg = ''
        $('#adhrsel').siblings("div.layui-form-select").find('dl').find('dd[lay-value=""]').click();
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
      //刷新
      refresh: function() {
        this.reload();
      },
      //请求列表数据
      getquery: function(val) {
        if (val) {
          var parems = val
        } else {
          var parems = {
            "createBeginTime": "",
            "createEndTime": "",
            "expireTime": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "publishStatus": '',
            "publishTime": "",
            "publisherAccount": "",
            "publisherName": "",
            "title": "",
            "type": ''
          }
        }
        this.preparems = parems
        getAdQuery(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result;
            this.total = res.result.countList[0]
            this.totaldenglu = res.result.countList[1]
            this.totalshouye = res.result.countList[2]
          }
        })

      },
      //简单搜索
      simpleSearch: function() {
        let headerindex = this.headerselected
        if (headerindex == 0) {
          var parems = {
            "createBeginTime": "",
            "createEndTime": "",
            "expireTime": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "publishStatus": '',
            "publishTime": "",
            "publisherAccount": "",
            "publisherName": this.headermsg.trim(),
            "title": "",
            "type": ''
          }
        } else if (headerindex == 1) {
          var parems = {
            "createBeginTime": "",
            "createEndTime": "",
            "expireTime": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "publishStatus": '',
            "publishTime": "",
            "publisherAccount": this.headermsg.trim(),
            "publisherName": "",
            "title": "",
            "type": ''
          }
        } else if (headerindex == 2) {
          var parems = {
            "createBeginTime": "",
            "createEndTime": "",
            "expireTime": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "publishStatus": '',
            "publishTime": "",
            "publisherAccount": "",
            "publisherName": "",
            "title": this.headermsg.trim(),
            "type": ''
          }
        } else if (headerindex == 3) {
          var parems = {
            "createBeginTime": "",
            "createEndTime": "",
            "expireTime": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "publishStatus": this.simplepublishStatus,
            "publishTime": "",
            "publisherAccount": "",
            "publisherName": "",
            "title": "",
            "type": ''
          }
        }
        this.preparems = parems
        getAdQuery(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result
            this.total = res.result.countList[0]
            this.totaldenglu = res.result.countList[1]
            this.totalshouye = res.result.countList[2]
          }
        })
      },
      //高级搜索
      advancedSearch: function() {
        var parems = {
          "createBeginTime": this.adcreateBeginTime,
          "createEndTime": this.adcreateEndTime,
          "expireTime": this.adexpireTime,
          "orderBy": "",
          "pageNum": 1,
          "pageSize": 10,
          "publishStatus": this.adpublishStatus,
          "publishTime": this.adpublishTime,
          "publisherAccount": this.adpublisherAccount,
          "publisherName": this.adpublisherName,
          "title": this.adtitle,
          "type": this.adtype
        }
        this.preparems = parems
        getAdQuery(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result
            this.total = res.result.countList[0] == '' ? '0' : res.result.countList[0]
            this.totaldenglu = res.result.countList[1]
            this.totalshouye = res.result.countList[2]
          }
        })
      },
      //重置
      reset: function() {
        this.adpublisherName = ''
        this.adpublisherAccount = ''
        this.adtitle = ''
        this.$refs.time1.value = ''
        this.$refs.time2.value = ''
        $('#quiz1').siblings("div.layui-form-select").find('dl').find('dd[lay-value=0]').click();
        $('#quiz2').siblings("div.layui-form-select").find('dl').find('dd[lay-value=2]').click();
      },
      //type切换
      typechange: function(val) {
        if (val == 2) {
          this.isselectedtype1 = true
          this.isselectedtype2 = false
          this.isselectedtype3 = false
        } else if (val == 0) {
          this.isselectedtype1 = false
          this.isselectedtype2 = true
          this.isselectedtype3 = false
        } else if (val == 1) {
          this.isselectedtype1 = false
          this.isselectedtype2 = false
          this.isselectedtype3 = true
        }
        let parems = this.preparems
        parems.type = val == 2 ? '' : val
        getAdQuery(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result
          }
        })
      },
      //header删除
      headerdel: function() {
        let _this = this;
        let parems = [];
        for (var i = 0; i < this.selectedarr.length; i++) {
          parems.push(this.selectedarr[i].id)
        }
        let length = '确认删除所选的' + parems.length + '广告条记录？';
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
        let _this = this;
        let parems = []
        parems.push(val.id)
        let length = '确认删除所选的1条广告记录？';
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
              _this.refshtable()
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
            path: 'addadvertisement',
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
          path: 'addadvertisement',
          query: {
            id: parems
          }
        });
      },
      //新增
      headeradd: function() {
        this.$router.push({
          path: 'addadvertisement'
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
          if (this.selectedarr[i].publishStatus == 2) {
            xiajia.push(this.selectedarr[i].id)
          } else {
            shangjia.push(this.selectedarr[i].id)
          }
        }
        if (xiajia.length == 0) {
          var length = '已选的' + shangjia.length + '条数据已是上架状态！';
        } else {
          var length = '共选择' + parems.length + '条数据，是否将其中已下架的' + xiajia.length + '条广告上架？';
        }
        if (parems.length > 0) {
          this.$confirm(length, '', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            onsell(parems).then(res => {
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
          if (this.selectedarr[i].publishStatus == 1) {
            shangjia.push(this.selectedarr[i].id)
          } else {
            xiajia.push(this.selectedarr[i].id)
          }
        }
        if (shangjia.length == 0) {
          var length = '已选的' + xiajia.length + '条数据已是下架状态！';
        } else {
          var length = '共选择' + parems.length + '条数据，是否将其中已上架的' + shangjia.length + '条广告下架？';
        }
        if (parems.length > 0) {
          this.$confirm(length, '', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            offsell(parems).then(res => {
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
      //判断不能选中多个td
      notmoretd: function() {

      },
      //刷新table
      refshtable: function() {
        let parems = this.preparems
        getAdQuery(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result
            this.total = res.result.countList[0]
            this.totaldenglu = res.result.countList[1]
            this.totalshouye = res.result.countList[2]
          }
        })
      },
      tableSelected: function(val, row) {
        this.selectedarr = val
      },
      tableAllSelected: function(val) {
        this.selectedarr = val
      },
      //table里面做的事件
      tableuse: function(_this) {
        $('.td-hover-father').parent().parent().parent().hover(function() {
          $(this).find('div.td-hover-father').show()
        }, function() {
          $(this).find('div.td-hover-father').hide()
        })
      },
      tableSortChange: function(val) {
        let parems = this.preparems
        if (val.order == null) {
          parems.orderBy = ''
        } else if (val.order == 'descending') {
          parems.orderBy = 'created_time desc'
        } else if (val.order == "ascending") {
          parems.orderBy = 'created_time asc'
        }
        parems.pageNum = 1
        parems.pageSize = 10
        this.getquery(parems)
        this.preparems = parems
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
          elem: '#time1',
          range: true,
          done: function(value, date) {
            if (value) {
              _this.adcreateBeginTime = value.substring(0, 10) + ' 00:00:00'
              _this.adcreateEndTime = value.substring(13, 23) + ' 23:59:59'
            } else {
              _this.adcreateBeginTime = ''
              _this.adcreateEndTime = ''
            }
          }
        });
        laydate.render({
          elem: '#time2',
          range: true,
          done: function(value, date) {
            if (value) {
              _this.adpublishTime = value.substring(0, 10) + ' 00:00:00'
              _this.adexpireTime = value.substring(13, 23) + ' 23:59:59'
            } else {
              _this.adpublishTime = ''
              _this.adexpireTime = ''
            }
          }
        });
        form.on('select(sreach)', function(data) {
          _this.changestates(data);
        })
        form.on('select(adhr-sel)', function(data) {
          _this.simplepublishStatus = data.value;
        })
        form.on('select(quiz1)', function(data) {
          _this.adpublishStatus = data.value == 0 ? '' : data.value;
        })
      })
    },
    beforeRouteLeave(to, from, next) {
      if (to.name == 'addadvertisement') {
        this.$store.commit('setKeepAlive', ['advertisement']); //这是此页面的name属性名字
      } else {
        this.$store.commit('setKeepAlive', []);
      }
      next();
    }
  }
</script>

<style>

</style>
