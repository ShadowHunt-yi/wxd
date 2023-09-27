<template>
	<view class="work-container">
		<!-- logo图 -->
		<view class="swiper-item">
			<image src="../../static/images/banner/banner.jpg" mode="widthFix" :draggable="false"></image>
		</view>

		<!-- 宫格组件 -->
		<uni-section title="运维管理" type="line">
			<view style="margin-bottom: 15rpx;">
				<uni-grid :column="5" :showBorder="false" :highlight="true">
					<uni-grid-item
						v-if="$store.state.user.roles.includes('admin')||$store.state.user.roles.includes('daiwei')">
						<view class="grid-item-box" @click="goPatrol">
							<uni-icons type="calendar-filled" size="30"></uni-icons>
							<text class="text">定期巡检</text>
						</view>
					</uni-grid-item>
					<uni-grid-item v-if="$store.state.user.roles.includes('admin')||$store.state.user.roles.includes('daiwei')
						||$store.state.user.roles.includes('visitor')">
						<view class="grid-item-box" @click="goDailyPatrol">
							<uni-icons type="flag-filled" size="30"></uni-icons>
							<text class="text">日常检查</text>
						</view>
					</uni-grid-item>
					<uni-grid-item v-if="$store.state.user.roles.includes('admin')||$store.state.user.roles.includes('daiwei')||
					$store.state.user.roles.includes('lessor')">
						<view class="grid-item-box" @click="goReport">
							<uni-icons type="upload-filled" size="30"></uni-icons>
							<text class="text">故障上报</text>
						</view>
					</uni-grid-item>
					<uni-grid-item v-if="$store.state.user.roles.includes('admin')||$store.state.user.roles.includes('visitor')||
					$store.state.user.roles.includes('lessor')||$store.state.user.roles.includes('company')">
						<view class="grid-item-box" @click="goRecord">
							<uni-icons type="map-filled" size="30"></uni-icons>
							<text class="text">巡检记录</text>
						</view>
					</uni-grid-item>
					<!-- <uni-grid-item>
						<view class="grid-item-box" @click="goGongdan">
							<uni-icons type="notification-filled" size="30"></uni-icons>
							<text class="text">报修管理</text>
						</view>
					</uni-grid-item> -->
					<!-- <uni-grid-item>
						<view class="grid-item-box" @click="goStatus">
							<uni-icons type="notification-filled" size="30"></uni-icons>
							<text class="text">维修进度</text>
						</view>
					</uni-grid-item> -->
					<!-- <uni-grid-item
						v-if="$store.state.user.roles.includes('admin')||$store.state.user.roles.includes('lessor')||$store.state.user.roles.includes('company')">
						<view class="grid-item-box" @click="goIp">
							<uni-icons type="tune-filled" size="30"></uni-icons>
							<text class="text">IP地址信息</text>
						</view>
					</uni-grid-item> -->
				</uni-grid>
			</view>
		</uni-section>

	</view>
</template>

