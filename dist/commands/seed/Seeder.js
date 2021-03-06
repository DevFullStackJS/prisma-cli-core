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
var Importer_1 = require("../import/Importer");
var fs = require("fs-extra");
var path = require("path");
var chalk_1 = require("chalk");
var graphql_1 = require("graphql");
var crossSpawn = require("cross-spawn");
var debug = require('debug')('Seeder');
var Seeder = /** @class */ (function () {
    function Seeder(definition, client, out, config) {
        this.definition = definition;
        this.client = client;
        this.out = out;
        this.config = config;
    }
    Seeder.prototype.seed = function (serviceName, stageName, reset, workspaceSlug) {
        if (reset === void 0) { reset = false; }
        return __awaiter(this, void 0, void 0, function () {
            var seed, source, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seed = this.definition.definition.seed;
                        if (!seed) {
                            throw new Error("In order to seed, you need to provide a \"seed\" property in your prisma.yml");
                        }
                        if (seed.import && seed.run) {
                            throw new Error("Please provider either seed.import or seed.run but not both at the same time");
                        }
                        if (!seed.import) return [3 /*break*/, 6];
                        source = path.join(this.config.definitionDir, seed.import);
                        debug(source);
                        if (!source.endsWith('.zip') && !source.endsWith('.graphql')) {
                            throw new Error("Source must end with .zip or .graphql");
                        }
                        if (!fs.pathExistsSync(source)) {
                            throw new Error("Path " + source + " does not exist");
                        }
                        token = this.definition.getToken(serviceName, stageName);
                        if (!reset) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.reset(serviceName, stageName)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!source.endsWith('.zip')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.import(source, serviceName, stageName, token, workspaceSlug)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!source.endsWith('.graphql')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.executeQuery(source, serviceName, stageName, token, workspaceSlug)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!seed.run) return [3 /*break*/, 10];
                        if (!reset) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.reset(serviceName, stageName)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, this.run(seed.run)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Seeder.prototype.getOperations = function (query) {
        var ast = graphql_1.parse(query);
        return ast.definitions
            .filter(function (d) { return d.kind === 'OperationDefinition'; })
            .map(function (d) {
            return graphql_1.print({
                kind: 'Document',
                definitions: [d],
            });
        });
    };
    Seeder.prototype.executeQuery = function (filePath, serviceName, stageName, token, workspaceSlug) {
        return __awaiter(this, void 0, void 0, function () {
            var query, operations, _i, operations_1, operation, e_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fs.pathExistsSync(filePath)) {
                            throw new Error("Can't find seed import file " + filePath);
                        }
                        query = fs.readFileSync(filePath, 'utf-8');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        operations = this.getOperations(query);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        _i = 0, operations_1 = operations;
                        _a.label = 3;
                    case 3:
                        if (!(_i < operations_1.length)) return [3 /*break*/, 6];
                        operation = operations_1[_i];
                        return [4 /*yield*/, this.client.exec(serviceName, stageName, operation, token, workspaceSlug)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        throw new Error("Error while executing operation:\n" + e_1.message);
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_2 = _a.sent();
                        throw new Error("Error while parsing " + filePath + ":\n" + e_2.message);
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Seeder.prototype.reset = function (serviceName, stageName) {
        return __awaiter(this, void 0, void 0, function () {
            var before;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        before = Date.now();
                        this.out.action.start("Resetting " + chalk_1.default.bold(serviceName + "@" + stageName));
                        return [4 /*yield*/, this.client.reset(serviceName, stageName, this.definition.getToken(serviceName, stageName))];
                    case 1:
                        _a.sent();
                        this.out.action.stop(chalk_1.default.cyan(Date.now() - before + "ms"));
                        return [2 /*return*/];
                }
            });
        });
    };
    Seeder.prototype.run = function (cmd) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var args = cmd.split(/\s/g);
            var child = crossSpawn(args[0], args.slice(1), {
                cwd: _this.config.cwd,
            });
            child.stdout.on('data', function (data) {
                _this.out.log(data.toString());
            });
            child.stderr.on('data', function (data) {
                _this.out.log(data.toString());
            });
            child.on('error', function (err) {
                _this.out.error(err);
            });
            child.on('close', function (code) {
                if (code !== 0) {
                    reject(code);
                }
                else {
                    resolve();
                }
            });
        });
    };
    Seeder.prototype.import = function (source, serviceName, stage, token, workspaceSlug) {
        return __awaiter(this, void 0, void 0, function () {
            var typesString, importer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.definition.load({})];
                    case 1:
                        _a.sent();
                        typesString = this.definition.typesString;
                        importer = new Importer_1.Importer(source, typesString, this.client, this.out, this.config);
                        return [4 /*yield*/, importer.upload(serviceName, stage, token, workspaceSlug)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Seeder;
}());
exports.Seeder = Seeder;
//# sourceMappingURL=Seeder.js.map