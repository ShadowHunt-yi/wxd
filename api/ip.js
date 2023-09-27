import request from '@/utils/request.js'

//根据网段查询
export function getNetwork(segment) {
	return request({
		method: 'get',
		url: `/ip/segment/${segment}`,
	})
}

//根据Ip地址获得使用详情
export function getDetail(ip) {
	return request({
		method: 'get',
		url: `/ip/getDetail/${ip}`,
	})
}

//停用某个IP
export function stopIp(ip) {
	return request({
		method: 'get',
		url: `/ip/stop/${ip}`,
	})
}

//修改IP信息
export function reviseIp(obj) {
	return request({
		method: 'put',
		url: '/ip/changeIp',
		data: obj
	})
}

// 查询所有站点数据
export function getAllSiteData() {
	return request({
		method: 'get',
		url: `/system/siteData/all`,

	})
}
//申请一个IP地址
export function applyOne(obj) {
	return request({
		method: 'post',
		url: '/ip/applyOne',
		data: obj
	})
}

// 查询IP列表
export function getIp() {
	return request({
		method: 'get',
		url: '/ip/address/all'
	})
}

//通过某个IP订单的申请
export function acceptOrder(checkUser = '', orderId = '', remark = '') {
	let data = {
		checkUser,
		orderId,
		remark
	}
	return request({
		method: 'post',
		url: `/ip/acceptOrder/${orderId}/${checkUser}/${remark}`,
		data: data
	})
}