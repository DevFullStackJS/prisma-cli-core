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
var opn = require("opn");
var fs = require("fs-extra");
var debug = require('debug')('playground');
var path = require("path");
var os = require("os");
var crypto = require("crypto");
var chalk_1 = require("chalk");
var express = require("express");
var requestProxy = require("express-request-proxy");
var graphql_playground_middleware_express_1 = require("graphql-playground-middleware-express");
var graphql_config_1 = require("graphql-config");
var graphql_config_extension_prisma_1 = require("graphql-config-extension-prisma");
function randomString(len) {
    if (len === void 0) { len = 32; }
    return crypto
        .randomBytes(Math.ceil((len * 3) / 4))
        .toString('base64')
        .slice(0, len)
        .replace(/\+/g, '0')
        .replace(/\//g, '0');
}
var Playground = /** @class */ (function (_super) {
    __extends(Playground, _super);
    function Playground() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startServer = function (_a) {
            var config = _a.config, endpoint = _a.endpoint, _b = _a.port, port = _b === void 0 ? 3000 : _b;
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_c) {
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var app, projects, _a, url, headers, listener;
                            return __generator(this, function (_b) {
                                app = express();
                                projects = config.getProjects();
                                if (projects === undefined) {
                                    _a = config.endpointsExtension.getEndpoint(endpoint), url = _a.url, headers = _a.headers;
                                    app.use('/graphql', requestProxy({
                                        url: url,
                                        headers: headers,
                                    }));
                                    app.use('/playground', graphql_playground_middleware_express_1.default({
                                        endpoint: '/graphql',
                                        config: config.config,
                                    }));
                                }
                                else {
                                    app.use('/playground', graphql_playground_middleware_express_1.default({ config: config.config }));
                                }
                                listener = app.listen(port, function () {
                                    var host = listener.address().address;
                                    if (host === '::') {
                                        host = 'localhost';
                                    }
                                    var link = "http://" + host + ":" + port + "/playground";
                                    console.log('Serving playground at %s', chalk_1.default.blue(link));
                                    resolve(link);
                                });
                                return [2 /*return*/];
                            });
                        }); })];
                });
            });
        };
        return _this;
    }
    Playground.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, web, port, envFile, serverOnly, stage, cluster, localPlaygroundPath, isLocalPlaygroundAvailable, shouldStartServer, shouldOpenBrowser, config, endpoint, link, envPath, url;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.flags, web = _a.web, port = _a.port;
                        // port assumes web. using default value of flags will break this!
                        if (port) {
                            web = true;
                        }
                        // set default value, don't overwrite
                        if (!port) {
                            port = 3000;
                        }
                        envFile = this.flags['env-file'];
                        serverOnly = this.flags['server-only'];
                        return [4 /*yield*/, this.definition.load(this.flags, envFile)];
                    case 1:
                        _b.sent();
                        stage = this.definition.stage;
                        return [4 /*yield*/, this.definition.getCluster()];
                    case 2:
                        cluster = _b.sent();
                        localPlaygroundPath = "/Applications/GraphQL Playground.app/Contents/MacOS/GraphQL Playground";
                        isLocalPlaygroundAvailable = fs.existsSync(localPlaygroundPath);
                        shouldStartServer = serverOnly || web || !isLocalPlaygroundAvailable;
                        shouldOpenBrowser = !serverOnly;
                        return [4 /*yield*/, this.getConfig()];
                    case 3:
                        config = _b.sent();
                        if (!shouldStartServer) return [3 /*break*/, 5];
                        endpoint = this.definition.definition.endpoint ||
                            cluster.getApiEndpoint(this.definition.service, stage, this.definition.getWorkspace() || undefined);
                        return [4 /*yield*/, this.startServer({ config: config, endpoint: endpoint, port: port })];
                    case 4:
                        link = _b.sent();
                        if (shouldOpenBrowser) {
                            opn(link).catch(function () { }); // Prevent `unhandledRejection` error.
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        envPath = path.join(os.tmpdir(), randomString() + ".json");
                        fs.writeFileSync(envPath, JSON.stringify(process.env));
                        url = "graphql-playground://?cwd=" + process.cwd() + "&envPath=" + envPath;
                        opn(url, { wait: false });
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Playground.prototype.getConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, graphql_config_extension_prisma_1.patchEndpointsToConfig(graphql_config_1.getGraphQLConfig(this.config.cwd), this.config.cwd)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, graphql_config_extension_prisma_1.makeConfigFromPath()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Playground.topic = 'playground';
    Playground.description = 'Open service endpoints in GraphQL Playground';
    Playground.group = 'general';
    Playground.flags = (_a = {
            web: prisma_cli_engine_1.flags.boolean({
                char: 'w',
                description: 'Force open web playground',
            }),
            'env-file': prisma_cli_engine_1.flags.string({
                description: 'Path to .env file to inject env vars',
                char: 'e',
            })
        },
        _a['project'] = prisma_cli_engine_1.flags.string({
            description: 'Path to Prisma definition file',
            char: 'p',
        }),
        _a['server-only'] = prisma_cli_engine_1.flags.boolean({
            char: 's',
            description: 'Run only the server',
        }),
        _a.port = prisma_cli_engine_1.flags.number({
            char: 'p',
            description: 'Port to serve the Playground web version on. Assumes --web.',
        }),
        _a);
    return Playground;
}(prisma_cli_engine_1.Command));
exports.default = Playground;
//# sourceMappingURL=index.js.map