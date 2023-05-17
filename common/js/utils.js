
//常用的函数
const PubFn = {
	//格式化 00:00 格式
	formatTime(second) {
		//秒
		var sec = second % 60;
		//分
		var min = Math.floor(second / 60);
		
		if (min.toString().length < 2) {
			min = '0' + min;
		}
		if (sec.toString().length < 2) {
			sec = '0' + sec;
		}
		return min + ':' + sec;
	}
}

export default PubFn