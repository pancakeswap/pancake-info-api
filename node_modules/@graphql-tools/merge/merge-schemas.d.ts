import { GraphQLSchema, DocumentNode, BuildSchemaOptions } from 'graphql';
import { ILogger } from '@graphql-tools/schema';
import { Config } from './typedefs-mergers/merge-typedefs';
import { IResolvers, SchemaDirectiveVisitor, IResolverValidationOptions } from '@graphql-tools/utils';
export interface MergeSchemasConfig<Resolvers extends IResolvers = IResolvers> extends Config, BuildSchemaOptions {
    schemas: GraphQLSchema[];
    typeDefs?: (DocumentNode | string)[] | DocumentNode | string;
    resolvers?: Resolvers | Resolvers[];
    schemaDirectives?: {
        [directiveName: string]: typeof SchemaDirectiveVisitor;
    };
    resolverValidationOptions?: IResolverValidationOptions;
    logger?: ILogger;
}
export declare function mergeSchemas(config: MergeSchemasConfig): GraphQLSchema;
export declare function mergeSchemasAsync(config: MergeSchemasConfig): Promise<GraphQLSchema>;
