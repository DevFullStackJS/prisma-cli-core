"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var chalk_1 = require("chalk");
var lodash_1 = require("lodash");
var archiver = require("archiver");
var debug = require('debug')('Exporter');
var Exporter = /** @class */ (function () {
    function Exporter(exportPath, client, out, config) {
        this.client = client;
        this.exportPath = exportPath;
        this.config = config;
        this.exportDir = path.join(config.cwd, '.export');
        this.out = out;
    }
    Exporter.prototype.download = function (serviceName, stage, token, workspaceSlug) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.makeDirs();
                        return [4 /*yield*/, this.downloadFiles('nodes', serviceName, stage, token, workspaceSlug)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.downloadFiles('lists', serviceName, stage, token, workspaceSlug)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.downloadFiles('relations', serviceName, stage, token, workspaceSlug)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.zipIt()];
                    case 4:
                        _a.sent();
                        fs.removeSync(this.exportDir);
                        return [2 /*return*/];
                }
            });
        });
    };
    Exporter.prototype.zipIt = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.out.action.start("Zipping export");
            var before = Date.now();
            var archive = archiver('zip');
            archive.directory(_this.exportDir, false);
            var output = fs.createWriteStream(_this.exportPath);
            archive.pipe(output);
            output.on('close', function () {
                console.log(archive.pointer() + ' total bytes');
                _this.out.action.stop(chalk_1.default.cyan(Date.now() - before + "ms"));
                resolve();
            });
            archive.finalize();
        });
    };
    Exporter.prototype.makeDirs = function () {
        fs.mkdirpSync(path.join(this.exportDir, 'nodes/'));
        fs.mkdirpSync(path.join(this.exportDir, 'lists/'));
        fs.mkdirpSync(path.join(this.exportDir, 'relations/'));
    };
    Exporter.prototype.downloadFiles = function (fileType, serviceName, stage, token, workspaceSlug) {
        return __awaiter(this, void 0, void 0, function () {
            var before, cursor, cursorSum, leadingZero, count, filesDir, data, jsonString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        before = Date.now();
                        this.out.action.start("Downloading " + fileType);
                        cursor = {
                            table: 0,
                            row: 0,
                            field: 0,
                            array: 0,
                        };
                        cursorSum = function (c) {
                            return Object.keys(c).reduce(function (acc, curr) { return acc + c[curr]; }, 0);
                        };
                        leadingZero = function (n, zeroes) {
                            if (zeroes === void 0) { zeroes = 6; }
                            return lodash_1.repeat('0', Math.max(zeroes - String(n).length, 0)) + n;
                        };
                        count = 1;
                        filesDir = path.join(this.exportDir, fileType + "/");
                        _a.label = 1;
                    case 1:
                        if (!(cursorSum(cursor) >= 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.client.download(serviceName, stage, JSON.stringify({
                                fileType: fileType,
                                cursor: cursor,
                            }), token, workspaceSlug)];
                    case 2:
                        data = _a.sent();
                        debug(data);
                        if (data.errors) {
                            throw new Error(data.errors);
                        }
                        jsonString = JSON.stringify({
                            valueType: fileType,
                            values: data.out.jsonElements,
                        });
                        fs.writeFileSync(path.join(filesDir, leadingZero(count) + ".json"), jsonString);
                        cursor = data.cursor;
                        count++;
                        return [3 /*break*/, 1];
                    case 3:
                        this.out.action.stop(chalk_1.default.cyan(Date.now() - before + "ms"));
                        return [2 /*return*/];
                }
            });
        });
    };
    return Exporter;
}());
exports.Exporter = Exporter;
//# sourceMappingURL=Exporter.js.map