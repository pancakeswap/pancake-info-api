'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const crossFetch = require('cross-fetch');
const graphql = require('graphql');

const DEFAULT_APOLLO_ENDPOINT = 'https://engine-graphql.apollographql.com/api/graphql';
class ApolloEngineLoader {
    loaderId() {
        return 'apollo-engine';
    }
    async canLoad(ptr) {
        return typeof ptr === 'string' && ptr === 'apollo-engine';
    }
    canLoadSync() {
        return false;
    }
    async load(_, options) {
        const response = await crossFetch.fetch(options.engine.endpoint || DEFAULT_APOLLO_ENDPOINT, {
            method: 'POST',
            headers: {
                'x-api-key': options.engine.apiKey,
                'apollo-client-name': 'Apollo Language Server',
                'apollo-client-reference-id': '146d29c0-912c-46d3-b686-920e52586be6',
                'apollo-client-version': '2.6.8',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...options.headers,
            },
            body: JSON.stringify({
                query: SCHEMA_QUERY,
                variables: {
                    id: options.graph,
                    tag: options.variant,
                },
            }),
        });
        const { data, errors } = await response.json();
        if (errors) {
            throw new Error(errors.map(({ message }) => message).join('\n'));
        }
        return {
            location: 'apollo-engine',
            schema: graphql.buildClientSchema(data.service.schema),
        };
    }
    loadSync() {
        throw new Error('Loader ApolloEngine has no sync mode');
    }
}
const SCHEMA_QUERY = /* GraphQL */ `
  query GetSchemaByTag($tag: String!, $id: ID!) {
    service(id: $id) {
      ... on Service {
        __typename
        schema(tag: $tag) {
          hash
          __schema: introspection {
            queryType {
              name
            }
            mutationType {
              name
            }
            subscriptionType {
              name
            }
            types(filter: { includeBuiltInTypes: true }) {
              ...IntrospectionFullType
            }
            directives {
              name
              description
              locations
              args {
                ...IntrospectionInputValue
              }
            }
          }
        }
      }
    }
  }

  fragment IntrospectionFullType on IntrospectionType {
    kind
    name
    description
    fields {
      name
      description
      args {
        ...IntrospectionInputValue
      }
      type {
        ...IntrospectionTypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...IntrospectionInputValue
    }
    interfaces {
      ...IntrospectionTypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...IntrospectionTypeRef
    }
  }

  fragment IntrospectionInputValue on IntrospectionInputValue {
    name
    description
    type {
      ...IntrospectionTypeRef
    }
    defaultValue
  }

  fragment IntrospectionTypeRef on IntrospectionType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

exports.ApolloEngineLoader = ApolloEngineLoader;
exports.SCHEMA_QUERY = SCHEMA_QUERY;
//# sourceMappingURL=index.cjs.js.map
