import request from '@/utils/request'
//列表
export function getList(params) {
	return request({
		url: 'dsc/industry/list',
		method: 'POST',
		headers: {
			"Content-Type": 'application/json;charset=UTF-8'
		},
		dataType: 'json',
		data: params
	})
}
