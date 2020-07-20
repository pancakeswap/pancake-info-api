import { GraphQLSchema } from 'graphql';
import { Transform, Request } from '@graphql-tools/utils';
import { FieldTransformer, FieldNodeTransformer } from '../types';
export default class TransformCompositeFields implements Transform {
    private readonly fieldTransformer;
    private readonly fieldNodeTransformer;
    private transformedSchema;
    private mapping;
    constructor(fieldTransformer: FieldTransformer, fieldNodeTransformer?: FieldNodeTransformer);
    transformSchema(originalSchema: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request): Request;
    private transformFields;
    private transformDocument;
}
