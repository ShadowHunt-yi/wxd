<template>
	<view style="padding-bottom: 5%;">
		<view>
			<uni-section title="站点查询" type="line">
				<view>
					<view class="div2">
						<uni-data-picker placeholder="请选择所在地区" popup-title="请选择所在地区" :localdata="dataTree"
							v-model="region" @change="onchange" :clear-icon="false">
						</uni-data-picker>
					</view>
					<view class="div2">
						<uni-data-picker :localdata="cityData" placeholder="请选择站点类型" popup-title="请选择站点类型"
							v-model="type" @change="onchange2" :clear-icon="false">
						</uni-data-picker>
					</view>
					<view class="div2">
						<uni-easyinput v-model="siteName" placeholder="请输入站点名称" />
					</view>
					<view class="btn">
						<view>
							<button class="bg-blue" size="mini" @click="searchSite2">查询</button>
						</view>
						<view class="btnn">
							<button class="bg-blue" size="mini" @click="reSet">重置</button>
						</view>
					</view>
				</view>
			</uni-section>
		</view>
		<u-divider text="站点列表" lineColor="#000000" textSize="32rpx"></u-divider>
		<view style="background-color: white;">
			<u-cell-group>
				<u-cell :title="item.siteName" v-for="(item, index) in siteList2" :key="index" :isLink="true"
					size="large" :titleStyle="ts" :url="`/pages/patrol/patrolDetail?name=${item.siteName}`"
					icon="order"></u-cell>
				<u-loadmore :status="status" loadmoreText="向上滑动加载更多" />
			</u-cell-group>
		</view>
		<!-- <view v-for="(item, index) in siteList" :key="index" class="all-task">
			<view class="icon-div">
				<uni-icons type="flag" size="60rpx"></uni-icons>
			</view>
			<view class="other-div">
				<view>
					<u-cell :title="`${item.siteName}`" :isLink="true" :border="false" :titleStyle="ts"
						:url="`/pages/patrol/taskDetail?name=${item.siteName}&type=${item.siteType}`"></u-cell>
				</view>
				<view class="weizhi">
					站点位置：{{item.region}}
				</view>
			</view>
		</view> -->
	</view>
	<!-- <view v-if="current === 2">
			<view v-for="(item, index) in arr2" :key="index" class="all-task">
				<view class="icon-div">
					<uni-icons type="checkmarkempty" size="60rpx"></uni-icons>
				</view>
				<view class="other-div">
					<view class="bianhao">
						任务编号:{{item.id}}
					</view>
					<view>
						<u-cell :title="`${item.siteName}`" :isLink="true" :border="false" :titleStyle="ts"></u-cell>
					</view>
					<view class="weizhi">
						巡检人员：{{item.checkPerson}}
					</view>
				</view>
			</view>
		</view> -->
</template>

