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
var fs = require("fs-extra");
var Seeder_1 = require("./Seeder");
var util_1 = require("../../utils/util");
var chalk_1 = require("chalk");
var path = require("path");
var Seed = /** @class */ (function (_super) {
    __extends(Seed, _super);
    function Seed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Seed.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reset, envFile, serviceName, cluster, seed, seeder, seedSource, before;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reset = this.flags.reset;
                        envFile = this.flags['env-file'];
                        if (!(envFile && !fs.pathExistsSync(path.join(this.config.cwd, envFile)))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.out.error("--env-file path '" + envFile + "' does not exist")];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.definition.load(this.flags, envFile)];
                    case 3:
                        _a.sent();
                        serviceName = this.definition.service;
                        return [4 /*yield*/, this.definition.getCluster()];
                    case 4:
                        cluster = _a.sent();
                        this.env.setActiveCluster(cluster);
                        return [4 /*yield*/, this.client.initClusterClient(cluster, serviceName, this.definition.stage, this.definition.getWorkspace())];
                    case 5:
                        _a.sent();
                        seed = this.definition.definition.seed;
                        if (!seed) {
                            throw new Error("In order to seed, you need to provide a \"seed\" property in your prisma.yml");
                        }
                        seeder = new Seeder_1.Seeder(this.definition, this.client, this.out, this.config);
                        seedSource = this.definition.definition.seed.import ||
                            this.definition.definition.seed.run;
                        if (!!seedSource) return [3 /*break*/, 7];
                        // Await on error to wait for it to set the exit code to 1
                        return [4 /*yield*/, this.out.error('Invalid seed property in `prisma.yml`. Please use `import` or `run` under the `seed` property. Follow the docs for more info: http://bit.ly/prisma-seed-optional')];
                    case 6:
                        // Await on error to wait for it to set the exit code to 1
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        this.out.action.start("Seeding based on " + chalk_1.default.bold(seedSource));
                        before = Date.now();
                        return [4 /*yield*/, seeder.seed(serviceName, this.definition.stage, reset, this.definition.getWorkspace())];
                    case 8:
                        _a.sent();
                        this.out.action.stop(util_1.prettyTime(Date.now() - before));
                        return [2 /*return*/];
                }
            });
        });
    };
    Seed.topic = 'seed';
    Seed.description = 'Seed a service with data specified in the prisma.yml';
    Seed.printVersionSyncWarning = true;
    Seed.flags = (_a = {
            reset: prisma_cli_engine_1.flags.boolean({
                char: 'r',
                description: 'Reset the service before seeding',
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
    return Seed;
}(prisma_cli_engine_1.Command));
exports.default = Seed;
//# sourceMappingURL=seed.js.map