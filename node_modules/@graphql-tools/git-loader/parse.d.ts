import { Source } from '@graphql-tools/utils';
export declare function parse<T>({ path, pointer, content, options, }: {
    path: string;
    pointer: string;
    content: string;
    options: T;
}): Source | void;
