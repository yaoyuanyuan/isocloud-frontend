<template>
  <div class="appmain-bg layui-form">
    <div class="adn-header">
      <div class="adnh-logo">
        <svg-icon icon-class="Icon-Mechanism"></svg-icon>
      </div>
      <h3 class="adnh-title">{{isedit?'编辑':'新增'}}机构</h3>
      <div class="adnh-right">
        <el-form>
          <el-button type="primary" style="width:58px;" @click="save">保存</el-button>
        </el-form>
        <div class="adnh-icon" @click="routersreturn()" style="margin-left: 0px;" title="返回">
          <svg-icon icon-class="Icon-return"></svg-icon>
        </div>
        <div class="adnh-icon" @click="reset()" title="重置">
          <svg-icon icon-class="Icon-Reset"></svg-icon>
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 31px;border-top: 1px solid #e8e8ed;margin-top: 10px;"></div>
    <div class="addmech-content">
      <div class="addtitle">基本信息</div>
      <div class="addmech-div">
        <div class="addmech-div-left">
          <div class="layui-inline mb20">
            <label class="layui-form-label adnhlabel">机构名称：</label>
            <div class="layui-input-inline">
              <input type="text" autocomplete="off" class="layui-input" style="width:400px" placeholder="营业执照上的全称"
                v-model="name" @blur="panduanname()" maxlength="50">
            </div>
          </div>
          <div class="layui-inline mb20">
            <label class="layui-form-label adnhlabel">统一社会信用代码：</label>
            <div class="layui-input-inline">
              <input type="text" autocomplete="off" class="layui-input" style="width:352px" v-model="socialCreditCode"
                maxlength="20" @blur="panduancode()">
            </div>
          </div>
          <div class="layui-inline mb20">
            <label class="layui-form-label adnhlabel">所属地区：</label>
            <div class="layui-input-inline" style="width: 200px;margin-top: -15px;">
              <pl @func="simpleSearch1" :clear="clear" :info="info"></pl>
            </div>
          </div>
          <div class="layui-inline mb20">
            <label class="layui-form-label adnhlabel">成立日期：</label>
            <div class="layui-input-inline timeicon">
              <input type="text" autocomplete="off" class="layui-input" style="width:200px" id="addmechtime">
            </div>
          </div>
          <div class="layui-inline" v-show="type==1">
            <label class="layui-form-label adnhlabel">服务范围：</label>
            <div class="layui-input-inline" style="font-size: 14px;line-height: 30px;cursor: pointer;color: #9498a5;"
              @click="dialogFormVisible = true">
              <svg-icon icon-class="Icon-bianji"></svg-icon>
            </div>
          </div>
        </div>
        <div class="addmech-div-right">
          <div class="layui-inline mb20">
            <label class="layui-form-label adnhlabel">机构类型：</label>
            <div class="layui-input-inline">
              <select name="mechlei" lay-filter="mechlei">
                <option value="0">请选择...</option>
                <option value="1">认证机构</option>
                <option value="2">咨询机构</option>
                <option value="3">培训机构</option>
                <option value="4">培训机构</option>
              </select>
            </div>
          </div>
          <div class="layui-inline mb20">
            <label class="layui-form-label adnhlabel">注册资本：</label>
            <div class="layui-input-inline" style="display: flex;justify-content: flex-start;">
              <input type="text" autocomplete="off" class="layui-input" style="width:140px" v-model="registeredCapital"
                placeholder="最多2位小数">
              <span class="moneyspan">万</span>
              <div style="width: 100px;margin-left: 10px;">
                <select name="money" lay-filter="money">
                  <option value="0">人名币</option>
                  <option value="1">美元</option>
                  <option value="2">港币</option>
                </select>
              </div>
            </div>
          </div>
          <div class="layui-inline mb20">
            <label class="layui-form-label adnhlabel">机构性质：</label>
            <div class="layui-input-inline" style="width: 200px;">
              <select name="mechxing" lay-filter="mechxing">
                <option value="0">请选择...</option>
                <option value="1">有限责任公司</option>
                <option value="2">股份有限公司</option>
                <option value="3">国有企业</option>
                <option value="4">央企</option>
                <option value="5">外商投资企业</option>
                <option value="6">个人独资企业</option>
                <option value="7">个体工商户</option>
                <option value="8">联营企业</option>
                <option value="9">集体所有制</option>
                <option value="10">有限合伙</option>
                <option value="11">普通合伙</option>
                <option value="12">事业单位</option>
                <option value="13">公共机构</option>
                <option value="14">社会组织</option>
                <option value="15">民办非企业</option>
              </select>
            </div>
          </div>
          <div class="layui-inline">
            <label class="layui-form-label adnhlabel">业务范围：</label>
            <div class="layui-input-inline">
              <input type="text" autocomplete="off" class="layui-input" style="width:400px" v-model="businessScope">
            </div>
          </div>
        </div>
      </div>
      <div class="addtitle">机构联系人设置</div>
      <div class="addmech-div" style="display: flex;flex-direction: column;">
        <div v-for="(item,index) in lianxirenobj" :key="index" class="addmech-lianxirendiv">
          <div class="addmech-lianxirendiv2"><span class="addmech-lianxirenspan addmech-lianxirenspanred">姓名:</span><input
              type="text" autocomplete="off" placeholder="" class="addmech-lianxireninput" v-model="item.name"></div>
          <div class="addmech-lianxirendiv2"><span class="addmech-lianxirenspan addmech-lianxirenspanred">部门:</span><input
              type="text" autocomplete="off" placeholder="" class="addmech-lianxireninput" v-model="item.dept"></div>
          <div class="addmech-lianxirendiv2"><span class="addmech-lianxirenspan addmech-lianxirenspanred">职位:</span><input
              type="text" autocomplete="off" placeholder="" class="addmech-lianxireninput" v-model="item.position"></div>
          <div class="addmech-lianxirendiv2"><span class="addmech-lianxirenspan addmech-lianxirenspanred">邮箱:</span><input
              type="text" autocomplete="off" placeholder="" class="addmech-lianxireninput" v-model="item.email" style="margin-right: 0px;"></div>
          <div class="addmech-lianxirendiv2"><span class="addmech-lianxirenspan">性别:</span>
            <div style="width: 190px;margin-right: 20px;">
              <el-select v-model="item.gender" placeholder="请选择" @change="sexchange()">
                <el-option v-for="(sexstr,index2) in sex" :label="sexstr.label" :value="sexstr.value" :key="index2"></el-option>
              </el-select>
            </div>
          </div>
          <div class="addmech-lianxirendiv2"><span class="addmech-lianxirenspan">座机号码:</span><input type="text"
              autocomplete="off" placeholder="" class="addmech-lianxireninput3" v-model="item.phone"></div>
          <div class="addmech-lianxirendiv2"><span class="addmech-lianxirenspan addmech-lianxirenspanred">兴趣爱好:</span><input
              type="text" autocomplete="off" placeholder="" class="addmech-lianxireninput4" v-model="item.hobby"></div>
          <div class="addmech-lianxirendiv2"><span class="addmech-lianxirenspan addmech-lianxirenspanred">服务区域:</span><input
              type="text" autocomplete="off" placeholder="" class="addmech-lianxireninput5" v-model="item.serviceArea"></div>
          <div class="addmech-lianxirendiv2" v-for="(phonelist,index1) in item.moilephone" :key="index1"><span class="addmech-lianxirenspan addmech-lianxirenspanred">手机号码:</span><input
              type="text" autocomplete="off" placeholder="" class="addmech-lianxireninput2" v-model="item.moilephone[index1]">
            <div class="addmech-lianxirensvg"><span v-if="item.moilephone.length<5&&index1==(item.moilephone.length-1)"
                @click="addphone(item)">
                <svg-icon icon-class="Icon-lianxirenadd"></svg-icon>
              </span><span v-if="item.moilephone.length>1" @click="delphone(item,index1)">
                <svg-icon icon-class="Icon-lianxirenlower"></svg-icon>
              </span></div>
          </div>
          <div class="addmech-lianxirendiv2 addmech-lianxirenremark"><span class="addmech-lianxirenspan">备注:</span><textarea
              type="text" autocomplete="off" placeholder="" class="addmech-lianxirentextarea" v-model="item.remark"></textarea></div>
          <span class="addmech-lianxirendel" @click="dellianxiren(index)">
            <svg-icon icon-class="lianxirendelete"></svg-icon>
          </span>
        </div>
        <div class="addmech-lianxirenadd" @click="addlianxiren()">添加联系人</div>
      </div>
    </div>
    <el-dialog title="服务范围设置" :visible.sync="dialogFormVisible" center append-to-body v-if='dialogFormVisible'
      custom-class="dialogWidth790">
      <div class="fuwulist-father">
        <div class="fuwulist-header"><span class="fuwulist-header-zuo">体系类别</span><span class="fuwulist-header-you">认证领域</span></div>
        <div class="fuwulist-div">
          <div class="fuwulist-zuo">
            <el-checkbox label="一般服务认证" v-model="zuolist1" @change="changzuolist(1)"></el-checkbox>
            <el-checkbox label="产品认证" v-model="zuolist2" @change="changzuolist(2)"></el-checkbox>
            <el-checkbox label="国家推行的服务认证" v-model="zuolist3" @change="changzuolist(3)"></el-checkbox>
            <el-checkbox label="检验机构认可" v-model="zuolist4" @change="changzuolist(4)"></el-checkbox>
            <el-checkbox label="管理体系认证" v-model="zuolist5" @change="changzuolist(5)"></el-checkbox>
            <el-checkbox label="计量认证" v-model="zuolist6" @change="changzuolist(6)"></el-checkbox>
            <el-checkbox label="认证机构认可" v-model="zuolist7" @change="changzuolist(7)"></el-checkbox>
          </div>
          <div class="fuwulist-you divscrollbar">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkgenerallist" v-show="youlist1" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in generallist" :label="item.certField" :key="item.id"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="checkproductlist" v-show="youlist2" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in productlist" :label="item.certField" :key="item.id"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="checkstate_impllist" v-show="youlist3" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in state_impllist" :label="item.certField" :key="item.id"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="checkcheck_industrylist" v-show="youlist4" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in check_industrylist" :label="item.certField" :key="item.id"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="checkmanage_syslist" v-show="youlist5" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in manage_syslist" :label="item.certField" :key="item.id"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="checkmeteringlist" v-show="youlist6" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in meteringlist" :label="item.certField" :key="item.id"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="checkauth_industrylist" v-show="youlist7" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in auth_industrylist" :label="item.certField" :key="item.id"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="diasys()" style="margin-right: 12px;">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {
    provinceList,
    scope,
    xinzengissuer,
    addrepeat,
    editrepeat,
    getjigou
  } from '@/api/mechanism'
  import pl from '@/components/province'
  export default {
    inject: ['reload'],
    data() {
      return {
        id: '',
        info: '',
        clear: '0',
        pro: '',
        isedit: false,
        name: '',
        type: '',
        socialCreditCode: '',
        registeredCapital: '',
        registeredCapitalType: '',
        registeredAddress: '',
        establishmentDate: '',
        businessScope: '',
        serviceScope: '',
        contactNumbers: '',
        dataSource: '',
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
          remark: '',
          serviceArea: ''
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
        dialogFormVisible: false,
        //服务范围设置
        zuolist1: false,
        zuolist2: false,
        zuolist3: false,
        zuolist4: false,
        zuolist5: false,
        zuolist6: false,
        zuolist7: false,
        youlist1: true,
        youlist2: false,
        youlist3: false,
        youlist4: false,
        youlist5: false,
        youlist6: false,
        youlist7: false,
        generallist: [],
        productlist: [],
        state_impllist: [],
        check_industrylist: [],
        manage_syslist: [],
        meteringlist: [],
        auth_industrylist: [],
        checkAll: false,
        isIndeterminate: false,
        checkgenerallist: [],
        checkproductlist: [],
        checkstate_impllist: [],
        checkcheck_industrylist: [],
        checkmanage_syslist: [],
        checkmeteringlist: [],
        checkauth_industrylist: [],
      }
    },
    components: {
      pl
    },
    created() {
      if (this.$route.query.id) {
        this.isedit = true
        var id = {
          id: this.$route.query.id[0]
        }
        this.id = this.$route.query.id[0]
        this.getinfo(id)
      }
      this.provinceobj()
      this.wufufanwei()
    },
    updated: function() {
      layui.use(['form'], function() {
        var form = layui.form;
        form.render('select');
      })
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
      wufufanwei: function() {
        var _this = this
        scope().then(res => {
          if (res.code == 200) {
            _this.generallist = res.result['一般服务认证'].fieldInfo
            _this.productlist = res.result['产品认证'].fieldInfo
            _this.state_impllist = res.result['国家推行的服务认证'].fieldInfo
            _this.check_industrylist = res.result['检验机构认可'].fieldInfo
            _this.manage_syslist = res.result['管理体系认证'].fieldInfo
            _this.meteringlist = res.result['计量认证'].fieldInfo
            _this.auth_industrylist = res.result['认证机构认可'].fieldInfo
          }
        })
      },
      handleCheckAllChange: function(val) {
        var _this = this
        var val = this.checkAll
        var generallistarr = []
        var productlistarr = []
        var state_impllistarr = []
        var check_industrylistarr = []
        var manage_syslistarr = []
        var meteringlistarr = []
        var auth_industrylistarr = []
        for (var q = 0; q < _this.generallist.length; q++) {
          generallistarr.push(_this.generallist[q].certField)
        }
        for (var w = 0; w < _this.productlist.length; w++) {
          productlistarr.push(_this.productlist[w].certField)
        }
        for (var e = 0; e < _this.state_impllist.length; e++) {
          state_impllistarr.push(_this.state_impllist[e].certField)
        }
        for (var r = 0; r < _this.check_industrylist.length; r++) {
          check_industrylistarr.push(_this.check_industrylist[r].certField)
        }
        for (var t = 0; t < _this.manage_syslist.length; t++) {
          manage_syslistarr.push(_this.manage_syslist[t].certField)
        }
        for (var y = 0; y < _this.meteringlist.length; y++) {
          meteringlistarr.push(_this.meteringlist[y].certField)
        }
        for (var u = 0; u < _this.auth_industrylist.length; u++) {
          auth_industrylistarr.push(_this.auth_industrylist[u].certField)
        }
        if (this.youlist1) {
          this.checkgenerallist = val ? generallistarr : [];
        } else if (this.youlist2) {
          this.checkproductlist = val ? productlistarr : [];
        } else if (this.youlist3) {
          this.checkstate_impllist = val ? state_impllistarr : [];
        } else if (this.youlist4) {
          this.checkcheck_industrylist = val ? check_industrylistarr : [];
        } else if (this.youlist5) {
          this.checkmanage_syslist = val ? manage_syslist : [];
        } else if (this.youlist6) {
          this.checkmeteringlist = val ? meteringlist : [];
        } else if (this.youlist7) {
          this.checkauth_industrylist = val ? auth_industrylist : [];
        }
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange: function(value) {
        this.checkAll = false;
        this.isIndeterminate = false
        let checkedCount = value.length;
        if (this.youlist1) {
          this.checkAll = checkedCount === this.generallist.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.generallist.length;
        } else if (this.youlist2) {
          this.checkAll = checkedCount === this.productlist.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.productlist.length;
        } else if (this.youlist3) {
          this.checkAll = checkedCount === this.state_impllist.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.state_impllist.length;
        } else if (this.youlist4) {
          this.checkAll = checkedCount === this.check_industrylist.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.check_industrylist.length;
        } else if (this.youlist5) {
          this.checkAll = checkedCount === this.manage_syslist.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.manage_syslist.length;
        } else if (this.youlist6) {
          this.checkAll = checkedCount === this.meteringlist.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.meteringlist.length;
        } else if (this.youlist7) {
          this.checkAll = checkedCount === this.auth_industrylist.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.auth_industrylist.length;
        }
      },
      changzuolist:function(val){
        this.checkAll = true
        if(val==1){
           if(this.zuolist1){
              this.youlist1 = true
              this.youlist2 = false
              this.youlist3 = false
              this.youlist4 = false
              this.youlist5 = false
              this.youlist6 = false
              this.youlist7 = false
              this.handleCheckAllChange()
           }
        }else if(val==2){

        }else if(val==3){

        }else if(val==4){

        }else if(val==5){

        }else if(val==6){

        }else if(val==7){

        }
      },
      simpleSearch1: function(data) {
        this.pro = data
        this.clear = '0'
      },
      panduanname: function() {
        var _this = this
        if (_this.name == '') {

        } else {
          if (_this.name.length > 2) {
            this.$confirm('该机构名称太短', '', {
              showConfirmButton: false,
              cancelButtonText: '确定',
              type: 'warning'
            }).catch(() => {
              _this.name = ''
            })
            return
          }
          var parems = {}
          if (this.isedit) {
            parems.id = this.id
            parems.name = this.name
            editrepeat(parems).then(res => {
              if (res.code == 200) {
                if (res.result) {
                  this.$confirm('该机构名称已存在', '', {
                    showConfirmButton: false,
                    cancelButtonText: '确定',
                    type: 'warning'
                  }).catch(() => {
                    _this.name = ''
                  })
                }
              }
            })
          } else {
            parems.name = this.name
            addrepeat(parems).then(res => {
              if (res.code == 200) {
                if (res.result) {
                  this.$confirm('该机构名称已存在', '', {
                    showConfirmButton: false,
                    cancelButtonText: '确定',
                    type: 'warning'
                  }).catch(() => {
                    _this.name = ''
                  })
                }
              }
            })
          }
        }
      },
      panduancode: function() {
        var codereg = /^[A-Za-z0-9]+$/
        if (codereg.test(this.socialCreditCode) && this.socialCreditCode.length > 16) {

        } else {
          this.$confirm('统一社会信用代码错误', '', {
            showConfirmButton: false,
            cancelButtonText: '确定',
            type: 'warning'
          }).catch(() => {
            _this.name = ''
          })
        }
      },
      //返回上一页
      routersreturn: function() {
        this.$confirm('是否放弃本次' + (this.isedit ? '编辑' : '新增') + '操作？', '', {
          showConfirmButton: false,
          distinguishCancelAndClose: true,
          cancelButtonText: '确定',
          type: 'warning'
        }).catch(action => {
          if (action === 'cancel') {
            this.$router.go(-1);
          }
        })
      },
      //重置
      reset: function() {
        this.title = ''
        this.$refs.ue.setUEContent('')
        $('#sreach1').siblings("div.layui-form-select").find('dl').find('dd[lay-value=0]').click();
      },
      //保存
      save: function() {

        let parems = {}
        if (this.isedit) {
          let id = this.$route.query.id[0]
          parems.id = id;
          parems.content = this.$refs.ue.getUEContent();
          parems.title = this.title;
          parems.expireType = this.changestates
          parems.startTime = this.startTime
          parems.expireTime = this.expireTime
          upNotice(parems).then(res => {
            if (res.code == 200) {
              this.$router.push({
                path: 'notice'
              });
              this.$message({
                message: '编辑成功',
                type: 'success',
                center: true
              });
              this.reload()
            } else {
              this.$confirm('公告编辑失败，请重新尝试！', '', {
                showConfirmButton: false,
                cancelButtonText: '确定',
                type: 'warning'
              }).catch(() => {

              })
            }
          })
        } else {
          parems.id = null;
          parems.content = this.$refs.ue.getUEContent();
          parems.title = this.title;
          parems.expireType = this.changestates
          parems.startTime = this.startTime
          parems.expireTime = this.expireTime
          addNotice(parems).then(res => {
            if (res.code == 200) {
              this.$router.push({
                path: 'notice'
              });
              this.$message({
                message: '新增成功',
                type: 'success',
                center: true
              });
              this.reload()
            } else {
              this.$confirm('新增失败，请重新尝试！', '', {
                showConfirmButton: false,
                cancelButtonText: '确定',
                type: 'warning'
              }).catch(() => {

              })
            }
          })
        }

      },
      //查询
      getinfo: function(val) {
        let _this = this
        getjigou(val).then(res => {
          if (res.code == 200) {
            _this.title = res.result.title;
            _this.$refs.ue.setUEContent(res.result.content);
            _this.changestates = res.result.expireType;
            _this.startTime = res.result.startTime;
            _this.expireTime = res.result.expireTime;
            $('#time3').val(_this.startTime.substring(0, 10) + ' - ' + _this.expireTime.substring(0, 10))
            $('#sreach1').siblings("div.layui-form-select").find('dl').find('dd[lay-value=' + res.result.expireType +
                ']')
              .click();
          }
        })
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
    },
    watch: {
      'registeredCapital': function(newVal, oldVal) {
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
            this.registeredCapital = this.registeredCapital.substring(0, this.registeredCapital.toString().indexOf(
              '.') + 3)
          }
        } else {
          this.registeredCapital = ''
        }
      }
    },
    mounted() {
      let _this = this;
      layui.use(['form', 'laydate'], function() {
        var form = layui.form;
        var laydate = layui.laydate;
        laydate.render({
          elem: '#addmechtime',
          done: function(value, date) {
            if (value) {
              _this.establishmentDate = value
            } else {
              _this.establishmentDate = ''
            }
          }
        });
        form.render('select');
        form.on('select(mechlei)', function(data) {
          _this.type = data.value;
        })
        form.on('select(money)', function(data) {
          _this.registeredCapitalType = data.value;
        })
        form.on('select(mechxing)', function(data) {
          _this.serviceScope = data.value;
        })
      })
    },
    beforeRouteLeave(to, from, next) {
      if (to.name != 'mechanism') {
        if (to.meta.keepAlive) {
          to.meta.keepAlive = false;
        }
      }
      next();
    }
  }
