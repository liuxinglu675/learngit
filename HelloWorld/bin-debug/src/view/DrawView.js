var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by liuxinglu on 15/4/22.
 */
var DrawView = (function (_super) {
    __extends(DrawView, _super);
    function DrawView() {
        _super.call(this);
        this._sp = new egret.Sprite();
        this._touchPointIdArr = []; //Map<number, any> = new Map<number, any>();
        this.addChild(this._sp);
        var stage = egret.MainContext.instance.stage;
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBeginHandler, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMoveHandler, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, this._touchEndHandler, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchTapHandler, this);
        this.addEventListener(egret.Event.REMOVED, this._removeHandler, this);
        stage.touchEnabled = true;
    }
    Object.defineProperty(DrawView.prototype, "delegate", {
        set: function (delegate) {
            this._delegate = delegate;
        },
        enumerable: true,
        configurable: true
    });
    DrawView.prototype.clearScr = function () {
        this.graphics.clear();
        this._sp.graphics.clear();
        this._touchPointIdArr = [];
    };
    DrawView.prototype._touchTapHandler = function (event) {
        this._delegate.addCount();
    };
    DrawView.prototype._touchBeginHandler = function (event) {
        var obj = this._delegate.getStyle();
        if (this._touchPointIdArr.length == 0) {
            this._touchPointIdArr.push({ 'id': event.touchPointID, 'sp': this });
            var stage = egret.MainContext.instance.stage;
            this.graphics.lineStyle(obj.lineThickness, obj.lineColor, obj.lineAlpha, obj.linePixelHinting, obj.lineScaleMode, obj.lineCaps, obj.lineJoints, obj.lineMiterLimit);
            this.graphics.moveTo(event.localX, event.localY);
        }
        else {
            if (this._judgeId(event.touchPointID) == -1) {
                this._touchPointIdArr.push({ 'id': event.touchPointID, 'sp': this._sp });
                this._sp.graphics.lineStyle(obj.lineThickness, obj.lineColor, obj.lineAlpha, obj.linePixelHinting, obj.lineScaleMode, obj.lineCaps, obj.lineJoints, obj.lineMiterLimit);
                this._sp.graphics.moveTo(event.localX, event.localY);
            }
        }
        this._delegate.setXYText(this._judgeId(event.touchPointID), 0);
        console.log("begin" + event.localX, event.localY);
    };
    DrawView.prototype._judgeId = function (id) {
        var num = -1;
        for (var i = 0; i < this._touchPointIdArr.length; i++) {
            if (this._touchPointIdArr[i].id == id) {
                num = i;
                break;
            }
        }
        return num;
    };
    DrawView.prototype._touchMoveHandler = function (event) {
        this._touchPointIdArr[this._judgeId(event.touchPointID)].sp.graphics.lineTo(event.localX, event.localY);
        this._touchPointIdArr[this._judgeId(event.touchPointID)].sp.graphics.moveTo(event.localX, event.localY);
        console.log("move" + event.localX, event.localY);
    };
    DrawView.prototype._touchEndHandler = function (event) {
        this._touchPointIdArr.splice(this._judgeId(event.touchPointID), 1);
        console.log("end" + event.localX, event.localY);
    };
    DrawView.prototype._removeHandler = function () {
        var stage = egret.MainContext.instance.stage;
        stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBeginHandler, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END, this._touchEndHandler, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMoveHandler, this);
        this.removeEventListener(egret.Event.REMOVED, this._removeHandler, this);
    };
    return DrawView;
})(egret.Sprite);
DrawView.prototype.__class__ = "DrawView";
