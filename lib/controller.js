// 发送爱心 
function sendHeart(uname)
{
    $(".heart-icon").show();

    $('.heart').animate({
        top: '0px'
    }, 1000, 'linear', () => {
        $(".heart").css("top", 250);
        $(".heart-icon").css("display", "none");
    })

    sendMsg(uname, '送出一个个大大的比心');
}

// 发送火箭
function sendRocket(uname)
{
    $(".rocket").show();
    $(".rocket-icon").show();

    $('.rocket').animate({
        top: '0px'
    }, 1000, 'linear', () => {
        $(".rocket").css("top", 510);
        $(".rocket-icon").css("display", "none");
        $(".rocket").hide();
    })

    sendMsg(uname, '送出了一枚大火箭')
}

// 发送消息
function sendMsg(uname, msg, direction = '') 
{
    if (direction == 'r') direction = 'flexEnd'
    if (direction == 'c') direction = 'flexCenter'
    
    $(".chatRoom-content-box").append(` 
        <div class="current-chatRoom-person ${direction}"> 
            <div class="current-person-words" ${msg.indexOf('<img') == -1 ? '' : 'style="border:none"'} > 
                ${direction == 'flexEnd' ? '' : '<sapn class="current-person-name">'+uname+'：</span>'}
                <span class="current-person-message">${msg}</sapn> 
                ${direction == 'flexEnd' ? '<sapn class="current-person-name"> : '+uname+'</span>' : ''}
            </div> 
        </div>
    `)
    
    $('.chatRoom-content-box').scrollTop($('.chatRoom-content-box')[0].scrollHeight);
    
    $('.current-chatRoom-person img:last').on('load', function(){
        $('.chatRoom-content-box').scrollTop($('.chatRoom-content-box')[0].scrollHeight);
    })
}

// 创建头像
function createCurrentOnlineIcon(users = []) 
{
    if (!users) users = [
        {avatar: 'images/1.png'},
        {avatar: 'images/2.png'},
        {avatar: 'images/3.png'},
        {avatar: 'images/4.png'},
    ]
    var initRight = 50;
    var initZindex = 1000;
    var currentOnlineNum = $(".current-online-num-box");
    // 将新到的用户展现到最前面
    for (var i = users.length - 1; i >= 0; i--) {
        var item = users[i];
        var onLineIcon = $(
            `<div class="current-online-icon">
          <img class="current-icon" src="#">
         </div>`)
        onLineIcon.find("img").attr("src", item.avatar);
        onLineIcon.css({"right": initRight + "px", "z-index" : initZindex})
        initRight += 30;
        initZindex -= 1;
        currentOnlineNum.append(onLineIcon);
    }
}

// 触发图片上传
$('.uploadImg').click(function() {
    $('#upload').trigger('click')
})

// 头像选中
$('.choose-avatar-content .avatar-box').click(function() {
    $(this).addClass('extra-margin').siblings().removeClass('extra-margin')
})

// 表情
$("#message").emoji({
	button: "#face",
	showTab: false,
	animation: 'slide',
	position:"bottomLeft",
	icons: [{
		name: "QQ表情",
		path: "./lib/emoji/dist/img/qq/",
		maxNum: 91,
		excludeNums: [41, 45, 54],
		file: ".gif"
	}]
});
$('.emoji_container').css({left: '50%', marginLeft: '-273px', top: '245px'})

// 离开聊天室
$('.current-chatRoom-icon').click(function() {
    // $('.chatRoom-box').hide()
    // $('.chat-login-box').show()
    layer.confirm('确定退出吗?', {icon: 1, title:'提示'}, function(index){
        layer.close(index);
        
        if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
            window.location.href="about:blank";
            window.close();
        } else {
            window.opener = null;
            window.open("", "_self");
            window.close();
        }
    });
})

// 视频播放
let myVideo = videojs('video', {
    bigPlayButton: true,
    textTrackDisplay: false,
    posterImage: false,
    errorDisplay: false,
})
// myVideo.play() 

function changeVideo(vdoSrc) {
    console.log(myVideo)
    if (/\.m3u8$/.test(vdoSrc)) { //判断视频源是否是m3u8的格式
        myVideo.src({
            src: vdoSrc,
            type: 'application/x-mpegURL' //在重新添加视频源的时候需要给新的type的值
        })
    } else {
        myVideo.src(vdoSrc)
    }
    myVideo.load();
    myVideo.play();
}
// var src = 'https://youku.cdn7-okzy.com/20200327/18235_0dd4aea6/index.m3u8';
// document.querySelector('.change').addEventListener('click', function () {
//     changeVideo(src);
// }