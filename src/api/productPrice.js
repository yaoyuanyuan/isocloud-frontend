import request from '@/utils/request'
//获取列表
export function getlist(params) {
  return request({
    url: 'scc/productPricePackage/queryByPage',
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
    url: 'scc/productPricePackage/condition',
    method: 'GET',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json'
  })
}
//所有体系
export function alltixi() {
  return request({
    url: 'scc/product/systemStandard',
    method: 'GET',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json'
  })
}
//获取体系下相对应产品
export function getProductNameByTarget(params) {
  return request({
    url: 'scc/productPricePackage/getProductNameByTarget?systemTypeId=' + params,
    method: 'GET',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json'
  })
}
//新增
export function productadd(params) {
  return request({
    url: 'scc/productPricePackage/add',
    method: 'POST',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json',
    data: params
  })
}
//编辑
export function productedit(params) {
  return request({
    url: 'scc/productPricePackage/update',
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json',
    data: params
  })
}
//删除
export function prdelete(params) {
  return request({
    url: 'scc/productPricePackage/delete',
    method: 'DELETE',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json',
    data: params
  })
}
//获取
export function getproduct(params) {
  return request({
    url: 'scc/productPricePackage/get/' + params,
    method: 'GET',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json'
  })
}
//上下架
export function updateproductprice(params) {
  return request({
    url: 'scc/productPricePackage/updateDisplayStatus?displayStatus=' + params.displayStatus,
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
    },
    dataType: 'json',
    data: params.ids
  })
}
