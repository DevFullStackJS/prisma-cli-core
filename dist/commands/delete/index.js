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
var util_1 = require("../../utils/util");
var Delete = /** @class */ (function (_super) {
    __extends(Delete, _super);
    function Delete() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Delete.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var force, envFile, serviceName, stage, cluster, prettyName, before, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        force = this.flags.force;
                        envFile = this.flags['env-file'];
                        return [4 /*yield*/, this.definition.load(this.flags, envFile)];
                    case 1:
                        _a.sent();
                        serviceName = this.definition.service;
                        stage = this.definition.stage;
                        return [4 /*yield*/, this.definition.getCluster()];
                    case 2:
                        cluster = _a.sent();
                        this.env.setActiveCluster(cluster);
                        return [4 /*yield*/, this.client.initClusterClient(cluster, serviceName, stage, this.definition.getWorkspace())];
                    case 3:
                        _a.sent();
                        prettyName = "" + chalk_1.default.bold(this.definition.endpoint);
                        if (!!force) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.askForConfirmation(prettyName)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        before = Date.now();
                        this.out.action.start("" + chalk_1.default.red.bold("Deleting service " + prettyName + " from " + this.definition.cluster));
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.client.deleteProject(serviceName, stage, this.definition.getWorkspace() ||
                                this.env.activeCluster.workspaceSlug)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _a.sent();
                        if (!force) {
                            this.out.error(e_1);
                        }
                        return [3 /*break*/, 9];
                    case 9:
                        this.out.action.stop(util_1.prettyTime(Date.now() - before));
                        return [2 /*return*/];
                }
            });
        });
    };
    Delete.prototype.askForConfirmation = function (projects) {
        return __awaiter(this, void 0, void 0, function () {
            var confirmationQuestion, confirmation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        confirmationQuestion = {
                            name: 'confirmation',
                            type: 'input',
                            message: "Are you sure that you want to delete " + projects + "? y/N",
                            default: 'n',
                        };
                        return [4 /*yield*/, this.out.prompt(confirmationQuestion)];
                    case 1:
                        confirmation = (_a.sent()).confirmation;
                        if (confirmation.toLowerCase().startsWith('n')) {
                            this.out.exit(0);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Delete.topic = 'delete';
    Delete.description = 'Delete an existing service';
    Delete.group = 'db';
    Delete.printVersionSyncWarning = true;
    Delete.flags = (_a = {
            force: prisma_cli_engine_1.flags.boolean({
                char: 'f',
                description: 'Force delete, without confirmation',
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
    return Delete;
}(prisma_cli_engine_1.Command));
exports.default = Delete;
//# sourceMappingURL=index.js.map