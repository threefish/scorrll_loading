/**
 * Created with IntelliJ IDEA.
 * User: 黄川
 * Date Time: 14-7-11下午2:51
 * @type {myloading}
 * @argument  id ：loading div的id
 * @argument fun:每次触发的事件
 * @argument sensitivity:设置页面高度敏感度，（可不传参默认为离底部180即触发更新效果）
 */
(function (win, doc) {
    var _sensitivity,
        _el = function (id) {
            if (arguments.length == 1 && doc.getElementById || typeof id == 'string') {
                return doc.getElementById(id);
            }
        }, _loading = function loading(id, fun, sensitivity) {
            var that = this;
            that.id = id;
            var timer = true;//时间节点，控制执行速率
            var moreScorllFlag = true;//多次滚动触发控制

            var message = {"loadmessage": "请稍候,载入中...", "nullmessage": "已经没有数据了"};
            var loadingimg = "images/loading32_32.GIF";

            that.fillpage = fun;
            /**
             * 没有数据
             */
            that.nodata = function () {
                that.span.innerText = message.nullmessage;
                timer = false;
                setTimeout(function () {
                    that.hide();
                    setTimeout(function () {
                        timer = true;
                    }, 50);
                }, 2000);

            }
            /**
             * 载入中
             */
            that.show = function () {
                if (timer) {
                    that.span.innerText = message.loadmessage;
                    _el(that.id).style.display = 'block'
                }
            }
            that.hide = function () {
                _el(that.id).style.display = 'none'
            }
            function init() {
                /**
                 * 初始化loading div
                 */
                if (sensitivity == undefined) {
                    _sensitivity = 180;//设置默认敏感度
                } else {
                    _sensitivity = sensitivity;
                }
                var div = doc.createElement("div");
                div.style.background = "#cdcdcd url(" + loadingimg + ") no-repeat 25%";
                div.style.backgroundSize = "32px 32px";
                div.style.width = "100%";
                div.style.lineHeight = "75px";
                div.style.color = "#666666";
                div.style.textAlign = "center";
                div.innerHTML = "<span style='padding-left: 32px;'>" + message.loadmessage + "</span>";
                _el(that.id).appendChild(div);
                that.span = _el(that.id).getElementsByTagName("span")[0];
                console.log(that.id + ' init ');
            }

            init();
            win.addEventListener('scroll', function () {
                /**
                 * @argument vi 窗口可视区
                 * @argument _bar 滚动条当前位置
                 * @argument scrollheight 当前页面可滚动高度
                 * @argument sensitivity  敏感度
                 */
                var vi = win.innerHeight;
                var _bar = document.body.scrollTop;
                var scrollheight = document.body.scrollHeight - vi;
                if (_bar > scrollheight - _sensitivity) {
                    if (moreScorllFlag) {
                        moreScorllFlag = false;
                        that.fillpage();
                    }
                } else {
                    moreScorllFlag = true;
                }
            }, false);
        };
    win.myloading = _loading;
}(window, document));
