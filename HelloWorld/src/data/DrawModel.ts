/**
 * Created by liuxinglu on 15/4/22.
 */
class DrawModel {
    lineThickness:number = 1;
    private _lineColor:number = 0x009900;
    lineAlpha:number = 1;
    linePixelHinting:boolean = true;
    lineScaleMode = null;
    lineCaps = null;
    lineJoints = null;
    lineMiterLimit:number = 3;
    clickCount = 0;
    constructor()
    {
    }

    set lineColor(num:number)
    {
        this._lineColor = 0x009900 + Math.random()*100;
    }

    get lineColor():number{
        return Math.random()*0xffffff;
    }

    setLineStyle(obj:any):void {
        this.lineThickness = obj.lineThickness;
        this.lineJoints = obj.lineJoints;
        this.lineMiterLimit = obj.lineMiterLimit;
    }

}