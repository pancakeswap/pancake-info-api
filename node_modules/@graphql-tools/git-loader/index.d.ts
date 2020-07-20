import { UniversalLoader, SingleFileOptions } from '@graphql-tools/utils';
import { GraphQLTagPluckOptions } from '@graphql-tools/graphql-tag-pluck';
declare type GitLoaderOptions = SingleFileOptions & {
    pluckConfig: GraphQLTagPluckOptions;
};
export declare class GitLoader implements UniversalLoader {
    loaderId(): string;
    canLoad(pointer: string): Promise<boolean>;
    canLoadSync(pointer: string): boolean;
    load(pointer: string, options: GitLoaderOptions): Promise<import("@graphql-tools/utils").Source | {
        location: string;
        rawSDL: string;
    }>;
    loadSync(pointer: string, options: GitLoaderOptions): import("@graphql-tools/utils").Source | {
        location: string;
        rawSDL: string;
    };
}
export {};
