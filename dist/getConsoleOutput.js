"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var path = require("path");
function getConsoleOutput(root, verbose, buffer) {
    var TITLE_INDENT = verbose ? '  ' : '    ';
    var CONSOLE_INDENT = TITLE_INDENT + '  ';
    return buffer.reduce(function (output, _a) {
        var type = _a.type, message = _a.message, origin = _a.origin;
        origin = path.relative(root, origin);
        message = message
            .split(/\n/)
            .map(function (line) { return CONSOLE_INDENT + line; })
            .join('\n');
        var typeMessage = 'console.' + type;
        if (type === 'warn') {
            message = chalk_1.default.yellow(message);
            typeMessage = chalk_1.default.yellow(typeMessage);
        }
        else if (type === 'error') {
            message = chalk_1.default.red(message);
            typeMessage = chalk_1.default.red(typeMessage);
        }
        return (output +
            TITLE_INDENT +
            chalk_1.default.dim(typeMessage) +
            ' ' +
            chalk_1.default.dim(origin) +
            '\n' +
            message +
            '\n');
    }, '');
}
exports.default = getConsoleOutput;
//# sourceMappingURL=getConsoleOutput.js.map