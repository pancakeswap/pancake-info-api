import { GraphQLSchema, DocumentNode, BuildSchemaOptions } from 'graphql';
import { IResolvers, SchemaDirectiveVisitor, IResolverValidationOptions, ILogger } from 'graphql-tools';
import { Config } from './typedefs-mergers/merge-typedefs';
import { ResolversComposerMapping } from '@graphql-toolkit/common';
export interface MergeSchemasConfig<Resolvers extends IResolvers = IResolvers> extends Config, BuildSchemaOptions {
    schemas: GraphQLSchema[];
    typeDefs?: (DocumentNode | string)[] | DocumentNode | string;
    resolvers?: Resolvers | Resolvers[];
    resolversComposition?: ResolversComposerMapping<Resolvers>;
    schemaDirectives?: {
        [directiveName: string]: typeof SchemaDirectiveVisitor;
    };
    resolverValidationOptions?: IResolverValidationOptions;
    logger?: ILogger;
}
export declare function mergeSchemas(config: MergeSchemasConfig): GraphQLSchema;
export declare function mergeSchemasAsync(config: MergeSchemasConfig): Promise<GraphQLSchema>;
