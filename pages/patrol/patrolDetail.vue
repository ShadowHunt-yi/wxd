<template>
	<view style="padding-bottom: 5%;">
		<view class="btndiv">
			<view>
				<button class="bg-blue" size="mini" @click="beginInspectionHandler" v-show="!eventId">开始巡检</button>
			</view>
			<view>
				<button class="bg-green" size="mini" @click="finishInspection" v-show="eventId">完成巡检</button>
			</view>
			<view>
				<uni-popup ref="inputDialog" type="dialog" :model="finishInsForm">
					<uni-popup-dialog ref="inputClose" mode="input" title="巡检完成" @confirm="finishHandler">
						<uni-forms label-position="top">
							<uni-forms-item label="巡检结果">
								<uni-easyinput v-model="finishInsForm.conclusion" :styles="styles" type="textarea" />
							</uni-forms-item>
							<uni-forms-item label="人员">
								<uni-easyinput v-model="finishInsForm.persons" :styles="styles" />
							</uni-forms-item>
							<uni-forms-item label="备注">
								<uni-easyinput v-model="finishInsForm.remark" :styles="styles" type="textarea" />
							</uni-forms-item>
						</uni-forms>
					</uni-popup-dialog>
				</uni-popup>
			</view>
		</view>
		<!-- 	<uni-card title="站点数据">
			<u-cell-group v-if="siteData.siteType == 1 || siteData.siteType == 3">
				<u-cell icon="account" title="名称" :value="siteData.siteName"></u-cell>
				<u-cell icon="coupon" title="类型" :value="siteData.siteType"></u-cell>
				<u-cell icon="integral" title="监测设备等级" :value="siteData.siteLevel"></u-cell>
				<u-cell icon="map" title="地区" :value="siteData.region"></u-cell>
				<u-cell icon="map" title="详细地址" :value="siteData.location"></u-cell>
				<u-cell icon="map" title="地址类型" :value="siteData.locationType"></u-cell>
				<u-cell icon="map" title="经纬度" :value="siteData.coordinate"></u-cell>
				
			</u-cell-group>
			<u-cell-group v-else-if="siteData.siteType == 2">
				<u-cell icon="account" title="名称" :value="siteData.siteName"></u-cell>
				<u-cell icon="coupon" title="类型" :value="siteData.siteType"></u-cell>
				<u-cell icon="integral" title="监测设备等级" :value="siteData.siteLevel"></u-cell>
				<u-cell icon="map" title="地区" :value="siteData.region"></u-cell>
				<u-cell icon="car" title="车牌号" :value="siteData.carNumber"></u-cell>
				<u-cell icon="car" title="车辆型号" :value="siteData.carType"></u-cell>
				<u-cell icon="car" title="公里数" :value="siteData.kilometer"></u-cell>
			</u-cell-group>
			<u-cell-group v-else>
				<u-cell icon="account" title="使用单位" :value="siteData.siteName"></u-cell>
				<u-cell icon="coupon" title="类型" :value="siteData.siteType"></u-cell>
				<u-cell icon="integral" title="状态" :value="siteData.status"></u-cell>
				<u-cell icon="integral" title="监测设备等级" :value="siteData.siteLevel"></u-cell>
				<u-cell icon="map" title="地区" :value="siteData.region"></u-cell>
				<u-cell icon="map" title="详细地址" :value="siteData.location"></u-cell>
				<u-cell icon="map" title="地址类型" :value="siteData.locationType"></u-cell>
				<u-cell icon="map" title="设备存放地" :value="siteData.storageLocation"></u-cell>
				<u-cell icon="coupon" title="设备型号" :value="siteData.deviceModel"></u-cell>
				<u-cell icon="coupon" title="出厂编号" :value="siteData.deviceNumber"></u-cell>
				<u-cell icon="coupon" title="承建商" :value="siteData.builder"></u-cell>
			</u-cell-group>
		</uni-card> -->
		<uni-card title="巡检记录" v-show="eventId">
			<uni-forms labelWidth="140rpx" :model="form">
				<uni-forms-item label="名称">
					<view style="padding: 8px;">{{siteData.siteName}} </view>
				</uni-forms-item>
				<uni-forms-item label="巡检资料上传">
					<uni-file-picker limit="9" title="最多选择9张图片" mode="grid" file-mediatype="image" @select="select"
						:sizeType="['compressed']">
					</uni-file-picker>
				</uni-forms-item>
				<uni-forms-item labelWidth="0">
					<view style="display: flex;">
						<view >
							人员<uni-easyinput v-model="form.persons" />
						</view>
						<view style="width: 200px;">
							日期<uni-datetime-picker type="date" v-model="form.date" @maskClick="maskClick" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item label="类型">
					<view>
						<label class="radio">
							<uni-data-checkbox v-model="form.series" :localdata="series"></uni-data-checkbox>
						</label>
					</view>
				</uni-forms-item>
				<uni-forms-item label="遗留问题">
					<uni-easyinput v-model="form.hisQue" />
				</uni-forms-item>
				<uni-forms-item label="备注">
					<textarea style="border: 1px #E5E5E5 solid;width: 100%;height: 30px;" :value="form.conclusion" />
				</uni-forms-item>
				<uni-forms-item label="隐患故障">
					<view style="display:flex;">
						<view class="uni-list-cell-db">是否有隐患</view>
						<switch @change="this.trouble=!this.trouble" />
						<view class="uni-list-cell-db">是否有故障</view>
						<switch @change="this.hitch=!this.hitch" />
					</view>
				</uni-forms-item>
				<uni-forms-item label="隐患描述" v-if="trouble">
					<textarea style="border: 1px #E5E5E5 solid;width: 100%;" :value="form.trouble" />
				</uni-forms-item>
				<uni-forms-item v-if="trouble" label="隐患图片">
					<uni-file-picker limit="9" title="最多选择9张图片" mode="grid" file-mediatype="image" @select="select"
						:sizeType="['compressed']">
					</uni-file-picker>
				</uni-forms-item>
				<uni-forms-item label="故障现象" v-if="hitch">
					<textarea style="border: 1px #E5E5E5 solid;width: 100%;" :value="form.hitch" />
				</uni-forms-item>
				<uni-forms-item label="故障图片" v-if="hitch">
					<uni-file-picker limit="9" title="最多选择9张图片" mode="grid" file-mediatype="image" @select="select"
						:sizeType="['compressed']">
					</uni-file-picker>
				</uni-forms-item>
				<view class="u-page__tag-item" v-if="hitch">
					<view v-for="(item, index) in deviceList" :key="index" style="margin-right: 2%;margin-bottom: 2%;">
						<u-tag :text="item.deviceName" :plain="!item.checked" :name="index"
							@click="selectDeviceHandler(item)">
						</u-tag>
					</view>
				</view>
				<uni-forms-item label="故障设备" v-if="hitch">
					<uni-easyinput v-model="form.faultEqu" placeholder="自定义故障设备" type="textarea" />
				</uni-forms-item>
				<uni-forms-item label="维修状态" v-if="hitch">
					<view>
						<label class="radio">
							<uni-data-checkbox v-model="form.state" :localdata="state"></uni-data-checkbox>
						</label>
					</view>
				</uni-forms-item>
				<view style="display: flex;">
					<button size='mini' class="bg-blue" @click="">录入多次</button>
					<button size='mini' class="bg-blue" @click="">巡检未完成上传</button>
					<button size='mini' class="bg-ash" @click="addDailyCheck">巡检完成</button>
				</view>
			</uni-forms>
		</uni-card>
		<!-- <uni-card title="任务时间" :extra="select_time"></uni-card> -->
		<!-- <view class="div1">
			<uni-section title="巡检打卡" type="line">
				<view style="display: flex;justify-content: flex-end;">
					<view class="btn">
						<u-button text="巡检资料上传" shape="circle" icon="file-text" size="mini" type="primary"
							@click="goUpload" v-if="eventId && !checkDataFlag">
						</u-button>
					</view>
					<view class="btn">
						<u-button text="开始任务" shape="circle" icon="hourglass" size="mini" type="primary"
							@click="beginInspectionHandler" v-if="!eventId">
						</u-button>
					</view>
					<view class="btn">
						<u-button text="开始巡检" shape="circle" icon="clock" size="mini" type="primary"
							@click="attendanceHandler" v-if="eventId && !hasAttendanceFlag">
						</u-button>
					</view>
					<view class="btn">
						<u-button text="结束巡检" shape="circle" icon="clock-fill" size="mini" type="success"
							@click="leaveAttendanceHandler" v-if="eventId && hasAttendanceFlag">
						</u-button>
					</view>
					<view class="btn">
						<u-button text="完成任务" shape="circle" icon="hourglass-half-fill" size="mini" type="success"
							@click="finishInspection" v-if="eventId">
						</u-button>
					</view>
				</view>
			</uni-section>
		</view> -->
		<!-- <uni-card title="巡检内容">
			<uni-collapse accordion>
				<uni-collapse-item :title="item.systemName" v-for="(item, index) in taskList" :key="index">
					<view v-for="(items, indexs) in item.jobs" :key="indexs" class="content">
						<view style="display: flex;justify-content: space-between;">
							<view @click="openAddSubTaskDialog(item, items)" style="display: flex;">
								<view v-if="items.listValue && items.listValue.length > 0">▽</view>
								<view v-if="!items.listValue || items.listValue.length == 0">○</view>
								<view>{{items.jobName}}</view>
							</view>
							<view>
								<uni-tag :inverted="true" :text="items.percentage" type="primary"
									v-if="!items.totalFinish" />
								<uni-tag :inverted="true" type="success" :text="items.percentage"
									v-if="items.totalFinish" />
							</view>
						</view>
						<view style="display: flex;margin-top:1%;">
							<view>
								<u-button text="正常" shape="circle" icon="checkmark-circle" size="mini" type="primary"
									@click="passTask(item, items)" v-if="items.finish == -1">
								</u-button>
							</view>
							<view>
								<u-button text="报障" shape="circle" icon="close-circle" size="mini" type="error"
									@click="goReport(item, items)" v-if="items.finish == -1">
								</u-button>
							</view>
							<view>
								<u-button text="正常" shape="circle" icon="checkmark-circle" size="mini" type="success"
									:disabled="true" v-if="items.finish == 0">
								</u-button>
							</view>
							<view>
								<u-button text="已报障" shape="circle" icon="checkmark-circle" size="mini" type="warning"
									:disabled="true" v-if="items.finish == 1">
								</u-button>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</uni-card> -->
		<uni-popup ref="popup" type="dialog">
			<!-- <view class="pop" v-if="subTask.listValue && subTask.listValue.length > 0"> -->
			<uni-popup-dialog mode="input" @confirm="subTaskAddHandler" title="任务检查项" v-if="listV.length > 0">
				<view style="display: flex;flex-direction: column;">
					<view v-for="(item, index) in subTask.listValue" :key="index">
						<uni-section :title="`${item.name}`" type="circle">
							<view v-if="item.type == 0" style="display: flex;">
								<uni-easyinput v-model="item.value" placeholder="请输入检查数值" />
								<view style="color: rgb(149, 165, 166);font-size: 26rpx;">
									参考范围：
									<view v-if="item.range != ''">
										{{ item.range}}
									</view>
									<view v-if="item.range == ''">暂无数据</view>
								</view>
							</view>
							<view v-if="item.type == 1">
								<uni-data-checkbox v-model="item.value" :localdata="datatype" />
							</view>
						</uni-section>
					</view>
				</view>
			</uni-popup-dialog>
			<uni-popup-dialog mode="input" title="任务检查项" v-if="listV.length == 0">
				暂无数据
			</uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	import {
		reqGoingIns,
		getSiteData,
		beginInspection,
		finishInspection,
		addNewDailyInspection,
		reqGetSiteDevice,
		getSiteLocationByInfo,
		completeTask,
		completeSubTask,
		getSiteTaskList,
		checkSiteMaintenance,
		hasAttendance,
		getSiteTime,
		attendance,
		leaveAttendance,
		getCheckDataByInspection,
	} from '@/api/task.js';
	import {
		zhDigitToArabic
	} from "@/utils/maintenance";
	import {
		parseTime
	} from "@/utils/ruoyi.js";
	export default {
		data() {
			return {
				hitch: false,
				trouble: false,
				deviceList: [],
				styles: {
					color: '#2979FF',
					borderColor: '#2979FF'
				},
				finishInsForm: {
					days: '',
					persons: '',
					conclusion: '',
					remark: '',
					siteName: '',
					inspectionId: ''
				},
				series: [{
					text: '定期巡检',
					value: '1'
				}, {
					text: '额外巡检',
					value: '2'
				}],
				state: [{
					text: '当场维修',
					value: '1'
				}, {
					text: '设备带走',
					value: '2'
				}, {
					text: '其他',
					value: '3'
				}],
				form: {
					inspection_id: "",
					persons: "",
					day: "",
					fileId: "",
					date: '',
					series: true,
					hisQue: '',
					conclusion: '',
					trouble: '',
					hitch: '',
					faultEqu: "",
					state: '',

				},
				upload_img: [],
				fileEidStr: '',
				selectDeviceList: [],

				// 今日是否已经打卡
				currentItem: null,
				currentParent: null,
				hasAttendanceFlag: false,
				checkDataFlag: false,
				check_flag: false,
				date: new Date().toISOString(),
				select_time: null,
				siteName: '',
				checkImg: [],
				currentdata: '',
				uploadContent: "",
				eventId: null,
				siteData: null,
				taskList: [],
				subTask: null,
				taskItem: null,
				listV: [],
				finishTaskList: [],
				datatype: [{
					text: '正常',
					value: '正常'
				}, {
					text: '异常',
					value: '异常'
				}],
			}
		},
		onLoad(e) {
			this.siteName = e.name;
			console.log('eeeeeeeee',e)
			//this.siteName = "成都市手持式无线电监测测向系统"
		},
		/* computed: {
			eventId() {
				return this.dateFormat(this.date)
			}
		}, */
		mounted() {
			this.form.date = new Date().toISOString().slice(0, 10)
			/* let _this = this;
			setInterval(function() {
				_this.date = Date.parse(new Date());
			}, 1000); */
			//this.taskDetail();
			this.changeSite();
			this.getSiteData();
		},
		onPullDownRefresh() {
			this.hasAttendanceFlag = false;
			this.checkDataFlag = false;
			this.taskDetail();
			uni.stopPullDownRefresh();
		},
		methods: {
			changeSite() {
				let siteName = this.siteName;
				reqGetSiteDevice({
					siteName
				}).then((res) => {
					if (res.code == 200) {
						this.deviceList = res.data.sort(this.compare);
						let tmp = [];
						this.deviceList.forEach((item) => {
							tmp.push({
								count: item.count,
								deviceModel: item.deviceModel,
								deviceName: item.deviceName,
								fault: item.fault,
								id: item.id,
								ip: item.ip,
								manufactureDate: item.manufactureDate,
								manufacturer: item.manufacturer,
								remark: item.remark,
								serialNumber: item.serialNumber,
								siteName: item.siteName,
								remark: item.remark,
								checked: false,
							});
						});
						this.deviceList = tmp
					}
				});
			},
			selectDeviceHandler(item) {
				item.checked = !item.checked;
				let index = this.selectDeviceList.findIndex((a) => a.id == item.id);
				if (index != -1) {
					this.selectDeviceList.splice(index, 1);
				} else {
					this.selectDeviceList.push(item);
				}
				this.form.faultEqu = this.selectDeviceList
					.map((x) => x.deviceName)
					.join(",");
			},
			getSiteData() {
				//先判断是否在巡检
				reqGoingIns(this.siteName).then(res => {
					if (res.code == 200) {
						this.eventId = res.data.inspectionId;
						//console.log(this.eventId)
						/* if (this.eventId) {
							this.getDailyDetailHander()
						} */
					}
				});
				//获取站点数据
				getSiteData(this.siteName).then((res) => {
					if (res.code == 200) {
						this.siteData = res.data;
					}
				});
			},
			// 开始巡检
			beginInspectionHandler() {
				let data = {
					siteName: this.siteName,
					siteType: this.siteData.siteType,
					days: parseTime(new Date()), // Date.parse(new Date()), //???
				};
				beginInspection(data).then((res) => {
					if (res.code == 200) {
						this.eventId = res.data
					}
				});
			},
			finishInspection() {
				this.$refs.inputDialog.open()
			},
			finishHandler() {
				this.finishInsForm.days = new Date().toISOString() //???
				this.finishInsForm.inspectionId = this.eventId
				this.finishInsForm.siteName = this.siteName
				finishInspection(this.finishInsForm).then(res => {
					if (res.code == 200) {
						/* this.eventId = null
						this.getSiteData() */
						uni.showToast({
							title: "该任务已完成",
							icon: "success",
							duration: 3000,
						});
						let _this = this;
						setTimeout(function() {
							uni.redirectTo({
								url: `/pages/patrol/patrolDetail?name=${_this.siteName}`
							});
						}, 1000)
					}
				})
			},
			addInsectionAfter() {
				uni.navigateTo({
					url: `/pages/patrol/bulu?name=${this.siteName}` /* &eventId=${this.eventId} */
				})
			},
			select(e) {
				this.upload_img = e.tempFilePaths
			},
			// 添加日巡检
			async addDailyCheck() {
				if (!this.upload_img || !this.form.persons) {
					uni.showToast({
						title: "请上传巡检内容和填写巡检人员！",
						icon: "none",
						duration: 3000,
					});
					return;
				}

				let _this = this;
				let count = 0;
				for (let i = 0; i < this.upload_img.length; i++) {
					uni.uploadFile({
						url: "https://www.cd-dxd.com/file/uploadFile",
						filePath: this.upload_img[i],
						name: 'file',
						header: {
							"Content-Type": "multipart/form-data"
						},
						success(res) {
							let fileId = JSON.parse(res.data).data;
							_this.fileEidStr += fileId + ",";
							//console.log(_this.fileEidStr)
							count++;
							if (count == _this.upload_img.length) {
								_this.form.fileId = _this.fileEidStr;
								_this.form.persons = _this.form.persons.replace("，", ",");
								_this.form.day = new Date().toISOString() //???
								_this.form.inspection_id = _this.eventId
								_this.form.siteName = _this.siteName
								addNewDailyInspection(_this.form).then((res) => {
									if (res.code == 200) {
										uni.showToast({
											title: "添加日检查记录成功",
											icon: "none",
											duration: 3000,
										});
										setTimeout(function() {
											uni.redirectTo({
												url: `/pages/patrol/patrolDetail?name=${_this.siteName}`
											});
										}, 1000)
									}
								});
							}
						},
						fail(err) {
							//console.log('err:', err);
							count++;
						}
					});
				}
			},
			reload() {
				this.$nextTick(() => {
					this.getSiteData();
				})
			},
			reload2() {
				this.$nextTick(() => {
					this.passTask(this.currentParent, this.currentItem, 1);
					this.eventId = null;
					this.hasAttendanceFlag = false;
					this.checkDataFlag = false;
					this.taskDetail();
				})
			},
			subTaskAddHandler() {
				if (!this.eventId || !this.hasAttendanceFlag) {
					uni.showToast({
						title: "请开始任务及巡检后开始操作！",
						icon: "none",
						duration: 3000,
					});
					return;
				}
				let subTaskItem = {
					eventId: this.eventId,
					siteName: this.siteName,
					jobStatus: 2,
					systemId: this.taskItem.systemId,
					systemName: this.taskItem.systemName,
					jobId: this.subTask.jobId,
					jobName: this.subTask.jobName,
					values: this.subTask.listValue,
				};
				completeSubTask(subTaskItem).then((res) => {
					if (res.code == 200) {
						uni.showToast({
							title: "该任务已完成",
							icon: "success",
							duration: 3000,
						});
					}
				});
			},
			// 开始巡检
			/* beginInspectionHandler() {
				let beginInsObj = {
					checkPerson: this.$store.state.user.name,
					startTime: new Date().toISOString(),
					siteName: this.siteName,
				};
				beginInspection(beginInsObj).then((res) => {
					if (res.code == 200) {
						uni.showToast({
							title: "任务已开始！",
							icon: "success",
							duration: 3000,
						});
						this.eventId = res.msg;
					}
				});
			}, */
			// 巡检打卡开始
			attendanceHandler() {
				let attendanceObj = {
					person: this.$store.state.user.name,
					beginTime: new Date().toISOString(),
					siteName: this.siteName,
					taskType: "1",
					eventId: this.eventId,
				};
				attendance(attendanceObj).then((res) => {
					if (res.code == 200) {
						uni.showToast({
							title: "本次巡检开始！",
							icon: "success",
							duration: 3000,
						});
						this.hasAttendanceFlag = true;
					}
				});
				// let obj = {};
				// obj.person = this.$store.state.user.name;
				// obj.beginTime = new Date().toISOString();
				// obj.taskType == "1";
				// obj.siteName = this.select_site;
				// attendance(obj).then((res) => {
				//   this.eventId = res.data;
				//   this.$message.success("上班打卡成功");
				//   this.hasAttendanceFlag = true;
				//   this.isInspecting = true;
				// });
			},
			// 巡检结束打卡
			leaveAttendanceHandler() {
				let obj = {};
				obj.eventId = this.eventId;
				obj.endTime = new Date().toISOString();
				obj.siteName = this.siteName;
				obj.person = this.$store.state.user.name;
				leaveAttendance(obj).then((res) => {
					uni.showToast({
						title: "本次巡检结束！",
						icon: "success",
						duration: 3000,
					});
				});
			},
			/* dateFormat(time) {
				let date = new Date(time);
				let year = date.getFullYear();
				// 在日期格式中，月份是从0开始的，因此要加0，使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// 拼接
				return year + month + day + hours + minutes + seconds;
				// return year + "-" + month + "-" + day;
			}, */

			// 查询站点数据和站点检查内容
			async taskDetail() {
				// 获取任务时间段
				let selectTime = await getSiteTime(this.siteName);
				if (selectTime.data) {
					selectTime.data.forEach((item) => {
						// 判断当前时间是否在合同时间范围内
						if (
							new Date(item.begin) <= new Date() &&
							new Date().getTime() <= new Date(item.end).getTime() + 86399999
						) {
							this.select_time = item.begin + "--" + item.end;
						}
					});
					// 如果当前时间不在合同期间内,则取上一次任务时间段
					/* if (!this.select_time) {
						selectTime.data.forEach((item) => {
							// 判断当前时间是否在合同时间范围内
							if (new Date(item.end) <= new Date()) {
								this.select_time = item.begin + "--" + item.end;
							}
						});
					} */
					if (this.select_time) {
						// 获取巡检id 和已完成任务列表
						let p1 = await checkSiteMaintenance(this.siteName);
						// 暂无巡检记录
						if (p1.data == false) {
							// 把对应数据还原到初始状态
							this.eventId = undefined;
							this.finishTaskList = [];
							// 获取巡检任务
							let p2 = await getSiteTaskList(
								this.siteName,
								this.select_time.slice(0, 10),
								this.select_time.slice(-10)
							);
							this.taskList = p2.data;
							this.taskList.forEach((item) => {
								item.jobs.forEach((item2) => {
									this.$set(item2, "finish", -1);
									// 计算当前任务完成次数比例
									item2.frequency = zhDigitToArabic(item2.frequency.slice(2, 3));
									item2.percentage = `${item2.completedCount}/${item2.frequency}`;
									if (item2.frequency <= item2.completedCount)
										item2.totalFinish = true;
								});
							});
						} else {
							// 正在巡检
							this.eventId = p1.data.eid;
							this.finishTaskList = p1.data.completes;
							// 获取站点任务列表
							let p2 = await getSiteTaskList(
								this.siteName,
								this.select_time.slice(0, 10),
								this.select_time.slice(-10)
							);
							this.taskList = p2.data;
							this.taskList.forEach((item) => {
								item.jobs.forEach((item2) => {
									// item2.finish = false;
									this.$set(item2, "finish", -1);
									// 计算当前任务完成次数比例
									item2.frequency = zhDigitToArabic(item2.frequency.slice(2, 3));
									item2.percentage = `${item2.completedCount}/${item2.frequency}`;
									if (item2.frequency <= item2.completedCount)
										item2.totalFinish = true;
									if (this.finishTaskList !== false) {
										this.finishTaskList.forEach((item3) => {
											if (item3.jobId == item2.jobId) {
												if (item3.jobStatus == 0) {
													this.$set(item2, "finish", 0);
												} else if (item3.jobStatus == 1) {
													this.$set(item2, "finish", 1);
												}
												//  else if (item3.jobStatus == 2) {
												//   this.$set(item2, "finish", 2);
												// }
												this.$set(item2, "listValue", item3.values);
											}
										});
									}
								});
							});
						}
					} else {
						// 没有合同的话 人物列表就为空
						this.taskList = [];
					}
				}
				// 获取站点数据
				getSiteData(this.siteName).then((res) => {
					if (res.code == 200) {
						this.siteData = res.data;
					}
				});
				// 获取资料上传数据
				if (this.eventId) {
					getCheckDataByInspection(this.eventId).then((res) => {
						if (res.code == 200) {
							if (res.data) {
								this.uploadContent = res.data.content;
								this.check_flag = true;
								this.checkDataFlag = true;
								/* if (res.data.fileEid) {
									this.checkImg = res.data.fileEid.split(",").slice(0, -1);
									this.checkImg.forEach((item) => {
										item = `http://localhost:8080/img/${item}`;
									});
								} */
							}
						}
					});
				}
				// 判断今天是否已打卡
				hasAttendance(this.eventId, this.$store.state.user.name).then((res) => {
					if (res.code == 200) {
						if (res.data.length != 0 && this.eventId) {
							// 今日已打卡
							this.hasAttendanceFlag = true;
						} else {
							this.hasAttendanceFlag = false;
						}
					}
				});
			},
			// 任务正常
			passTask(parent, item, jobStatus = 0) {
				if (!this.eventId || !this.hasAttendanceFlag) {
					uni.showToast({
						title: "请开始任务及巡检后开始操作！",
						icon: "none",
						duration: 3000,
					});
					return;
				}
				let obj = {};
				obj.jobId = item.jobId;
				obj.jobName = item.jobName;
				obj.systemId = parent.systemId;
				obj.systemName = parent.systemName;
				obj.jobStatus = jobStatus;
				obj.eventId = this.eventId;
				obj.siteName = this.siteName;
				obj.finishTime = new Date().toISOString();
				obj.values = [];
				completeTask([obj]).then((res) => {
					if (res.code == 200) {
						uni.showToast({
							title: "该任务已完成",
							icon: "success",
							duration: 3000,
						});
						this.$set(item, "finish", jobStatus);
						item.completedCount++;
						item.percentage = `${item.completedCount}/${item.frequency}`;
					}
				});
			},
			openAddSubTaskDialog(item, items) {
				this.taskItem = item;
				this.subTask = items;
				if (this.subTask.listValue) {
					this.listV = this.subTask.listValue;
				} else {
					this.listV = []
				}
				this.$refs.popup.open();
			},
			/* open(e) {
				this.currentdata = e
				//this.$refs.popup.open()
			}, */
			goUpload() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: `/pages/patrol/upload?eventId=${this.eventId}`
				})
			},
			goReport(parent, item) {
				if (!this.eventId || !this.hasAttendanceFlag) {
					uni.showToast({
						title: "请开始任务及巡检后开始操作！",
						icon: "none",
						duration: 3000,
					});
					return;
				}
				this.currentItem = item;
				this.currentParent = parent;
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: `/pages/report/patrolReport?name=${this.siteName}&eventId=${this.eventId}&type=${this.type}`
				})
			},
			// 完成巡检
			/* finishInspection() {
				let _this = this;
				// 一次完整的巡检需要巡检资料  完成至少一项任务
				let taskFlag = false;
				this.taskList.forEach((item) => {
					item.jobs.forEach((item2) => {
						if (item2.finish != -1) {
							taskFlag = true;
							return;
						}
					});
					if (taskFlag) return;
				});
				// check_flag
				if (taskFlag) {
					finishInspection(this.eventId).then((res) => {
						if (res.code == 200) {
							uni.showToast({
								title: "巡检任务已完成！",
								icon: "success",
								duration: 3000,
							});
							setTimeout(function() {
								_this.eventId = null;
								_this.hasAttendanceFlag = false;
								_this.checkDataFlag = false;
								_this.taskDetail();
							}, 1000)
						}
					});
				} else {
					uni.showToast({
						title: "请完成至少一项任务！",
						icon: "none",
						duration: 3000,
					});
				}

			} */
			/* goPatrol() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/patrol/patroling'
				})
			}, */
		}
	}
</script>

<style lang="scss">
	.btndiv {
		background-color: white;
		display: flex;
		margin: 0 3%;
		margin-top: 3%;
		padding-top: 3%;
		padding-bottom: 2%;
		padding-left: 5%;
	}

	.div1 {
		width: 92%;
		margin: auto;
	}

	.btn {
		margin-right: 3%;
		margin-bottom: 1%;
	}

	/* .content {
		font-size: 26rpx;
		text-align: center;
		color: #767676;
		padding: 2% 0;
	} */
	.content {
		font-size: 26rpx;
		color: #767676;
		padding: 2% 0 2% 5%;
		//display: flex;
		// justify-content: space-between;
	}

	.u-page__tag-item {
		display: flex;
		flex-wrap: wrap;
	}

	/* .pop {
		background-color: #f7f7f7;
		width: 600rpx;
		height: auto;
		border-radius: 30rpx;
		padding: 5%;
	} */
</style>