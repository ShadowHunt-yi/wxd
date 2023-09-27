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
			<view style="color: white;font-size: 55rpx;margin-left: 10%;margin-top: 6%;">IP地址详情</view>
		</view>
		<!-- 表单 -->
		<view class="center-div">
			<uni-forms labelWidth="160rpx">
				<uni-forms-item label="IP地址">
					<uni-easyinput type="text" v-model="data1.ip" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="使用人员">
					<uni-easyinput type="text" v-model="data1.adminName" />
				</uni-forms-item>
				<uni-forms-item label="联系电话">
					<uni-easyinput type="text" v-model="data1.adminTel" />
				</uni-forms-item>
				<uni-forms-item label="地区">
					<uni-easyinput type="text" v-model="data1.city" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="使用设备">
					<uni-easyinput type="text" v-model="data1.equipment" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="使用期限">
					<uni-easyinput type="text" v-model="data1.timeLimit" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="站点名称">
					<uni-easyinput type="text" v-model="data1.siteName" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="申请人员">
					<uni-easyinput type="text" v-model="data1.applicant" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="申请时间">
					<uni-easyinput type="text" v-model="data1.applyTime" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="备注">
					<uni-easyinput type="textarea" v-model="data1.remark" />
				</uni-forms-item>
				<view style="display: flex;">
					<button class="bg-blue" @click="reviseIp" size="mini">修改</button>
					<button type="warn" @click="openDeactive" size="mini">停用</button>

				</view>
			</uni-forms>
		</view>
		<view>
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog cancelText="取消" confirmText="确定" title="提示" content="此操作将停用该IP，是否继续？" type="error" @confirm="deactive">
				</uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		getDetail,
		stopIp,
		reviseIp
	} from '@/api/ip.js'
	export default {
		data() {
			return {
				ipName: '',
				data1: [],
			}
		},
		onLoad(e) {
			this.ipName = e.ip
		},
		mounted() {
			this.getIpDetail();
		},
		methods: {
			getIpDetail() {
				getDetail(this.ipName).then(res => {
					this.data1 = res.data
					if (this.data1.timeLimit == 0) {
						this.data1.timeLimit = '短期'
					} else if (this.data1.timeLimit == 1) {
						this.data1.timeLimit = '长期'
					}
				});
			},
			//修改
			reviseIp() {
				if (this.data1.timeLimit == '短期') {
					this.data1.timeLimit = 0
				} else if (this.data1.timeLimit == '长期') {
					this.data1.timeLimit = 1
				}
				if (this.$store.state.user.roles.includes('company') || this.$store.state.user.roles.includes('admin')) {
					reviseIp(this.data1).then(response => {
						response.data = this.data1;
						uni.showToast({
							title: "修改成功!",
							icon: "success",
							duration: 3000,
						});
					})
				} else {
					uni.showToast({
						title: "该用户无权限!",
						icon: "error",
						duration: 3000,
					});
				}
				if (this.data1.timeLimit == 0) {
					this.data1.timeLimit = '短期'
				} else if (this.data1.timeLimit == 1) {
					this.data1.timeLimit = '长期'
				}
			},
			openDeactive() {
				this.$refs.alertDialog.open()
			},
			//停用
			deactive() {
				if (this.$store.state.user.roles.includes('company') || this.$store.state.user.roles.includes('admin')) {
					stopIp(this.ipName);
					uni.showToast({
						title: "停用成功!",
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
						title: "该用户无权限!",
						icon: "error",
						duration: 3000,
					});
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