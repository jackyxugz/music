<template>
	<view class="search-page" :class="{show: isShow}" v-if="isShow">
		<uni-nav-bar>
			<view class="search-box flex-box">
				<view class="top-search flex-box flex-item">
					<image class="search-icon" src="../static/image/search/2.png" mode="widthFix"></image>
					<input type="text" class="flex-item" v-model="searchTxt" 
					:focus="isFocus" @input="inputSearch" @confirm="addSearchHistory"/>
				</view>
				<view class="cancle" @click="close()">
					取消
				</view>
			</view>
			<block slot="right">
				<image class="top-img" src="../static/image/search/1.png" mode="widthFix"></image>
			</block>
		</uni-nav-bar>
		<!-- 搜索页内容 -->
		<scroll-view scroll-y="true" class="page-content">
			<!-- 没有输入 -->
			<template v-if="!searchTxt.trim().length">
				<!-- 广告位 -->
				<image class="top-ad" src="../static/image/search/s_03.png" mode="widthFix"></image>
				<!-- 搜索历史 -->
				<view class="history-list" v-if="historyList.length">
					<view class="title-bar flex-box">
						<view class="title">
							搜索历史
						</view>
						<image class="icon" src="../static/image/search/3.png" 
						mode="widthFix" @click="clearSearch"></image>
					</view>
					<scroll-view class="list scroll-view" scroll-x="true">
						<view class="item" v-for="(item, index) in historyList" :key="index">
							<view class="desc">
								{{item}}
							</view>
						</view>
					</scroll-view>
				</view>
				<!-- 热搜版 -->
				<view class="hot-list">
					<view class="title-bar flex-box">
						<view class="title">
							热搜版
						</view>
					</view>
					<view class="list">
						<view class="item flex-box" v-for="(item, index) in hotList" :key="index">
							<view class="num" :class="{on: index < 3}">
								{{index + 1}}
							</view>
							<view class="flex-item">
								<view class="flex-box con">
									<view class="tit">
										{{item.searchWord}}
									</view>
									<view class="count">
										{{item.score}}
									</view>
									<image class="icon" :src="item.iconUrl" mode="widthFix"></image>
								</view>
								<view class="desc">
									{{item.content}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			
			<!-- 已经输入 -->
			<view class="suggest-list" v-if="searchTxt.trim().length">
				<view class="suggest">
					搜索 {{searchTxt.trim()}}
				</view>
				<view class="item flex-box" v-for="(item,index) in suggestList" :key="index">
					<view class="icon iconfont">
						&#xe613;
					</view>
					<view class="word flex-item">
						{{item.keyword}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	//防抖
	function debounce(fn, wait=500) {
		var timeout = null;
		return function() {
			if (timeout != null) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(fn, wait);
		}
	}
	var self = null;
	
	
	import {apiGetSearchHot, apiGetSearchSuggest} from '../apis/index.js'
	import uniNavBar from '../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				isShow: false,                 //是否显示探索
				isFocus: false,                //光标是否定位
				searchTxt: '',                 //搜索内容
				historyList: [],               //搜索历史
				hotList: [],                   //热搜版
				suggestList: [],               //搜索列表
			}
		},
		created() {
			self = this;
		},
		methods: {
			//打开搜索页
			open() {
				this.isShow = true;
				this.isFocus = true;
				this.getHotList();
				this.getSearchHistoryList();
			},
			//关闭搜索页
			close() {
				this.isShow = false;
				this.isFocus = false;
				this.$emit('close');
			},
			//热搜
			getHotList() {
				if (this.hotList.length > 0) {
					return false;
				}
				apiGetSearchHot().then(res => {
					console.log(res)
					this.hotList = res.data;
				})
			},
			//搜索列表
			inputSearch: debounce(()=>{
				if (self.searchTxt.trim()) {
					const params = {
						type: 'mobile',
						keywords: self.searchTxt.trim()
					}
					apiGetSearchSuggest(params).then(res => {
						console.log(res)
						self.suggestList = res.result.allMatch;
					})
				}
			}),
			//搜索历史
			addSearchHistory() {
				const txt = this.searchTxt.trim();
				
				console.log("addSearchHistory", txt)
				if (txt) {
					//检查 关键字 是否已经存在
					const tempIndex = this.historyList.indexOf(txt);
					if (tempIndex != -1) {
						//删除旧的
						this.historyList.splice(tempIndex, 1);
					}
					//添加
					this.historyList.unshift(txt);
					
					//持久存储
					uni.setStorageSync("searchList", JSON.stringify(this.historyList));
				}
			},
			//读取搜索历史
			getSearchHistoryList() {
				const value = uni.getStorageSync('searchList');
				if (value) {
					this.historyList = JSON.parse(value);
				}
			},
			//清除搜索历史
			clearSearch() {
				uni.showModal({
					title: '',
					content: "确认清除全部历史记录？",
					success: (res) => {
						if (res.confirm) {
							uni.setStorageSync("searchList", "");
							this.historyList = [];
						} else if (res.cancel) {
							console.log("您选择了取消！")
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-page{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		background: #fff;
		min-height:100%;
		transition: transform 0.1s;
		transform: translateX(100%);
		z-index: 100;
		&.show{
			transform: translateX(0)
		}
	}
.search-box{
	width:630rpx;
	/* #ifdef MP-WEIXIN */
	width: 540rpx;
	/* #endif */
	align-items: center;
	.cancle{
		width:70rpx;
		font-size: 34rpx;
		color:#000;
	}
}
.top-img {
	width: 50rpx;
	height: 50rpx;
	margin-top: 10rpx;
}
.top-search {
	width: 500rpx;
	height: 72rpx;
	padding: 0 30rpx;
	margin-left: 30rpx;
	margin-right: 24rpx;
	border-radius: 72rpx;
	color: #333;
	background: #f7f7f7;
	align-items: center;
	.search-icon {
		width: 28rpx;
		height: 29rpx;
		margin-right: 12rpx;
	}
	
}
.page-content {
	position: fixed;
	top: 64px;
	left: 0;
	right: 0;
	bottom: 0px;
	/* #ifdef H5 */
	top: 44px;
	/* #endif */
}
.top-ad{
	display:block;
	width:686rpx;
	height:110rpx;
	margin: 24rpx auto 0;
}
.history-list {
	padding-top:14rpx;
	.list {
		height: 106rpx;
		padding-top:20rpx;
		margin-bottom: 30rpx;
		white-space: nowrap;
		.item {
			position: relative;
			display: inline-block;
			height: 64rpx;
			padding:0 30rpx;
			margin-right:20rpx;
			text-align: center;
			line-height: 64rpx;
			border-radius: 64rpx;
			color:#323232;
			background: #f8f8f8;
			&:first-child{
				margin-left:40rpx;
			}
		}
	}
}
.title-bar{
	height:68rpx;
	padding: 0 36rpx;
	justify-content: space-between;
	align-items:center;
	font-size: 26rpx;
	font-weight: 600;
	color:#333;
	.icon{
		width:36rpx;
		height:36rpx;
		margin-right:10rpx;
	}
}
.hot-list{
	.item{
		align-items: center;
		height:120rpx;
	}
	.con{
		align-items: center;
	}
	.num{
		width:84rpx;
		text-align: center;
		line-height: 120rpx;
		color:#999;
		font-size: 24rpx;
		font-weight: 600;
		&.on{
			color:#ff3a3a;
		}
	}
	.tit{
		margin-right:20rpx;
		color:#333;
		line-height: 48rpx;
		font-size: 32rpx;
		font-weight: 600;
	}
	.count{
		margin-right:20rpx;
		color:#ccc;
		line-height: 48rpx;
		font-size: 24rpx;
		transform: scale(0.84);
	}
	.icon{
		width:56rpx;
		height:20rpx;
	}
	.desc{
		color:#999;
		font-size: 24rpx;
		line-height: 40rpx;
	}
}
.suggest-list{
	.suggest{
		position:relative;
		height:96rpx;
		margin-left:32rpx;
		line-height:96rpx;
		color:#6578a0;
		&:before{
			position:absolute;
			content: '';
			right:0;
			bottom:0;
			width:100%;
			border-top: 1px solid #e6e6e6;
			transform: scaleY(0.5);
		}
	}
	.item{
		height:90rpx;
		line-height: 90rpx;
		color:#222;
	}
	.icon{
		width:72rpx;
		color:#aaa;
		text-align:center;
	}
	.word{
		position:relative;
		&:before{
			position:absolute;
			content: '';
			right:0;
			bottom:0;
			width:100%;
			border-top: 1px solid #e6e6e6;
			transform: scaleY(0.5);
		}
	}
}
</style>
