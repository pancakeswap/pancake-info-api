import { GraphQLSchema } from 'graphql';
import { Transform, Request } from '@graphql-tools/utils';
import { FieldTransformer, FieldNodeTransformer } from '../types';
export default class TransformObjectFields implements Transform {
    private readonly objectFieldTransformer;
    private readonly fieldNodeTransformer;
    private transformer;
    constructor(objectFieldTransformer: FieldTransformer, fieldNodeTransformer?: FieldNodeTransformer);
    transformSchema(originalSchema: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request): Request;
}
