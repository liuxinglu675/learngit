var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by liuxinglu on 15/4/22.
 */
var DrawLine = (function (_super) {
    __extends(DrawLine, _super);
    function DrawLine() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGameHandler, this);
    }
    DrawLine.prototype.startGameHandler = function (e) {
        this._contrl = new DrawController();
    };
    return DrawLine;
})(egret.DisplayObjectContainer);
DrawLine.prototype.__class__ = "DrawLine";