<script>
	import axios from "axios";
	export default {
		data() {
			return {
				currentStatus: [],
				currentStatusFlag: null,
				area_info: [],
				getArr: [],
				get_detail: [],
				// 统计有问题的站点
				acsfaultList: [],
				vpnfaultList: [],
				devfaultList: [],
				chartData: {},
				range: [],
				current: 0,
				arr: [],
				res: [],
				res2: [],
				swiperDotIndex: 0,
				/* data: [{
						image: '/static/images/banner/banner01.jpg'
					},
					{
						image: '/static/images/banner/banner02.jpg'
					},
					{
						image: '/static/images/banner/banner03.jpg'
					}
				] */
			}
		},
		onLoad() {
			console.log(this.$store.state.user.roles)
		},
		onReady() {},
		/* mounted() {
			this.getDeviceCurrentStatus();
		}, */
		methods: {
			change(e) {
				this.get_detail = [];
				this.getArr.site_info.forEach(item => {
					if (item.sitename == e) {
						this.get_detail = item;
					}
				})
			},
			/* test(e) {
				this.res2 = e;
				console.log("test3", this.res2[this.current])
			}, */
			getDetail(e) {
				this.getArr = e;
				this.range = [];
				this.getArr.site_info.forEach((items) => {
					this.range.push({
						value: items.sitename,
						text: items.sitename,
					});
				});
			},
			/* onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			}, */
			// 获取设备最近状态
			/* getDeviceCurrentStatus() {
				uni.request({
					url: 'http://106.52.237.91:8890/things/getDeviceNewInfo',
					header: {
						Authorization: "d76b97b22761f9323112813789f8bfc8",
					},
					method: 'post',
					success: (res) => {
						if (res.data.c == 200) {
							this.currentStatusFlag = 1;
							this.currentStatus = res.data.d;
							this.area_info = res.data.d.area_info;
							 this.area_info.forEach(item => {
								this.arr.push(item.area_name)
							})
							console.log(this.area_info)
							for (let i = 0; i < this.arr.length; i += 3) {
								this.res.push(this.arr.slice(i, i + 3))
							} 
							this.area_info.forEach((item) => {
								if (item.acs_cut_total > 0) {
									item.site_info.forEach((items) => {
										if (items.acs == "停电") {
											this.acsfaultList.push({
												area: items.area,
												sitename: items
													.sitename,
											});
										}
									});
								}
								if (item.vpn_lose_total > 0) {}
								if (item.vpn_cut_total > 0) {
									item.site_info.forEach((items) => {
										if (items.vpn == "失联") {
											this.vpnfaultList.push({
												area: items.area,
												sitename: items
													.sitename,
											});
										}
									});
								}
								if (item.dev_lose_total > 0) {}
								if (item.dev_cut_total > 0) {
									item.site_info.forEach((items) => {
										if (items.dev == "失联") {
											 if (this.devfaultList[items.area]) {
											  this.devfaultList[items.area].push(items.sitename);
											 } else {
											   this.devfaultList[items.area] = [items.sitename];
											 }
											this.devfaultList.push({
												area: items.area,
												sitename: items
													.sitename,
											});
										}
									});
								}
							});
						} else {
							this.currentStatusFlag = 2;
							this.$modal.showToast('接口异常，暂时无法访问数据~');
						}
					}
				});
				 uni.request({
					url: 'http://106.52.237.91:8890/things/deviceMonthInfo',
					data: {
						serial_number:"01450048"
					},
					header: {
						Authorization: "d76b97b22761f9323112813789f8bfc8",
					},
					method: 'post',
					success: (res) => {
						console.log("传参：",res.data);
					}
				});
			}, */
			/* changeGrid(e) {
				this.$modal.showToast('模块建设中~')
			} */
			goPatrol() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/patrol/patrol'
				})
			},
			/* goPatrolStatus() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/work/choose'
				})
			}, */
			goIp() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/ip/ip'
				})
			},
			goReport() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/report/faultReport'
				})
			},
			goDailyPatrol() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/patrol/dailyPatrol'
				})
			},
			goStatus() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/patrol/status'
				})
			},
			goRecord() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/patrol/record'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		min-height: 100%;
		height: auto;
	}

	scroll-view {
		height: 100%;
		width: 100%;
		white-space: nowrap;
	}

	.zz {
		text-align: right;
		font-size: 28rpx;
		line-height: 48rpx;
		color: #2979ff;
	}

	.sl {
		text-align: right;
		font-size: 28rpx;
		line-height: 48rpx;
		color: #e43d33
	}

	.u-slot-title {
		@include flex;
		flex-direction: row;
		align-items: center;
	}

	.scrollDiv {
		display: inline-block;
		height: 70rpx;
		line-height: 68rpx;
		text-align: center;
		width: 33.3%;
		background-color: white;
		color: #2979ff;
		border: 1rpx solid #2979ff;
		font-size: 30rpx;
	}

	.grid1 {
		font-size: 30rpx;
		background-color: #fff;
		color: #2979ff;
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid2 {
		background-color: #2979ff;
		color: #ffffff;
	}

	.uni-badge-left-margin {
		margin-left: 20rpx;
	}

	.box {
		width: 120rpx;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		background-color: #f5f5f5;
		color: #626262;
		font-size: 25rpx;
		padding: 1%;
	}

	.box-text {
		text-align: center;
		color: #626262;
		font-size: 25rpx;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	/* #endif */

	.text {
		text-align: center;
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}


	.charts-box {
		width: 100%;
	}

	.swiper {
		height: 300rpx;
	}

	.swiper-box {
		height: 150px;
	}

	.swiper-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 400rpx;
		margin-bottom: 15rpx;
	}

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400px;
			/* #ifndef APP-NVUE */
			margin: 0 auto;
			/* #endif */
			margin-top: 8px;
		}
	}
</style>