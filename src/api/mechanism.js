import request from '@/utils/request'
//获取列表
export function getList(params) {
  return request({
    url: 'dsc/dscIssuer/list',
    method: 'POST',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    data: params
  })
}
//模糊查询
export function condition() {
  return request({
    url: 'dsc/dscIssuer/vague/query',
    method: 'GET',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json'
  })
}
//省份
export function provinceList() {
  return request({
    url: 'dsc/dscDistrict/list',
    method: 'GET',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json'
  })
}
//联系人编辑
export function lianxirenedit(params) {
  return request({
    url: 'dsc/dscIssuerContact',
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json',
    data: params
  })
}
//联系人查询
export function lianxireninfo(params) {
  return request({
    url: 'dsc/dscIssuerContact/' + params,
    method: 'GET',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json'
  })
}
//删除
export function prdelete(params) {
  return request({
    url: 'dsc/dscIssuer',
    method: 'DELETE',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json',
    data: params
  })
}
//获取
export function getjigou(params) {
  return request({
    url: 'dsc/dscIssuer/' + params,
    method: 'GET',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json'
  })
}
//服务范围
export function scope() {
  return request({
    url: 'dsc/dscIssuer/service/scope',
    method: 'GET',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
  })
}
//新增机构
export function xinzengissuer(params) {
  return request({
    url: 'dsc/dscIssuer',
    method: 'POST',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json',
    data: params
  })
}
//判断机构名字是否重复
export function addrepeat(params) {
  return request({
    url: 'dsc/dscIssuer/add/repeat?name=' + params.name,
    method: 'GET',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json'
  })
}
export function editrepeat(params) {
  return request({
    url: 'dsc/dscIssuer/edit/repeat?id=' + params.id+'&name='+params.name,
    method: 'GET',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json'
  })
}
