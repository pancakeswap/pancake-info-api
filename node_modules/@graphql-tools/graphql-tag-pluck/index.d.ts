export interface GraphQLTagPluckOptions {
    modules?: Array<{
        name: string;
        identifier?: string;
    }>;
    gqlMagicComment?: string;
    globalGqlIdentifierName?: string | string[];
}
export declare const gqlPluckFromCodeString: (filePath: string, code: string, options?: GraphQLTagPluckOptions) => Promise<string>;
export declare const gqlPluckFromCodeStringSync: (filePath: string, code: string, options?: GraphQLTagPluckOptions) => string;
