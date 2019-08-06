<template>
  <div class="appmain-bg layui-form">
    <div class="adn-header">
      <div class="adnh-logo">
        <svg-icon icon-class="Icon-Adplacement"></svg-icon>
      </div>
      <h3 class="adnh-title">{{isedit?'编辑':'新增'}}广告</h3>
      <div class="adnh-right">
        <el-form>
          <el-button type="primary" style="width:58px;" @click="save">发布</el-button>
        </el-form>
        <div class="adnh-icon" @click="routersreturn()" style="margin-left: 0px;">
          <svg-icon icon-class="Icon-return"></svg-icon>
        </div>
        <div class="adnh-icon" @click="reset()">
          <svg-icon icon-class="Icon-Reset"></svg-icon>
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 31px;border-top: 1px solid #e8e8ed;margin-top: 10px;"></div>
    <div class="addad-content">
      <div class="addtitle">基本信息设置</div>
      <div class="addadml26">
        <div class="layui-form-item addadmb20">
          <label class="layui-form-label adnh-w75">广告标题：</label>
          <div class="layui-input-block">
            <input type="text" name="title" placeholder="请输入标题" autocomplete="off" class="layui-input" style="width: 780px;padding-right: 40px;"
              v-model="title" maxlength="60" @focus="titleerror=false;$refs.title.style.borderColor='#e6e6e6'" ref="title">
            <span class="addadtitlelength">{{titlelength}}</span>
          </div>
        </div>
        <div class="error" v-if="titleerror">广告标题为空</div>
        <div class="layui-form-item addadmb20">
          <label class="layui-form-label adnh-w75">广告类型：</label>
          <div class="layui-input-block" style="width: 120px;float: left;">
            <select name="time" lay-filter="addad1" id="addad1">
              <option value="" selected="">请选择...</option>
              <option value="0">登录页轮播广告</option>
              <option value="1">首页轮播广告</option>
            </select>
          </div>
        </div>
        <div class="error" v-if="addad1error">请选择广告类型</div>
        <div class="layui-form-item">
          <label class="layui-form-label adnh-w75">上传图片：</label>
          <div class="addad-showimg" v-if="fileurl"><img :src="fileurl" @dblclick="handlePictureCardPreview"><span
              class="addad-close" @click="closeimg">X</span></div>
          <el-upload action="#" list-type="picture-card" :multiple="false" :auto-upload="true" :show-file-list="false"
            :http-request="imgupload" v-show="isshangchuan">
            <i slot="default" class="el-icon-plus">点击上传图片</i>
            <div slot="tip" class="el-upload__tip">图片要求：格式BMP、JPEG、JPG、GIF、PNG；长宽尺寸450*120；大小不超过2M；</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div class="error" v-if="imgerror">请上传广告图片</div>
        <div class="layui-form-item addadmb20">
          <label class="layui-form-label adnh-w75">链接跳转：</label>
          <div class="layui-input-block" style="width: 120px;float: left;">
            <select name="time" lay-filter="addad2" id="addad2">
              <option value="" selected="">请选择...</option>
              <option value="0">原页面打开</option>
              <option value="1">新窗口打开</option>
            </select>
          </div>
          <div class="layui-input-block" style="width: 120px;float: left;margin-left: 10px;">
            <select name="time" lay-filter="addad3" id="addad3">
              <option value="" selected="">请选择...</option>
              <option value="0">内部链接</option>
              <option value="1">外部链接</option>
            </select>
          </div>
          <input type="text" name="url" placeholder="" autocomplete="off" class="layui-input" style="width: 520px;padding-right: 40px;margin-left: 10px;float: left;"
            v-model="url">
        </div>
      </div>
      <div class="addtitle">广告投放设置</div>
      <div class="addadml26">
        <div class="layui-form-item">
          <label class="layui-form-label adnh-w75">投放时间：</label>
          <div class="layui-input-block" style="width: 120px;float: left;">
            <select name="time" lay-filter="addad4" id="addad4">
              <option value="0" selected="">固定期</option>
              <option value="1">无限期</option>
            </select>
          </div>
          <div class="timeicon timediv" v-show="changestates==0?true:false">
            <input type="text" class="layui-input" id="time4" placeholder=" - " style="width: 200px;float: left;margin-left: 10px;"
              autocomplete="off" ref="time4" @focus="timeerror=false">
          </div>
        </div>
        <div class="error" v-if="timeerror">请设置展示时间</div>
        <div class="layui-form-item">
          <label class="layui-form-label adnh-w75">广告顺序：</label>
          <input type="text" name="sort" class="layui-input" placeholder="" style="width: 120px;" autocomplete="off"
            @focus="sorterror=false;sorterror1=false" v-model="addsort">
        </div>
        <div class="error" v-if="sorterror">请设置广告顺序</div>
        <div class="error" v-if="sorterror1">该数字位置已使用</div>
        <div class="layui-form-item">
          <label class="layui-form-label adnh-w75">广告状态：</label>
          <div class="layui-input-block" style="width: 120px;float: left;">
            <select name="time" lay-filter="addad5" id="addad5">
              <option value="1">上架</option>
              <option value="2" selected="">下架</option>
            </select>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    getad,
    imgupload,
    savead,
    updatead
  } from '@/api/advertisement'
  export default {
    inject: ['reload'],
    data() {
      return {
        isedit: false,
        title: '',
        changestates: 0,
        startTime: '',
        expireTime: '',
        titleerror: false,
        timeerror: false,
        sorterror: false,
        sorterror1: false,
        addad1error: false,
        imgerror: false,
        titlelength: '0/60',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        url: '',
        publishstatus: 2,
        type: '',
        linktype: '',
        linkopentype: '',
        addsort: '',
        fileurl: '',
        isshangchuan: true
      }
    },
    created() {
      if (this.$route.query.id) {
        this.isedit = true
        var id = {
          id: this.$route.query.id[0]
        }
        this.getinfo(id)
      }
    },
    updated: function() {
      layui.use(['form'], function() {
        var form = layui.form;
        form.render('select');
      })
    },
    methods: {
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
        this.url = ''
        this.addsort = ''
        this.fileurl = ''
        this.isshangchuan = true
        $('#time4').val('')
        $('#addad1').siblings("div.layui-form-select").find('dl').find('dd[lay-value=""]').click();
        $('#addad2').siblings("div.layui-form-select").find('dl').find('dd[lay-value=""]').click();
        $('#addad3').siblings("div.layui-form-select").find('dl').find('dd[lay-value=""]').click();
        $('#addad4').siblings("div.layui-form-select").find('dl').find('dd[lay-value=0]').click();
        $('#addad5').siblings("div.layui-form-select").find('dl').find('dd[lay-value=2]').click();
      },
      //保存
      save: function() {
        if (this.title == '') {
          this.titleerror = true
          this.$refs.title.style.borderColor = '#ff4912'
          return
        }
        if (this.type == '') {
          this.addad1error = true
          return
        }
        if (this.fileurl == '') {
          this.imgerror = true
          return
        }
        if (this.fileurl == '') {
          this.imgerror = true
          return
        }
        if (this.changestates != 1) {
          if (this.startTime == '') {
            this.timeerror = true
            return
          }
        }
        if (this.addsort == '') {
          this.sorterror = true
          return
        }
        let parems = {}
        if (this.isedit) {
          let id = this.$route.query.id[0]
          parems.id = id;
          parems.title = this.title;
          parems.imageUrl = this.fileurl;
          parems.expireType = this.changestates
          parems.type = this.type;
          parems.sort = this.addsort
          parems.linkUrl = this.url
          parems.linkType = this.linktype
          parems.linkOpenType = this.linkopentype
          parems.publishStatus = this.publishstatus
          parems.publishTime = this.startTime
          parems.expireTime = this.expireTime
          updatead(parems).then(res => {
            if (res.code == 200) {
              this.$router.push({
                path: 'advertisement'
              });
              this.$message({
                message: '编辑成功',
                type: 'success',
                center: true
              });
              this.reload()
            } else {
              this.$confirm('编辑失败，请重新尝试！', '', {
                showConfirmButton: false,
                cancelButtonText: '确定',
                type: 'warning'
              }).catch(() => {

              })
            }
          })
        } else {
          parems.id = null;
          parems.title = this.title;
          parems.imageUrl = this.fileurl;
          parems.type = this.type;
          parems.expireType = this.changestates
          parems.sort = this.addsort
          parems.linkUrl = this.url
          parems.linkType = this.linktype
          parems.linkOpenType = this.linkopentype
          parems.publishStatus = this.publishstatus
          parems.publishTime = this.startTime
          parems.expireTime = this.expireTime
          savead(parems).then(res => {
            if (res.code == 200) {
              this.$router.push({
                path: 'advertisement'
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
        getad(val).then(res => {
          if (res.code == 200) {
            _this.title = res.result.title;
            _this.changestates = res.result.expireType;
            _this.startTime = res.result.publishTime.substring(0, 10);
            _this.expireTime = res.result.expireTime.substring(0, 10);
            $('#time4').val(_this.startTime + ' - ' + _this.expireTime);
            _this.url = res.result.linkUrl
            _this.addsort = res.result.sort
            _this.fileurl = res.result.imageUrl
            _this.isshangchuan = false
            $('#addad1').siblings("div.layui-form-select").find('dl').find('dd[lay-value=' + res.result.type +
              ']').click();
            $('#addad2').siblings("div.layui-form-select").find('dl').find('dd[lay-value=' + res.result.linkType +
              ']').click();
            $('#addad3').siblings("div.layui-form-select").find('dl').find('dd[lay-value=' + res.result.linkOpenType +
              ']').click();
            $('#addad4').siblings("div.layui-form-select").find('dl').find('dd[lay-value=' + res.result.expireType +
              ']').click();
            $('#addad5').siblings("div.layui-form-select").find('dl').find('dd[lay-value=' + res.result.publishStatus +
              ']').click();
          }
        })
      },
      handlePictureCardPreview: function() {
        this.dialogImageUrl = this.fileurl
        this.dialogVisible = true;
      },
      closeimg: function(file) {
        this.fileurl = ''
        this.isshangchuan = true
      },
      imgupload: function(val) {
        let _this = this;
        var fileObj = val.file
        this.file = fileObj
        const isImage = fileObj.type.includes("image");
        if (!isImage) {
          this.$message({
            message: '上传文件类型必须是图片!',
            type: 'error',
            center: true
          });
          return
        }
        const isLt2M = fileObj.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message({
            message: '上传图片大小不能超过 2MB!',
            type: 'error',
            center: true
          });
          return
        }
        // FormData 对象
        var form = new FormData();
        // 文件对象
        form.append("file", fileObj);
        imgupload(form).then(res => {
          if (res.code == 200) {
            _this.isshangchuan = false
            _this.fileurl = 'http://test.issosaas.com:8000' + res.result
            _this.imgerror = false
            this.$message({
              message: '上传成功',
              type: 'success',
              center: true
            });
          } else {
            this.$message({
              message: '上传失败,请重新上传图片!',
              type: 'error',
              center: true
            });
          }
        })
      }
    },
    watch: {
      'title': function(newVal, oldVal) {
        this.titlelength = newVal.length + '/60'
      },
    },
    mounted() {
      let _this = this;
      layui.use(['form', 'laydate'], function() {
        var form = layui.form;
        var laydate = layui.laydate;
        laydate.render({
          elem: '#time4',
          range: true,
          done: function(value, date) {
            if (value) {
              _this.startTime = value.substring(0, 10) + ' 00:00:00'
              _this.expireTime = value.substring(13, 23) + ' 23:59:59'
            } else {
              _this.startTime = ''
              _this.expireTime = ''
            }
          }
        });
        form.render('select');
        form.on('select(addad4)', function(data) {
          _this.changestates = data.value;
          _this.timeerror = false
        })
        form.on('select(addad5)', function(data) {
          _this.publishstatus = data.value;
        })
        form.on('select(addad1)', function(data) {
          _this.type = data.value;
          _this.addad1error = false
        })
        form.on('select(addad2)', function(data) {
          _this.linktype = data.value;
        })
        form.on('select(addad3)', function(data) {
          _this.linkopentype = data.value;
        })
      })
    }
  }
</script>

<style>
  .addad-content {
    margin: 0 15px;
  }

  .addadtitlelength {
    color: #aaaaaf;
    position: absolute;
    left: 810px;
    top: 0;
    line-height: 30px;
  }

  .addadml26 {
    margin: 32px 0 0 26px;
  }

  .addadmb20 {
    margin-bottom: 20px;
  }

  .addad-showimg {
    width: 780px;
    height: 160px;
    float: left;
    position: relative;
  }

  .addad-showimg>img {
    display: block;
    width: 780px;
    height: 160px;
  }

  .addad-showimg>.addad-close {
    position: absolute;
    width: 32px;
    height: 32px;
    right: -16px;
    background: #0099FF;
    border-radius: 50%;
    top: -16px;
    text-align: center;
    line-height: 32px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
</style>
