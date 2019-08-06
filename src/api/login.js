import request from '@/utils/request'
//登录
let Base64 = require('js-base64').Base64;
let autobase = Base64.encode('isocloud-client-uac:isocloudClientSecret');
var qs = require('qs');
export function login(parems) {
  return request({
    url: '/uac/auth/form',
    method: 'post',
		headers: {
				"deviceld":'1',
        "Authorization":'Basic '+autobase
    },
    data: qs.stringify(parems)
  })
}
//验证码
export function getyzm() {
  return request({
    url: '/uac/auth/code/image',
    method: 'post'
  })
}
//获取用户信息
export function getInfo(token) {
  return request({
    url: '/uac/user/loginName',
    method: 'get'
  })
}
//登出
export function logout(token) {
  return request({
    url: '/uac/user/logout',
    method: 'post',
		data: qs.stringify(token)
  })
}
