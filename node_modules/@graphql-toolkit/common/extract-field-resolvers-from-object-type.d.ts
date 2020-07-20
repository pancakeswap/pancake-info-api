import { GraphQLObjectType, GraphQLInterfaceType, DocumentNode } from 'graphql';
export interface IFieldResolvers {
    [fieldName: string]: {
        subscribe: (...args: any[]) => any;
        resolve: (...args: any[]) => any;
    } | ((...args: any[]) => any);
}
export interface ExtractFieldResolversFromObjectType {
    selectedTypeDefs?: DocumentNode;
}
export declare function extractFieldResolversFromObjectType(objectType: GraphQLObjectType | GraphQLInterfaceType, options?: ExtractFieldResolversFromObjectType): IFieldResolvers;
