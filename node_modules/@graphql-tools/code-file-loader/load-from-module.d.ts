import { DocumentNode, GraphQLSchema } from 'graphql';
export declare function tryToLoadFromExport(rawFilePath: string): Promise<GraphQLSchema | DocumentNode>;
export declare function tryToLoadFromExportSync(rawFilePath: string): GraphQLSchema | DocumentNode;
