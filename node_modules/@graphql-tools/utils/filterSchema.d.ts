import { GraphQLType, GraphQLSchema } from 'graphql';
import { RootFieldFilter } from './Interfaces';
export declare function filterSchema({ schema, rootFieldFilter, typeFilter, fieldFilter, }: {
    schema: GraphQLSchema;
    rootFieldFilter?: RootFieldFilter;
    typeFilter?: (typeName: string, type: GraphQLType) => boolean;
    fieldFilter?: (typeName: string, fieldName: string) => boolean;
}): GraphQLSchema;
