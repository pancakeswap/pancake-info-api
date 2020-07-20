import { GraphQLSchema, OperationDefinitionNode, OperationTypeNode } from 'graphql';
export declare type Skip = string[];
export declare type Force = string[];
export declare type Ignore = string[];
export declare function buildOperationNodeForField({ schema, kind, field, models, ignore, depthLimit, circularReferenceDepth, argNames, }: {
    schema: GraphQLSchema;
    kind: OperationTypeNode;
    field: string;
    models?: string[];
    ignore?: Ignore;
    depthLimit?: number;
    circularReferenceDepth?: number;
    argNames?: string[];
}): OperationDefinitionNode;
