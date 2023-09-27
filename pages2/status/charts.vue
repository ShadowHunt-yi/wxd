<template>
	<view>
		<view class="uni-padding-wrap">
			<uni-segmented-control :current="current" :values="items" style-type="button" :active-color="activeColor"
				@clickItem="onClickItem" />
		</view>
		<view v-if="current === 0">
			<view style="background-color: white;margin-top: 3%;">
				<canvas canvas-id="wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD1" id="wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD1"
					class="charts" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" />
			</view>
			<view style="display: flex;margin-top: 2%;justify-content: center;">
				<view style="margin-right: 3%;">
					<u-button type="success" icon="arrow-leftward" @click="goPrevious1" :plain="true"></u-button>
				</view>
				<view style="margin-right: 3%;">
					<u-button type="success" :plain="true" :text="day.analytics_date"></u-button>
				</view>
				<view v-show="!buttonFlag1">
					<u-button type="success" icon="arrow-rightward" @click="goNext1" :plain="true"></u-button>
				</view>
				<view v-show="buttonFlag1">
					<u-button type="info" icon="arrow-rightward" :plain="true" :disabled="true"></u-button>
				</view>
			</view>
		</view>
		<view v-if="current === 1">
			<view style="background-color: white;margin-top: 3%;">
				<canvas canvas-id="wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD2" id="wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD2"
					class="charts" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" />
			</view>
			<view style="display: flex;margin-top: 2%;justify-content: center;">
				<view style="margin-right: 3%;">
					<u-button type="success" icon="arrow-leftward" @click="goPrevious2" :plain="true"></u-button>
				</view>
				<view style="margin-right: 3%;">
					<u-button type="success" :plain="true" :text="month.analytics_date"></u-button>
				</view>
				<view v-show="!buttonFlag2">
					<u-button type="success" icon="arrow-rightward" @click="goNext2" :plain="true"></u-button>
				</view>
				<view v-show="buttonFlag2">
					<u-button type="info" icon="arrow-rightward" :plain="true" :disabled="true"></u-button>
				</view>
			</view>
		</view>
		<view v-if="current === 2">
			<view style="background-color: white;margin-top: 3%;">
				<canvas canvas-id="wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD3" id="wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD3"
					class="charts" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" />
			</view>
			<view style="display: flex;margin-top: 2%;justify-content: center;">
				<view style="margin-right: 3%;">
					<u-button type="success" icon="arrow-leftward" @click="goPrevious3" :plain="true"></u-button>
				</view>
				<view style="margin-right: 3%;">
					<u-button type="success" :plain="true" :text="year.analytics_date"></u-button>
				</view>
				<view v-show="!buttonFlag3">
					<u-button type="success" icon="arrow-rightward" @click="goNext3" :plain="true"></u-button>
				</view>
				<view v-show="buttonFlag3">
					<u-button type="info" icon="arrow-rightward" :plain="true" :disabled="true"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js';
	var uChartsInstance = {};
	import axios from "axios";
	import {
		getStatisticsInfo,
		getStatisticsInfoMonth,
		getStatisticsInfoYear,
		getStatisticsInfoSearch,
		getStatisticsInfoMonthSearch,
		getStatisticsInfoYearSearch
	} from '@/api/status.js'
	export default {
		data() {
			return {
				items: ['日', '月', '年'],
				activeColor: '#72bf9b',
				current: 0,
				cWidth: 750,
				cHeight: 500,
				day: [],
				month: [],
				year: [],
				buttonFlag1: 1,
				buttonFlag2: 1,
				buttonFlag3: 1,
			}
		},
		onReady() {
			//这里的 750 对应 css .charts 的 width
			this.cWidth = uni.upx2px(750);
			//这里的 500 对应 css .charts 的 height
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		/* mounted() {
			this.getStatisticsInfo();
		}, */
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
				this.getServerData();
			},
			getServerData() {
				getStatisticsInfo().then(res => {
					this.day = res.d;
					let arr1 = Object.keys(res.d.time_info)
					for (let i = 0; i < arr1.length; i++) {
						arr1[i] = arr1[i].substring(0, arr1[i].length - 3);
					}
					let arr2 = Object.values(res.d.time_info)
					let res1 = {
						categories: arr1,
						series: [{
							name: "掉线时间（分钟）",
							data: arr2
						}]
					};
					this.drawCharts1('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD1', res1);
				});
				getStatisticsInfoMonth().then(res => {
					this.month = res.d;
					let arr3 = Object.keys(res.d.month_rate_info)
					for (let i = 0; i < arr3.length; i++) {
						arr3[i] = arr3[i].substring(3, arr3[i].length);
					}
					let arr4 = Object.values(res.d.month_rate_info)
					let res2 = {
						categories: arr3,
						series: [{
							name: "在线率（%）",
							data: arr4
						}]
					};
					this.drawCharts2('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD2', res2);
				});
				getStatisticsInfoYear().then(res => {
					this.year = res.d;
					let arr5 = Object.keys(res.d.year_rate_info)
					let arr6 = Object.values(res.d.year_rate_info)
					let res3 = {
						categories: arr5,
						series: [{
							name: "在线率（%）",
							data: arr6
						}]
					};
					this.drawCharts3('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD3', res3);
				});
			},
			drawCharts1(id, data) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "column",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					categories: data.categories,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: ["#72bf9b"],
					dataLabel: false,
					padding: [15, 15, 0, 5],
					touchMoveLimit: 24,
					enableScroll: true,
					legend: {},
					xAxis: {
						disableGrid: true,
						//labelCount: 4,
						scrollShow: true,
						itemCount: 12
					},
					yAxis: {
						data: [{
							min: 0,
							disabled: true,
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 5,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				});
			},
			drawCharts2(id, data) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "column",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					categories: data.categories,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: ["#72bf9b"],
					dataLabel: false,
					padding: [15, 15, 0, 5],
					touchMoveLimit: 24,
					enableScroll: true,
					legend: {},
					xAxis: {
						disableGrid: true,
						//labelCount: 5,
						scrollShow: true,
						itemCount: 12
					},
					yAxis: {
						data: [{
							min: 0,
							disabled: true,
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 8,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				});
			},
			drawCharts3(id, data) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "column",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					categories: data.categories,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: ["#72bf9b"],
					dataLabel: false,
					padding: [15, 15, 0, 5],
					touchMoveLimit: 24,
					enableScroll: true,
					legend: {},
					xAxis: {
						disableGrid: true,
						//labelCount: 4,
						scrollShow: true,
						itemCount: 12
					},
					yAxis: {
						data: [{
							min: 0,
							disabled: true,
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 10,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				});
			},
			touchstart(e) {
				uChartsInstance[e.target.id].scrollStart(e);
			},
			touchmove(e) {
				uChartsInstance[e.target.id].scroll(e);
			},
			touchend(e) {
				uChartsInstance[e.target.id].scrollEnd(e);
				uChartsInstance[e.target.id].touchLegend(e);
				uChartsInstance[e.target.id].showToolTip(e);
			},
			goPrevious1() {
				let tmp = this.day.analytics_date;
				let date = new Date(tmp).getTime() - 1000 * 60 * 60 * 24;
				let date1 = new Date(date);
				date1.getDate();
				let month = (date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : '0' + (date1.getMonth() + 1);
				let day = (date1.getDate()) > 9 ? (date1.getDate()) : '0' + (date1.getDate());
				this.day.analytics_date = date1.getFullYear() + '-' + month + '-' + day;
				getStatisticsInfo().then(res => {
					if (res.d.analytics_date == this.day.analytics_date) {
						this.buttonFlag1 = 1;
					} else {
						this.buttonFlag1 = 0;
					};
				});
				let _this = this;
				setTimeout(function() {
					getStatisticsInfoSearch(_this.day.analytics_date).then(res => {
						let arr1 = Object.keys(res.d.time_info)
						for (let i = 0; i < arr1.length; i++) {
							arr1[i] = arr1[i].substring(0, arr1[i].length - 3);
						}
						let arr2 = Object.values(res.d.time_info)
						let res1 = {
							categories: arr1,
							series: [{
								name: "掉线时间（分钟）",
								data: arr2
							}]
						};
						_this.drawCharts1('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD1', res1);
					})
				}, 1000)
			},
			goNext1() {
				let tmp = this.day.analytics_date;
				let date = new Date(tmp).getTime() + 1000 * 60 * 60 * 24;
				let date1 = new Date(date);
				date1.getDate();
				let month = (date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : '0' + (date1.getMonth() + 1);
				let day = (date1.getDate()) > 9 ? (date1.getDate()) : '0' + (date1.getDate());
				this.day.analytics_date = date1.getFullYear() + '-' + month + '-' + day;
				getStatisticsInfo().then(res => {
					if (res.d.analytics_date == this.day.analytics_date) {
						this.buttonFlag1 = 1;
					} else {
						this.buttonFlag1 = 0;
					};
				});
				let _this = this;
				setTimeout(function() {
					getStatisticsInfoSearch(_this.day.analytics_date).then(res => {
						let arr1 = Object.keys(res.d.time_info)
						for (let i = 0; i < arr1.length; i++) {
							arr1[i] = arr1[i].substring(0, arr1[i].length - 3);
						}
						let arr2 = Object.values(res.d.time_info)
						let res1 = {
							categories: arr1,
							series: [{
								name: "掉线时间（分钟）",
								data: arr2
							}]
						};
						_this.drawCharts1('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD1', res1);
					})
				}, 1000)
			},
			goPrevious2() {
				let tmp = this.month.analytics_date;
				let date = new Date(tmp).getTime();
				let date1 = new Date(date);
				date1.getDate();
				let month = (date1.getMonth()) > 9 ? (date1.getMonth()) : '0' + (date1.getMonth());
				this.month.analytics_date = date1.getFullYear() + '-' + month;
				getStatisticsInfoMonth().then(res => {
					if (res.d.analytics_date == this.month.analytics_date) {
						this.buttonFlag2 = 1;
					} else {
						this.buttonFlag2 = 0;
					};
				});
				let _this = this;
				setTimeout(function() {
					getStatisticsInfoMonthSearch(_this.month.analytics_date).then(res => {
						if (res.d) {
							let arr3 = Object.keys(res.d.month_rate_info)
							for (let i = 0; i < arr3.length; i++) {
								arr3[i] = arr3[i].substring(3, arr3[i].length);
							}
							let arr4 = Object.values(res.d.month_rate_info)
							let res2 = {
								categories: arr3,
								series: [{
									name: "掉线时间（分钟）",
									data: arr4
								}]
							};
							_this.drawCharts2('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD2', res2);
						} else {
							let res2 = {
								categories: ["暂无数据"],
								series: [{
									name: "掉线时间（分钟）",
									data: []
								}]
							};
							_this.drawCharts2('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD2', res2);
						};
					})
				}, 1000)
			},
			goNext2() {
				let tmp = this.month.analytics_date;
				let date = new Date(tmp).getTime();
				let date1 = new Date(date);
				date1.getDate();
				let month = (date1.getMonth() + 2) > 9 ? (date1.getMonth() + 2) : '0' + (date1.getMonth() + 2);
				this.month.analytics_date = date1.getFullYear() + '-' + month;
				getStatisticsInfoMonth().then(res => {
					if (res.d.analytics_date == this.month.analytics_date) {
						this.buttonFlag2 = 1;
					} else {
						this.buttonFlag2 = 0;
					};
				});
				let _this = this;
				setTimeout(function() {
					getStatisticsInfoMonthSearch(_this.month.analytics_date).then(res => {
						if (res.d) {
							let arr3 = Object.keys(res.d.month_rate_info)
							for (let i = 0; i < arr3.length; i++) {
								arr3[i] = arr3[i].substring(3, arr3[i].length);
							}
							let arr4 = Object.values(res.d.month_rate_info)
							let res2 = {
								categories: arr3,
								series: [{
									name: "掉线时间（分钟）",
									data: arr4
								}]
							};
							_this.drawCharts2('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD2', res2);
						} else {
							let res2 = {
								categories: ["暂无数据"],
								series: [{
									name: "掉线时间（分钟）",
									data: []
								}]
							};
							_this.drawCharts2('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD2', res2);
						};
					})
				}, 1000)
			},
			goPrevious3() {
				/* let tmp = this.year.analytics_date;
				let date = new Date(tmp).getTime();
				let date1 = new Date(date);
				date1.getDate();
				this.year.analytics_date = date1.getFullYear() - 1; */
				this.year.analytics_date = this.year.analytics_date - 1;
				getStatisticsInfoYear().then(res => {
					if (res.d.analytics_date == this.year.analytics_date) {
						this.buttonFlag3 = 1;
					} else {
						this.buttonFlag3 = 0;
					};
				});
				let _this = this;
				setTimeout(function() {
					getStatisticsInfoYearSearch(_this.year.analytics_date).then(res => {
						if (res.d) {
							let arr5 = Object.keys(res.d.year_rate_info)
							let arr6 = Object.values(res.d.year_rate_info)
							let res3 = {
								categories: arr5,
								series: [{
									name: "掉线时间（分钟）",
									data: arr6
								}]
							};
							_this.drawCharts3('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD3', res3);
						} else {
							let res3 = {
								categories: ["暂无数据"],
								series: [{
									name: "掉线时间（分钟）",
									data: []
								}]
							};
							_this.drawCharts3('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD3', res3);
						};
					})
				}, 1000)
			},
			goNext3() {
				/* let tmp = this.year.analytics_date;
				let date = new Date(tmp).getTime();
				let date1 = new Date(date);
				date1.getDate();
				this.year.analytics_date = date1.getFullYear() + 1; */
				this.year.analytics_date = this.year.analytics_date + 1;
				getStatisticsInfoYear().then(res => {
					if (res.d.analytics_date == this.year.analytics_date) {
						this.buttonFlag3 = 1;
					} else {
						this.buttonFlag3 = 0;
					};
				});
				let _this = this;
				setTimeout(function() {
					getStatisticsInfoYearSearch(_this.year.analytics_date).then(res => {
						if (res.d) {
							let arr5 = Object.keys(res.d.year_rate_info)
							let arr6 = Object.values(res.d.year_rate_info)
							let res3 = {
								categories: arr5,
								series: [{
									name: "掉线时间（分钟）",
									data: arr6
								}]
							};
							_this.drawCharts('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD3', res3);
						} else {
							let res3 = {
								categories: ["暂无数据"],
								series: [{
									name: "掉线时间（分钟）",
									data: []
								}]
							};
							_this.drawCharts('wrxmSlNJpMFxaoMQyjVDfvCdxIeLwyTD3', res3);
						};
					})
				}, 1000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.uni-padding-wrap {
		padding: 0px 60rpx;
		margin-top: 3%;
	}

	.charts {
		width: 750rpx;
		height: 500rpx;
	}
</style>