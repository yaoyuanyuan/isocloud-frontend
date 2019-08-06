<template>
  <div class="appmain-bg">
    <div class="ad-header layui-form">
      <div class="adh-logo">
        <svg-icon icon-class="Icon-Mechanism"></svg-icon>
      </div>
      <h3 class="adh-title">机构管理</h3>
      <div class="adh-selected">
        <a href="javascript:;" class="isselected">全部<i>(</i>{{total}}<i>)</i></a>
      </div>
      <div class="adh-right">
        <div class="adh-sreach">
          <select name="sysreach" lay-filter="sysreach">
            <option value="0">机构名称</option>
            <option value="1">机构类型</option>
            <option value="2">所属地区</option>
          </select>
        </div>
        <div style="width: 170px;position:relative" v-show="issreach" id="headerselect">
          <el-select v-model="automsg" filterable placeholder="" v-show="headerselected==0" :clearable='true' @blur="headerselectblur"
            popper-class="selectwidth170">
            <el-option v-for="(item,index) in nameobj" :key="index" :value="item" :title="item">
            </el-option>
          </el-select>
          <div v-show="headerselected==2">
            <pl @func="simpleSearch1" :clear="clear" :info="info"></pl>
          </div>
        </div>
        <div style="width: 170px;" v-show="issreachsel">
          <select name="sys-sel" lay-filter="sys-sel" id="syssel">
            <option value="" selected="">全部</option>
            <option value="1">认证机构</option>
            <option value="2">培训机构</option>
            <option value="3">咨询机构</option>
            <option value="4">其他机构</option>
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
          <li v-if="menushelf" @click="headerlianxiren()">
            <svg-icon icon-class="Icon-Contact"></svg-icon>
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
                <svg-icon icon-class="Icon-Contact"></svg-icon>
              </i><span @click="headerlianxiren()">联系人编辑</span><b @click="checked(4)">
                <svg-icon :icon-class="ismenushelf?Unchecked:check"></svg-icon>
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
        <label class="layui-form-label">机构名称：</label>
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
        <label class="layui-form-label">状态：</label>
        <div class="layui-input-inline" style="width: 100px;">
          <select name="sys-gaojisel" lay-filter="sys-gaojisel" id="sys-gaojisel">
            <option value="" selected="">全部</option>
            <option value="1">认证机构</option>
            <option value="2">培训机构</option>
            <option value="3">咨询机构</option>
            <option value="4">其他机构</option>
          </select>
        </div>
      </div>
      <div class="layui-inline mr15">
        <label class="layui-form-label">所属地区：</label>
        <div class="layui-input-inline" style="width: 200px;height: 30px;">
          <pl @func="simpleSearch1" :clear="clear" :info="info"></pl>
        </div>
      </div>
      <div class="layui-inline mr15">
        <label class="layui-form-label">创建时间：</label>
        <div class="layui-input-inline" style="margin-right: 13px;">
          <input type="text" class="layui-input" id="mechtime" placeholder=" - " style="width: 200px;" autocomplete="off"
            ref="mechtime">
        </div>
      </div>
      <div class="layui-inline mr15 mt10-4">
        <button class="layui-btn" @click="advancedSearch()">查询</button>
        <button type="reset" class="layui-btn layui-btn-primary" @click="reset()">重置</button>
      </div>
    </div>
    <el-table ref="multipleTable" :data="mainmsg.list" tooltip-effect="dark" style="width: 100%" border @select="tableSelected"
      @select-all="tableAllSelected" @sort-change='tableSortChange' @cell-click="tableclick">
      <el-table-column type="selection" width="46" align="center">
      </el-table-column>
      <el-table-column prop="name" label="机构名称" min-width="292" sortable="custom">
      </el-table-column>
      <el-table-column prop="type" label="机构类型" min-width="160">
        <template slot-scope="scope">
          {{['','认证机构','咨询机构','培训机构','其它机构'][scope.row.type]}}
        </template>
      </el-table-column>
      <el-table-column prop="registeredAddress" label="所属地区" min-width="208">
      </el-table-column>
      <el-table-column prop="contactNumbers" label="联系人数量" min-width="128">
        <template slot-scope="scope">
          <span style="color: #099fff;cursor: pointer;">{{scope.row.contactNumbers}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dataSource" label="来源" min-width="156">
        <template slot-scope="scope">
          {{scope.row.dataSource==0?'系统导入':'自定义'}}
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" min-width="176" sortable="custom">
      </el-table-column>
      <el-table-column label="" width="58">
        <template slot-scope="scope">
          <div style="cursor: pointer;position: relative;text-align: center;">
            <svg-icon icon-class="Icon-tablemore"></svg-icon>
            <div class="td-hover-father">
              <div class="td-hover"><span @click="tdlianxirenedit(scope.row)" class="lianxiren">联系人编辑</span><span
                  @click="tddel(scope.row)" v-if="scope.row.dataSource!=0">删除</span></div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页容器-->
    <div id="pagination"></div>
    <el-dialog title="联系人编辑" :visible.sync="dialogFormVisible" center append-to-body v-if='dialogFormVisible' @close="closedialog()"
      custom-class="dialogWidth998">
      <div class="lianxirendivfather divscrollbar">
        <div v-for="(item,index) in lianxirenobj" :key="index" class="lianxirendiv">
          <div class="lianxirendiv2"><span class="lianxirenspan lianxirenspanred">姓名:</span><input type="text"
              lay-verify="" autocomplete="off" placeholder="" class="lianxireninput" v-model="item.name"></div>
          <div class="lianxirendiv2"><span class="lianxirenspan lianxirenspanred">部门:</span><input type="text"
              lay-verify="" autocomplete="off" placeholder="" class="lianxireninput" v-model="item.dept"></div>
          <div class="lianxirendiv2"><span class="lianxirenspan lianxirenspanred">职位:</span><input type="text"
              lay-verify="" autocomplete="off" placeholder="" class="lianxireninput" v-model="item.position"></div>
          <div class="lianxirendiv2"><span class="lianxirenspan lianxirenspanred">邮箱:</span><input type="text"
              lay-verify="" autocomplete="off" placeholder="" class="lianxireninput" v-model="item.email"></div>
          <div class="lianxirendiv2"><span class="lianxirenspan">性别:</span>
            <div style="width: 150px;margin-right: 11px;">
              <el-select v-model="item.gender" placeholder="请选择" @change="sexchange()">
                <el-option v-for="(sexstr,index2) in sex" :label="sexstr.label" :value="sexstr.value" :key="index2"></el-option>
              </el-select>
            </div>
          </div>
          <div class="lianxirendiv2"><span class="lianxirenspan">座机号码:</span><input type="text" lay-verify=""
              autocomplete="off" placeholder="" class="lianxireninput" v-model="item.phone"></div>
          <div class="lianxirendiv2"><span class="lianxirenspan lianxirenspanred">兴趣爱好:</span><input type="text"
              lay-verify="" autocomplete="off" placeholder="" class="lianxireninput" v-model="item.hobby"></div>
          <div class="lianxirendiv2" v-for="(phonelist,index1) in item.moilephone" :key="index1"><span class="lianxirenspan lianxirenspanred">手机号码:</span><input
              type="text" lay-verify="" autocomplete="off" placeholder="" class="lianxireninput2" v-model="item.moilephone[index1]">
            <div class="lianxirensvg"><span v-if="item.moilephone.length<5&&index1==(item.moilephone.length-1)" @click="addphone(item)">
                <svg-icon icon-class="Icon-lianxirenadd"></svg-icon>
              </span><span v-if="item.moilephone.length>1" @click="delphone(item,index1)">
                <svg-icon icon-class="Icon-lianxirenlower"></svg-icon>
              </span></div>
          </div>
          <div class="lianxirendiv2 lianxirenremark"><span class="lianxirenspan">备注:</span><textarea type="text"
              lay-verify="" autocomplete="off" placeholder="" class="lianxirentextarea" v-model="item.remark"></textarea></div>
          <span class="lianxirendel" @click="dellianxiren(index)">
            <svg-icon icon-class="lianxirendelete"></svg-icon>
          </span>
        </div>
      </div>
      <div class="lianxirenadd" @click="addlianxiren()">添加联系人</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="diasys()" style="margin-right: 12px;">确 定</el-button>
        <el-button @click="dialogFormVisible = false,closedialog()">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" center append-to-body v-if='dialogTableVisible' @close="closetabledialog()"
      custom-class="dialogtableWidth1100">
      <el-table :data="lianxirendata" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column property="name" label="姓名" width="66"></el-table-column>
        <el-table-column property="gender" label="性别" width="46">
          <template slot-scope="scope">
            {{scope.row.gender==0?'男':'女'}}
          </template>
        </el-table-column>
        <el-table-column property="dept" label="部门" width="84"></el-table-column>
        <el-table-column property="position" label="职位" width="84"></el-table-column>
        <el-table-column property="phone" label="座机" width="108"></el-table-column>
        <el-table-column label="手机号码" width="188">
          <template slot-scope="scope">
            <div>{{scope.row.mobile1!=''?scope.row.mobile1:''}}{{scope.row.mobile2!=''?'/'+scope.row.mobile2:''}}</div>
            <div>{{scope.row.mobile3!=''?scope.row.mobile3:''}}{{scope.row.mobile4!=''?'/'+scope.row.mobile4:''}}</div>
            <div>{{scope.row.mobile5!=''?scope.row.mobile5:''}}</div>
          </template>
        </el-table-column>
        <el-table-column property="email" label="邮箱" width="204"></el-table-column>
        <el-table-column property="hobby" label="兴趣爱好" width="164"></el-table-column>
        <el-table-column property="remark" label="备注" width="114"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false,closetabledialog()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getList,
    condition,
    productedit,
    prdelete,
    updateproductprice,
    provinceList,
    lianxireninfo,
    lianxirenedit
  } from '@/api/mechanism'
  import pl from '@/components/province'
  export default {
    name:'mechanism',
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
        'menurefresh': true,
        'ismenuadd': false,
        'ismenuedit': false,
        'ismenudelete': false,
        'ismenushelf': false,
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
        "name": "",
        "displayStatus": '',
        'publishStartTime': '',
        publicEndTime: '',
        clear: '0',
        'syssel': '',
        //模糊搜索
        "nameobj": "",
        //省份
        info: '',
        //新增
        dialogFormVisible: false,
        //联系人编辑
        lianxirenobj: [{
          name: '',
          dept: '',
          position: '',
          email: '',
          gender: '',
          phone: '',
          hobby: '',
          id: '',
          moilephone: [''],
          remark: ''
        }],
        lianxirenop: 'lianxirenop',
        sex: [{
          value: '',
          label: '请选择'
        }, {
          value: 0,
          label: '男'
        }, {
          value: 1,
          label: '女'
        }],
        //查看联系人
        dialogTableVisible: false,
        lianxirendata: []
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
    components: {
      pl
    },
    created() {
      this.isFirstEnter = true;
      // 只有第一次进入或者刷新页面后才会执行此钩子函数
      // 使用keep-alive后（2+次）进入不会再执行此钩子函数
      this.getmohu();
      this.provinceobj();
      this.getquery();
    },
    methods: {
      provinceobj: function() {
        provinceList().then(res => {
          if (res.code == 200) {
            this.info = res.result
            this.info.unshift({
              city: '',
              id: '',
              name: '全部',
              no: 0
            })
          }
        })
      },
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
        this.pro = ''
        this.clear = '1'
        $('#syssel').siblings("div.layui-form-select").find('dl').find('dd[lay-value=""]').click();
        if (data.value == 1) {
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
            "endTime": "",
            "id": '',
            "name": "",
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "registeredAddress": "",
            "startTime": "",
            "type": ''
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
      //模糊查询
      getmohu: function() {
        condition().then(res => {
          if (res.code == 200) {
            this.nameobj = res.result.names
          }
        })
      },
      simpleSearch1: function(data) {
        this.pro = data
        this.clear = '0'
      },
      //简单搜索
      simpleSearch: function(data) {
        let headerindex = this.headerselected
        var registeredAddress = ''
        if (this.pro) {
          if (this.pro.p == '全部') {

          } else {
            if (this.pro.c != '') {
              var proc = '-' + this.pro.c
            } else {
              var proc = ''
            }
            if (this.pro.d != '') {
              var prod = '-' + this.pro.d
            } else {
              var prod = ''
            }
            registeredAddress = this.pro.p + proc + prod
          }
        }
        if (headerindex == 0) {
          var parems = {
            "endTime": "",
            "id": '',
            "name": this.automsg,
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "registeredAddress": "",
            "startTime": "",
            "type": ''
          }
        } else if (headerindex == 1) {
          var parems = {
            "endTime": "",
            "id": '',
            "name": '',
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "registeredAddress": "",
            "startTime": "",
            "type": this.syssel
          }
        } else if (headerindex == 2) {
          var parems = {
            "endTime": "",
            "id": '',
            "name": '',
            "orderBy": "",
            "pageNum": 1,
            "pageSize": 10,
            "registeredAddress": registeredAddress,
            "startTime": "",
            "type": ''
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
      //高级搜索
      advancedSearch: function() {
        var registeredAddress = ''
        if (this.pro) {
          if (this.pro.p == '全部') {

          } else {
            if (this.pro.c != '') {
              var proc = '-' + this.pro.c
            } else {
              var proc = ''
            }
            if (this.pro.d != '') {
              var prod = '-' + this.pro.d
            } else {
              var prod = ''
            }
            registeredAddress = this.pro.p + proc + prod
          }
        }
        var parems = {
          "endTime": this.publicEndTime,
          "id": '',
          "name": this.name,
          "orderBy": "",
          "pageNum": 1,
          "pageSize": 10,
          "registeredAddress": registeredAddress,
          "startTime": this.publishStartTime,
          "type": this.displayStatus
        }
        this.preparems = parems
        getList(parems).then(res => {
          if (res.code == 200) {
            this.mainmsg = res.result
            this.total = res.result.total
          }
        })
      },
      //重置
      reset: function() {
        this.clear = '1'
        this.name = ''
        this.pro = ''
        $('#sys-gaojisel').siblings("div.layui-form-select").find('dl').find('dd[lay-value=""]').click();
        $('#mechtime').val('')
      },
      //header删除
      headerdel: function() {
        let _this = this;
        let parems = [];
        for (var i = 0; i < this.selectedarr.length; i++) {
          if (this.selectedarr[i].dataSource == 0) {
            this.$confirm('系统导入的机构不可删除！', '', {
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
        let length = '确定删除选中的' + parems.length + '条机构信息？';
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
        let length = '确定删除此机构吗？';
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
            path: 'addmechanism',
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
          path: 'addmechanism',
          query: {
            id: parems
          }
        });
      },
      //新增
      headeradd: function() {
        this.$router.push({
          path: 'addmechanism'
        });
      },
      //联系人编辑
      headerlianxiren: function() {
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
          lianxireninfo(parems).then(res => {
            if (res.code == 200) {
              if (res.result == '') {

              } else {
                for (var i = 0; i < res.result.length; i++) {
                  this.lianxirenobj[i] = {
                    name: res.result[i].name,
                    dept: res.result[i].dept,
                    position: res.result[i].position,
                    email: res.result[i].email,
                    gender: parseInt(res.result[i].gender),
                    phone: res.result[i].phone,
                    hobby: res.result[i].hobby,
                    id: '',
                    moilephone: [],
                    remark: res.result[i].remark
                  }
                  if (res.result[i].mobile1 == '') {

                  } else {
                    this.lianxirenobj[i].moilephone.push(res.result[i].mobile1)
                  }
                  if (res.result[i].mobile2 == '') {

                  } else {
                    this.lianxirenobj[i].moilephone.push(res.result[i].mobile2)
                  }
                  if (res.result[i].mobile3 == '') {

                  } else {
                    this.lianxirenobj[i].moilephone.push(res.result[i].mobile3)
                  }
                  if (res.result[i].mobile4 == '') {

                  } else {
                    this.lianxirenobj[i].moilephone.push(res.result[i].mobile4)
                  }
                  if (res.result[i].mobile5 == '') {

                  } else {
                    this.lianxirenobj[i].moilephone.push(res.result[i].mobile5)
                  }
                }
              }
              this.dialogFormVisible = true
            }
          })
        }
      },
      tdlianxirenedit: function(val) {
        let parems = []
        parems.push(val.id)
        lianxireninfo(parems).then(res => {
          if (res.code == 200) {
            if (res.result == '') {

            } else {
              for (var i = 0; i < res.result.length; i++) {
                this.lianxirenobj[i] = {
                  name: res.result[i].name,
                  dept: res.result[i].dept,
                  position: res.result[i].position,
                  email: res.result[i].email,
                  gender: parseInt(res.result[i].gender),
                  phone: res.result[i].phone,
                  hobby: res.result[i].hobby,
                  id: '',
                  moilephone: [],
                  remark: res.result[i].remark
                }
                if (res.result[i].mobile1 == '') {

                } else {
                  this.lianxirenobj[i].moilephone.push(res.result[i].mobile1)
                }
                if (res.result[i].mobile2 == '') {

                } else {
                  this.lianxirenobj[i].moilephone.push(res.result[i].mobile2)
                }
                if (res.result[i].mobile3 == '') {

                } else {
                  this.lianxirenobj[i].moilephone.push(res.result[i].mobile3)
                }
                if (res.result[i].mobile4 == '') {

                } else {
                  this.lianxirenobj[i].moilephone.push(res.result[i].mobile4)
                }
                if (res.result[i].mobile5 == '') {

                } else {
                  this.lianxirenobj[i].moilephone.push(res.result[i].mobile5)
                }
              }
            }
            this.dialogFormVisible = true
          }
        })
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
        if (val.prop == 'name') {
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
      tableclick: function(row, column, cell, event) {
        if (column.property == "contactNumbers") {
          //if(row.contactNumbers=='0'){

          //}else{
          this.tdlianxireninfo(row.id)
          this.dialogTableVisible = true
          //}
        }
      },
      //列表联系人查看
      tdlianxireninfo: function(val) {
        var parems = val;
        var _this = this
        lianxireninfo(parems).then(res => {
          if (res.code == 200) {
            if (res.result == '') {

            } else {
              _this.lianxirendata = res.result
            }
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
      nameselectblur: function(Event) {
        let val = Event.target.value;
        this.productname = val
      },
      diasys: function() {
        var lianxiren = this.lianxirenobj
        for (var i = 0; i < lianxiren.length; i++) {
          if (lianxiren[i].name == '') {
            this.$confirm('请输入联系人姓名！', '', {
              showConfirmButton: false,
              cancelButtonText: '确定',
              type: 'warning'
            }).catch(() => {})
            return
          }
          if (lianxiren[i].dept == '') {
            this.$confirm('请输入联系人部门！', '', {
              showConfirmButton: false,
              cancelButtonText: '确定',
              type: 'warning'
            }).catch(() => {})
            return
          }
          if (lianxiren[i].position == '') {
            this.$confirm('请输入联系人职位！', '', {
              showConfirmButton: false,
              cancelButtonText: '确定',
              type: 'warning'
            }).catch(() => {})
            return
          }
          if (lianxiren[i].email == '') {
            this.$confirm('请输入联系人邮箱！', '', {
              showConfirmButton: false,
              cancelButtonText: '确定',
              type: 'warning'
            }).catch(() => {})
            return
          } else {
            var emailreg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (emailreg.test(lianxiren[i].email)) {

            } else {
              this.$confirm('请输入正确的联系人邮箱！', '', {
                showConfirmButton: false,
                cancelButtonText: '确定',
                type: 'warning'
              }).catch(() => {})
              return
            }
          }
          if (lianxiren[i].hobby == '') {
            this.$confirm('请输入联系人兴趣爱好！', '', {
              showConfirmButton: false,
              cancelButtonText: '确定',
              type: 'warning'
            }).catch(() => {})
            return
          }
          lianxiren[i].mobile1 = ''
          lianxiren[i].mobile2 = ''
          lianxiren[i].mobile3 = ''
          lianxiren[i].mobile4 = ''
          lianxiren[i].mobile5 = ''
          var phonereg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
          for (var j = 0; j < lianxiren[i].moilephone.length; j++) {
            if (lianxiren[i].moilephone[j] == '') {
              this.$confirm('请输入联系人手机号码！', '', {
                showConfirmButton: false,
                cancelButtonText: '确定',
                type: 'warning'
              }).catch(() => {})
              return
            } else {
              if (phonereg.test(lianxiren[i].moilephone[j])) {

              } else {
                this.$confirm('请输入正确的联系人手机号码！', '', {
                  showConfirmButton: false,
                  cancelButtonText: '确定',
                  type: 'warning'
                }).catch(() => {})
                return
              }
            }
            if (j == 0) {
              lianxiren[i].mobile1 = lianxiren[i].moilephone[j]
            }
            if (j == 1) {
              lianxiren[i].mobile2 = lianxiren[i].moilephone[j]
            }
            if (j == 2) {
              lianxiren[i].mobile3 = lianxiren[i].moilephone[j]
            }
            if (j == 3) {
              lianxiren[i].mobile4 = lianxiren[i].moilephone[j]
            }
            if (j == 4) {
              lianxiren[i].mobile5 = lianxiren[i].moilephone[j]
            }
          }
          lianxiren[i].issuerId = this.selectedarr[0].id
        }
        lianxirenedit(lianxiren).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '编辑成功',
              type: 'success',
              center: true,
              time: 0
            });
            this.dialogFormVisible = false
            this.refshtable()
          }
        })
      },
      closedialog: function() {
        this.lianxirenobj = [{
          name: '',
          dept: '',
          position: '',
          email: '',
          gender: '',
          phone: '',
          hobby: '',
          id: '',
          moilephone: [''],
          remark: ''
        }]
      },
      //添加联系人
      addlianxiren: function() {
        if (this.lianxirenobj.length < 20) {
          this.lianxirenobj.push({
            name: '',
            dept: '',
            position: '',
            email: '',
            gender: '',
            phone: '',
            hobby: '',
            id: '',
            moilephone: [''],
            remark: ''
          })
        }
      },
      //删除联系人
      dellianxiren: function(val) {
        this.lianxirenobj.splice(val, 1);
      },
      //增加手机
      addphone: function(val) {
        val.moilephone.push('')
        this.lianxirenobj.sort()
      },
      //删除手机
      delphone: function(val, val1) {
        val.moilephone.splice(val1, 1);
        this.lianxirenobj.sort()
      },
      sexchange: function() {
        this.$forceUpdate()
      },
      closetabledialog: function() {
        this.lianxirendata = []
      }
    },
    watch: {
      'mainmsg': function(newVal, oldVal) {
        if (newVal != oldVal) {
          this.changemainmsg = true
        }
      },
      'title': function(newVal, oldVal) {
        this.titlelength = newVal.length + '/20'
      },
      'price': function(newVal, oldVal) {
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
          elem: '#mechtime',
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
    },
    beforeRouteLeave(to, from, next) {
      if (to.name == 'addmechanism') {
        this.$store.commit('setKeepAlive', ['mechanism']); //这是此页面的name属性名字
      } else {
        this.$store.commit('setKeepAlive', []);
      }
      next();
    }
  }
</script>

<style>
  .dialogWidth998 {
    width: 998px;
  }

  .lianxirendivfather {
    max-height: 492px;
    overflow: hidden auto;
    margin: 0px -20px;
  }

  .lianxirendiv {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 948px;
    min-height: 170px;
    background-color: #fafafa;
    border: solid 1px #eeeeee;
    padding: 15px;
    margin-bottom: 20px;
    margin-left: 20px;
    position: relative;
  }

  .lianxirendiv:last-child {
    margin-bottom: 0;
  }

  .lianxirenremark {
    width: 100%;
  }

  .lianxirendiv2 {
    display: flex;
    justify-content: flex-start;
    position: relative;
  }

  .lianxirensvg {
    /* position: absolute;
    right: -35px;
    width: 44px; */
    display: flex;
    justify-content: flex-start;
    line-height: 30px;
    margin-right: 11px;
  }

  .lianxirensvg>span {
    margin-left: 4px;
    cursor: pointer;
  }

  .lianxirenspan {
    width: 62px;
    text-align: left;
    line-height: 30px;
    color: #6f6f77;
    font-size: 12px;
  }

  .lianxirenspanred:before {
    content: '*';
    color: red;
  }

  .lianxireninput {
    width: 150px;
    height: 30px;
    border: 1px solid #dddddd;
    padding-left: 10px;
    margin-right: 11px;
    margin-bottom: 10px;
    color: #1b1b2a;
    font-size: 12px;
  }

  .lianxireninput2 {
    width: 150px;
    height: 30px;
    border: 1px solid #dddddd;
    padding-left: 10px;
    margin-bottom: 10px;
    color: #1b1b2a;
    font-size: 12px;
  }

  .lianxirentextarea {
    width: 596px;
    height: 60px;
    border: 1px solid #dddddd;
    padding: 10px;
    font-size: 12px;
    resize: none;
  }

  .lianxirenadd {
    width: 100px;
    height: 30px;
    border-radius: 2px;
    border: solid 1px #0099ff;
    font-size: 12px;
    color: #0099ff;
    text-align: center;
    cursor: pointer;
    padding-left: 7px;
    margin-top: 10px;
  }

  .lianxirenadd:before {
    content: '+';
    font-size: 20px;
    position: relative;
    top: 2px;
    right: 6px;
  }

  .lianxirendel {
    position: absolute;
    right: -20px;
    top: 0;
    cursor: pointer;
  }

  .dialogtableWidth1100 {
    width: 1100px;
  }
</style>
