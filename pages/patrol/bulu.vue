<template>
	<view>
		<!-- 顶部蓝色块 -->
		<view class="top-div">
			<!-- logo -->
			<view style="display: flex;">
				<view style="margin-left: 2%;margin-top: 3%;">
					<image src="../../static/images/logo1.png" style="width: 60rpx;" mode="widthFix"></image>
				</view>
				<view style="margin-top: 3%;">
					<image src="../../static/images/logo2.png" style="width: 120rpx;" mode="widthFix"></image>
				</view>
			</view>
			<!-- 文字 -->
			<view style="color: white;font-size: 55rpx;margin-left: 10%;margin-top: 6%;">补录</view>
		</view>
		<!-- 表单 -->
		<view class="center-div">
			<uni-forms labelWidth="90rpx" :model="buluForm">
				<uni-forms-item label="内容上传">
					<uni-file-picker limit="9" title="最多选择9张图片" mode="grid" file-mediatype="image" @select="select"
						:sizeType="['compressed']">
					</uni-file-picker>
				</uni-forms-item>
				<uni-forms-item label="人员">
					<uni-easyinput v-model="buluForm.persons" />
				</uni-forms-item>
				<uni-forms-item label="日期">
					<uni-datetime-picker v-model="buluDay" type="daterange" />
				</uni-forms-item>
				<uni-forms-item label="结论">
					<uni-easyinput v-model="buluForm.conclusion" type="textarea" />
				</uni-forms-item>

				<button class="bg-blue" @click="buluHandler">确定</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
		reqBulu,
	} from '@/api/task.js';
	export default {
		data() {
			return {
				buluDay: [],
				upload_img_bulu: [],
				buluForm: {
					// day: "",
					conclusion: '',
					fileId: "",
					inspection_id: "",
					persons: "",
					siteName: "",
					days: new Date().toISOString(),
					remark: ''
				},
				userName: '',
				eventId: '',
				fileEidStr: '',

				uploadContent: "",
				//date: new Date().toISOString(),
				upload_img_check: [],
				imageValue: []
			}
		},
		onLoad(e) {
			this.siteName = e.name;
			//this.eventId = e.eventId;
		},
		methods: {
			async buluHandler() {
				let beginTime = this.buluDay[0]
				let endTime = this.buluDay[1]

				if (!this.upload_img_bulu || !this.buluForm.persons) {
					uni.showToast({
						title: "请上传巡检内容和填写巡检人员！",
						icon: "none",
						duration: 3000,
					});
					return;
				}


				let _this = this;
				let count = 0;
				for (let i = 0; i < this.upload_img_bulu.length; i++) {
					uni.uploadFile({
						url: "https://www.cd-dxd.com/file/uploadFile",
						filePath: this.upload_img_bulu[i],
						name: 'file',
						header: {
							"Content-Type": "multipart/form-data"
						},
						success(res) {
							let fileId = JSON.parse(res.data).data;
							_this.fileEidStr += fileId + ",";
							count++;
							if (count == _this.upload_img_bulu.length) {
								_this.buluForm.fileId = _this.fileEidStr;
								_this.buluForm.persons = _this.buluForm.persons.replace("，", ",");
								_this.buluForm.days = new Date().toISOString() //???
								//_this.buluForm.inspection_id = _this.eventId
								_this.buluForm.siteName = _this.siteName
								//console.log(_this.buluForm)
								// delete buluForm.day
								reqBulu(beginTime, endTime, _this.buluForm).then(res => {
									if (res.code == 200) {
										uni.showToast({
											title: "补录成功！",
											icon: "success",
											duration: 3000,
										});
										setTimeout(function() {
											uni.navigateBack({
												delta: 1
											})
										}, 1000)
									}
								})
							}
						},
						fail(err) {
							console.log('err:', err);
							count++;
						}
					});
				}
			},
			select(e) {
				/* let temp = e.tempFilePaths[0];
				this.upload_img_bulu.push(temp); */
				this.upload_img_bulu = e.tempFilePaths
				//console.log(this.upload_img_bulu)
			},
		}
	}
</script>

<style>
	.top-div {
		width: 100%;
		height: 350rpx;
		background-color: #00539f;
	}

	.center-div {
		box-shadow: 0px 0px 10rpx rgb(205, 205, 205);
		border-radius: 10rpx;
		background-color: white;
		height: auto;
		width: 90%;
		position: absolute;
		top: 240rpx;
		left: 5%;
		padding: 3%;
	}
</style>