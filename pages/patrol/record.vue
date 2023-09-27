<template>
	<view style="padding-bottom: 5%;">
		<view style="background-color: white;padding-top: 5%;padding-right: 3%;padding-bottom: 3%;">
			<view style="display: flex;justify-content: space-between;margin-left: 3%;margin-bottom: 5%;">
				<view style="width: 45%;">
					<uni-data-select :localdata="yearRange" @change="change1" placeholder="请选择年份"></uni-data-select>
				</view>
				<view style="width: 45%;">
					<uni-data-select :localdata="monthRange" @change="change2" placeholder="请选择月份"></uni-data-select>
				</view>
			</view>

			<view style="display: flex;justify-content: space-between;">
				<view style="width: 50%;margin-left: 3%;">
					<uni-easyinput v-model="siteName" placeholder="请输入站点名称" />
				</view>
				<view style="margin-top:1%;">
					<button class="bg-blue" size="mini" @click="search">搜索</button>
				</view>
				<view style="margin-top: 1%;" v-show="btnFlag==0">
					<button @click="jiangxu" size="mini">时间降序</button>
				</view>
				<view style="margin-top: 1%;" v-show="btnFlag==1">
					<button @click="shengxu" size="mini">时间升序</button>
				</view>
			</view>
		</view>
		<view style="background-color: white;margin:0 3%;margin-top: 5%;">
			<uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据">
				<uni-tr>
					<uni-th width="88" align="center">操作</uni-th>
					<!-- <uni-th width="120" align="center">巡检人</uni-th> -->
					<uni-th width="140" align="center">巡检站点</uni-th>
					<uni-th width="90" align="center">完成日期</uni-th>
					<!-- <uni-th width="250" align="center">结论</uni-th> -->
					<uni-th width="65" align="center">状态</uni-th>
					<!-- <uni-th width="250" align="center">备注</uni-th> -->
				</uni-tr>
				<uni-tr v-for="(item, index) in insDataListShow" :key="index">
					<uni-td align="center">
						<view class="uni-group">
							<button size="mini" @click="showDrawer('showLeft',item)">详情</button>
						</view>
					</uni-td>
					<!-- <uni-td align="center">{{ item.persons }}</uni-td> -->
					<uni-td align="center">{{ item.siteName }}</uni-td>
					<uni-td align="center">
						<view v-if="!item.flag">{{ item.days2 }}</view>
						<view v-else>-</view>
					</uni-td>
					<!-- <uni-td align="center">{{ item.conclusion }}</uni-td> -->
					<uni-td align="center">
						<view v-if="!item.status">进行中</view>
						<view v-else>已完成</view>
					</uni-td>
					<!-- <uni-td align="center">{{ item.remark }}</uni-td> -->
				</uni-tr>
			</uni-table>
			<view style="margin: 0 15%;">
				<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total"
					@change="change" />
			</view>
		</view>
		<uni-drawer ref="showLeft" mode="left" :width="300">
			<view class="scroll-view">
				<scroll-view class="scroll-view-box" scroll-y="true">
					<u-cell-group>
						<u-cell icon="pushpin" :title="tmp.siteName"></u-cell>
						<u-cell icon="account" title="巡检人" :value="tmp.persons"></u-cell>
						<u-cell icon="coupon" title="完成时间" :value="tmp.days" v-if="!tmp.flag"></u-cell>
						<u-cell icon="coupon" title="完成时间" value="-" v-else></u-cell>
						<u-cell icon="coupon" title="结论" :label="tmp.conclusion"></u-cell>
						<u-cell icon="coupon" title="备注" :label="tmp.remark"></u-cell>
					</u-cell-group>
					<u-divider text="日巡检记录" textColor="#2979ff" lineColor="#2979ff"></u-divider>
					<view v-for="(item, index) in insDetail" :key="index">
						<u-cell-group>
							<u-cell icon="pushpin" :title="item.day"></u-cell>
							<u-cell icon="account" title="巡检人" :value="item.persons"></u-cell>
							<u-cell icon="coupon" title="巡检内容"></u-cell>
						</u-cell-group>
						<view class="album">
							<u-album :urls="item.urls"></u-album>
						</view>
						<u-divider :dot="true" textColor="#2979ff" lineColor="#2979ff"></u-divider>
					</view>
				</scroll-view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import {
		reqGetAll,
		reqGetAll2,
		reqGetInfoById
	} from '@/api/task.js';
	import {
		parseTime
	} from "@/utils/ruoyi.js";
	export default {
		data() {
			return {
				siteName: null,
				btnFlag: 1,
				insDataList: [],
				insDataListShow: [],
				insDetail: [],
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false,
				flag: 0,
				tmp: null,
				yearValue: 0,
				monthValue: 0,
				yearRange: [{
						value: 2022,
						text: "2022"
					},
					{
						value: 2023,
						text: "2023"
					},
				],
				monthRange: [{
						value: 1,
						text: "1"
					},
					{
						value: 2,
						text: "2"
					},
					{
						value: 3,
						text: "3"
					},
					{
						value: 4,
						text: "4"
					},
					{
						value: 5,
						text: "5"
					},
					{
						value: 6,
						text: "6"
					},
					{
						value: 7,
						text: "7"
					},
					{
						value: 8,
						text: "8"
					},
					{
						value: 9,
						text: "9"
					},
					{
						value: 10,
						text: "10"
					},
					{
						value: 11,
						text: "11"
					},
					{
						value: 12,
						text: "12"
					},
				],
			}
		},
		onLoad() {
			this.getData(1, 1);
		},
		/* mounted() {
			this.test()
		}, */
		methods: {
			change1(e) {
				if (e) {
					this.yearValue = Number(e);
					this.getData(1);
				}
			},
			change2(e) {
				if (e) {
					this.monthValue = Number(e);
					this.getData(1);
				}
			},
			// 根据id获取详细清晰
			getDetailById(id) {
				return new Promise((resolve) => {
					reqGetInfoById(id).then(res => {
						if (res.code == 200) {
							this.insDetail = res.data
							this.insDetail.forEach((item) => {
								if (item.fileId) {
									let t = item.fileId.split(',')
									t.pop()
									for (let i = 0; i < t.length; i++) {
										t[i] = "https://www.cd-dxd.com/img/" + t[i]
									}
									item.urls = t
								}
							});
							resolve()
						}
					})
				})
			},
			showDrawer(e, item) {
				this.$refs[e].open();
				this.tmp = item;
				this.getDetailById(this.tmp.inspectionId)
			},
			changeTime(x) {
				//let time = "2023-07-26T05:09:35.929Z";
				let d = new Date(x);
				let hour = (d.getHours()) > 9 ? (d.getHours()) : '0' + (d.getHours());
				let minute = (d.getMinutes()) > 9 ? (d.getMinutes()) : '0' + (d.getMinutes());
				let second = (d.getSeconds()) > 9 ? (d.getSeconds()) : '0' + (d.getSeconds());
				let times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + hour + ':' + minute +
					':' + second;
				return times
			},
			test() {
				let x = this.changeTime()
				console.log(x)
			},
			// 分页触发
			change(e) {
				this.getData(e.current)
			},
			compare1(a, b) {
				if (new Date(a.days2.replace(/-/g, '/')).getTime() < new Date(b.days2.replace(/-/g, '/'))
					.getTime())
					return 1;
				if (new Date(a.days2.replace(/-/g, '/')).getTime() > new Date(b.days2.replace(/-/g, '/'))
					.getTime())
					return -1;
				return 0;
			},
			compare2(a, b) {
				if (new Date(a.days2.replace(/-/g, '/')).getTime() > new Date(b.days2.replace(/-/g, '/'))
					.getTime())
					return 1;
				if (new Date(a.days2.replace(/-/g, '/')).getTime() < new Date(b.days2.replace(/-/g, '/'))
					.getTime())
					return -1;
				return 0;
			},
			shengxu() {
				this.btnFlag = 0
				this.getData(1);
			},
			jiangxu() {
				this.btnFlag = 1
				this.getData(1);
			},
			search() {
				this.getData(1);
			},
			// 获取数据
			getData(pageCurrent) {
				this.loading = true
				this.pageCurrent = pageCurrent
				this.insDataList = []
				let data = {
					siteName: this.siteName
				}
				if (this.yearValue && !this.monthValue) {
					reqGetAll2(data, this.yearValue, '').then(res => {
						if (res.code == 200) {
							res.data.forEach(item => {
								if (item.days) {
									item.days = this.changeTime(item.days)
									let tmp = item.days;
									let date = new Date(tmp.replace(/-/g, "/")).getTime();
									let date1 = new Date(date);
									date1.getDate();
									let str = date1.getFullYear() + '-' + (date1.getMonth() + 1) +
										'-' + date1
										.getDate();
									item.days2 = str
									if (item.days.slice(0, 1) == 'N') {
										item.flag = 1;
										item.days2 = this.changeTime("2223-07-26T05:09:35.929Z")
									} else item.flag = 0
								} else {
									item.flag = 1;
									item.days2 = this.changeTime("2223-07-26T05:09:35.929Z")
								}
							})
							if (this.btnFlag == 1) {
								this.insDataList = res.data.sort(this.compare1)
							} else {
								this.insDataList = res.data.sort(this.compare2)
							}
							this.total = this.insDataList.length
							let data = this.insDataList.filter((item, index) => {
								const idx = index - (this.pageCurrent - 1) * this.pageSize
								return idx < this.pageSize && idx >= 0
							})
							this.insDataListShow = data
							this.loading = false;
						}
					});
				}
				if (this.yearValue && this.monthValue) {
					reqGetAll2(data, this.yearValue, this.monthValue).then(res => {
						if (res.code == 200) {
							res.data.forEach(item => {
								if (item.days) {
									item.days = this.changeTime(item.days)
									let tmp = item.days;
									let date = new Date(tmp.replace(/-/g, "/")).getTime();
									let date1 = new Date(date);
									date1.getDate();
									let str = date1.getFullYear() + '-' + (date1.getMonth() + 1) +
										'-' + date1
										.getDate();
									item.days2 = str
									if (item.days.slice(0, 1) == 'N') {
										item.flag = 1;
										item.days2 = this.changeTime("2223-07-26T05:09:35.929Z")
									} else item.flag = 0
								} else {
									item.flag = 1;
									item.days2 = this.changeTime("2223-07-26T05:09:35.929Z")
								}
							})
							if (this.btnFlag == 1) {
								this.insDataList = res.data.sort(this.compare1)
							} else {
								this.insDataList = res.data.sort(this.compare2)
							}
							this.total = this.insDataList.length
							let data = this.insDataList.filter((item, index) => {
								const idx = index - (this.pageCurrent - 1) * this.pageSize
								return idx < this.pageSize && idx >= 0
							})
							this.insDataListShow = data
							this.loading = false;
						}
					});
				}
				if (!this.yearValue && !this.monthValue) {
					reqGetAll(data).then(res => {
						if (res.code == 200) {
							res.data.forEach(item => {
								if (item.days) {
									item.days = this.changeTime(item.days)
									let tmp = item.days;
									let date = new Date(tmp.replace(/-/g, "/")).getTime();
									let date1 = new Date(date);
									date1.getDate();
									let str = date1.getFullYear() + '-' + (date1.getMonth() + 1) +
										'-' + date1
										.getDate();
									item.days2 = str
									if (item.days.slice(0, 1) == 'N') {
										item.flag = 1;
										item.days2 = this.changeTime("2223-07-26T05:09:35.929Z")
									} else item.flag = 0
								} else {
									item.flag = 1;
									item.days2 = this.changeTime("2223-07-26T05:09:35.929Z")
								}
								/* if (this.yearValue) {
									if (this.yearValue == item.days2.slice(0, 4)) {
										this.insDataList.push(item)
									}
								} else this.insDataList.push(item) */
							})
							if (this.btnFlag == 1) {
								this.insDataList = res.data.sort(this.compare1)
							} else {
								this.insDataList = res.data.sort(this.compare2)
							}
							this.total = this.insDataList.length
							let data = this.insDataList.filter((item, index) => {
								const idx = index - (this.pageCurrent - 1) * this.pageSize
								return idx < this.pageSize && idx >= 0
							})
							this.insDataListShow = data
							this.loading = false;
						}
					});
				}











				/* reqGetAll(data).then(res => {
					if (res.code == 200) {
						res.data.forEach(item => {
							// console.log(item.siteName)
							// console.log(item.days)
							// console.log("-----------")
							if (item.days) {
								item.days = this.changeTime(item.days)
								let tmp = item.days;
								let date = new Date(tmp.replace(/-/g, "/")).getTime();
								let date1 = new Date(date);
								date1.getDate();
								let str = date1.getFullYear() + '-' + (date1.getMonth() + 1) +
									'-' + date1
									.getDate();
								item.days2 = str
								if (item.days.slice(0, 1) == 'N') {
									item.flag = 1;
									item.days2 = this.changeTime("2223-07-26T05:09:35.929Z")
								} else item.flag = 0
								//console.log(item.days2)
								//console.log(new Date(item.days2.replace(/-/g, '/')).getTime())
								//console.log(item.flag)
								//item.days =  Date.parse(new Date()),
							} else {
								item.flag = 1;
								item.days2 = this.changeTime("2223-07-26T05:09:35.929Z")
							}
						})
						//this.insDataList = res.data
						if (btnFlag == 1) {
							this.insDataList = res.data.sort(this.compare1)
						} else {
							this.insDataList = res.data.sort(this.compare2)
						}
						//console.log(this.insDataList)
						this.total = this.insDataList.length
						let data = this.insDataList.filter((item, index) => {
							const idx = index - (this.pageCurrent - 1) * this.pageSize
							return idx < this.pageSize && idx >= 0
						})
						//console.log(data)
						this.insDataListShow = data
						this.loading = false;
					}
				}); */
			},
			// 获取所有巡检记录
			getAllInsData(data) {
				reqGetAll(data).then(res => {
					if (res.code == 200) {
						res.data.forEach(item => {
							if (item.days) {
								item.days = parseTime(item.days)
								//item.days =  Date.parse(new Date()),
							}
						})
						this.insDataList = res.data
						//console.log(this.insDataList)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.album {
		margin-top: 3%;
		margin-left: 11%;
	}

	.uni-group {
		display: flex;
		align-items: center;
	}

	// 处理抽屉内容滚动
	.scroll-view-box {
		flex: 1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		padding-bottom: 5%;
	}

	.scroll-view {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1
	}
</style>