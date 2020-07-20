'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const utils = require('@graphql-tools/utils');
const crossFetch = require('cross-fetch');
const graphqlTagPluck = require('@graphql-tools/graphql-tag-pluck');

// github:owner/name#ref:path/to/file
function extractData(pointer) {
    const [repo, file] = pointer.split('#');
    const [owner, name] = repo.split(':')[1].split('/');
    const [ref, path] = file.split(':');
    return {
        owner,
        name,
        ref,
        path,
    };
}
class GithubLoader {
    loaderId() {
        return 'github-loader';
    }
    async canLoad(pointer) {
        return typeof pointer === 'string' && pointer.toLowerCase().startsWith('github:');
    }
    canLoadSync() {
        return false;
    }
    async load(pointer, options) {
        const { owner, name, ref, path } = extractData(pointer);
        const request = await crossFetch.fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `bearer ${options.token}`,
            },
            body: JSON.stringify({
                query: `
          query GetGraphQLSchemaForGraphQLtools($owner: String!, $name: String!, $expression: String!) {
            repository(owner: $owner, name: $name) {
              object(expression: $expression) {
                ... on Blob {
                  text
                }
              }
            }
          }
        `,
                variables: {
                    owner,
                    name,
                    expression: ref + ':' + path,
                },
                operationName: 'GetGraphQLSchemaForGraphQLtools',
            }),
        });
        const response = await request.json();
        let errorMessage = null;
        if (response.errors && response.errors.length > 0) {
            errorMessage = response.errors.map((item) => item.message).join(', ');
        }
        else if (!response.data) {
            errorMessage = response;
        }
        if (errorMessage) {
            throw new Error('Unable to download schema from github: ' + errorMessage);
        }
        const content = response.data.repository.object.text;
        if (/\.(gql|graphql)s?$/i.test(path)) {
            return utils.parseGraphQLSDL(pointer, content, options);
        }
        if (/\.json$/i.test(path)) {
            return utils.parseGraphQLJSON(pointer, content, options);
        }
        const rawSDL = await graphqlTagPluck.gqlPluckFromCodeString(pointer, content, options.pluckConfig);
        if (rawSDL) {
            return {
                location: pointer,
                rawSDL,
            };
        }
        throw new Error(`Invalid file extension: ${path}`);
    }
    loadSync() {
        throw new Error('Loader GitHub has no sync mode');
    }
}

exports.GithubLoader = GithubLoader;
//# sourceMappingURL=index.cjs.js.map
