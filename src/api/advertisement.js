import request from '@/utils/request'
//列表
export function getAdQuery(params) {
	return request({
		url: 'uac/ad/query',
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
		url: 'uac/ad/delete',
		method: 'DELETE',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
//上架
export function onsell(params) {
	return request({
		url: 'uac/ad/onsell',
		method: 'POST',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
//下架
export function offsell(params) {
	return request({
		url: 'uac/ad/offsell',
		method: 'POST',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
//获取
export function getad(params) {
	return request({
		url: 'uac/ad/get',
		method: 'GET',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		params: params
	})
}
//上传图片
export function imgupload(params) {
	return request({
		url: 'uac/ad/upload',
		method: 'POST',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
//新增
export function savead(params) {
	return request({
		url: 'uac/ad/save',
		method: 'POST',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
//编辑
export function updatead(params) {
	return request({
		url: 'uac/ad/update',
		method: 'POST',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8',
		},
		dataType: 'json',
		data: params
	})
}
