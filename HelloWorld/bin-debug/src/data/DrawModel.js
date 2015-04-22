/**
 * Created by liuxinglu on 15/4/22.
 */
var DrawModel = (function () {
    function DrawModel() {
        this.lineThickness = 1;
        this._lineColor = 0x009900;
        this.lineAlpha = 1;
        this.linePixelHinting = true;
        this.lineScaleMode = null;
        this.lineCaps = null;
        this.lineJoints = null;
        this.lineMiterLimit = 3;
        this.clickCount = 0;
    }
    Object.defineProperty(DrawModel.prototype, "lineColor", {
        get: function () {
            return Math.random() * 0xffffff;
        },
        set: function (num) {
            this._lineColor = 0x009900 + Math.random() * 100;
        },
        enumerable: true,
        configurable: true
    });
    DrawModel.prototype.setLineStyle = function (obj) {
        this.lineThickness = obj.lineThickness;
        this.lineJoints = obj.lineJoints;
        this.lineMiterLimit = obj.lineMiterLimit;
    };
    return DrawModel;
})();
DrawModel.prototype.__class__ = "DrawModel";
