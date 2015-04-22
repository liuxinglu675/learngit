var GestureRecognizerPlugin = (function () {
    function GestureRecognizerPlugin(name, priority, requireGestureRecognizerToFail, continuous, numTouchesRequired) {
        if (name === void 0) { name = ""; }
        if (priority === void 0) { priority = 0; }
        if (requireGestureRecognizerToFail === void 0) { requireGestureRecognizerToFail = false; }
        if (continuous === void 0) { continuous = false; }
        if (numTouchesRequired === void 0) { numTouchesRequired = 1; }
        /**
         * @private
         * 如果_failed为true，说明这次识别确实已经失败，而不是介于成功或者失败中的不可知。
         * 例如对于长按来说，在短于阈值抬起手指，则确认识别失败，此时_failed是true，在下一次check value的时候这个值会被重置
         */
        this._failed = false;
        this._priority = 0;
        this._numTouchesRequired = 1;
        this._continuous = false;
        this._possible = true;
        this._gestureType = name;
        this._continuous = continuous;
        this._requireGestureRecognizerToFail = requireGestureRecognizerToFail;
        this._priority = priority || 0;
        this._numTouchesRequired = numTouchesRequired;
    }
    /**
     * Inject custom gesture-recognizers which extend this class.
     * @param gestures
     */
    GestureRecognizerPlugin.activate = function (gestures) {
        var i = gestures.length;
        while (--i > -1) {
            GestureManager._gesturePlugins[(new (gestures[i])())._gestureName] = gestures[i];
        }
    };
    GestureRecognizerPlugin.prototype._onInitGesture = function (callback, config, g) {
        this._callBack = callback;
        this._config = config;
        this._g = g;
        if (this._config != null && this._config["shouldReceiveTouch"] != null)
            this._shouldReceiveTouch = this._config["shouldReceiveTouch"];
        this._result = new GestureEvent(GestureEvent.ACHE_GESTURE, this._g);
        return true;
    };
    /** @private **/
    GestureRecognizerPlugin.prototype.executeGestureRecognizedCallback = function () {
        if (this._callBack.recognized) {
            this._result.state = GestureState.RECOGNIZED;
            this._callBack.recognized(this._result);
        }
    };
    /** @private **/
    GestureRecognizerPlugin.prototype.checkGesture = function (ts) {
        return false;
    };
    /** @private **/
    GestureRecognizerPlugin.prototype.updateValue = function (ts) {
        //return true means this continuous gesture has began to effect, while return false means the gestures has stopped.
        return true;
    };
    /** @private **/
    GestureRecognizerPlugin.prototype.gesturePossible = function (value) {
        this._possible = value;
        if (this._callBack.possible) {
            this._result.state = GestureState.POSSIBLE;
            this._result.possible = value;
            this._callBack.possible(this._result);
        }
    };
    /** @private **/
    GestureRecognizerPlugin.prototype.gestureBegan = function () {
        if (this._callBack.began) {
            this._result.state = GestureState.BEGAN;
            this._callBack.began(this._result);
        }
    };
    /** @private **/
    GestureRecognizerPlugin.prototype.gestureEnded = function () {
        if (this._callBack.ended) {
            this._result.state = GestureState.ENDED;
            this._callBack.ended(this._result);
        }
    };
    return GestureRecognizerPlugin;
})();
GestureRecognizerPlugin.prototype.__class__ = "GestureRecognizerPlugin";
