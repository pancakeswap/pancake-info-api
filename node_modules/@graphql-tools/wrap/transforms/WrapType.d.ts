import { GraphQLSchema } from 'graphql';
import { Transform, Request } from '@graphql-tools/utils';
export default class WrapType implements Transform {
    private readonly transformer;
    constructor(outerTypeName: string, innerTypeName: string, fieldName: string);
    transformSchema(schema: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request): Request;
}
