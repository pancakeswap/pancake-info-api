import { UrlLoader, LoadFromUrlOptions } from '@graphql-tools/url-loader';
interface PrismaLoaderOptions extends LoadFromUrlOptions {
    envVars?: {
        [key: string]: string;
    };
    graceful?: boolean;
    cwd?: string;
}
export declare class PrismaLoader extends UrlLoader {
    loaderId(): string;
    canLoad(prismaConfigFilePath: string, options: PrismaLoaderOptions): Promise<boolean>;
    load(prismaConfigFilePath: string, options: PrismaLoaderOptions): Promise<import("@graphql-tools/utils").Source>;
}
export {};
