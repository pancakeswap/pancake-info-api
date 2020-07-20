import { LoadTypedefsOptions, UnnormalizedTypeDefPointer } from './load-typedefs';
import { GraphQLSchema, BuildSchemaOptions } from 'graphql';
import { MergeSchemasConfig } from '@graphql-tools/merge';
export declare type LoadSchemaOptions = BuildSchemaOptions & LoadTypedefsOptions & Partial<MergeSchemasConfig> & {
    /**
     * Adds a list of Sources in to `extensions.sources`
     *
     * Disabled by default.
     */
    includeSources?: boolean;
};
export declare function loadSchema(schemaPointers: UnnormalizedTypeDefPointer | UnnormalizedTypeDefPointer[], options: LoadSchemaOptions): Promise<GraphQLSchema>;
export declare function loadSchemaSync(schemaPointers: UnnormalizedTypeDefPointer | UnnormalizedTypeDefPointer[], options: LoadSchemaOptions): GraphQLSchema;
