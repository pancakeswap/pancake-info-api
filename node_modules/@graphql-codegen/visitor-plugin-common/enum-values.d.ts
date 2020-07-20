import { EnumValuesMap, ParsedEnumValuesMap } from './types';
import { GraphQLSchema } from 'graphql';
export declare function parseEnumValues(schema: GraphQLSchema, mapOrStr?: EnumValuesMap): ParsedEnumValuesMap;
