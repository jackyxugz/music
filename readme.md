# 发现页
1.请求组件promise封装
2.请求组件的使用
3.主入口模块的实现

4.推荐歌单模块
5.新碟新歌模块
6.精选视频模块

7.songList组件封装
减少代码冗余
8.下拉刷新
需要在pages.json中配置enablePullDownRefresh
[下拉刷新](https://uniapp.dcloud.io/api/ui/pulldown?id=onpulldownrefresh)
页面生命周期：
onPullDownRefresh() {
        console.log('refresh');
        setTimeout(function () {
            uni.stopPullDownRefresh();
        }, 1000);
	    //加载下一页数据
    }
# 视频页
1.导航条实现
使用scroll-view组件实现
导航条高亮显示

2.需要计算每个项目下面的下划线位置
二个文字宽度===60rpx
最左边空隙16rpx
二个导航条之间50rpx

3.视频列表
仍然可以使用scroll-view上下滚动，
有个问题？是一个分页，向上滚动到要能加载下一页，向下滚动要能刷新当前页
推荐外部控件mescroll-uni


#我的页
1.导航条
2.菜单列表  使用三方插件uni-list
3.推荐歌单

#云村页
1.导航栏 三方插件uni-nav-bar
1.1 兼容性
uniapp---兼容多个平台
<!-- #ifdef APP-PLUS || H5 -->
里面的内容会打包到h5中
<!-- #endif -->
2.滚动列表 三方插件mescroll
3.滚动列表包括：
  上下轮播
  二列视频列表(奇偶)

#账号页
1.导航栏

2.滚动列表
scroll-view
子列表uni-list

3.vuex状态控制
把store挂载到vue实例上

#登录页
1.通过登录接口登录。
2.登录成功后，保存用户信息到vuex，便于账号页显示用户信息。
3.刷新后 用户信息丢失？
需要将用户信息保存到storage, 在app打开时，将用户信息取出并放到vuex中。
4.用户登出
4.0 跳用注销接口，清除服务端的用户缓存信息
4.1 将用户的数据从浏览器缓存和storage中清除
4.2 跳转到账号页


#开屏页
1.app首次打开时显示
2.app后台运行超过一定时间，再切换时也显示
3.首选显示的是LOGO页,维持2秒
4.再显示广告页，维持7秒, 之后跳转首页(也可以跳过)

#搜索页
1.首页重构
增加导航栏，滚动组件mescroll-uni，相应的加载数据的方法
增加搜索页
2.二种下拉刷新方式
  uniapp提供的，pages.json可配置
  mescroll提供的。
3.搜索页与首页切换
父子组件通信
4.搜索页面
未输入时
  展示广告位，搜索历史，热搜版

已输入时
  则显示搜索结果
5.搜索页面2
  防抖处理
  搜索结果展示
  搜索历史
  
# 音乐页面
1. 从歌单中 点击 打开音乐页面
2. 音乐页面获取接口数据

# 播放页面
1. 从音乐列表中  点击  跳转到播放页面
2. 音乐界面展示 背景图片 播放 暂停 进度条
3. 进度条的控制
   播放时 进度条的自动更新
   需要点击拖动
   进度条左右两边时间显示
4. 下一首 上一首 播放模式
   歌曲是一个数组 [1, 2, 3] 只需要改变播放的索引
   播放模式 【列表循环，随机播放，单曲循环】
   
# app调试
  在手机上调试  需要VConsole
  下载方式
  1. npm install vconsole
  2. [vconsole](https://github.com/Tencent/vConsole)
  把dist/vconsole.min.js复制到common/下载。
  
# 打包
1.下载hbuildx并注册账号
2.可运行uniapp项目
3.打开manifest.json获取appid
4.发行--原生app云打包--点击打包
5.打包完成会在控制台生成一个下载app的链接，复制到浏览器下载并安装