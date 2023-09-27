<template>
	<view>
		<view style="margin-left: 1%;color: #4b4b4b;margin-top: 1%;font-weight: bold;"><text>实时状态</text></view>
		<!-- <view class="swiper-item">
			<image src="../../static/images/banner/banner.jpg" mode="widthFix" :draggable="false"></image>
		</view> -->
		<view style="display: flex;margin-top: 3%;justify-content: center;">
			<view style="display: flex;width: 310rpx;" @click="showDrawer('showLeft5')">
				<view>
					<text style="font-weight: bolder;font-size: 35rpx;">站点
						总数</text>
				</view>
				<view style="padding-top: 3%;margin-left: 10%;">
					<text style="font-weight: bolder;font-size: 50rpx;">{{site_total}} 个</text>
				</view>
			</view>
			<view style="display: flex;width: 310rpx;">
				<view>
					<text style="font-weight: bolder;font-size: 35rpx;">实时
						在线率</text>
				</view>
				<view style="padding-top: 3%;margin-left: 8%;">
					<text style="font-weight: bolder;font-size: 50rpx;">{{online_rate}}</text>
				</view>
			</view>
			<!-- <view style="display: flex;width: 300rpx;flex-direction: column;margin-left: 20%;margin-top: 1%;">
				<view>
					<text style="font-weight: bolder;font-size: 50rpx;">{{online_rate}}</text>
				</view>
				<view style="margin-left: 3%;">
					<text style="font-weight: bolder;font-size: 26rpx;">在线率</text>
				</view>
			</view> -->
			<uni-drawer ref="showLeft5" mode="left" :width="300">
				<view class="scroll-view">
					<scroll-view class="scroll-view-box" scroll-y="true">
						<view class="container">
							<!-- <view v-for="(item, index) in areaArr" :key="index" class="areaBox" hover-class="grid2">
								<text>{{item.text}}</text>
							</view> -->
							<view v-for="(item, index) in areaArr" :key="index"
								:class="[item.value.length<4 ? 'areaBox1' : 'areaBox2']">
								<u-tag :text="item.text" :plain="!item.checked" :name="index" @click="radioClick"
									size="large">
								</u-tag>
							</view>
						</view>
						<u-divider :dot="true" lineColor="#72bf9b"></u-divider>
						<view style="display: flex;flex-wrap: wrap;margin-left: 3%;">
							<view v-for="(item, index) in arr3" :key="index"
								:class="[item.sitename.length<8 ? 'text1' : 'text2']">
								<uni-section :title=" item.sitename" type="circle"
									@click="go(item.sitename,item.serial_number)" titleFontSize="30rpx"></uni-section>
							</view>
						</view>
					</scroll-view>
				</view>
			</uni-drawer>
		</view>
		<view class="div2">
			<view style="display:flex;justify-content: center;"><!-- padding-left: 12%; -->
				<view
					style="border-radius: 50rpx;border: #009fe8 2rpx solid;background-color: #99d9ea;padding: 3%;margin-right: 2%;"
					@click="showDrawer('showLeft1')">
					<view style="margin-left: 20%;margin-bottom: 10rpx;"><text
							style="font-weight: bolder;font-size: 35rpx;"
							:class="[acs_cut_total==0 ? 'textGreen' : 'textRed']">{{acs_cut_total}} 个</text>
					</view>
					<view><text style="font-weight: bolder;font-size: 30rpx;">停电站点</text></view>
				</view>
				<view
					style="border-radius: 50rpx;border: #009fe8 2rpx solid;background-color: #99d9ea;padding: 3%;margin-right: 2%;"
					@click="showDrawer('showLeft2')">
					<view style="margin-left: 20%;margin-bottom: 10rpx;"><text
							style="font-weight: bolder;font-size: 35rpx;"
							:class="[vpn_cut_total==0 ? 'textGreen' : 'textRed']">{{vpn_cut_total}} 个</text>
					</view>
					<view><text style="font-weight: bolder;font-size: 30rpx;">网络故障</text></view>
				</view>
				<view
					style="border-radius: 50rpx;border: #009fe8 2rpx solid;background-color: #99d9ea;padding: 3%;margin-right: 2%;"
					@click="showDrawer('showLeft3')">
					<view style="margin-left: 20%;margin-bottom: 10rpx;"><text
							style="font-weight: bolder;font-size: 35rpx;"
							:class="[dev_cut_total==0 ? 'textGreen' : 'textRed']">{{dev_cut_total}} 个</text>
					</view>
					<view><text style="font-weight: bolder;font-size: 30rpx;">设备故障</text></view>
				</view>
				<view style="border-radius: 50rpx;border: #009fe8 2rpx solid;background-color: #99d9ea;padding: 3%;"
					@click="showDrawer('showLeft4')">
					<view style="margin-left: 20%;margin-bottom: 10rpx;"><text
							style="font-weight: bolder;font-size: 35rpx;"
							:class="[offline_total==0 ? 'textGreen' : 'textRed']">{{offline_total}} 个</text>
					</view>
					<view><text style="font-weight: bolder;font-size: 30rpx;">离线站点</text></view>
				</view>
				<uni-drawer ref="showLeft1" mode="left" :width="285">
					<view class="scroll-view">
						<scroll-view class="scroll-view-box" scroll-y="true">
							<view style="margin-top: 5%;">
								<view
									style="font-weight: bolder;font-size: 40rpx;display: flex;justify-content: center;">
									停电站点列表
								</view>
								<view style="display: flex;flex-wrap: wrap;margin-top: 5%;margin-left: 3%;">
									<view v-for="(item, index) in acsfaultList" :key="index"
										:class="[item.sitename.length<8 ? 'text1' : 'text2']">
										<uni-section :title="item.sitename" type="circle"
											@click="go(item.sitename,item.serial_number)"
											titleFontSize="30rpx"></uni-section>
									</view>
								</view>
							</view>

						</scroll-view>
					</view>
				</uni-drawer>
				<uni-drawer ref="showLeft2" mode="left" :width="285">
					<view class="scroll-view">
						<scroll-view class="scroll-view-box" scroll-y="true">
							<view style="margin-top: 5%;">
								<view
									style="font-weight: bolder;font-size: 40rpx;display: flex;justify-content: center;">
									网络故障站点列表
								</view>
								<view style="display: flex;flex-wrap: wrap;margin-top: 5%;margin-left: 3%;">
									<view v-for="(item, index) in vpnfaultList" :key="index"
										:class="[item.sitename.length<8 ? 'text1' : 'text2']">
										<uni-section :title="item.sitename" type="circle"
											@click="go(item.sitename,item.serial_number)"
											titleFontSize="30rpx"></uni-section>
									</view>
								</view>
							</view>

						</scroll-view>
					</view>
				</uni-drawer>
				<uni-drawer ref="showLeft3" mode="left" :width="285">
					<view class="scroll-view">
						<scroll-view class="scroll-view-box" scroll-y="true">
							<view style="margin-top: 5%;">
								<view
									style="font-weight: bolder;font-size: 40rpx;display: flex;justify-content: center;">
									设备故障站点列表
								</view>
								<view style="display: flex;flex-wrap: wrap;margin-top: 5%;margin-left: 3%;">
									<view v-for="(item, index) in devfaultList" :key="index"
										:class="[item.sitename.length<8 ? 'text1' : 'text2']">
										<uni-section :title="item.sitename" type="circle"
											@click="go(item.sitename,item.serial_number)"
											titleFontSize="30rpx"></uni-section>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</uni-drawer>
				<uni-drawer ref="showLeft4" mode="left" :width="285">
					<view class="scroll-view">
						<scroll-view class="scroll-view-box" scroll-y="true">
							<view style="margin-top: 5%;">
								<view
									style="font-weight: bolder;font-size: 40rpx;display: flex;justify-content: center;">
									离线站点列表
								</view>
								<view style="display: flex;flex-wrap: wrap;margin-top: 5%;margin-left: 3%;">
									<view v-for="(item, index) in offlineList" :key="index"
										:class="[item.sitename.length<8 ? 'text1' : 'text2']">
										<uni-section :title="item.sitename" type="circle"
											@click="go(item.sitename,item.serial_number)"
											titleFontSize="30rpx"></uni-section>
									</view>
								</view>
							</view>

						</scroll-view>
					</view>
				</uni-drawer>
			</view>
		</view>
		<!-- <view style="width: 220rpx;background-color: #ffffff;">
				<uni-data-select :localdata="arr" @change="change" :clear="false" v-model="valueFlag">
				</uni-data-select>
			</view> -->
		<!-- <view class="uni-padding-wrap">
			<uni-segmented-control :current="current" :values="items" style-type="button" :active-color="activeColor"
				@clickItem="onClickItem" />
		</view> -->
		<!-- <view>
				<button class="bg-blue" size="mini" @click="showDrawer('showLeft4')" v-show="flag2">选择站点</button>
			</view> -->
		<!-- <uni-drawer ref="showLeft4" mode="left" :width="280">
				<view class="scroll-view">
					<scroll-view class="scroll-view-box" scroll-y="true">
						<view style="margin-top: 5%;">
							<text style="font-weight: bolder;font-size: 40rpx;margin-left: 33%;">
								站点列表
							</text>

						</view>
					</scroll-view>
				</view>
			</uni-drawer> -->
		<!-- <uni-popup ref="popup4" type="dialog">
				<uni-popup-dialog mode="base" title="站点列表" type="info">
					<view style="display: flex;flex-wrap: wrap;">
						<view v-for="(item, index) in arr3" :key="index">
							<uni-section :title="item.name" type="circle"
								@click="go(item.name,item.serialNumber)"></uni-section>
						</view>
					</view>
				</uni-popup-dialog>
			</uni-popup> -->
		<view style="border-bottom: 7rpx solid #009ae4;margin-top: 3%;"></view>
		<view style="margin-left: 1%;color: #4b4b4b;margin-top: 1%;font-weight: bold;"><text>故障统计</text></view>
		<view>
			<view class="div3" style="margin-top: 3%;" @click="goCharts">
				<view>
					<view style="margin-bottom: 1.5%;">
						<text>上线率：<text style="font-size: 36rpx;font-weight: bolder;">{{day.online_rate}}%</text>，掉线时间：
							<text style="font-size: 36rpx;font-weight: bolder;">{{day.time_total}}</text> 小时
						</text>
					</view>
					<view style="color: #ffffff;">
						<view style="margin-bottom: 1.5%;">
							<text>停电站点：<text style="font-size: 36rpx;font-weight: bolder;">{{day.acs_cut_total}}</text>
								个，停电时间：
								<text style="font-size: 36rpx;font-weight: bolder;">{{day.acs_cut_time_total}}</text> 分钟
							</text>
						</view>
						<view style="margin-bottom: 1.5%;">
							<text>网络故障：<text
									style="font-size: 36rpx;font-weight: bolder;">{{day.vpn_cut_total}}</text>个，故障时间：
								<text style="font-size: 36rpx;font-weight: bolder;">{{day.vpn_cut_time_total}}</text> 分钟
							</text>
						</view>
						<view>
							<text>设备故障：<text style="font-size: 36rpx;font-weight: bolder;">{{day.dev_cut_total}}</text>
								个，故障时间：
								<text style="font-size: 36rpx;font-weight: bolder;">{{day.dev_cut_time_total}}</text> 分钟
							</text>
						</view>
					</view>
				</view>
			</view>
			<view style="display: flex;margin-top: 1.5%;justify-content: center;">
				<!-- margin-left: 24.5%;margin-bottom: 15rpx; -->
				<view style="margin-right: 3%;">
					<u-button type="success" icon="arrow-leftward" @click="goPrevious" :plain="true"></u-button>
				</view>
				<view style="margin-right: 3%;">
					<u-button type="success" :plain="true" :text="day.analytics_date"></u-button>
				</view>
				<view v-show="!buttonFlag">
					<u-button type="success" icon="arrow-rightward" @click="goNext" :plain="true"></u-button>
				</view>
				<view v-show="buttonFlag">
					<u-button type="info" icon="arrow-rightward" :plain="true" :disabled="true"></u-button>
				</view>
			</view>
		</view>
		<!-- <view v-if="current === 1">
			<view class="div3" style="margin-top: 15rpx;" @click="goCharts">
				<view>
					<view style="margin-bottom: 1%;">
						<text>上线率：<text
								style="font-size: 36rpx;font-weight: bolder;">{{month.online_rate}}%</text>，掉线时间：
							<text style="font-size: 36rpx;font-weight: bolder;">{{month.time_total}}</text> 小时
						</text>
					</view>
					<view style="color: #ffffff;">
						<view style="margin-bottom: 1%;">
							<text>停电站点：<text
									style="font-size: 36rpx;font-weight: bolder;">{{month.acs_cut_total}}</text>
								个，停电时间：
								<text style="font-size: 36rpx;font-weight: bolder;">{{month.acs_cut_time_total}}</text>
								分钟
							</text>
						</view>
						<view style="margin-bottom: 1%;">
							<text>网络故障：<text
									style="font-size: 36rpx;font-weight: bolder;">{{month.vpn_cut_total}}</text>个，故障时间：
								<text style="font-size: 36rpx;font-weight: bolder;">{{month.vpn_cut_time_total}}</text>
								分钟
							</text>
						</view>
						<view>
							<text>设备故障：<text
									style="font-size: 36rpx;font-weight: bolder;">{{month.dev_cut_total}}</text>
								个，故障时间：
								<text style="font-size: 36rpx;font-weight: bolder;">{{month.dev_cut_time_total}}</text>
								分钟
							</text>
						</view>
					</view>
				</view>
			</view>
			<view style="display: flex;margin-top: 1%;margin-left: 27%;margin-bottom: 15rpx;">
				<view style="margin-right: 3%;">
					<u-button type="success" icon="arrow-leftward" @click="goPrevious1" :plain="true"></u-button>
				</view>
				<view style="margin-right: 3%;">
					<u-button type="success" :plain="true" :text="month.analytics_date"></u-button>
				</view>
				<view>
					<u-button type="success" icon="arrow-rightward" @click="goNext1" :plain="true"></u-button>
				</view>
			</view>
		</view> -->
		<view style="border-bottom: 7rpx solid #009ae4;margin-top: 3%;"></view>
		<view style="margin-left: 1%;color: #4b4b4b;margin-top: 1%;font-weight: bold;"><text>最近故障列表</text></view>
		<view>
			<view class="uni-padding-wrap" style="margin-top: 3%;">
				<uni-segmented-control :current="current2" :values="items2" style-type="button"
					:active-color="activeColor" @clickItem="onClickItem2" />
			</view>
			<view v-if="current2 === 0" style="padding-bottom: 5%;">
				<view class="div4" style="margin-top: 15rpx;">
					<view style="margin-bottom: 2%;" v-for="(item, index) in acsfaultList2">
						<text>{{item.sitename}}：<text>{{item.acs_cut_time.slice(5)}}</text>停电，
							<text v-show="item.acs_recovery_time">{{item.acs_recovery_time.slice(5)}}</text><text
								v-show="!item.acs_recovery_time">未</text>来电，时长
							<text>{{item.acs_cut_duration_time}}</text>分钟
						</text>
					</view>
				</view>
			</view>
			<view v-if="current2 === 1" style="padding-bottom: 5%;">
				<view class="div4" style="margin-top: 15rpx;">
					<view style="margin-bottom: 2%;" v-for="(item, index) in vpnfaultList2">
						<text>{{item.sitename}}：<text>{{item.vpn_lose_time.slice(5)}}</text>故障，
							<text v-show="item.vpn_recovery_time">{{item.vpn_recovery_time.slice(5)}}</text><text
								v-show="!item.vpn_recovery_time">未</text>恢复，时长
							<text>{{item.vpn_cut_duration_time}}</text>分钟
						</text>
					</view>
				</view>
			</view>
			<view v-if="current2 === 2" style="padding-bottom: 5%;">
				<view class="div4" style="margin-top: 15rpx;">
					<view style="margin-bottom: 2%;" v-for="(item, index) in devfaultList2">
						<text>{{item.sitename}}：<text>{{item.dev_lose_time.slice(5)}}</text>故障，
							<text v-show="item.dev_recovery_time">{{item.dev_recovery_time.slice(5)}}</text><text
								v-show="!item.dev_recovery_time">未</text>恢复，时长
							<text>{{item.dev_cut_duration_time}}</text>分钟
						</text>
					</view>
				</view>
			</view>
		</view>
		<u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
			<view style="display: flex;">
				<view style="margin-top: 3%;" @click="showDrawer('showLeft6')"><u-tabbar-item text="设备重启"
						icon="reload"></u-tabbar-item></view>
				<view style="margin-left: 33%;margin-top: 3%;"><u-tabbar-item text="月报下载"
						icon="download"></u-tabbar-item></view>
				<view style="margin-left: 33%;margin-top: 3%;"><u-tabbar-item text="年报下载"
						icon="file-text-fill"></u-tabbar-item></view>
			</view>
		</u-tabbar>
		<uni-drawer ref="showLeft6" mode="left" :width="300">
			<view class="scroll-view">
				<scroll-view class="scroll-view-box" scroll-y="true">
					<view class="container">
						<!-- <view v-for="(item, index) in areaArr" :key="index" class="areaBox" hover-class="grid2">
							<text>{{item.text}}</text>
						</view> -->
						<view v-for="(item, index) in areaArr" :key="index"
							:class="[item.value.length<4 ? 'areaBox1' : 'areaBox2']">
							<u-tag :text="item.text" :plain="!item.checked" :name="index" @click="radioClick"
								size="large">
							</u-tag>
						</view>
					</view>
					<u-divider :dot="true" lineColor="#72bf9b"></u-divider>
					<view v-for="(item, index) in arr3" :key="index" style="width: 520rpx;margin-left: 3%;">
						<uni-section :title=" item.sitename" type="circle" titleFontSize="30rpx">
							<template v-slot:right>
								<button size="mini"
									@click="restart(item.serial_number)">重启</button><!-- class="bg-blue" -->
							</template>
						</uni-section>
					</view>
				</scroll-view>
			</view>
		</uni-drawer>
		<!-- <view style="padding-bottom: 5%;width: 70%;margin:1% auto;">
			<uni-grid :column=" 3" :highlight="true" @change="change">
				<uni-grid-item>
					<view class="grid-item-box" style="background-color: #fff;" @click="">
						<uni-icons type="refreshempty" :size="30" color="#777" />
						<text class="text">设备重启</text>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="grid-item-box" style="background-color: #fff;" @click="">
						<uni-icons type="download" :size="30" color="#777" />
						<text class="text">月报下载</text>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="grid-item-box" style="background-color: #fff;" @click="">
						<uni-icons type="pulldown" :size="30" color="#777" />
						<text class="text">年报下载</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view> -->


		<!-- <u-cell-group>
					<u-cell>
						<view slot="title" class="u-slot-title">
							<text style="font-size: 30rpx;line-height: 44rpx;color: #303133;">市电停电设备总时长：</text>
						</view>
						<text slot="value" style="font-size: 30rpx;line-height: 44rpx;color:#007aff ;">
							{{acs_cut_time_total}} 分钟</text>
					</u-cell>
				</u-cell-group> -->

		<!-- <view v-show="flag2">
				<u-cell-group>
					<u-cell>
						<view slot="title" class="u-slot-title">
							<text style="font-size: 30rpx;line-height: 44rpx;color: #303133;">站点总数：</text>
						</view>
						<text slot="value" style="font-size: 30rpx;line-height: 44rpx;color:#007aff ;">
							{{getArr.site_total}} 个</text>
					</u-cell>
				</u-cell-group>
				
				<view v-if="current2 === 0" style="padding-bottom: 3%;">
					<view style="margin-top: 15rpx;" v-if="l1!=0">
						<u-cell-group>
							<u-cell v-for="(item, index) in getArr.acs_cut_info" :index="index" :key="index">
								<view slot="title" class="u-slot-title" style="padding: 0px 60rpx;">
									<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
										{{item.sitename}}：
										停电开始时间：{{item.acs_cut_time}}，持续{{item.acs_cut_duration_time}}分钟，恢复时间：{{item.acs_recovery_time}}
									</text>
								</view>
							</u-cell>
						</u-cell-group>
					</view>
					<view style="margin-top: 15rpx;margin-left: 45%" v-if="l1==0">
						<text style="font-weight: bolder;font-size: 35rpx;">无</text>
					</view>
				</view>
				<view v-if="current2 === 1" style="padding-bottom: 3%;">
					<view style="margin-top: 15rpx;" v-if="l2!=0">
						<u-cell-group>
							<u-cell v-for="(item, index) in getArr.vpn_lose_info" :index="index" :key="index">
								<view slot="title" class="u-slot-title" style="padding: 0px 60rpx;">
									<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
										{{item.sitename}}：
										故障开始时间：{{item.vpn_lose_time}}，持续{{item.vpn_cut_duration_time}}分钟，恢复时间：{{item.vpn_recovery_time}}
									</text>
								</view>
							</u-cell>
						</u-cell-group>
					</view>
					<view style="margin-top: 15rpx;margin-left: 45%" v-if="l2==0">
						<text style="font-weight: bolder;font-size: 35rpx;">无</text>
					</view>
				</view>
				<view v-if="current2 === 2" style="padding-bottom: 3%;">
					<view style="margin-top: 15rpx;" v-if="l3!=0">
						<u-cell-group>
							<u-cell v-for="(item, index) in getArr.dev_lose_info" :index="index" :key="index">
								<view slot="title" class="u-slot-title" style="padding: 0px 60rpx;">
									<text style="font-size: 26rpx;line-height: 30rpx;color: #303133;">
										{{item.sitename}}：
										故障开始时间：{{item.dev_lose_time}}，持续{{item.dev_cut_duration_time}}分钟，恢复时间：{{item.dev_recovery_time}}
									</text>
								</view>
							</u-cell>
						</u-cell-group>
					</view>
					<view style="margin-top: 15rpx;margin-left: 45%" v-if="l3==0">
						<text style="font-weight: bolder;font-size: 35rpx;">无</text>
					</view>
				</view>
			</view> -->

		<!-- <view style="margin-bottom: 15rpx;">
			<uni-section title="所有站点实时情况" type="line">
				<view>
					<u-cell-group>
						<u-cell>
							<view slot="title" class="u-slot-title">
								<text style="font-weight: bolder;font-size: 35rpx;">站点总数：</text>
							</view>
							<text slot="value"
								style="font-weight: bolder;font-size: 38rpx;color:#007aff ;margin-right: 8%;">{{site_total}}
								个</text>
						</u-cell>
					</u-cell-group>
					
					
					
					
					<uni-popup ref="popup1" type="dialog">
						<uni-popup-dialog mode="base" title="停电站点列表" type="info">
							<view style="display: flex;flex-wrap: wrap;">
								<view v-for="(item, index) in acsfaultList" :key="index">
									<uni-section :title="item.sitename" type="circle"
										@click="go(item.sitename,item.serial_number)"></uni-section>
								</view>
							</view>
						</uni-popup-dialog>
					</uni-popup>
					<uni-popup ref="popup2" type="dialog">
						<uni-popup-dialog mode="base" title="网络故障站点列表" type="info">
							<view style="display: flex;flex-wrap: wrap;">
								<view v-for="(item, index) in vpnfaultList" :key="index">
									<uni-section :title="item.sitename" type="circle"
										@click="go(item.sitename,item.serial_number)"></uni-section>
								</view>
							</view>
						</uni-popup-dialog>
					</uni-popup>
					<uni-popup ref="popup3" type="dialog">
						<uni-popup-dialog mode="base" title="设备故障站点列表" type="info">
							<view style="display: flex;flex-wrap: wrap;">
								<view v-for="(item, index) in devfaultList" :key="index">
									<uni-section :title="item.sitename" type="circle"
										@click="go(item.sitename,item.serial_number)"></uni-section>
								</view>
							</view>
						</uni-popup-dialog>
					</uni-popup>
					
					
					
					
					
					
				</view>
				
				
				
				
				
				<view style="margin-top: 30rpx;">
					<uni-grid :column="4" :showBorder="false" :highlight="false">
						<uni-grid-item>
							<view @click="openListDialog1">
								<uni-badge class="uni-badge-left-margin" :text="acs_cut_total" absolute="rightTop"
									type="primary" size="normal">
									<view class="box" ><text class="box-text">停电
											站点</text></view>
								</uni-badge>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view @click="openListDialog2">
								<uni-badge class="uni-badge-left-margin" :text="vpn_cut_total" absolute="rightTop"
									type="primary" size="normal">
									<view class="box" hover-class="grid2"><text class="box-text">网络故障
											站点</text></view>
								</uni-badge>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view @click="openListDialog3">
								<uni-badge class="uni-badge-left-margin" :text="dev_cut_total" absolute="rightTop"
									type="primary" size="normal">
									<view class="box" hover-class="grid2"><text class="box-text">设备故障
											站点</text></view>
								</uni-badge>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
				
				
				
				
				
				
				
			</uni-section>
		</view> -->
		<!-- <view style="margin-bottom: 15rpx;">
			<uni-section>



				<view v-if="current === 0">
					<view style="margin-top: 15rpx;" class="uni-padding-wrap">
						<uni-data-select :localdata="dayArr" @change="change" placeholder="请选择日期" :clear="false">
						</uni-data-select>
					</view>
					<view style="margin-top: 15rpx;">
						<u-cell-group>
							<u-cell>
								<view slot="title" class="u-slot-title">
									<text style="font-size: 30rpx;line-height: 44rpx;color: #303133;">上线率：</text>
									<text
										style="font-size: 30rpx;line-height: 44rpx;color:#007aff ;">{{toFixed(sxl2)}}%</text>
								</view>
								<view slot="value" class="u-slot-title">
									<text style="font-size: 30rpx;line-height: 44rpx;color: #303133;">掉线时长：</text>
									<text style="font-size: 30rpx;line-height: 44rpx;color:#007aff ;">25小时</text>
								</view>
							</u-cell>
							
						</u-cell-group>
						<view style="display: flex;margin-left: 28%;">
							<view class="action-btn">
								<button plain="true" size="mini">←</button>
							</view>
							<view class="action-btn">
								<button plain="true" size="mini">5-27</button>
							</view>
							<view class="action-btn">
								<button plain="true" size="mini">→</button>
							</view>
						</view>
					</view>
				</view> 
			</uni-section>
		</view> -->
		<!-- <view style="margin-left: 4%;margin-top: 15rpx;">
					<uni-data-checkbox multiple :localdata="arr" v-model="checkbox1" @change="getDetail">
					</uni-data-checkbox>
				</view> -->
		<!-- <u-divider text="分割线" :dot="true"></u-divider> -->
		<!-- <view v-for="(item, index) in arr2" :key="index"
					style="margin-left: 4%;margin-bottom: 2%;margin-right: 4%;">
					<view style="display: flex;margin-bottom: 2%;justify-content: space-between;">
						<view>
							{{item.area}}:
						</view>
						 <view v-show="item.sxl!=null">
							上线率：{{toFixed(item.sxl)}}%
						</view> -
					</view>
					<view style="display:flex;">
						<view v-for="(items, indexx) in arr3" :key="indexx" v-if="items.area==item.area"
							@click="go(items.name,items.serialNumber)" class="text-blue"
							style="text-decoration:underline;margin-right: 5%;">
							{{items.name}}
						</view>
					</view>
				</view> -->

	</view>
