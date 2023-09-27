<template>
	<view>
		<!-- 顶部蓝色块 -->
		<view class="top-div">
			<!-- logo -->
			<view style="display: flex;">
				<view style="margin-left: 2%;margin-top: 3%;">
					<image src="../../static/images/logo1.png" style="width: 60rpx;" mode="widthFix"></image>
				</view>
				<view style="margin-top: 3%;">
					<image src="../../static/images/logo2.png" style="width: 120rpx;" mode="widthFix"></image>
				</view>
			</view>
			<!-- 文字 -->
			<view style="color: white;font-size: 55rpx;margin-left: 10%;margin-top: 6%;">故障信息填报</view>
		</view>
		<!-- 表单 -->
		<view class="center-div">
			<uni-forms labelWidth="160rpx" :model="form">
				<!-- <uni-forms-item label="站点名称" required>
					<uni-easyinput :value="siteName" :disabled="true" :clearable="false" />
				</uni-forms-item> -->
				<!-- <uni-forms-item label="上报时间" required>
					<uni-easyinput v-model="time" :disabled="true" :clearable="false" />
				</uni-forms-item> -->
				<!-- <uni-forms-item label="故障等级" required>
					<uni-data-select :localdata="range" placeholder="请选择故障等级" :clear="false" v-model="level">
					</uni-data-select>
				</uni-forms-item> -->
				<uni-forms-item label="故障设备" required>
					<view>
						<view><uni-data-checkbox multiple :localdata="device" @change="change"
								v-if="!customizationDevice">
							</uni-data-checkbox></view>
						<view><uni-easyinput placeholder="请输入故障设备" v-model="equipment" v-if="customizationDevice" />
						</view>
						<view v-if="!customizationDevice"><button class="bg-blue" size="mini"
								style="margin-left: 57%;margin-top: 3%"
								@click="customizationDevice = !customizationDevice">自定义设备</button></view>
						<view v-if="customizationDevice"><button class="bg-blue" size="mini"
								style="margin-left: 63%;margin-top: 3%"
								@click="customizationDevice = !customizationDevice">选择设备</button></view>
					</view>
				</uni-forms-item>
				<uni-forms-item label="故障描述" required>
					<uni-easyinput type="textarea" placeholder="请描述故障" v-model="describe" />
				</uni-forms-item>
				<uni-forms-item label="故障图片" required>
					<uni-file-picker limit="9" title="最多选择9张图片" mode="grid" file-mediatype="image" @select="select">
					</uni-file-picker>
				</uni-forms-item>
				<button class="bg-blue" @click="uploadFault">提交</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
		exportFault,
		reqGetDeviceBySiteName
	} from '@/api/task.js'
	export default {
		data() {
			return {
				takeDeviceRemark: "",
				customizationDevice: false,
				describe: "",
				equipment: "",
				type: '',
				siteName: '',
				fileEidStr: '',
				userName: '',
				imageValue: [],
				tmp: [],
				tmp2: [],
				range: [{
						value: 1,
						text: "一级"
					},
					{
						value: 2,
						text: "二级"
					},
					{
						value: 3,
						text: "三级"
					},
				],
				/* device: [{
					text: '笔记本电脑',
					value: 1
				}, {
					text: '天线',
					value: 2
				}, {
					text: '主机',
					value: 3
				}], */
				device: [],
				//date: new Date().toISOString(),
			}
		},
		/* computed: {
			time() {
				return this.dateFormat(this.date)
			} 
		}, */
		onLoad(e) {
			this.siteName = e.name;
			this.userName = this.$store.state.user.name;
			this.type = e.type;
			this.getDevice();
		},
		/* mounted() {
			let _this = this;
			setInterval(function() {
				_this.date = Date.parse(new Date());
			}, 1000);
		}, */
		methods: {
			changeIt() {
				this.customizationDevice = !this.customizationDevice;
				this.equipment = "";
			},
			getDevice() {
				// 获取站点设备
				reqGetDeviceBySiteName(this.siteName).then((res) => {
					if (res.code == 200) {
						res.data.forEach(item => {
							this.device.push({
								value: item.id,
								text: item.deviceName,
							});
						})
						console.log(this.device)
					}
				});
			},
			change(e) {
				this.tmp = e.detail.data;
			},
			/* test(){
				console.log(this.tmp)
				this.tmp.forEach(item => {
					this.tmp2.push(item.text)
				})
				console.log(this.tmp2)
				this.equipment = this.tmp2.join(",");
				console.log(this.equipment) 
			}, */
			select(e) {
				let temp = e.tempFilePaths[0];
				this.imageValue.push(temp);
			},
			// 故障确认
			uploadFault() {
				let _this = this;
				if (this.tmp.length > 0) {
					this.tmp.forEach(item => {
						this.tmp2.push(item.text)
					})
					this.equipment = this.tmp2.join(",");
				}
				if (this.imageValue.length > 0) {
					let count = 0;
					for (let i = 0; i < this.imageValue.length; i++) {
						uni.uploadFile({
							url: "https://www.cd-dxd.com/file/uploadFile",
							filePath: this.imageValue[i],
							name: 'file',
							header: {
								"Content-Type": "multipart/form-data"
							},
							success(res) {
								let fileId = JSON.parse(res.data).data;
								_this.fileEidStr += fileId + ",";
								count++;
								if (count == _this.imageValue.length) {
									let obj = {
										taskSource: 3,
										reportPerson: _this.userName,
										fileEid: _this.fileEidStr || null,
										siteName: _this.siteName,
										siteType: _this.type,
										faultAppear: _this.equipment,
										faultDesc: _this.describe,
									};
									exportFault(obj).then((res) => {
										if (res.code == 200) {
											uni.showToast({
												title: "故障上报成功！",
												icon: "success",
												duration: 3000,
											});
											setTimeout(function() {
												uni.navigateBack({
													delta: 1,
												})
											}, 1000)
										}
									});
								}
							},
							fail(err) {
								console.log('err:', err);
								count++;
							}
						});
					}
				} else {
					let obj = {
						taskSource: 3,
						reportPerson: _this.userName,
						siteName: _this.siteName,
						siteType: _this.type,
						faultAppear: _this.equipment,
						faultDesc: _this.describe,
					};
					exportFault(obj).then((res) => {
						if (res.code == 200) {
							uni.showToast({
								title: "故障上报成功！",
								icon: "success",
								duration: 3000,
							});
							setTimeout(function() {
								uni.navigateBack({
									delta: 1,
								})
							}, 1000)
						}
					});
				}
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
				return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
				// return year + "-" + month + "-" + day;
			} */
		}
	}
</script>

<style>
	.top-div {
		width: 100%;
		height: 350rpx;
		background-color: #00539f;
	}

	.center-div {
		box-shadow: 0px 0px 10rpx rgb(205, 205, 205);
		border-radius: 10rpx;
		background-color: white;
		height: auto;
		width: 90%;
		position: absolute;
		top: 240rpx;
		left: 5%;
		padding: 3%;
	}
</style>