<template>
  <div class="appmain-bg layui-form">
    <div class="adn-header">
      <div class="adnh-logo">
        <svg-icon icon-class="Icon-Message"></svg-icon>
      </div>
      <h3 class="adnh-title">{{isedit?'编辑':'新增'}}公告</h3>
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
    <div class="components-container">
      <div class="layui-form-item">
        <label class="layui-form-label adnh-w75">公告标题：</label>
        <div class="layui-input-block">
          <input type="text" name="title" placeholder="请输入标题" autocomplete="off" class="layui-input" style="width: 741px;padding-right: 40px;"
            v-model="title" maxlength="60" @focus="titleerror=false;$refs.title.style.borderColor='#e6e6e6'" ref="title">
          <span class="titlelength">{{titlelength}}</span>
        </div>
      </div>
      <div class="error" v-if="titleerror">标题不能为空</div>
      <div class="layui-form-item">
        <label class="layui-form-label adnh-w75">展示时间：</label>
        <div class="layui-input-block" style="width: 120px;float: left;">
          <select name="time" lay-filter="sreach1" id="sreach1">
            <option value="0" selected="">固定期</option>
            <option value="1">长期有效</option>
          </select>
        </div>
        <div class="timeicon timediv" v-show="changestates==0?true:false">
          <input type="text" class="layui-input" id="time3" placeholder=" - " style="width: 200px;float: left;margin-left: 10px;"
            autocomplete="off" ref="time3" @focus="timeerror=false">
        </div>
      </div>
      <div class="error" v-if="timeerror">请设置展示时间</div>
      <div class="layui-form-item">
        <label class="layui-form-label adnh-w75">公告内容：</label>
        <div class="editor-container" style="height:462px;float: left;margin-left: 65px;position: relative;top:-30px">
          <ueditor :defaultMsg='defaultMsg' :config='config' ref="ue" :contenterror='contenterror'></ueditor>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  //采用局部引用的方式注册组件
  import ueditor from '@/components/Ueditor';
  import {
    addNotice,
    getNotice,
    upNotice
  } from '@/api/notice'
  export default {
    name: "PublishPage",
    inject: ['reload'],
    data() {
      return {
        defaultMsg: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 470
        },
        isedit: false,
        title: '',
        changestates: 0,
        startTime: '',
        expireTime: '',
        titleerror: false,
        timeerror: false,
        contenterror: false,
        titlelength: '0/60'
      }
    },
    components: {
      ueditor
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
        this.$refs.ue.setUEContent('')
        $('#sreach1').siblings("div.layui-form-select").find('dl').find('dd[lay-value=0]').click();
      },
      //保存
      save: function() {
        if (this.title == '') {
          this.titleerror = true
          this.$refs.title.style.borderColor = '#ff4912'
          return
        }
        if (this.changestates != 1) {
          if (this.startTime == '') {
            this.timeerror = true
            return
          }
        }
        if (this.$refs.ue.getUEContent() == '') {
          this.contenterror = true
          return
        }
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
        getNotice(val).then(res => {
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
          elem: '#time3',
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
        form.on('select(sreach1)', function(data) {
          _this.changestates = data.value;
          _this.timeerror = false
        })

      })
    }
  }
</script>

<style>
  .components-container {
    margin: 0px;
    padding: 0px 47px 0px 40px;
  }

  .titlelength {
    color: #aaaaaf;
    position: absolute;
    left: 770px;
    top: 0;
    line-height: 30px;
  }
</style>
