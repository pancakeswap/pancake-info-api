import { ParsedEnumValuesMap, OperationVariablesToObject, NormalizedScalarsMap, ConvertNameFn } from '@graphql-codegen/visitor-plugin-common';
import { TypeNode } from 'graphql';
export declare class TypeScriptOperationVariablesToObject extends OperationVariablesToObject {
    private _avoidOptionals;
    private _immutableTypes;
    constructor(_scalars: NormalizedScalarsMap, _convertName: ConvertNameFn, _avoidOptionals: boolean, _immutableTypes: boolean, _namespacedImportName?: string | null, _enumNames?: string[], _enumPrefix?: boolean, _enumValues?: ParsedEnumValuesMap);
    private clearOptional;
    wrapAstTypeWithModifiers(baseType: string, typeNode: TypeNode): string;
    protected formatFieldString(fieldName: string, isNonNullType: boolean, hasDefaultValue: boolean): string;
    protected formatTypeString(fieldType: string, isNonNullType: boolean, hasDefaultValue: boolean): string;
    protected getPunctuation(): string;
}
