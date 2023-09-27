import request from '@/utils/request.js'


/* export function getStatus() {
	return request({
		method: 'post',
		url: '/IOT/deviceStatus',
	})
}

export function getDay(data) {
	return request({
		method: 'post',
		url: '/IOT/day',
		data: data
	})
}
 */

export function getArea() {
	return request({
		method: 'get',
		url: '/IOT/getArea'
	})
}

export function getDeviceInfo(e) {
	return request({
		method: 'get',
		url: `/IOT/getDeviceInfo?area=${e}`
	})
}

export function getAllInfo() {
	return request({
		method: 'get',
		url: '/IOT/getAllInfo'
	})
}

export function getSiteDetail(e) {
	return request({
		method: 'get',
		url: `/IOT/getSiteDetail?serial_number=${e}`
	})
}

/* export function getFaultInfo() {
	return request({
		method: 'get',
		url: '/IOT/getFaultInfo'
	})
} */

export function getStatisticsInfo() {
	return request({
		method: 'get',
		url: '/IOT/getStaticInfo'
	})
}
export function getStatisticsInfoMonth() {
	return request({
		method: 'get',
		url: '/IOT/getStaticInfo?period=month'
	})
}
export function getStatisticsInfoYear() {
	return request({
		method: 'get',
		url: '/IOT/getStaticInfo?period=year'
	})
}
export function getStatisticsInfoSearch(e) {
	return request({
		method: 'get',
		url: `/IOT/getStaticInfo?time=${e}`
	})
}
export function getStatisticsInfoMonthSearch(e) {
	return request({
		method: 'get',
		url: `/IOT/getStaticInfo?period=month&time=${e}`
	})
}

export function getStatisticsInfoYearSearch(e) {
	return request({
		method: 'get',
		url: `/IOT/getStaticInfo?period=year&time=${e}`
	})
}

export function restart(e) {
	return request({
		method: 'get',
		url: `/IOT/restart?serial_number=${e}`
	})
}

export function downloadMonth(e) {
	return request({
		method: 'get',
		url: `/IOT/report?period=month&time=${e}`,
		responseType: 'blob'
	})
}