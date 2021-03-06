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
var _a;
var prisma_cli_engine_1 = require("prisma-cli-engine");
var chalk_1 = require("chalk");
var satisfiesVersion_1 = require("../../utils/satisfiesVersion");
var util_1 = require("../../utils/util");
var InfoCommand = /** @class */ (function (_super) {
    __extends(InfoCommand, _super);
    function InfoCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InfoCommand.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, json, secret, envFile, serviceName, stage, workspace, cluster, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.flags, json = _a.json, secret = _a.secret;
                        envFile = this.flags['env-file'];
                        return [4 /*yield*/, this.definition.load(this.flags, envFile)];
                    case 1:
                        _d.sent();
                        serviceName = this.definition.service;
                        stage = this.definition.stage;
                        workspace = this.definition.getWorkspace();
                        return [4 /*yield*/, this.definition.getCluster()];
                    case 2:
                        cluster = _d.sent();
                        if (!cluster) {
                            throw new Error("No cluster set. Please set the \"cluster\" property in your prisma.yml");
                        }
                        if (!json) {
                            this.out.log("Service Name: " + chalk_1.default.bold(serviceName));
                        }
                        _c = (_b = this.out).log;
                        return [4 /*yield*/, this.printStage(serviceName, stage, cluster, this.definition.secrets, workspace || undefined, json)];
                    case 3:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    InfoCommand.prototype.printStage = function (name, stage, cluster, secrets, workspace, printJson) {
        if (printJson === void 0) { printJson = false; }
        return __awaiter(this, void 0, void 0, function () {
            var secret, result, version, hasAdmin, adminText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secret = this.flags.secret;
                        if (printJson) {
                            result = {
                                name: name,
                                stage: stage,
                                cluster: cluster.name,
                                workspace: workspace,
                                httpEndpoint: cluster.getApiEndpoint(name, stage, workspace),
                                wsEndpoint: cluster.getWSEndpoint(name, stage, workspace),
                            };
                            if (secret) {
                                result.secret = secrets;
                            }
                            return [2 /*return*/, JSON.stringify(result, null, 2)];
                        }
                        return [4 /*yield*/, cluster.getVersion()];
                    case 1:
                        version = _a.sent();
                        hasAdmin = satisfiesVersion_1.satisfiesVersion(version, '1.29.0');
                        adminText = hasAdmin
                            ? util_1.printAdminLink(cluster.getApiEndpoint(name, stage, workspace))
                            : '';
                        return [2 /*return*/, "\n  " + chalk_1.default.bold(stage) + " (cluster: " + chalk_1.default.bold("`" + cluster.name + "`") + ")\n\n    HTTP:       " + cluster.getApiEndpoint(name, stage, workspace) + "\n    Websocket:  " + cluster.getWSEndpoint(name, stage, workspace) + adminText];
                }
            });
        });
    };
    InfoCommand.topic = 'info';
    InfoCommand.description = 'Display service information (endpoints, cluster, ...)';
    InfoCommand.group = 'general';
    InfoCommand.printVersionSyncWarning = true;
    InfoCommand.flags = (_a = {
            json: prisma_cli_engine_1.flags.boolean({
                char: 'j',
                description: 'Json Output',
            }),
            secret: prisma_cli_engine_1.flags.boolean({
                char: 's',
                description: 'Print secret in json output',
            }),
            current: prisma_cli_engine_1.flags.boolean({
                char: 'c',
                description: 'Deprecated.',
            })
        },
        _a['env-file'] = prisma_cli_engine_1.flags.string({
            description: 'Path to .env file to inject env vars',
            char: 'e',
        }),
        _a['project'] = prisma_cli_engine_1.flags.string({
            description: 'Path to Prisma definition file',
            char: 'p',
        }),
        _a);
    return InfoCommand;
}(prisma_cli_engine_1.Command));
exports.default = InfoCommand;
//# sourceMappingURL=index.js.map