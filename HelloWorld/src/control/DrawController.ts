/**
 * Created by liuxinglu on 15/4/22.
 */
class DrawController {
    private _drawModel:DrawModel = new DrawModel();
    private _operateView:OperateView = new OperateView();
    private _drawView:DrawView = new DrawView();
    private _timer:egret.Timer = new egret.Timer(1000)
    constructor()
    {
        var stage = egret.MainContext.instance.stage;
        stage.addChild(this._drawView);
        stage.addChild(this._operateView);
        this._operateView.delegate = this;
        this._drawView.delegate = this;
        this._timer.addEventListener(egret.TimerEvent.TIMER, this._timerHandler, this);
        this._timer.start();
    }

    private _timerHandler(event):void
    {
        this._operateView.setCount(this._drawModel.clickCount);
        this._drawModel.clickCount = 0;
    }


    getStyle():any {
        var obj:any = {};
        obj.lineAlpha = this._drawModel.lineAlpha;
        obj.lineCaps = this._drawModel.lineCaps;
        obj.lineColor = this._drawModel.lineColor;
        obj.lineMiterLimit = this._drawModel.lineMiterLimit;
        obj.linePixelHinting = this._drawModel.linePixelHinting;
        obj.lineScaleMode = this._drawModel.lineScaleMode;
        obj.lineThickness = this._drawModel.lineThickness;
        obj.lineJoints = this._drawModel.lineJoints;
        return obj;
    }

    setLineStyle(obj:any):void
    {
        this._drawModel.setLineStyle(obj);
    }

    setXYText(t_x:number, t_y:number):void
    {
        this._operateView.setXY(t_x, t_y);
    }

    addCount():void
    {
        this._drawModel.clickCount++;
    }

    clearScr():void
    {
        this._drawView.clearScr();
    }

}