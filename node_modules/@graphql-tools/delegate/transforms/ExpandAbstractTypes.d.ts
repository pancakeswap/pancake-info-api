import { GraphQLSchema } from 'graphql';
import { Transform, Request } from '@graphql-tools/utils';
export default class ExpandAbstractTypes implements Transform {
    private readonly targetSchema;
    private readonly mapping;
    private readonly reverseMapping;
    constructor(sourceSchema: GraphQLSchema, targetSchema: GraphQLSchema);
    transformRequest(originalRequest: Request): Request;
}
