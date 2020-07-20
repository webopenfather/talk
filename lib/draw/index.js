
function Draw(arg) { 
    if (arg.nodeType) {
        this.canvas = arg;
    } else if (typeof arg == 'string') {
        this.canvas = document.querySelector(arg);
    } else {
        return;
    }
    this.init();
}
Draw.prototype = {
    init: function() {
        var that = this;
        if (!this.canvas.getContext) {
            return;
        }
        this.context = this.canvas.getContext('2d');
        this.canvas.onselectstart = function () {
            return false;  //修复chrome下光标样式的问题
        };
        this.canvas.onmousedown = function(event) {
            that.drawBegin(event);
        };
    },
    drawBegin: function(e) {
        var that = this,
            stage_info = this.canvas.getBoundingClientRect();
        window.getSelection ? window.getSelection().removeAllRanges() :
                                document.selection.empty();  //清除文本的选中
        this.context.moveTo(
            e.clientX - stage_info.left,
            e.clientY - stage_info.top
        );
        document.onmousemove = function(event) {
            that.drawing(event);
        };
        
        // 页面显示图片
        document.onmouseup = () => {
            let base64 = this.canvas.toDataURL();
            
            // var img = new Image();
            // img.src = base64;
            // document.querySelector(".show").appendChild(img);
            
		    sendMsg('我', `<img width="120" style="border:#ccc solid 1px;" src="${base64}" />`, 'r')

            document.onmousemove = document.onmouseup = null;
        };
    },
    drawing: function(e) {
        var stage_info = this.canvas.getBoundingClientRect();
        this.context.lineTo(
            e.clientX - stage_info.left,
            e.clientY - stage_info.top
        );
        this.context.stroke();
    }
};
const draw = new Draw('canvas');