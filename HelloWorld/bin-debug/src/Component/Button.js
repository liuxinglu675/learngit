var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by liuxinglu on 15/4/22.
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(w, h, label, callback, ctx) {
        _super.call(this);
        this._wid = 50;
        this._hei = 50;
        this._normal_colr = 0x005500;
        this._down_colr = 0x009900;
        this._bg = new egret.Sprite();
        this._label = new egret.TextField();
        this._wid = w;
        this._hei = h;
        this._ctx = ctx;
        this._callback = callback;
        this._bg.graphics.clear();
        this._bg.graphics.beginFill(this._normal_colr);
        this._bg.graphics.drawRoundRect(0, 0, this._wid, this._hei, 10, 10);
        this._bg.graphics.endFill();
        this.addChild(this._bg);
        this._label.text = label;
        this._label.x = this._wid / 2;
        this._label.y = this._hei / 2;
        this._label.anchorX = this._label.anchorY = 0.5;
        this.addChild(this._label);
        this.addEventListener(egret.Event.REMOVED, this._removeHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._changeDownState, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this._changeEndState, this);
        this.touchEnabled = true;
    }
    Button.prototype._changeDownState = function (event) {
        this._changeBGColor(this._down_colr);
    };
    Button.prototype._changeEndState = function (event) {
        this._changeBGColor(this._normal_colr);
        this._callback.call(this._ctx);
    };
    Button.prototype._changeBGColor = function (color) {
        this._bg.graphics.clear();
        this._bg.graphics.beginFill(color);
        this._bg.graphics.drawRoundRect(0, 0, this._wid, this._hei, 10, 10);
        this._bg.graphics.endFill();
    };
    Button.prototype.getLabel = function () {
        return this._label.text;
    };
    Button.prototype.changeText = function (label) {
        this._label.text = label;
    };
    Button.prototype._removeHandler = function () {
        this.removeEventListener(egret.Event.REMOVED, this._removeHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._changeDownState, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this._changeEndState, this);
    };
    Button.prototype._measureBounds = function () {
        return new egret.Rectangle(0, 0, this._wid, this._hei);
    };
    return Button;
})(egret.Sprite);
Button.prototype.__class__ = "Button";
