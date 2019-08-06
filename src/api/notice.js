import request from '@/utils/request'
//列表
export function getAdQuery(params) {
	return request({
		url: 'uac/notice/query',
		method: 'POST',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8'
		},
		dataType: 'json',
		data: params
	})
}
//删除
export function delAd(params) {
	return request({
		url: 'uac/notice/delete',
		method: 'DELETE',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
//新增
export function addNotice(params) {
	return request({
		url: 'uac/notice/save',
		method: 'POST',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
//获取
export function getNotice(params) {
	return request({
		url: 'uac/notice/get',
		method: 'GET',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		params: params
	})
}
//编辑
export function upNotice(params) {
	return request({
		url: 'uac/notice/update',
		method: 'POST',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
