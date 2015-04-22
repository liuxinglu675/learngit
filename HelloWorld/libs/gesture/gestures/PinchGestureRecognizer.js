var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PinchGestureRecognizer = (function (_super) {
    __extends(PinchGestureRecognizer, _super);
    function PinchGestureRecognizer(priority, requireGestureRecognizerToFail) {
        if (priority === void 0) { priority = 0; }
        if (requireGestureRecognizerToFail === void 0) { requireGestureRecognizerToFail = false; }
        _super.call(this, GestureType.PINCH, priority, requireGestureRecognizerToFail, true, 2);
        this._cx = 0;
        this._cy = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this.pZero = new egret.Point();
    }
    PinchGestureRecognizer.prototype.checkGesture = function (ts) {
        if (ts.length != 2) {
            this._cx = 0;
            this._offsetX = this._offsetY = 0;
            return false;
        }
        var t1 = ts[0];
        var t2 = ts[1];
        //如果某一个手指抬起来了，此手势结束识别
        if (t1.type == egret.TouchEvent.TOUCH_END || t2.type == egret.TouchEvent.TOUCH_END) {
            this._cx = 0;
            this._offsetX = this._offsetY = 0;
            return false;
        }
        if (this._cx != 0) {
            return true;
        }
        this._cx = (t1.stageX + t2.stageX) * 0.5;
        this._cy = (t1.stageY + t2.stageY) * 0.5;
        this._d1X = t1.stageX - t2.stageX;
        this._d1Y = t1.stageY - t2.stageY;
        this._localLocation = this._g.target.globalToLocal(this._cx, this._cy, this._localLocation);
        if (this._callBack.changed) {
            this._result.dx = this._offsetX;
            this._result.dy = this._offsetY;
            this._result.dScale = 1;
            this._result.localLocation = this._localLocation;
            this._callBack.changed(this._result);
        }
        return true;
    };
    PinchGestureRecognizer.prototype.updateValue = function (ts) {
        if (ts.length != 2) {
            this._cx = 0;
            return false;
        }
        var t1 = ts[0];
        var t2 = ts[1];
        if (t1.type == egret.TouchEvent.TOUCH_END || t2.type == egret.TouchEvent.TOUCH_END) {
            this._cx = 0;
            this._offsetX = this._offsetY = 0;
            return false;
        }
        var prevX = this._cx;
        var prevY = this._cy;
        this._cx = (t1.stageX + t2.stageX) * 0.5;
        this._cy = (t1.stageY + t2.stageY) * 0.5;
        this._offsetX = this._cx - prevX;
        this._offsetY = this._cy - prevY;
        this._d2X = t1.stageX - t2.stageX;
        this._d2Y = t1.stageY - t2.stageY;
        this._localLocation = this._g.target.globalToLocal(this._cx, this._cy, this._localLocation);
        var scale = egret.Point.distance(new egret.Point(this._d2X, this._d2Y), this.pZero) / egret.Point.distance(new egret.Point(this._d1X, this._d1Y), this.pZero);
        this._d1X = this._d2X;
        this._d1Y = this._d2Y;
        if (this._callBack.changed) {
            this._result.dx = this._offsetX;
            this._result.dy = this._offsetY;
            this._result.dScale = scale;
            this._result.localLocation = this._localLocation;
            this._callBack.changed(this._result);
        }
        //返回true，说明这个连续的手势开始作用，当返回false的时候，说明这个连续的手势停止执行
        return true;
    };
    return PinchGestureRecognizer;
})(GestureRecognizerPlugin);
PinchGestureRecognizer.prototype.__class__ = "PinchGestureRecognizer";
