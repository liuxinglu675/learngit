/**
 * Created by liuxinglu on 15/4/22.
 */
var DrawController = (function () {
    function DrawController() {
        this._drawModel = new DrawModel();
        this._operateView = new OperateView();
        this._drawView = new DrawView();
        this._timer = new egret.Timer(1000);
        var stage = egret.MainContext.instance.stage;
        stage.addChild(this._drawView);
        stage.addChild(this._operateView);
        this._operateView.delegate = this;
        this._drawView.delegate = this;
        this._timer.addEventListener(egret.TimerEvent.TIMER, this._timerHandler, this);
        this._timer.start();
    }
    DrawController.prototype._timerHandler = function (event) {
        this._operateView.setCount(this._drawModel.clickCount);
        this._drawModel.clickCount = 0;
    };
    DrawController.prototype.getStyle = function () {
        var obj = {};
        obj.lineAlpha = this._drawModel.lineAlpha;
        obj.lineCaps = this._drawModel.lineCaps;
        obj.lineColor = this._drawModel.lineColor;
        obj.lineMiterLimit = this._drawModel.lineMiterLimit;
        obj.linePixelHinting = this._drawModel.linePixelHinting;
        obj.lineScaleMode = this._drawModel.lineScaleMode;
        obj.lineThickness = this._drawModel.lineThickness;
        obj.lineJoints = this._drawModel.lineJoints;
        return obj;
    };
    DrawController.prototype.setLineStyle = function (obj) {
        this._drawModel.setLineStyle(obj);
    };
    DrawController.prototype.setXYText = function (t_x, t_y) {
        this._operateView.setXY(t_x, t_y);
    };
    DrawController.prototype.addCount = function () {
        this._drawModel.clickCount++;
    };
    DrawController.prototype.clearScr = function () {
        this._drawView.clearScr();
    };
    return DrawController;
})();
DrawController.prototype.__class__ = "DrawController";
