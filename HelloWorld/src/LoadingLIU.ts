/**
 * Created by liuxinglu on 15/4/21.
 */
class LoadingLIU extends egret.Sprite{

    private _shape = new egret.Shape();
    private _shape2 = new Circle();
    private _logo = new egret.Bitmap();
    private _count:number;
    private static _loading:Loading;
    private _tw:egret.Tween;
    private _color = 0x885566;

    public constructor(ucolr:number){
        super();
        this._count = 0;
        var stage = egret.MainContext.instance.stage;
        this.color = ucolr;
        this._logo.texture = RES.getRes("egretIcon");
        this._logo.anchorX = this._logo.anchorY = 0.5;
        this._logo.scaleX = this._logo.scaleY = 0.3;

        this._shape.x = this._logo.x = this._shape2.x = stage.stageWidth/2 - this._shape.width/2;
        this._shape.y = this._logo.y = this._shape2.y = stage.stageHeight/2 - this._shape.height/2;

        this.addChild(this._shape2);
        this.addChild(this._shape);
        //this.addChild(this._logo);
        this._animation();
    }

    public static getInstance():Loading {
        if(this._loading) {
            return this._loading;
        }
        else
        {
            this._loading = new Loading(0x885566);
            return this._loading;
        }
    }

    public set color(ucolor:number)
    {
        this._color = ucolor;
        this.reDraw();
    }

    public get color():number
    {
        return this._color;
    }

    protected reDraw():void {
        this._shape.graphics.clear();
        this._shape.graphics.beginFill(this.color);
        this._shape.graphics.drawRoundRect(0, 0, 50, 50, 20, 20);
        this._shape.graphics.endFill();
        this._shape.alpha = 0.6;
        this._shape.width = this._shape.height = 50;
        this._shape.anchorX = this._shape.anchorY = 0.5;
    }

    private _animation():void {
        this._tw = egret.Tween.get(this._shape2);
        this._tw.to({"rotation": 360 * this._count++}, 1000);
        this._tw.call(this._animation, this);
    }

    //开始转动
    public start():void {
        this._animation();
    }

    //停止转动
    public stop():void {
        //this._tw.
    }
}