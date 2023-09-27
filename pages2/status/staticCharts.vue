<template>
	<view>
		<view class="uni-padding-wrap">
			<uni-segmented-control :current="current" :values="items" style-type="button" :active-color="activeColor"
				@clickItem="onClickItem" />
		</view>
		<view v-if="current === 0" style="background-color: white;padding-bottom: 5%;">
			<view style="margin-top: 3%;height: 700rpx;">
				<qiun-data-charts type="column" :opts="opts1" :chartData="chartData1" tooltip-format="pieDemo1" />
			</view>
			<view v-show="textFlag">
				<view style="display: flex;margin-top: 5%;justify-content: center;">最小掉线时长：</view>
				<view style="display: flex;margin-top: 2%;justify-content: center;"><text
						style="font-weight: bolder;">{{minTime}}</text>时掉线<text
						style="font-weight: bolder;">{{minNum}}</text>分钟</view>
				<view style="display: flex;margin-top: 5%;justify-content: center;">最大掉线时长：</view>
				<view style="display: flex;margin-top: 2%;justify-content: center;"><text
						style="font-weight: bolder;">{{maxTime}}</text>时掉线<text
						style="font-weight: bolder;">{{maxNum}}</text>分钟</view>
			</view>
			<view style="display: flex;margin-top: 5%;justify-content: center;">
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
		<view v-if="current === 1" style="background-color: white;padding-bottom: 5%;">
			<view style="margin-top: 3%;height: 700rpx;">
				<qiun-data-charts type="column" :opts="opts2" :chartData="chartData2" tooltip-format="pieDemo2" />
			</view>
			<view v-show="textFlag2">
				<view style="display: flex;margin-top: 5%;justify-content: center;">最小在线率：</view>
				<view style="display: flex;margin-top: 2%;justify-content: center;"><text
						style="font-weight: bolder;">{{minTime2}}</text>号在线率<text
						style="font-weight: bolder;">{{minNum2}}</text>%</view>
				<view style="display: flex;margin-top: 5%;justify-content: center;">最大在线率：</view>
				<view style="display: flex;margin-top: 2%;justify-content: center;"><text
						style="font-weight: bolder;">{{maxTime2}}</text>号在线率<text
						style="font-weight: bolder;">{{maxNum2}}</text>%</view>
			</view>
			<view style="display: flex;margin-top: 5%;justify-content: center;">
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
		<view v-if="current === 2" style="background-color: white;padding-bottom: 5%;">
			<view style="margin-top: 3%;height: 700rpx;">
				<qiun-data-charts type="column" :opts="opts3" :chartData="chartData3" tooltip-format="pieDemo3" />
			</view>
			<view v-show="textFlag3">
				<view style="display: flex;margin-top: 5%;justify-content: center;">最小在线率：</view>
				<view style="display: flex;margin-top: 2%;justify-content: center;"><text
						style="font-weight: bolder;">{{minTime3}}</text>月在线率<text
						style="font-weight: bolder;">{{minNum3}}</text>%</view>
				<view style="display: flex;margin-top: 5%;justify-content: center;">最大在线率：</view>
				<view style="display: flex;margin-top: 2%;justify-content: center;"><text
						style="font-weight: bolder;">{{maxTime3}}</text>月在线率<text
						style="font-weight: bolder;">{{maxNum3}}</text>%</view>
			</view>
			<view style="display: flex;margin-top: 5%;justify-content: center;">
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
				textFlag: 0,
				textFlag2: 0,
				textFlag3: 0,
				opts1: {
					color: ["#72bf9b"],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {},
					dataLabel: false,
					xAxis: {
						disableGrid: true,
						labelCount: 4,
						itemCount: 24,
						title: "时"
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
				},
				opts2: {
					color: ["#72bf9b"],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {},
					dataLabel: false,
					xAxis: {
						disableGrid: true,
						labelCount: 5,
						itemCount: 31,
						title: "日"
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
							width: 3,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				},
				opts3: {
					color: ["#72bf9b"],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {},
					dataLabel: false,
					xAxis: {
						disableGrid: true,
						labelCount: 4,
						itemCount: 12,
						title: "月"
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
				},
				chartData1: {},
				chartData2: {},
				chartData3: {},
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
				maxNum: 0,
				maxTime: '',
				minNum: 0,
				minTime: '',
				maxNum2: 0,
				maxTime2: '',
				minNum2: 0,
				minTime2: '',
				maxNum3: 0,
				maxTime3: '',
				minNum3: 0,
				minTime3: '',
			}
		},
		onReady() {
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
					this.textFlag = 1;
					this.day = res.d;
					let arr1 = Object.keys(res.d.time_info)
					for (let i = 0; i < arr1.length; i++) {
						arr1[i] = arr1[i].substring(0, arr1[i].length - 3);
					}
					let arr2 = Object.values(res.d.time_info)
					this.maxNum = Math.max(...arr2);
					this.minNum = 1000;
					for (let i = 0; i < arr2.length; i++) {
						if (arr2[i] <= this.minNum && arr2[i] != 0) {
							this.minNum = arr2[i];
						}
					}
					this.minTime = "";
					this.maxTime = "";
					for (let i = 0; i < arr2.length; i++) {
						if (arr2[i] == this.maxNum) {
							//this.maxNum = arr2[i]
							this.maxTime += i + "、";
						}
						if (arr2[i] == this.minNum) {
							//this.minNum = arr2[i]
							this.minTime += i + "、";
						}
					}
					this.minTime = this.minTime.substring(0, this.minTime.length - 1);
					this.maxTime = this.maxTime.substring(0, this.maxTime.length - 1);
					let res1 = {
						//categories: arr1,
						categories: ["0", "1", "2", "3", "4", "5", "6", "7", "8",
							"9", "10", "11", "12", "13", "14", "15", "16",
							"17", "18", "19", "20", "21", "22", "23",
						],
						series: [{
							name: "掉线时长（分钟）",
							data: arr2
						}]
					};
					this.chartData1 = res1;
				});
				getStatisticsInfoMonth().then(res => {
					this.textFlag2 = 1;
					this.month = res.d;
					let arr3 = Object.keys(res.d.month_rate_info)
					let arr4 = Object.values(res.d.month_rate_info)
					this.maxNum2 = Math.max(...arr4);
					this.minNum2 = Math.min(...arr4);
					this.minTime2 = "";
					this.maxTime2 = "";
					for (let i = 0; i < arr4.length; i++) {
						if (arr4[i] == this.maxNum2) {
							//this.maxNum = arr2[i]
							this.maxTime2 = arr3[i];
						}
						if (arr4[i] == this.minNum2) {
							//this.minNum = arr2[i]
							this.minTime2 = arr3[i];
						}
					}
					for (let i = 0; i < arr3.length; i++) {
						arr3[i] = arr3[i].substring(3, arr3[i].length);
						/* tmpArr.push({
							day: arr3[i],
							data: arr4[i]
						}); */
					}
					let res2 = {
						//categories: arr3,
						categories: ["1", "2", "3", "4", "5", "6", "7", "8",
							"9", "10", "11", "12", "13", "14", "15", "16",
							"17", "18", "19", "20", "21", "22", "23", "24",
							"25", "26", "27", "28", "29", "30", "31"
						],
						series: [{
							name: "在线率（%）",
							data: arr4
						}]
					};
					this.chartData2 = res2;
				});
				getStatisticsInfoYear().then(res => {
					this.textFlag3 = 1
					this.year = res.d;
					let arr5 = Object.keys(res.d.year_rate_info)
					let arr6 = Object.values(res.d.year_rate_info)
					this.maxNum3 = Math.max(...arr6);
					this.minNum3 = Math.min(...arr6);
					this.minTime3 = "";
					this.maxTime3 = "";
					for (let i = 0; i < arr6.length; i++) {
						if (arr6[i] == this.maxNum3) {
							//this.maxNum = arr2[i]
							this.maxTime3 = arr5[i];
						}
						if (arr6[i] == this.minNum3) {
							//this.minNum = arr2[i]
							this.minTime3 = arr5[i];
						}
					}
					let arr66 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					for (let i = 0; i < arr5.length; i++) {
						let t3 = arr5[i] - 1
						arr66[t3] = arr6[i];
					}
					let res3 = {
						//categories: arr5,
						categories: ["1", "2", "3", "4", "5", "6", "7", "8",
							"9", "10", "11", "12"
						],
						series: [{
							name: "在线率（%）",
							data: arr66
						}]
					};
					this.chartData3 = res3;
				});
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
						if (res.d) {
							_this.textFlag = 1;
							let arr1 = Object.keys(res.d.time_info)
							for (let i = 0; i < arr1.length; i++) {
								arr1[i] = arr1[i].substring(0, arr1[i].length - 3);
							}
							let arr2 = Object.values(res.d.time_info)
							_this.maxNum = Math.max(...arr2);
							_this.minNum = 1000;
							for (let i = 0; i < arr2.length; i++) {
								if (arr2[i] <= _this.minNum && arr2[i] != 0) {
									_this.minNum = arr2[i];
								}
							}
							_this.minTime = "";
							_this.maxTime = "";
							for (let i = 0; i < arr2.length; i++) {
								if (arr2[i] == _this.maxNum) {
									_this.maxTime += i + "、";
								}
								if (arr2[i] == _this.minNum) {
									_this.minTime += i + "、";
								}
							}
							_this.minTime = _this.minTime.substring(0, _this.minTime.length - 1);
							_this.maxTime = _this.maxTime.substring(0, _this.maxTime.length - 1);
							let res1 = {
								//categories: arr1,
								categories: ["24", "1", "2", "3", "4", "5", "6", "7", "8",
									"9", "10", "11", "12", "13", "14", "15", "16",
									"17", "18", "19", "20", "21", "22", "23",
								],
								series: [{
									name: "掉线时长（分钟）",
									data: arr2
								}]
							};
							_this.chartData1 = res1;
						} else {
							_this.textFlag = 0;
							let res1 = {
								categories: ["暂无数据"],
								series: [{
									name: "掉线时长（分钟）",
									data: []
								}]
							};
							_this.chartData1 = res1;
						};
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
						if (res.d) {
							_this.textFlag = 1;
							let arr1 = Object.keys(res.d.time_info)
							for (let i = 0; i < arr1.length; i++) {
								arr1[i] = arr1[i].substring(0, arr1[i].length - 3);
							}
							let arr2 = Object.values(res.d.time_info)
							_this.maxNum = Math.max(...arr2);
							_this.minNum = 1000;
							for (let i = 0; i < arr2.length; i++) {
								if (arr2[i] <= _this.minNum && arr2[i] != 0) {
									_this.minNum = arr2[i];
								}
							}
							_this.minTime = "";
							_this.maxTime = "";
							for (let i = 0; i < arr2.length; i++) {
								if (arr2[i] == _this.maxNum) {
									_this.maxTime += i + "、";
								}
								if (arr2[i] == _this.minNum) {
									_this.minTime += i + "、";
								}
							}
							_this.minTime = _this.minTime.substring(0, _this.minTime.length - 1);
							_this.maxTime = _this.maxTime.substring(0, _this.maxTime.length - 1);
							let res1 = {
								//categories: arr1,
								categories: ["24", "1", "2", "3", "4", "5", "6", "7", "8",
									"9", "10", "11", "12", "13", "14", "15", "16",
									"17", "18", "19", "20", "21", "22", "23",
								],
								series: [{
									name: "掉线时长（分钟）",
									data: arr2
								}]
							};
							_this.chartData1 = res1;
						} else {
							_this.textFlag = 0;
							let res1 = {
								categories: ["暂无数据"],
								series: [{
									name: "掉线时长（分钟）",
									data: []
								}]
							};
							_this.chartData1 = res1;
						};
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
							_this.textFlag2 = 1;
							let arr3 = Object.keys(res.d.month_rate_info)
							let arr4 = Object.values(res.d.month_rate_info)
							_this.maxNum2 = Math.max(...arr4);
							_this.minNum2 = Math.min(...arr4);
							_this.minTime2 = "";
							_this.maxTime2 = "";
							for (let i = 0; i < arr4.length; i++) {
								if (arr4[i] == _this.maxNum2) {
									_this.maxTime2 = arr3[i];
								}
								if (arr4[i] == _this.minNum2) {
									_this.minTime2 = arr3[i];
								}
							}
							let arr44 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
								0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
								0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
							]
							for (let i = 0; i < arr3.length; i++) {
								let t1 = new Date(arr3[i]).getTime();
								let t2 = new Date(t1);
								arr3[i] = t2.getDate()
								let t3 = arr3[i] - 1
								//console.log(t3)
								arr44[t3] = arr4[i];
							}
							//console.log(arr44)
							/* arr3.forEach((item) => {
								let t1 = new Date(item).getTime();
								let t2 = new Date(t1);
								console.log(t2.getDate());
								let t3 = t2.getDate()
											arr33.push(
												// {
												// 									value: item.areaname,
												// 									text: item.areaname + "" + item.site_total,
												// 									checked: false,
												// 								}
										);
							}); */

							/* for (let i = 0; i < arr3.length; i++) {
								arr3[i] = arr3[i].substring(3, arr3[i].length);
							} */

							//console.log(res.d.month_rate_info)
							let res2 = {
								//categories: arr3,
								categories: ["1", "2", "3", "4", "5", "6", "7", "8",
									"9", "10", "11", "12", "13", "14", "15", "16",
									"17", "18", "19", "20", "21", "22", "23", "24",
									"25", "26", "27", "28", "29", "30", "31"
								],
								series: [{
									name: "在线率（%）",
									data: arr44
								}]
							};
							_this.chartData2 = res2;
						} else {
							_this.textFlag2 = 0
							let res2 = {
								categories: ["暂无数据"],
								series: [{
									name: "在线率（%）",
									data: []
								}]
							};
							_this.chartData2 = res2;
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
							_this.textFlag2 = 1
							let arr3 = Object.keys(res.d.month_rate_info)
							/* for (let i = 0; i < arr3.length; i++) {
								arr3[i] = arr3[i].substring(3, arr3[i].length);
							} */
							let arr4 = Object.values(res.d.month_rate_info)
							_this.maxNum2 = Math.max(...arr4);
							_this.minNum2 = Math.min(...arr4);
							_this.minTime2 = "";
							_this.maxTime2 = "";
							for (let i = 0; i < arr4.length; i++) {
								if (arr4[i] == _this.maxNum2) {
									_this.maxTime2 = arr3[i];
								}
								if (arr4[i] == _this.minNum2) {
									_this.minTime2 = arr3[i];
								}
							}
							let arr44 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
								0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
								0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
							]
							for (let i = 0; i < arr3.length; i++) {
								let t1 = new Date(arr3[i]).getTime();
								let t2 = new Date(t1);
								arr3[i] = t2.getDate()
								let t3 = arr3[i] - 1
								//console.log(t3)
								arr44[t3] = arr4[i];
							}
							let res2 = {
								//categories: arr3,
								categories: ["1", "2", "3", "4", "5", "6", "7", "8",
									"9", "10", "11", "12", "13", "14", "15", "16",
									"17", "18", "19", "20", "21", "22", "23", "24",
									"25", "26", "27", "28", "29", "30", "31"
								],
								series: [{
									name: "在线率（%）",
									data: arr44
								}]
							};
							_this.chartData2 = res2;
						} else {
							_this.textFlag2 = 0
							let res2 = {
								categories: ["暂无数据"],
								series: [{
									name: "在线率（%）",
									data: []
								}]
							};
							_this.chartData2 = res2;
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
							_this.textFlag3 = 1
							let arr5 = Object.keys(res.d.year_rate_info)
							let arr6 = Object.values(res.d.year_rate_info)
							_this.maxNum3 = Math.max(...arr6);
							_this.minNum3 = Math.min(...arr6);
							_this.minTime3 = "";
							_this.maxTime3 = "";
							for (let i = 0; i < arr6.length; i++) {
								if (arr6[i] == _this.maxNum3) {
									_this.maxTime3 = arr5[i];
								}
								if (arr6[i] == _this.minNum3) {
									_this.minTime3 = arr5[i];
								}
							}
							let arr66 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
							for (let i = 0; i < arr5.length; i++) {
								let t3 = arr5[i] - 1
								arr66[t3] = arr6[i];
							}
							let res3 = {
								//categories: arr5,
								categories: ["1", "2", "3", "4", "5", "6", "7", "8",
									"9", "10", "11", "12"
								],
								series: [{
									name: "在线率（%）",
									data: arr66
								}]
							};
							_this.chartData3 = res3;
						} else {
							_this.textFlag3 = 0
							let res3 = {
								categories: ["暂无数据"],
								series: [{
									name: "在线率（%）",
									data: []
								}]
							};
							_this.chartData3 = res3;
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
							_this.textFlag3 = 1
							let arr5 = Object.keys(res.d.year_rate_info)
							let arr6 = Object.values(res.d.year_rate_info)
							_this.maxNum3 = Math.max(...arr6);
							_this.minNum3 = Math.min(...arr6);
							_this.minTime3 = "";
							_this.maxTime3 = "";
							for (let i = 0; i < arr6.length; i++) {
								if (arr6[i] == _this.maxNum3) {
									_this.maxTime3 = arr5[i];
								}
								if (arr6[i] == _this.minNum3) {
									_this.minTime3 = arr5[i];
								}
							}
							let arr66 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
							for (let i = 0; i < arr5.length; i++) {
								let t3 = arr5[i] - 1
								arr66[t3] = arr6[i];
							}
							let res3 = {
								//categories: arr5,
								categories: ["1", "2", "3", "4", "5", "6",
									"7", "8", "9", "10", "11", "12"
								],
								series: [{
									name: "在线率（%）",
									data: arr66
								}]
							};
							_this.chartData3 = res3;
						} else {
							_this.textFlag3 = 0
							let res3 = {
								categories: ["暂无数据"],
								series: [{
									name: "在线率（%）",
									data: []
								}]
							};
							_this.chartData3 = res3;
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