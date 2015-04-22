var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by liuxinglu on 15/4/22.
 */
var OperateView = (function (_super) {
    __extends(OperateView, _super);
    function OperateView() {
        _super.call(this);
        this._tf_lineW = new egret.TextField();
        this._tf_limit = new egret.TextField();
        this._tf_xy = new egret.TextField();
        this._tf_lineW.type = egret.TextFieldType.INPUT;
        this._tf_lineW.text = "5";
        this._tf_lineW.x = 100;
        this._tf_lineW.y = 0;
        this._btn_pixH = new Button(110, 50, "pixHintT", this._pixHintingHandler, this);
        this._btn_pixH.x = 100;
        this._btn_pixH.y = 100;
        this._tf_limit.type = egret.TextFieldType.INPUT;
        this._tf_limit.text = "3";
        this._tf_limit.x = 100;
        this._tf_limit.y = 200;
        var btn_submit = new Button(110, 50, "确定", this._submitHandler, this);
        btn_submit.x = 100;
        btn_submit.y = 300;
        this.addChild(this._tf_lineW);
        this.addChild(this._btn_pixH);
        this.addChild(this._tf_limit);
        this.addChild(btn_submit);
        this._tf_xy.x = 200;
        this._tf_xy.y = 0;
        this.addChild(this._tf_xy);
        var btn_clear = new Button(110, 50, "清屏", this._clearHandler, this);
        btn_clear.x = 100;
        btn_clear.y = 400;
        this.addChild(btn_clear);
    }
    Object.defineProperty(OperateView.prototype, "delegate", {
        set: function (delegate) {
            this._delegate = delegate;
        },
        enumerable: true,
        configurable: true
    });
    OperateView.prototype._pixHintingHandler = function () {
        if (this._btn_pixH.getLabel() == "pixHintT")
            this._btn_pixH.changeText("pixHintF");
        else
            this._btn_pixH.changeText("pixHintT");
    };
    OperateView.prototype.setXY = function (t_x, t_y) {
        this._tf_xy.text = t_x + "," + t_y;
    };
    OperateView.prototype.setCount = function (count) {
        this._tf_xy.text = count + "／s";
    };
    OperateView.prototype._submitHandler = function () {
        var obj = {};
        obj.lineThickness = this._tf_lineW.text;
        obj.lineMiterLimit = this._tf_limit.text;
        obj.linePixelHinting = this._btn_pixH.getLabel() == "pixHintT";
        this._delegate.setLineStyle(obj);
    };
    OperateView.prototype._clearHandler = function () {
        this._delegate.clearScr();
    };
    return OperateView;
})(egret.Sprite);
OperateView.prototype.__class__ = "OperateView";
