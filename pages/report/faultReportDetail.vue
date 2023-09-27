<template>
	<view style="padding-bottom: 5%;">
		<uni-card title="设备列表">
			<view class="u-page__tag-item">
				<view v-for="(item, index) in deviceList" :key="index" style="margin-right: 2%;margin-bottom: 2%;">
					<u-tag :text="item.deviceName" :plain="!item.checked" :name="index"
						@click="selectDeviceHandler(item)">
					</u-tag>
				</view>
			</view>
		</uni-card>
		<uni-card title="故障上报">
			<uni-forms labelWidth="140rpx">
				<uni-forms-item label="故障现象">
					<uni-easyinput v-model="faultDesc" type="textarea" placeholder="请输入故障现象" />
				</uni-forms-item>
				<uni-forms-item label="故障设备">
					<uni-easyinput v-model="faultEquipment" placeholder="自定义故障设备" type="textarea" />
				</uni-forms-item>
				<uni-forms-item label="资料上传">
					<uni-file-picker limit="9" title="最多选择9张图片" mode="grid" file-mediatype="image" @select="select"
						:sizeType="['compressed']">
					</uni-file-picker>
				</uni-forms-item>
				<view style="display: flex;justify-content: center;">
					<button class="bg-blue" @click="uploadFault1" size="mini">故障上报</button>
					<button class="bg-blue" @click="uploadFault2" size="mini">故障上报并维修</button>
				</view>
			</uni-forms>
		</uni-card>
		<view>
			<uni-popup ref="inputDialog" type="dialog" :model="repairFaultForm">
				<uni-popup-dialog ref="inputClose" mode="input" title="维修完成" @confirm="currentFinishEnter">
					<uni-forms label-position="top">
						<uni-forms-item label="维修设备" required>
							<uni-easyinput v-model="repairFaultForm.partName" :styles="styles" type="textarea" />
						</uni-forms-item>
						<uni-forms-item label="维修金额">
							<uni-easyinput v-model="repairFaultForm.repairAmount" :styles="styles" />
						</uni-forms-item>
						<uni-forms-item label="备注">
							<uni-easyinput v-model="repairFaultForm.remark" :styles="styles" />
						</uni-forms-item>
					</uni-forms>
				</uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		reqGetSiteDevice,
		exportFault,
		completeFaultCurrent
	} from '@/api/task.js';
	export default {
		data() {
			return {
				styles: {
					color: '#2979FF',
					borderColor: '#2979FF'
				},
				deviceList: [],
				faultDesc: "",
				faultEquipment: "",
				selectDeviceList: [],
				upload_img_list: [],
				fileEidStr: '',
				faultEventid: "",
				type: "",
				repairFaultForm: {
					partName: "",
					repairAmount: "",
					remark: "",
				},
			}
		},
		onLoad(e) {
			this.siteName = e.name;
			this.type = e.type;
		},
		mounted() {
			this.changeSite();
		},
		methods: {
			// 完成维修
			currentFinishEnter() {
				//const _this = this;
				let obj = {
					eventId: this.faultEventid,
					partName: this.repairFaultForm.partName,
					remark: this.repairFaultForm.remark,
					repairAmount: this.repairFaultForm.repairAmount,
					repairPerson: this.$store.state.user.name,
					siteName: this.siteName,
					uploadTime: new Date().toISOString(), //???
				};
				completeFaultCurrent(obj).then((res) => {
					if (res.code == 200) {
						uni.showToast({
							title: "维修完成",
							icon: "success",
							duration: 3000,
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					}
				});
			},
			// 上报故障
			uploadFault1() {
				this.repairFaultForm.partName = this.faultEquipment;
				if (this.upload_img_list.length > 0) {
					let _this = this;
					let count = 0;
					for (let i = 0; i < this.upload_img_list.length; i++) {
						uni.uploadFile({
							url: "https://www.cd-dxd.com/file/uploadFile",
							filePath: this.upload_img_list[i],
							name: 'file',
							header: {
								"Content-Type": "multipart/form-data"
							},
							success(res) {
								let fileId = JSON.parse(res.data).data;
								_this.fileEidStr += fileId + ",";
								count++;
								if (count == _this.upload_img_list.length) {
									let obj = {
										taskSource: 3,
										reportPerson: _this.$store.state.user.name,
										fileEid: _this.fileEidStr || null,
										siteName: _this.siteName,
										siteType: _this.type,
										faultAppear: _this.faultEquipment,
										faultDesc: _this.faultDesc,
									};
									exportFault(obj).then((res) => {
										if (res.code = 200) {
											_this.faultEventid = res.data;
											uni.showToast({
												title: "故障上报成功",
												icon: "success",
												duration: 3000,
											});
											setTimeout(function() {
												uni.navigateBack({
													delta: 1
												})
											}, 1000)
										}
									});
								}
							},
							fail(err) {
								count++;
							}
						});
					}
				} else {
					let obj = {
						taskSource: 3,
						reportPerson: this.$store.state.user.name,
						siteName: this.siteName,
						siteType: this.type,
						faultAppear: this.faultEquipment,
						faultDesc: this.faultDesc,
					};
					exportFault(obj).then((res) => {
						if (res.code = 200) {
							this.faultEventid = res.data;
							uni.showToast({
								title: "故障上报成功",
								icon: "success",
								duration: 3000,
							});
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					});
				}
			},
			uploadFault2() {
				this.repairFaultForm.partName = this.faultEquipment;
				if (this.upload_img_list.length > 0) {
					let _this = this;
					let count = 0;
					for (let i = 0; i < this.upload_img_list.length; i++) {
						uni.uploadFile({
							url: "https://www.cd-dxd.com/file/uploadFile",
							filePath: this.upload_img_list[i],
							name: 'file',
							header: {
								"Content-Type": "multipart/form-data"
							},
							success(res) {
								let fileId = JSON.parse(res.data).data;
								_this.fileEidStr += fileId + ",";
								count++;
								if (count == _this.upload_img_list.length) {
									let obj = {
										taskSource: 3,
										reportPerson: _this.$store.state.user.name,
										fileEid: _this.fileEidStr || null,
										siteName: _this.siteName,
										siteType: _this.type,
										faultAppear: _this.faultEquipment,
										faultDesc: _this.faultDesc,
									};
									exportFault(obj).then((res) => {
										if (res.code = 200) {
											_this.faultEventid = res.data;
											uni.showToast({
												title: "故障上报成功",
												icon: "success",
												duration: 3000,
											});
											//let _this = this;
											setTimeout(function() {
												_this.$refs.inputDialog.open()
											}, 1000)
										}
									});
								}
							},
							fail(err) {
								count++;
							}
						});
					}
				} else {
					let obj = {
						taskSource: 3,
						reportPerson: this.$store.state.user.name,
						siteName: this.siteName,
						siteType: this.type,
						faultAppear: this.faultEquipment,
						faultDesc: this.faultDesc,
					};
					exportFault(obj).then((res) => {
						if (res.code = 200) {
							this.faultEventid = res.data;
							uni.showToast({
								title: "故障上报成功",
								icon: "success",
								duration: 3000,
							});
							let _this = this;
							setTimeout(function() {
								_this.$refs.inputDialog.open()
							}, 1000)
						}

					});
				}
			},
			select(e) {
				this.upload_img_list = e.tempFilePaths;
			},
			// 选中设备
			selectDeviceHandler(item) {
				item.checked = !item.checked;
				let index = this.selectDeviceList.findIndex((a) => a.id == item.id);
				if (index != -1) {
					this.selectDeviceList.splice(index, 1);
				} else {
					this.selectDeviceList.push(item);
				}
				this.faultEquipment = this.selectDeviceList
					.map((x) => x.deviceName)
					.join(",");
			},
			/* checkboxClick(name) {
				this.deviceList[name].checked = !this.deviceList[name].checked
			}, */
			compare(a, b) {
				if (a.deviceName.length < b.deviceName.length)
					return -1;
				if (a.deviceName.length > b.deviceName.length)
					return 1;
				return 0;
			},
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
		}
	}
</script>

<style lang="scss">
	.u-page__tag-item {
		display: flex;
		flex-wrap: wrap;
	}
</style>