</template>

<script>
	import axios from "axios";
	import {
		getArea,
		getDeviceInfo,
		getAllInfo,
		getStatisticsInfo,
		getStatisticsInfoMonth,
		getStatisticsInfoYear,
		getStatisticsInfoSearch,
		restart
		//getFaultInfo,
	} from '@/api/status.js'
	var _self;
	export default {
		data() {
			return {
				opts1: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4"],
					padding: [15, 15, 0, 5],
					enableScroll: true,
					legend: {},
					xAxis: {
						disableGrid: true,
						scrollShow: true,
						itemCount: 6
					},
					/* yAxis: {
						data: [{
							min: 80
						}]
					}, */
					extra: {
						column: {
							type: "group",
							width: 15,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				},
				chartData1: {
					categories: ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00",
						"09:00", "10:00", "11:00", , "12:00", "13:00", "14:00", "15:00", "16:00",
						"17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
					],
					series: [{
						name: "掉线时间",
						data: [100, 90, 90, 90, 90, 100, 90, 95,
							91, 93, 100, 90, 98, 97, 96, 100,
							90, 96, 93, 98, 90, 90, 97, 96
						]
					}]
				},
				checkbox1: [0],
				valueFlag: "所有站点",
				areaArr: [],
				flag2: 0,
				flag: 0,
				items: ['日', '月', '年'],
				items2: ['停电', '网络故障', '设备故障'],
				current: 0,
				current2: 0,
				activeColor: '#72bf9b',
				currentStatus: [],
				//currentStatusFlag: null,
				area_info: [],
				getArr: [],
				get_detail: [],
				// 统计有问题的站点
				acsfaultList: [],
				vpnfaultList: [],
				devfaultList: [],
				offlineList: [],
				acsfaultList2: [],
				vpnfaultList2: [],
				devfaultList2: [],
				chartData: {},
				range: [],
				res: [],
				res2: [],
				swiperDotIndex: 0,
				arr2: [],
				arr3: [],
				zxl: '',
				sxl2: "",
				site_total: '',
				online_rate: '',
				acs_cut_total: 0,
				vpn_cut_total: 0,
				dev_cut_total: 0,
				offline_total: 0,
				acs_cut_time_total: 0,
				vpn_cut_time_total: 0,
				dev_cut_time_total: 0,
				l1: 0,
				l2: 0,
				l3: 0,
				allSite: [],
				day: [],
				month: [],
				year: [],
				buttonFlag: 1,
			}
		},
		mounted() {
			//this.getDeviceCurrentStatus();
			this.getArea();
			this.getAllInfo();
			this.getStatisticsInfo();
		},
		/* onPullDownRefresh() {
			this.arr = [];
			this.acsfaultList = [];
			this.vpnfaultList = [];
			this.devfaultList = [];
			this.getDeviceCurrentStatus();
			this.getDetail();
			uni.stopPullDownRefresh();
		}, */
		onLoad() {
			_self = this
		},
		methods: {
			restart(e) {
				restart(e).then(res => {
					if (res.c == 200) {
						uni.showToast({
							title: "重启成功",
							icon: "success",
							duration: 3000,
						});
					}
				});
			},
			showDrawer(e) {
				this.$refs[e].open()
			},
			radioClick(name) {
				//console.log(this.areaArr[name]);
				this.areaArr.map((item, index) => {
					item.checked = index === name ? true : false;
				});
				getDeviceInfo(this.areaArr[name].value).then(res => {
					this.arr3 = res.d.site_info;
				});
			},
			goCharts() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: `/pages2/status/staticCharts`
				})
			},
			goPrevious() {
				let tmp = this.day.analytics_date;
				let date = new Date(tmp).getTime() - 1000 * 60 * 60 * 24;
				let date1 = new Date(date);
				date1.getDate();
				let month = (date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : '0' + (date1.getMonth() + 1);
				let day = (date1.getDate()) > 9 ? (date1.getDate()) : '0' + (date1.getDate());
				this.day.analytics_date = date1.getFullYear() + '-' + month + '-' + day;
				getStatisticsInfo().then(res => {
					let str = res.d.analytics_date;
					if (str == this.day.analytics_date) {
						this.buttonFlag = 1;
					} else {
						this.buttonFlag = 0;
					};
				});
				let _this = this;
				setTimeout(function() {
					getStatisticsInfoSearch(_this.day.analytics_date).then(res => {
						_this.day = res.d;
					})
				}, 1000)
			},
			goNext() {
				let tmp = this.day.analytics_date;
				let date = new Date(tmp).getTime() + 1000 * 60 * 60 * 24;
				let date1 = new Date(date);
				date1.getDate();
				let month = (date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : '0' + (date1.getMonth() + 1);
				let day = (date1.getDate()) > 9 ? (date1.getDate()) : '0' + (date1.getDate());
				this.day.analytics_date = date1.getFullYear() + '-' + month + '-' + day;
				getStatisticsInfo().then(res => {
					let str = res.d.analytics_date;
					if (str == this.day.analytics_date) {
						this.buttonFlag = 1;
					} else {
						this.buttonFlag = 0;
					};
				});
				let _this = this;
				setTimeout(function() {
					getStatisticsInfoSearch(_this.day.analytics_date).then(res => {
						_this.day = res.d;
					})
				}, 1000)
			},
			getStatisticsInfo() {
				getStatisticsInfo().then(res => {
					this.day = res.d;
					this.goPrevious();
				});
				/* getStatisticsInfoMonth().then(res => {
					this.month = res.d;
				});
				getStatisticsInfoYear().then(res => {
					this.year = res.d;
				}); */
			},
			getArea() {
				getArea().then(res => {
					this.area_info = res.d.area_info;
					this.area_info.forEach((item) => {
						this.areaArr.push({
							value: item.areaname,
							text: item.areaname + "" + item.site_total,
							checked: false,
						});
					});
					this.areaArr[0].checked = true;
					//console.log(this.areaArr)
					getDeviceInfo(this.areaArr[0].value).then(res => {
						this.arr3 = res.d.site_info;
						//console.log(this.arr3)
						/* this.arr3.forEach((item) => {
							console.log(item.sitename.length)
						}); */
					});

				});
				/* getDeviceInfo().then(res => {
					this.area_info = res.d;
					res.d.forEach((item) => {
						this.allSite.push({
							sitename: item.sitename,
							serial_number: item.serial_number
						});
					});
					//console.log(this.allSite)
				});
				let _this = this;
				setTimeout(function() {
					getArea().then(res => {
						res.d.forEach((item) => {
							let i = 0;
							_this.area_info.forEach((items) => {
								if (items.area == item) {
									i++;
								}
							});
							_this.areaArr.push({
								value: item,
								text: item + "（" + i + "）",
							});
						});
						//console.log(_this.areaArr)
					});
				}, 1000) */
			},
			/* compare(a, b) {
				if (a.sitename.length < b.sitename.length)
					return -1;
				if (a.sitename.length > b.sitename.length)
					return 1;
				return 0;
			}, */
			compare1(a, b) {
				/* if (new Date(a.acs_cut_time).getTime() < new Date(b.acs_cut_time).getTime())
					return -1;
				if (new Date(a.acs_cut_time).getTime() > new Date(b.acs_cut_time).getTime())
					return 1;
				return 0; */
				if (new Date(a.acs_cut_time.replace(/-/g, '/')).getTime() < new Date(b.acs_cut_time.replace(/-/g, '/'))
					.getTime())
					return 1;
				if (new Date(a.acs_cut_time.replace(/-/g, '/')).getTime() > new Date(b.acs_cut_time.replace(/-/g, '/'))
					.getTime())
					return -1;
				return 0;
			},
			compare2(a, b) {
				if (new Date(a.vpn_lose_time.replace(/-/g, '/')).getTime() < new Date(b.vpn_lose_time.replace(/-/g, '/'))
					.getTime())
					return 1;
				if (new Date(a.vpn_lose_time.replace(/-/g, '/')).getTime() > new Date(b.vpn_lose_time.replace(/-/g, '/'))
					.getTime())
					return -1;
				return 0;
			},
			compare3(a, b) {
				if (new Date(a.dev_lose_time.replace(/-/g, '/')).getTime() < new Date(b.dev_lose_time.replace(/-/g, '/'))
					.getTime())
					return 1;
				if (new Date(a.dev_lose_time.replace(/-/g, '/')).getTime() > new Date(b.dev_lose_time.replace(/-/g, '/'))
					.getTime())
					return -1;
				return 0;
			},
			getAllInfo() {
				getAllInfo().then(res => {
					this.site_total = res.d.site_total;
					this.online_rate = res.d.rate;
					this.acs_cut_total = res.d.acs_cut_total;
					this.vpn_cut_total = res.d.vpn_cut_total;
					this.dev_cut_total = res.d.dev_cut_total;
					this.offline_total = res.d.offline_total;
					/* res.d.acs_cut_info.forEach((item) => {
						console.log(new Date(item.acs_cut_time.replace(/-/g, '/')).getTime())
					});
					console.log("/////////////////////////////////////") */
					this.acsfaultList2 = res.d.acs_cut_info.sort(this.compare1);
					this.vpnfaultList2 = res.d.vpn_lose_info.sort(this.compare2);
					this.devfaultList2 = res.d.dev_lose_info.sort(this.compare3);
					/* this.acsfaultList2.forEach((item) => {
						console.log(new Date(item.acs_cut_time.replace(/-/g, '/')).getTime())
					}); */
					if (this.acsfaultList2.length > 5) {
						this.acsfaultList2 = this.acsfaultList2.slice(0, 5);
					}
					if (this.devfaultList2.length > 5) {
						this.devfaultList2 = this.devfaultList2.slice(0, 5);
					}
					if (this.vpnfaultList2.length > 5) {
						this.vpnfaultList2 = this.vpnfaultList2.slice(0, 5);
					}
					this.acsfaultList = res.d.acs_cut_site;
					this.devfaultList = res.d.dev_cut_site;
					this.vpnfaultList = res.d.vpn_cut_site;
					this.offlineList = res.d.offline_site;
					/* this.acsfaultList.sort((a, b => {
						let x = a.sitename;
						let y = b.sitename;
						if (x < y) {
							return -1;
						}
						if (x > y) {
							return 1;
						}
						return 0
					})) */
					//去重
					/* this.acsfaultList = this.acsfaultList.filter((item, index) =>
						this.acsfaultList.findIndex(i => i.serial_number === item.serial_number) === index);
					this.devfaultList = this.devfaultList.filter((item, index) =>
						this.devfaultList.findIndex(i => i.serial_number === item.serial_number) === index);
					this.vpnfaultList = this.vpnfaultList.filter((item, index) =>
						this.vpnfaultList.findIndex(i => i.serial_number === item.serial_number) === index); */
					//console.log(this.acsfaultList)
				});
			},
			/* getFaultInfo() {
				getFaultInfo().then(res => {
					this.site_total = res.d.site_total;
					this.online_rate = res.d.online_rate;
					this.acs_cut_total = res.d.acs_cut_total;
					this.vpn_cut_total = res.d.vpn_cut_total;
					this.dev_cut_total = res.d.dev_cut_total;
					this.acsfaultList = res.d.acs_cut_info;
					this.devfaultList = res.d.dev_lose_info;
					this.vpnfaultList = res.d.vpn_lose_info;
					this.acs_cut_time_total = res.d.acs_cut_time_total;
					this.vpn_cut_time_total = res.d.vpn_cut_time_total;
					this.dev_cut_time_total = res.d.dev_cut_time_total;
				});
			}, */
			openIt() {
				//this.flag = 1;
				this.$refs.popup4.open();
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			onClickItem2(e) {
				if (this.current2 !== e.currentIndex) {
					this.current2 = e.currentIndex
				}
			},
			toFixed(val) {
				let str = parseFloat(val).toFixed(2)
				return str;
			},
			/* openListDialog1() {
				this.$refs.popup1.open();
			},
			openListDialog2() {
				this.$refs.popup2.open();
			},
			openListDialog3() {
				this.$refs.popup3.open();
			}, */
			/* change(e) {
				console.log(e)
				if (e != "所有站点") {
					this.flag2 = 1;
					this.arr3 = [];
					//this.getArr = [];
					this.area_info.forEach((items) => {
						if (items.area == e) {
							this.arr3.push({
								area: items.area,
								name: items.sitename,
								serialNumber: items.serial_number,
							});
						}
					});
					getFaultInfo2(e).then(res => {
						this.acs_cut_total = res.d.acs_cut_total;
						this.vpn_cut_total = res.d.vpn_cut_total;
						this.dev_cut_total = res.d.dev_cut_total;
						this.acs_cut_time_total = res.d.acs_cut_time_total;
						this.vpn_cut_time_total = res.d.vpn_cut_time_total;
						this.dev_cut_time_total = res.d.dev_cut_time_total;
						// this.getArr = res.d;
						// this.l1 = this.getArr.acs_cut_info.length;
						// this.l2 = this.getArr.vpn_lose_info.length;
						// this.l3 = this.getArr.dev_lose_info.length;
						// console.log(this.getArr) 
					});
				} else {
					this.flag2 = 0;
				};
			}, */
			go(a, b) {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: `/pages2/status/iotDetail?sitename=${a}&serialNumber=${b}`
				})
			},
			getDetail(e) {
				this.arr2 = [];
				this.arr3 = [];
				e.detail.data.forEach(item => {
					//this.arr2.push(item.text);
					this.area_info.forEach((items) => {
						if (items.area_name == item.text) {
							let sxl = (1 - (items.acs_cut_total + items.vpn_cut_total
								/* + items
								.dev_cut_total */
							) / items.site_total) * 100;
							this.arr2.push({
								sxl: sxl,
								area: item.text,
							});
							items.site_info.forEach((itemss) => {
								this.arr3.push({
									area: items.area_name,
									name: itemss.sitename,
									serialNumber: itemss.serial_number,
								});
							});
						}

					});
				})
			},
			getDeviceCurrentStatus() {
				getStatus().then(res => {
					//let i = 0;
					//this.currentStatusFlag = 1;
					this.currentStatus = res.d;
					let zxl = (this.currentStatus.site_total - this.currentStatus.acs_cut_total - this
							.currentStatus.vpn_cut_total /* - this.currentStatus.dev_cut_total */ ) /
						this.currentStatus.site_total * 100;
					this.zxl = zxl;
					let sxl2 = (1 - (this.currentStatus.acs_cut_total + this.currentStatus
						.vpn_cut_total
						/* + items.dev_cut_total */
					) / this.currentStatus.site_total) * 100;
					this.sxl2 = sxl2;
					this.area_info = res.d.area_info;
					this.area_info.forEach(item => {
						this.arr.push({
							value: item.area_name,
							text: item.area_name,
						});
					})
					this.area_info.forEach((items) => {
						if (items.area_name == this.arr[0].text) {
							let sxl = (1 - (items.acs_cut_total + items.vpn_cut_total
								/* + items
								.dev_cut_total */
							) / items.site_total) * 100;
							this.arr2.push({
								sxl: sxl,
								area: this.arr[0].text,
							});
							items.site_info.forEach((itemss) => {
								this.arr3.push({
									area: items.area_name,
									name: itemss.sitename,
									serialNumber: itemss.serial_number,
								});
							});
						}
					});
					/*console.log(this.area_info)
					for (let i = 0; i < this.arr.length; i += 3) {
						this.res.push(this.arr.slice(i, i + 3))
					} */
					this.area_info.forEach((item) => {
						if (item.acs_cut_total > 0) {
							item.site_info.forEach((items) => {
								if (items.acs == "停电") {
									this.acsfaultList.push({
										area: items.area,
										sitename: items
											.sitename,
										serialNumber: items.serial_number,
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
										serialNumber: items.serial_number,
									});
								}
							});
						}
						if (item.dev_lose_total > 0) {}
						if (item.dev_cut_total > 0) {
							item.site_info.forEach((items) => {
								if (items.dev == "失联") {
									// if (this.devfaultList[items.area]) {
									//   this.devfaultList[items.area].push(items.sitename);
									// } else {
									//   this.devfaultList[items.area] = [items.sitename];
									// }
									this.devfaultList.push({
										area: items.area,
										sitename: items
											.sitename,
										serialNumber: items.serial_number,
									});
								}
							});
						}
					});

				})
			},
		}
	}
