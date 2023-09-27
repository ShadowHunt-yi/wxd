<template>
	<view style="padding-bottom: 5%;">
		<!-- <view class="swiper-item">
			<image src="../../static/images/banner/banner.jpg" mode="widthFix" :draggable="false"></image>
		</view> -->
		<view class="div1">
			<view style="display: flex;justify-content: center;margin-top: 5%;margin-bottom: 3%;">
				<view><text style="font-weight: bolder;font-size: 40rpx;">{{siteName}}</text></view>
				<view style="margin-top: 1.5%;margin-left: 10%">
					<text style="font-weight: bolder;font-size: 38rpx;">{{serialNumber}}</text>
				</view>
			</view>
			<view style="font-weight: bold;font-size: 34rpx;">
				<view style="display: flex;justify-content: center;" v-if="detail.last_update">
					{{detail.last_update.substring(0,detail.last_update.length-3)}}
				</view>
				<view style="display: flex;justify-content: center;margin-top: 2%;">
					{{detail.ip}}，{{detail.ip1}}，{{detail.ip3}}
				</view>
				<view style="margin-top: 2%;display: flex;justify-content: center;">市电<text
						v-if="detail.isAcs==1">正常</text><text v-else>异常</text>，网络<text
						v-if="detail.isVpn==1">正常</text><text v-else>异常</text>，设备<text
						v-if="detail.isDev==1">正常</text><text v-else>异常</text>
				</view>
				<view
					style="margin-top: 2%;display: flex;justify-content: center;display: flex;justify-content: center;">
					主电压：{{detail.mainVoltage}}V，备用电压：{{detail.backupVoltage}}V</view>
				<view style="margin-top: 2%;display: flex;justify-content: center;">
					温度：{{detail.temp}}℃，被测设备IP：{{detail.ip2}}</view>
			</view>
			<u-divider text="日志清单" lineColor="#000000" textSize="34rpx"></u-divider>
			<view style="margin-left: 5%;margin-top: 5%;">
				<view v-for="(item, index) in detailArr" :key="index" style="margin-bottom: 2%;">
					{{item.time1.slice(5)}}<text v-if="item.flag==0">停电</text><text
						v-else-if="item.flag==1">网络故障</text><text v-else>设备故障</text>，<text
						v-if="item.time2.slice(0,1)!=0">{{item.time2.slice(5)}}</text>
					<text v-else>未</text>恢复
				</view>
				<!-- <view v-for="(item, index) in detailArr1" :key="index" style="margin-bottom: 2%;">
					{{item.acs_cut_time.slice(5)}}停电，<text
						v-if="item.acs_recovery_time.slice(0,1)!=0">{{item.acs_recovery_time.slice(5)}}</text>
					<text v-else>未</text>恢复
				</view>
				<view v-for="(item, index) in detailArr2" :key="index" style="margin-bottom: 2%;">
					{{item.vpn_cut_time.slice(5)}}网络故障，<text
						v-if="item.vpn_recovery_time.slice(0,1)!=0">{{item.vpn_recovery_time.slice(5)}}</text>
					<text v-else>未</text>恢复
				</view>
				<view v-for="(item, index) in detailArr3" :key="index" style="margin-bottom: 2%;">
					{{item.dev_cut_time.slice(5)}}设备故障，<text
						v-if="item.dev_recovery_time.slice(0,1)!=0">{{item.dev_recovery_time.slice(5)}}</text>
					<text v-else>未</text>恢复
				</view> -->
			</view>
		</view>

		<!-- <view class="div2" style="margin-bottom: 50rpx;">
			<view style="color: white;">
				<view style="margin-bottom: 2%;">
					<text>温度：<text style="font-size: 36rpx;font-weight: bolder;">30</text>℃</text>
				</view>
			</view>
		</view> -->
		<!-- <view style="margin-bottom: 15rpx;">
			<uni-section :title="siteName+' 实时状态'" type="line">
				
				
				<template v-slot:right>
					最近温度：{{tmp}}℃
				</template>
				
				
				
				<view>
					<view v-if="current === 0">
						
						
						<view style="margin-top: 15rpx;">
							<button class="bg-gradual-blue" size="mini" @click="flag1=!flag1"
								v-if="flag1==0">查看温度统计图</button>
							<button class="bg-gradual-blue" size="mini" @click="flag1=!flag1"
								v-if="flag1==1">关闭温度统计图</button>
						</view>
						
						
						
						
						<view style="margin-top: 15rpx;" v-if="flag1==1">
							<qiun-data-charts type="line" :opts="opts" :chartData="chartData" :ontouch="true" />
						</view>
						<view style="margin-top: 15rpx;" v-if="flag2==1">
							<qiun-data-charts type="column" :opts="opts2" :chartData="chartData3" :ontouch="true" />
						</view>
						
						
						<view style="margin-top: 15rpx;">
							<uni-data-select :localdata="dayArr" @change="change" placeholder="请选择日期" :clear="false">
							</uni-data-select>
						</view>
						
						
						
						<view style="display: flex;margin-top: 15rpx;margin-left: 25.5%;">
							<view class="action-btn">
								<button plain="true" size="mini" @click="goPrevious1">←</button>
							</view>
							<view class="action-btn">
								<button plain="true" size="mini">{{dayArr.statistical_period}}</button>
							</view>
							<view class="action-btn">
								<button plain="true" size="mini" @click="goNext1">→</button>
							</view>
						</view>
						<view style="margin-top: 15rpx;" class="uni-padding-wrap">
							<u-cell-group>
								<u-cell>
									<view slot="title" class="u-slot-title">
										<text style="font-size: 30rpx;line-height: 44rpx;color: #303133;">停电次数</text>
									</view>
									<text slot="value" class="zz">{{dayArr.acs_cut_total}}</text>
								</u-cell>
								<u-cell>
									<view slot="title" class="u-slot-title">
										<text
											style="font-size: 30rpx;line-height: 44rpx;color: #303133;">传输网络掉线次数</text>
									</view>
									<text slot="value" class="zz">{{dayArr.vpn_cut_total}}</text>
								</u-cell>
								<u-cell>
									<view slot="title" class="u-slot-title">
										<text
											style="font-size: 30rpx;line-height: 44rpx;color: #303133;">设备网络掉线次数</text>
									</view>
									<text slot="value" class="zz">{{dayArr.dev_cut_total}}</text>
								</u-cell>
							</u-cell-group>
						</view>
						<view class="uni-padding-wrap" style="margin-top: 3%;">
							<uni-segmented-control :current="current2" :values="items2" style-type="button"
								:active-color="activeColor" @clickItem="onClickItem2" />
						</view>
						<view v-if="current2 === 0" style="padding-bottom: 3%;">
							<view style="margin-top: 15rpx;" v-if="l11!=0">
								<u-cell-group>
									<u-cell v-for="(item, index) in dayArr.acs_cut_info" :index="index" :key="index">
										<view slot="title" class="u-slot-title" style="padding: 0px 60rpx;">
											<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
												停电开始时间：{{item.acs_cut_time}}，停电持续：{{item.acs_cut_duration_time}}分钟，恢复时间：{{item.acs_recovery_time}}，供电正常：{{item.acs_normal_duration_time}}分钟
											</text>
										</view>
									</u-cell>
								</u-cell-group>
							</view>
							<view style="margin-top: 15rpx;margin-left: 45%" v-if="l11==0">
								<text style="font-weight: bolder;font-size: 35rpx;">无</text>
							</view>
						</view>
						<view v-if="current2 === 1" style="padding-bottom: 3%;">
							<view style="margin-top: 15rpx;" v-if="l12!=0">
								<u-cell-group>
									<u-cell v-for="(item, index) in dayArr.vpn_cut_info" :index="index" :key="index">
										<view slot="title" class="u-slot-title" style="padding: 0px 60rpx;">
											<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
												故障开始时间：{{item.vpn_lose_time}}，故障持续：{{item.vpn_cut_duration_time}}分钟，恢复时间：{{item.vpn_recovery_time}}，网络正常：{{item.vpn_normal_duration_time}}分钟
											</text>
										</view>
									</u-cell>
								</u-cell-group>
							</view>
							<view style="margin-top: 15rpx;margin-left: 45%" v-if="l12==0">
								<text style="font-weight: bolder;font-size: 35rpx;">无</text>
							</view>
						</view>
						<view v-if="current2 === 2" style="padding-bottom: 3%;">
							<view style="margin-top: 15rpx;" v-if="l13!=0">
								<u-cell-group>
									<u-cell v-for="(item, index) in dayArr.dev_cut_info" :index="index" :key="index">
										<view slot="title" class="u-slot-title" style="padding: 0px 60rpx;">
											<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
												故障开始时间：{{item.dev_lose_time}}，故障持续：{{item.dev_cut_duration_time}}分钟，恢复时间：{{item.dev_recovery_time}}，设备正常：{{item.dev_normal_duration_time}}分钟
											</text>
										</view>
									</u-cell>
								</u-cell-group>
							</view>
							<view style="margin-top: 15rpx;margin-left: 45%" v-if="l13==0">
								<text style="font-weight: bolder;font-size: 35rpx;">无</text>
							</view>
						</view>
					</view>
					<view v-if="current === 1">
						
						<view style="margin-top: 15rpx;" v-if="flag3==1">
							<qiun-data-charts type="line" :opts="opts" :chartData="chartData2" :ontouch="true" />
						</view>
						<view style="margin-top: 15rpx;" v-if="flag4==1">
							<qiun-data-charts type="column" :opts="opts2" :chartData="chartData3" :ontouch="true" />
						</view>
						<view style="display: flex;margin-left: 27.5%;margin-top: 15rpx;">
							<view class="action-btn">
								<button plain="true" size="mini" @click="goPrevious2">←</button>
							</view>
							<view class="action-btn">
								<button plain="true" size="mini">{{monthArr.statistical_period}}</button>
							</view>
							<view class="action-btn">
								<button plain="true" size="mini" @click="goNext2">→</button>
							</view>
						</view>
						<view style="margin-top: 15rpx;" class="uni-padding-wrap">
							<u-cell-group>
								<u-cell>
									<view slot="title" class="u-slot-title">
										<text style="font-size: 30rpx;line-height: 44rpx;color: #303133;">停电次数</text>
									</view>
									<text slot="value" class="zz">{{monthArr.acs_cut_total}}</text>
								</u-cell>
								<u-cell>
									<view slot="title" class="u-slot-title">
										<text
											style="font-size: 30rpx;line-height: 44rpx;color: #303133;">传输网络掉线次数</text>
									</view>
									<text slot="value" class="zz">{{monthArr.vpn_cut_total}}</text>
								</u-cell>
								<u-cell>
									<view slot="title" class="u-slot-title">
										<text
											style="font-size: 30rpx;line-height: 44rpx;color: #303133;">设备网络掉线次数</text>
									</view>
									<text slot="value" class="zz">{{monthArr.dev_cut_total}}</text>
								</u-cell>
							</u-cell-group>
						</view>
						<view class="uni-padding-wrap" style="margin-top: 3%;">
							<uni-segmented-control :current="current2" :values="items2" style-type="button"
								:active-color="activeColor" @clickItem="onClickItem2" />
						</view>
						<view v-if="current2 === 0" style="padding-bottom: 3%;">
							<view style="margin-top: 15rpx;" v-if="l21!=0">
								<u-cell-group>
									<u-cell v-for="(item, index) in monthArr.acs_cut_info" :index="index" :key="index">
										<view slot="title" class="u-slot-title" style="padding: 0px 60rpx;">
											<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
												停电开始时间：{{item.acs_cut_time}}，停电持续：{{item.acs_cut_duration_time}}分钟，恢复时间：{{item.acs_recovery_time}}，供电正常：{{item.acs_normal_duration_time}}分钟
											</text>
										</view>
									</u-cell>
								</u-cell-group>
							</view>
							<view style="margin-top: 15rpx;margin-left: 45%" v-if="l21==0">
								<text style="font-weight: bolder;font-size: 35rpx;">无</text>
							</view>
						</view>
						<view v-if="current2 === 1" style="padding-bottom: 3%;">
							<view style="margin-top: 15rpx;" v-if="l22!=0">
								<u-cell-group>
									<u-cell v-for="(item, index) in monthArr.vpn_cut_info" :index="index" :key="index">
										<view slot="title" class="u-slot-title" style="padding: 0px 60rpx;">
											<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
												故障开始时间：{{item.vpn_lose_time}}，故障持续：{{item.vpn_cut_duration_time}}分钟，恢复时间：{{item.vpn_recovery_time}}，网络正常：{{item.vpn_normal_duration_time}}分钟
											</text>
										</view>
									</u-cell>
								</u-cell-group>
							</view>
							<view style="margin-top: 15rpx;margin-left: 45%" v-if="l22==0">
								<text style="font-weight: bolder;font-size: 35rpx;">无</text>
							</view>
						</view>
						<view v-if="current2 === 2" style="padding-bottom: 3%;">
							<view style="margin-top: 15rpx;" v-if="l23!=0">
								<u-cell-group>
									<u-cell v-for="(item, index) in monthArr.dev_cut_info" :index="index" :key="index">
										<view slot="title" class="u-slot-title" style="padding: 0px 60rpx;">
											<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
												故障开始时间：{{item.dev_lose_time}}，故障持续：{{item.dev_cut_duration_time}}分钟，恢复时间：{{item.dev_recovery_time}}，设备正常：{{item.dev_normal_duration_time}}分钟
											</text>
										</view>
									</u-cell>
								</u-cell-group>
							</view>
							<view style="margin-top: 15rpx;margin-left: 45%" v-if="l23==0">
								<text style="font-weight: bolder;font-size: 35rpx;">无</text>
							</view>
						</view>
					</view>
					<view v-if="current === 2">
						<view style="display: flex;margin-left: 29.5%;margin-top: 15rpx;">
							<view class="action-btn">
								<button plain="true" size="mini" @click="goPrevious3">←</button>
							</view>
							<view class="action-btn">
								<button plain="true" size="mini">{{yearArr.statistical_period}}</button>
							</view>
							<view class="action-btn">
								<button plain="true" size="mini" @click="goNext3">→</button>
							</view>
						</view>
						<view style="margin-top: 15rpx;" class="uni-padding-wrap">
							<u-cell-group>
								<u-cell>
									<view slot="title" class="u-slot-title">
										<text style="font-size: 30rpx;line-height: 44rpx;color: #303133;">停电次数</text>
									</view>
									<text slot="value" class="zz">{{yearArr.acs_cut_total}}</text>
								</u-cell>
								<u-cell>
									<view slot="title" class="u-slot-title">
										<text
											style="font-size: 30rpx;line-height: 44rpx;color: #303133;">传输网络掉线次数</text>
									</view>
									<text slot="value" class="zz">{{yearArr.vpn_cut_total}}</text>
								</u-cell>
								<u-cell>
									<view slot="title" class="u-slot-title">
										<text
											style="font-size: 30rpx;line-height: 44rpx;color: #303133;">设备网络掉线次数</text>
									</view>
									<text slot="value" class="zz">{{yearArr.dev_cut_total}}</text>
								</u-cell>
							</u-cell-group>
						</view>
						<view class="uni-padding-wrap" style="margin-top: 3%;">
							<uni-segmented-control :current="current2" :values="items2" style-type="button"
								:active-color="activeColor" @clickItem="onClickItem2" />
						</view>
						<view v-if="current2 === 0" style="padding-bottom: 3%;">
							<view style="margin-top: 15rpx;" v-if="l31!=0">
								<u-cell-group>
									<u-cell v-for="(item, index) in yearArr.acs_cut_info" :index="index" :key="index">
										<view slot="title" class="u-slot-title" style="padding: 0px 60rpx;">
											<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
												停电开始时间：{{item.acs_cut_time}}，停电持续：{{item.acs_cut_duration_time}}分钟，恢复时间：{{item.acs_recovery_time}}，供电正常：{{item.acs_normal_duration_time}}分钟
											</text>
										</view>
									</u-cell>
								</u-cell-group>
							</view>
							<view style="margin-top: 15rpx;margin-left: 45%" v-if="l31==0">
								<text style="font-weight: bolder;font-size: 35rpx;">无</text>
							</view>
						</view>
						<view v-if="current2 === 1" style="padding-bottom: 3%;">
							<view style="margin-top: 15rpx;" v-if="l32!=0">
								<u-cell-group>
									<u-cell v-for="(item, index) in yearArr.vpn_cut_info" :index="index" :key="index">
										<view slot="title" class="u-slot-title" style="padding: 0px 60rpx;">
											<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
												故障开始时间：{{item.vpn_lose_time}}，故障持续：{{item.vpn_cut_duration_time}}分钟，恢复时间：{{item.vpn_recovery_time}}，网络正常：{{item.vpn_normal_duration_time}}分钟
											</text>
										</view>
									</u-cell>
								</u-cell-group>
							</view>
							<view style="margin-top: 15rpx;margin-left: 45%" v-if="l32==0">
								<text style="font-weight: bolder;font-size: 35rpx;">无</text>
							</view>
						</view>
						<view v-if="current2 === 2" style="padding-bottom: 3%;">
							<view style="margin-top: 15rpx;" v-if="l33!=0">
								<u-cell-group>
									<u-cell v-for="(item, index) in yearArr.dev_cut_info" :index="index" :key="index">
										<view slot="title" class="u-slot-title" style="padding: 0px 60rpx;">
											<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
												故障开始时间：{{item.dev_lose_time}}，故障持续：{{item.dev_cut_duration_time}}分钟，恢复时间：{{item.dev_recovery_time}}，设备正常：{{item.dev_normal_duration_time}}分钟
											</text>
										</view>
									</u-cell>
								</u-cell-group>
							</view>
							<view style="margin-top: 15rpx;margin-left: 45%" v-if="l33==0">
								<text style="font-weight: bolder;font-size: 35rpx;">无</text>
							</view>
						</view>
					</view>
				</view>
			</uni-section>
		</view> -->
		<!-- <view style="padding-bottom: 20rpx;background-color: white;">
			<uni-section title="故障详情" type="line">
				<view>
					<u-cell-group>
						<u-cell v-for="(item, index) in 5" :index="index" :key="index">
							<view slot="title" class="u-slot-title">
								<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
									5月5日10:20停电，5月5日11:20来电，时长60分钟
								</text>
							</view>
						</u-cell>
					</u-cell-group>
				</view>
			</uni-section>
		</view> -->
	</view>
