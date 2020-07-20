import { SchemaLoader, Source, SingleFileOptions } from '@graphql-tools/utils';
export interface ApolloEngineOptions extends SingleFileOptions {
    engine: {
        endpoint?: string;
        apiKey: string;
    };
    graph: string;
    variant: string;
    headers?: Record<string, string>;
}
export declare class ApolloEngineLoader implements SchemaLoader<ApolloEngineOptions> {
    loaderId(): string;
    canLoad(ptr: string): Promise<boolean>;
    canLoadSync(): boolean;
    load(_: 'apollo-engine', options: ApolloEngineOptions): Promise<Source>;
    loadSync(): never;
}
export declare const SCHEMA_QUERY = "\n  query GetSchemaByTag($tag: String!, $id: ID!) {\n    service(id: $id) {\n      ... on Service {\n        __typename\n        schema(tag: $tag) {\n          hash\n          __schema: introspection {\n            queryType {\n              name\n            }\n            mutationType {\n              name\n            }\n            subscriptionType {\n              name\n            }\n            types(filter: { includeBuiltInTypes: true }) {\n              ...IntrospectionFullType\n            }\n            directives {\n              name\n              description\n              locations\n              args {\n                ...IntrospectionInputValue\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n\n  fragment IntrospectionFullType on IntrospectionType {\n    kind\n    name\n    description\n    fields {\n      name\n      description\n      args {\n        ...IntrospectionInputValue\n      }\n      type {\n        ...IntrospectionTypeRef\n      }\n      isDeprecated\n      deprecationReason\n    }\n    inputFields {\n      ...IntrospectionInputValue\n    }\n    interfaces {\n      ...IntrospectionTypeRef\n    }\n    enumValues(includeDeprecated: true) {\n      name\n      description\n      isDeprecated\n      deprecationReason\n    }\n    possibleTypes {\n      ...IntrospectionTypeRef\n    }\n  }\n\n  fragment IntrospectionInputValue on IntrospectionInputValue {\n    name\n    description\n    type {\n      ...IntrospectionTypeRef\n    }\n    defaultValue\n  }\n\n  fragment IntrospectionTypeRef on IntrospectionType {\n    kind\n    name\n    ofType {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n";
