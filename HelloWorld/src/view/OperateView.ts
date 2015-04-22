/**
 * Created by liuxinglu on 15/4/22.
 */
class OperateView extends egret.Sprite {
    private _tf_lineW:egret.TextField = new egret.TextField();
    private _tf_limit:egret.TextField = new egret.TextField();
    private _btn_pixH:Button;
    private _tf_xy:egret.TextField = new egret.TextField();
    private _delegate;
    constructor()
    {
        super();
        this._tf_lineW.type = egret.TextFieldType.INPUT;
        this._tf_lineW.text = "5";
        this._tf_lineW.x = 100;
        this._tf_lineW.y = 0;
        this._btn_pixH = new Button(110, 50, "pixHintT", this._pixHintingHandler, this);
        this._btn_pixH.x = 100;
        this._btn_pixH.y = 100;
        this._tf_limit.type = egret.TextFieldType.INPUT;
        this._tf_limit.text = "3";
        this._tf_limit.x = 100;
        this._tf_limit.y = 200;
        var btn_submit:Button = new Button(110, 50, "确定", this._submitHandler, this);
        btn_submit.x = 100;
        btn_submit.y = 300;
        this.addChild(this._tf_lineW);
        this.addChild(this._btn_pixH);
        this.addChild(this._tf_limit);
        this.addChild(btn_submit);
        this._tf_xy.x = 200;
        this._tf_xy.y = 0;
        this.addChild(this._tf_xy);
        var btn_clear:Button = new Button(110, 50, "清屏", this._clearHandler, this);
        btn_clear.x = 100;
        btn_clear.y = 400;
        this.addChild(btn_clear);
    }

    set delegate(delegate:any)
    {
        this._delegate = delegate;
    }

    private _pixHintingHandler():void
    {
        if(this._btn_pixH.getLabel() == "pixHintT")
            this._btn_pixH.changeText("pixHintF");
        else
            this._btn_pixH.changeText("pixHintT");
    }

    setXY(t_x:number, t_y:number):void
    {
        this._tf_xy.text = t_x + ","+ t_y;
    }

    setCount(count:number):void
    {
        this._tf_xy.text = count + "／s";
    }

    private _submitHandler():void
    {
        var obj:any = {};
        obj.lineThickness = this._tf_lineW.text;
        obj.lineMiterLimit = this._tf_limit.text;
        obj.linePixelHinting = this._btn_pixH.getLabel() == "pixHintT";
        this._delegate.setLineStyle(obj);
    }

    private _clearHandler():void
    {
        this._delegate.clearScr();
    }




}