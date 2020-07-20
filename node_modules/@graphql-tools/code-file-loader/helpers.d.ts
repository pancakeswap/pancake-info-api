import { DocumentNode, IntrospectionQuery } from 'graphql';
export declare function pick<T>(obj: any, keys: string[]): T;
export declare function isSchemaText(obj: any): obj is string;
export declare function isWrappedSchemaJson(obj: any): obj is {
    data: IntrospectionQuery;
};
export declare function isSchemaJson(obj: any): obj is IntrospectionQuery;
export declare function isSchemaAst(obj: any): obj is DocumentNode;