<script>
	import {
		getSiteLocationByInfo,
		/* getTaskPatroling */
	} from '@/api/task.js'
	export default {
		data() {
			return {
				flag: 50,
				status: 'loadmore',
				siteName: '',
				region: '',
				type: '',
				cityData: [{
					text: "固定检查站",
					value: "1",
				}, {
					text: "移动监测站",
					value: "2",
				}, {
					text: "可搬移监测站",
					value: "3",
				}, {
					text: "传感器",
					value: "4",
				}, {
					text: "便携式监测设备",
					value: "5",
				}, {
					text: "空中检测站",
					value: "6",
				}, {
					text: "专用检测系统",
					value: "7",
				}, {
					text: "省级检测指挥中心、地市级检测控制中心",
					value: "8",
				}, {
					text: "检测设备",
					value: "9",
				}, {
					text: "管制设备",
					value: "10",
				}],
				dataTree: [{
						value: "成都市",
						text: "成都市",
					},
					{
						text: "郫都区",
						value: "郫都区",
					},
					{
						text: "武侯区",
						value: "武侯区",
					},
					{
						text: "锦江区",
						value: "锦江区",
					},
					{
						text: "青羊区",
						value: "青羊区",
					},
					{
						text: "金牛区",
						value: "金牛区",
					},
					{
						text: "成华区",
						value: "成华区",
					},
					{
						text: "龙泉驿区",
						value: "龙泉驿区",
					},
					{
						text: "温江区",
						value: "温江区",
					},
					{
						text: "新都区",
						value: "新都区",
					},
					{
						text: "双流区",
						value: "双流区",
					},
					{
						text: "青白江区",
						value: "青白江区",
					},
				],
				siteList: [],
				siteList2: [],
				/* arr: [],
				arr2: [], */
				ts: {
					fontSize: '30rpx'
				}
			}
		},
		mounted() {
			this.searchSite();
		},
		onPullDownRefresh() {
			/* this.arr = [];
			this.arr2 = []; */
			this.region = "";
			this.type = "";
			this.siteName = "";
			this.searchSite();
			//this.getTask();
			uni.stopPullDownRefresh();
		},
		methods: {
			onReachBottom() {
				if (this.siteList2.length == this.siteList.length) return;
				this.status = 'loading';
				setTimeout(() => {
					/* console.log(this.flag)
					for (let i = 0; i < 50; i++) {
						if (this.flag <= this.siteList.length) {
							this.siteList2[this.flag] = this.siteList[this.flag];
							this.flag++;
						}
					}
					console.log(this.siteList2.length) */
					if (this.flag <= this.siteList.length) {
						this.flag = this.flag + 50;
						this.siteList2 = this.siteList.slice(0, this.flag)
					} else {
						this.siteList2 = this.siteList
					}
					if (this.siteList2.length == this.siteList.length) this.status = 'nomore';
					else this.status = 'loading';
				}, 2000)
			},
			onchange(e) {
				/* this.city = e.detail.value[0].text
				this.region = e.detail.value[1].text */
				this.region = e.detail.value[0].text;
				this.$modal.loading("搜索中...")
				this.searchSite();
				let _this = this;
				setTimeout(function() {
					_this.$modal.closeLoading();
				}, 1000)
				//console.log(tmp)
			},
			onchange2(e) {
				this.type = e.detail.value[0].value;
				this.$modal.loading("搜索中...")
				this.searchSite();
				let _this = this;
				setTimeout(function() {
					_this.$modal.closeLoading();
				}, 1000)
				//console.log(e)
			},
			searchSite2() {
				this.$modal.loading("搜索中...")
				this.searchSite();
				let _this = this;
				setTimeout(function() {
					_this.$modal.closeLoading();
				}, 1000)
			},
			reSet() {
				this.region = "";
				this.type = "";
				this.siteName = "";
				//this.searchSite();
			},
			// 查询站点
			searchSite() {
				let city = "";
				getSiteLocationByInfo(city, this.region, this.type, this.siteName).then(res => {
					// 请求成功
					if (res.code == 200) {
						this.siteList = [];
						this.siteList = res.data;
						this.siteList2 = this.siteList.slice(0, 30)
						//console.log(this.siteList[290])
					}
				});
			},
			/* getTask() {
				getTaskPatroling().then(res => {
					// 请求成功
					if (res.code == 200) {
						res.data.forEach(item => {
							if (item.checkStatus == 1) {
								this.arr.push(item)
							} else if (item.checkStatus == 2) {
								this.arr2.push(item)
							}
						})
					}
				})
			} */
		}
	}
</script>

<style lang="scss">
	.btn {
		margin-left: 65%;
		display: flex;
		padding-bottom: 1%;

		.btnn {
			margin-left: 4%;
		}
	}

	.div2 {
		width: 60%;
		margin: 2% 0 2% 4%;
	}

	.other-div {
		width: 100%;
	}

	/* .uni-padding-wrap {
		width: 100%;
		background-color: #ffffff;
	} */

	.all-task {
		background-color: #ffffff;
		display: flex;
		// border: 4rpx #00539f solid;
		width: 94%;
		margin: auto;
		margin-bottom: 3%;
		margin-top: 3%;
		padding: 1%;
		border-radius: 30rpx;
	}

	.icon-div {
		display: flex;
		align-items: center;
		margin-left: 2%;
	}

	.bianhao {
		font-size: 26rpx;
		color: #8d8d8d;
		margin-left: 6%;
	}

	.weizhi {
		font-size: 26rpx;
		margin-left: 6%;
	}
</style>