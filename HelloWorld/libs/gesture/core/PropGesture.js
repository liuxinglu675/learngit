var PropGesture = (function () {
    function PropGesture(target, property0, property1, property2, next, isContinuous, priority, numTouchesRequired) {
        if (property0 === void 0) { property0 = "executeGestureRecognizedCallback"; }
        if (property1 === void 0) { property1 = "checkGesture"; }
        if (property2 === void 0) { property2 = "updateValue"; }
        if (next === void 0) { next = null; }
        if (isContinuous === void 0) { isContinuous = false; }
        if (priority === void 0) { priority = 0; }
        if (numTouchesRequired === void 0) { numTouchesRequired = 1; }
        /**
         * 手势需要的触摸数量，对应numTouchesRequired
         */
        this.n = 0;
        /**
         * Possible，还有可能被识别
         */
        this.p = true;
        /** Priority **/
        this.pr = 0;
        this.t = target;
        this.c = isContinuous;
        if (next) {
            next._prev = this;
            this._next = next;
        }
        this.p0 = property0;
        this.p1 = property1;
        this.p2 = property2;
        this.n = numTouchesRequired;
    }
    return PropGesture;
})();
PropGesture.prototype.__class__ = "PropGesture";