</template>

<script>
	import axios from "axios";
	import {
		getSiteDetail
	} from '@/api/status.js'
	export default {
		data() {
			return {
				flag1: 0,
				flag2: 0,
				flag3: 0,
				flag4: 0,
				l11: 0,
				l12: 0,
				l13: 0,
				l21: 0,
				l22: 0,
				l23: 0,
				l31: 0,
				l32: 0,
				l33: 0,
				siteName: '',
				serialNumber: '',
				area_info: [],
				arr: [],
				tmp: '',
				dayArr: [],
				dayStatus: [],
				yearArr: [],
				monthArr: [],
				currentArr: [],
				currentArr2: [],
				sxl: '',
				zsc: "",
				monthArr: [],
				temp: '',
				detailArr1: [],
				detailArr2: [],
				detailArr3: [],
				detail: [],
				detailArr: [],
			}
		},
		onLoad(e) {
			this.siteName = e.sitename;
			this.serialNumber = e.serialNumber;
		},
		mounted() {
			this.getSiteDetail();
			//console.log(this.Line.series)
		},
		methods: {
			/* compare1(a, b) {
				if (new Date(a.acs_cut_time).getTime() < new Date(b.acs_cut_time).getTime())
					return -1;
				if (new Date(a.acs_cut_time).getTime() > new Date(b.acs_cut_time).getTime())
					return 1;
				return 0;
			},
			compare2(a, b) {
				if (new Date(a.vpn_cut_time).getTime() < new Date(b.vpn_cut_time).getTime())
					return -1;
				if (new Date(a.vpn_cut_time).getTime() > new Date(b.vpn_cut_time).getTime())
					return 1;
				return 0;
			},
			compare3(a, b) {
				if (new Date(a.dev_cut_time).getTime() < new Date(b.dev_cut_time).getTime())
					return -1;
				if (new Date(a.dev_cut_time).getTime() > new Date(b.dev_cut_time).getTime())
					return 1;
				return 0;
			}, */
			compare(a, b) {
				if (new Date(a.time1.replace(/-/g, '/')).getTime() < new Date(b.time1.replace(/-/g, '/'))
					.getTime())
					return 1;
				if (new Date(a.time1.replace(/-/g, '/')).getTime() > new Date(b.time1.replace(/-/g, '/'))
					.getTime())
					return -1;
				return 0;
			},
			/* compare(a, b) {
				if (new Date(a.time).getTime() < new Date(b.time).getTime())
					return -1;
				if (new Date(a.time).getTime() > new Date(b.time).getTime())
					return 1;
				return 0;
			}, */
			getSiteDetail() {
				getSiteDetail(this.serialNumber).then(res => {
					this.detail = res.d;
					if (res.d.acs_cut_info.length) {
						//this.detailArr1 = res.d.acs_cut_info.sort(this.compare1);
						res.d.acs_cut_info.forEach((item) => {
							this.detailArr.push({
								time1: item.acs_cut_time,
								time2: item.acs_recovery_time,
								flag: 0
							})
						});
					};
					if (res.d.vpn_cut_info.length) {
						//this.detailArr2 = res.d.vpn_cut_info.sort(this.compare2);
						res.d.vpn_cut_info.forEach((item) => {
							this.detailArr.push({
								time1: item.vpn_cut_time,
								time2: item.vpn_recovery_time,
								flag: 1
							})
						});
					};
					if (res.d.dev_cut_info.length) {
						//this.detailArr3 = res.d.dev_cut_info.sort(this.compare3);
						res.d.dev_cut_info.forEach((item) => {
							this.detailArr.push({
								time1: item.dev_cut_time,
								time2: item.dev_recovery_time,
								flag: 2
							})
						});
					};
					/* this.detailArr.forEach((item) => {
						console.log(new Date(item.time1.replace(/-/g, '/')).getTime())
					});
					console.log("/////////////////////////////////////") */
					this.detailArr.sort(this.compare);
					/* this.detailArr.forEach((item) => {
						console.log(new Date(item.time1.replace(/-/g, '/')).getTime())
					}); */
					/*let flag = this.detailArr1.length;
					this.detailArr2 = this.detailArr2.slice(0, 5 - flag);
					let flag2 = this.detailArr2.length;
					this.detailArr3 = this.detailArr3.slice(0, 5 - flag - flag2); */
				});
			},
			goPrevious1() {
				let tmp = this.dayArr.statistical_period;
				let date = new Date(tmp).getTime() - 1000 * 60 * 60 * 24;
				let date1 = new Date(date);
				date1.getDate();
				let month = (date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : '0' + (date1.getMonth() + 1);
				let day = (date1.getDate()) > 9 ? (date1.getDate()) : '0' + (date1.getDate());
				let str = date1.getFullYear() + '-' + month + '-' + day;
				this.dayArr.statistical_period = str;
				getStatisticsInfo3(this.serialNumber, this.dayArr.statistical_period).then(res => {
					console.log(res.d)
					this.dayArr = [];
					this.l11 = 0;
					this.l12 = 0;
					this.l13 = 0;
					this.dayArr = res.d;
					if (this.dayArr.acs_cut_info.length) {
						this.l11 = 1
					};
					if (res.d.vpn_cut_info.length) {
						this.l12 = 1
					};
					if (res.d.dev_cut_info.length) {
						this.l13 = 1
					};
				})


			},
			goNext1() {
				let tmp = this.dayArr.statistical_period;
				let date = new Date(tmp).getTime() + 1000 * 60 * 60 * 24;
				let date1 = new Date(date);
				date1.getDate();
				let month = (date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : '0' + (date1.getMonth() + 1);
				let day = (date1.getDate()) > 9 ? (date1.getDate()) : '0' + (date1.getDate());
				let str = date1.getFullYear() + '-' + month + '-' + day;
				this.dayArr.statistical_period = str;
				getStatisticsInfo3(this.serialNumber, this.dayArr.statistical_period).then(res => {
					this.dayArr = [];
					this.l11 = 0;
					this.l12 = 0;
					this.l13 = 0;
					this.dayArr = res.d;
					if (this.dayArr.acs_cut_info.length) {
						this.l11 = 1
					};
					if (res.d.vpn_cut_info.length) {
						this.l12 = 1
					};
					if (res.d.dev_cut_info.length) {
						this.l13 = 1
					};
				})

				//console.log(this.dayArr.statistical_period)
			},
			goPrevious2() {
				let tmp = this.monthArr.statistical_period;
				let date = new Date(tmp).getTime();
				let date1 = new Date(date);
				date1.getDate();
				let month = (date1.getMonth()) > 9 ? (date1.getMonth()) : '0' + (date1.getMonth());
				let str = date1.getFullYear() + '-' + month;
				this.monthArr.statistical_period = str;
				getStatisticsInfo4(this.serialNumber, this.monthArr.statistical_period).then(res => {
					console.log(res.d)
					this.monthArr = [];
					this.l21 = 0;
					this.l22 = 0;
					this.l23 = 0;
					this.monthArr = res.d;
					if (this.monthArr.acs_cut_info.length) {
						this.l21 = 1
					};
					if (res.d.vpn_cut_info.length) {
						this.l22 = 1
					};
					if (res.d.dev_cut_info.length) {
						this.l23 = 1
					};
				})
			},
			goNext2() {
				let tmp = this.monthArr.statistical_period;
				let date = new Date(tmp).getTime();
				let date1 = new Date(date);
				date1.getDate();
				let month = (date1.getMonth() + 2) > 9 ? (date1.getMonth() + 2) : '0' + (date1.getMonth() + 2);
				let str = date1.getFullYear() + '-' + month;
				this.monthArr.statistical_period = str;
				getStatisticsInfo4(this.serialNumber, this.monthArr.statistical_period).then(res => {
					console.log(res.d)
					this.monthArr = [];
					this.l21 = 0;
					this.l22 = 0;
					this.l23 = 0;
					this.monthArr = res.d;
					if (this.monthArr.acs_cut_info.length) {
						this.l21 = 1
					};
					if (res.d.vpn_cut_info.length) {
						this.l22 = 1
					};
					if (res.d.dev_cut_info.length) {
						this.l23 = 1
					};
				})
			},
			goPrevious3() {
				let tmp = this.yearArr.statistical_period;
				let date = new Date(tmp).getTime();
				let date1 = new Date(date);
				date1.getDate();
				let str = date1.getFullYear() - 1;
				this.yearArr.statistical_period = str;
				getStatisticsInfo5(this.serialNumber, this.yearArr.statistical_period).then(res => {
					console.log(res.d)
					this.yearArr = [];
					this.l31 = 0;
					this.l32 = 0;
					this.l33 = 0;
					this.yearArr = res.d;
					if (this.yearArr.acs_cut_info.length) {
						this.l31 = 1
					};
					if (res.d.vpn_cut_info.length) {
						this.l32 = 1
					};
					if (res.d.dev_cut_info.length) {
						this.l33 = 1
					};
				})
			},
			goNext3() {
				let tmp = this.yearArr.statistical_period;
				let date = new Date(tmp).getTime();
				let date1 = new Date(date);
				date1.getDate();
				let str = date1.getFullYear() + 1;
				this.yearArr.statistical_period = str;
				getStatisticsInfo5(this.serialNumber, this.yearArr.statistical_period).then(res => {
					console.log(res.d)
					this.yearArr = [];
					this.l31 = 0;
					this.l32 = 0;
					this.l33 = 0;
					this.yearArr = res.d;
					if (this.yearArr.acs_cut_info.length) {
						this.l31 = 1
					};
					if (res.d.vpn_cut_info.length) {
						this.l32 = 1
					};
					if (res.d.dev_cut_info.length) {
						this.l33 = 1
					};
				})
			},
			onClickItem2(e) {
				if (this.current2 !== e.currentIndex) {
					this.current2 = e.currentIndex
				}
			},
			getStatisticsInfo() {
				getStatisticsInfo(this.serialNumber).then(res => {
					this.dayArr = [];
					this.dayArr = res.d;

					/* let tmpArr = [];
					tmpArr = res.d.vpn_cut_info;
					//this.temp = tmpArr[0].tmp;
					let a2 = [];
					a2 = res.d.dev_cut_info;
					tmpArr.push(...a2);
					this.detailArr = res.d.acs_cut_info;
					this.detailArr.push(...tmpArr);
					this.detailArr = this.detailArr.slice(0, 5);
					console.log(this.detailArr) */
					if (this.dayArr.acs_cut_info.length) {
						this.l11 = 1;
						this.detailArr1 = res.acs.vpn_cut_info;
					};
					if (res.d.vpn_cut_info.length) {
						this.l12 = 1;
						this.detailArr2 = res.d.vpn_cut_info;
					};
					if (res.d.dev_cut_info.length) {
						this.l13 = 1;
						this.detailArr3 = res.d.dev_cut_info;
					};
					let flag = this.detailArr1.length;
					this.detailArr2 = this.detailArr2.slice(0, 5 - flag);
					let flag2 = this.detailArr2.length;
					this.detailArr3 = this.detailArr3.slice(0, 5 - flag - flag2);
					console.log(this.detailArr2)
					console.log(this.detailArr3)
					/* let flag = 0;
					for (let i = 0; i < 1; i++) {
						if (res.d.acs_cut_info.length >= 1) {
							this.detailArr[flag++] = res.d.acs_cut_info[i];
						};
					};
					for (let i = 0; i < 2; i++) {
						if (res.d.vpn_cut_info.length >= 2) {
							this.detailArr[flag++] = res.d.vpn_cut_info[i];
						} else if (res.d.vpn_cut_info.length == 1) {
							this.detailArr[flag++] = res.d.vpn_cut_info[i];
							i = 2;
						}
					};
					console.log(this.detailArr) */
					/* for (let i = 0; flag = 6; i++) {
						if (res.d.dev_cut_info.length >= 2) {
							this.detailArr[flag++] = res.d.dev_cut_info[i];
						} else if (res.d.vpn_cut_info.length == 1) {
							this.detailArr[flag++] = res.d.dev_cut_info[i];
							flag = 6;
						}
					}; */
					//console.log(this.detailArr)
					/* this.l11=this.dayArr.acs_cut_info.length;
					this.l12=this.dayArr.vpn_cut_info.length;
					this.l13=this.dayArr.dev_lose_info.length; */
					//console.log(this.dayArr)
				})
				getStatisticsInfo2("month", this.serialNumber).then(res => {
					this.monthArr = [];
					this.monthArr = res.d;
					if (res.d.acs_cut_info.length) {
						this.l21 = 1
					};
					if (res.d.vpn_cut_info.length) {
						this.l22 = 1
					};
					if (res.d.dev_cut_info.length) {
						this.l23 = 1
					};
					/* this.l21 = this.monthArr.acs_cut_info.length;
					this.l22 = this.monthArr.vpn_cut_info.length;
					this.l23 = this.monthArr.dev_lose_info.length; */
					//console.log(this.monthArr)
				})
				getStatisticsInfo2("year", this.serialNumber).then(res => {
					this.yearArr = [];
					this.yearArr = res.d;
					if (res.d.acs_cut_info.length) {
						this.l31 = 1
					};
					if (res.d.vpn_cut_info.length) {
						this.l32 = 1
					};
					if (res.d.dev_cut_info.length) {
						this.l33 = 1
					};
					/* this.l31 = this.yearArr.acs_cut_info.length;
					this.l32 = this.yearArr.vpn_cut_info.length;
					this.l33 = this.yearArr.dev_lose_info.length; */
					//console.log(this.yearArr)
				})
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
				/* this.flag1=0;
				this.flag2=0;
				this.flag3=0;
				this.flag4=0; */
			},
			change(e) {
				this.dayStatus.forEach((item) => {
					if (item.statistical_date == e) {
						this.currentArr = item;
					}
				});
				/* this.zsc = parseFloat(this.currentArr.dev_cut_duration) + parseInt(this.currentArr.vpn_cut_duration) +
					parseInt(this.currentArr.acs_cut_duration); */
				//console.log(this.currentArr);
			},
			change2(e) {
				this.monthStatus.forEach((item) => {
					if (item.statistical_date == e) {
						this.currentArr2 = item;
					}
				});
				/* this.zsc = parseFloat(this.currentArr.dev_cut_duration) + parseInt(this.currentArr.vpn_cut_duration) +
					parseInt(this.currentArr.acs_cut_duration); */
				//console.log(this.currentArr2);
			},
			getDeviceCurrentStatus() {
				getStatus().then(res => {
					this.area_info = res.d.area_info;
					this.area_info.forEach((item) => {
						item.site_info.forEach((items) => {
							if (items.sitename == this.siteName) {
								this.tmp = items.tmp;
							}
						});
					});
				})
			},
			getDayStatus() {
				let Obj = {
					serial_number: this.serialNumber,
				};
				getDay(Obj).then(res => {
					this.dayStatus = res.d;
					//console.log(this.dayStatus);
					res.d.forEach(item => {
						this.dayArr.push({
							value: item.statistical_date,
							text: item.statistical_date,
						});
						this.chartData.categories.push(item.statistical_date.slice(5, 10));
						this.chartData.series[0].data.push(item.min_tmp);
						this.chartData.series[1].data.push(item.max_tmp);
					});
					//console.log(this.Line.categories)
				});
			},
			getMonthStatus() {
				let Obj = {
					serial_number: this.serialNumber,
				};
				getMonth(Obj).then(res => {
					//获取该设备序列号下所有月份信息
					this.monthStatus = res.d;
					//console.log(this.monthStatus);
					//获取所有月份
					res.d.forEach(item => {
						this.monthArr.push({
							value: item.statistical_date,
							text: item.statistical_date,
						});
						this.chartData2.categories.push(item.statistical_date.slice(5, 7));
						this.chartData2.series[0].data.push(item.min_tmp);
						this.chartData2.series[1].data.push(item.max_tmp);
					});
					//console.log(this.monthArr)
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 400rpx;
		margin-bottom: 15rpx;
	}

	.uni-padding-wrap {
		// width: 750rpx;
		padding: 0px 60rpx;
	}

	.zz {
		text-align: right;
		font-size: 28rpx;
		line-height: 48rpx;
		color: #2979ff;
	}

	.u-slot-title {
		@include flex;
		flex-direction: row;
		align-items: center;
	}

	.div1 {
		border-radius: 60rpx;
		margin: 0 2%;
		//padding-top: 2%;
		padding-bottom: 2%;
		border: #000000 2rpx solid;
		margin-top: 3%;
	}

	.div2 {
		background-color: #00a2e8;
		border-radius: 60rpx;
		margin: 0 3%;
		padding-top: 5%;
		padding-bottom: 5%;
		padding-left: 10%;
		border: #000000 2rpx solid;
	}
</style>