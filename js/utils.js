(function(win, doc, ns) {

    "use strict";

    function Point(x, y) {
        var _this = this;

        _init();

        function _init() {
            ns.EventDispatcher.call(_this);
        }

        _this.x = x;
        _this.y = y;
    }

    Point.prototype = new ns.EventDispatcher();
    Point.prototype.constructor = Point;

    Point.prototype.draw = function(ctx) {
        var _this = this,
            size  = 5;

        ctx.save();
            ctx.beginPath();
            ctx.arc(_this.x, _this.y, size, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.moveTo(_this.x, _this.y);
        ctx.restore();

        return _this;
    };

    ns.Point = Point;

})(this, document, App);