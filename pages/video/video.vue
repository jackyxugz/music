<template>
	<view class="video">
		<view class="topbar">
			<scroll-view class="scroll-view" scroll-x="true" :show-scrollbar="false">
				<view class="rel">
					<!-- 导航条 -->
					<view class="item" v-for="(item,index) in navList" :key="index" 
					:class="{active: curNav==item.id}" @click="switchNav(item.id, index)">
						<view class="desc">
							{{item.name}}
						</view>
					</view>
					<!-- 下划线 -->
					<view class="slide" 
					:style="'width:'+sliderWidth+'rpx;transform:translateX('+sliderOffset+'rpx)'">
						
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 视频列表 -->
		<mescroll-uni :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
			<view class="video-list">
				<view class="video-item" v-for="(item, index) in relatedVideo" :key="index">
					<view class="video-wrap">
						<image :src="item.coverUrl" mode="" class="img"></image>
						<view class="desc ellipsis">
							{{item.title}}
						</view>
						<view class="creater-bar flex-box">
							<view class="name">
								{{item.creator[0].userName}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {apiGetBanner, 
	    apiGetRecommendSongs, 
	    apiGetTopAlbum, 
		apiGetNavList,
	    apiGetRelatedVideo} from '@/apis/index.js'
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				navList: [],                      //导航条
				curNav: '',                       //当前选中的导航条
				sliderWidth: 60,                  //导航条默认宽度
				sliderOffset:26,                  //导航条偏移量
				downOption: {                     //下拉刷新
					auto: false
				},
				upOption: {                       //上拉加载下一页
					auto: false,
					page: {
						num: 0,                   //起始页
						size: 10,                 //一页条数
					}
				},
				relatedVideo: [],                 //视频列表
			}
		},
		onLoad() {
			this.getNavList();
		},
		onShow() {
			console.log("video show")
		},
		onHide() {
			console.log("video hide")
		},
		methods: {
			//获取导航条数据
			getNavList() {
				const params = {
					id: 124
				}
				apiGetNavList(params).then(res => {
					this.navList = res.mock.navList;
					//默认选中第一项
					this.curNav = this.navList[0].id;
					//自动切换到第一项
					this.switchNav(this.curNav, 0);
				})
			},
			//导航条高亮切换
			switchNav(itemId, index) {
				this.curNav = itemId;
				//导航条的宽度  140是第1项的宽度
				this.sliderWidth = index===1 ? 140: 60;
				//计算偏移量 左边16 文字60+间隙64=124   LOCK=80
				this.sliderOffset = 124*index + (index > 1 ? 80: 16)
				
				//加载第一项对应的视频列表
				this.getList(1,5, res=> {
					console.log(res)
					this.relatedVideo = res
				})
			},
			//视频列表
			getList(pageNum, pageSize, successCallback, errCallback) {
				const params = {
					id: this.curNav,
					pageNum,
					pageSize
				}
				apiGetRelatedVideo(params).then(res => {
					successCallback && successCallback(res.data)
				}, err => {
					errCallback && errCallback(err)
				})
			},
			//下拉刷新回调
			downCallback(mescroll) {
				console.log("downcallback")
				//重置列表为第一页(自动执行page.num=1，再触发upcallback方法)
				mescroll.resetUpScroll();
			},
			//上拉加载回调
			upCallback(mescroll) {
				console.log("upcallback", mescroll)
				//加载下一页数据
				this.getList(mescroll.num, mescroll.size, res=> {
					//若是第一页 则清空
					if (mescroll.num == 1) {
						this.relatedVideo = [];
					}
					//累加数据
					this.relatedVideo = this.relatedVideo.concat(res);
					//成功的回调，隐藏刷新状态
					mescroll.endSuccess();
				}, ()=>{
					//失败的回调，隐藏下拉刷新状态
					mescroll.endErr();
				})
			}
		}
	}
</script>

<style lang="scss">
	.topbar {
		.h86 {
			height: 86rpx;
		}
	}

	.scroll-view {
		position: fixed;
		top: 0;
		width: 100%;
		height: 86rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 86rpx;
		color: #333;
		font-weight: 600;
		border-bottom: 1rpx solid #e6e6e6;
		z-index: 10;
		background: #fff;
		.item {
			position: relative;
			display: inline-block;
			min-width: 126rpx;
			height: 86rpx;
			line-height: 86rpx;
			padding: 0 20rpx;
			&.active{
				color:#f32628;
			}
		}
	}

	.slide {
		position: absolute;
		width: 60rpx;
		height: 4rpx;
		left: 0;
		bottom: 0rpx;
		background: #f32628;
		transition: transform 0.3s;
		z-index: 2;
		/* #ifdef MP-WEIXIN */
		bottom: 2rpx;
		/* #endif */
	}

	.video-list {
		color: #333;
		background: #f8f8f8;
		.tit-bar {
			padding-left: 32rpx;
		}
		.video-item {
			padding-top: 32rpx;
			background: #fff;
			border-bottom: 24rpx solid #f8f8f8;
		}

		.video-wrap {
			width: 686rpx;
			margin: 0 auto;
		}

		.img {
			display: block;
			width: 686rpx;
			height: 390rpx;
			border-radius: 10rpx;
			background: #eee;
		}

		.desc {
			font-size: 30rpx;
			font-weight: 600;
			line-height: 84rpx;
			border-bottom: 1rpx solid #e6e6e6;
		}
	}

	.creater-bar {
		height: 100rpx;
		justify-content: space-between;
		align-items: center;
		.avactor-box {
			align-items: center;
		}
		.avactor {
			width: 66rpx;
			height: 66rpx;
			margin-right: 10rpx;
			border-radius: 66rpx;
			background: #eee;
		}

		.name {
			line-height: 100rpx;
		}
	}
</style>
