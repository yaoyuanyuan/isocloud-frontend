import request from '@/utils/request'
//列表
export function getlist(params) {
	return request({
		url: 'scc/systemType/list',
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
		url: 'scc/systemType/condition',
		method: 'GET',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json'
	})
}
//体系查询
export function systemStandard() {
	return request({
		url: 'scc/systemType/get/systemStandard',
		method: 'GET',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json'
	})
}
//新增
export function sysadd(params) {
	return request({
		url: 'scc/systemType/add',
		method: 'POST',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
//编辑
export function sysedit(params) {
	return request({
		url: 'scc/systemType/edit',
		method: 'PUT',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
//删除
export function sysdelete(params) {
	return request({
		url: 'scc/systemType/delete',
		method: 'DELETE',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
//获取
export function getsys(params) {
	return request({
		url: 'scc/systemType/get/'+params,
		method: 'GET',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json'
	})
}
//上下架
export function updatesys(params) {
	return request({
		url: 'scc/systemType/update/displayStatus',
		method: 'PUT',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
// export function sysexport(params) {
// 	return request({
// 		url: 'scc/systemType/exportSysType',
// 		method: 'POST',
// 		headers: {
// 			"Content-Type": 'application/json;charset=UTF-8',
// 		},
// 		dataType: 'json',
// 		data: params
// 	})
// }
