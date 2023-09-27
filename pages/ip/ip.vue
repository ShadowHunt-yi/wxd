<template>
	<view>
		<view class="content">
			<uni-forms labelWidth="160rpx" labelPosition="top">
				<uni-forms-item label="选择网段">
					<view style="display: flex;">
						<view style="width: 70%;margin-right: 5%;">
							<uni-data-select :localdata="networkType" v-model="value" :clear="false"
								placeholder="请选择网段">
							</uni-data-select>
						</view>
						<view style="margin-top: 1%;"><button class="bg-blue" size="mini"
								@click="getNetworkSegment">搜索</button>
						</view>
					</view>
				</uni-forms-item>
			</uni-forms>
			<!-- <view style=" display: flex;justify-content: space-around;">
				<view>
					<uni-tag :inverted="true" text="使用中" type="primary" />
				</view>
				<view>
					<uni-tag :inverted="true" text="已申请" type="success" />
				</view>
				<view>
					<uni-tag :inverted="true" text="违规" type="error" />
				</view>
				<view>
					<uni-tag :inverted="true" text="闲置" />
				</view>
			</view> -->
		</view>
		<view class="content2">
			<u-cell-group>
				<u-cell v-for="(item, index) in data" :index="index" :key="index" @click="openNew(item)" isLink>
					<view slot="title" class="u-slot-title">
						<text :class="[item.ipStatus==1 ? 'sy' :item.ipStatus==3? 'wg': item.ipStatus==2?'ysq':'xz']"
							style="margin-right: 5px;">{{item.ip}}</text>
						<uni-tag :inverted="true" text="使用中" type="success" size="mini" v-if="item.ipStatus==1" />
						<uni-tag :inverted="true" text="已申请" type="primary" size="mini" v-if="item.ipStatus==2" />
						<uni-tag :inverted="true" text="违规" type="error" size="mini" v-if="item.ipStatus==3" />
						<uni-tag :inverted="true" text="闲置" size="mini" v-if="item.ipStatus==0" />
					</view>
					<text slot="value"
						:class="[item.ipStatus==1 ? 'sy' :item.ipStatus==3? 'wg': item.ipStatus==2?'ysq':'xz']">{{item.equipment}}</text>
					<text slot="value" v-if="item.ipStatus==0" class="xz">
						申请
					</text>
				</u-cell>
				<!-- <u-cell v-for="(item, index) in data" :index="index" :key="index" :title="index+1"
						:value="item.equipment">
					</u-cell> -->
			</u-cell-group>
		</view>
		<!-- <view class="content2">
			<uni-grid :column="5" borderColor="#00539f" :showBorder="true">
				<uni-grid-item v-for="(item, index) in data" :index="index" :key="index">
					<view class="pop-div">
						<view style="margin-bottom: 15%;margin-top: 8%;">{{index}}</view>
						 0空闲 1正在使用 2正在申请 3违规 
						<u-divider text="分割线" :dot="true"></u-divider>
						<view
							:class="[item.ipStatus==1 ? 'name-shiyong' :item.ipStatus==3? 'name-error': item.ipStatus==2?'name-other':'name-xianzhi']">
							{{item.equipment}}
						</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view> -->

	</view>
</template>

<script>
	import {
		getIp,
		getNetwork
	} from '@/api/ip.js'
	export default {
		data() {
			return {
				value: null,
				networkType: [],
				/* range: [{
						value: 1,
						text: "192.168.1.0"
					},
					{
						value: 2,
						text: "192.168.2.0"
					},
					{
						value: 3,
						text: "192.168.3.0"
					},
					{
						value: 4,
						text: "192.168.4.0"
					},
					{
						value: 5,
						text: "192.168.5.0"
					},
				], */
				data: [],
			}
		},
		mounted() {
			this.getNetType();
			//this.getNetworkSegment();
		},
		/* onPullDownRefresh() {
			//this.getNetworkSegment();
			this.getNetType();
			uni.stopPullDownRefresh();
		}, */
		methods: {
			reload() {
				this.$nextTick(() => {
					this.getNetworkSegment();
				})
			},
			//获取所有网络号
			getNetType() {
				let arr = []
				this.networkType = []
				getIp().then(res => {
					res.data.forEach(el => {
						arr.push(parseInt(el.ip.slice(8)))
					})
					arr = arr.filter((Element, index, self) => {
						return self.indexOf(Element) === index
					})
					//根据大小为arr排序
					let interval = parseInt(arr.length / 2); //分组间隔设置
					while (interval > 0) {
						for (let i = 0; i < arr.length; i++) {
							let n = i;
							while (arr[n] < arr[n - interval] && n > 0) {
								let temp = arr[n];
								arr[n] = arr[n - interval];
								arr[n - interval] = temp;
								n = n - interval;
							}
						}
						interval = parseInt(interval / 2);
					}
					// console.log(arr)
					arr.forEach(el => {
						this.networkType.push({
							text: `192.168.${el}.0`,
							value: `${el}`
						})
					})
				})
			},
			openNew(item) {
				if (item.ipStatus) {
					uni.navigateTo({
						//保留当前页面，跳转到应用内的某个页面
						url: `/pages/ip/ipDetail?ip=${item.ip}`
					})
				} else {
					uni.navigateTo({
						//保留当前页面，跳转到应用内的某个页面
						url: `/pages/ip/ipApply?ip=${item.ip}`
					})
				}
				/* this.$refs.popup.open(); */
			},
			getNetworkSegment() {
				getNetwork(this.value).then(response => {
					this.data = response.data
					this.data.forEach(item => {
						if (!item.equipment) {
							item.equipment = '';
						}
					})
				});
			},
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #fff;
		width: 92%;
		margin: auto;
		margin-top: 3%;
		box-shadow: 0px 0px 10rpx 5rpx rgb(205, 205, 205);
		border-radius: 10rpx;
		padding: 3%;
		margin-bottom: 5%;
	}

	.content2 {
		width: 92%;
		margin: auto;
		background-color: white;
		box-shadow: 0px 0px 10rpx rgb(205, 205, 205);
		border-radius: 10rpx;
		margin-bottom: 5%;
	}

	.u-slot-title {
		@include flex;
		flex-direction: row;
		align-items: center;
	}


	.ysq {
		font-size: 15px;
		line-height: 22px;
		color: #2979ff;
	}

	.xz {
		font-size: 15px;
		line-height: 22px;
		color: #8f939c;
	}

	.wg {
		font-size: 15px;
		line-height: 22px;
		color: #e43d33;
	}

	.sy {
		font-size: 15px;
		line-height: 22px;
		color: #18bb37;
	}

	.pop-div {
		background-color: #fff;
		height: 100%;
		text-align: center;
	}
</style>