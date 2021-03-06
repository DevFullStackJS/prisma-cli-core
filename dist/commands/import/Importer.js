"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var path = require("path");
var fs = require("fs-extra");
var globby = require("globby");
var Validator_1 = require("./Validator");
var chalk_1 = require("chalk");
var AdmZip = require("adm-zip");
var figures = require("figures");
var defaultState = {
    nodes: 0,
    lists: 0,
    relations: 0,
};
var Importer = /** @class */ (function () {
    function Importer(importPath, types, client, out, config) {
        if (!fs.pathExistsSync(importPath)) {
            throw new Error("Import path " + importPath + " does not exist");
        }
        this.config = config;
        this.importPath = importPath;
        this.isDir = fs.lstatSync(importPath).isDirectory();
        this.importDir = this.isDir ? importPath : path.join(config.cwd, '.import/');
        this.client = client;
        this.types = types;
        this.out = out;
        this.statePath = path.join(this.importDir, 'state.json');
    }
    Importer.prototype.saveState = function (state) {
        fs.writeFileSync(this.statePath, JSON.stringify(state));
    };
    Importer.prototype.getState = function () {
        try {
            var json = fs.readJsonSync(this.statePath);
            return __assign({}, defaultState, json);
        }
        catch (e) {
            //
        }
        return defaultState;
    };
    Importer.prototype.getNumber = function (fileName) {
        var fileRegex = /.*?(\d+)\.json/;
        var match = fileName.match(fileRegex);
        if (match) {
            return parseInt(match[1], 10);
        }
        return 0;
    };
    Importer.prototype.unzip = function () {
        var before = Date.now();
        this.out.action.start('Unzipping');
        var zip = new AdmZip(this.importPath);
        zip.extractAllTo(this.importDir);
        this.out.action.stop(chalk_1.default.cyan(Date.now() - before + "ms"));
    };
    Importer.prototype.checkForErrors = function (result) {
        if (!Array.isArray(result) && result.errors) {
            throw new Error(JSON.stringify(result, null, 2));
        }
    };
    Importer.prototype.upload = function (serviceName, stage, token, workspaceSlug) {
        return __awaiter(this, void 0, void 0, function () {
            var before, files, state, _i, _a, fileName, n, file, json, result, _b, _c, fileName, n, file, json, result, _d, _e, fileName, n, file, json, result, e_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 14, , 15]);
                        if (!this.isDir) {
                            this.unzip();
                        }
                        before = Date.now();
                        this.out.action.start('Validating data');
                        return [4 /*yield*/, this.getFiles()];
                    case 1:
                        files = _f.sent();
                        this.validateFiles(files);
                        this.out.action.stop(chalk_1.default.cyan(Date.now() - before + "ms"));
                        before = Date.now();
                        this.out.log('\nUploading nodes...');
                        state = this.getState();
                        _i = 0, _a = files.nodes;
                        _f.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        fileName = _a[_i];
                        n = this.getNumber(fileName);
                        if (state.nodes >= n) {
                            this.out.log("Skipping file " + fileName + " (already imported)");
                            return [3 /*break*/, 4];
                        }
                        file = fs.readFileSync(fileName, 'utf-8');
                        json = JSON.parse(file);
                        return [4 /*yield*/, this.client.upload(serviceName, stage, file, token, workspaceSlug)];
                    case 3:
                        result = _f.sent();
                        this.checkForErrors(result);
                        if (result.length > 0) {
                            this.out.log(this.out.getStyledJSON(result));
                            this.out.exit(1);
                        }
                        state.nodes = n;
                        this.saveState(state);
                        _f.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.out.log('Uploading nodes done ' + chalk_1.default.cyan(Date.now() - before + "ms"));
                        before = Date.now();
                        this.out.log('\nUploading lists');
                        _b = 0, _c = files.lists;
                        _f.label = 6;
                    case 6:
                        if (!(_b < _c.length)) return [3 /*break*/, 9];
                        fileName = _c[_b];
                        n = this.getNumber(fileName);
                        if (state.lists >= n) {
                            this.out.log("Skipping file " + fileName + " (already imported)");
                            return [3 /*break*/, 8];
                        }
                        file = fs.readFileSync(fileName, 'utf-8');
                        json = JSON.parse(file);
                        return [4 /*yield*/, this.client.upload(serviceName, stage, file, token, workspaceSlug)];
                    case 7:
                        result = _f.sent();
                        this.checkForErrors(result);
                        if (result.length > 0) {
                            this.out.log(this.out.getStyledJSON(result));
                            this.out.exit(1);
                        }
                        state.lists = n;
                        this.saveState(state);
                        _f.label = 8;
                    case 8:
                        _b++;
                        return [3 /*break*/, 6];
                    case 9:
                        this.out.log('Uploading lists done ' + chalk_1.default.cyan(Date.now() - before + "ms"));
                        before = Date.now();
                        this.out.log('\nUploading relations');
                        _d = 0, _e = files.relations;
                        _f.label = 10;
                    case 10:
                        if (!(_d < _e.length)) return [3 /*break*/, 13];
                        fileName = _e[_d];
                        n = this.getNumber(fileName);
                        if (state.relations >= n) {
                            this.out.log("Skipping file " + fileName + " (already imported)");
                            return [3 /*break*/, 12];
                        }
                        file = fs.readFileSync(fileName, 'utf-8');
                        json = JSON.parse(file);
                        return [4 /*yield*/, this.client.upload(serviceName, stage, file, token, workspaceSlug)];
                    case 11:
                        result = _f.sent();
                        this.checkForErrors(result);
                        if (result.length > 0) {
                            this.out.log(this.out.getStyledJSON(result));
                            this.out.exit(1);
                        }
                        state.relations = n;
                        this.saveState(state);
                        _f.label = 12;
                    case 12:
                        _d++;
                        return [3 /*break*/, 10];
                    case 13:
                        this.saveState(defaultState);
                        this.out.log('Uploading relations done ' + chalk_1.default.cyan(Date.now() - before + "ms"));
                        if (!this.isDir) {
                            fs.removeSync(this.importDir);
                        }
                        return [3 /*break*/, 15];
                    case 14:
                        e_1 = _f.sent();
                        this.out.log(chalk_1.default.yellow("Uncaught exception, cleaning up: " + e_1));
                        this.out.action.stop(chalk_1.default.red(figures.cross));
                        if (!this.isDir) {
                            fs.removeSync(this.importDir);
                        }
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    Importer.prototype.validateFiles = function (files) {
        var validator = new Validator_1.Validator(this.types);
        if ((!files.nodes || files.nodes.length === 0) &&
            (!files.lists || files.lists.length === 0) &&
            (!files.relations || files.relations.length === 0)) {
            throw new Error("'Folder 'folder' does not contain any of these folders: 'nodes', 'lists', 'relations'. Read more about data import here: https://bit.ly/prisma-import-ndf'");
        }
        for (var _i = 0, _a = files.nodes; _i < _a.length; _i++) {
            var fileName = _a[_i];
            var file = fs.readFileSync(fileName, 'utf-8');
            var json = JSON.parse(file);
            validator.validateImportData(json);
        }
        for (var _b = 0, _c = files.lists; _b < _c.length; _b++) {
            var fileName = _c[_b];
            var file = fs.readFileSync(fileName, 'utf-8');
            var json = JSON.parse(file);
            validator.validateImportData(json);
        }
        for (var _d = 0, _e = files.relations; _d < _e.length; _d++) {
            var fileName = _e[_d];
            var file = fs.readFileSync(fileName, 'utf-8');
            var json = JSON.parse(file);
            validator.validateImportData(json);
        }
    };
    Importer.prototype.getFiles = function () {
        var _this = this;
        return {
            lists: globby
                .sync('*.json', {
                cwd: path.join(this.importDir, 'lists/'),
            })
                .map(function (p) { return path.join(_this.importDir, 'lists/', p); }),
            nodes: globby
                .sync('*.json', {
                cwd: path.join(this.importDir, 'nodes/'),
            })
                .map(function (p) { return path.join(_this.importDir, 'nodes/', p); }),
            relations: globby
                .sync('*.json', {
                cwd: path.join(this.importDir, 'relations/'),
            })
                .map(function (p) { return path.join(_this.importDir, 'relations/', p); }),
        };
    };
    return Importer;
}());
exports.Importer = Importer;
//# sourceMappingURL=Importer.js.map