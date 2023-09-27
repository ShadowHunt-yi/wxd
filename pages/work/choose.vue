<template>
	<view>
		<view class="swiper-item">
			<image src="../../static/images/banner/bgImage.jpg" :draggable="false" mode="widthFix"></image>
		</view>
		<view class="div2">
			<view style="margin-top: 15%;">
				<view @click="goYunwei" class="btndiv">
					<view style="margin-left: 3%;">
						<image src="../../static/button/button1.png" :draggable="false" mode="widthFix"
							style="width: 90rpx;">
						</image>
					</view>
					<view style="margin-top: 2.5%;margin-left: 15%;">
						<text style="font-size: 35rpx;color: #00539f ;font-weight: bold;" decode>无线电运维管理</text>
					</view>
				</view>
				<view @click="goShebei" class="btndiv" style="margin-top: 8%;">
					<view style="margin-left: 3%;">
						<image src="../../static/button/button2.png" :draggable="false" mode="widthFix"
							style="width: 90rpx;">
						</image>
					</view>
					<view style="margin-top: 2.5%;margin-left: 15%;">
						<text style="font-size: 35rpx;color: #00539f ;font-weight: bold;" decode>监测设备上线率</text>
					</view>
				</view>
				<!-- <view @click="goShebei">
					<view style="margin-left: 16%;">
						<image src="../../static/button/button2.png" :draggable="false" mode="heightFix"
							style="height: 150rpx;">
						</image>
					</view>
					<view style="margin-top: 10%;">
						<text style="font-size: 38rpx;color: white;">监测设备上线率</text>
					</view>
				</view> -->
			</view>
			<!-- <view class="title">
				<view style="font-size: 45rpx;">
					<text>Choose</text>
				</view>
				<view style="margin-top: 3%;font-weight: bolder;font-size: 70rpx;">
					<text>选择</text>
				</view>
			</view> -->
			<!-- <view class="action-btn">
				<button @click="goYunwei" plain="true">无线电运维 →</button>
				<u-button type="primary" icon="list-dot" text="无线电运维 →" @click="goYunwei" :plain="true"
					size="large"></u-button>
			</view>
			<view class="action-btn" style="margin-top: 15%;">
				<button @click="goShebei" plain="true">设备在线情况 →</button>
				<u-button type="primary" icon="eye" text="设备在线情况 →" @click="goShebei" :plain="true"
					size="large"></u-button>
			</view> -->
		</view>
		<view style="left: 26.1%;position: fixed;bottom: 60rpx;">
			<text style="color: white;font-size: 33rpx;">成都电迅达科技有限公司</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myText1: '无&ensp;线&ensp;电&ensp;运&ensp;维&ensp;管&ensp;理&ensp;→',
			}
		},
		methods: {
			goYunwei() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/work/index'
				})
			},
			goShebei() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages2/status/IOT'
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #00539f;
	}

	.btndiv {
		display: flex;
		border-radius: 52rpx;
		background-color: #ffffff;
		margin: 0 12%;
		padding: 2% 0;
	}

	/* .div2 {
		background-color: #ffffff;
		//margin-left: 10%;
		border-radius: 100rpx;
		margin: 0 5%;
		padding-top: 15%;
		padding-bottom: 15%;
	} */

	.action-btn {
		width: 80%;
		margin: auto;
		//margin-top: 15%;
	}

	.title {
		margin-left: 10%;
		padding-top: 10%;
		color: #282d40;
	}

	/* .swiper-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 400rpx;
		margin-bottom: 15rpx;
	} */
</style>