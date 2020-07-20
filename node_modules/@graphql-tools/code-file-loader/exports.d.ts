import { DocumentNode, GraphQLSchema } from 'graphql';
export declare function pickExportFromModule({ module, filepath }: {
    module: any;
    filepath: string;
}): Promise<DocumentNode | GraphQLSchema>;
export declare function pickExportFromModuleSync({ module, filepath }: {
    module: any;
    filepath: string;
}): DocumentNode | GraphQLSchema;