</script>

<style>
  .addmech-content {
    margin: 0 15px;
  }

  .addmech-div {
    display: flex;
    justify-content: flex-start;
    padding: 28px 0 40px 28px;
  }

  .addmech-div-left {
    display: flex;
    flex-direction: column;
  }

  .addmech-div-right {
    display: flex;
    flex-direction: column;
    margin-left: 40px;
  }

  .moneyspan {
    position: absolute;
    line-height: 30px;
    color: #6f6f77;
    left: 120px;
  }

  .addmech-lianxirendiv {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 1016px;
    min-height: 170px;
    background-color: #fafafa;
    border: solid 1px #eeeeee;
    padding: 20px 20px 40px 20px;
    margin-bottom: 20px;
    position: relative;
  }

  .addmech-lianxirendiv:last-child {
    margin-bottom: 0;
  }

  .addmech-lianxirenremark {
    width: 100%;
  }

  .addmech-lianxirendiv2 {
    display: flex;
    justify-content: flex-start;
    position: relative;
  }

  .addmech-lianxirensvg {
    /* position: absolute;
    right: -35px;
    width: 44px; */
    display: flex;
    justify-content: flex-start;
    line-height: 30px;
    margin-right: 20px;
    font-size: 18px;
  }

  .addmech-lianxirensvg>span {
    margin-left: 4px;
    cursor: pointer;
  }

  .addmech-lianxirenspan {
    margin-right: 8px;
    line-height: 30px;
    color: #6f6f77;
    font-size: 12px;
  }

  .addmech-lianxirenspanred:before {
    content: '*';
    color: red;
  }

  .addmech-lianxireninput {
    width: 185px;
    height: 30px;
    border: 1px solid #dddddd;
    padding-left: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    color: #1b1b2a;
    font-size: 12px;
  }

  .addmech-lianxireninput2 {
    width: 133px;
    height: 30px;
    border: 1px solid #dddddd;
    padding-left: 10px;
    margin-bottom: 20px;
    color: #1b1b2a;
    font-size: 12px;
  }

  .addmech-lianxireninput3 {
    width: 165px;
    height: 30px;
    border: 1px solid #dddddd;
    padding-left: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    color: #1b1b2a;
    font-size: 12px;
  }

  .addmech-lianxireninput4 {
    width: 406px;
    height: 30px;
    border: 1px solid #dddddd;
    padding-left: 10px;
    margin-bottom: 20px;
    color: #1b1b2a;
    font-size: 12px;
  }

  .addmech-lianxireninput5 {
    width: 406px;
    height: 30px;
    border: 1px solid #dddddd;
    padding-left: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    color: #1b1b2a;
    font-size: 12px;
  }

  .addmech-lianxirentextarea {
    width: 926px;
    height: 80px;
    border: 1px solid #dddddd;
    padding: 10px;
    font-size: 12px;
    resize: none;
  }

  .addmech-lianxirenadd {
    width: 100px;
    height: 30px;
    border-radius: 2px;
    border: solid 1px #0099ff;
    font-size: 12px;
    color: #0099ff;
    text-align: center;
    cursor: pointer;
    padding-left: 7px;
  }

  .addmech-lianxirenadd:before {
    content: '+';
    font-size: 20px;
    position: relative;
    top: 2px;
    right: 6px;
  }

  .addmech-lianxirendel {
    position: absolute;
    right: -20px;
    top: 0;
    cursor: pointer;
  }

  .dialogWidth790 {
    width: 790px;
  }

  .fuwulist-div {
    display: flex;
    justify-content: flex-start;
    border: solid 1px #e8e8ed;
  }

  .fuwulist-zuo {
    display: flex;
    flex-direction: column;
    width: 196px;
    border-right: 1px solid #e8e8ed;
    line-height: 40px;
  }

  .fuwulist-zuo>label {
    padding-left: 20px;
  }

  .fuwulist-zuo>label:hover {
    background: #f6f7fb;
  }

  .fuwulist-you {
    width: 552px;
    max-height: 280px;
    padding: 6px 0 0 20px;
    line-height: 30px;
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .fuwulist-you .el-checkbox-group {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }

  .fuwulist-header-you {
    display: flex;
    flex-direction: column;
    width: 552px;
  }

  .fuwulist-header {
    width: 750px;
    height: 40px;
    line-height: 40px;
    background-color: #f6f7fb;
    border: solid 1px #e8e8ed;
    border-bottom: none;
    text-align: center;
    display: flex;
    justify-content: flex-start;
  }

  .fuwulist-header-zuo {
    display: block;
    width: 197px;
    border-right: 1px solid #e8e8ed;
  }

  .fuwulist-header-you {
    display: block;
    width: 552px;
  }
</style>
