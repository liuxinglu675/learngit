var GestureState = (function () {
    function GestureState() {
    }
    GestureState.POSSIBLE = "possible";
    GestureState.RECOGNIZED = "recognized";
    GestureState.FAILED = "failed";
    GestureState.BEGAN = "began";
    GestureState.CHANGED = "changed";
    GestureState.ENDED = "ended";
    GestureState.CANCELLED = "cancelled";
    return GestureState;
})();
GestureState.prototype.__class__ = "GestureState";
