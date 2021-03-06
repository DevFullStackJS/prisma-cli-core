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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// import * as nock from 'nock'
var inquirer_mock_prompt_1 = require("./inquirer-mock-prompt");
var prisma_cli_engine_1 = require("prisma-cli-engine");
var init_1 = require("./init");
var getTmpDir_1 = require("../../test/getTmpDir");
var fs = require("fs-extra");
var path = require("path");
var cuid = require("scuid");
function makeMockConfig(mockInquirer) {
    var home = getTmpDir_1.getTmpDir();
    var cwd = path.join(home, cuid());
    fs.mkdirpSync(cwd);
    return {
        config: new prisma_cli_engine_1.Config({ mock: true, home: home, cwd: cwd, mockInquirer: mockInquirer }),
        home: home,
        cwd: cwd,
    };
}
function getFolderContent(folder) {
    return fs
        .readdirSync(folder)
        .map(function (f) {
        var _a;
        var file = fs.readFileSync(path.join(folder, f), 'utf-8');
        if (f === 'docker-compose.yml') {
            file = normalizeDockerCompose(file);
        }
        return _a = {}, _a[f] = file, _a;
    })
        .reduce(function (acc, curr) { return (__assign({}, acc, curr)); }, {});
}
function testChoices(choices) {
    return __awaiter(this, void 0, void 0, function () {
        var mockInquirer, _a, config, home, cwd, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mockInquirer = inquirer_mock_prompt_1.mocki(choices);
                    _a = makeMockConfig(mockInquirer), config = _a.config, home = _a.home, cwd = _a.cwd;
                    return [4 /*yield*/, init_1.default.mock({ mockConfig: config })];
                case 1:
                    result = _b.sent();
                    expect(getFolderContent(cwd)).toMatchSnapshot();
                    expect(makeOutputDeterministic(result.out.stdout.output)).toMatchSnapshot();
                    expect(makeOutputDeterministic(result.out.stderr.output)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    });
}
function makeOutputDeterministic(output) {
    return output
        .split('\n')
        .filter(function (l) { return !l.includes('Connecting to database'); })
        .join('\n');
}
describe.skip('init', function () {
    test('choose local', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testChoices({
                        choice: 'local',
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('test project', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testChoices({
                        choice: 'Use existing database',
                        dbType: 'postgres',
                        host: 'localhost',
                        port: 5432,
                        database: process.env.TEST_PG_DB,
                        user: process.env.TEST_PG_USER || 'postgres',
                        password: process.env.TEST_PG_PASSWORD,
                        schema: undefined,
                        alreadyData: false,
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
function normalizeDockerCompose(dc) {
    return dc
        .split('\n')
        .filter(function (l) {
        return !l.trim().startsWith('user:') &&
            !l.trim().startsWith('password:') &&
            !l.trim().startsWith('database:') &&
            !l.trim().startsWith('image:');
    })
        .join('\n');
}
exports.normalizeDockerCompose = normalizeDockerCompose;
//# sourceMappingURL=init.test.js.map