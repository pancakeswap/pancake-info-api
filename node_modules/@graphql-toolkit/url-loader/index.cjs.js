'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
const common = require('@graphql-toolkit/common');
const validUrl = require('valid-url');
const crossFetch = require('cross-fetch');
const graphqlTools = require('graphql-tools');

class UrlLoader {
    loaderId() {
        return 'url';
    }
    async canLoad(pointer, options) {
        return this.canLoadSync(pointer, options);
    }
    canLoadSync(pointer, _options) {
        return !!validUrl.isWebUri(pointer);
    }
    async load(pointer, options) {
        let headers = {};
        let fetch = crossFetch.fetch;
        let method = 'POST';
        if (options) {
            if (Array.isArray(options.headers)) {
                headers = options.headers.reduce((prev, v) => ({ ...prev, ...v }), {});
            }
            else if (typeof options.headers === 'object') {
                headers = options.headers;
            }
            if (options.customFetch) {
                if (typeof options.customFetch === 'string') {
                    const [moduleName, fetchFnName] = options.customFetch.split('#');
                    fetch = await new Promise(function (resolve) { resolve(_interopNamespace(require(moduleName))); }).then((module) => (fetchFnName ? module[fetchFnName] : module));
                }
            }
            if (options.method) {
                method = options.method;
            }
        }
        let extraHeaders = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        };
        const fetcher = async ({ query: queryDocument, variables, operationName }) => {
            const fetchResult = await fetch(pointer, {
                method,
                ...(method === 'POST'
                    ? {
                        body: JSON.stringify({ query: graphql.print(queryDocument), variables, operationName }),
                    }
                    : {}),
                headers: extraHeaders,
            });
            return fetchResult.json();
        };
        const body = await fetcher({
            query: graphql.parse(graphql.getIntrospectionQuery({ descriptions: true, ...options })),
            variables: {},
            operationName: 'IntrospectionQuery',
            context: {},
        });
        let errorMessage;
        if (body.errors && body.errors.length > 0) {
            errorMessage = body.errors.map((item) => item.message).join(', ');
        }
        else if (!body.data) {
            errorMessage = JSON.stringify(body, null, 2);
        }
        if (errorMessage) {
            throw new Error('Unable to download schema from remote: ' + errorMessage);
        }
        if (!body.data.__schema) {
            throw new Error('Invalid schema provided!');
        }
        const clientSchema = graphql.buildClientSchema(body.data, options);
        const remoteExecutableSchema = graphqlTools.makeRemoteExecutableSchema({
            schema: common.printSchemaWithDirectives(clientSchema, options),
            fetcher,
        });
        return {
            location: pointer,
            schema: remoteExecutableSchema,
        };
    }
    loadSync() {
        throw new Error('Loader Url has no sync mode');
    }
}

exports.UrlLoader = UrlLoader;
//# sourceMappingURL=index.cjs.js.map
