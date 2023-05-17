import request from "@/utils/request.js"

//轮播请求接口
export function apiGetBanner(data) {
	return request.request({
		url: '/banner',
		method: 'GET',
		data
	})
}

//推荐歌单
export function apiGetRecommendSongs(data) {
	return request.request({
		url: '/personalized',
		method: 'GET',
		data,
	})
}

//新碟新歌
export function apiGetTopAlbum(data) {
	return request.request({
		url: '/album/newest',
		method: 'GET',
		data
	})
}

//精选视频
export function apiGetRelatedVideo(data) {
	return request.request({
		url: '/related/allvideo',
		method: 'GET',
		data
	})
}

// 视频
export function apiGetNavList(data) {
	return request.request({
		url: '/videomock',
		method: 'GET',
		data
	})
}


// 登录
export function apiLogin(data) {
	return request.request({
		url: '/test/login',
		method: 'POST',
		data
	})
}

// 用户详情
export function apiUserDetail(data) {
	return request.request({
		url: '/test/user/detail',
		method: 'GET',
		data
	})
}

// 用户注销
export function apiLogout(data) {
	return request.request({
		url: '/test/logout',
		method: 'GET',
		data
	})
}

// 广告接口
export function apiAd(data) {
	return request.request({
		url: '/adMock',
		method: 'GET',
		data
	})
}

// 热搜版
export function apiGetSearchHot(data) {
	return request.request({
		url: '/search/hot/detail',
		method: 'GET',
		data
	})
}

// 搜索接口
export function apiGetSearchSuggest(data) {
	return request.request({
		url: '/search/suggest',
		method: 'GET',
		data
	})
}

//歌单详情
export function apiAlbumDetail(data) {
	return request.request({
		url: '/playlist/detail',
		method: 'GET',
		data
	})
}

//获取歌曲连接
export function apiGetSongUrl(data) {
	return request.request({
		url: '/song/url',
		method: 'GET',
		data
	})
}

// 获取歌曲详情
export function apiGetSongDetail(data) {
	return request.request({
		url: '/song/detail',
		method: 'GET',
		data
	})
}
