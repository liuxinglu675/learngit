///<reference path="../libs/core/core.d.ts"/>
/**
 * Created by liuxinglu on 15/4/21.
 */
class Circle extends egret.Sprite {
    private _shapeOut = new egret.Shape();
    private _shapeIn = new egret.Shape();
    private _shapeRect = new egret.Shape();
    private _wid = 50;
    private _hei = 50;
    public constructor() {
        super();
        this.reDraw(this._shapeOut, this._wid/2, 0x008800);
        this.reDraw(this._shapeIn, this._wid/2 - 5, 0x666665);
        this._shapeRect.graphics.clear();
        this._shapeRect.graphics.beginFill(0x000093);
        this._shapeRect.graphics.drawRect(0, 50, this._wid, 20);
        this._shapeRect.graphics.endFill();
        this._shapeRect.blendMode = egret.BlendMode.ERASE;
        this._shapeIn.blendMode = egret.BlendMode.ERASE;
        this._shapeOut.x = this._shapeIn.x = this._shapeRect.x = this._wid/2;
        this._shapeOut.y = this._shapeIn.y = this._shapeRect.y = this._hei/2;
        this.addChild(this._shapeOut);
        this.addChild(this._shapeIn);
        this.addChild(this._shapeRect);
        this.anchorX = this.anchorY = 0.5;
        //this.graphics.clear();
        //this.graphics.beginFill(0x009900);
        //this.graphics.drawRect(0, 0, this.width, this.height);
        //this.graphics.endFill();
    }

    protected reDraw(shape:egret.Shape, r:number, colr:number):void {
        shape.graphics.clear();
        shape.graphics.beginFill(colr);
        shape.graphics.drawCircle(0, 0, r)
        shape.graphics.endFill();
        shape.width = shape.height = r * 2;
    }

    _measureBounds():egret.Rectangle{
        return new egret.Rectangle(0, 0, this._wid, this._hei);
    }

}