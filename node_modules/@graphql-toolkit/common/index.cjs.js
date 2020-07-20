'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

function _interopNamespace(e) {
    if (e && e.__esModule) { return e; } else {
        var n = {};
        if (e) {
            Object.keys(e).forEach(function (k) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            });
        }
        n['default'] = e;
        return n;
    }
}

const graphql = require('graphql');
const graphqlTools = require('graphql-tools');
const AggregateError = _interopDefault(require('aggregate-error'));
const lodash = require('lodash');
const camelCase = require('camel-case');

const asArray = (fns) => (Array.isArray(fns) ? fns : fns ? [fns] : []);
function chainFunctions(funcs) {
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
function isEqual(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        for (var index = 0; index < a.length; index++) {
            if (a[index] !== b[index]) {
                return false;
            }
        }
        return true;
    }
    return a === b || (!a && !b);
}
function isNotEqual(a, b) {
    return !isEqual(a, b);
}
function isDocumentString(str) {
    // XXX: is-valid-path or is-glob treat SDL as a valid path
    // (`scalar Date` for example)
    // this why checking the extension is fast enough
    // and prevent from parsing the string in order to find out
    // if the string is a SDL
    if (/\.[a-z0-9]+$/i.test(str)) {
        return false;
    }
    try {
        graphql.parse(str);
        return true;
    }
    catch (e) { }
    return false;
}
const invalidPathRegex = /[‘“!$%&^<=>`]/;
function isValidPath(str) {
    return typeof str === 'string' && !invalidPathRegex.test(str);
}
async function resolveBuiltinModule(moduleName, option) {
    if (typeof option === 'object') {
        return option;
    }
    try {
        if (typeof option === 'string') {
            return await new Promise(function (resolve) { resolve(_interopNamespace(require(option))); });
        }
        return await new Promise(function (resolve) { resolve(_interopNamespace(require(moduleName))); });
    }
    catch (e) {
        // tslint:disable-next-line: no-console
        console.warn(`
      ${option || moduleName} module couldn't be found for built-in ${moduleName}.
      Please provide a working module in your loader options!
    `);
        return null;
    }
}
function resolveBuiltinModuleSync(moduleName, option) {
    if (typeof option === 'object') {
        return option;
    }
    try {
        if (typeof option === 'string') {
            return require(option);
        }
        return require(moduleName);
    }
    catch (e) {
        // tslint:disable-next-line: no-console
        console.warn(`
      ${option || moduleName} module couldn't be found for built-in ${moduleName}.
      Please provide a working module in your loader options!
    `);
        return null;
    }
}
function compareStrings(a, b) {
    if (a.toString() < b.toString()) {
        return -1;
    }
    if (a.toString() > b.toString()) {
        return 1;
    }
    return 0;
}
function nodeToString(a) {
    if ('alias' in a) {
        return a.alias.value;
    }
    if ('name' in a) {
        return a.name.value;
    }
    return a.kind;
}
function compareNodes(a, b, customFn) {
    const aStr = nodeToString(a);
    const bStr = nodeToString(b);
    if (typeof customFn === 'function') {
        return customFn(aStr, bStr);
    }
    return compareStrings(aStr, bStr);
}

function debugLog(...args) {
    if (process && process.env && process.env.DEBUG && !process.env.GQL_TOOLKIT_NODEBUG) {
        // tslint:disable-next-line: no-console
        console.log(...args);
    }
}

function extractFieldResolversFromObjectType(objectType, options) {
    const fieldResolvers = {};
    const fieldMap = objectType.getFields();
    let selectedFieldNames;
    if (options && options.selectedTypeDefs) {
        const invalidSchema = graphql.buildASTSchema(options.selectedTypeDefs);
        const typeMap = invalidSchema.getTypeMap();
        if (!(objectType.name in typeMap)) {
            return {};
        }
        const selectedObjectType = typeMap[objectType.name];
        selectedFieldNames = Object.keys(selectedObjectType.getFields());
    }
    for (const fieldName in fieldMap) {
        if (selectedFieldNames && !selectedFieldNames.includes(fieldName)) {
            continue;
        }
        const fieldDefinition = fieldMap[fieldName];
        fieldResolvers[fieldName] = {
            subscribe: fieldDefinition.subscribe,
            resolve: fieldDefinition.resolve,
        };
    }
    if ('resolveType' in objectType) {
        fieldResolvers['__resolveType'] = objectType.resolveType;
    }
    if ('isTypeOf' in objectType) {
        fieldResolvers['__isTypeOf'] = objectType.isTypeOf;
    }
    return fieldResolvers;
}

function extractResolversFromSchema(schema, options) {
    let selectedTypeNames;
    const resolvers = {};
    const typeMap = schema.getTypeMap();
    if (options && options.selectedTypeDefs) {
        const invalidSchema = graphql.buildASTSchema(options.selectedTypeDefs);
        selectedTypeNames = Object.keys(invalidSchema.getTypeMap());
    }
    for (const typeName in typeMap) {
        if (!typeName.startsWith('__')) {
            const typeDef = typeMap[typeName];
            if (selectedTypeNames && !selectedTypeNames.includes(typeName)) {
                continue;
            }
            if (graphql.isScalarType(typeDef)) {
                resolvers[typeName] = typeDef;
            }
            else if (graphql.isObjectType(typeDef) || graphql.isInterfaceType(typeDef)) {
                resolvers[typeName] = extractFieldResolversFromObjectType(typeDef, {
                    selectedTypeDefs: options && options.selectedTypeDefs,
                });
            }
            else if (graphql.isEnumType(typeDef)) {
                const enumValues = typeDef.getValues();
                resolvers[typeName] = {};
                for (const { name, value } of enumValues) {
                    resolvers[typeName][name] = value;
                }
            }
            else if (graphql.isUnionType(typeDef)) {
                resolvers[typeName] = {
                    __resolveType: typeDef.resolveType,
                };
            }
        }
    }
    return resolvers;
}

const fixWindowsPath = (path) => path.replace(/\\/g, '/');

const flattenArray = (arr) => arr.reduce((acc, next) => acc.concat(Array.isArray(next) ? flattenArray(next) : next), []);

function getDirectives(schema, node) {
    const schemaDirectives = schema && schema.getDirectives ? schema.getDirectives() : [];
    const astNode = node && node['astNode'];
    let result = {};
    if (astNode) {
        schemaDirectives.forEach((directive) => {
            const directiveValue = graphql.getDirectiveValues(directive, astNode);
            if (directiveValue !== undefined) {
                result[directive.name] = directiveValue || {};
            }
        });
    }
    return result;
}

function isObjectTypeDefinitionOrExtension(obj) {
    return obj && (obj.kind === 'ObjectTypeDefinition' || obj.kind === 'ObjectTypeExtension');
}
function parseDirectiveValue(value) {
    switch (value.kind) {
        case graphql.Kind.INT:
            return parseInt(value.value);
        case graphql.Kind.FLOAT:
            return parseFloat(value.value);
        case graphql.Kind.BOOLEAN:
            return Boolean(value.value);
        case graphql.Kind.STRING:
        case graphql.Kind.ENUM:
            return value.value;
        case graphql.Kind.LIST:
            return value.values.map(v => parseDirectiveValue(v));
        case graphql.Kind.OBJECT:
            return value.fields.reduce((prev, v) => ({ ...prev, [v.name.value]: parseDirectiveValue(v.value) }), {});
        case graphql.Kind.NULL:
            return null;
        default:
            return null;
    }
}
function getFieldsWithDirectives(documentNode) {
    const result = {};
    const allTypes = documentNode.definitions.filter(isObjectTypeDefinitionOrExtension);
    for (const type of allTypes) {
        const typeName = type.name.value;
        for (const field of type.fields) {
            if (field.directives && field.directives.length > 0) {
                const fieldName = field.name.value;
                const key = `${typeName}.${fieldName}`;
                const directives = field.directives.map(d => ({
                    name: d.name.value,
                    args: (d.arguments || []).reduce((prev, arg) => ({ ...prev, [arg.name.value]: parseDirectiveValue(arg.value) }), {}),
                }));
                result[key] = directives;
            }
        }
    }
    return result;
}

function getImplementingTypes(interfaceName, schema) {
    const allTypesMap = schema.getTypeMap();
    const result = [];
    for (const graphqlTypeName in allTypesMap) {
        const graphqlType = allTypesMap[graphqlTypeName];
        if (graphql.isObjectType(graphqlType)) {
            const allInterfaces = graphqlType.getInterfaces();
            if (allInterfaces.find((int) => int.name === interfaceName)) {
                result.push(graphqlType.name);
            }
        }
    }
    return result;
}

function getSchemaDirectiveFromDirectiveResolver(directiveResolver) {
    return class extends graphqlTools.SchemaDirectiveVisitor {
        visitFieldDefinition(field) {
            const resolver = directiveResolver;
            const originalResolver = field.resolve || graphql.defaultFieldResolver;
            const directiveArgs = this.args;
            field.resolve = (...args) => {
                const [source /* original args */, , context, info] = args;
                return resolver(async () => originalResolver.apply(field, args), source, directiveArgs, context, info);
            };
        }
    };
}

function createSchemaDefinition(def, config) {
    const schemaRoot = {};
    if (def.query) {
        schemaRoot.query = def.query.toString();
    }
    if (def.mutation) {
        schemaRoot.mutation = def.mutation.toString();
    }
    if (def.subscription) {
        schemaRoot.subscription = def.subscription.toString();
    }
    const fields = Object.keys(schemaRoot)
        .map(rootType => (schemaRoot[rootType] ? `${rootType}: ${schemaRoot[rootType]}` : null))
        .filter(a => a);
    if (fields.length) {
        return `schema { ${fields.join('\n')} }`;
    }
    if (config && config.force) {
        return ` schema { query: Query } `;
    }
    return undefined;
}

function printSchemaWithDirectives(schema, _options = {}) {
    var _a;
    const typesMap = schema.getTypeMap();
    const result = [
        createSchemaDefinition({
            query: schema.getQueryType(),
            mutation: schema.getMutationType(),
            subscription: schema.getSubscriptionType(),
        }),
    ];
    for (const typeName in typesMap) {
        const type = typesMap[typeName];
        const isPredefinedScalar = graphql.isScalarType(type) && graphql.isSpecifiedScalarType(type);
        const isIntrospection = graphql.isIntrospectionType(type);
        if (isPredefinedScalar || isIntrospection) {
            continue;
        }
        // KAMIL: we might want to turn on descriptions in future
        result.push(graphql.print((_a = correctType(typeName, typesMap)) === null || _a === void 0 ? void 0 : _a.astNode));
    }
    const directives = schema.getDirectives();
    for (const directive of directives) {
        if (directive.astNode) {
            result.push(graphql.print(directive.astNode));
        }
    }
    return result.join('\n');
}
function extendDefinition(type) {
    switch (type.astNode.kind) {
        case graphql.Kind.OBJECT_TYPE_DEFINITION:
            return {
                ...type.astNode,
                fields: type.astNode.fields.concat(type.extensionASTNodes.reduce((fields, node) => fields.concat(node.fields), [])),
            };
        case graphql.Kind.INPUT_OBJECT_TYPE_DEFINITION:
            return {
                ...type.astNode,
                fields: type.astNode.fields.concat(type.extensionASTNodes.reduce((fields, node) => fields.concat(node.fields), [])),
            };
        default:
            return type.astNode;
    }
}
function correctType(typeName, typesMap) {
    const type = typesMap[typeName];
    type.name = typeName.toString();
    if (type.astNode && type.extensionASTNodes) {
        type.astNode = type.extensionASTNodes ? extendDefinition(type) : type.astNode;
    }
    const doc = graphql.parse(graphql.printType(type));
    const fixedAstNode = doc.definitions[0];
    const originalAstNode = type === null || type === void 0 ? void 0 : type.astNode;
    if (originalAstNode) {
        fixedAstNode.directives = originalAstNode === null || originalAstNode === void 0 ? void 0 : originalAstNode.directives;
        if ('fields' in fixedAstNode && 'fields' in originalAstNode) {
            for (const fieldDefinitionNode of fixedAstNode.fields) {
                const originalFieldDefinitionNode = originalAstNode.fields.find((field) => field.name.value === fieldDefinitionNode.name.value);
                fieldDefinitionNode.directives =
                    originalFieldDefinitionNode === null || originalFieldDefinitionNode === void 0 ? void 0 : originalFieldDefinitionNode.directives;
            }
        }
    }
    type.astNode = fixedAstNode;
    return type;
}

const DEFAULT_EFFECTIVE_RULES = createDefaultRules();
async function validateGraphQlDocuments(schema, documentFiles, effectiveRules = DEFAULT_EFFECTIVE_RULES) {
    const allFragments = [];
    documentFiles.forEach((documentFile) => {
        if (documentFile.document) {
            for (const definitionNode of documentFile.document.definitions) {
                if (definitionNode.kind === graphql.Kind.FRAGMENT_DEFINITION) {
                    allFragments.push(definitionNode);
                }
            }
        }
    });
    const allErrors = [];
    await Promise.all(documentFiles.map(async (documentFile) => {
        const documentToValidate = {
            kind: graphql.Kind.DOCUMENT,
            definitions: [...allFragments, ...documentFile.document.definitions].filter((definition, index, list) => {
                if (definition.kind === graphql.Kind.FRAGMENT_DEFINITION) {
                    const firstIndex = list.findIndex((def) => def.kind === graphql.Kind.FRAGMENT_DEFINITION && def.name.value === definition.name.value);
                    const isDuplicated = firstIndex !== index;
                    if (isDuplicated) {
                        return false;
                    }
                }
                return true;
            }),
        };
        const errors = graphql.validate(schema, documentToValidate, effectiveRules);
        if (errors.length > 0) {
            allErrors.push({
                filePath: documentFile.location,
                errors,
            });
        }
    }));
    return allErrors;
}
function checkValidationErrors(loadDocumentErrors) {
    if (loadDocumentErrors.length > 0) {
        const errors = [];
        for (const loadDocumentError of loadDocumentErrors) {
            for (const graphQLError of loadDocumentError.errors) {
                const error = new Error();
                error.name = 'GraphQLDocumentError';
                error.message = `${error.name}: ${graphQLError.message}`;
                error.stack = error.message;
                graphQLError.locations.forEach((location) => (error.stack += `\n    at ${loadDocumentError.filePath}:${location.line}:${location.column}`));
                errors.push(error);
            }
        }
        throw new AggregateError(errors);
    }
}
function createDefaultRules() {
    const ignored = ['NoUnusedFragmentsRule', 'NoUnusedVariablesRule', 'KnownDirectivesRule'];
    // GraphQL v14 has no Rule suffix in function names
    // Adding `*Rule` makes validation backwards compatible
    ignored.forEach((rule) => {
        ignored.push(rule.replace(/Rule$/, ''));
    });
    return graphql.specifiedRules.filter((f) => !ignored.includes(f.name));
}

function resolveRelevantMappings(resolvers, path, allMappings) {
    const splitted = path.split('.');
    if (splitted.length === 2) {
        const typeName = splitted[0];
        if (graphql.isScalarType(resolvers[typeName])) {
            return [];
        }
        const fieldName = splitted[1];
        if (typeName === '*') {
            return flattenArray(Object.keys(resolvers).map((typeName) => resolveRelevantMappings(resolvers, `${typeName}.${fieldName}`, allMappings)));
        }
        if (fieldName === '*') {
            return flattenArray(Object.keys(resolvers[typeName]).map((field) => resolveRelevantMappings(resolvers, `${typeName}.${field}`, allMappings))).filter((mapItem) => !allMappings[mapItem]);
        }
        else {
            const paths = [];
            if (resolvers[typeName] && resolvers[typeName][fieldName]) {
                if (resolvers[typeName][fieldName]['subscribe']) {
                    paths.push(path + '.subscribe');
                }
                if (resolvers[typeName][fieldName]['resolve']) {
                    paths.push(path + '.resolve');
                }
                if (typeof resolvers[typeName][fieldName] === 'function') {
                    paths.push(path);
                }
            }
            return paths;
        }
    }
    else if (splitted.length === 1) {
        const typeName = splitted[0];
        return flattenArray(Object.keys(resolvers[typeName]).map((fieldName) => resolveRelevantMappings(resolvers, `${typeName}.${fieldName}`, allMappings)));
    }
    return [];
}
/**
 * Wraps the resolvers object with the resolvers composition objects.
 * Implemented as a simple and basic middleware mechanism.
 *
 * @param resolvers - resolvers object
 * @param mapping - resolvers composition mapping
 * @hidden
 */
function composeResolvers(resolvers, mapping = {}) {
    const mappingResult = {};
    Object.keys(mapping).map((resolverPath) => {
        if (mapping[resolverPath] instanceof Array || typeof mapping[resolverPath] === 'function') {
            const composeFns = mapping[resolverPath];
            const relevantFields = resolveRelevantMappings(resolvers, resolverPath, mapping);
            relevantFields.forEach((path) => {
                mappingResult[path] = asArray(composeFns);
            });
        }
        else {
            Object.keys(mapping[resolverPath]).forEach((fieldName) => {
                const composeFns = mapping[resolverPath][fieldName];
                const relevantFields = resolveRelevantMappings(resolvers, resolverPath + '.' + fieldName, mapping);
                relevantFields.forEach((path) => {
                    mappingResult[path] = asArray(composeFns);
                });
            });
        }
    });
    Object.keys(mappingResult).forEach((path) => {
        const fns = chainFunctions([...asArray(mappingResult[path]), () => lodash.get(resolvers, path)]);
        lodash.set(resolvers, path, fns());
    });
    return resolvers;
}

function buildFixedSchema(schema, options) {
    return graphql.buildSchema(printSchemaWithDirectives(schema, options), {
        noLocation: true,
        ...(options || {}),
    });
}
function fixSchemaAst(schema, options) {
    let schemaWithValidAst;
    if (!schema.astNode) {
        Object.defineProperty(schema, 'astNode', {
            get() {
                if (!schemaWithValidAst) {
                    schemaWithValidAst = buildFixedSchema(schema, options);
                }
                return schemaWithValidAst.astNode;
            },
        });
    }
    if (!schema.extensionASTNodes) {
        Object.defineProperty(schema, 'extensionASTNodes', {
            get() {
                if (!schemaWithValidAst) {
                    schemaWithValidAst = buildFixedSchema(schema, options);
                }
                return schemaWithValidAst.extensionASTNodes;
            },
        });
    }
    return schema;
}

function stripBOM(content) {
    content = content.toString();
    // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
    // because the buffer-to-string conversion in `fs.readFileSync()`
    // translates it to FEFF, the UTF-16 BOM.
    if (content.charCodeAt(0) === 0xfeff) {
        content = content.slice(1);
    }
    return content;
}
function parseBOM(content) {
    return JSON.parse(stripBOM(content));
}
function parseGraphQLJSON(location, jsonContent, options) {
    let parsedJson = parseBOM(jsonContent);
    if (parsedJson['data']) {
        parsedJson = parsedJson['data'];
    }
    if (parsedJson.kind === 'Document') {
        const document = parsedJson;
        return {
            location,
            document,
        };
    }
    else if (parsedJson.__schema) {
        const schema = graphql.buildClientSchema(parsedJson, options);
        const rawSDL = printSchemaWithDirectives(schema, options);
        return {
            location,
            document: graphql.parse(rawSDL, options),
            rawSDL,
            schema,
        };
    }
    throw new Error(`Not valid JSON content`);
}

function parseGraphQLSDL(location, rawSDL, options) {
    let document;
    try {
        document = graphql.parse(new graphql.Source(rawSDL, location), options);
    }
    catch (e) {
        if (e.message.includes('EOF')) {
            document = {
                kind: graphql.Kind.DOCUMENT,
                definitions: [],
            };
        }
        else {
            throw e;
        }
    }
    return {
        location,
        document,
        rawSDL,
    };
}

/**
 * Get all GraphQL types from schema without:
 *
 * - Query, Mutation, Subscription objects
 * - Internal scalars added by parser
 *
 * @param schema
 */
function getUserTypesFromSchema(schema) {
    const allTypesMap = schema.getTypeMap();
    // tslint:disable-next-line: no-unnecessary-local-variable
    const modelTypes = Object.values(allTypesMap).filter((graphqlType) => {
        if (graphql.isObjectType(graphqlType)) {
            // Filter out private types
            if (graphqlType.name.startsWith('__')) {
                return false;
            }
            if (schema.getMutationType() && graphqlType.name === schema.getMutationType().name) {
                return false;
            }
            if (schema.getQueryType() && graphqlType.name === schema.getQueryType().name) {
                return false;
            }
            if (schema.getSubscriptionType() && graphqlType.name === schema.getSubscriptionType().name) {
                return false;
            }
            return true;
        }
        return false;
    });
    return modelTypes;
}

let operationVariables = [];
let fieldTypeMap = new Map();
function addOperationVariable(variable) {
    operationVariables.push(variable);
}
function resetOperationVariables() {
    operationVariables = [];
}
function resetFieldMap() {
    fieldTypeMap = new Map();
}
function buildOperationName(name) {
    return camelCase.camelCase(name);
}
function buildOperationNodeForField({ schema, kind, field, models, ignore, depthLimit, circularReferenceDepth, argNames, }) {
    resetOperationVariables();
    resetFieldMap();
    const operationNode = buildOperationAndCollectVariables({
        schema,
        fieldName: field,
        kind,
        models: models || [],
        ignore: ignore || [],
        depthLimit: depthLimit || Infinity,
        circularReferenceDepth: circularReferenceDepth || 1,
        argNames,
    });
    // attach variables
    operationNode.variableDefinitions = [...operationVariables];
    resetOperationVariables();
    resetFieldMap();
    return operationNode;
}
function buildOperationAndCollectVariables({ schema, fieldName, kind, models, ignore, depthLimit, circularReferenceDepth, argNames, }) {
    const typeMap = {
        query: schema.getQueryType(),
        mutation: schema.getMutationType(),
        subscription: schema.getSubscriptionType(),
    };
    const type = typeMap[kind];
    const field = type.getFields()[fieldName];
    const operationName = buildOperationName(`${fieldName}_${kind}`);
    if (field.args) {
        field.args.forEach((arg) => {
            const argName = arg.name;
            if (!argNames || argNames.includes(argName)) {
                addOperationVariable(resolveVariable(arg, argName));
            }
        });
    }
    return {
        kind: graphql.Kind.OPERATION_DEFINITION,
        operation: kind,
        name: {
            kind: 'Name',
            value: operationName,
        },
        variableDefinitions: [],
        selectionSet: {
            kind: graphql.Kind.SELECTION_SET,
            selections: [
                resolveField({
                    type,
                    field,
                    models,
                    firstCall: true,
                    path: [],
                    ancestors: [],
                    ignore,
                    depthLimit,
                    circularReferenceDepth,
                    schema,
                    depth: 0,
                    argNames,
                }),
            ],
        },
    };
}
function resolveSelectionSet({ parent, type, models, firstCall, path, ancestors, ignore, depthLimit, circularReferenceDepth, schema, depth, argNames, }) {
    if (depth > depthLimit) {
        return;
    }
    if (graphql.isUnionType(type)) {
        const types = type.getTypes();
        return {
            kind: graphql.Kind.SELECTION_SET,
            selections: types
                .filter((t) => !hasCircularRef([...ancestors, t], {
                depth: circularReferenceDepth,
            }))
                .map((t) => {
                return {
                    kind: graphql.Kind.INLINE_FRAGMENT,
                    typeCondition: {
                        kind: graphql.Kind.NAMED_TYPE,
                        name: {
                            kind: graphql.Kind.NAME,
                            value: t.name,
                        },
                    },
                    selectionSet: resolveSelectionSet({
                        parent: type,
                        type: t,
                        models,
                        path,
                        ancestors,
                        ignore,
                        depthLimit,
                        circularReferenceDepth,
                        schema,
                        depth,
                        argNames,
                    }),
                };
            })
                .filter((f) => {
                var _a, _b;
                if (f) {
                    if ('selectionSet' in f) {
                        return (_b = (_a = f.selectionSet) === null || _a === void 0 ? void 0 : _a.selections) === null || _b === void 0 ? void 0 : _b.length;
                    }
                    else {
                        return true;
                    }
                }
                return false;
            }),
        };
    }
    if (graphql.isInterfaceType(type)) {
        const types = Object.values(schema.getTypeMap()).filter((t) => graphql.isObjectType(t) && t.getInterfaces().includes(type));
        return {
            kind: graphql.Kind.SELECTION_SET,
            selections: types
                .filter((t) => !hasCircularRef([...ancestors, t], {
                depth: circularReferenceDepth,
            }))
                .map((t) => {
                return {
                    kind: graphql.Kind.INLINE_FRAGMENT,
                    typeCondition: {
                        kind: graphql.Kind.NAMED_TYPE,
                        name: {
                            kind: graphql.Kind.NAME,
                            value: t.name,
                        },
                    },
                    selectionSet: resolveSelectionSet({
                        parent: type,
                        type: t,
                        models,
                        path,
                        ancestors,
                        ignore,
                        depthLimit,
                        circularReferenceDepth,
                        schema,
                        depth,
                        argNames,
                    }),
                };
            }),
        };
    }
    if (graphql.isObjectType(type)) {
        const isIgnored = ignore.includes(type.name) || ignore.includes(`${parent.name}.${path[path.length - 1]}`);
        const isModel = models.includes(type.name);
        if (!firstCall && isModel && !isIgnored) {
            return {
                kind: graphql.Kind.SELECTION_SET,
                selections: [
                    {
                        kind: graphql.Kind.FIELD,
                        name: {
                            kind: graphql.Kind.NAME,
                            value: 'id',
                        },
                    },
                ],
            };
        }
        const fields = type.getFields();
        return {
            kind: graphql.Kind.SELECTION_SET,
            selections: Object.keys(fields)
                .filter((fieldName) => {
                return !hasCircularRef([...ancestors, graphql.getNamedType(fields[fieldName].type)], {
                    depth: circularReferenceDepth,
                });
            })
                .map((fieldName) => {
                return resolveField({
                    type: type,
                    field: fields[fieldName],
                    models,
                    path: [...path, fieldName],
                    ancestors,
                    ignore,
                    depthLimit,
                    circularReferenceDepth,
                    schema,
                    depth,
                    argNames,
                });
            })
                .filter((f) => {
                var _a, _b;
                if (f) {
                    if ('selectionSet' in f) {
                        return (_b = (_a = f.selectionSet) === null || _a === void 0 ? void 0 : _a.selections) === null || _b === void 0 ? void 0 : _b.length;
                    }
                    else {
                        return true;
                    }
                }
                return false;
            }),
        };
    }
}
function resolveVariable(arg, name) {
    function resolveVariableType(type) {
        if (graphql.isListType(type)) {
            return {
                kind: graphql.Kind.LIST_TYPE,
                type: resolveVariableType(type.ofType),
            };
        }
        if (graphql.isNonNullType(type)) {
            return {
                kind: graphql.Kind.NON_NULL_TYPE,
                type: resolveVariableType(type.ofType),
            };
        }
        return {
            kind: graphql.Kind.NAMED_TYPE,
            name: {
                kind: graphql.Kind.NAME,
                value: type.name,
            },
        };
    }
    return {
        kind: graphql.Kind.VARIABLE_DEFINITION,
        variable: {
            kind: graphql.Kind.VARIABLE,
            name: {
                kind: graphql.Kind.NAME,
                value: name || arg.name,
            },
        },
        type: resolveVariableType(arg.type),
    };
}
function getArgumentName(name, path) {
    return camelCase.camelCase([...path, name].join('_'));
}
function resolveField({ type, field, models, firstCall, path, ancestors, ignore, depthLimit, circularReferenceDepth, schema, depth, argNames, }) {
    const namedType = graphql.getNamedType(field.type);
    let args = [];
    let removeField = false;
    if (field.args && field.args.length) {
        args = field.args
            .map((arg) => {
            const argumentName = getArgumentName(arg.name, path);
            if (argNames && !argNames.includes(argumentName)) {
                if (graphql.isNonNullType(arg.type)) {
                    removeField = true;
                }
                return null;
            }
            if (!firstCall) {
                addOperationVariable(resolveVariable(arg, argumentName));
            }
            return {
                kind: graphql.Kind.ARGUMENT,
                name: {
                    kind: graphql.Kind.NAME,
                    value: arg.name,
                },
                value: {
                    kind: graphql.Kind.VARIABLE,
                    name: {
                        kind: graphql.Kind.NAME,
                        value: getArgumentName(arg.name, path),
                    },
                },
            };
        })
            .filter(Boolean);
    }
    if (removeField) {
        return null;
    }
    let fieldName = field.name;
    if (fieldTypeMap.has(fieldName) && fieldTypeMap.get(fieldName) !== field.type.toString()) {
        fieldName += field.type.toString().replace('!', 'NonNull');
    }
    fieldTypeMap.set(fieldName, field.type.toString());
    if (!graphql.isScalarType(namedType)) {
        return {
            kind: graphql.Kind.FIELD,
            name: {
                kind: graphql.Kind.NAME,
                value: field.name,
            },
            ...(fieldName !== field.name && { alias: { kind: graphql.Kind.NAME, value: fieldName } }),
            selectionSet: resolveSelectionSet({
                parent: type,
                type: namedType,
                models,
                firstCall,
                path: [...path, field.name],
                ancestors: [...ancestors, type],
                ignore,
                depthLimit,
                circularReferenceDepth,
                schema,
                depth: depth + 1,
                argNames,
            }) || undefined,
            arguments: args,
        };
    }
    return {
        kind: graphql.Kind.FIELD,
        name: {
            kind: graphql.Kind.NAME,
            value: field.name,
        },
        ...(fieldName !== field.name && { alias: { kind: graphql.Kind.NAME, value: fieldName } }),
        arguments: args,
    };
}
function hasCircularRef(types, config = {
    depth: 1,
}) {
    const type = types[types.length - 1];
    if (graphql.isScalarType(type)) {
        return false;
    }
    const size = types.filter((t) => t.name === type.name).length;
    return size > config.depth;
}

exports.asArray = asArray;
exports.buildOperationNodeForField = buildOperationNodeForField;
exports.chainFunctions = chainFunctions;
exports.checkValidationErrors = checkValidationErrors;
exports.compareNodes = compareNodes;
exports.compareStrings = compareStrings;
exports.composeResolvers = composeResolvers;
exports.createSchemaDefinition = createSchemaDefinition;
exports.debugLog = debugLog;
exports.extractFieldResolversFromObjectType = extractFieldResolversFromObjectType;
exports.extractResolversFromSchema = extractResolversFromSchema;
exports.fixSchemaAst = fixSchemaAst;
exports.fixWindowsPath = fixWindowsPath;
exports.flattenArray = flattenArray;
exports.getDirectives = getDirectives;
exports.getFieldsWithDirectives = getFieldsWithDirectives;
exports.getImplementingTypes = getImplementingTypes;
exports.getSchemaDirectiveFromDirectiveResolver = getSchemaDirectiveFromDirectiveResolver;
exports.getUserTypesFromSchema = getUserTypesFromSchema;
exports.isDocumentString = isDocumentString;
exports.isEqual = isEqual;
exports.isNotEqual = isNotEqual;
exports.isValidPath = isValidPath;
exports.nodeToString = nodeToString;
exports.parseGraphQLJSON = parseGraphQLJSON;
exports.parseGraphQLSDL = parseGraphQLSDL;
exports.printSchemaWithDirectives = printSchemaWithDirectives;
exports.resolveBuiltinModule = resolveBuiltinModule;
exports.resolveBuiltinModuleSync = resolveBuiltinModuleSync;
exports.validateGraphQlDocuments = validateGraphQlDocuments;
//# sourceMappingURL=index.cjs.js.map
