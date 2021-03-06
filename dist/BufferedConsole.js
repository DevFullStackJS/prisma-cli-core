"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("console");
var callsites = require("callsites");
var util_1 = require("util");
var BufferedConsole = /** @class */ (function (_super) {
    __extends(BufferedConsole, _super);
    function BufferedConsole() {
        var _this = this;
        var buffer = [];
        _this = _super.call(this, {
            write: function (message) { return BufferedConsole.write(buffer, 'log', message); },
        }) || this;
        _this._buffer = buffer;
        return _this;
    }
    BufferedConsole.write = function (buffer, type, message, level) {
        var call = callsites()[level != null ? level : 2];
        var origin = call.getFileName() + ':' + call.getLineNumber();
        buffer.push({ message: message, origin: origin, type: type });
        return buffer;
    };
    BufferedConsole.prototype.log = function () {
        BufferedConsole.write(this._buffer, 'log', util_1.format.apply(null, arguments));
    };
    BufferedConsole.prototype.info = function () {
        BufferedConsole.write(this._buffer, 'info', util_1.format.apply(null, arguments));
    };
    BufferedConsole.prototype.warn = function () {
        BufferedConsole.write(this._buffer, 'warn', util_1.format.apply(null, arguments));
    };
    BufferedConsole.prototype.error = function () {
        BufferedConsole.write(this._buffer, 'error', util_1.format.apply(null, arguments));
    };
    BufferedConsole.prototype.getBuffer = function () {
        return this._buffer;
    };
    return BufferedConsole;
}(console_1.Console));
exports.default = BufferedConsole;
//# sourceMappingURL=BufferedConsole.js.map