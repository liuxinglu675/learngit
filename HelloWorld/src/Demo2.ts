/**
 * Created by liuxinglu on 15/4/21.
 */
class Demo2 extends egret.DisplayObjectContainer {
    private _sp:egret.Sprite = new egret.Sprite();
    constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGameHandler, this);
    }

    public startGameHandler():void
    {
        this._loadResource();
    }

    private _loadResource():void
    {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this._onResourceLoadComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("demo2");
    }

    private _onResourceLoadComplete():void
    {
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
    }

    private _touchBeginHandler(event):void {
        var stage = egret.MainContext.instance.stage;
        this._sp.graphics.lineStyle(1, 0x009900, 1);
        this._sp.graphics.moveTo(event.localX, event.localY);
        console.log("begin"+event.localX, event.localY);

        //stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMoveHandler, this);
    }

    private _touchMoveHandler(event):void {

        this._sp.graphics.lineTo(event.localX, event.localY);
        console.log("move"+event.localX, event.localY);
    }

    private _touchEndHandler(event):void {
        var stage = egret.MainContext.instance.stage;
        console.log("end"+event.localX, event.localY);
    }

    private _createBitmapByName(name: string): egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private _startNativeAnimation():void
    {
        //this._logo.touchEnabled = true;
        //this._logo.width = this._logo.height = 60;
        //this._logo.scaleX = this._logo.scaleY = 0.5;
        //this._logo.rotation = 90;
        //this._logo.skewX = 45;
        //this._logo._anchorX = 0.5;
        //this._logo._anchorY = 0.5;
    }


}