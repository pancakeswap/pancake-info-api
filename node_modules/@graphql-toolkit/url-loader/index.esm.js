import { parse, getIntrospectionQuery, buildClientSchema, print } from 'graphql';
import { printSchemaWithDirectives } from '@graphql-toolkit/common';
import { isWebUri } from 'valid-url';
import { fetch } from 'cross-fetch';
import { makeRemoteExecutableSchema } from 'graphql-tools';

class UrlLoader {
    loaderId() {
        return 'url';
    }
    async canLoad(pointer, options) {
        return this.canLoadSync(pointer, options);
    }
    canLoadSync(pointer, _options) {
        return !!isWebUri(pointer);
    }
    async load(pointer, options) {
        let headers = {};
        let fetch$1 = fetch;
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
                    fetch$1 = await import(moduleName).then((module) => (fetchFnName ? module[fetchFnName] : module));
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
            const fetchResult = await fetch$1(pointer, {
                method,
                ...(method === 'POST'
                    ? {
                        body: JSON.stringify({ query: print(queryDocument), variables, operationName }),
                    }
                    : {}),
                headers: extraHeaders,
            });
            return fetchResult.json();
        };
        const body = await fetcher({
            query: parse(getIntrospectionQuery({ descriptions: true, ...options })),
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
        const clientSchema = buildClientSchema(body.data, options);
        const remoteExecutableSchema = makeRemoteExecutableSchema({
            schema: printSchemaWithDirectives(clientSchema, options),
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

export { UrlLoader };
//# sourceMappingURL=index.esm.js.map
