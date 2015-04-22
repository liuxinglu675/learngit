/**
 * Created by liuxinglu on 15/4/21.
 */
class DrawGraphics extends egret.Sprite {
    private _shape = new egret.Shape();
    private _color  = 0x0099ff;
    public constructor() {
        super();
        this._shape.graphics.clear();
        this._shape.graphics.lineStyle(2, this._color, 1, true);
        this.addChild(this._shape);

    }

    public draw(path:Array<any>):void {
        this._shape.graphics.beginFill(this._color);
        this._shape.graphics.moveTo(path[0].x, path[0].y);
        for(var i =0; i < path.length; i++)
        {
            this._shape.graphics.lineTo(path[i].x, path[i].y);
        }
        this._shape.graphics.lineTo(path[0].x, path[0].y);
        this._shape.graphics.endFill();
    }


}