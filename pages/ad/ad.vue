<template>
	<view class="ad-page">
		<!-- logo页 -->
		<view class="logo-bg">
			<image class="top-logo" src="../../static/image/ad/1.png" mode="widthFix"></image>
			<image class="bot-logo" src="../../static/image/ad/2.png" mode="widthFix"></image>
		</view>
		<!-- 广告页 -->
		<view class="ad-bg" :class="{active: isShowAd}">
			<image class="ad" :src="picture" mode="aspectFill"></image>
			<view class="ad-logo">
				<image class="img" src="../../static/image/ad/3.png" mode="widthFix"></image>
			</view>
			<view class="close" @click="close" >
				跳过
			</view>
		</view>
	</view>
</template>

<script>
	import {apiAd} from '@/apis/index.js'
	export default {
		data() {
			return {
				isShowAd: false,                 //控制广告页显示
				picture: '',                     //请求的图片
				startTime: 0,                    //开始计算时间(当前-开始)
				adWaitTime: 2000,                //LOGO等待时间
				adShowTime: 7000,                //广告展示时间
				adTimer: null,                   //定时句柄id
			}
		},
		onShow() {
			this.getAd();
			//重置开始时间
			this.startTime = (new Date()).getTime();
		},
		methods: {
			//请求广告页接口
			getAd() {
				this.isShowAd = false;
				apiAd().then(res => {
					console.log(res)
					//开始计算等待时间
					let nowTime = (new Date()).getTime();
					//时间差
					let questTime = nowTime - this.startTime;
					//计算等待时间
					let wait = questTime < this.adWaitTime ? (this.adWaitTime-questTime) : 0;
					
					//等待跳转广告页的任务
					setTimeout(() => {
						this.isShowAd = true;
						this.picture = res.mock.ad;
					}, wait)
				})
				//整个广告页不能大于7秒
			    this.adTimer = setTimeout(()=>{
					this.close();
				}, this.adShowTime);
			},
			//关闭广告页
			close() {
				console.log("close")
				//清除未开始的定时任务
				clearTimeout(this.adTimer);
				//跳转
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
.ad-page{
	position:fixed;
	top:0;
	right:0;
	bottom:0;
	left:0;
	background: #da2d1f;
	z-index: 1000;
	.top-logo{
		position:absolute;
		top: 423rpx;
		left:50%;
		width:450rpx;
		height:93rpx;
		transform: translateX(-50%);
	}
	.bot-logo{
		position:absolute;
		bottom: 40rpx;
		left:50%;
		width:220rpx;
		height:43rpx;
		transform: translateX(-50%);
	}
	.ad{
		position:absolute;
		width:100%;
		height:100%;
		z-index: 2;
		background: #fff;
	}
	.logo-bg{
		opacity: 1;
		transition: opacity 0.3s;
		&.active{
			opacity: 0;
			display: none;
		}
	}
	.ad-bg{
		opacity: 0;
		transition: opacity 0.3s;
		&.active{
			opacity: 1;
			display: block;
		}
	}
	.ad-logo{
		position:absolute;
		left:0;
		bottom:0;
		width:100%;
		height: 168rpx;
		background: #fff;
		z-index: 3;
		.img{
			display: block;
			width:258rpx;
			height:86rpx;
			margin: 40rpx auto 0;
		}
	}
}
.close {
	position: absolute;
	right: 20rpx;
	bottom: 190rpx;
	width: 146rpx;
	height: 62rpx;
	color: #fff;
	background: rgba(0, 0, 0, 0.6);
	border-radius: 62rpx;
	text-align: center;
	line-height: 62rpx;
	z-index: 101;
}
</style>
