<template>
	<view class="normal-login-container">
		<view class="logo-content align-center justify-center flex">
			<image style="width: 100rpx;height: 100rpx;" src="/static/images/logo.jpg" mode="widthFix">
			</image>
			<text class="title">无线电运维平台小程序</text>
		</view>
		<view class="login-form-content">
			<view class="input-item flex align-center">
				<view class="iconfont icon-user icon"></view>
				<input v-model="loginForm.username" class="input" type="text" placeholder="请输入账号" maxlength="30" />
			</view>
			<view class="input-item flex align-center">
				<view class="iconfont icon-password icon"></view>
				<input v-model="loginForm.password" type="password" class="input" placeholder="请输入密码" maxlength="20" />
			</view>
			<!-- <view class="input-item flex align-center" v-if="captchaEnabled">
        <view class="iconfont icon-code icon"></view>
        <input v-model="loginForm.code" type="number" class="iinnput" placeholder="请输入验证码" maxlength="4" />
        <image :src="codeUrl" @click="getCode" class="login-code-img"></image>
      </view> -->
			<!-- <view class="xieyi">
				<view>
					<uni-data-checkbox :localdata="option"></uni-data-checkbox>
				</view>
				<view style="margin-top: 6rpx;">
					<text @click="handleUserAgrement" class="text-blue">《用户协议》</text>
					<text @click="handlePrivacy" class="text-blue">《隐私协议》</text>
				</view>
			</view> -->
			<view class="xieyi text-center">
				<u-checkbox-group><u-checkbox label="同意" class="text-grey1"></u-checkbox></u-checkbox-group>
				<text class="text-blue" decode>{{myText}}</text>
				<text class="text-blue">《隐私协议》</text>
			</view>
			<view>
				<button @click="handleLogin" class="login-btn cu-btn block bg-blue lg round">登录</button>
			</view>
			<view style="float: right;margin-top: 5%">
				<text @click="visitorLogin" class="text-blue"
					style="text-decoration: underline;font-size: 31rpx;">游客登录</text>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getCodeImg
	} from '@/api/login'

	export default {
		data() {
			return {
				myText: '&ensp;&ensp;&ensp;&ensp;《用户协议》&ensp;',
				option: [{
					text: '同意',
					value: 1
				}],
				//is: 1,
				codeUrl: "",
				captchaEnabled: false,
				globalConfig: getApp().globalData.config,
				loginForm: {
					username: uni.getStorageSync('username') || "",
					password: uni.getStorageSync('password') || "",
					code: "",
					uuid: ''
				}
			}
		},
		created() {
			// this.getCode()
		},
		methods: {
			visitorLogin() {
				let form = {
					username: "visitor",
					password: "123456",
				};
				this.$modal.loading("登录中...")
				this.$store.dispatch('Login', form).then(() => {
					this.$modal.closeLoading()
					this.loginSuccess()
				}).catch(() => {
					if (this.captchaEnabled) {
						this.getCode()
					}
				})
			},
			// 获取图形验证码
			getCode() {
				getCodeImg().then(res => {
					this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
					if (this.captchaEnabled) {
						this.codeUrl = 'data:image/gif;base64,' + res.img
						this.loginForm.uuid = res.uuid
					}
				})
			},
			// 登录方法
			async handleLogin() {
				if (this.loginForm.username === "") {
					this.$modal.msgError("请输入您的账号")
				} else if (this.loginForm.password === "") {
					this.$modal.msgError("请输入您的密码")
				} else if (this.loginForm.code === "" && this.captchaEnabled) {
					this.$modal.msgError("请输入验证码")
				} else {
					this.$modal.loading("登录中...")
					this.pwdLogin();
				}
			},
			// 密码登录
			async pwdLogin() {
				this.$store.dispatch('Login', this.loginForm).then(() => {
					this.$modal.closeLoading()
					this.loginSuccess()
				}).catch(() => {
					if (this.captchaEnabled) {
						this.getCode()
					}
				})
				uni.setStorageSync('username', this.loginForm.username);
				uni.setStorageSync('password', this.loginForm.password);
			},
			// 登录成功后，处理函数
			loginSuccess(result) {
				// 设置用户信息
				this.$store.dispatch('GetInfo').then(res => {
					this.$tab.reLaunch('/pages/work/choose')
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.normal-login-container {
		width: 100%;

		.logo-content {
			width: 100%;
			font-size: 21px;
			text-align: center;
			padding-top: 15%;

			image {
				border-radius: 4px;
			}

			.title {
				margin-left: 10px;
			}
		}

		.login-form-content {
			text-align: center;
			margin: 20px auto;
			margin-top: 15%;
			width: 80%;

			.input-item {
				margin: 20px auto;
				background-color: #f5f6f7;
				height: 45px;
				border-radius: 20px;

				.icon {
					font-size: 38rpx;
					margin-left: 10px;
					color: #999;
				}

				.input {
					width: 100%;
					font-size: 14px;
					line-height: 20px;
					text-align: left;
					padding-left: 15px;
				}

			}

			.login-btn {
				margin-top: 8%;
				height: 45px;
			}


			.xieyi {
				color: #333;
				margin-top: 20px;
				display: flex;
				justify-content: center;
			}
		}
	}
</style>