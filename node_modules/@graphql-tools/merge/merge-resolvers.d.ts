import { IResolvers } from '@graphql-tools/utils';
export declare type ResolversFactory<TContext> = (...args: any[]) => IResolvers<any, TContext>;
export declare type ResolversDefinition<TContext> = IResolvers<any, TContext> | ResolversFactory<TContext>;
export interface MergeResolversOptions {
    exclusions?: string[];
}
export declare function mergeResolvers<TContext, T extends ResolversDefinition<TContext>>(resolversDefinitions: T[], options?: MergeResolversOptions): T;
