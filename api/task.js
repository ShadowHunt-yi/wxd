import request from '@/utils/request.js'

/* // 查询站点任务接口
export function getSiteTaskList(site, begin = '2023-3-3', end = '2023-4-1') {
	return request({
		method: 'get',
		url: `/system/checkDetail/${site}/${begin}/${end}`
	})
} */

/* // 查询站点任务接口
export function getSiteTaskList(site, begin = parseTime(new Date(), '{y}-{m}-{d}'), end = parseTime(new Date(),
	'{y}-{m}-{d}')) {

	return request({
		method: 'get',
		url: `/system/checkDetail/${site}/${begin}/${end}`
	})
} */
// 查询站点任务接口
export function getSiteTaskList(site, begin = parseTime(new Date(), '{y}-{m}-{d}'), end = parseTime(new Date(),
	'{y}-{m}-{d}')) {
	return request({
		method: 'get',
		url: `/system/checkDetail/${site}/${begin}/${end}`
	})
}

// 完成定期巡检任务接口
export function completeTask(data) {
	return request({
		method: 'post',
		url: '/system/inspection/complete/jobList/',
		data: data
	})
}

// 查询站点是否正在巡检
export const checkSiteMaintenance = (siteName) =>
	request({
		method: 'get',
		url: `/system/inspection/getCompletedJobBySiteName/${siteName}`
	})


// 查询站点巡检状态
export function getTaskPatroling() {
	return request({
		method: 'get',
		url: '/system/inspection/getAll'
	})
}
/* // 定期巡检完成巡检接口
export function finishInspection(eid) {
	return request({
		method: 'get',
		url: `/system/inspection/complete/${eid}`
	})
} */


// 根据站点和打卡人员判断今天是否打卡
export function hasAttendance(eid, person) {
	return request({
		url: `/attendance/hasCome/${eid}/${person}`,
		method: 'get'
	})
}


// 考勤开始接口
export function attendance(data) {
	return request({
		method: 'post',
		url: "/attendance/clock",
		data
	})
}

// 修改考勤离开时间
export function leaveAttendance(data) {
	return request({
		url: '/attendance/changeEndTime',
		method: 'post',
		data: data
	})
}

// 获取巡检的检查资料数据
export function getCheckDataByInspection(eid) {
	return request({
		method: 'get',
		url: `/check_data/get/${eid}`
	})

}

export function getSiteLocationByInfo(city = '', region = '', type = '', siteName, ) {
	let data = {
		city,
		region,
		'siteType': type,
		siteName
	}
	return request({
		method: 'post',
		url: `/system/siteData/get`,
		data: data
	})
}

// 定期巡检完成三级任务
export function completeSubTask(data) {
	return request({
		method: 'post',
		url: '/system/inspection/value',
		data: data
	})
}
// 巡检资料上传
export function upload_check_info(data) {
	return request({
		method: 'post',
		url: `/check_data/add`,
		data: data,
	})
}

// 定期巡检故障上报
export function exportFault(data) {
	return request({
		method: 'post',
		url: '/faults/report',
		data: data
	})
}

// 上传带回维修设备
export function takeoutEquipment(data) {
	return request({
		url: '/faultRepair/equipment',
		method: 'post',
		data: data
	})
}

// 根据站点名称获取站点设备
export function reqGetDeviceBySiteName(siteName = '') {
	return request({
		method: 'get',
		url: `/device/get/${siteName}`,

	})
}
// 根据站点名称查询站点数据
export function getSiteData(siteName = '') {
	return request({
		method: 'get',
		url: `/system/siteData/get/${siteName}`
	})
}
// 开始一次巡检
export function beginInspection(data) {
	return request({
		method: 'post',
		url: '/system/inspection/begin',
		data
	})
}
// 判断站点有无正在进行的巡检
export function reqGoingIns(data) {
	return request({
		method: 'get',
		url: `/system/inspection/goingIns/${data}`,

	})
}
// 完成一起巡检
export function finishInspection(data) {
	return request({
		method: 'post',
		url: '/system/inspection/finish',
		data
	})
}

// 补录/system/inspection/insertRecord
export function reqBulu(beginTime, endTime, data) {
	return request({
		method: 'post',
		url: `/system/inspection/insertRecord?beginDay=${beginTime}&endDay=${endTime}`,
		data
	})
}

// 新增一次日巡检
export function addNewDailyInspection(data) {
	return request({
		method: 'post',
		url: '/system/inspection/day',
		data
	})
}
// 根据站点查询任务分配时间段
export function getSiteTime(siteName) {
	return request({
		method: 'get',
		url: `/system/checkDetail/getTime/${siteName}`,

	})
}

// 查询站点设备
export function reqGetSiteDevice(data) {
	return request({
		method: 'post',
		url: '/device/select',
		data
	})
}
// 上传日常检查记录
export function reqDailyCheck(data) {
	return request({
		method: 'post',
		url: '/dailyCheck/upload',
		data
	})
}

//获取日检查详情
// /system/inspection/day/{id}
export function reqGetDailyDetail(id) {
	console.log(id)
	return request({
		method: 'get',
		url: `/system/inspection/day/${id}`,

	})
}
// 当场完成维修
export function completeFaultCurrent(data) {
	return request({
		url: '/faultRepair/field',
		method: 'post',
		data,
	})
}

export function reqGetAll(data) {
	return request({
		method: 'post',
		url: `/system/inspection/select`,
		data
	})
}

export function reqGetAll2(data, year, month) {
	return request({
		method: 'post',
		url: `/system/inspection/select?month=${month}&year=${year}`,
		data
	})
}

/*export function reqGetAll3(data) {
	return request({
		method: 'post',
		url: `/system/inspection/select`,
		data
	})
} */
// 根据id查询详情
export function reqGetInfoById(id) {
	return request({
		method: 'get',
		url: `/system/inspection/day/${id}`,

	})
}