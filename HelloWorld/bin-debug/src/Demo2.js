var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by liuxinglu on 15/4/21.
 */
var Demo2 = (function (_super) {
    __extends(Demo2, _super);
    function Demo2() {
        _super.call(this);
        this._sp = new egret.Sprite();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGameHandler, this);
    }
    Demo2.prototype.startGameHandler = function () {
        this._loadResource();
    };
    Demo2.prototype._loadResource = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this._onResourceLoadComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("demo2");
    };
    Demo2.prototype._onResourceLoadComplete = function () {
        var stage = egret.MainContext.instance.stage;
        this.addChild(this._sp);
        //this._startTWAnimation();
        //this._startNativeAnimation();
        //var loading:Loading = Loading.getInstance();
        //stage.addChild(loading);
        //var fan:DrawGraphics = new DrawGraphics();
        //fan.fillColor();
        ////fan.draw(Path.createRect(100, 200));
        //fan.draw(Path.createFan(100, 15, 290));
        //fan.x = 100;
        //fan.y = 400;
        //stage.addChild(fan);
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBeginHandler, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, this._touchEndHandler, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMoveHandler, this);
    };
    Demo2.prototype._touchBeginHandler = function (event) {
        var stage = egret.MainContext.instance.stage;
        this._sp.graphics.lineStyle(1, 0x009900, 1);
        this._sp.graphics.moveTo(event.localX, event.localY);
        console.log("begin" + event.localX, event.localY);
        //stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMoveHandler, this);
    };
    Demo2.prototype._touchMoveHandler = function (event) {
        this._sp.graphics.lineTo(event.localX, event.localY);
        console.log("move" + event.localX, event.localY);
    };
    Demo2.prototype._touchEndHandler = function (event) {
        var stage = egret.MainContext.instance.stage;
        console.log("end" + event.localX, event.localY);
    };
    Demo2.prototype._createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Demo2.prototype._startNativeAnimation = function () {
        //this._logo.touchEnabled = true;
        //this._logo.width = this._logo.height = 60;
        //this._logo.scaleX = this._logo.scaleY = 0.5;
        //this._logo.rotation = 90;
        //this._logo.skewX = 45;
        //this._logo._anchorX = 0.5;
        //this._logo._anchorY = 0.5;
    };
    return Demo2;
})(egret.DisplayObjectContainer);
Demo2.prototype.__class__ = "Demo2";
