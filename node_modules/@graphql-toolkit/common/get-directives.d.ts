import { GraphQLSchema } from 'graphql';
export declare type DirectiveUseMap = {
    [key: string]: any;
};
export declare function getDirectives(schema: GraphQLSchema, node: any): DirectiveUseMap;
