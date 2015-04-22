/**
 * Created by liuxinglu on 15/4/22.
 */
class DrawView extends egret.Sprite {
    private _delegate;
    private _sp:egret.Sprite = new egret.Sprite();
    private _touchPointIdArr:Array<any> = [];//Map<number, any> = new Map<number, any>();

    constructor() {
        super();
        this.addChild(this._sp);
        var stage = egret.MainContext.instance.stage;
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBeginHandler, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMoveHandler, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, this._touchEndHandler, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchTapHandler, this);
        this.addEventListener(egret.Event.REMOVED, this._removeHandler, this);
        stage.touchEnabled = true;

    }

    set delegate(delegate)
    {
        this._delegate = delegate;
    }

    clearScr():void
    {
        this.graphics.clear();
        this._sp.graphics.clear();
        this._touchPointIdArr = [];
    }

    private _touchTapHandler(event):void
    {
        this._delegate.addCount();
    }

    private _touchBeginHandler(event):void {
        var obj = this._delegate.getStyle();
        if(this._touchPointIdArr.length == 0)
        {
            this._touchPointIdArr.push({'id':event.touchPointID, 'sp':this});
            var stage = egret.MainContext.instance.stage;
            this.graphics.lineStyle(obj.lineThickness, obj.lineColor, obj.lineAlpha, obj.linePixelHinting, obj.lineScaleMode, obj.lineCaps, obj.lineJoints, obj.lineMiterLimit);
            this.graphics.moveTo(event.localX, event.localY);
        }
        else
        {
            if(this._judgeId(event.touchPointID) == -1)
            {
                this._touchPointIdArr.push({'id':event.touchPointID, 'sp':this._sp});
                this._sp.graphics.lineStyle(obj.lineThickness, obj.lineColor, obj.lineAlpha, obj.linePixelHinting, obj.lineScaleMode, obj.lineCaps, obj.lineJoints, obj.lineMiterLimit);
                this._sp.graphics.moveTo(event.localX, event.localY);
            }

        }

        this._delegate.setXYText(this._judgeId(event.touchPointID), 0);
        console.log("begin"+event.localX, event.localY);


    }

    private _judgeId(id:number):number {
        var num:number = -1;
        for(var i = 0; i < this._touchPointIdArr.length; i++)
        {
            if(this._touchPointIdArr[i].id == id)
            {
                num = i;
                break;
            }
        }
        return num;
    }

    private _touchMoveHandler(event):void {
        this._touchPointIdArr[this._judgeId(event.touchPointID)].sp.graphics.lineTo(event.localX, event.localY);
        this._touchPointIdArr[this._judgeId(event.touchPointID)].sp.graphics.moveTo(event.localX, event.localY);
        console.log("move"+event.localX, event.localY);
    }

    private _touchEndHandler(event):void {
        this._touchPointIdArr.splice(this._judgeId(event.touchPointID), 1);
        console.log("end"+event.localX, event.localY);
    }

    private _removeHandler():void {
        var stage = egret.MainContext.instance.stage;
        stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBeginHandler, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END, this._touchEndHandler, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMoveHandler, this);
        this.removeEventListener(egret.Event.REMOVED, this._removeHandler, this);
    }

    //_measureBounds():egret.Rectangle{
    //    return new egret.Rectangle(0, 0, egret.MainContext.instance.stage.width, egret.MainContext.instance.stage.height);
    //}

}