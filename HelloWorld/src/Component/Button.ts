/**
 * Created by liuxinglu on 15/4/22.
 */
class Button extends egret.Sprite {
    private _wid = 50;
    private _hei = 50;
    private _normal_colr = 0x005500;
    private _down_colr = 0x009900;
    private _bg:egret.Sprite = new egret.Sprite();
    private _label:egret.TextField = new egret.TextField();
    private _callback;
    private _ctx;

    constructor(w:number, h:number, label:string, callback:()=>void, ctx:any)
    {
        super();

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
        this._label.x = this._wid/2;
        this._label.y = this._hei/2;
        this._label.anchorX = this._label.anchorY = 0.5;
        this.addChild(this._label);
        this.addEventListener(egret.Event.REMOVED, this._removeHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._changeDownState, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this._changeEndState, this);
        this.touchEnabled = true;
    }

    private _changeDownState(event):void
    {
        this._changeBGColor(this._down_colr);
    }

    private _changeEndState(event):void
    {
        this._changeBGColor(this._normal_colr);
        this._callback.call(this._ctx);
    }

    private _changeBGColor(color:number):void
    {
        this._bg.graphics.clear();
        this._bg.graphics.beginFill(color);
        this._bg.graphics.drawRoundRect(0, 0, this._wid, this._hei, 10, 10);
        this._bg.graphics.endFill();
    }

    public getLabel():string {
        return this._label.text;
    }

    public changeText(label:string):void
    {
        this._label.text = label;
    }

    private _removeHandler():void
    {
        this.removeEventListener(egret.Event.REMOVED, this._removeHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._changeDownState, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this._changeEndState, this);
    }

    _measureBounds():egret.Rectangle{
        return new egret.Rectangle(0, 0, this._wid, this._hei);
    }


}