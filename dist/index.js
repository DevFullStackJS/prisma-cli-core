"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deploy_1 = require("./commands/deploy/deploy");
exports.Deploy = deploy_1.default;
var init_1 = require("./commands/init/init");
exports.Init = init_1.default;
// import Auth from './commands/auth/index'
var index_1 = require("./commands/info/index");
exports.Info = index_1.default;
var admin_1 = require("./commands/admin/admin");
exports.Admin = admin_1.default;
var index_2 = require("./commands/playground/index");
exports.Playground = index_2.default;
var index_3 = require("./commands/list/index");
exports.List = index_3.default;
var account_1 = require("./commands/account/account");
exports.Account = account_1.default;
var reset_1 = require("./commands/reset/reset");
exports.Reset = reset_1.default;
var index_4 = require("./commands/import/index");
exports.Import = index_4.default;
var index_5 = require("./commands/export/index");
exports.Export = index_5.default;
var index_6 = require("./commands/console/index");
var token_1 = require("./commands/token/token");
exports.Token = token_1.default;
var login_1 = require("./commands/login/login");
exports.Login = login_1.default;
var logout_1 = require("./commands/logout/logout");
exports.Logout = logout_1.default;
var cluster_token_1 = require("./commands/token/cluster-token");
var index_7 = require("./commands/delete/index");
exports.Delete = index_7.default;
var init_prisma_1 = require("./commands/init-prisma");
exports.InitPrisma = init_prisma_1.default;
var introspect_1 = require("./commands/introspect/introspect");
exports.IntrospectCommand = introspect_1.default;
var seed_1 = require("./commands/seed/seed");
exports.Seed = seed_1.default;
var generate_1 = require("./commands/generate/generate");
exports.Generate = generate_1.default;
exports.groups = [
    {
        key: 'service',
        name: 'Service',
    },
    {
        key: 'data',
        name: 'Data workflows',
    },
    {
        key: 'cloud',
        name: 'Cloud',
    },
];
exports.topics = [
    /* Database service */
    {
        name: 'init',
        description: 'Create files for new services',
        group: 'service',
    },
    {
        name: 'deploy',
        description: 'Deploy local service definition',
        group: 'service',
    },
    {
        name: 'introspect',
        description: 'Introspect database schema(s) of service',
        group: 'service',
    },
    {
        name: 'info',
        description: 'Print service info (endpoints, clusters, ...) ',
        group: 'service',
    },
    {
        name: 'token',
        description: 'Create a new service token',
        group: 'service',
    },
    { name: 'list', description: 'List all deployed services', group: 'service' },
    {
        name: 'delete',
        description: 'Delete an existing service',
        group: 'service',
    },
    /* Data workflows */
    {
        name: 'admin',
        description: 'Opens the admin for current service',
        group: 'data',
    },
    // {
    //   name: 'playground',
    //   description: 'Opens the playground for the current service',
    //   group: 'data',
    // },
    { name: 'seed', description: 'Load seed data', group: 'data' },
    {
        name: 'import',
        description: 'Import command',
        group: 'data',
    },
    {
        name: 'export',
        description: 'Export command',
        group: 'data',
    },
    {
        name: 'generate',
        description: 'Generate the schema or the bindings',
        group: 'data',
    },
    { name: 'reset', description: 'Reset data of a service', group: 'data' },
    /* Cloud */
    {
        name: 'login',
        description: 'Login or signup to Prisma Cloud',
        group: 'cloud',
    },
    {
        name: 'logout',
        description: 'Logout from Prisma Cloud',
        group: 'cloud',
    },
    {
        name: 'console',
        description: 'Opens the console for the current service',
        group: 'cloud',
    },
    {
        name: 'account',
        description: 'Print account information',
        group: 'cloud',
    },
    /* Clusters */
    { name: 'cluster', description: 'Manage local clusters', group: 'cluster' },
    { name: 'init-prisma', description: 'Manage local clusters' },
];
exports.commands = [
    deploy_1.default,
    init_1.default,
    index_1.default,
    admin_1.default,
    index_2.default,
    index_6.default,
    index_3.default,
    seed_1.default,
    index_7.default,
    reset_1.default,
    index_4.default,
    index_5.default,
    token_1.default,
    login_1.default,
    logout_1.default,
    account_1.default,
    cluster_token_1.default,
    introspect_1.default,
    generate_1.default,
];
//# sourceMappingURL=index.js.map