import { ParseOptions, DocumentNode } from 'graphql';
export declare function parseGraphQLSDL(location: string, rawSDL: string, options: ParseOptions): {
    location: string;
    document: DocumentNode;
    rawSDL: string;
};
