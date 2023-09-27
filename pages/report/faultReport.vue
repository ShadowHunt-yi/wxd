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
					size="large" :titleStyle="ts"
					:url="`/pages/report/faultReportDetail?name=${item.siteName}&type=${item.siteType}`"
					icon="order"></u-cell>
				<u-loadmore :status="status" loadmoreText="向上滑动加载更多" />
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		getSiteLocationByInfo,
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
				ts: {
					fontSize: '30rpx'
				}
			}
		},
		mounted() {
			this.searchSite();
		},
		methods: {
			onReachBottom() {
				if (this.siteList2.length == this.siteList.length) return;
				this.status = 'loading';
				setTimeout(() => {
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
				this.region = e.detail.value[0].text;
				this.$modal.loading("搜索中...")
				this.searchSite();
				let _this = this;
				setTimeout(function() {
					_this.$modal.closeLoading();
				}, 1000)
			},
			onchange2(e) {
				this.type = e.detail.value[0].value;
				this.$modal.loading("搜索中...")
				this.searchSite();
				let _this = this;
				setTimeout(function() {
					_this.$modal.closeLoading();
				}, 1000)
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
			},
			// 查询站点
			searchSite() {
				let city = "";
				getSiteLocationByInfo(city, this.region, this.type, this.siteName).then(res => {
					if (res.code == 200) {
						this.siteList = [];
						this.siteList = res.data;
						this.siteList2 = this.siteList.slice(0, 30)
					}
				});
			},
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
</style>