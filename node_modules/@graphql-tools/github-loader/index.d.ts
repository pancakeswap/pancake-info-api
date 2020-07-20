import { UniversalLoader, SingleFileOptions } from '@graphql-tools/utils';
import { GraphQLTagPluckOptions } from '@graphql-tools/graphql-tag-pluck';
export interface GithubLoaderOptions extends SingleFileOptions {
    token: string;
    pluckConfig?: GraphQLTagPluckOptions;
}
export declare class GithubLoader implements UniversalLoader<GithubLoaderOptions> {
    loaderId(): string;
    canLoad(pointer: string): Promise<boolean>;
    canLoadSync(): boolean;
    load(pointer: string, options: GithubLoaderOptions): Promise<import("@graphql-tools/utils").Source | {
        location: string;
        document: import("graphql").DocumentNode;
        rawSDL: string;
    }>;
    loadSync(): never;
}
