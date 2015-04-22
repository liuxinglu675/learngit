var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by liuxinglu on 15/4/21.
 */
var DrawGraphics = (function (_super) {
    __extends(DrawGraphics, _super);
    function DrawGraphics() {
        _super.call(this);
        this._shape = new egret.Shape();
        this._color = 0x0099ff;
        this._shape.graphics.clear();
        this._shape.graphics.lineStyle(2, this._color, 1, true);
        this.addChild(this._shape);
    }
    DrawGraphics.prototype.draw = function (path) {
        this._shape.graphics.beginFill(this._color);
        this._shape.graphics.moveTo(path[0].x, path[0].y);
        for (var i = 0; i < path.length; i++) {
            this._shape.graphics.lineTo(path[i].x, path[i].y);
        }
        this._shape.graphics.lineTo(path[0].x, path[0].y);
        this._shape.graphics.endFill();
    };
    return DrawGraphics;
})(egret.Sprite);
DrawGraphics.prototype.__class__ = "DrawGraphics";
