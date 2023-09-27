<template>
	<view style="padding-bottom: 5%;">
		<uni-card title="站点数据">
			<u-cell-group v-if="siteData.siteType == 1 || siteData.siteType == 3">
				<u-cell icon="account" title="名称" :value="siteData.siteName"></u-cell>
				<!-- <u-cell>
					<view slot="title" class="u-slot">
						<u-icon name="coupon"></u-icon>
						<view class="u-slot1">类型</view>
						<view class="u-slot2">{{siteData.siteType}}</view>
					</view>
					<view slot="value" class="u-slot">
						<u-icon name="integral"></u-icon>
						<view class="u-slot1">监测设备等级</view>
						<view class="u-slot2">{{siteData.siteLevel}}</view>
					</view>
				</u-cell> -->
				<u-cell icon="coupon" title="类型" :value="siteData.siteType"></u-cell>
				<u-cell icon="integral" title="监测设备等级" :value="siteData.siteLevel"></u-cell>
				<u-cell icon="map" title="地区" :value="siteData.region"></u-cell>
				<u-cell icon="map" title="详细地址" :value="siteData.location"></u-cell>
				<u-cell icon="map" title="地址类型" :value="siteData.locationType"></u-cell>
				<u-cell icon="map" title="经纬度" :value="siteData.coordinate"></u-cell>
				
				<!-- <u-cell icon="coupon" title="机房类型" :value="siteData.machineRoomType"></u-cell>
				<u-cell icon="coupon" title="机房面积" :value="siteData.machineRoomArea"></u-cell>
				<u-cell icon="coupon" title="占地面积" :value="siteData.areaCovered"></u-cell>
				<u-cell icon="coupon" title="房屋面积" :value="siteData.houseArea"></u-cell>
				<u-cell icon="coupon" title="有无院墙" :value="siteData.hasWall"></u-cell> -->
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
		</uni-card>
		<uni-card title="检查项目">
			<uni-forms labelWidth="140rpx" :model="checkForm">
				<!-- <uni-forms-item label="内容上传">
					<uni-file-picker limit="9" title="最多选择9张图片" mode="grid" file-mediatype="image" @select="select"
						:sizeType="['compressed']">
					</uni-file-picker>
				</uni-forms-item> -->
				<uni-forms-item label="检查项目">
					<uni-easyinput v-model="checkForm.taskList" placeholder="请输入检查项目" />
				</uni-forms-item>
				<uni-forms-item label="检查内容">
					<uni-easyinput v-model="checkForm.checkResult" type="textarea" placeholder="请输入检查内容" />
				</uni-forms-item>
				<view style="margin-left: 65%;" v-if="$store.state.user.roles.includes('visitor')"><button
						class="bg-blue" @click="pop1" size="mini">添加检查记录</button>
				</view>
				<view style="margin-left: 65%;" v-else><button class="bg-blue" @click="addCheckRecoed"
						size="mini">添加检查记录</button>
				</view>
				<u-divider text="检查记录" lineColor="#000000"></u-divider>
				<uni-table ref="table" :border="true" emptyText="暂无检查记录">
					<uni-tr>
						<uni-th align="center" width="85">序号</uni-th>
						<uni-th align="center" width="220">检查项目</uni-th>
						<uni-th align="center" width="280">检查内容</uni-th>
						<uni-th width="204" align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in checkData" :key="index">
						<uni-td align="center">{{ index+1 }}</uni-td>
						<uni-td align="center">
							<uni-easyinput v-model="item.taskList" :disabled="disabledFlag" type="textarea" />
							<!-- {{ item.taskList }} -->
						</uni-td>
						<uni-td align="center">
							<uni-easyinput v-model="item.checkResult" :disabled="disabledFlag" type="textarea" />
							<!-- {{ item.checkResult }} --></uni-td>
						<uni-td align="center">
							<!-- <button class="uni-button" size="mini" type="warn" @click="deleteItem(item.id)">删除</button> -->
							<view class="uni-group">
								<button size="mini" class="bg-blue" @click="this.disabledFlag=0"
									v-if="disabledFlag">编辑</button>
								<button size="mini" class="bg-blue" v-else @click="this.disabledFlag=1">保存</button>
								<button size="mini" type="warn" @click="deleteItem(item.id)">删除</button>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
				<u-divider :dot="true" lineColor="#000000"></u-divider>
				<uni-forms-item label="资料上传">
					<uni-file-picker limit="9" title="最多选择9张图片" mode="grid" file-mediatype="image" @select="select"
						:sizeType="['compressed']">
					</uni-file-picker>
				</uni-forms-item>
				<button class="bg-blue" @click="pop1" v-if="$store.state.user.roles.includes('visitor')">完成检查</button>
				<button class="bg-blue" @click="exportDailyChceck" v-else>完成检查</button>
			</uni-forms>
		</uni-card>
	</view>
</template>

