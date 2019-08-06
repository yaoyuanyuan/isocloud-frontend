import request from '@/utils/request'
//列表
export function getlist(params) {
	return request({
		url: 'scc/product/getPageInfo',
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
		url: 'scc/product/condition',
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
//新增
export function productadd(params) {
	return request({
		url: 'scc/product/addProduct',
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
		url: 'scc/product/editProduct',
		method: 'POST',
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
		url: 'scc/product/deleteProducts',
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
		url: 'scc/product/findProductById?id='+params,
		method: 'GET',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json'
	})
}
//编辑
export function updateproduct(params) {
	return request({
		url: 'scc/product/onOffSell?displayStatus='+params.displayStatus,
		method: 'POST',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params.ids
	})
}
