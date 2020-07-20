import { DocumentNode } from 'graphql';
export declare type DirectiveArgs = {
    [name: string]: any;
};
export declare type DirectiveUsage = {
    name: string;
    args: DirectiveArgs;
};
export declare type TypeAndFieldToDirectives = {
    [typeAndField: string]: DirectiveUsage[];
};
export declare function getFieldsWithDirectives(documentNode: DocumentNode): TypeAndFieldToDirectives;
