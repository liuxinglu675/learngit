var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DoubleTapGestureRecognizer = (function (_super) {
    __extends(DoubleTapGestureRecognizer, _super);
    function DoubleTapGestureRecognizer(priority, requireGestureRecognizerToFail) {
        if (priority === void 0) { priority = 0; }
        if (requireGestureRecognizerToFail === void 0) { requireGestureRecognizerToFail = false; }
        _super.call(this, GestureType.DOUBLE_TAP, priority, requireGestureRecognizerToFail);
        this._interval = 300;
        this._max_dist = 80;
        this._count = 0;
        this._validate = false;
        this._sx = 0;
        this._sy = 0;
        this._t = new egret.Timer(this._interval, 1);
        this._t.addEventListener(egret.TimerEvent.TIMER, this.onCheck, this);
        this._count = 0;
    }
    DoubleTapGestureRecognizer.prototype.checkGesture = function (ts) {
        var t = ts[0];
        var validate;
        if (t.type == egret.TouchEvent.TOUCH_BEGIN) {
            if (this._count == 0)
                this._failed = false;
        }
        if (t.type == egret.TouchEvent.TOUCH_MOVE) {
        }
        if (t.type == egret.TouchEvent.TOUCH_END) {
            if (this._count == 0) {
                this._count += 1;
                this._validate = true;
                this._t.reset();
                this._t.start();
                //需要记录第一次点击的位置
                this._sx = t.stageX;
                this._sy = t.stageY;
            }
            else if (this._count == 1) {
                if (this._validate && Math.abs(t.stageX - this._sx) < this._max_dist && Math.abs(t.stageY - this._sy) < this._max_dist) {
                    //除了时间间隔需要在规定的时间内，而且需要比对第二次点击和第一次点击的位置差异需要保持在一定范围才算有效
                    validate = true;
                }
                this._count = 0;
                this._t.stop();
            }
        }
        return validate;
    };
    DoubleTapGestureRecognizer.prototype.onCheck = function (e) {
        this._failed = true;
        this._validate = false;
        this._count = 0;
        if (this._requireGestureRecognizerToFail) {
            this._g.gestureRecognizerStateChange(this._gestureType, false);
        }
    };
    return DoubleTapGestureRecognizer;
})(GestureRecognizerPlugin);
DoubleTapGestureRecognizer.prototype.__class__ = "DoubleTapGestureRecognizer";
