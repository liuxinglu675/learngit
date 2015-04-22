var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GestureEvent = (function (_super) {
    __extends(GestureEvent, _super);
    /**
     * @param type        Event type, use AcheGestureEvent.ACHE_GESTURE
     * @param gm        GestureManager instance that related to this object
     * @param state        What state of the gesture when this happen, see ache.Gesture.utils.GestureState
     */
    function GestureEvent(type, gm, state) {
        if (state === void 0) { state = ""; }
        this.gm = gm;
        this.state = state;
        _super.call(this, type, false, null);
    }
    GestureEvent.ACHE_GESTURE = "acheGesture";
    return GestureEvent;
})(egret.Event);
GestureEvent.prototype.__class__ = "GestureEvent";
