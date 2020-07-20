import { IntrospectionOptions } from 'graphql';
import { SchemaPointerSingle, Source, DocumentLoader, SingleFileOptions } from '@graphql-toolkit/common';
export declare type FetchFn = typeof import('cross-fetch').fetch;
declare type Headers = Record<string, string> | Array<Record<string, string>>;
export interface LoadFromUrlOptions extends SingleFileOptions, Partial<IntrospectionOptions> {
    headers?: Headers;
    customFetch?: FetchFn | string;
    method?: 'GET' | 'POST';
}
export declare class UrlLoader implements DocumentLoader<LoadFromUrlOptions> {
    loaderId(): string;
    canLoad(pointer: SchemaPointerSingle, options: LoadFromUrlOptions): Promise<boolean>;
    canLoadSync(pointer: SchemaPointerSingle, _options: LoadFromUrlOptions): boolean;
    load(pointer: SchemaPointerSingle, options: LoadFromUrlOptions): Promise<Source>;
    loadSync(): never;
}
export {};
