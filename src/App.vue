<template>
  <div id="app" class="layadmin-tabspage-none">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          //this.$store.commit('setKeepAlive', []);
          this.isRouterAlive = true
        })
      }
    },
    mounted() {
      //监听浏览器刷新，强制跳回首页
      window.addEventListener('load', () => {
        this.$router.replace('/dashboard/dashboard')
      })
    }
  }
</script>
<style>
  .appmain-bg {
    background: #FFFFFF;
  }
</style>
<style>
  /* table列表变蓝 */
  /* 错误提示 */
  .error-tips {}

  /* 弹窗 */
  .el-message {
    min-width: 160px;
    top: 50px !important;
    height: 40px;
    line-height: 40px;
    padding: 10px 20px;
    border-radius: 0px 0px 4px 4px;
  }

  .el-message--success {
    background-color: #383846;
    border-color: #383846
  }

  .el-message--success .el-message__content {
    color: #4cc44c
  }

  .el-icon-success:before {
    font-size: 20px;
  }

  .el-message-box__btns {
    text-align: center;
    padding: 0 30px 0;
  }

  .el-message-box {
    width: 350px;
    border: 0;
    padding-bottom: 20px;
  }

  .el-message-box__header {
    padding: 16px 30px 10px;
  }

  .el-message-box__headerbtn .el-message-box__close {
    color: #ddd;
  }

  .el-message-box__headerbtn:focus .el-message-box__close,
  .el-message-box__headerbtn:hover .el-message-box__close {
    color: #6f6f77;
  }

  .el-message-box__content {
    padding: 30px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1b1b2a;
  }

  .el-message-box__status.el-icon-warning {
    font-size: 32px !important;
    color: #ffa800;
  }

  .el-message-box__status {
    position: relative;
    top: 16px;
  }

  .el-message-box__status+.el-message-box__message {
    padding: 0;
    line-height: 16px;
    margin-left: 10px;
  }

  .el-message-box__btns {
    width: 100%;
    display: inline-flex;
    flex-direction: row-reverse;
    justify-content: center;
  }

  .el-button--small,
  .el-button--small.is-round {
    padding: 0;
    text-align: center;
    height: 32px;
  }

  .el-button {
    width: 66px;
    padding: 0;
    height: 30px;
    line-height: 30px;
    border-color: #ddd;
    border-radius: 2px;
    color: #1b1b2a;
    font-size: 12px;
  }

  .el-button:focus,
  .el-button:hover {
    color: #67676f;
    background-color: #f6f6f6;
    border-color: #ddd;
  }

  .el-button--primary {
    border-color: #0099ff;
    background-color: #0099ff;
    margin-left: 0px;
    margin-right: 10px;
    color: #FFFFFF;
  }

  .el-button--primary:focus,
  .el-button--primary:hover {
    color: #fff;
    background-color: #0083f2;
    border-color: #0083f2;
  }

  .el-button+.el-button {
    margin-left: 0;
  }

  .el-message-box__message p {
    line-height: 16px;
  }

  /* 表单 */
  .el-form-item {
    margin-bottom: 0px;
  }

  /* 列表页头部公共样式 */
  .ad-header {
    width: 100%;
    height: 54px;
    position: relative;
  }

  .adh-logo {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 16px;
    top: 14px;
    background: #0099ff;
    font-size: 40px;
    border-radius: 4px;
  }

  .adh-logo>.svg-icon {
    vertical-align: 0 !important;
  }

  .adh-title {
    font-size: 16px;
    line-height: 16px;
    position: absolute;
    left: 68px;
    top: 14px;
  }

  .adh-selected {
    position: absolute;
    left: 68px;
    bottom: 0px;
    font-size: 12px;
    line-height: 13px;
    display: flex;
    justify-content: flex-start;
  }

  .adh-selected>a {
    cursor: pointer;
  }

  .adh-selected>a>i {
    font-style: normal;
    position: relative;
    top: -1px;
  }

  .adh-selected>.isselected {
    color: #0099ff;
    font-size: 13px;
  }

  .adh-selected>span {
    margin: 0 14px;
    color: #ced0d9;
  }

  .adh-right {
    position: absolute;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: flex-start;
    height: 30px;
  }

  .adh-right .adh-npborderleft {
    border-left: 0px;
  }

  .adh-sreach input {
    width: 90px;
    height: 30px;
    border-right: 0px;
  }

  .adh-input {
    width: 170px;
    height: 30px;
    border: 1px solid #dddddd;
    padding-left: 10px;
  }

  .adh-input:focus {
    border: 1px solid #0099ff;
  }

  .adh-sreachbtn {
    width: 32px;
    height: 30px;
    font-size: 16px;
    text-align: center;
    line-height: 28px;
    color: #96969d;
    border: 1px solid #DDDDDD;
    cursor: pointer;
    margin-right: 10px;
  }

  .adh-advancedSearch {
    width: 94px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #DDDDDD;
    margin-right: 10px;
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
  }

  .adh-advancedSearch>span {
    display: block;
    width: 68px;
    border-right: 1px solid #DDDDDD;
  }

  .adh-advancedSearch>i {
    display: block;
    width: 25px;
    color: #96969d;
  }

  .adh-ul {
    font-size: 18px;
    display: flex;
    justify-content: flex-start;
  }

  .adh-ul>li {
    width: 32px;
    height: 30px;
    text-align: center;
    line-height: 28px;
    color: #96969d;
    border: 1px solid #DDDDDD;
    cursor: pointer;
    margin-right: 4px;
    overflow: hidden;
  }

  .adh-ul>li:hover {
    color: #0099ff;
    border: 1px solid #0099ff;
  }

  .adh-moremenu {
    width: 32px;
    height: 30px;
    text-align: center;
    line-height: 28px;
    color: #96969d;
    border: 1px solid #DDDDDD;
    cursor: pointer;
    margin-right: 16px;
    font-size: 18px;
  }

  .adh-menu-ul {
    position: absolute;
    right: 16px;
    top: 35px;
    z-index: 999;
    font-size: 18px;
    color: #96969d;
    border: 1px solid #DDDDDD;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  }

  .adh-menu-ul>li {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    padding: 0 12px;
    text-align: center;
    cursor: pointer;
  }

  .adh-menu-ul>li:hover {
    background: #f6f7fb;
  }

  .adh-menu-ul>li>i {
    display: block;
  }

  .adh-menu-ul>li>span {
    display: block;
    color: #1b1b2a;
    margin-left: 11px;
    flex-grow: 2;
    padding-right: 28px;
    text-align: left;
    font-size: 12px;
  }

  .adh-menu-ul>li>b {
    display: block;
    font-size: 16px;
  }

  .adh-xuanzhuan {
    transform: rotate(180deg);
  }

  .ad-Advanced-Search {
    margin-top: 10px;
    padding: 12px 0 0 16px;
    border-top: 1px solid #DDDDDD;
  }

  .ad-Advanced-Search>.mr15 {
    margin-right: 15px;
  }

  .td-hover-father {
    display: none;
  }

  .td-hover {
    display: flex;
    justify-content: flex-start;
    position: absolute;
    top: -9px;
    right: -11px;
    z-index: 999;
    background: #e1e3eb;
  }

  .td-hover>span {
    display: block;
    width: 50px;
    text-align: center;
    height: 42px;
    line-height: 42px;
    cursor: pointer;
    color: #333333;
  }

  .td-hover>.lianxiren {
    width: 78px;
  }

  .td-hover>span:hover {
    color: #0099ff;
  }

  .el-table--border .tdpl36:first-child .cell,
  .el-table--border .tdpl36:first-child .cell {
    padding-left: 36px;
  }

  @media screen and (max-width: 1366px) {
    .ad-Advanced-Search>.mt10-2 {
      margin-top: 10px;
    }
  }

  @media screen and (max-width: 1453px) {
    .ad-Advanced-Search>.mt10-4 {
      margin-top: 10px;
    }
  }

  @media screen and (max-width: 1560px) {
    .ad-Advanced-Search>.mt10-3 {
      margin-top: 10px;
    }
  }

  @media screen and (max-width: 1788px) {
    .ad-Advanced-Search>.mt10-1 {
      margin-top: 10px;
    }
  }

  /* 表格 */
  .el-table {
    margin-top: 10px;
    font-size: 12px;
    color: #1b1b2a;
  }

  .el-table thead {
    color: #6f6f77;
  }

  th {
    font-weight: normal;
  }

  .el-table th {
    background: #f6f7fb;
  }

  .el-table td {
    border-right: 1px solid #FFFFFF;
  }

  .el-table td,
  .el-table th {
    padding: 0;
    height: 42px;
  }

  .el-table__body tr:hover td {
    background-color: #f6f7fb !important;
    border-right: 1px solid #f6f7fb;
  }

  .el-table .cell,
  .el-table th div {
    overflow: unset;
  }

  .moretitle>.cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tdpre .cell div p {
    height: 23px;
  }

  /* 新增编辑 */
  .adn-header {
    width: 100%;
    height: 54px;
    position: relative;
  }

  .adnh-logo {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 16px;
    top: 14px;
    background: #0099ff;
    font-size: 40px;
    border-radius: 4px;
  }

  .adnh-logo>.svg-icon {
    vertical-align: 0 !important;
  }

  .adnh-title {
    font-size: 16px;
    line-height: 16px;
    position: absolute;
    left: 68px;
    top: 14px;
  }

  .adnh-right {
    position: absolute;
    right: 16px;
    bottom: 0px;
    display: flex;
    justify-content: flex-start;
    height: 30px;
    font-size: 18px;
  }

  .adnh-icon {
    width: 32px;
    height: 30px;
    text-align: center;
    line-height: 28px;
    border: 1px solid #DDDDDD;
    cursor: pointer;
    color: #96969d;
    margin-left: 10px;
    overflow: hidden;
  }

  .adnh-icon:hover {
    border: 1px solid #0099ff;
    color: #0099ff;
  }

  .error {
    color: #ff4912;
    margin-left: 65px;
    position: relative;
    top: -15px;
  }

  .adnh-w75 {
    width: 65px;
    text-align: left;
  }

  .addtitle {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 16px;
    line-height: 16px;
    padding-bottom: 7px;
    border-bottom: solid 1px #e8e8ed;
  }

  .addtitle:before {
    content: "";
    display: block;
    width: 4px;
    height: 16px;
    margin-right: 10px;
    background-color: #0099ff;
  }

  /* 图片上传 */
  .el-upload--picture-card {
    width: 780px;
    height: 160px;
    border-radius: 2px;
    border: 1px dashed #ddd;
    background: #fafafa;
  }

  .el-upload-list--picture-card .el-upload-list__item {
    width: 780px;
    height: 160px;
    border-radius: 2px;
  }

  .el-upload--picture-card i {
    font-size: 12px;
    color: #6F6F77;
    position: relative;
    top: 40px;
    left: -30px;
  }

  .el-icon-plus:before {
    font-size: 72px;
    color: #e8e8ed;
    background-color: #ffffff;
    border: solid 1px #e8e8ed;
    border-radius: 50%;
    position: relative;
    top: -30px;
    left: 72px;
  }

  .el-upload__tip {
    color: #aaaaaf;
    margin-left: 80px;
  }

  /* 标签页切换 */
  .el-tabs__nav {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .el-tabs__item {
    flex-grow: 1;
    text-align: center;
  }

  .el-tabs__item.is-active {
    color: #0099ff;
  }

  .el-tabs__active-bar {
    background-color: #0099ff;
  }

  .el-form-item.is-success .el-input__inner,
  .el-form-item.is-success .el-input__inner:focus,
  .el-form-item.is-success .el-textarea__inner,
  .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #0099ff;
  }

  .el-form-item.is-success .el-input__validateIcon {
    color: #0099ff;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }

  .el-checkbox__inner::after {
    width: 3.1px;
    height: 6px;
    border: 2px solid #fff;
    border-left: 0;
    border-top: 0;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #0099ff;
    border-color: #0099ff;
  }

  /* 模糊搜索 */
  .el-autocomplete {
    width: inherit;
  }

  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #0099ff;
  }

  .el-input__inner {
    height: 30px !important;
    line-height: 30px;
    border-radius: initial;
    border: 1px solid #DDDDDD;
    padding: 0 10px;
  }

  .el-popper[x-placement^=bottom] .popper__arrow {
    border-top-width: thick;
  }

  .el-autocomplete-suggestion {
    margin: 0;
  }

  .el-popper[x-placement^=bottom] {
    margin-top: -1px;
    border-radius: 0;
  }

  /* 模糊搜索 */
  .el-input {
    font-size: 12px;
    color: #1B1B2A;
  }

  .el-input__inner {
    color: #1B1B2A;
  }

  .el-input--suffix .el-input__inner {
    padding-right: 10px;
  }

  .el-select .el-input.is-focus .el-input__inner {
    color: #0099ff;
  }

  .el-select-dropdown__item.selected {
    color: #0099ff;
  }

  .el-input__suffix .el-icon-arrow-up {
    display: none !important;
  }

  .el-input__icon {
    line-height: 30px;
  }

  .el-select {
    display: block;
  }

  .el-select-dropdown__list {
    padding: 0;
  }

  .el-select-dropdown__item {
    color: #1b1b2a;
    font-size: 12px;
    padding: 0 15px;
  }

  .selectwidth100 {
    width: 100px;
  }

  .selectwidth170 {
    width: 170px;
  }

  .selectwidth200 {
    width: 200px;
  }

  /* 弹窗 */
  .el-dialog__header {
    overflow: hidden;
    background: #383846;
    padding: 0 20px;
    height: 40px;
  }

  .el-dialog__header .el-dialog__title {
    float: left;
    color: #FFFFFF;
    line-height: 40px;
    font-size: 12px;
  }

  .el-dialog__headerbtn {
    top: 12px;
  }

  .el-dialog--center .el-dialog__body {
    padding: 20px;
  }

  .el-dialog__headerbtn:focus .el-dialog__close,
  .el-dialog__headerbtn:hover .el-dialog__close {
    color: #aaaaaf;
  }

  .el-dialog__body .layui-form-item {
    margin-bottom: 20px;
  }

  .maxheight200 .el-select-dropdown__wrap {
    max-height: 185px;
  }

  .el-form-item__content {
    line-height: 30px;
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #6f6f77;
  }

  /* 滚动条样式 */
  .divscrollbar::-webkit-scrollbar {
    width: 6px;
    height: 2px;
    background-color: #e5e5e5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  .divscrollbar::-webkit-scrollbar-track {
    /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
    border-radius: 3px;
    background-color: #e5e5e5;
  }

  /*定义滑块 内阴影+圆角*/
  .divscrollbar::-webkit-scrollbar-thumb {
    border-radius: 3px;
    /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); */
    background-color: #898989;
  }

  /* 时间图标 */
  .timeicon:after {
    content: url(../static/img/date.svg);
    width: 14px;
    height: 14px;
    position: absolute;
    top: 7px;
    right: 8px;
  }

  .timediv {
    display: inline-block;
    position: relative;
  }

  /* placeholder兼容 */
  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    /* ie10+ input和textarea */
    color: #aaaaaf !important;
  }

  input::-webkit-input-placeholder {
    color: #aaaaaf !important;
  }

  input:-moz-placeholder {
    color: #aaaaaf !important;
  }

  input::-moz-placeholder {
    color: #aaaaaf !important;
  }

  input:-ms-input-placeholder {
    color: #aaaaaf !important;
  }

  /* *必填 */
  .adnhlabel:before {
    content: '*';
    color: red;
  }
  .mb20{
    margin-bottom: 20px;
  }
  /* 多选框 */
  .el-checkbox{
    margin-right: 0;
    font-size: 12px;
    color: #1b1b2a;
  }
  .el-checkbox__label{
    font-size: 12px;
  }
</style>
