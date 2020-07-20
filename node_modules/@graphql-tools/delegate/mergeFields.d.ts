import { FieldNode, GraphQLResolveInfo } from 'graphql';
import { MergedTypeInfo, SubschemaConfig } from './types';
export declare function mergeFields(mergedTypeInfo: MergedTypeInfo, typeName: string, object: any, originalSelections: Array<FieldNode>, sourceSubschemas: Array<SubschemaConfig>, targetSubschemas: Array<SubschemaConfig>, context: Record<string, any>, info: GraphQLResolveInfo): any;
