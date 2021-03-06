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
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var lodash_1 = require("lodash");
var Validator = /** @class */ (function () {
    function Validator(typesString) {
        this.validators = {
            ID: lodash_1.isString,
            String: lodash_1.isString,
            Int: function (value) {
                var x;
                if (isNaN(value)) {
                    return false;
                }
                x = parseFloat(value);
                /* tslint:disable-next-line */
                return (x | 0) === x;
            },
            Float: lodash_1.isNumber,
            DateTime: function (date) {
                return (typeof date === 'string' &&
                    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(date));
            },
            Boolean: lodash_1.isBoolean,
            Json: function (value) {
                return typeof value === 'object';
            },
        };
        this.typesString = typesString;
        this.ast = graphql_1.parse(typesString);
        this.modelTypes = this.collectModelTypes(this.ast);
        this.types = this.astToTypes(this.ast);
        this.enums = this.astToEnums(this.ast);
        this.validators = __assign({}, this.validators, this.makeEnumValidators(this.enums));
    }
    Validator.prototype.validateImportData = function (data) {
        if (!data.values) {
            throw new Error('Import data is missing the "values" property');
        }
        if (!Array.isArray(data.values)) {
            throw new Error("Key \"values\" must be an array");
        }
        if (data.valueType === 'nodes') {
            for (var i = 0, len = data.values.length; i < len; i++) {
                var node = data.values[i];
                this.validateNode(node);
            }
        }
        if (data.valueType === 'relations') {
            for (var i = 0, len = data.values.length; i < len; i++) {
                var node = data.values[i];
                this.validateRelationTuple(node);
            }
        }
        if (data.valueType === 'lists') {
            for (var i = 0, len = data.values.length; i < len; i++) {
                var node = data.values[i];
                this.validateListNode(node);
            }
        }
        return true;
    };
    Validator.prototype.validateNode = function (obj) {
        this.checkTypeName(obj);
        this.checkIdField(obj);
        this.checkRequiredFields(obj, false);
        this.checkUnknownFields(obj, false);
        this.checkType(obj, false);
        return true;
    };
    Validator.prototype.validateListNode = function (obj) {
        this.checkTypeName(obj);
        this.checkIdField(obj);
        this.checkUnknownFields(obj, true);
        this.checkType(obj, true);
        return true;
    };
    Validator.prototype.validateRelationNode = function (node) {
        this.checkTypeName(node);
        this.checkIdField(node);
        return true;
    };
    Validator.prototype.validateRelationTuple = function (tuple) {
        var _this = this;
        if (!Array.isArray(tuple)) {
            throw new Error('Relation tuple must be an array');
        }
        if (tuple.length !== 2) {
            throw new Error("Relation tuple must have 2 nodes");
        }
        for (var i = 0; i < 2; i++) {
            this.validateRelationNode(tuple[i]);
        }
        var hasFieldName = tuple.reduce(function (acc, node) {
            return _this.checkFieldName(node) || acc;
        }, false);
        if (!hasFieldName) {
            throw new Error("Relation tuple " + JSON.stringify(tuple) + " must include a \"fieldName\" property");
        }
        return true;
    };
    Validator.prototype.checkFieldName = function (node) {
        if (!node.fieldName) {
            return false;
        }
        if (!this.types[node._typeName].fields[node.fieldName]) {
            throw new Error("The \"fieldName\" property of node " + JSON.stringify(node) + " points to a non-existing fieldName \"" + node.fieldName + "\"");
        }
        return true;
    };
    Validator.prototype.collectModelTypes = function (ast) {
        return ast.definitions.reduce(function (acc, curr) {
            var _a;
            if (curr.kind !== 'ObjectTypeDefinition') {
                return acc;
            }
            return __assign({}, acc, (_a = {}, _a[curr.name.value] = true, _a));
        }, {});
    };
    Validator.prototype.astToTypes = function (ast) {
        var _this = this;
        return ast.definitions.reduce(function (acc, curr) {
            var _a;
            if (curr.kind !== 'ObjectTypeDefinition') {
                return acc;
            }
            return __assign({}, acc, (_a = {}, _a[curr.name.value] = {
                definition: curr,
                fields: curr.fields.reduce(function (acc2, curr2) {
                    var _a;
                    return __assign({}, acc2, (_a = {}, _a[curr2.name.value] = curr2, _a));
                }, {}),
                allNonRelationScalarFieldNames: _this.getFieldNames(curr, false, false),
                allNonRelationListFieldNames: _this.getFieldNames(curr, false, true),
                requiredNonRelationScalarFieldNames: _this.getFieldNames(curr, true),
                requiredNonRelationListFieldNames: _this.getFieldNames(curr, true, true),
            }, _a));
        }, {});
    };
    Validator.prototype.astToEnums = function (ast) {
        return ast.definitions.reduce(function (acc, curr) {
            var _a;
            if (curr.kind !== 'EnumTypeDefinition') {
                return acc;
            }
            return __assign({}, acc, (_a = {}, _a[curr.name.value] = curr.values.reduce(function (acc2, curr2) {
                return acc2.concat([curr2.name.value]);
            }, []), _a));
        }, {});
    };
    Validator.prototype.makeEnumValidators = function (enums) {
        return Object.keys(enums).reduce(function (acc, enumName) {
            var _a;
            return __assign({}, acc, (_a = {}, _a[enumName] = function (value) { return enums[enumName].includes(value); }, _a));
        }, {});
    };
    Validator.prototype.getFieldNames = function (definition, requiredOnly, listsOnly) {
        var _this = this;
        if (requiredOnly === void 0) { requiredOnly = false; }
        if (listsOnly === void 0) { listsOnly = false; }
        return definition
            .fields.filter(function (field) {
            var nonNull = field.type.kind === 'NonNullType';
            var isRelation = field.directives
                ? field.directives.find(function (d) { return d.name.value === 'relation'; })
                : false;
            if (isRelation) {
                return false;
            }
            var typeName = _this.getDeepType(field).name.value;
            // if there is no validator, it's a relation or enum
            if (_this.modelTypes[typeName]) {
                return false;
            }
            var listBoolean = true;
            var isList = _this.isList(field);
            if ((listsOnly && !isList) || (!listsOnly && isList)) {
                listBoolean = false;
            }
            return listBoolean && (!requiredOnly || nonNull);
        })
            .map(function (f) { return f.name.value; });
    };
    Validator.prototype.resolveFieldName = function (typeName, fieldName) {
        if (this.mapping &&
            this.mapping[typeName] &&
            this.mapping[typeName][fieldName]) {
            return this.mapping[typeName][fieldName];
        }
        return fieldName;
    };
    Validator.prototype.checkTypeName = function (obj) {
        if (!obj._typeName) {
            throw new Error("Object " + JSON.stringify(obj) + " needs a _typeName property");
        }
        if (!this.types[obj._typeName]) {
            throw new Error("Type " + obj._typeName + " does not exist");
        }
    };
    Validator.prototype.checkIdField = function (obj) {
        if (!obj.id) {
            throw new Error("Object " + JSON.stringify(obj) + " needs an id property");
        }
        if (typeof obj.id !== 'string') {
            throw new Error("The \"id\" of object " + JSON.stringify(obj) + " needs to be a string");
        }
    };
    Validator.prototype.checkRequiredFields = function (obj, listsOnly) {
        var typeName = obj._typeName;
        var _a = this.types[typeName], requiredNonRelationListFieldNames = _a.requiredNonRelationListFieldNames, requiredNonRelationScalarFieldNames = _a.requiredNonRelationScalarFieldNames;
        var fieldNames = listsOnly
            ? requiredNonRelationListFieldNames
            : requiredNonRelationScalarFieldNames;
        var missingFieldNames = lodash_1.difference(fieldNames, Object.keys(obj));
        if (missingFieldNames.length > 0) {
            throw new Error("Object " + JSON.stringify(obj) + " lacks the following properties: " + missingFieldNames.join(', '));
        }
    };
    Validator.prototype.checkUnknownFields = function (obj, includeLists) {
        var typeName = obj._typeName;
        var _a = this.types[typeName], allNonRelationScalarFieldNames = _a.allNonRelationScalarFieldNames, allNonRelationListFieldNames = _a.allNonRelationListFieldNames;
        var fieldNames = includeLists
            ? allNonRelationListFieldNames
            : allNonRelationScalarFieldNames;
        var knownKeys = ['_typeName', 'id', 'createdAt', 'updatedAt'].concat(fieldNames);
        var unknownKeys = lodash_1.difference(Object.keys(obj), knownKeys);
        if (unknownKeys.length > 0) {
            throw new Error("Object " + JSON.stringify(obj) + " has the following unknown properties: " + unknownKeys.join(', '));
        }
    };
    Validator.prototype.checkType = function (obj, listsOnly) {
        var _this = this;
        var typeName = obj._typeName;
        var _a = this.types[typeName], definition = _a.definition, fields = _a.fields;
        var fieldNames = Object.keys(obj).filter(function (f) { return f !== '_typeName'; });
        fieldNames.forEach(function (fieldName) {
            var value = obj[fieldName];
            if (!['createdAt', 'updatedAt', 'id'].includes(fieldName)) {
                var field = fields[fieldName];
                if (!field) {
                    throw new Error("Could not find field " + fieldName);
                }
                _this.validateValue(value, field, listsOnly);
            }
        });
    };
    Validator.prototype.validateValue = function (value, field, listsOnly) {
        var _this = this;
        var isList = this.isList(field);
        if (isList && !listsOnly) {
            throw new Error("List value " + value + " mustn't be provided in a \"nodes\" definition");
        }
        if (!isList && listsOnly && field.name.value !== 'id') {
            throw new Error("Single scalar value " + JSON.stringify(value) + " mustn't be provided in a \"relations\" definition");
        }
        if (isList) {
            if (!Array.isArray(value)) {
                throw new Error("Error for value " + value + ": It has to be a list.");
            }
            value.forEach(function (v) { return _this.validateScalarValue(v, field); });
        }
        else {
            this.validateScalarValue(value, field);
        }
    };
    Validator.prototype.validateScalarValue = function (value, field) {
        var type = this.getDeepType(field);
        var typeName = type.name.value;
        var validator = this.validators[typeName];
        if (!validator) {
            throw new Error("Error for value " + JSON.stringify(value) + ". Field type " + typeName + " has no validator defined");
        }
        var valid = validator(value);
        if (!valid) {
            throw new Error("Value " + JSON.stringify(value) + " for field " + field.name.value + " is not a valid " + typeName);
        }
    };
    Validator.prototype.getDeepType = function (field) {
        var pointer = field.type;
        while (pointer.type) {
            pointer = pointer.type;
        }
        return pointer;
    };
    Validator.prototype.isList = function (field) {
        if (!field) {
            return false;
        }
        var pointer = field.type;
        while (pointer.type) {
            if (pointer.kind === 'ListType') {
                return true;
            }
            pointer = pointer.type;
        }
        return false;
    };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map