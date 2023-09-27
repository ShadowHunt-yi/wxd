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
			<view style="color: white;font-size: 55rpx;margin-left: 10%;margin-top: 6%;">IP地址申请</view>
		</view>
		<!-- 表单 -->
		<view class="center-div">
			<uni-forms labelWidth="160rpx">
				<uni-forms-item label="订单号">
					<uni-easyinput type="text" v-model="ipOrderId" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="IP地址">
					<uni-easyinput type="text" v-model="ipName" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="使用人员" required>
					<uni-easyinput type="text" v-model="adminName" placeholder="请输入使用人员" />
				</uni-forms-item>
				<uni-forms-item label="联系电话">
					<uni-easyinput type="number" v-model="adminTel" placeholder="请输入使用人员联系电话" />
				</uni-forms-item>
				<uni-forms-item label="使用设备" required>
					<uni-easyinput type="text" v-model="equipment" placeholder="请输入使用设备" />
				</uni-forms-item>
				<uni-forms-item label="地区" required>
					<uni-data-select :localdata="cityTree" placeholder="请选择区域" :clear="false" v-model="city">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="站点名称" required>
					<uni-data-select :localdata="allSiteName" placeholder="请选择站点名称" :clear="false" v-model="siteName">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="使用期限" required>
					<uni-data-checkbox :localdata="option" v-model="timeLimit"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="申请人员">
					<uni-easyinput type="text" v-model="applicant" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="备注">
					<uni-easyinput type="textarea" v-model="remark" />
				</uni-forms-item>
				<button class="bg-blue" @click="applyOne">申请</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
		getAllSiteData,
		applyOne,
		acceptOrder
	} from '@/api/ip.js'
	export default {
		data() {
			return {
				remark: "",
				checkUser: '',
				timeLimit: null,
				ipName: '',
				ipOrderId: '',
				equipment: '',
				applicant: '',
				adminName: '',
				adminTel: '',
				city: '',
				siteName: '',
				allSiteName: [],
				option: [{
					text: '短期',
					value: 0
				}, {
					text: '长期',
					value: 1
				}],
				cityTree: [{
					text: "锦江区",
					value: "锦江区"
				}, {
					text: "青羊区",
					value: "青羊区"
				}, {
					text: "金牛区",
					value: "金牛区"
				}, {
					text: "武侯区",
					value: "武侯区"
				}, {
					text: "成华区",
					value: "成华区"
				}, {
					text: "龙泉驿区",
					value: "龙泉驿区"
				}, {
					text: "青白江区",
					value: "青白江区"
				}, {
					text: "新都区",
					value: "新都区"
				}, {
					text: "温江区",
					value: "温江区"
				}, {
					text: "金堂县",
					value: "金堂县"
				}, {
					text: "双流县",
					value: "双流县"
				}, {
					text: "郫都区",
					value: "郫都区"
				}, {
					text: "大邑县",
					value: "大邑县"
				}, {
					text: "蒲江县",
					value: "蒲江县"
				}, {
					text: "新津县",
					value: "新津县"
				}, {
					text: "都江堰市",
					value: "都江堰市"
				}, {
					text: "彭州市",
					value: "彭州市"
				}, {
					text: "邛崃市",
					value: "邛崃市"
				}, {
					text: "崇州市",
					value: "崇州市"
				}, {
					text: "其它区",
					value: "其它区"
				}],
			}
		},

		onLoad(e) {
			this.ipName = e.ip;
			this.applicant = this.$store.state.user.name;
		},
		mounted() {
			let str = 'ABCDEFGHIJKIMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for (let i = 0; i < 11; i++) {
				this.ipOrderId += str.charAt(Math.floor(Math.random() * str.length));
			};
			this.getSite();
		},
		methods: {
			//获取所有站点信息
			getSite() {
				getAllSiteData().then((res) => {
					for (let i = 0; i < res.data.length; i++) {
						let obj = {
							value: res.data[i].siteName,
							text: res.data[i].siteName,
							type: res.data[i].siteType
						}
						this.allSiteName.push(obj)
					}
					console.log(this.allSiteName)
				})
			},
			//申请（确定）
			applyOne() {
				let obj = {
					ipOrderId: this.ipOrderId,
					ip: this.ipName,
					city: this.city,
					adminName: this.adminName,
					adminTel: this.adminTel,
					equipment: this.equipment,
					siteName: this.siteName,
					timeLimit: this.timeLimit,
					applicant: this.applicant,
					remark: this.remark
				};
				if (this.$store.state.user.roles.includes('company')) {
					applyOne(obj).then(response => {
						if (response.code == 200) {
							this.checkUser = this.$store.state.user.name
							if (obj.remark == '' || obj.remark == undefined) {
								obj.remark = '无'
							}
							acceptOrder(this.checkUser, obj.ipOrderId, obj.remark).then(res => {
								if (res.code == 200) {
									uni.showToast({
										title: "申请成功!",
										icon: "success",
										duration: 3000,
									});
									setTimeout(function() {
										var pages = getCurrentPages();
										var prePage = pages[pages.length - 2];
										uni.navigateBack({
											delta: 1,
											success: (event) => {
												prePage.$vm.reload();
											},
										})
									}, 1000)
								} else {
									uni.showToast({
										title: "错误!",
										icon: "error",
										duration: 3000,
									});
								}
							})
						} else {
							uni.showToast({
								title: "错误!",
								icon: "error",
								duration: 3000,
							});
						}
					})
				} else {
					applyOne(obj).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: "申请成功!",
								icon: "success",
								duration: 3000,
							});
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				}
			},
		},
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