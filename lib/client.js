// 【一、】###登录进入聊天室 
$('.chatRoom').click(function() {
    // 收集数据过滤
    let uname = $('#userName').val()
    let avatar = $('.extra-margin img').attr('src')
    if (!uname || !avatar) return layer.msg('请输入名称和选择头像！！！');

    // 聊天界面逻辑
        // 视频处理
        let m3u8 = $(this).attr('m3u8')
        $('.live #video').hide()
        if (m3u8) {
            $('.live #video').show()
            changeVideo(m3u8);
        }
        //你画我猜
        $('.live canvas').hide()
        let type = $(this).attr('type')
        if (type == 'draw') {
            $('.live canvas').show()
        }
        // 切换界面
        $('.chat-login-box').hide()
        $('.chatRoom-box').show()

    // 登录逻辑
})

// 【二、】头像、在线人数
$(function() {
    createCurrentOnlineIcon([
        {avatar: 'images/1.png'},
        {avatar: 'images/2.png'},
        {avatar: 'images/3.png'},
        {avatar: 'images/4.png'},
    ]) 

    $('.current-num').text(23)
})

// 【三、】发送消息
$('.upload-btn').click(function() {
    // 获取数据，过滤
    let val = $('#message').html()
    if (!val) return layer.msg("请输入内容！！！")
    // 发送
    sendMsg('我', val, 'r')
    // 清空内容
    $('#message').html('')
})

// 【四、】###发送比心
$('.heart-btn').click(function() {
    sendHeart('张三')
})

// 【五、】###发送火箭
$('.rocket-btn').click(function() {
    sendRocket('李四')
})

// 【六、】###发送图片
$('#upload').change(function() {
	let file = this.files[0]
	let reader = new FileReader();
	reader.readAsDataURL(file)
	reader.onload = function() {
		// console.log(reader.result);
		sendMsg('我', `<img width="120" src="${reader.result}" />`, 'r')
	};
})