var GestureManager = (function () {
    /**
     * Creates a GestureManager instance
     *
     * @param target                Display object linked to this gesture manager instance
     * @param vars                    Config object, using acheGesture.data.GestureVars is recommended
     * @param allowSimultaneous        Allow the gesture-manager behave simultaneously
     */
    function GestureManager(target, vars, allowSimultaneous) {
        if (vars === void 0) { vars = null; }
        if (allowSimultaneous === void 0) { allowSimultaneous = false; }
        /**
         * 用于绑定当前创建的PropGesture与其对应的GesturePlugin（具体的某个手势）
         */
        this._ref = {};
        /**
         * Touch objects
         */
        this._ts = [];
        this._touchEventPool = [];
        this.vars = vars || {};
        this.target = target;
        target.touchEnabled = true;
        this._allowSimultaneous = allowSimultaneous;
        this._initGesture();
    }
    /** @private **/
    GestureManager.prototype._initGesture = function () {
        var p, plugin;
        for (p in this.vars) {
            if ((p in GestureManager._gesturePlugins) && (plugin = new GestureManager._gesturePlugins[p]())._onInitGesture(this.vars[p], this.vars[p]["config"], this)) {
                this._firstG = new PropGesture(plugin, "executeGestureRecognizedCallback", "checkGesture", "updateValue", this._firstG, plugin._continuous, plugin._priority, plugin._numTouchesRequired);
                this._ref[plugin._gestureType] = this._firstG;
            }
        }
        this.linkGestureCondition();
        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouched, this);
        this.target.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouched, this);
        this.target.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouched, this);
        egret.MainContext.instance.stage.addEventListener(egret.Event.LEAVE_STAGE, this.leaveStage, this);
    };
    GestureManager.prototype.leaveStage = function (e) {
        while (this._ts.length > 0) {
            var event = this._ts.splice(0, 1)[0];
            this._touchEventPool.push(event);
        }
    };
    /** @private **/
    GestureManager.prototype.linkGestureCondition = function () {
        var pg = this._firstG;
        while (pg) {
            if (pg.t._callBack.hasOwnProperty("requireGestureToFail") && pg.t._callBack.requireGestureToFail != null) {
                var tg = this._ref[pg.t._callBack.requireGestureToFail.type];
                pg._f = tg;
                tg._o = pg;
                tg.t._requireGestureRecognizerToFail = true;
                pg.t._requireGestureRecognizerToFail = true;
            }
            pg = pg._next;
        }
    };
    /**
     * @private
     *
     * @param name
     * @param value
     */
    GestureManager.prototype.gestureRecognizerStateChange = function (name, value) {
        var pg = this._ref[name];
        var newFirstG;
        if (pg._o != null) {
            if (value) {
                //					console.log("1"+ ">>" + pg.t._gestureName);
                pg.t[pg.p0]();
                if (pg._o.h)
                    pg._o.h = false;
                pg.r = true;
                if (pg.c) {
                    //离散的收拾在识别之后直接执行即可,对于连续的手势，r属性会保持到ended状态
                    //连续的手势executeGestureRecognizedCallback是Began，
                    //						pg.t[pg.p2](ts); //如果是保持识别状态的手势，则调用更新，如果是离散手势，r只是瞬时状态，对于连续的，r会在ended的时候被重置为false
                    newFirstG = this._allowSimultaneous ? null : pg;
                }
                newFirstG = pg;
            }
            else {
                //识别失败的情况下，只有当识别周期到达结束点的时候，才会确认这个手势是否已经识别失败，否则还认为有可能被识别
                //例如点击操作，需要经历TouchBegan, TouchMoved到TouchEnded才完成一次点击操作的判断
                pg.f = true;
                if (pg._o.h) {
                    pg._o.t[pg._o.p0]();
                    //						console.log("2"+ ">>" + pg._o.t._gestureName + "::::" + pg.t._gestureName);
                    if (pg._o.c)
                        pg._o.r = true;
                    pg.f = false; //如果当前已经在hold状态了，则需要重置这个f，其实就是，这次hold手势已经执行了，所以重置f
                    //否则f就需要保留到下次那个先决条件手势的识别之后
                    pg._o.h = false;
                }
            }
        }
        else {
            //				console.log("0"+ ">>" + pg.t._gestureName);
            if (value) {
                pg.t[pg.p0]();
                pg.r = true;
                newFirstG = pg;
            }
            else {
            }
        }
        if (newFirstG != null) {
            pg = this._firstG;
            while (pg) {
                if (pg != newFirstG) {
                    //						pg.t[pg.p3]();
                    pg = pg._next;
                }
                else {
                    if (pg != this._firstG) {
                        pg._prev._next = pg._next;
                        if (pg._next != null)
                            pg._next._prev = pg._prev;
                        this._firstG._prev = pg;
                        pg._next = this._firstG;
                        pg._prev = null;
                        this._firstG = pg;
                    }
                    break;
                }
            }
        }
        //			console.log(_firstG.t._gestureName + ">>>" + _firstG.r);
    };
    GestureManager.prototype.removeTouch = function (e) {
        for (var index = 0; index < this._ts.length; index++) {
            if (this._ts[index].touchPointID == e.touchPointID) {
                var e = this._ts.splice(index, 1)[0];
                this._touchEventPool.push(e);
                break;
            }
        }
    };
    GestureManager.prototype.cloneTouchEvent = function (e) {
        var result = this._touchEventPool.pop();
        if (!result) {
            result = new egret.TouchEvent("");
        }
        for (var key in e) {
            result[key] = e[key];
        }
        return result;
    };
    /** @private **/
    GestureManager.prototype.onTouched = function (e) {
        this.removeTouch(e);
        this._ts.push(this.cloneTouchEvent(e));
        var ts = this._ts;
        if (ts.length == 0) {
            return;
        }
        var t = ts[0];
        var n = ts.length;
        if (!t) {
            return;
        }
        if (t.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.startGlobalX = t.stageX;
            this.startGlobalY = t.stageY;
        }
        var that = this;
        loopGesture();
        if (this.vars.onTouch != null && this.vars.onTouch instanceof Function) {
            this.vars.onTouch(ts);
        }
        if (e.type == egret.TouchEvent.TOUCH_END) {
            this.removeTouch(e);
        }
        function loopGesture() {
            var pg = that._firstG;
            if (pg == null) {
                return;
            }
            if (pg.r && !pg.c) {
                pg.r = false;
                if (!that._allowSimultaneous) {
                    return;
                }
            }
            if (pg.r && !that._allowSimultaneous && pg.c) {
                pg.r = pg.t[pg.p2](ts); ////////////////----------T如果在change时候（update）返回false，说明这个连续手势也停止了
            }
            else {
                //用于确认是否需要更换手势识别链的顺序，将识别出来的，连续的手势链挪到第一个
                var newFirstG;
                while (pg) {
                    if (pg.t["_shouldReceiveTouch"] != null && !pg.t["_shouldReceiveTouch"]()) {
                        //如果当前手势不接收touch对象进行分析直接跳到下一个手势识别
                        pg = pg._next;
                        return;
                    }
                    var r = (pg.n >= n) ? pg.t[pg.p1](ts) : false; //识别与否暂时使用强制相同的触摸点数n
                    if (r) {
                        if (pg._o != null && pg._o.h)
                            pg._o.h = false; //2012-11-26 如果识别出来了，并且有依赖这个手势识别失败作为条件的，则需要将hold状态消除。
                        //虽然这个手势不一定执行（如果还依赖别的手势），但是依赖关机只关心是否能识别，不关心是否执行与否。
                        if (pg._f != null) {
                            if (pg._f.r) {
                                if (!pg._f.c)
                                    pg._f.r = false; //连续的情况会持续执行，一直到end，而里离散的情况需要在这重置
                                pg = pg._next;
                            }
                            else if (pg._f.f) {
                                if (pg._o != null && pg._o.h)
                                    pg._o.h = false;
                                pg._f.f = false;
                                pg.t[pg.p0]();
                                //									console.log("3"+ ">>" + pg.t._gestureName);
                                if (pg._o != null)
                                    pg.r = true;
                                if (pg.c) {
                                    pg.r = true;
                                    pg.t[pg.p2](ts); //如果是保持识别状态的手势，则调用更新，如果是离散手势，r只是瞬时状态，对于连续的，r会在ended的时候被重置为false
                                    newFirstG = that._allowSimultaneous ? null : pg;
                                }
                                pg = that._allowSimultaneous ? pg._next : null;
                            }
                            else {
                                if (!pg.h)
                                    pg.h = true;
                                pg = pg._next;
                            }
                        }
                        else {
                            if (pg._o != null && pg._o.h) {
                                pg._o.h = false;
                            }
                            pg.t[pg.p0]();
                            //								console.log("4" + ">>" + pg.t._gestureName + ">>" + pg.r);
                            if (pg._o != null && pg.c) {
                                pg.r = true;
                            }
                            if (pg.c) {
                                pg.r = true;
                                pg.t[pg.p2](ts); //如果是保持识别状态的手势，则调用更新，如果是离散手势，r只是瞬时状态，对于连续的，r会在ended的时候被重置为false
                                newFirstG = that._allowSimultaneous ? null : pg;
                            }
                            pg = that._allowSimultaneous ? pg._next : null;
                        }
                    }
                    else {
                        if (pg._o != null) {
                            pg.f = pg.t._failed;
                            //								console.log(pg.t._gestureName + ">>" + ts[0].phase + "::" + pg.f);
                            if (pg.f) {
                                if (pg._o.h) {
                                    pg._o.t[pg._o.p0]();
                                    //										console.log("5"+ ">>" + pg._o.t._gestureName);
                                    if (pg._o.c) {
                                        pg._o.t[pg._o.p2](ts);
                                        pg._o.r = true;
                                    }
                                    pg.f = false; //如果当前已经在hold状态了，则需要重置这个f，其实就是，这次hold手势已经执行了，所以重置f
                                    //否则f就需要保留到下次那个先决条件手势的识别之后
                                    pg._o.h = false;
                                    pg = null;
                                }
                                else {
                                    pg = pg._next;
                                }
                            }
                            else {
                                pg = pg._next;
                            }
                        }
                        else {
                            pg = pg._next;
                        }
                    }
                }
                //找到已经被识别出来的手势，并且不允许多手势同事识别，此时需要将识别出来的手势挪到第一位，
                //实际上不需要多判断这个_allowSimultaneous，因为在之前的轮训中一旦发现是_allowSimultaneous，则newFirstG一定是null，只是保险起见
                if (newFirstG != null && !that._allowSimultaneous) {
                    pg = that._firstG;
                    while (pg) {
                        if (pg != newFirstG) {
                            //								pg.t[pg.p3]();
                            pg = pg._next;
                        }
                        else {
                            if (pg != that._firstG) {
                                pg._prev._next = pg._next;
                                if (pg._next != null)
                                    pg._next._prev = pg._prev;
                                that._firstG._prev = pg;
                                pg._next = that._firstG;
                                pg._prev = null;
                                that._firstG = pg;
                            }
                            break;
                        }
                    }
                }
            }
        }
    };
    /**
     * @param target
     * @param vars
     * @param allowSimultaneous
     * @return GestureManager
     */
    GestureManager.add = function (target, vars, allowSimultaneous) {
        if (vars === void 0) { vars = null; }
        if (allowSimultaneous === void 0) { allowSimultaneous = false; }
        var g = new GestureManager(target, vars, allowSimultaneous);
        if (GestureManager._gestures[target.hashCode] == null) {
            GestureManager._gestures[target.hashCode] = [g];
        }
        else {
            var ref = GestureManager._gestures[target.hashCode];
            ref.push(g);
        }
        return g;
    };
    /**
     * Remove all of the gesture-managers linked to this target display object
     * @param target
     */
    GestureManager.removeAll = function (target) {
        var arr = GestureManager._gestures[target.hashCode];
        if (arr && arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].dispose();
            }
            arr.length = 0;
        }
    };
    /**
     * Add some gesutres to this gesture-recognizers' chain after the GestureManger instance created.
     * @param vars
     */
    GestureManager.prototype.add = function (vars) {
        var p, plugin;
        for (p in vars) {
            if ((p in GestureManager._gesturePlugins) && (plugin = new GestureManager._gesturePlugins[p]())._onInitGesture(vars[p], vars[p]["config"], this)) {
                this._firstG = new PropGesture(plugin, "executeGestureRecognizedCallback", "checkGesture", "updateValue", this._firstG, plugin._continuous, plugin._priority, plugin._numTouchesRequired);
                this._ref[plugin._gestureType] = this._firstG;
            }
        }
    };
    /**
     * remove certain type of gesture-recognizer
     * @param gestureType
     */
    GestureManager.prototype.remove = function (gestureType) {
        var result;
        var pg = this._firstG;
        while (pg) {
            if (pg.t._gestureType == gestureType) {
                result = pg;
                if (result._prev != null) {
                    result._prev._next = result._next;
                }
                if (result._next != null) {
                    result._next._prev = result._prev;
                }
                if (result == this._firstG) {
                    this._firstG = result._next;
                }
            }
            pg = pg._next;
        }
        return result != null;
    };
    /**
     * dispose all the gestures managed by this instance
     */
    GestureManager.prototype.dispose = function () {
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouched, this);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouched, this);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouched, this);
        egret.MainContext.instance.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.leaveStage, this);
    };
    Object.defineProperty(GestureManager.prototype, "allowSimultaneous", {
        /**
         * if all gesture behave simultaneously
         */
        get: function () {
            return this._allowSimultaneous;
        },
        set: function (value) {
            this._allowSimultaneous = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * All the available gesture-recognizers
     * @private
     */
    GestureManager._gesturePlugins = {
        "doubleTap": DoubleTapGestureRecognizer,
        "pinch": PinchGestureRecognizer
    };
    /**
     * Use the target as key value to track all the gesture-managers has been created
     */
    GestureManager._gestures = {};
    return GestureManager;
})();
GestureManager.prototype.__class__ = "GestureManager";