</script>

<style lang="scss">
	.image {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.text1 {
		width: 283rpx;
	}

	.text2 {
		width: 550rpx
	}

	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		//flex-direction: column;
		align-items: center;
		justify-content: center;
	}


	.u-slot-title {
		@include flex;
		flex-direction: row;
		align-items: center;
	}

	.uni-padding-wrap {
		// width: 750rpx;
		padding: 0px 60rpx;
	}

	.swiper-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 400rpx;
		margin-bottom: 15rpx;
	}

	.uni-badge-left-margin {
		margin-left: 20rpx;
	}

	.div2 {
		//background-color: #01a2e6;
		//border-radius: 60rpx;
		/* padding-top: 2%;
		padding-bottom: 2%; */
		//border: #000000 2rpx solid;
		//margin-bottom: 15rpx;
		//margin: 0 3%;
		margin-top: 5%;
	}

	.div3 {
		background-color: #72bf9b;
		border-radius: 60rpx;
		margin: 0 3%;
		padding-top: 2%;
		padding-left: 10%;
		padding-bottom: 2%;
		border: #000000 1rpx solid;
	}

	.div4 {
		background-color: #ffffff;
		border-radius: 60rpx;
		margin: 0 3%;
		padding-top: 4%;
		padding-left: 3%;
		padding-right: 1%;
		padding-bottom: 3%;
		border: 2rpx solid #72bf9b;
	}

	.container {
		margin-top: 5%;
		display: flex;
		flex-wrap: wrap;
		margin-left: 1.5%;
		width: 100%;
	}

	.areaBox1 {
		//font-size: 30rpx;
		width: 31.5%;
		margin-bottom: 10rpx;
		margin-right: 1%;
	}

	.areaBox2 {
		//font-size: 30rpx;
		width: 34%;
		margin-bottom: 10rpx;
		margin-right: 1%;
	}

	.grid2 {
		color: #aaff00;
	}

	.box-text {
		text-align: center;
		color: #626262;
		font-size: 25rpx;
	}

	.scroll-view {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1
	}

	// 处理抽屉内容滚动
	.scroll-view-box {
		flex: 1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.textGreen {
		color: green;
	}

	.textRed {
		color: #f0801b;
	}
</style>