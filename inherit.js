"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.x = void 0;

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var x = 1;
exports.x = x;

var b = function b() {
    _classCallCheck(this, b);

    this.y = 2;
};

var a =
    /*#__PURE__*/
    function (_b) {
        _inherits(a, _b);

        function a() {
            var _this;

            _classCallCheck(this, a);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(a).call(this));
            _this.x = 1;
            return _this;
        }

        return a;
    }(b);

function inherit(Father, Son) {
    var proto = Object.create(Father.prototype);
    proto.constructor = Son;
    Son.prototype = proto;
    Son.__proto__ = Father;
}

var b = function b() {
    this.y = 2;
};

var a = function(_b){
    inherit(a,_b);
    function a(){
        var that;
        that = _b.apply(this) || this;
        that.x = 1;
    
    }
    return a;
}(b)