<script>
	import {
		getSiteData,
		getSiteTime,
		getSiteTaskList,
		reqGetSiteDevice,
		reqDailyCheck,
	} from '@/api/task.js';
	import {
		parseTime
	} from "@/utils/ruoyi.js";
	export default {
		data() {
			return {
				disabledFlag: 1,
				siteName: "",
				select_time: null,
				taskList: [],
				siteData: null,
				deviceList: [],
				checkForm: {
					taskList: "",
					checkResult: "",
				},
				selectTaskList: [],
				checkData: [],
				upload_img_check: [],
				fileEidStr: '',
			}
		},
		onLoad(e) {
			this.siteName = e.name;
		},
		mounted() {
			this.changeSite();
		},
		methods: {
			pop1() {
				uni.showToast({
					title: "游客账号只允许查看操作",
					icon: "none",
					duration: 3000,
				});
			},
			select(e) {
				this.upload_img_check = e.tempFilePaths;
			},
			// 日常检查确定
			exportDailyChceck() {
				let checkDataAfter = [];
				this.checkData.forEach((item, index) => {
					checkDataAfter[index] = {
						name: item.taskList,
						value: item.checkResult,
					};
					// checkDataAfter[index].name = item.taskList;
					// checkDataAfter[index].value = item.checkResult;
				});
				let fileId = "";
				// 有上传文件
				if (this.upload_img_check.length > 0) {
					let _this = this;
					let count = 0;
					for (let i = 0; i < this.upload_img_check.length; i++) {
						uni.uploadFile({
							url: "https://www.cd-dxd.com/file/uploadFile",
							filePath: this.upload_img_check[i],
							name: 'file',
							header: {
								"Content-Type": "multipart/form-data"
							},
							success(res) {
								let fileId = JSON.parse(res.data).data;
								_this.fileEidStr += fileId + ",";
								count++;
								if (count == _this.upload_img_check.length) {
									let ans = {
										beginTime: parseTime(new Date()), //Date.parse(new Date()),//???
										checkPerson: _this.$store.state.user.name,
										fileId: _this.fileEidStr,
										siteName: _this.siteName,
										listItem: checkDataAfter,
									};
									reqDailyCheck(ans).then((r) => {
										if (r.code == 200) {
											uni.showToast({
												title: "日常检查成功",
												icon: "success",
												duration: 3000,
											});
											setTimeout(function() {
												uni.redirectTo({
													url: `/pages/patrol/dailyPatrolDetail?name=${_this.siteName}`
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
				} else {
					let ans = {
						beginTime: parseTime(new Date()), // Date.parse(new Date()), //???
						checkPerson: this.$store.state.user.name,
						siteName: this.siteName,
						listItem: checkDataAfter,
					};
					reqDailyCheck(ans).then((r) => {
						if (r.code == 200) {
							uni.showToast({
								title: "日常检查成功",
								icon: "success",
								duration: 3000,
							});
							let _this = this;
							setTimeout(function() {
								uni.redirectTo({
									url: `/pages/patrol/dailyPatrolDetail?name=${_this.siteName}`
								});
							}, 1000)
						}
					});
				}
			},
			deleteItem(id) {
				let index = this.checkData.findIndex((item) => item.id == id);
				if (index != -1) this.checkData.splice(index, 1);
			},
			// 添加检查记录
			addCheckRecoed() {
				if (!this.checkForm.taskList || !this.checkForm.checkResult) return;
				let obj = JSON.parse(JSON.stringify(this.checkForm));
				obj.id = "";
				let str = 'ABCDEFGHIJKIMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				for (let i = 0; i < 11; i++) {
					obj.id += str.charAt(Math.floor(Math.random() * str.length));
				};
				obj.isChecked = false;
				this.checkData.push(obj);
				this.disabledFlag = 1;
				//console.log(this.checkData)
				this.checkForm = {
					taskList: "",
					checkResult: "",
				};
				this.checkForm.taskList = "";
				this.checkForm.checkResult = "";
				this.selectTaskList = [];
				this.taskList.forEach((item) => {
					item.jobs.forEach((items) => {
						items.isChecked = false;
					});
				});
			},
			// 初始化所有的数据
			async changeSite() {
				this.select_time = "";
				// 获取任务时间段
				let selectTime = await getSiteTime(this.select_site);
				if (selectTime.data && selectTime.data.length != 0) {
					selectTime.data.forEach((item) => {
						// 判断当前时间是否在合同时间范围内
						if (
							new Date(item.begin) <= new Date() &&
							new Date().getTime() <= new Date(item.end).getTime() + 86399999
						) {
							this.select_time = item.begin + "--" + item.end;
						}
					});

					if (this.select_time) {
						let p2 = await getSiteTaskList(
							this.select_time.slice(0, 10),
							this.select_time.slice(-10)
						);
						p2.data.forEach((item) => {
							item.jobs.forEach((items) => {
								items.isChecked = false;
							});
						});
						this.taskList = p2.data;
					} else {
						this.taskList = [];
					}
				} else {
					this.taskList = [];
				}
				// 获取站点数据
				getSiteData(this.siteName).then((res) => {
					if (res.code == 200) {
						this.siteData = res.data;
					}
				});

				// 获取站点设备
				let siteName = this.siteName;
				reqGetSiteDevice({
					siteName
				}).then((res) => {
					if (res.code == 200) {
						this.deviceList = res.data;
						// this.siteCount = res.data.length;
					}
				});
			},
		}
	}
</script>

<style>
	.uni-group {
		display: flex;
		align-items: center;
	}

	/* .u-slot {
		display: flex;
	}

	.u-slot1 {
		margin-left: 4%;
		margin-right: 10%;
	}

	.u-slot2 {
		color: #606266;
	} */
</style>