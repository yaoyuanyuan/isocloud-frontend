<template>
  <div>
    <!--居住地址三级联动选项-->
    <section class="pl-showChose" v-clickoutside="closeAdd">
      <section class="pl-address">
        <section class="pl-title">
          <div class="pl-area" @click="provinceSelected()" :class="Province?'':'pl-active'">{{Province?Province:'请选择'}}</div><span
            v-if="City">-</span>
          <div class="pl-area" @click="citySelected()" :class="City?'':'pl-active'" v-show="Province">{{City?City:''}}</div><span
            v-if="District">-</span>
          <div class="pl-area" @click="districtSelected()" :class="District?'':'pl-active'" v-show="City">{{District?District:''}}</div>
        </section>
        <ul v-show="show">
          <li class="pl-addList" v-for="(v,index1) in info" @click="getProvinceId(v.no, v.name, index1)" v-show="showProvince">{{v.name}}</li>
          <li class="pl-addList" v-for="(v,index2) in showCityList" @click="getCityId(v.no, v.name, index2)" v-show="showCity">{{v.name}}</li>
          <li class="pl-addList" v-for="(v,index3) in showDistrictList" @click="getDistrictId(v.no, v.name, index3)"
            v-show="showDistrict">{{v.name}}</li>
        </ul>
      </section>
    </section>
  </div>
</template>
<script>
  import {
    provinceList
  } from '@/api/mechanism'
  export default {
    name: 'PL',
    data() {
      return {
        //省份
        show: false,
        showProvince: true,
        showCity: false,
        showDistrict: false,
        showCityList: false,
        showDistrictList: false,
        province: '',
        city: '',
        district: '',
        GetProvinceId: 2,
        District: false,
        Province: false,
        City: false,
        // v-for循环判断是否为当前
        selected: false,
      }
    },
    props: ['clear','info'],
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
    mounted() {

    },
    created() {

    },
    watch: {
      clear: {
        handler: function(val, oldval){
          if(val=='1'){
            this.Province = false
            this.City = false
            this.District = false
          }
        },
        immediate: true, //关键
        deep: true
      }
    },
    methods: {
      //省份
      choseAdd: function() {
        this.show = true;
      },
      closeAdd: function() {
        this.show = false;
      },
      _filter(add, name, code) {
        let result = [];
        for (let i = 0; i < add.length; i++) {
          if (code == add[i].no) {
            if (name == 'city') {
              result = add[i].city;
            } else if (name == 'district') {
              result = add[i].county;
            }
          }
        }
        return result;
      },
      getProvinceId: function(code, input, index) {
        this.province = code;
        this.Province = input;
        this.showProvince = false;
        this.showCity = true;
        this.showDistrict = false;
        this.showCityList = this._filter(this.info, 'city', this.province);
        this.$emit('func', {
          'p': this.Province,
          'c': this.City,
          'd': this.District
        })
        // 点击选择当前
        //this.info.map(a => a.selected = false);
        //this.info[index].selected = true;
      },
      provinceSelected: function() {
        this.show = true
        // 清除市级和区级列表
        this.showCityList = false;
        this.showDistrictList = false;
        // 清除市级和区级选项
        this.City = false;
        this.District = false;
        // 选项页面的切换
        this.showProvince = true;
        this.showCity = false;
        this.showDistrict = false;
        //清除市级和区级已选
        this.City = ''
        this.District = ''
        this.$emit('func', {
          'p': this.Province,
          'c': this.City,
          'd': this.District
        })
      },
      getCityId: function(code, input, index) {
        this.city = code;
        this.City = input;
        this.showProvince = false;
        this.showCity = false;
        this.showDistrict = true;
        this.showDistrictList = this._filter(this.showCityList, 'district', this.city);
        this.$emit('func', {
          'p': this.Province,
          'c': this.City,
          'd': this.District
        })
        // 选择当前添加active
        //this.showCityList.map(a => a.selected = false);
        //this.showCityList[index].selected = true;
      },
      citySelected: function() {
        this.show = true
        this.showProvince = false;
        this.showCity = true;
        this.showDistrict = false;
        this.District = ''
        this.$emit('func', {
          'p': this.Province,
          'c': this.City,
          'd': this.District
        })
      },
      getDistrictId: function(code, input, index) {
        this.district = code;
        this.District = input;
        // 选择当前添加active
        //this.showDistrictList.map(a => a.selected = false);
        //this.showDistrictList[index].selected = true;
        // 选取市区选项之后关闭弹层
        this.show = false;
        this.$emit('func', {
          'p': this.Province,
          'c': this.City,
          'd': this.District
        })
      },
      districtSelected: function() {
        this.show = true
        this.showProvince = false;
        this.showCity = false;
        this.showDistrict = true;
        this.$emit('func', {
          'p': this.Province,
          'c': this.City,
          'd': this.District
        })
      }
    },
    destroyed() {

    }
  }
</script>
<style>
  .pl-showChose {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .pl-address {
    background: #fff;
    width: 100%;
  }

  .pl-title {
    width: 100%;
    line-height: 28px;
    padding-left: 10px;
    display: flex;
    justify-content: flex-start;
    border: 1px solid #DDDDDD;
  }

  .pl-area {
    font-size: 12px;
    line-height: 28px;
    color: #1b1b2a;
    cursor: pointer;
  }

  .pl-addList {
    width: 100%;
    padding-left: 0.32rem;
    font-size: 0.34rem;
    line-height: 0.88rem;
    color: #333;
  }

  /* 修改的格式 */
  .pl-address ul {
    position: relative;
    top: -1px;
    z-index: 99999;
    background: #FFFFFF;
    width: 100%;
    max-height: 274px;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    overflow: hidden;
    overflow-y: auto;
  }

  .pl-address ul li {
    margin-left: 10px;
    line-height: 34px;
    cursor: pointer;
  }

  .pl-address .pl-title .pl-active {
    color: #0099ff;
  }

  .pl-address ul .pl-active {
    color: #0071B8;
  }
</style>
