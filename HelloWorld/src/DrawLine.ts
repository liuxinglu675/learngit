/**
 * Created by liuxinglu on 15/4/22.
 */
class DrawLine extends egret.DisplayObjectContainer {
    private _contrl:DrawController;
    constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGameHandler, this);
    }

    startGameHandler(e:Event):void
    {
         this._contrl = new DrawController();
    }

}