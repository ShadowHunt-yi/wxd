<template>
	<view class="charts-box">
		<!-- <qiun-data-charts type="column" :opts="opts" :chartData="chartData" /> -->
	</view>
</template>

<script>
	import {
		reqGetAll2,
		reqGetAll,
		reqGetInfoById
	} from '@/api/task.js';
	export default {
		data() {
			return {
				siteName: "龙泉山站监测测向系统",
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [{
							min: 0
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				}
			};
		},
		onReady() {
			this.downloadFileOpen();
		},
		methods: {
			getServerData() {
				// 获取数据
				let ans = {
					siteName: "龙泉山站监测测向系统"
				};
				reqGetAll(ans).then(res => {
					if (res.code == 200) {
						console.log(res)
					}
				});
				/* uni.request({
					url: 'https://www.cd-dxd.com/system/inspection/select?year=2022',
					/* data: {
						siteName: "龙泉山站监测测向系统"
					}, */
				/* header: {
						Authorization: "d76b97b22761f9323112813789f8bfc8",
					}, 
					method: 'post',
					success: (res) => {
						console.log("传参：", res.data);
					}
				}); */
			},
			downloadFileOpen() {
				let link = 'https://www.gjtool.cn/pdfh5/git.pdf'
				//下载文件
				wx.downloadFile({
					url: link,
					success(res) {
						if (res.statusCode === 200) {
							const filePath = res.tempFilePath
							wx.openDocument({
								filePath: filePath,
								showMenu: true, //关键点
								success: function(res) {
									console.log('打开文档成功')
								}
							})
						}
					}
				})
			}

		}
	};
</script>

<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>