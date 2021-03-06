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
var prisma_cli_engine_1 = require("prisma-cli-engine");
var debug = require('debug')('command');
var chalk_1 = require("chalk");
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    List.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var projects, _loop_1, this_1, _i, _a, cluster, gotCloud, services, mappedServices, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        projects = [];
                        _loop_1 = function (cluster) {
                            var clusterProjects, mappedClusterProjects, e_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 3, , 4]);
                                        return [4 /*yield*/, this_1.client.initClusterClient(cluster, this_1.definition.getWorkspace() || '*', '*', '*')];
                                    case 1:
                                        _a.sent();
                                        this_1.env.setActiveCluster(cluster);
                                        debug('listing projects');
                                        return [4 /*yield*/, this_1.client.listProjects()];
                                    case 2:
                                        clusterProjects = _a.sent();
                                        mappedClusterProjects = clusterProjects.map(function (p) { return (__assign({}, p, { cluster: cluster.name })); });
                                        projects = projects.concat(mappedClusterProjects);
                                        return [3 /*break*/, 4];
                                    case 3:
                                        e_2 = _a.sent();
                                        debug(e_2);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = this.env.clusters.filter(function (c) { return c.local; });
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        cluster = _a[_i];
                        return [5 /*yield**/, _loop_1(cluster)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        gotCloud = false;
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 8, , 9]);
                        if (!this.env.cloudSessionKey) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.client.getCloudServices()];
                    case 6:
                        services = _b.sent();
                        mappedServices = services
                            .filter(function (s) { return s.cluster; })
                            .map(function (s) { return ({
                            name: s.name,
                            stage: s.stage,
                            cluster: s.cluster.name,
                        }); });
                        projects = projects.concat(mappedServices);
                        gotCloud = true;
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_1 = _b.sent();
                        return [3 /*break*/, 9];
                    case 9:
                        this.printProjects(projects, gotCloud);
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.printProjects = function (projects, gotCloud) {
        if (projects.length === 0) {
            this.out.log('No deployed service found');
        }
        else {
            var mapped = projects.map(function (p) { return ({
                'Service Name': p.name,
                Stage: p.stage,
                Server: p.cluster,
            }); });
            this.out.table(mapped);
        }
        if (!gotCloud) {
            this.out.log('');
            this.out.warn("This does not include your services deployed in the cloud.\nIn order to see them, please run " + chalk_1.default.bold.green('prisma login'));
        }
    };
    List.topic = 'list';
    List.description = 'List all deployed services';
    List.group = 'general';
    List.aliases = ['ls'];
    return List;
}(prisma_cli_engine_1.Command));
exports.default = List;
//# sourceMappingURL=index.js.map