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
			<view style="color: white;font-size: 55rpx;margin-left: 10%;margin-top: 6%;">巡检资料上传</view>
		</view>
		<!-- 表单 -->
		<view class="center-div">
			<uni-forms labelWidth="160rpx">
				<!-- <uni-forms-item label="站点名称" required>
					<uni-easyinput :value="siteName" :disabled="true" :clearable="false" />
				</uni-forms-item>
				<uni-forms-item label="任务来源" required>
					<uni-easyinput value="定期巡检" :disabled="true" :clearable="false" />
				</uni-forms-item> -->
				<uni-forms-item label="上传人员" required>
					<uni-easyinput v-model="userName" :disabled="true" :clearable="false" />
				</uni-forms-item>
				<!-- <uni-forms-item label="联系电话" required>
					<uni-easyinput placeholder="请输入上报人员联系电话" type="number" />
				</uni-forms-item> -->
				<uni-forms-item label="上传时间">
					<uni-easyinput v-model="time" :disabled="true" :clearable="false" />
				</uni-forms-item>
				<uni-forms-item label="上传描述" required>
					<uni-easyinput type="textarea" placeholder="请输入内容" v-model="uploadContent" />
				</uni-forms-item>
				<uni-forms-item label="资料图片" required>
					<uni-file-picker limit="9" title="最多选择9张图片" mode="grid" file-mediatype="image" @select="select">
					</uni-file-picker>
				</uni-forms-item>
				<button class="bg-blue" @click="uploadCheckInfomation">提交</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
		upload_check_info,
	} from '@/api/task.js';
	export default {
		data() {
			return {
				uploadContent: "",
				userName: '',
				eventId: '',
				fileEidStr: '',
				date: new Date().toISOString(),
				upload_img_check: [],
				imageValue: []
			}
		},
		computed: {
			time() {
				return this.dateFormat(this.date)
			}
		},
		onLoad(e) {
			this.userName = this.$store.state.user.name;
			this.eventId = e.eventId;
		},
		mounted() {
			let _this = this;
			setInterval(function() {
				_this.date = Date.parse(new Date());
			}, 1000);
		},
		methods: {
			select(e) {
				let temp = e.tempFilePaths[0];
				this.imageValue.push(temp);
			},
			dateFormat(time) {
				let date = new Date(time);
				let year = date.getFullYear();
				// 在日期格式中，月份是从0开始的，因此要加0，使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// 拼接
				return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
				// return year + "-" + month + "-" + day;
			},
			// 检查资料上传确定
			async uploadCheckInfomation() {
				// 先上传文件，获取到eid后再上传内容
				// 拼接上传文件eid
				let _this = this;
				let count = 0;
				for (let i = 0; i < this.imageValue.length; i++) {
					uni.uploadFile({
						url: "https://www.cd-dxd.com/file/uploadFile",
						filePath: this.imageValue[i],
						name: 'file',
						header: {
							"Content-Type": "multipart/form-data"
						},
						success(res) {
							let fileId = JSON.parse(res.data).data;
							_this.fileEidStr += fileId + ",";
							count++;
							if (count == _this.imageValue.length) {
								let obj = {
									person: _this.userName,
									content: _this.uploadContent,
									eventId: _this.eventId,
									fileEid: _this.fileEidStr,
									checkType: 1,
								};
								upload_check_info(obj).then((res) => {
									uni.showToast({
										title: "资料上传成功！",
										icon: "success",
										duration: 3000,
									});
									setTimeout(function() {
										var pages = getCurrentPages();
										var prePage=pages[pages.length-2];
										uni.navigateBack({
											delta: 1,
											success: (event) => {
												prePage.$vm.reload();
											},
										})
									}, 1000)
									/* this.check_flag = true;
								 if (this.fileEidStr) {
										this.checkDataFlag = true;
										this.upload_img_check = [];
										this.$refs.fault_upload.clearFiles();
									} */
								});
							}

						},
						fail(err) {
							console.log('err:', err);
							count++;
						}
					});
				}

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
